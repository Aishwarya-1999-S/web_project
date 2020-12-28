const mongoose=require('mongoose')
//const passportLocalMongoose=require('passport-local-mongoose')
var UserSchemea=new mongoose.Schema({
    username: String,
    password:String,
    email:String
})
module.exports=mongoose.model('User',UserSchemea)