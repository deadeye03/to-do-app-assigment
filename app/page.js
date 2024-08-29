"use client"
import { fetchAllTask } from "@/actions/taskAction";
import { useState,useEffect } from "react";
import Alltask from "@/components/Alltask";
import AllTaskMobile from "@/components/AllTaskMobile";

export default function Home() {
  const [allTask, setAllTask] = useState([])
  const getAllTask = async(page) => {
    const tasks=await fetchAllTask(page)
    setAllTask(tasks.allTask)
  }
  useEffect(() => {
    getAllTask();
  }, [])
  return (
    <>
      <div className="sm:hidden">
      <Alltask/>
      </div>
      <div className="md:hidden lg:hidden xl:hidden">
        <AllTaskMobile allTask={allTask}/>
      </div>
    </>
  );
}
