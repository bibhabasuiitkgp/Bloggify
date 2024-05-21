"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

// Admin component for managing book data
export default function Admin() {
    // State to manage authentication status and book data
    const [authenticated, setAuthenticated] = useState(false);
    const router = useRouter();
    const [bookData, setBookData] = useState({
        bookName: '',
        description: '',
        author: '',
        price: '',
        image: ''
    });

    // useEffect to check authentication status on component mount
    useEffect(() => {
        const auth = Cookies.get('auth');
        if (auth === 'true') {
            setAuthenticated(true);
        } else {
            router.push('/admin-login');
        }
    }, [router]);

    // Return null if not authenticated to prevent component rendering
    if (!authenticated) {
        return null;
    }

    // handleChange to update book data state on input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookData((prevData) => ({ ...prevData, [name]: value }));
    };

    // handleSubmit to send book data to the server
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validate that all fields are filled
        if (!bookData.bookName || !bookData.description || !bookData.author || !bookData.price || !bookData.image) {
            alert('All fields are required.');
            return;
        }

        try {
            // Send a POST request to the server with the book data
            await axios.post('/api/add', bookData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Book data submitted successfully');
            // Reset book data state after successful submission
            setBookData({
                bookName: '',
                description: '',
                author: '',
                price: '',
                image: ''
            });
        } catch (error) {
            console.error('Error submitting book data:', error);
            alert('Failed to submit book data. Please try again.');
        }
    };

    // handleLogout to remove authentication cookie and redirect to login page
    const handleLogout = () => {
        Cookies.remove('auth');
        router.push('/admin-login');
    };

    return (
        <div>
            <main>
                <h2>Add New Book</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="bookName">Book Name</label>
                        <input
                            type="text"
                            id="bookName"
                            name="bookName"
                            value={bookData.bookName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={bookData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="author">Author</label>
                        <input
                            type="text"
                            id="author"
                            name="author"
                            value={bookData.author}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="price">Price</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={bookData.price}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="image">Book Image (URL)</label>
                        <input
                            type="text"
                            id="image"
                            name="image"
                            value={bookData.image}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">Add Book</button>
                </form>
                <button onClick={handleLogout}>Logout</button>
            </main>
            <footer>
                <p>© 2024 Book Admin Dashboard. All rights reserved.</p>
            </footer>
        </div>
    );
}
