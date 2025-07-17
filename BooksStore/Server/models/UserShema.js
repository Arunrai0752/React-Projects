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
     occupation:{
        type: String,
        require: true,
        
    },
},{timestamps: true})


const User = mongoose.model("User", userSchema);

export default User;