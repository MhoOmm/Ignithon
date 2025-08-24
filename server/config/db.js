const mongoose = require("mongoose");
require("dotenv").config();

async function main(){
    await mongoose.connect('mongodb+srv://alonewolfshi92:83KXWObDS5mY1AWc@ignithon.bua8qtu.mongodb.net/Sanjeevani')
}
module.exports=main