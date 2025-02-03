import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchEasyQuestion = createAsyncThunk(
  'easyQs/fetchEasyQuestion',
  async () => {
    try {

      const response = await axios.request('http://localhost:8080/problems');
      return response.data; 
    } catch (error) {
      throw Error('Failed to fetch easy questions');
    }
  }
);

const codingSlice = createSlice({
  name: 'easyQs',
  initialState: {
    easyQuestions: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchEasyQuestion.fulfilled, (state, action) => {
      state.easyQuestions = Array.isArray(action.payload) ? action.payload : [action.payload];
      state.status = 'succeeded';
    })
    .addCase(fetchEasyQuestion.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(fetchEasyQuestion.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  }
});

export default codingSlice.reducer;
