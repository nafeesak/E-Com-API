//1. Import Express
import express from 'express';
import { UserController } from './user.controller.js';
//2. Initialize Express router
const userRouter=express.Router()
const userController=new UserController()
//All the paths
userRouter.post('/signup',(req,res)=>{
    userController.signUpUser(req,res)
});
userRouter.post('/signin',(req,res)=>{
    userController.signInUser(req,res)
});

export default userRouter;