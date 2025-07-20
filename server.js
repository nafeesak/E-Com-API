//1. Import Express
import express from 'express';
import swagger from 'swagger-ui-express';
import cors from 'cors';
import productRouter from './src/features/product/product.routes.js';
import userRouter from './src/features/user/user.routes.js';
import cartRouter from './src/features/cart/cart.routes.js';
import bodyParser from 'body-parser'
//import basicAuthorizer from './src/middleware/basicAuth.middleware.js';
import jwtAuth from './src/middleware/jwt.middleware.js';

import loggerMiddleware from './src/middleware/logger.middleware.js';
import { ApplicationError } from './src/error-handler/applicationError.js';

import apiDocs from './swagger.json' with { type: 'json' };
//2. Create Server
const server=express();
//CORS policy configuartion
//using package cors

var corsOptions = {
  origin: 'http://127.0.0.1:5500',
  allowedHeaders: '*' // some legacy browsers (IE11, various SmartTVs) choke on 204
}
server.use(cors(corsOptions))
//using cors res header
//'http://localhost:5500' to '*' for public access
// server.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500'); // Match the actual origin
//     res.header('Access-Control-Allow-Headers', '*'); // Consider specifying exact headers
//     res.header('Access-Control-Allow-Methods', '*'); // Consider specifying exact methods

//     // Return OK for preflight request
//     if (req.method === "OPTIONS") {
//         res.sendStatus(200);
//     } else {
//         next();
//     }
// });
//parsing data into json format
server.use(bodyParser.json())
//for all the request related to Product, redirt to product routes
//localhost:3200/api/products

// Bearer <token>
server.use("/api-docs", 
swagger.serve, 
swagger.setup(apiDocs))
//logData


server.use(loggerMiddleware);

//products
server.use('/api/products',jwtAuth,productRouter)
server.use('/api/users',userRouter)

server.use('/api/cart',loggerMiddleware,jwtAuth,cartRouter)


//3.default request handler
server.get('/',(req,res)=>{
    res.send("Welcome to E-commerce API")
})
//Error handler middleware
server.use((err,req,res,next)=>{
    console.log(err);
    //aplication error
      if (err instanceof ApplicationError){
        res.status(err.code).send(err.message);
      }
    
    //server error
    res.status(500).send('Oops! Something went wrong... Please try again later!')
})
//4. Middleware to handle 404 request
//5. Server listeninng port
server.use((req,res)=>{
    res.status(404).send("API not found. Please check our documentation for more information at /api-docs")
})
const PORT=3200;

server.listen(PORT,(req,res)=>{
    console.log(`Server listening on ${PORT}`)
})