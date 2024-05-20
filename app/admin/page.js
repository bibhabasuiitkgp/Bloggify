// pages/admin.js
"use client";
import { useState } from 'react';

export default function Admin() {
    const [bookData, setBookData] = useState({
        bookName: '',
        description: '',
        author: '',
        price: '',
        image: null
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setBookData({ ...bookData, [name]: files[0] });
        } else {
            setBookData({ ...bookData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Implement the logic to submit the form data to the server
        console.log(bookData);
    };

    return (
        <div>
            <header>
                <h1>Admin Dashboard</h1>
                <nav>
                    <a href="/">Home</a>
                </nav>
            </header>
            <div className="sidebar">
                <nav>
                    <ul>
                        <li><a href="/admin">Dashboard</a></li>
                        <li><a href="/admin/books">Books</a></li>
                        <li><a href="/admin/add">Add New Book</a></li>
                        <li><a href="/admin/categories">Categories</a></li>
                        <li><a href="/admin/settings">Settings</a></li>
                        <li><a href="/admin/help">Help</a></li>
                    </ul>
                </nav>
            </div>
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
                        <label htmlFor="image">Book Image</label>
                        <input type="file" id="image" name="image" onChange={handleChange} />
                    </div>
                    <button type="submit">Add Book</button>
                </form>
            </main>
            <footer>
                <p>© 2024 Book Admin Dashboard. All rights reserved.</p>
            </footer>
            <style jsx>{`
        .sidebar {
          width: 200px;
          float: left;
        }
        main {
          margin-left: 220px;
        }
        form div {
          margin-bottom: 10px;
        }
        label {
          display: block;
          margin-bottom: 5px;
        }
        input, textarea {
          width: 100%;
        }
        button {
          display: block;
          margin-top: 10px;
        }
      `}</style>
        </div>
    );
}
