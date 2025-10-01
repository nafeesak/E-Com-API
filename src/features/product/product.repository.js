import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

export default class ProductRepository{
    constructor(){
        this.collection="products"
    }
    async add(newProduct){
        try{
        // 1.Get Database
        const db=getDB();
        //2. Get the Collection
        const collection = db.collection(this.collection)
        //3. Insert the collection
        await collection.insertOne(newProduct)
         return newProduct;
        }
        catch(err){
            throw new ApplicationError("Something went wrong with Database",500)
            } 
    }
       async get(id){
        try{
        // 1.Get Database
        const db=getDB();
        //2. Get the Collection
        const collection = db.collection(this.collection)
        //3. Find the collection
        return await collection.findOne({_id:ObjectId.createFromHexString(id)})
        }
        catch(err){
           // console.log(err)
            throw new ApplicationError("Something went wrong with Database",500)
            }   
    }
    async getAll(){
        try {       
        const db=getDB();
        const collection = db.collection(this.collection)
        return await collection.find().toArray();
        } catch (err) {
               throw new ApplicationError("Something went wrong with Database",500)
        }
    }
       async filter(minPrice,categories){
        try {       
        const db=getDB();
        const collection = db.collection(this.collection);
        let filterExpression={}
        if(minPrice){
            filterExpression.price ={$gte:parseFloat(minPrice)}
        }
        //  if(maxPrice){
        //     filterExpression.price ={...filterExpression.price,$lte:parseFloat(maxPrice)}
        // }
        //['cat1','cat2']
        categories=JSON.parse(categories.replace(/'/g,'"'))
         if(categories){
            filterExpression={$or:[{category:{$in:categories}},filterExpression]}
          //  filterExpression.category =category;
        }

        return await collection.find(filterExpression).project({name:1,price:1,_id:0,ratings:{$slice:1}}).toArray();
        } catch (err) {
               throw new ApplicationError("Something went wrong with Database",500)
        }
    }
    //  async rating(userId,productId,rating){
    //     try {       
    //     const db=getDB();
    //     const collection = db.collection(this.collection);
    //     //1. Find the product
       // const product=await collection.find({_id:ObjectId.createFromHexString(productId)});
        //2. Find the rating
       // const userRating=product?.ratings?.find(r=>r.userId===userId);
        // if(userRating){
        //     //3. Update the Rating
        //     await collection.updateOne({
        //         _id:ObjectId.createFromHexString(productId),"ratings.userId":ObjectId.createFromBase64(userId)
        //     },{
        //         $set:{
        //             "ratings.$.rating":rating
        //         }
        //     })

    //  await collection.updateOne({ 
    //         _id:new ObjectId(productId)
    //     },{
    //         $pull:{ratings:{userId:new ObjectId(userId)}}
    //     })
    //     const result=
    //          await collection.updateOne({
    //         _id:new ObjectId(productId)
    //     },{
    //         $push:{ratings:{userId:new ObjectId(userId),rating}}
    //     })
    //     console.log(result)
        
    //     } catch (err) {
    //         console.log(err)
    //            throw new ApplicationError("Something went wrong with Database",500)
    //     }
    // }
    async rating(userID, productID, rating){
            try{
                const db = getDB();
                const collection = db.collection(this.collection);
                
                // 1. Removes existing entry
                await collection.updateOne({
                    _id:ObjectId.createFromHexString(productID)
                },
                {
                    $pull:{ratings:{userID: ObjectId.createFromHexString(userID)}}
                })
    
                // 2. Add new entry
                await collection.updateOne({
                    _id:ObjectId.createFromHexString(productID)
                },{
                    $push: {ratings: {userID:ObjectId.createFromHexString(userID), rating}}
                })
    
            }catch(err){
                console.log(err);
                throw new ApplicationError("Something went wrong with database", 500);
            }
        }
        
        async averageProductPricePerCategory(){
            try{
                const db=getDB();
                return await db.collection(this.collection)
                    .aggregate([
                        {
                            // Stage 1: Get Vaerge price per category
                            $group:{
                                _id:"$category",
                                averagePrice:{$avg:"$price"}
                            }
                        }
                    ]).toArray();
            }catch(err){
                console.log(err);
                throw new ApplicationError("Something went wrong with database", 500);    
            }
        }
}