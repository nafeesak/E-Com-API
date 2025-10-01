import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import CartModel from "./cart.model.js";

export default class CartItemsRepository {
  constructor() {
    this.collection = "cartItems";
  }

  async add(productId, userId, quantity) {
    try {
      // 1.Get Database
      const db = getDB();
      //2. Get the Collection
      const collection = db.collection(this.collection);
      const id=await this.getNextCounter(db);
      //3. Insert the collection
      // await collection.insertOne({
      //   productId: ObjectId.createFromHexString(productId),
      //   userId: ObjectId.createFromHexString(userId),
      //   quantity,
      // });
      //Find the document
      //either update or insert
      console.log(id)
       await collection.updateOne({
        productId: ObjectId.createFromHexString(productId),
        userId: ObjectId.createFromHexString(userId),
        
      },
      {
        $setOnInsert:{_id:id},
        $inc:{
        quantity:quantity
      }},
      {upsert:true});
    } catch (err) {
      throw new ApplicationError("Something went wrong with Database", 500);
    }
  }
  async get(userId){
    try {
      // 1.Get Database
      const db = getDB();
      //2. Get the Collection
      const collection = db.collection(this.collection);
      //3. Insert the collection
      return await collection.find({
        userId: ObjectId.createFromHexString(userId)
      }).toArray();
    } catch (err) {
      throw new ApplicationError("Something went wrong with Database", 500);
    }
  }
  async delete(cartItemId,userId){
    try {
      // 1.Get Database
      const db = getDB();
      //2. Get the Collection
      const collection = db.collection(this.collection);
      //3. Delete the collection
      const result= await collection.deleteOne({
        _id: ObjectId.createFromHexString(cartItemId),
          userId: ObjectId.createFromHexString(userId),
      });
    
       return result.deletedCount>0;
    } catch (err) {
      throw new ApplicationError("Something went wrong with Database", 500);
    }
  }
  async getNextCounter(db){
    const resultDocument=await db.collection("counters").findOneAndUpdate(
      {_id:"cartItemId"},
      {$inc:{value:1}},
      {returnDocument:"after"}
    )
  // console.log(resultDocument.value)
    return resultDocument.value;
  }
}
