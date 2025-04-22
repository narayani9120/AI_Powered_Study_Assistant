from flask import Flask, request, jsonify
import google.generativeai as genai
from flask_cors import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])


GOOGLE_API_KEY = "your-api-key-here"  # Replace with your actual API key


MONGO_URI = "mongodb://localhost:27017/"  # Replace with your MongoDB URI
client = MongoClient(MONGO_URI)
db = client.get_default_database()
pdf_collection = db['pdfs']  

def get_pdf_text_by_id(pdf_id):
    try:
        pdf = pdf_collection.find_one({"_id": ObjectId(pdf_id)})
        return pdf.get("extractedText") if pdf else None
    except Exception as e:
        print(f"Error fetching PDF text: {e}")
        return None

import re

def parse_generated_content_to_questions(content, content_type):
    try:
        content_type = content_type.lower()  # normalize case

        if content_type in ["true_false", "truefalse"]:
            lines = content.strip().split('\n')
            questions = []

            for line in lines:
                if not line.strip():
                    continue
                match = re.match(r'\d+\.\s*(.*?)\s*-\s*(True|False)', line.strip(), re.IGNORECASE)
                if match:
                    question_text = match.group(1).strip()
                    correct_answer = match.group(2).capitalize()
                    questions.append({
                        "question": question_text,
                        "options": ["True", "False"],
                        "correct_answer": correct_answer
                    })
            return questions

        elif content_type in ["quiz", "quizzes"]:
            questions = []
            parts = re.split(r'\n\s*\*\*Answer Key:\*\*\s*\n', content.strip(), maxsplit=1)
            if len(parts) < 2:
                print("No answer key found.")
                return []

            question_block, answer_block = parts

            question_matches = re.findall(
                r'\*\*\d+\.\s*(.*?)\*\*\n'
                r'a\)\s*(.*?)\n'
                r'b\)\s*(.*?)\n'
                r'c\)\s*(.*?)\n'
                r'd\)\s*(.*?)\n',
                question_block,
                re.DOTALL
            )

            answer_lines = re.findall(r'\d+\.\s+([a-dA-D])', answer_block.strip())

            for i, match in enumerate(question_matches):
                question_text = match[0].strip()
                options = [opt.strip() for opt in match[1:]]
                correct_letter = answer_lines[i].lower() if i < len(answer_lines) else None
                correct_index = ord(correct_letter) - ord('a') if correct_letter else None
                correct_answer = options[correct_index] if correct_index is not None else None

                questions.append({
                    "question": question_text,
                    "options": options,
                    "correct_answer": correct_answer
                })

            return questions

        else:
            return []

    except Exception as e:
        print(f"Error parsing content: {e}")
        return []




@app.route('/get-questions/<pdf_id>', methods=['GET'])
def get_questions_by_pdf_id(pdf_id):
    try:
        doc = pdf_collection.find_one({"_id": ObjectId(pdf_id)})
        if not doc or 'questions' not in doc:
            return jsonify({"success": False, "message": "No questions found"}), 404
        
        return jsonify({"success": True, "questions": doc["questions"]}), 200
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500


@app.route("/generate-content", methods=["POST"])
def generate_content():
    try:
        data = request.get_json()
        print("Received Data:", data)
        pdf_id = data.get("pdfId")
        num_questions = data.get("num_questions")
        difficulty = data.get("difficulty")
        content_type = data.get("type")

     
        text = data.get("text") or get_pdf_text_by_id(pdf_id)

        if not text:
            return jsonify({"error": "Text not found for the provided PDF ID"}), 404

        
        if content_type in ["quiz", "quizzes"]:
            prompt = prompt = (
    f"Generate {num_questions} {difficulty} multiple-choice quiz questions from the following content. "
    f"Each question must have exactly 4 options labeled 'a)' through 'd)'. Return the result in the following format:\n\n"
    "**1. Your question goes here**\n"
    "a) Option A\n"
    "b) Option B\n"
    "c) Option C\n"
    "d) Option D\n\n"
    "**2. Another question**\n"
    "a) Option A\n"
    "b) Option B\n"
    "c) Option C\n"
    "d) Option D\n\n"
    "**Answer Key:**\n"
    "1. b\n"
    "2. c\n"
    "... etc ...\n\n"
    "Only return the formatted questions and answer key. Do not explain anything.\n\n"
    f"Content:\n{text}"
)
        elif content_type in ["flashcard", "flashcards"]:
            prompt = f"Based on the following content, generate {num_questions} {difficulty} flashcards with a question on one side and the answer on the other:\n\n{text}"
        elif content_type in ["true_false", "truefalse"]:
            prompt = (
        f"Based on the following content, generate {num_questions} {difficulty} true/false questions.\n"
        f"Return them in the following format:\n"
        f"1. Your question here - True\n"
        f"2. Another statement - False\n\n"
        f"Only return the formatted questions with answers. Do not include any explanations.\n\n"
        f"Content:\n{text}"
    )
        else:
            return jsonify({"error": "Invalid type specified. Use 'quiz', 'flashcard', or 'true_false'."}), 400

       
        genai.configure(api_key=GOOGLE_API_KEY)
        model = genai.GenerativeModel("models/gemini-1.5-flash")
        response = model.generate_content(prompt)

        content = response.text if hasattr(response, "text") else "No content generated"
        print("Generated Content:", content)
        questions_to_store = parse_generated_content_to_questions(content, content_type)
        print("Parsed Questions:", questions_to_store)

        # Update the PDF document in MongoDB with the generated questions
        if pdf_id and questions_to_store:
            try:
                result = pdf_collection.update_one(
                    {'_id': ObjectId(pdf_id)},
                    {'$set': {'questions': questions_to_store}}
                )
                if result.modified_count > 0:
                    print(f"Successfully stored {len(questions_to_store)} questions for PDF ID: {pdf_id}")
                else:
                    print(f"No document updated. Check if PDF ID {pdf_id} exists in the database.")
            except Exception as db_error:
                print(f"Error updating database: {db_error}")

        return jsonify({"content": content, "questions": questions_to_store})
        
        


    except Exception as e:
        print("Error:", str(e))
        return jsonify({"error": f"Failed to generate content: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(port=5000)
