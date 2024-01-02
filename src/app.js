const express = require("express"); //importing express for requests
require("./db/conn"); //importing database connection to app.js
const Note = require("./models/notes"); //importing notes schema to app.js


const app = express();
const port = process.env.PORT || 3000; //creating dynamic port for future hosting
app.use(express.json())

//create new notes
app.post("/notes",(req,res)=>{
    console.log(req.body)
    const user = new Note(req.body);

    user.save().then(() => {
        res.status(201).send(user);
    }).catch((e)=>{
        res.status(400).send(e);
    })
    
})

//getting all notes
app.get("/notes",async(req,res)=>{
    try {
        const getNotes = await Note.find()
        res.send(getNotes)
    } catch (e) {
        res.send(e)
    }
    
})

//getting specific note
app.get("/notes/:id",async(req,res)=>{
    try {
       const _id = req.params.id;
       const getNoteById = await Note.findById({_id});
       if(!getNoteById){
        return res.status(404).send()
       }
       else{
        res.send(getNoteById)
       }
    } catch (e) {
        res.status(500).send(e)
    }
    
})


//updating notes
app.patch("/notes/:id",async(req,res)=>{
    try {
        const _id = req.params.id;
        const updateNotes = await Note.findByIdAndUpdate(_id,req.body,{
            new : true
        })
        res.send(updateNotes)
    } catch (e) {
        res.status(404).send(e)
    }
})

//delete notes
app.delete("/notes/:id",async(req,res)=>{
    try {
        const _id = req.params.id;
        const DeleteNote = await Note.findByIdAndDelete(_id)
        if(!_id){
            return res.status(404).send()
           }
           else{
            res.send(DeleteNote)
           }
    } catch (e) {
        res.status(500).send(e)
    }
})




app.listen(port,()=>{
    console.log(`connection is setup at ${port}`);
})