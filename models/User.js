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
        default:[{name:'BigDuck',url:"https://i.pinimg.com/564x/e5/83/b2/e583b27c52c5fe0813bdd140655cafb3.jpg",hpNow:10000,hpAll:10000},{name:'MonkeyBox',url:"https://static.wikia.nocookie.net/anime-characters-fight/images/0/0e/%D0%9F%D1%80%D0%B0%D0%B9%D0%BC%D1%8D%D0%B9%D0%BF%D0%90%D1%80%D1%82.png/revision/latest?cb=20201222113449&path-prefix=ru",hpNow:30000,hpAll:30000}]
    }

},{
    timestamps:true
});

export default mongoose.model('User',UserSchema)