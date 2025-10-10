import { Box, Container, Typography, TextField, Button } from "@mui/material"
import { useRef, useState } from "react";
import baseUrl from "../constants/baseUrl";
import { useAuth } from "../context/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "@mui/material";
const LoginPage = () => {

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate()
    const { login } = useAuth();

    const [error, setError] = useState("")
    const onSubmit = async () => {

        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        if (!email || !password) {
            setError("each field is required")
            return;
        }
        // Make the call to the api to submit user
        const response = await fetch(`${baseUrl}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

                email,
                password
            })
        });
        if (!response.ok) {
            setError('Unable to login user,please try different credientials!');
            return;
        }
        const token = await response.json()
        if (!token) {
            setError("Incorrect Token")
            return;
        }
        login(email, token)
        navigate('/');
    }

    return (
        <Container >
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 4, flexDirection: "column" }}>
                <Typography variant="h6">Login to Your Account</Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2, border: 1, p: 2, borderColor: "#f5f5f5" }}>
                    <TextField label="Email" name="email" inputRef={emailRef} />
                    <TextField label="Password" name="password" type="password" inputRef={passwordRef} />
                    <Typography variant="body2" align="center">Don't have an account?{" "} <Link href="/register" underline="hover"> Sign up</Link></Typography>
                    <Button variant="contained" onClick={onSubmit}>Login</Button>
                    {error && <Typography sx={{ color: "red" }}>{error}</Typography>}
                </Box>
            </Box>

        </Container>
    )
}
export default LoginPage