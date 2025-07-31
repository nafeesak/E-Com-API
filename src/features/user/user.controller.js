import  UserModel  from "./user.model.js";
import jwt from 'jsonwebtoken';
import UserRepository from "./user.repository.js";
import { ApplicationError } from "../../error-handler/applicationError.js";
import bcrypt from 'bcryptjs'
export class UserController{
    constructor(){
        this.userRepository=new UserRepository()
    }
    async signUpUser(req,res){
        try{
        const {name,email,password,type}=req.body;
        const hashedPassword=await bcrypt.hash(password,12)//Salt value can be in between 10-20
        const user= new UserModel(name,email,hashedPassword,type);
        await this.userRepository.signUp(user)
        res.status(201).send(user);
        } catch(err){
         throw new ApplicationError("Something went wrong",500)
        }

    }
   async signInUser(req,res,next){
    try{
        //1.Find User by Email
        const user=await this.userRepository.findByEmail(req.body.email);
        if(!user){
            return res.status(400).send("Incorrect Credential")
        }else{
            //2. compare password with hashedPassword
            const result=await bcrypt.compare(req.body.password,user.password);
            if(!result){
            return res.status(400).send("Incorrect Creditial")
             }else{
            // 3.Create a Token //Dont store or pass password in payloads
            const token=jwt.sign({userID:result.id,email:result.email},
                process.env.JWT_SECRET,
                {
                    expiresIn:'2d'
                }
            )
            // 4. Send token to clinet
            return res.status(200).send(token)
        }
        }
    }catch(err){
        //console.log(err)
         throw new ApplicationError("Something went wrong",500);
        
        }
       
    }
}