// pages/api/get.js

import connectDB from '../../database/ConnectDB';
import Books from '../../database/BooksSchema';
import { NextResponse } from 'next/server';

connectDB();

export async function GET(){
    try {
        const books= await Books.find();

        return NextResponse.json({ books });
    } catch (error) {
        console.error('Error fetching data:', error);
        return NextResponse.json({ message: 'Internal Server Error' });
    }
}
