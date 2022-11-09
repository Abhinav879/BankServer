// server db integration

//import
const mongoose=require('mongoose')

//state connection string using mongoose
mongoose.connect('mongodb://localhost:27017/Bankserver',{useNewUrlParser:true})

//define database(bankserver) model(collection)
//collection name...."users"....User
const User=mongoose.model('User',{
    acno:Number,
    username:String,
    password:Number,
    balance:Number,
    transaction:[]
})

//export model to use in server
module.exports={
    User
}
