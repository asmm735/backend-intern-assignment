import express from "express";
import { createNote, deleteNote, getAllNotes, updateNote, getNoteById } from "../controllers/notesController.js";
import { verifyToken } from "../middleware/auth.js";
import { noteValidation } from "../middleware/validators.js";

const router = express.Router();

// All routes require authentication
router.use(verifyToken);

router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.post("/", noteValidation, createNote);
router.put("/:id", noteValidation, updateNote); 
router.delete("/:id", deleteNote);

export default router;

