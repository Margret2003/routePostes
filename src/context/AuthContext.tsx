


import React, { createContext, useEffect, useState, type ReactNode } from 'react'
import { jwtDecode } from "jwt-decode";




interface authContextType {
  token: string | null;
  addDataToToken: (tkn :string) => void;
  removeToken : ()=>void
}

interface authPropsType {
  children : ReactNode
}

export const createdContext = createContext<authContextType>({});


export default function AuthContext(props: authPropsType) {

    const [token, settoken] = useState(function(){return localStorage.getItem("token");})

    function addDataToToken(tkn: string) {
        settoken(tkn)
        localStorage.setItem("token" , tkn)

    }
    function removeToken() {
        settoken(null)
        localStorage.removeItem("token")

    }
  const [userId, setuserId] = useState("")
  
  useEffect(function () {
    
    if (token) {
       setuserId(jwtDecode(token).user); 
    }
    },[token])
  
  
  return (
      <createdContext.Provider value={{token , addDataToToken , removeToken , userId}}>
         {props.children} 
    </createdContext.Provider>
  )
}
