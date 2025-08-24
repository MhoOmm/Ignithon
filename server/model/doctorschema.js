const mongoose = require("mongoose")
const {Schema} = mongoose
const doctorSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    specialization: { type: String, required: true },
    yearsOfExperience: { type: Number, required: true },
    bio: { type: String },
    contactEmail: { type: String, required: true },
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
