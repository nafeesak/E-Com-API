//1. Import Express
import express from 'express';
import { UserController } from './user.controller.js';
import jwtAuth from '../../middleware/jwt.middleware.js';
//2. Initialize Express router
const userRouter=express.Router()
const userController=new UserController()
//All the paths
userRouter.post('/signup',(req,res,next)=>{
    userController.signUpUser(req,res,next)
});
userRouter.post('/signin',(req,res)=>{
    userController.signInUser(req,res)
});
userRouter.post('/password-reset',jwtAuth,(req,res)=>{
    userController.passwordReset(req,res)
});

export default userRouter;