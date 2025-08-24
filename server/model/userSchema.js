const mongoose = require("mongoose")
const { Schema } = mongoose;

const userSchema = new Schema({
    
    fullName: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 40
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        immutable: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["patient", "doctor"],
        default: "patient",
        required: true
    },
    profilePhotoUrl: {
        type: String,
        default: ""
    },
    phone: {
        type: Number,
        default: null
    },
    dob:{
        type:String,
        default: null 
    },
    location: {
    type: {
      type: String,
      default: ''
    }},
    barcodeIdentifier: {
        type: String,
        required: true,
        unique: true,
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
module.exports = User;
