import {  useState, type FC, type PropsWithChildren } from "react";
import { AuthContext } from "./AuthContext";
import baseUrl from "../../constants/baseUrl";
const USERNAME_KEY="username"
const TOKEN_KEY="token"
export const AuthProvider:FC<PropsWithChildren>=({children})=>{
const [username,setusername]=useState<string | null>(localStorage.getItem(USERNAME_KEY))
const [token,setToken]=useState<string | null>(localStorage.getItem(TOKEN_KEY))
const [myOrders,setMyOrders]=useState([])
const isAuthenticated=!!token
const login=(username:string,token:string)=>{
    setusername(username);
    setToken(token)
    localStorage.setItem(USERNAME_KEY,username)
    localStorage.setItem(TOKEN_KEY,token)
}
const logout=()=>{
    localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem(TOKEN_KEY);
    setusername('');
    setToken('')
}
const getMyOrders=async()=>{
    const response = await fetch(`${baseUrl}/user/my-orders`, {
        method: 'GET',
        headers: {
            'Authorization':`Bearer ${token}`
        }
    });
    if(!response.ok)return;
    const data=await response.json();
 
    setMyOrders(data);
};
 return (
    <AuthContext.Provider value={{username,token,myOrders,isAuthenticated,login,logout,getMyOrders}}>
        {children}
    </AuthContext.Provider>
 )
}
export default AuthProvider;
