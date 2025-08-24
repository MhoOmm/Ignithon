const express= require("express");
require("dotenv").config();
const app = express();
const cookie_parser = require("cookie-parser")
const main = require("./config/db")
const authRouter = require("./routes/authRoutes")
const patientRouter = require("./routes/patientRoutes")
const cors = require("cors")

app.use(express.json())
app.use(cookie_parser())

app.use("/user",authRouter);

app.use("/patient",patientRouter)

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

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
