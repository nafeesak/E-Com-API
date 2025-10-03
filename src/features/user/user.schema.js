import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true},
    email: {
        type: String,
        required: true,
        unique: true,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Please fill a valid email address"]
    },
    password: {
        type: String,
        required: true,
        validate:function(value){
            return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(value)
        },
        message:"Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character"
    },
    type:{type: String, enum:["customer","seller"], default:"customer"}
});
