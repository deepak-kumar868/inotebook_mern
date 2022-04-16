const express=require('express');
const router=express.Router();
const fetchuser=require('../Middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const Notes=require('../Models/Notes');
const app=express();

//ROUTE1:Get a notes using GET:api/notes/fetchallnotes.Login required
router.get('/fetchallnotes',fetchuser,async(req,res)=>{
    try {
        const notes=await Notes.find({user:req.user.id})
        res.json(notes);
    } catch (error) {
        res.status(401).send("Something went wrong");
    }
})


//ROUTE2:Add notes using POST:api/notes/addnotes.Login required.
router.post('/addnotes',fetchuser,[
    body('title','Enter suitable title').isLength({ min: 5 }),
    body('description','Length of description must be greater then 10').isLength({ min: 10 }),
],async(req,res)=>{
     //If there are errors,return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {

        const {title,description,tag}=req.body;
        const note=new Notes({
            title,description,tag,user:req.user.id
        })
        const savedNotes=await note.save();
        res.json(savedNotes);

    } catch (error) {
       res.status(400).send("Something went wrong");
    }
})


//ROUTE3:Update an existing Note using:PUT /api/notes/updatenotes.Login required
router.put('/update/:id',fetchuser,async(req,res)=>{
    const {title,description,tag}=req.body;
    
    //create a newnote object
        const newnote={};
        if(title){newnote.title=title};
        if(description){newnote.description=description};
        if(tag){newnote.tag=tag};
    

    //Update the node
    // try {
        let note=await Notes.findById(req.params.id);
    if(!note){
        return res.status(404).send("Not found");
    }

    if(note.user.toString()!==req.user.id){
        return res.status(401).send("Not Allowed");
    }

    note=await Notes.findByIdAndUpdate(req.params.id,{$set:newnote},{new:true});
    res.json({note});
    // } catch (error) {
        // res.status(400).send("something went wrong")
    // }
})


//ROUTER4:Delete an existing note using DELETE:api/notes/delete/:id
router.delete('/delete/:id',fetchuser,async(req,res)=>{
    const {title,description,tag}=req.body;

    //Delete the node
    try {
        let note=await Notes.findById(req.params.id);
    if(!note){
        return res.status(404).send("Not found");
    }

    if(note.user.toString()!==req.user.id){
        return res.status(401).send("Not Allowed");
    }

    note=await Notes.findByIdAndDelete(req.params.id);
    res.json({success:"Successfully delete the node"});
    } catch (error) {
        res.status(400).send("something went wrong")
    }
})

module.exports=router