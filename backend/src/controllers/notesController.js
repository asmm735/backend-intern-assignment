import Note from "../models/Note.js";
import mongoose from "mongoose";

export async function getAllNotes(req,res){
    try{
        const { category } = req.query;
        
        // Build filter - admins see all notes, users see only their own
        const filter = req.user.role === 'admin' ? {} : { userId: req.user.id };
        if (category) filter.category = category;
        
        const notes = await Note.find(filter)
            .populate('userId', 'username email')
            .sort({createdAt: -1});
        res.status(200).json(notes);
    }catch(error){
        console.error("Error retrieving getAllNotes controller: ", error);
        res.status(500).json({message: "Internal server error"});
    }
};

export async function getNoteById(req,res){
    try{
        if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({message: "Invalid note ID"});
        }
        const note = await Note.findById(req.params.id).populate('userId', 'username email');
        if(!note) return res.status(404).json({message: "Note not found"});
        
        // Check if user owns the note or is admin
        if (note.userId._id.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({message: "Access denied"});
        }
        
        res.status(200).json(note);
    }catch(error){
        console.error("Error retrieving getNoteById controller: ", error);
        res.status(500).json({message: "Internal server error"});
    }           
};

export async function createNote(req,res){
    try{
        const {title, content, category} = req.body;
        
        // Validation
        if(!title || !content) {
            return res.status(400).json({message: "Title and content are required"});
        }
        
        if(category && !['Personal', 'Work', 'Others'].includes(category)) {
            return res.status(400).json({message: "Category must be Personal, Work, or Others"});
        }
        
        const note = new Note({
            title, 
            content, 
            category: category || 'Others',
            userId: req.user.id
        });
        const savedNote = await note.save();
        res.status(201).json(savedNote);
    }  catch(error){                
        console.error("Error retrieving createNotes controller: ", error);
        if(error.name === 'ValidationError') {
            return res.status(400).json({message: error.message});
        }
        res.status(500).json({message: "Internal server error"});
    }
};

export async function updateNote(req,res){
    try{
        if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({message: "Invalid note ID"});
        }
        
        // Check if note exists and user owns it
        const existingNote = await Note.findById(req.params.id);
        if(!existingNote) return res.status(404).json({message: "Note not found"});
        
        if (existingNote.userId.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({message: "Access denied"});
        }
        
        const {title, content, category} = req.body;
        
        // Validation
        if(title !== undefined && !title.trim()) {
            return res.status(400).json({message: "Title cannot be empty"});
        }
        
        if(content !== undefined && !content.trim()) {
            return res.status(400).json({message: "Content cannot be empty"});
        }
        
        if(category && !['Personal', 'Work', 'Others'].includes(category)) {
            return res.status(400).json({message: "Category must be Personal, Work, or Others"});
        }
        
        const updateData = {};
        if(title !== undefined) updateData.title = title;
        if(content !== undefined) updateData.content = content;
        if(category !== undefined) updateData.category = category;
        
        const updateNote= await Note.findByIdAndUpdate(req.params.id, updateData, {new: true, runValidators: true});
        if(!updateNote) return res.status(404).json({message: "Note not found"});
        res.status(200).json(updateNote);
    }catch(error){
        console.error("Error retrieving updateNote controller: ", error);
        if(error.name === 'ValidationError') {
            return res.status(400).json({message: error.message});
        }
        res.status(500).json({message: "Internal server error"});
    }
};

export async function deleteNote(req,res){
    try{
        if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({message: "Invalid note ID"});
        }
        
        // Check if note exists and user owns it
        const existingNote = await Note.findById(req.params.id);
        if(!existingNote) return res.status(404).json({message: "Note not found"});
        
        if (existingNote.userId.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({message: "Access denied"});
        }
        
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if(!deletedNote) return res.status(404).json({message: "Note not found"});
        res.status(200).json({message: "Note deleted successfully"});                       
    }catch(error){
        console.error("Error retrieving deleteNote controller: ", error);
        res.status(500).json({message: "Internal server error"});
    }
};