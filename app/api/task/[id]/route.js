const { NextResponse } = require("next/server");
import Task from "@/model/Task";
import { connectDB } from "@/db/connectDB";
export async function PUT(req,params) {

    const id=params.params.id;
    const data=await req.json();
   
    try {
        await connectDB();
        const res=await Task.findByIdAndUpdate(id,{description:data})

        return NextResponse.json({success:true})
        
    } catch (error) {
        console.log("error is ",error)
        return NextResponse.json({success:false,error})
    }

}
export async function DELETE(req,params) {
    const id=params.params.id;
    try {
        await connectDB();
        const res=await Task.findByIdAndDelete(id)

        return NextResponse.json({success:true})
        
    } catch (error) {
        console.log("error is ",error)
        return NextResponse.json({success:false,error})
    }

}