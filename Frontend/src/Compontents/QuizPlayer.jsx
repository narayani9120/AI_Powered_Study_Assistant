import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const QuizPlayer = ({ questions,difficulty }) => {
  const [quizStarted, setQuizStarted] = useState(true); // Changed to true to skip the "Start Quiz" step
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [showResult, setShowResult] = useState(false);

  // Move useSelector calls to the top level
  const userId = useSelector((state) => state.user.userId);
  const pdfId = useSelector((state) => state.pdf.pdfId);
  const type = useSelector((state) => state.pdf.type);
  const featureType = useSelector((state) => state.pdf.featureType);
  const navigate = useNavigate();

  if (!questions || questions.length === 0) {
    return <p className="text-center mt-6">No questions available.</p>;
  }

  const handleOptionSelect = (option) => {
    if (showResult) return;
    setSelectedOptions((prev) => ({
      ...prev,
      [currentIndex]: option,
    }));
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("authToken");
  
    // Debugging logs for Redux state values
    console.log("userId:", userId);
    console.log("pdfId:", pdfId);
    console.log("type:", type);
  
    // Check if required fields are present
    if (!userId || !pdfId || !type) {
      console.error("Missing required fields (userId, pdfId, or type).");
      alert("Missing required fields. Please try again.");
      return;
    }
  
    const formattedType = featureType === "quizzes" ? "quiz" : featureType;
    const totalQuestions = questions.length;
    const correctAnswers = Object.keys(selectedOptions).filter((index) =>
      isCorrect(parseInt(index))
    ).length;
  
    const answers = questions.map((q, idx) => ({
      question: q.question,
      correctAnswer: q.correct_answer,
      selectedAnswer: selectedOptions[idx],
      isCorrect: selectedOptions[idx] === q.correct_answer,
    }));
  
    try {
      const response = await axios.post(
        "http://localhost:4000/result",
        {
          userId,
          pdfId,
          type: formattedType,
          difficulty,
          totalQuestions,
          correctAnswers,
          answers,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
  
      if (response.data.success) {
        console.log("Quiz result stored:", response.data.result);
        navigate("/");
      } else {
        console.error("Failed to store quiz result:", response.data.message);
      }
    } catch (err) {
      console.error("Error submitting quiz:", err.response?.data || err.message);
    }
  };

  const isCorrect = (index) => {
    const selected = selectedOptions[index];
    const correct = questions[index].correct_answer;
    return selected === correct;
  };

  const score = Object.keys(selectedOptions).filter((index) =>
    isCorrect(parseInt(index))
  ).length;

  const allAnswered = Object.keys(selectedOptions).length === questions.length;
  const current = questions[currentIndex];

  return (
    <div className="mt-6 max-w-xl mx-auto">
      <h3 className="text-lg font-bold mb-2">{`Q${currentIndex + 1}. ${
        current.question
      }`}</h3>
      <ul className="space-y-2">
        {current.options.map((opt, idx) => {
          const isUserAnswer = selectedOptions[currentIndex] === opt;
          const isCorrectAnswer = opt === current.correct_answer;

          const getOptionClasses = () => {
            if (!showResult)
              return isUserAnswer
                ? "bg-blue-200 font-semibold"
                : "hover:bg-gray-100";
            if (isUserAnswer && isCorrectAnswer)
              return "bg-green-200 font-semibold";
            if (isUserAnswer && !isCorrectAnswer)
              return "bg-red-200 font-semibold";
            if (isCorrectAnswer) return "bg-green-100";
            return "";
          };

          return (
            <li
              key={idx}
              onClick={() => handleOptionSelect(opt)}
              className={`p-2 border rounded-md cursor-pointer ${getOptionClasses()}`}
            >
              {opt}
            </li>
          );
        })}
      </ul>

      <div className="mt-4 flex justify-between">
        <button
          onClick={() => setCurrentIndex((i) => Math.max(i - 1, 0))}
          disabled={currentIndex === 0}
          className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
        >
          Prev
        </button>

        {currentIndex < questions.length - 1 ? (
          <button
            onClick={() => setCurrentIndex((i) => i + 1)}
            className="px-4 py-2 bg-black text-white rounded-md"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!allAnswered}
            className={`px-4 py-2 rounded-md ${
              allAnswered
                ? "bg-green-600 text-white"
                : "bg-gray-400 text-white cursor-not-allowed"
            }`}
          >
            Submit Quiz
          </button>
        )}
      </div>

      {showResult && (
        <div className="mt-6 bg-gray-100 p-4 rounded-md">
          <h4 className="text-xl font-semibold mb-2">Your Score</h4>
          <p>
            {score} out of {questions.length} correct (
            {((score / questions.length) * 100).toFixed(1)}%)
          </p>
        </div>
      )}
    </div>
  );
};

export default QuizPlayer;
