import BlogSchema from '../../../database/BlogSchema';
import connectDB from '../../../database/ConnectDB';
import { NextResponse } from 'next/server';

export async function GET(request, { params}) {
    await connectDB()
    
    try {
        const { id } = params;
        const blog = await BlogSchema.findById(id);
        
        if (!blog) {
            return NextResponse.json({ success: false, message: 'Blog not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: blog });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
    }
}
