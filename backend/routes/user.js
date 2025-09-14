import express from 'express'
import {userSignup,userLogin,getUser} from '../controller/user.js'
const router = express.Router()

router.post('/signup',userSignup)
router.post('/login',userLogin)
router.get('/user/:id',getUser)

export default router