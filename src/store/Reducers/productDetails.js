import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  data: {},
  category:[],
  relation:[],
  error: {},
};

const productDetailsReducer = createSlice({
  name: "productDetails",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.isLoading = true;
      state.data = {};
      state.category=[];
      state.relation=[];
      state.error = {};
    },
    registerData: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.error = {};
    },
    registerCategory:(state,action)=>{
        state.category=action.payload
        state.isLoading=false;
        state.error={}
    },
    registerRelation:(state,action)=>{
        state.relation=action.payload
        state.isLoading=false;
        state.error={}
    },
    fetchFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.data = {};
      state.category=[];
      state.relation=[];
    },
  },
});

export default productDetailsReducer.reducer;
export const { actions: setProductDetails } = productDetailsReducer;
