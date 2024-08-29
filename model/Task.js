import mongoose from "mongoose";
const formatDate=(today)=>{
    const formattedDate = today.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    
      return formattedDate
}
const taskSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,'A task mush have title']
    },
    description:{
        type:String
    },
    createdAt:{
        type:String,
        default:formatDate(new Date())
    }

})

const Task=mongoose.models.Task || mongoose.model("Task",taskSchema)

export default Task;