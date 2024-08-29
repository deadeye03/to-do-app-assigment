"use server"
import mongoose from "mongoose";

export const connectDB=async()=>{
    // console.log(process.env.DATABASE);
    try {
        await mongoose.connect("mongodb+srv://sourabh_database:uDKXcoKvhfDFBQzG@cluster0.liillx1.mongodb.net/to-do-app");
        }
     catch (error) {
        ('database connection failed',error)
    }
    
}