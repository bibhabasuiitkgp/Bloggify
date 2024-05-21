// pages/admin/update-book/[id].js
"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const UpdateBook = () => {
    const router = useRouter();
    const { id } = router.query;

    const [book, setBook] = useState({
        book_name: '',
        description: '',
        author: '',
        price: '',
        image: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        // Fetch book details to pre-fill the form if id is available
        if (id) {
            const fetchBookDetails = async () => {
                try {
                    const response = await fetch(`/api/books/${id}`);
                    const data = await response.json();
                    if (data.success) {
                        setBook(data.data);
                    } else {
                        setError('Failed to load book details');
                    }
                } catch (error) {
                    setError('Failed to load book details');
                }
            };
            fetchBookDetails();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook({ ...book, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await fetch(`/api/books/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(book),
            });

            const data = await response.json();

            if (data.success) {
                setSuccess('Book updated successfully');
            } else {
                setError(data.message || 'Failed to update book');
            }
        } catch (error) {
            setError('Server Error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Update Book</h1>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="book_name">Book Name:</label>
                    <input
                        type="text"
                        id="book_name"
                        name="book_name"
                        value={book.book_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={book.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="author">Author:</label>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        value={book.author}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="price">Price:</label>
                    <input
                        type="text"
                        id="price"
                        name="price"
                        value={book.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="image">Image URL:</label>
                    <input
                        type="text"
                        id="image"
                        name="image"
                        value={book.image}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" disabled={!id}>Update Book</button>
            </form>
        </div>
    );
};

export default UpdateBook;
