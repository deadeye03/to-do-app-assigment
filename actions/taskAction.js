"use server"

import { connectDB } from "@/db/connectDB";
import Task from "@/model/Task";

/**
 * Fetches all tasks from the database with pagination.
 *
 * @param {number} page - The page number to fetch. Defaults to 1 if not provided or invalid.
 * @returns {Promise<Object>} An object containing the tasks and the total length of tasks.
 */
export const fetchAllTask = async (page) => {
    page = page * 1 || 1;
    const limitBy = 4;
    const skip = (page - 1) * limitBy;
    
    await connectDB();
    const allTask = await Task.find().skip(skip).limit(limitBy).sort({ createdAt: -1 });
    const length = (await Task.find()).length;
    return JSON.parse(JSON.stringify({ allTask, length }));
};

/**
 * Searches for all tasks that match the given query.
 *
 * This function connects to the database, splits the query into individual words,
 * constructs a regular expression to match tasks containing all the words, and
 * retrieves the matching tasks from the database.
 *
 * @param {string} query - The search query containing words to match against task titles.
 * @returns {Promise<Array>} - A promise that resolves to an array of matching tasks.
 */
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