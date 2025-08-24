const mongoose = require("mongoose")
const {Schema} = mongoose
const doctorSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    specialization: { type: String,default:"" },
    bio: { type: String ,default:""},
    hospital:[
        {
            location:{
                type:String,
                default:""
            },
            name:{
                type:String,
                default:""
            }
        }
    ]   
})

const Doctor = mongoose.model("Doctor",doctorSchema);
module.exports = Doctor
