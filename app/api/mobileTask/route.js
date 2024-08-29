import express from "express";
import { connectDB } from "@/db/connectDB";
import Task from "@/model/Task";

const app=express.Router();

app.get('/',async(req,res)=>{
    try {
        await connectDB();
        const tasks=await Task.find().limit(4)
        console.log(tasks)
        res.json({
            status:'success',
            tasks
        })

    } catch (error) {
        res.json({
            status:'failed',
            error
        })
    }
})

export default app;
