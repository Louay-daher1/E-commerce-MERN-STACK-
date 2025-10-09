import { createContext, useContext } from "react";
interface AuthContextType{
username:string|null;
token:string|null;
myOrders:any[];
login:(username:string,token:string)=>void;
isAuthenticated:boolean;
logout:()=>void;
getMyOrders:()=>void;
}
export const AuthContext=createContext<AuthContextType>({username:null,token:null,myOrders:[],login:()=>{},logout:()=>{},getMyOrders:()=>{},isAuthenticated:false})
export const useAuth=()=>useContext(AuthContext);