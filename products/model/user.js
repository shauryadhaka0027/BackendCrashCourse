import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true,unique:true},
    number:String,
    age:String,
    gender:{type:String, enum:["Male", "Female"]},
    isMarried:{type:Boolean, default:false},

})

const User=mongoose.model("User",userSchema)

export default User;