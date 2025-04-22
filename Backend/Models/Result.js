const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema({
  question: { type: String, required: true },
  correctAnswer: { type: String, required: true },
  selectedAnswer: { type: String },
  isCorrect: { type: Boolean, required: true },
});

const ResultSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  pdfId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PDF",
  },
  type: {
    type: String,
    enum: ["quiz", "flashcard", "true_false"],
    required: true,
  },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard", "mixed"],
    default: "mixed", // optional default
  },
  totalQuestions: Number,
  correctAnswers: Number,
  wrongAnswers: Number,
  percentage: Number,
  date: {
    type: Date,
    default: Date.now,
  },
  answers: [AnswerSchema],
});

module.exports = mongoose.model("QuizResult", ResultSchema);
