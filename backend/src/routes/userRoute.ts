import express from "express";
import { loginUser, registerUser } from "../services/userService.js";


const router = express.Router()
router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const { data, statusCode } = await registerUser({ firstName, lastName, email, password })
        res.status(statusCode).send(data);
    } catch (err) {
        res.status(500).send("Somthing went wrong")
    }
})
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const { data, statusCode } = await loginUser({ email, password })
        res.status(statusCode).send(data);
    } catch (err) {
        res.status(500).send("Somthing went wrong")
    }
})
export default router;