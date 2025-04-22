import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const TrueOrFalseplayer = ({ questions = [],difficulty }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);

  const navigate = useNavigate();
  const { userId } = useSelector((state) => state.user);
  const { pdfId } = useSelector((state) => state.pdf);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    const correct =
      questions[currentQuestion].correct_answer === (answer ? "True" : "False");
    if (correct) setScore((prev) => prev + 1);

    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("authToken");

    if (!userId || !pdfId || !token) {
      alert("Missing credentials. Please log in again.");
      return;
    }

    const resultData = {
      userId,
      pdfId,
      type: "true_false",
      difficulty: difficulty?.toLowerCase() || "mixed",
      totalQuestions: questions.length,
      correctAnswers: score,
      answers: userAnswers,
    };
    console.log("Submitting resultData:", resultData);
    try {
      const response = await fetch("http://localhost:4000/result", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(resultData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        console.log("Result stored successfully:", result);
        navigate("/");
      } else {
        console.error("Failed to store result:", result.message);
        alert("Failed to submit result. Try again.");
      }
    } catch (error) {
      console.error("Error submitting result:", error);
      alert("Submission error. Please try again.");
    }
  };
  if (!questions.length) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <p className="text-lg text-gray-700">No questions available.</p>
        </div>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-white text-gray-800">
        <div className="bg-white p-10 rounded-2xl shadow-lg max-w-md w-full">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center">
              <span className="text-3xl font-bold text-indigo-600">
                {Math.round((score / questions.length) * 100)}%
              </span>
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-4 text-center">
            Quiz Complete!
          </h2>
          <p className="text-xl mb-8 text-center">
            Your Score:{" "}
            <span className="font-semibold text-indigo-600">{score}</span> /{" "}
            {questions.length}
          </p>
          <div className="flex justify-center">
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              onClick={handleSubmit}
            >
              Submit Result
            </button>
          </div>
        </div>
      </div>
    );
  }

  const current = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="flex justify-center items-center min-h-screen bg-white p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-xl w-full">
        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div
            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="flex justify-between items-center mb-8">
          <span className="bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-semibold">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span className="text-sm font-medium text-gray-500">
            Score: {score}
          </span>
        </div>

        <div className="mb-10 px-4">
          <p className="text-xl text-gray-800 font-medium text-center leading-relaxed">
            {current.question}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mb-6">
          <button
            className={`flex-1 px-6 py-4 rounded-xl font-medium text-lg transition-all duration-200 transform hover:scale-102 ${
              selectedAnswer === true
                ? "bg-green-600 text-white ring-4 ring-green-200"
                : "bg-white text-gray-800 border-2 border-gray-200 hover:border-indigo-400 hover:bg-indigo-50"
            } shadow-sm hover:shadow-md disabled:opacity-70`}
            onClick={() => handleAnswer(true)}
            disabled={selectedAnswer !== null}
          >
            True
          </button>
          <button
            className={`flex-1 px-6 py-4 rounded-xl font-medium text-lg transition-all duration-200 transform hover:scale-102 ${
              selectedAnswer === false
                ? "bg-red-600 text-white ring-4 ring-red-200"
                : "bg-white text-gray-800 border-2 border-gray-200 hover:border-indigo-400 hover:bg-indigo-50"
            } shadow-sm hover:shadow-md disabled:opacity-70`}
            onClick={() => handleAnswer(false)}
            disabled={selectedAnswer !== null}
          >
            False
          </button>
        </div>

        <div className="text-center text-sm text-gray-500 mt-6">
          {selectedAnswer !== null
            ? "Processing your answer..."
            : "Select True or False"}
        </div>
      </div>
    </div>
  );
};

export default TrueOrFalseplayer;
