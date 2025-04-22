// src/redux/slices/quizSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalQuestions: 0,
  correctAnswers: 0,
  currentQuestionIndex: 0,
  selectedAnswers: [], // optional
  isSubmitted: false,
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setTotalQuestions: (state, action) => {
      state.totalQuestions = action.payload;
    },
    incrementCorrectAnswers: (state) => {
      state.correctAnswers += 1;
    },
    nextQuestion: (state) => {
      state.currentQuestionIndex += 1;
    },
    resetQuiz: () => initialState,
    markSubmitted: (state) => {
      state.isSubmitted = true;
    },
  },
});

export const {
  setTotalQuestions,
  incrementCorrectAnswers,
  nextQuestion,
  resetQuiz,
  markSubmitted,
} = quizSlice.actions;

export default quizSlice.reducer;
