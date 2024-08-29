import React, { useEffect } from 'react'
import Image from 'next/image'
import { useState,useRef } from 'react'
import { useRouter } from 'next/navigation';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";
function TaskDetails({ desc, title,id }) {
  const router=useRouter();
  const [descValue, setDescValue] = useState(desc)
  const inputRef=useRef(null)
  const buttonRef=useRef(null)
  // const Screenwidth=window.innerWidth;
  useEffect(()=>{
    
  },[desc,descValue])
  const handleChange=(e)=>{
    setDescValue(e.target.value)
  }
  const openEdit=(desc)=>{
    setDescValue(desc)
    buttonRef.current.style.display='none'
    inputRef.current.style.display='block'
  }
  const updateTask=async()=>{
    const res = await fetch(`/api/task/${id}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(descValue)
     })
     const response = await res.json()
        if (response.success) {
            toast('successfully updated task')
            location.reload();
        }
        else {
            toast('Unable upadate task')
        }
  }
  const deleteTask=async()=>{
    const res = await fetch(`/api/task/${id}`, {
      method: 'DELETE'
     })
     const response = await res.json()
        if (response.success) {
            toast('successfully Deleted task')
            // if (Screenwidth >= 641) {
            //   location.reload();
              
            // }
            // else{
              router.push('/');
            // }
        }
        else {
            toast('Unable upadate task')
        }
  }
  return (
    <>
    <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                limit={1}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light" />
            <ToastContainer />
      <div className='px-8 py-9 h-full flex flex-col gap-2'>
        <div className='flex justify-between pb-2 border-slate-950 border-b'>
          <h1 className='text-4xl capitalize text-black font-extrabold'>{title}</h1>
          <button onClick={deleteTask}>
          <Image src="/img/delete.png" height={16} width={36} alt='delete'></Image>
          </button>
        </div>
          <p className='bg-black text-white' ref={buttonRef} onClick={()=>openEdit(desc)}>{desc}</p>
        <textarea
          value={descValue}
          onChange={handleChange}
          className='w-full  hidden border-none focus:outline-none text-start p-0 leading-normal resize-none'
          rows="4"
          cols="50"
          ref={inputRef}
        />
        <button className="w-min self-end text-white bg-gradient-to-r from-red-500 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={updateTask}>Update</button>
      </div>
    </>
  )
}

export default TaskDetails
