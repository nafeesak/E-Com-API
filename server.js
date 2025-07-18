//1. Import Express
import express from 'express'
import productRouter from './src/features/product/product.routes.js';
import userRouter from './src/features/user/user.routes.js';
import cartRouter from './src/features/cart/cart.routes.js';
import bodyParser from 'body-parser'
//import basicAuthorizer from './src/middleware/basicAuth.middleware.js';
import jwtAuth from './src/middleware/jwt.middleware.js';
//Create Server
const server=express();

//parsing data into json format
server.use(bodyParser.json())
//for all the request related to Product, redirt to product routes
//localhost:3200/api/products
server.use('/api/products',jwtAuth,productRouter)
server.use('/api/users',userRouter)

server.use('/api/cart',jwtAuth,cartRouter)


//default request handler
server.get('/',(req,res)=>{
    res.send("Welcome to E-commerce API")
})

const PORT=3200;

server.listen(PORT,(req,res)=>{
    console.log(`Server listening on ${PORT}`)
})