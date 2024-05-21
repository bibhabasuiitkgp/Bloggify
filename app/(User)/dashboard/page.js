"use client"

import "./styles.css"
import { useRouter } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';
import Book from '../../../Components/Card_container';
import { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
export default function Home() {
    const [books, setBooks] = useState([]);
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('/api/get');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setBooks(data.books);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);
    return (
        <div>
            <header>
                <h1>BookWagon</h1>
            </header>
            <nav>
                <UserButton />
                <a href="#">Profile</a>
            </nav>
            <div className="container">
                <h2 className="container-heading">Books</h2>
                <div className="course-list">
                    {books.map((card, index) => (
                        console.log(card),
                        <Book
                            key={index}
                            img="https://5.imimg.com/data5/HX/TD/MY-14344381/nootan-physics-xii-book-500x500.png"
                            subject={card.book_name}
                            description={card.description}
                            price={card.price}
                            author={card.author}
                        />
                    ))}
                </div>
            </div>
            <footer style={{ marginTop: '50px' }}>
                <p>&copy; 2024 Your Programming Course Website. All rights reserved.</p>
            </footer>
        </div>
    );
}
