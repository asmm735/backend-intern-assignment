import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import notesRoutes from './routes/notesRoutes.js';  
import { connectDB } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';


dotenv.config();
//console.log(process.env.MONGO_URI);
//const express = require('express'`);
const app =express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

if(process.env.NODE_ENV !== 'production'){
    app.use(
    cors({
        origin:"http://localhost:5173",
    })
);}
app.use(express.json());
//middleware to parse JSON bodies

app.use(rateLimiter);

// app.use((req,res,(next)=>{
//     console.log(`Request method is ${req.method} and Request URL is ${req.url}`);
//     next();
// });

app.use("/api/notes",notesRoutes);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,'../frontend/dist'))); 
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'../frontend/dist/index.html'));
});
}
//app.use("/api/products",productRoutes);

connectDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log('Server is running on port: ', PORT);
    });
});
