const fs = require("fs").promises; // Use promises for cleaner async/await
const pdfParse = require("pdf-parse");
const axios = require("axios");
const PDF = require("../Models/UploadPDF");

const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    const filePath = req.file.path;
    const dataBuffer = await fs.readFile(filePath);
    const pdfData = await pdfParse(dataBuffer);
    const extractedText = pdfData.text;

    const newPdf = new PDF({
      filename: req.file.filename,
      originalname: req.file.originalname,
      uploadedBy: req.user.username, 
      extractedText,
      // We don't generate questions here anymore
    });

    await newPdf.save();

    res.status(200).json({
      message: "PDF uploaded successfully",
      pdf: newPdf,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Upload failed", error });
  }
};

const generateQuestions = async (req, res) => {
  try {
    const { pdfId, num_questions, difficulty, type } = req.body; // Expecting the ID of the uploaded PDF document

    const pdfDocument = await PDF.findById(pdfId);
    if (!pdfDocument) {
      return res.status(404).json({ message: "PDF not found." });
    }

    const aiResponse = await axios.post(
      "http://localhost:5000/generate-content",
      {
        text: pdfDocument.extractedText,
        num_questions,
        difficulty,
        type,
      }
    );

    const content = aiResponse.data.content;
    pdfDocument.generatedContent = content;
    pdfDocument.lastFeatureUsed = type;
    await pdfDocument.save();

    res
      .status(200)
      .json({ message: "Questions generated successfully", content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Question generation failed", error });
  }
};

const getFiles = async (req, res) => {
  try {
    const pdfs = await PDF.find({ uploadedBy: req.user.username }); // Only show files for the logged-in user
    res.status(200).json(pdfs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch files", error });
  }
};

module.exports = {
  uploadFile,
  getFiles,
  generateQuestions,
};
