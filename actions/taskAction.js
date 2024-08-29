"use server"

import { connectDB } from "@/db/connectDB";
import Task from "@/model/Task";


export const fetchAllTask = async (page) => {
    page = page * 1 || 1;
    const limitBy = 4;
    const skip = (page - 1) * limitBy;
    
    await connectDB();
    const allTask = await Task.find().skip(skip).limit(limitBy).sort({ postedAt: -1 });
    const length = (await Task.find()).length;
    return JSON.parse(JSON.stringify({ allTask, length }));
};


export const searchAllTask = async (query) => {
    console.log('fetching...course');
    await connectDB();
    const words = query.split(' ').filter(Boolean);
    const regexPattern = words.map(word => `(?=.*${word})`).join('');
    const regex = new RegExp(regexPattern, 'i');
    const allCourses = await Task.find({ title: { $regex: regex } }).lean();
    const data = JSON.parse(JSON.stringify(allCourses))
    return data;
}