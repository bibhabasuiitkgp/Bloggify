import connectDB from '../../../database/ConnectDB';
import Blogs from '../../../database/BlogSchema';
import { NextResponse } from 'next/server';
import axios from "axios";

// Connect to MongoDB
connectDB();

export async function PUT(request, { params }) {
    try {
        const { id } = params; // Get the blog ID from the request parameters
        const body = await request.json(); // Parse the JSON body
        const { category, title, heading, content, image } = body;

        // Validate the input
        if (!category || !title || !heading || !content || !image) {
            return NextResponse.json({ success: false, message: 'All fields are required' }, { status: 400 });
        }
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
        const updatedBlog = await Blogs.findByIdAndUpdate(
            id,
            { category, title, heading, content, summary, image },
            { new: true, runValidators: true }
        );

        // If the blog is not found
        if (!updatedBlog) {
            return NextResponse.json({ success: false, message: 'Blog not found' }, { status: 404 });
        }

        // Return the updated blog
        return NextResponse.json({ success: true, data: updatedBlog }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
    }
}
