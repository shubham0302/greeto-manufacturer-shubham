import React from 'react'
import useAuth from '../hooks/useAuth'
import { Navigate } from 'react-router-dom'

const PublicRoutes = ({children}) => {
    const {isLoggedIn,loading}=useAuth()
    if (!isLoggedIn) {
        return children
    }
    if(loading){
        return <p>Loading...</p>
    }
    return <Navigate to={"/"}/>
}

export default PublicRoutes
