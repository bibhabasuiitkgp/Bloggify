import connectDB from '../../../database/ConnectDB';
import Blogs from '../../../database/BlogSchema';
import { NextResponse } from 'next/server';

// Connect to MongoDB
connectDB();

export async function DELETE(request, { params }) {
    try {
        const { id } = params; // Get the blog ID from the request parameters

        // Find the blog by ID and delete it
        const deletedBlog = await Blogs.findByIdAndDelete(id);

        // If the blog is not found
        if (!deletedBlog) {
            return NextResponse.json({ success: false, message: 'Blog not found' }, { status: 404 });
        }

        // Return success response
        return NextResponse.json({ success: true, message: 'Blog deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
    }
}
