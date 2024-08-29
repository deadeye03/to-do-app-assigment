const { NextResponse } = require("next/server");
import Task from "@/model/Task";
import { connectDB } from "@/db/connectDB";
export async function POST(req) {
    
    const data=await req.json();
   
    try {
        await connectDB();
        const res=await Task.create(data)

        return NextResponse.json({success:true})
        
    } catch (error) {
        console.log("error is ",error)
        return NextResponse.json({success:false,error})
    }

}