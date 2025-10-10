import express from "express";
import { getMyOrders, loginUser, registerUser } from "../services/userService.js";
import type { ExtendRequest } from "../types/extendedRequest.js";
import validateJWT from "../middlewares/validateJWT.js";


const router = express.Router()
router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, email, password,isAdmin } = req.body;
        const { data, statusCode } = await registerUser({ firstName, lastName, email, password,isAdmin})
        res.status(statusCode).json(data);
    } catch (err) {
        res.status(500).send("Somthing went wrong")
    }
})
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const { data, statusCode } = await loginUser({ email, password })
        res.status(statusCode).json(data);
    } catch (err) {
        res.status(500).send("Somthing went wrong")
    }
})
router.get('/my-orders', validateJWT, async (req: ExtendRequest, res) => {
    try {
        // get active cart for user
        const userId = req.user?._id;
        const {data,statusCode} = await getMyOrders({userId})
        console.log(data)
        res.status(200).send(data);
    } catch (err) {
        res.status(500).send("Somthing went wrong")
    }

})
export default router;