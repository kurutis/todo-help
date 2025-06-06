import { Router } from "express";
import { loginUser, registerUser } from "../controllers/userController.js";

export let router = Router()

router.route('/register')
    .post(registerUser)

router.route('/login')
    .post(loginUser)
