// redux/pdfSlice.js
import { createSlice } from '@reduxjs/toolkit';

// pdfSlice.js or featureSlice.js
const initialState = {
    pdfId: null,
    type: null,
    featureType: null,
    extractedText: null,
  };
  
  const pdfSlice = createSlice({
    name: "pdf",
    initialState,
    reducers: {
      setPdfData: (state, action) => {
        state.pdfId = action.payload.pdfId;
        state.type = action.payload.type;
        state.extractedText = action.payload.extractedText;
      },
      setFeatureType: (state, action) => {
        state.featureType = action.payload;
      },
    },
  });
  
  export const { setPdfData } = pdfSlice.actions;
  export default pdfSlice.reducer;
  
