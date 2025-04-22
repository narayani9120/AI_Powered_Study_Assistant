// store.js
import { configureStore } from '@reduxjs/toolkit';
import featuresReducer from './featuresSlice';
import pdfReducer from './pdfSlice';
import userReducer from './userSlice';
import quizReducer from './quizSlice';
const store = configureStore({
  reducer: {
    features: featuresReducer,
    pdf:pdfReducer, 
    user: userReducer,
    quiz: quizReducer, 
    
  },
});

export default store;
