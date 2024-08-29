"use client"
import TaskDetails from '@/components/TaskDetails';
import React, { useEffect, useState } from 'react';

function Page({ params }) {
    const id = params.id;
    const [task, setTask] = useState({});

    const getTask = async () => {
        try {
            const response = await fetch(`/api/mobileTask/${id}`);
            const res = await response.json();
            if (res.success) {
                setTask(res.result);
            } else {
                console.error('Failed to fetch task');
            }
        } catch (error) {
            console.error('Error fetching task:', error);
        }
    };

    useEffect(() => {
        getTask();
    }, [id]);

    return (
        <div>
            <TaskDetails desc={task?.description} title={task?.title} id={id} />
        </div>
    );
}

export default Page;
