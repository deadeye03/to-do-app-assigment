"use client"
import React, { useRef, useState, useEffect } from 'react'
import { fetchAllTask, searchAllTask } from '@/actions/taskAction'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link'
import { ToastContainer, toast } from "react-toastify";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from 'use-debounce';

// THIS IS FOR MOBILE PHONE SCREEN SIZE
function Alltask() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const inputRef = useRef(null)
    const searchRef = useRef(null)
    const [count, setCount] = useState(1)
    const [allTask, setAllTask] = useState([])
    const [isLoading, setIsLoading] = useState(true);
/**
 * Fetches all tasks for a given page and updates the state with the fetched tasks.
 *
 * - A promise that resolves when the tasks have been fetched and state updated.
 */
const getAllTask = async (page) => {
    const tasks = await fetchAllTask(page);
    setAllTask(tasks.allTask);
    setIsLoading(false);
}

    useEffect(() => {
        getAllTask();

    }, [])
/**
 * Handles the form submission by sending the provided data to the server.
 * 
 *  - A promise that resolves when the submission is complete.
 */
const onSubmit = async (data) => {
    data = await data;
    // console.log(data);
    const res = await fetch('/api/task', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const response = await res.json();
    if (response.success) {
        toast('successfully added task');
        location.reload();
    } else {
        toast('Unable to add task');
    }
};
    const showForm = () => {
        // console.log('show')
        inputRef.current.style.opacity = '95%'
        inputRef.current.style.visibility = 'visible'
    }
/**
 * Closes the form by setting the opacity to 0 and visibility to hidden.
 */
const closeForm = () => {
    inputRef.current.style.opacity = '0';
    inputRef.current.style.visibility = 'hidden';
}

/**
 * Prevents the form from closing by stopping the event propagation.
 *
 *  - The event object.
 */
const notCloseForm = (e) => {
    e.stopPropagation();
}
    const showSearchBar = () => {
        searchRef.current.style.display = 'block';
        searchRef.current.style.width = '70%'
    }
    const closeSearchBar = () => {
        searchRef.current.style.display = 'none';
        searchRef.current.style.width = '0%'
    }
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const router = useRouter();
    let queries = ''
    /**
     * Handles the change event with a debounced callback.
     * This function updates the query parameters in the URL, performs a search for tasks,
     * and updates the state with the search results.
     *
     * - The search query string.
     */
    const handleChange = useDebouncedCallback(async (query) => {
        setIsLoading(true);
        queries = query;
        // console.log("query is ", query);

        const params = new URLSearchParams(searchParams);
        if (query) params.set("query", query);
        else params.delete("query");

        router.replace(`${pathName}?${params.toString()}`);

        const tasks = await searchAllTask(query);
        // console.log("task is ", tasks);

        setAllTask(tasks);
        setIsLoading(false);
    }, 1000);
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={2000}
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


            <section className='relative px-16 pt-7   h-[calc(100vh-82px)] flex gap-12 sm:pt-3 sm:px-3' >
                <div className='w-[40%] sm:w-[100%]'>
                    <div className=' mb-7 flex justify-between items-center relative'>
                        <button className='p-2 bg-black rounded-md flex items-center gap-1' onClick={showForm}>
                            <Image src="/img/add-task.png" height={20} width={20} alt='add task'></Image>
                            <span className='text-white'>TODO</span>
                        </button>
                        <input ref={searchRef} type="text" className='p-2 h-full w-[0%] hidden rounded-md ease-out transition-all' placeholder='search task ' onChange={(e) => handleChange(e.target.value)} defaultValue={searchParams.get("query") ?? ""} />
                        <button className='p-1 rounded-md bg-white' onClick={showSearchBar}>
                            <Image src="/img/search.png" height={30} width={30} alt='search button'></Image>
                        </button>
                    </div>
                    {(isLoading && <div className='loading mt-40'>
                        <span className="text-black text-3xl mr-8 lh-n">LOADING</span> <span className="btn1 btn"></span><span className="btn2 btn"></span><span className="btn3 btn"></span><span className="btn4 btn"></span><span className="btn5 btn"></span>
                    </div>)}
                    {(!isLoading && allTask.length > 0 &&
                        allTask.map((task, i) => {
                            return <div onClick={closeSearchBar} className='bg-white rounded-md mb-3 px-4 py-2 hover:outline' key={i}>
                                <Link href={`/taskDescription/${task._id}`}
                                    className="w-full mb-3  ">
                                    <h2 className='font-extrabold mb-1  uppercase text-black text-start'>{task.title} </h2>
                                    <p className='flex gap-3 items-center'>
                                        <span className='line-clamp-2 text-start w-[calc(111%-12px)] '>{task.description} </span>
                                        <p className='w-[38%]'>{task.createdAt}</p>
                                    </p>
                                </Link>

                            </div>
                        })
                    )}
                    {(!isLoading && allTask.length > 0 &&
                        <div className='my-8  flex flex-col justify-center items-center gap-2'>
                            <h3 className='text-blue-700'>page</h3>
                            <div className='flex gap-3 text-black'>
                                <button className={`${count === 1 ? 'hidden' : 'show'}`} onClick={() => { getAllTask(count - 1); setCount(count - 1) }}>&#8592;</button>
                                <button value={1} onClick={() => { getAllTask(1); setCount(1) }} className={`${count === 1 ? 'active' : ''}`}>1</button>
                                <button value={2} className={`${count === 2 ? 'active' : ''}`} onClick={() => { getAllTask(2); setCount(2) }}>2</button>
                                <button value={3} className={`${count === 3 ? 'active' : ''}`} onClick={() => { getAllTask(3); setCount(3) }}>3</button>

                                <button className={`${count === 3 ? 'hidden' : 'show'}`} onClick={() => { getAllTask(count + 1); setCount(count + 1) }}>&#8594;</button>

                            </div>
                        </div>
                    )}

                </div>

                <div className='h-full w-full absolute opacity-0 bg-black top-0 left-0 flex justify-center items-center invisible' ref={inputRef} onClick={closeForm}>
                    <form onSubmit={handleSubmit(onSubmit)} className='text-black w-[60%] flex flex-col gap-3 bg-slate-600 p-4 rounded-md shadow-lg' onClick={(e) => notCloseForm(e)}>
                        <h1 className='text-white font-bold text-4xl text-center'>Enter New Task</h1>
                        <label htmlFor="title" className='text-white'>Enter title:</label>
                        <input type="text" className='rounded-md px-1 text-black' id='title' {...register('title', { required: true })} placeholder='Enter name of task ' />
                        {errors.title && <span className='text-red-500'>This field is required</span>}
                        <label htmlFor="description" className='text-white'>Enter Description:</label>
                        <textarea className='rounded-md px-1 text-black' type="textArea" {...register('description')} placeholder='Enter description' />
                        <button type='submit' className='w-max text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2' >Submit</button>
                    </form>
                    <button className='bg-white text-black text-[2rem] rounded-full h-12 w-12 absolute top-4 right-4 ' onClick={closeForm}>&times;</button>
                </div>
            </section>
            {(!isLoading && allTask.length === 0 && <section className=" absolute top-36 left-8  z-100 " >
                <div className="text-4xl text-black text-center">
                    No such Task with name <span className="text-red-600 underline">{queries}</span>
                </div>
            </section>)}
        </>
    )
}

export default Alltask
