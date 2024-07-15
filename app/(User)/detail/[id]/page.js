"use client";

import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import './styles.css';
const BlogDetail = ({ params }) => {
    const id = params.id;
    const router = useRouter();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        if (id) {
            fetch(`/api/getone/${id}`)
                .then(response => response.json())
                .then(data => setBlog(data.data))
                .catch(error => console.error('Error fetching blog:', error));
        }
    }, [id]);

    if (!blog) {
        return <div>Loading...</div>;
    }
    const handleUpdate = () => {
        router.push(`/update/${id}`);
    };
    const handleDelete = async () => {
        if (confirm('Are you sure you want to delete this blog post?')) {
            try {
                const response = await fetch(`/api/delete/${id}`, {
                    method: 'DELETE',
                });
                const result = await response.json();
                if (result.success) {
                    alert('Blog deleted successfully!');
                    router.push('/home');
                } else {
                    alert('Error deleting blog');
                }
            } catch (error) {
                console.error('Error deleting blog:', error);
                alert('Server error');
            }
        }
    };
    return (
        <>
            <Head>
                <title>{blog.title}</title>
                <link
                    href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&family=Prata&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <article className="article">
                <div className="article__body">
                    <section className="header">
                        <span className="header__cat">{blog.category}</span>
                        <h1 className="header__title">{blog.title}</h1>
                        <p className="header__summary">{blog.summary}</p>
                    </section>
                    <section className="text-block rich-text">
                        <h1 className='heading'>{blog.heading}</h1>
                        <div className='content' dangerouslySetInnerHTML={{ __html: blog.content }} />
                    </section>
                    <div className="button-container">
                        <button className="btn-5" onClick={handleUpdate}>Update</button>
                        <button className="btn-5" onClick={handleDelete}>Delete</button>
                    </div>
                </div>
                <div className="article__image">
                    <div className="article__image-wrapper">
                        <img src={blog.image} alt={blog.title} />
                    </div>
                </div>
            </article>
        </>
    );
};

export default BlogDetail;
