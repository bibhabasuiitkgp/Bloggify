"use client"

import "./styles.css"
import { UserButton } from '@clerk/nextjs'; 
import Book from '../../../Components/Card_container';      
import { useState, useEffect } from 'react';
export default function Home() {
    const [books, setBooks] = useState([]);
    useEffect(() => {
        async function fetchData() {  // Define a function to fetch data from the API
            try {
                const response = await fetch('/api/get');           // Fetch data from the API
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setBooks(data.books);       // Set the fetched data as the state variable
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();        // Call the fetchData function
    }, []);
    return (
        <div>
            <header>
                <h1>BookWagon</h1>
            </header>
            <nav>
                <UserButton />
                <a href="">Profile</a>
            </nav>
            <div className="container">
                <h2 className="container-heading">Books</h2>
                <div className="course-list">
                    {books.map((card, index) => (       // Loop through the books data and pass it as props to the Book component
                        console.log(card),
                        <Book                        // Pass the card data as props to the Book component
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
                <p>&copy; 2024 BookWagon. All rights reserved.</p>
            </footer>
        </div>
    );
}
