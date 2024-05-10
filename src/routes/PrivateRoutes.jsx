import { Box } from '@mui/material'
import React from 'react'
import { Navbar } from '../App'
import useAuth from '../hooks/useAuth'
import { Navigate } from 'react-router-dom'

const PrivateRoutes = ({children}) => {
    const {isLoggedIn,loading}=useAuth(true)
    if(isLoggedIn){
        return (
          <Box display={"flex"} width={"100%"}>
              <Navbar />
              <Box
                fontFamily={"Poppins"}
                bgcolor={"white"}
                flex={1}
                height={"100vh"}
                overflow={"auto"}
              >
                {children}
              </Box>
            </Box>
        )
    }
    if(loading){
        return <p>Loading...</p>
    }
    return <Navigate to={"/login"}/>
}

export default PrivateRoutes
