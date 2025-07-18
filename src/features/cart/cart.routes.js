//1. Import Express
import express from 'express';
import { CartController } from './cart.controller.js';
//2. Initialize Express router
const cartRouter=express.Router()
const cartController=new CartController()
//All the paths
cartRouter.delete('/:id',cartController.delete)
cartRouter.post('/',cartController.add);
cartRouter.get('/',cartController.get);

export default cartRouter;