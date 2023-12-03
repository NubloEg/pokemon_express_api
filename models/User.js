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
    boss:{
        type:Array,
        default:[{name:'BigDuck',url:"https://i.pinimg.com/564x/e5/83/b2/e583b27c52c5fe0813bdd140655cafb3.jpg",hpNow:10000,hpAll:10000},{name:'MonkeyBox',url:"https://i.pinimg.com/564x/8c/63/37/8c63377bfdb3fd5e852062a0f1d8777e.jpg",hpNow:30000,hpAll:30000}]
    }

},{
    timestamps:true
});

export default mongoose.model('User',UserSchema)