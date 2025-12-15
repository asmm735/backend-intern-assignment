import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
    {   
        title: {    
            type: String,
            required: true,
        },      
        content: {  
            type: String,
            required: true,
        },
    },
    {timestamps: true} //created At and updated At fields
);
const Note = mongoose.model("Note", noteSchema);
export default Note; //we will import this note to other files if we want to modifyor something
