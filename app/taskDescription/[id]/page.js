"use client"
import TaskDetails from '@/components/TaskDetails';
import React, { useEffect, useState } from 'react'

function Page(params) {
    const id=params.params.id;
    const [task,setTask]=useState({})

    const getTask=async()=>{
        const response=await fetch(`/api/mobileTask/${id}`)
        
        const res=await response.json()
        if (res.success) {
            // console.log("response is",res.result)
            setTask(res.result) 
            // console.log('task is ',task)         
        }
        else{
            // console.log('something is wrong')
        }

    }
    useEffect(()=>{
        getTask();
    },[])
    useEffect(()=>{
        // console.log('taskkk is ',task)

    },[task])
  return (
    <div>
      <TaskDetails desc={task.description} title={task.title} id={id} />
    </div>
  )
}

export default Page
