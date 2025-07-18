//1. Import Express
import express from 'express';
import { UserController } from './user.controller.js';
//2. Initialize Express router
const userRouter=express.Router()
const userController=new UserController()
//All the paths
userRouter.post('/signup',userController.signUpUser);
userRouter.post('/signin',userController.signInUser);

export default userRouter;