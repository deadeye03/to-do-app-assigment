const { NextResponse } = require("next/server");
import Task from "@/model/Task";
import { connectDB } from "@/db/connectDB";
export async function GET(req,params) {
   
    const id=params.params.id;
    
   
    try {
        await connectDB();
        const result=await Task.findById(id)
        return NextResponse.json({success:true ,result})
        
    } catch (error) {
        console.log("error is ",error)
        return NextResponse.json({success:false,error})
    }

}