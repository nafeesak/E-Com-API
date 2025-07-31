import { MongoClient } from "mongodb";


let client;
export const connectToMongodb=()=>{
    MongoClient.connect(process.env.DB_URL)
    .then(clientInstance=>{
        client=clientInstance
        console.log("MongoDB is connected")
    })
    .catch(err=>{
        console.log(err)
    })
}
export const getDB=()=>{
 return client.db();
}

// const connectToMongodb=async()=>{
//     try{
//     await MongoClient.connect(url)
//         console.log("MongoDB is connected")
//     }
//     catch(err){
//         console.log(err)
//     }
// }
// export default connectToMongodb;