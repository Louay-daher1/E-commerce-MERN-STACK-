import { Box, Container, Typography,TextField, Button } from "@mui/material"
import { useRef, useState } from "react";
import baseUrl from "../constants/baseUrl";
import { useAuth } from "../context/auth/AuthContext";

const RegisterPage=()=>{
    const firstNameRef=useRef<HTMLInputElement>(null);
    const lastNameRef=useRef<HTMLInputElement>(null);
    const emailRef=useRef<HTMLInputElement>(null);
    const passwordRef=useRef<HTMLInputElement>(null);
    const{login} =useAuth();
    
    const[error,setError]=useState("")
    const onSubmit=async()=>{
        const firstName=firstNameRef.current?.value;
        const lastName=lastNameRef.current?.value;
        const email=emailRef.current?.value;
        const password=passwordRef.current?.value;
        if(!firstName||!lastName||!email||!password){
            setError("each field is required")
            return;
        }
        // Make the call to the api to submit user
       const response=await fetch(`${baseUrl}/user/register`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify({
            firstName,
            lastName,
            email,
            password
        })
       });
       if(!response.ok){
        setError('Unable to register user,please try different credientials!');
        return ;
       }
          const token=await response.json()
          if(!token){
            setError("Incorrect Token")
          }
          login(email,token)
          console.log(token)
    }

return (
    <Container >
        <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",mt:4,flexDirection:"column"}}>
         <Typography variant="h6">Register New Account</Typography>
         <Box sx={{display:"flex",flexDirection:"column",gap:2,mt:2,border:1,p:2,borderColor:"#f5f5f5"}}>
            <TextField label="First Name" name="firstname"inputRef={firstNameRef}/>
            <TextField label="Last Name" name="lastname"inputRef={lastNameRef}/>
            <TextField label="Email" name="email" inputRef={emailRef}/>
            <TextField label="Password" name="password" type="password" inputRef={passwordRef}/>
            <Button variant="contained"onClick={onSubmit}>Register</Button>
            {error &&<Typography sx={{color:"red"}}>{error}</Typography>}
         </Box>
        </Box>
       
    </Container>
)
}
export default RegisterPage