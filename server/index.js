const express= require("express");
require("dotenv").config();
const app = express();
const cookie_parser = require("cookie-parser")

app.use(express.json())
app.use(cookie_parser())

app.listen("4000",()=>{
    console.log("the app is running at port no 4000")
})
