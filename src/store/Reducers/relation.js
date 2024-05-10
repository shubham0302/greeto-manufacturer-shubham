import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  data: [],
  error: {},
};

const relationReducer = createSlice({
  name: "relation",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.isLoading = true;
      state.data = [];
      state.error = {};
    },
    fetchSuccess: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.error = {};
    },
    fetchFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.data = [];
    },
  },
});

export default relationReducer.reducer;
export const { actions: setRelation } = relationReducer;
