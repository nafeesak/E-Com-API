import  UserModel  from "./user.model.js";
import jwt from 'jsonwebtoken';
export class UserController{
    signUpUser(req,res){
        const {name,email,password,type}=req.body;
        const user=UserModel.signUp(name,email,password,type);
        res.status(201).send(user);

    }
    signInUser(req,res){
        const result=UserModel.signIn(req.body.email,req.body.password);
        if(!result){
            return res.status(400).send("Incorrect Creditial")
        }else{
            // 1.Create a Token //Dont store or pass password in payloads
            const token=jwt.sign({userID:result.id,email:result.email},
                'Kg7CTDFMWEt6GueE3wkujj6uCYpwaebg',
                {
                    expiresIn:'2d'
                }
            )
            // 2. Send token to clinet
            return res.status(200).send(token)
        }
    }
}