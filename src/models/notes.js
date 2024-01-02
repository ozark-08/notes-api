const mongoose = require("mongoose"); //importing mongoose to refer to the schema for database collection
const validator = require("validator"); //importing validation to validate 

const notesSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:[true,"title already used"],
        index:true,
        maxlength:30,
        ValidityState(value){
           if(!validator.isLength(type, maxlength)){
            throw new Error("title length exceeding")

           }
        }
    },
    content:{
        type:String,
        required:true,
    },
},

{timestamps: true}
)

const Note = new mongoose.model('Note',notesSchema); //creating model schema to export
module.exports = Note; //export notes schema