import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  data: [],
  error: {},
};

const productReducer = createSlice({
  name: "product",
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

export default productReducer.reducer;
export const { actions: setProduct } = productReducer;
