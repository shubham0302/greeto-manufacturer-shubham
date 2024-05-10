import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading:false,
  isLoggedIn:false,
  data:{},
  error:{}
};

const authReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    loading: (state) => {
      state.loading = true;
      state.error={}
    },
    loginSuccess:(state,action)=>{
        state.data=action.payload
        state.isLoggedIn=true
        state.loading=false
        state.error={}
    },
    loginFailed:(state,action)=>{
        state.error=action.payload
        state.isLoggedIn=false;
        state.loading=false;
        state.data={}
    },
    logout:(state)=>{
      state.error={}
      state.data={}
      state.isLoggedIn=false
      state.loading=false
    }
  },
});

export default authReducer.reducer;
export const { actions:setUser } = authReducer;
