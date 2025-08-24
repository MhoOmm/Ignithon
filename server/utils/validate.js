const validator=require("validator")

const namevalid=(name)=>{
    if(typeof name !== "string"){
        return false 
    }
    if(name.length < 4 || name.length>40){
        return false
    }
    return true
}

const validate=(data)=>{

    if (!data || typeof data !== "object") {
        throw new Error("Invalid request body");
    }
    const mandatoryField=["email", "fullName", "password", "role", "phone"];

    const isAllowed=mandatoryField.every((k)=>Object.keys(data).includes(k));

    if(!isAllowed){
        throw new Error("Fields Missing");
    }

    if(!validator.isEmail(data.email)){
        throw new Error("Email format is incorrect")
    }

    if(!validator.isStrongPassword(data.password)){
        throw new Error("Give strong password")
    }

    if(!namevalid(data.fullName)){
        throw new Error("Name should be within the 3 to 20 characters")
    }
     
}

module.exports = validate