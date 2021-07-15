require('dotenv').config()
const express=require("express")
const ejs =require("ejs")

const mongoose=require("mongoose")
const encrypt=require("mongoose-encryption")
mongoose.connect('mongodb://localhost:27017/UserDB', {useNewUrlParser: true, useUnifiedTopology: true})

const userSchema = new mongoose.Schema({
    email:String,
    password:String
})
// console.log(process.env.API_KEY )
userSchema.plugin(encrypt,{secret: process.env.SECRET,encryptedFields: ['password']})
const User=mongoose.model("User",userSchema)

const app=express()
 
app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static("public"))

app.get('/',(req,res)=>{
    res.render("home")
})
app.get('/register',(req,res)=>{
    res.render("register")
})
app.get('/login',(req,res)=>{
    res.render("login")
})

app.post('/register',(req,res)=>{
    const newUser= new User({
        email:req.body.username,
        password:req.body.password
    })
    newUser.save((err)=>{
        if(!err){
            res.render("secrets")
        }else{
            consaole.log(err)
        }
    })
})

app.post('/login',(req,res)=>{
        const username=req.body.username
        const password=req.body.password
    User.findOne({email:username},(err,foundUser)=>{
        if(foundUser){
            if(foundUser.password === password){
                res.render("secrets")
            }   
        }else{
            console.log(err)
        }
    })
})
app.listen(3000,()=>{
    console.log("secrets running in port 30000")
})
