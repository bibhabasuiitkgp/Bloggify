"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {UserButton} from '@clerk/nextjs';
import './styles.css';

const Page = () => {
    const [articles, setArticles] = useState([]);
    const router = useRouter();

    async function fetchData() {
        try {
            const response = await fetch('/api/get');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setArticles(data.blogs);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        fetchData();

        const articles = document.querySelectorAll(".article");

        articles.forEach(i => {
            i.addEventListener("mousemove", e => {
                let mouseX = e.offsetX;
                let mouseY = e.offsetY;
                i.querySelector(".overlay")
                    .style.setProperty(
                        "background-image",
                        `radial-gradient(circle at ${(mouseX * 100 / -i.offsetWidth + 100)}% ${(mouseY * 100 / -i.offsetHeight + 100)}%, rgba(0,0,0,0.2) 25%, rgba(0,0,0,0.33) 50%)`
                    );
                i.style.setProperty("transform", `rotateY(${((mouseX * 100 / i.offsetWidth - 50) / 100) * 2}deg) rotateX(${((mouseY * 100 / i.offsetHeight - 50) / 100) * 2}deg)`);
            }, false);

            i.addEventListener("mouseleave", () => {
                i.style.setProperty("transform", `rotateX(0deg) rotateY(0deg)`);
                i.querySelector(".overlay").style.setProperty(
                    "background-image",
                    `radial-gradient(circle at 50% 50%, rgba(0,0,0,0.2) 20%, rgba(0,0,0,0.3) 50%)`
                );
            });
        });
    }, []);

    const handleArticleClick = (id) => {
        router.push(`/detail/${id}`);
    };
    const handleClick = (id) => {
        router.push(`/create`);
    };

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <div className="navbar-logo">
                        <UserButton />
                    </div>
                    <div className="bloggify">
                        <h1><span className="span">Blog</span>gify</h1>
                    </div>
                    <div className="navbar-button">
                        <button className="btn-5" onClick={handleClick}>Write a blog</button>
                    </div>
                </div>
            </nav>
            <div className="wrap">
                {articles.map((article, index) => (
                    <div
                        className="article"
                        key={index}
                        style={{ backgroundImage: `url(${article.image})` }}
                        onClick={() => handleArticleClick(article._id)}
                    >
                        <div className="overlay"></div>
                        <div className="wrap-cat">
                            <span className="cat" data-hover={article.category}>{article.category}</span>
                        </div>
                        <h1>
                            <span>{article.title}</span>
                        </h1>
                        <button className="btn-5">Read More</button>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Page;
