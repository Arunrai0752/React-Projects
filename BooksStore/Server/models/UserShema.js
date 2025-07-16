import mongoose from "mongoose";

const userSchema = mongoose.Schema({

    fullName:{
        type: String,
        require: true,
        
    },
     email:{
        type: String,
        require: true,
        unique: true,
        
        
    },
     password:{
        type: String,
        require: true,
        
    },
     Occupation:{
        type: String,
        require: true,
        
    },
},{timestamps: true})


const User = mongoose.model("User", userSchema);

export default User;