import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Upload, Link, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setPdfData } from "../Redux/pdfSlice";
import { setFeatureType } from "../Redux/featuresSlice";

const typeMeta = {
  quiz: {
    title: "Convert PDF to Quiz",
    subtitle: "Turn your PDF into interactive quizzes",
    buttonLabel: "Create Quiz",
  },
  true_false: {
    title: "Convert PDF to True/False",
    subtitle: "Turn your PDF into true/false questions",
    buttonLabel: "Create True/False",
  },
  flashcard: {
    title: "Convert PDF to Flashcards",
    subtitle: "Turn your PDF into study flashcards",
    buttonLabel: "Create Flashcards",
  },
};

const GenerateContent = () => {
  const { type } = useParams();
  const [hasDraggedFile, setHasDraggedFile] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("upload");

  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const featureType = useSelector((state) => state.features.featureType);
  const { pdfId, extractedText } = useSelector((state) => state.pdf);
  


 const dispatch = useDispatch();

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileUpload = async (event) => {
   
    const file = event.target.files[0];
    if (!file) {
      console.error("No file selected");
      return;
    }
  
    const formData = new FormData();
    formData.append("pdf", file);
  
    const token = localStorage.getItem("authToken");


    if (!token) {
      console.error("No token found");
      alert("You need to be logged in.");
      return;
    }
    try {
      console.log("Uploading file:", file);
      const response = await fetch("http://localhost:4000/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, 
        },
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log("Upload success:", result);
  
      const pdfId = result.pdf._id;
      const extractedText = result.text;
      dispatch(setFeatureType(featureType));
      dispatch(setPdfData({ pdfId, type: featureType, extractedText }));
      
      alert(result.message);
      navigate(`/PopContent/${type}`);
      closeModal();
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to upload file. Please try again.");
    }
  };
  

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const contentType = typeMeta[type] || typeMeta.quiz;
  useEffect(() => {
    if (type) {
      dispatch(setFeatureType(type));
    }
  }, [type, dispatch]);


  return (
    <div className="flex h-screen">
      {/* Sidebar (you can extract into its own component) */}
      <div className="w-64 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200 font-medium text-gray-700">
          My Files
        </div>
        <div className="p-4">
          <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md">
            New {contentType.buttonLabel}
          </button>
        </div>
        <div className="flex-1 flex items-center justify-center text-center text-gray-500">
          No documents yet. Click above to get started.
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center p-8">
        <h1 className="text-5xl font-bold text-blue-500 mb-2">
          {contentType.title}
        </h1>
        <p className="text-gray-600 mb-12">{contentType.subtitle}</p>

        <div
          className={`border-2 border-dashed border-blue-300 rounded-lg p-12 w-full max-w-xl flex flex-col items-center justify-center ${
            hasDraggedFile ? "border-blue-500 bg-blue-50" : ""
          }`}
          onDragEnter={() => setHasDraggedFile(true)}
          onDragLeave={() => setHasDraggedFile(false)}
          onDragOver={(e) => e.preventDefault()}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Upload Your PDF
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Select or drag your PDF to generate content.
          </p>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-md flex items-center"
            onClick={openModal}
          >
            <Upload size={20} className="mr-2" />
            Select a File
          </button>
        </div>

        {/* Upload PDF */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              <div className="flex justify-between items-center p-6 border-b">
                <h3 className="text-xl font-semibold text-gray-800">
                  Quiz with PDF
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6">
                <p className="text-gray-700 mb-1">
                  Upload a PDF file or provide a URL to start generating
                  quizzes.
                </p>
                <p className="text-gray-500 text-sm mb-5">
                  Free users: Maximum 2 PDFs per day
                </p>

                <div className="grid grid-cols-2 gap-3 mb-5">
                  <button
                    className={`p-3 flex items-center justify-center rounded-md ${
                      activeTab === "upload"
                        ? "bg-blue-50 text-blue-600 border border-blue-200"
                        : "bg-gray-100 text-gray-600"
                    }`}
                    onClick={() => setActiveTab("upload")}
                  >
                    <Upload size={18} className="mr-2" />
                    File Upload
                  </button>
                  <button
                    className={`p-3 flex items-center justify-center rounded-md ${
                      activeTab === "url"
                        ? "bg-blue-50 text-blue-600 border border-blue-200"
                        : "bg-gray-100 text-gray-600"
                    }`}
                    onClick={() => setActiveTab("url")}
                  >
                    <Link size={18} className="mr-2" />
                    URL Import
                  </button>
                </div>

                {/* Upload Area */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400">
                  <p
                    className="text-gray-600 mb-1 cursor-pointer hover:underline"
                    onClick={handleClick}
                  >
                    Click to upload
                  </p>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                  <p className="text-gray-500 text-sm mb-1">PDF (MAX. 10MB)</p>
                  <p className="text-gray-500 text-sm">
                    Free users: Maximum 2 PDFs per day
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerateContent;
