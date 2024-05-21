// pages/api/books/[id].js
import connectDB from '../../../database/ConnectDB';
import Books from '../../../database/BooksSchema';
import { NextResponse } from 'next/server';

// Connect to MongoDB
connectDB();

export async function DELETE(request, { params }) {
    try {
        const { id } = params;

        // Find the book by ID and delete it
        const deletedBook = await Books.findByIdAndDelete(id);

        // If the book is not found
        if (!deletedBook) {
            return NextResponse.json({ success: false, message: 'Book not found' }, { status: 404 });
        }

        // Return success response
        return NextResponse.json({ success: true, message: 'Book deleted successfully',data:deletedBook }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
    }
}
