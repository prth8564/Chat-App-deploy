import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import path from 'path';
import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';

import { app , server } from "./socket/socket.js";
import  connectToMongoDB  from "./db/connectToMongoDB.js"


dotenv.config();
const __dirname = path.resolve();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use("/api/messages" , messageRoutes);
app.use("/api/auth" , authRoutes);
app.use("/api/users" , userRoutes);


app.use(express.static(path.join(__dirname , "/frontend/dist")))

app.get("*" ,(req,res) => {
    res.sendFile(path.join(__dirname , "frontend" , "dist", "index.html"));
} )

server.listen(PORT , ()=>{ 
    connectToMongoDB();
    console.log(`Listening at ${PORT}`)
});