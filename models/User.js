import mongoose from "mongoose";

const UserSchema= new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    passwordHash:{
        type:String,
        required:true,
    },
    avatarUrl:String,
    pokemons:{
        type:Array,
        default:[]
    },
    money:{
        type:Number,
        default:1000
    },

},{
    timestamps:true
});

export default mongoose.model('User',UserSchema)