//1. Import Express
import express from 'express';
import {upload} from '../../../src/middleware/fileupload.middleware.js'
import ProductController from './product.controller.js';
//2. Initialize Express router
const productRouter=express.Router()
const productController=new ProductController()
//All the paths
//http://localhost:3200/api/products/rate?userId=2&productId=1&rating=4
// //query parameter :localhost:3200/api/products/filter?minPrice=10&maxPrice=20&category=Catergory1
productRouter.post('/rate',productController.rateProduct);
productRouter.get('/filter',productController.filterProducts);
//Route paramter : localhost:3200/api/products/:id
productRouter.get('/',productController.getAllProducts);
productRouter.post('/',upload.single('imageUrl'),productController.addProduct)
productRouter.get('/:id',productController.getOneProduct);

export default productRouter;

//Important
//Yes, it's important to define the filter route before the /:id route in your router configuration. This is because Express processes routes in the order they are defined, and /:id is a dynamic route that can match any string, potentially capturing requests meant for the filter route.

// Here's how you should structure your routes:

// Define the filter route first:

// javascript
// router.get('/filter', filterProducts);
// Then define the route for getting a single product by ID:

// javascript
// router.get('/:id', getOneProduct);
// By placing the filter route before the /:id route, you 
// ensure that requests to /filter are correctly handled by the
//  filterProducts method, and only requests with a specific ID are
//   handled by the getOneProduct method.