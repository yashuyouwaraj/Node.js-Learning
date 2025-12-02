const express = require("express")

const app=express()

//define middleware function
const myFirstMiddle=(req,res,next)=>{
    console.log("this first middleware will run on every request")
    
    next()
}

app.use(myFirstMiddle)

app.get("/",(req,res)=>{
    res.send("Home Page")})

app.get("/about",(req,res)=>{
    res.send("About Page")
    })

app.listen(3000,()=>{
    console.log(`Server is now running on port 3000`)
})