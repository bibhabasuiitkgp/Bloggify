"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function Admin() {
    const [authenticated, setAuthenticated] = useState(false);
    const router = useRouter();
    const [bookData, setBookData] = useState({
        bookName: '',
        description: '',
        author: '',
        price: '',
        image: ''
    });

    useEffect(() => {
        const auth = Cookies.get('auth');
        if (auth === 'true') {
            setAuthenticated(true);
        } else {
            router.push('/admin-login');
        }
    }, [router]);

    if (!authenticated) {
        return null;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!bookData.bookName || !bookData.description || !bookData.author || !bookData.price || !bookData.image) {
            alert('All fields are required.');
            return;
        }

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
            alert('Failed to submit book data. Please try again.');
        }
    };

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
