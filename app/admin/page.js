"use client"

import { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests

export default function Admin() {
    const [bookData, setBookData] = useState({
        bookName: '',
        description: '',
        author: '',
        price: '',
        image: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookData({ ...bookData, [name]: value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/add', bookData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('Book data submitted successfully');
            setBookData({
                bookName: '',
                description: '',
                author: '',
                price: '',
                image: ''
            });
        } catch (error) {
            console.error('Error submitting book data:', error);
        }
    };

    return (
        <div>       
            <main>
                <h2>Add New Book</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="bookName">Book Name</label>
                        <input type="text" id="bookName" name="bookName" value={bookData.bookName} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="description">Description</label>
                        <textarea id="description" name="description" value={bookData.description} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="author">Author</label>
                        <input type="text" id="author" name="author" value={bookData.author} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="price">Price</label>
                        <input type="number" id="price" name="price" value={bookData.price} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="image">Book Image (URL)</label>
                        <input type="text" id="image" name="image" value={bookData.image} onChange={handleChange} />
                    </div>
                    <button type="submit">Add Book</button>
                </form>
            </main>
            <footer>
                <p>© 2024 Book Admin Dashboard. All rights reserved.</p>
            </footer>
            
        </div>
    );
}
