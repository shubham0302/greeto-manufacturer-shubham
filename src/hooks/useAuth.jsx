import React, { useCallback, useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import cookie from "react-cookies";
import { useDispatch } from 'react-redux';
import { getData, postData } from '../utils/serverHelper';
import { setUser } from '../store/Reducers/user';

const useAuth = (autofetch=false) => {
    const userData=useSelector((state)=>state.auth)
    const dispatch=useDispatch()
    const {loading,isLoggedIn,data}=useMemo(()=>{
        let loading=userData?.loading;
        let token=cookie.load("token");
        let isLoggedIn=userData?.isLoggedIn || Boolean(token);
        let data=userData?.data;
        return{loading,isLoggedIn,data}
    },[userData])

    const logout=useCallback(async()=>{
        try {
            let data=await getData("/api/manufacturer/logout")
            dispatch(setUser.logout())
        } catch (error) {
            console.log(error,"error while logging out");
        }
    },[dispatch])

    const fetchProfile=useCallback(async()=>{
        if (isLoggedIn) {
            try {
                let data=await getData("/api/manufacturer/profile")
                dispatch(setUser.loginSuccess(data?.data))
            } catch (error) {
                dispatch(setUser.loginFailed(error))
            }
        }
    },[dispatch])
    const sendOtp=useCallback(async(payload)=>{
        try {
            let data=await postData("/api/manufacturer/login",payload)
        } catch (error) {
            console.log(error,"error in otp send");
        }
    },[])
    const login=useCallback(async(payload)=>{
        dispatch(setUser.loading())
        try {
            let data=await postData("/api/manufacturer/verify-otp",payload)
            dispatch(setUser.loginSuccess(data?.data))
        } catch (error) {
            console.log(error,"error in logging in");
            dispatch(setUser.loginFailed(error))
        }
    },[dispatch])
    useEffect(()=>{
        if(autofetch){
            fetchProfile()
        }
    },[autofetch,fetchProfile])

  return {loading,isLoggedIn,data,sendOtp,login,fetchProfile,logout}
}

export default useAuth
