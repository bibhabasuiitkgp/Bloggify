import connectDB from '../../database/ConnectDB';
import Books from '../../database/BooksSchema';
import { NextResponse } from 'next/server';

// Connect to MongoDB
connectDB();

export async function POST(request) {
    try {

        console.log("Test");
        const body = await request.json();
        console.log(body);
        const { bookName, description, author, price, image } = body;


        const newBook = new Books({
            book_name: bookName,
            description,
            author,
            price,
            image
        });

        // Save book to the database
        await newBook.save();

        return NextResponse.json({ success: true, message: 'Book added successfully' ,data:newBook}, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: 'Server Error' });
    }
    // }
}

