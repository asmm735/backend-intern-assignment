import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
    {   
        title: {    
            type: String,
            required: [true, 'Title is required'],
            trim: true,
            minlength: [1, 'Title cannot be empty'],
            maxlength: [100, 'Title cannot exceed 100 characters']
        },      
        content: {  
            type: String,
            required: [true, 'Content is required'],
            trim: true,
            minlength: [1, 'Content cannot be empty']
        },
        category: {
            type: String,
            required: [true, 'Category is required'],
            enum: {
                values: ['Personal', 'Work', 'Others'],
                message: 'Category must be Personal, Work, or Others'
            },
            default: 'Others'
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User ID is required']
        }
    },
    {timestamps: true} //created At and updated At fields
);
const Note = mongoose.model("Note", noteSchema);
export default Note; //we will import this note to other files if we want to modifyor something
