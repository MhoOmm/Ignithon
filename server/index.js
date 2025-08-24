const express= require("express");
require("dotenv").config();
const app = express();
const cookie_parser = require("cookie-parser")
const main = require("./config/db")
const authRouter = require("./routes/authRoutes")
const patientRouter = require("./routes/patientRoutes")
const bookrouter = require("./routes/bookingRoutes")
const cors = require("cors")

app.use(express.json())
app.use(cookie_parser())
app.use(cors({
    origin:"https://sanjeevni-frontend-asef.onrender.com",
    credentials:true
}))

app.use("/user", authRouter)
app.use("/patient", patientRouter)
app.use("/doctor", bookrouter)



const initCon = async()=>{
    try{
        await main();
        console.log("Connected to DB");
        const PORT = process.env.PORT || 4000;
        app.listen(PORT, () => {
            console.log(`Server running at port: ${PORT}`);
        });
        
    }catch(e){
        console.log("error in the mongodb Connection"+e)
    }
}

initCon();
