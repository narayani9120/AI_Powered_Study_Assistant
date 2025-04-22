// featuresSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPDFs = createAsyncThunk('features/fetchPDFs', async () => {
  const response = await axios.get('/api/files');
  return response.data;
});

const featuresSlice = createSlice({
  name: 'features',
  initialState: {
    pdfs: [],
    loading: false,
    error: null,
    featureType: null,
  },
  reducers: {
    setFeatureType: (state, action) => {
        state.featureType = action.payload;
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPDFs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPDFs.fulfilled, (state, action) => {
        state.pdfs = action.payload;
        state.loading = false;
      })
      .addCase(fetchPDFs.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export const { setFeatureType } = featuresSlice.actions;
export default featuresSlice.reducer;
