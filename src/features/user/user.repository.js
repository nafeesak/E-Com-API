import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

export default class UserRepository{
    async signUp(newUser){
        try{
        // 1.Get Database
        const db=getDB();
        //2. Get the Collection
        const collection = db.collection("users")
        //3. Insert the collection
        await collection.insertOne(newUser)
         return newUser;
        }
        catch(err){
            throw new ApplicationError("Something went wrong with Database",500)
            } 
    }
       async findByEmail(email){
        try{
        // 1.Get Database
        const db=getDB();
        //2. Get the Collection
        const collection = db.collection("users")
        //3. Find the collection
        return await collection.findOne({email})
        }
        catch(err){
           // console.log(err)
            throw new ApplicationError("Something went wrong with Database",500)
            }
       
    }
}