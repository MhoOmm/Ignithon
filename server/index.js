const express= require("express");
require("dotenv").config();
const app = express();
const cookie_parser = require("cookie-parser")
const main = require("./config/db")

app.use(express.json())
app.use(cookie_parser())

const initCon = async()=>{
    try{
        await main();
        console.log("Connected to DB");
        app.listen("4000",()=>{
            console.log("server running at port no: 4000");
        })
        
    }catch(e){
        console.log("error in the mongodb Connection"+e)
    }
}

initCon();
