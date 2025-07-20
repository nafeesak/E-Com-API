import ProductModel from "./product.model.js";
export default class ProductController{
    getAllProducts(req,res){
     const products=ProductModel.getAll();
     res.status(200).send(products)
    }
    addProduct(req,res){
        // console.log(req.body)
        // console.log('this is post request');
        // res.status(200).send("post request recieved");
        const { name, desc, price, imageUrl,category,sizes}=req.body;
        const newProduct={
            name,
            desc,
            price:parseFloat(price),
            sizes:sizes.split(','),
            imageUrl:req.file.filename,
            category,
        }
        const createdRecord=ProductModel.add(newProduct);
        
        res.status(201).send(createdRecord);
    }   
    rateProduct(req,res){
         console.log(req.query)
        const userID=req.query.userId;
        const productID=req.query.productId;
        const rating=req.query.rating;
        try{
            ProductModel.rateProduct(userID,productID,rating);
        }catch(err){
             return res.status(400).send(err.message)
        }
            return res.status(200).send("Rating has been added")
        
    }
    getOneProduct(req,res){
        const id=req.params.id;
        const product=ProductModel.get(id);
        if(!product){
            res.status(404).send('Product not product')
        }else{
            return res.status(200).send(product)
        }
    }
    
    filterProducts(req,res){
        const minPrice=req.query.minPrice;
        const maxPrice=req.query.maxPrice;
        const category=req.query.category;
       const result= ProductModel.filter(minPrice,maxPrice,category);
       res.status(200).send(result)
    }
}