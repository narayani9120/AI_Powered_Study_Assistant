import React, { useState } from "react";
import { useParams } from "react-router-dom";
import QuizSetting from "./QuizSetting";
import TrueorFalse from "./TrueOrFalseplayer";


const PopContent = () => {
  const { type } = useParams(); // 'quiz', 'flashcard', or 'true_false'
  const [showModal, setShowModal] = useState(false);

  const openCreateModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const contentType = {
    quiz: {
      title: "Start Learning with Quizzes",
      description:
        "Create quizzes from your PDF document or review your existing quizzes.",
      buttonLabel: "Create Quiz",
      buttonColor: "bg-blue-600 hover:bg-blue-700",
    },
    flashcard: {
      title: "Create Your Flashcards",
      description:
        "Turn your PDF into flashcards to study and memorize easily.",
      buttonLabel: "Create Flashcards",
      buttonColor: "bg-green-600 hover:bg-green-700",
    },
    true_false: {
      title: "Generate True/False Questions",
      description:
        "Convert your PDF into true/false questions to test your knowledge.",
      buttonLabel: "Create True/False",
      buttonColor: "bg-purple-600 hover:bg-purple-700",
    },
  };

  const currentType = contentType[type] || contentType.quiz;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          {currentType.title}
        </h1>

        <p className="text-gray-600 mb-10">{currentType.description}</p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={openCreateModal}
            className={`${currentType.buttonColor} text-white py-3 px-6 rounded-md font-medium text-lg transition-colors`}
          >
            {currentType.buttonLabel}
          </button>

          <button className="bg-white hover:bg-gray-100 text-blue-600 py-3 px-6 rounded-md border border-blue-600 font-medium text-lg transition-colors">
            View {type === "quiz" ? "Quizzes" : type === "flashcard" ? "Flashcards" : "Questions"}
          </button>
        </div>
      </div>

   
      {showModal && type === "quiz" && <QuizSetting onClose={closeModal} />}
      {showModal && type === "true_false" && <QuizSetting onClose={closeModal} />}
     
    </div>
  );
};

export default PopContent;
