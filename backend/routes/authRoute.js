import express from 'express'
import { login, logout, signup } from '../controllers/authController.js'
import { isAuth } from '../middlewares/isAuth.js'

const router = express.Router()

router.post('/signup',signup)
router.post('/login',login)
router.get('/logout',isAuth,logout )

export default router