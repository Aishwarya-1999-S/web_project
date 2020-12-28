const path=require('path')
const express=require('express')
const ejs=require('ejs')
const bodyParser = require('body-parser')
const mongoose = require('mongoose') 
const User= require('../model/User')

const app=express()
var port=process.env.PORT || 3000
app.use(bodyParser.urlencoded({extended:true}))

const viewpath=path.join(__dirname,'./views')
console.log(viewpath)

const publicDirectirtPath=path.join(__dirname,'../public')
console.log(publicDirectirtPath)
app.use(express.static(publicDirectirtPath))

mongoose.connect('mongodb://localhost/web_mini_project', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB Connected...'))
    .catch((err) => console.log(err))


app.set('view engine','ejs')
app.set('views',viewpath)

app.get('/',(reg,res)=> {
    res.render("index")
})

app.get('/login',(reg,res)=> {
    res.render("login")
})

app.get('/register',(reg,res)=> {
    res.render("register")
})

app.post('/login',(req,res)=> {
    const email=req.body.email
    const password=req.body.password
    console.log(email)
    const user={
        email:req.body.email,
        password:req.body.password
    }
    User.find(user,function(err, user){
        if(err){
            console.log(err)
        }else {
            console.log('user logged in')
            res.redirect('/')
        }
    })
    console.log(password)
    res.redirect('/')
})

app.post('/register',(reg,res)=> {
    const email=reg.body.email
    const password=reg.body.password
    const username=reg.body.username
    const newUser={ 
        username:username,
        email:email,
        password:password
    }
    User.create(newUser,function(err,user){
       if(err){
           console.log(err)
       } else {
           console.log(user)
           res.redirect('/login')
       }
    })
    res.redirect('/')
})

app.listen(port, () => {
    console.log('Server is up on port ' +port)
})