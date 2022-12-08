const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDatabase = require("./config/database");
const dotenv = require("dotenv");
// import bodyParser from "body-parser"

const app = express()
// app.use(bodyParser.json()); 
// app.use(bodyParser.urlencoded())
app.use(express.json())
// app.use(express.urlencoded())
app.use(cors())
dotenv.config({
    path:"./config/config.env",
})

connectDatabase();

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const User = new mongoose.model("User", userSchema)

//Routes
app.post("/login", (req, res)=> {
    const { email, password} = req.body
    User.findOne({ email: email}, (err, user) => {
        if(user){
         
            if(password === user.password ) {
                res.send({message: "Login Successfull", user: user})
            } else if(password!==user.password){
                res.send({ message: "Password didn't match"})
                
            }
        } else {
            res.send({message: "User not registered"})
        }
    })
}) 

app.post("/register", (req, res)=> {
    const { name, email, password} = req.body
    User.findOne({email: email}, (err, user) => {
        if(user){
            res.send({message: "User already registerd"})
        } else {
            const user = new User({
                name,
                email,
                password
            })
            user.save(err => {
                if(err) {
                    res.send(err)
                } else {
                    res.send( { message: "Successfully Registered, Please login now." })
                }
            })
        }
    })
    
}) 


app.listen(process.env.PORT,async()=>{
    try
        {
            await connect();
        }
    catch(err)
        {
            console.log({err:err.message})
        }

    console.log(`listening on port ${process.env.PORT}`)

})