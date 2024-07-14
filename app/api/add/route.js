import connectDB from '../../database/ConnectDB';
import Blog from '../../database/BlogSchema';
import { NextResponse } from 'next/server';
import axios from "axios"; // Import Axios directly

// Connect to MongoDB
connectDB();

export async function POST(request) {
    try {
        const body = await request.json();
        const { category, title, heading, content, image } = body;

        // Summarization request configuration
        const options = {
            method: "POST",
            url: "https://api.edenai.run/v2/text/summarize",
            headers: {
                authorization: `Bearer ${process.env.openAI}`, // Replace with your actual authorization token
            },
            data: {
                output_sentences: 3,
                providers: "openai",
                text: content,
                language: "en",
            },
        };

        // Make summarization request using Axios
        const response = await axios.request(options);
        const summary = response.data.openai.result; // Assuming response.data directly contains the summary

        // Create a new blog document
        const newBlog = new Blog({
            category,
            title,
            heading,
            content,
            summary,
            image,
        });

        // Save blog to the database
        await newBlog.save();

        return NextResponse.json({ success: true, message: 'Blog added successfully', data: newBlog }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: 'Server Error' });
    }
}
