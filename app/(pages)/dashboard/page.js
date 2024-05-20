"use client"

import "./styles.css"
import { useRouter } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';
import Course from '../../../Components/Card_container';
// import { useRouter } from 'next/router';
export default function Home() {
    // const router = useRouter();
    const courses = [
        {
            img: 'https://5.imimg.com/data5/HX/TD/MY-14344381/nootan-physics-xii-book-500x500.png',
            subject: 'Physics',
            description: 'Learn the fundamentals of HTML including tags, attributes, and semantic markup.',
            price: 50,
            author: 'Asish Sir',
        },
        {
            img: 'https://shribalajibooks.com/wp-content/uploads/2022/12/Simplified-Physics-10-1.jpg',
            subject: 'Chemistry',
            description: 'Master CSS styling techniques such as selectors, box model, flexbox, and grid.',
            price: 50,
            author: 'Asish Sir',
        },
        {
            img: 'https://5.imimg.com/data5/HX/TD/MY-14344381/nootan-physics-xii-book-500x500.png',
            subject: 'Mathematics',
            description: 'Explore the core concepts of JavaScript including variables, functions, and loops.',
            price: 50,
            author: 'Asish Sir',
        },
    ];
    return (
        <div>
            <header>
                <h1>StudySphere</h1>
            </header>

            <nav>
                <UserButton />
                <a href="#">Profile</a>
            </nav>
            <div className="container">
                <h2 className="container-heading">Books</h2>
                <div className="course-list">
                    {courses.map((course, index) => (
                        <Course
                            key={index}
                            img={course.img}
                            subject={course.subject}
                            description={course.description}
                            price={course.price}
                            author={course.author}
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
