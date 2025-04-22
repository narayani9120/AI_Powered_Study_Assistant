const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: { type: [String], required: true },
  correct_answer: { type: String, required: true },
});

const pdfSchema = new mongoose.Schema({
  user_id:String,
  pdf_id: String,
  filename: String,
  originalName: String,
  uploadedBy: String,
  extractedText: String,
  lastFeatureUsed: {
    type: String,
    enum: ['quiz', 'flashcard', 'true_false', 'chat'],
  },
  questions: {
    type: [questionSchema],
    default: []
  }
}, { timestamps: true });

module.exports = mongoose.model('PDF', pdfSchema);
