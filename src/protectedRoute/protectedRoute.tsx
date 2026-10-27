


import React, { useContext } from 'react'
import { createdContext } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute(props) {
    const { token, addDataToToken } = useContext(createdContext)
     console.log(token)
    if (!token) {
         return <Navigate to={"/Signin"}></Navigate>
     } else {
        

        return <>
        {props.children}
        
        </>
             
            
        }
}
