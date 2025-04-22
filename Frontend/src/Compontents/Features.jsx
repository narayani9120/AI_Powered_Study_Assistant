import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setFeatureType } from "../Redux/featuresSlice";
const Features = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const features = [
    {
      title: "Upload PDF",
      key: null,
      description: "Upload your course materials in PDF format.",
      icon: "📄",
      color: "bg-red-100",
      action: "Upload Now",
      route: "/generate/uploadfile",
    },
    {
      title: "Quizzes",
      key: "quiz",
      description: "Create and take quizzes to test your knowledge.",
      icon: "📝",
      color: "bg-purple-100",
      action: "Create Quiz",
      route: "/generate/quiz",
    },
    {
      title: "True or False",
      key: "true_false",
      description: "Test your memory with true/false questions.",
      icon: "✔️",
      color: "bg-green-100",
      action: "Create Game",
      route: "/generate/true_false",
    },
    {
      title: "Flashcards",
      key: "flashcard",
      description: "Memorize key points using flashcards.",
      icon: "📇",
      color: "bg-yellow-100",
      action: "Create Flashcards",
      route: "/generate/flashcard",
    },
  ];

  return (
    <div className="px-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2 text-purple-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
          </svg>
          <h2 className="font-bold text-lg">Recent Quizzes</h2>
        </div>
        <a href="#" className="text-purple-600 text-sm flex items-center">
          View All
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`${feature.color} rounded-lg p-4 flex flex-col items-center text-center`}
          >
            <div className="text-4xl mb-2">{feature.icon}</div>
            <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
            <p className="text-sm text-gray-700 mb-4">{feature.description}</p>
            <button
              className="mt-auto bg-purple-600 text-white text-sm px-4 py-2 rounded hover:bg-purple-700 transition"
              onClick={() => {
                if (feature.key) dispatch(setFeatureType(feature.key));
                navigate(feature.route);
              }}
            >
              {feature.action}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
