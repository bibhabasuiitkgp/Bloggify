// pages/api/books/[id].js
import connectDB from '../../../database/ConnectDB';
import Books from '../../../database/BooksSchema';
import { NextResponse } from 'next/server';

// Connect to MongoDB
connectDB();

export async function PUT(request, { params }) {
    try {
        const { id } = params; // Get the book ID from the request parameters
        const body = await request.json(); // Parse the JSON body
        const { book_name, description, author, price, image } = body;

        // Validate the input
        if (!book_name || !description || !author || !price || !image) {
            return NextResponse.json({ success: false, message: 'All fields are required' }, { status: 400 });
        }

        // Find the book by ID and update it
        const updatedBook = await Books.findByIdAndUpdate(
            id,
            { book_name, description, author, price, image },
            { new: true, runValidators: true }
        );

        // If the book is not found
        if (!updatedBook) {
            return NextResponse.json({ success: false, message: 'Book not found' }, { status: 404 });
        }

        // Return the updated book
        return NextResponse.json({ success: true, data: updatedBook }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
    }
}

export async function GET(request, { params }) {
    try {
        const { id } = params;
        const book = await Books.findById(id);

        if (!book) {
            return NextResponse.json({ success: false, message: 'Book not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: book });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
    }
}
