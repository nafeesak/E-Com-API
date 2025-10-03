import mongoose from 'mongoose';
import { userSchema } from './user.schema.js';
import { ApplicationError } from '../../error-handler/applicationError.js';
const UserModel = mongoose.model('User', userSchema);
export default class UserRepository {
  async signUp(newUser) {
    try{
    const user = new UserModel(newUser);
    await user.save();
    return user;
    }catch(err){
       console.log(err);
                   if(err instanceof mongoose.Error.ValidationError){
                       throw err;
                   }else{
                       console.log(err);
                       throw new ApplicationError("Something went wrong with database", 500);
                   }
                }
  }
  async signIn(email,password) {
    try{
        return await UserModel.findOne({email,password});
    }catch(err){
        throw new Error("Something went wrong with Database");
    }
}
async findByEmail(email) {
    try{
        return await UserModel.findOne({email});
    }catch(err){
        throw new Error("Something went wrong with Database");
    }
}
async updatePassword(userID,hashedPassword){
    try{
        return await UserModel.updateOne({_id:userID},{password:hashedPassword});
    }catch(err){
        throw new Error("Something went wrong with Database");
    }   
}
};