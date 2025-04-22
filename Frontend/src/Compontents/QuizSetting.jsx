import React, { useState } from "react";
import { ArrowLeft, X, ChevronDown } from "lucide-react";
import { useSelector } from "react-redux";
import QuizPlayer from "./QuizPlayer"; // This should handle both types
import TrueOrFalseplayer from "./TrueOrFalseplayer";
// You can create a separate TrueFalsePlayer if needed.

const QuizSetting = () => {
  const [numQuestions, setNumQuestions] = useState("5");
  const [difficulty, setDifficulty] = useState("Mixed");
  const [showDifficultyDropdown, setShowDifficultyDropdown] = useState(false);
  const [questions, setQuestions] = useState([]);
  const { extractedText, pdfId, type } = useSelector((state) => state.pdf);

  const handleStart = async () => {
    try {
      const response = await fetch("http://localhost:5000/generate-content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pdfId: pdfId,
          num_questions: parseInt(numQuestions),
          difficulty: difficulty.toLowerCase(),
          type: type, // "quiz" or "true_false"
        }),
      });

      const data = await response.json();
      console.log("RESPONSE FROM BACKEND:", data);

      if (data.questions) {
        console.log("Received Questions:", data.questions);
        setQuestions(data.questions);

      } else {
        console.error("No questions found:", data.message);
      }
    } catch (err) {
      console.error("Failed to fetch content", err);
    }
  };

  const displayLabel =
    type === "true_false" ? "True/False Quiz" : "Interactive Quiz";
  const startButtonText =
    type === "true_false" ? "Start True/False" : "Start Quiz";

  return (
    <div className="fixed inset-0 bg-white z-50 md:flex md:items-center md:justify-center overflow-y-auto">
      <div className="max-w-md w-full mx-auto p-4">
        {questions.length > 0 ? (
          type === "true_false" ? (
            <TrueOrFalseplayer questions={questions} difficulty={difficulty} />
          ) : (
            <QuizPlayer
              questions={questions}
              difficulty={difficulty}
              type={type}
            />
          )
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <button className="p-2">
                <ArrowLeft size={24} />
              </button>
              <h2 className="text-xl font-bold">{displayLabel}</h2>
              <button className="p-2">
                <X size={24} />
              </button>
            </div>

            {/* Number of Questions */}
            <div className="mb-6">
              <label className="block text-gray-800 font-medium mb-2">
                Number of Questions
              </label>
              <input
                type="number"
                value={numQuestions}
                onChange={(e) => setNumQuestions(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
                min="1"
              />
            </div>

            {/* Difficulty Dropdown */}
            <div className="mb-8">
              <label className="block text-gray-800 font-medium mb-2">
                Difficulty
              </label>
              <div className="relative">
                <button
                  className="w-full p-3 border border-gray-300 rounded-md bg-white flex items-center justify-between"
                  onClick={() =>
                    setShowDifficultyDropdown(!showDifficultyDropdown)
                  }
                >
                  <div>
                    <div>{difficulty}</div>
                    {difficulty === "Mixed" && (
                      <div className="text-sm text-gray-500">
                        Varied difficulty levels
                      </div>
                    )}
                  </div>
                  <ChevronDown size={20} />
                </button>

                {showDifficultyDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                    {["Easy", "Medium", "Hard", "Mixed"].map((level) => (
                      <button
                        key={level}
                        className="w-full text-left p-3 hover:bg-gray-100"
                        onClick={() => {
                          setDifficulty(level);
                          setShowDifficultyDropdown(false);
                        }}
                      >
                        <div>{level}</div>
                        {level === "Mixed" && (
                          <div className="text-sm text-gray-500">
                            Varied difficulty levels
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Start Button */}
            <button
              className="w-full bg-black text-white py-4 rounded-md font-medium"
              onClick={handleStart}
            >
              {startButtonText}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default QuizSetting;
