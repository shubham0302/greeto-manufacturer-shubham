import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import useAuth from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const nav=useNavigate()
    const {sendOtp,login}=useAuth()
    const [data, setData] = useState({
        credentials: "",
        otp: ""
    })
    const [step, setStep] = useState(0)
    const handleChange=(e)=>{
        setData((prev)=>{return {...prev,[e.target.name]:e.target.value}})
    }
    const otpClick=()=>{
        setStep(1)
        sendOtp({credentials:data.credentials})
    }
    const loginClick=()=>{
        login(data)
        nav("/")
    }
    return (
        <Box width={"100%"} height={"100vh"} display={"flex"} alignItems={"center"}>
            <Box width={"50%"} height={"90%"} display={"flex"} justifyContent={"center"} alignItems={"center"} p={10} >
                <img src="/loginImage.jpg" alt="login image" />
            </Box>
            <Box width={"45%"} height={"90%"} bgcolor={"#FAFAFA"} borderRadius={4} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                <Box width={"50%"}>
                    <Typography variant='h4'>Welcome Back</Typography>
                    <Typography variant='caption'>Sign in to continue</Typography>
                    {
                        step === 0 && (
                            <>
                                <Typography variant='body2' mt={2} mb={"4px"}>Email</Typography>
                                <TextField value={data?.credentials} name='credentials' onChange={handleChange} variant='outlined' fullWidth placeholder='xyz@demo.com'/>
                                <Button onClick={otpClick} fullWidth sx={{py:1,borderRadius:10,bgcolor:"black",color:"white",mt:4,":hover":{bgcolor:"black",color:"white"}}}>Send Otp</Button>
                            </>
                        )
                    }
                    {
                        step === 1 && (
                            <>
                                <Typography variant='body2' mt={2} mb={"4px"}>Enter Otp</Typography>
                                <TextField value={data?.otp} name='otp' onChange={handleChange} variant='outlined' fullWidth placeholder='otp'/>
                                <Button onClick={loginClick} fullWidth sx={{py:1,borderRadius:10,bgcolor:"black",color:"white",mt:4,":hover":{bgcolor:"black",color:"white"}}}>Login</Button>
                            </>
                        )
                    }
                </Box>
            </Box>
        </Box>
    )
}

export default Login
