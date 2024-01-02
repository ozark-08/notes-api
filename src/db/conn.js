const mongoose = require("mongoose"); //importing mongoose

mongoose.connect("mongodb://localhost:27017/notes-api") //connecting to mongodb using mongoose
.then(()=>{
    console.log("Connection is successful")
}).catch((e)=>{
    console.log(e)
    console.log("No Connection")

})