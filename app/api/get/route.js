// pages/api/get.js

import connectDB from '../../database/ConnectDB';
import Blog from '../../database/BlogSchema';
import { NextResponse } from 'next/server';

connectDB();

export async function GET() {
    try {
        const blogs = await Blog.find();    // Find all the books in the database

        return NextResponse.json({ blogs });  // Return the books as a JSON response
    } catch (error) {
        console.error('Error fetching data:', error);
        return NextResponse.json({ message: 'Internal Server Error' });
    }
}
