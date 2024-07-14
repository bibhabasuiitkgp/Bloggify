"use client";

import './styles.css';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Home = ({ params }) => {
    const router = useRouter();
    const id = params.id;
    
    const [editorData, setEditorData] = useState('');
    const [formData, setFormData] = useState({
        category: '',
        title: '',
        heading: '',
        image: ''
    });

    useEffect(() => {
        if (id) {
            fetch(`/api/getone/${id}`)
                .then(response => response.json())
                .then(data => {
                    const blog = data.data;
                    setFormData({
                        category: blog.category,
                        title: blog.title,
                        heading: blog.heading,
                        image: blog.image
                    });
                    setEditorData(blog.content);
                })
                .catch(error => console.error('Error fetching blog:', error));
        }
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleEditorChange = (e) => {
        const data = e.target.value;
        setEditorData(data);
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const data = { ...formData, content: editorData };

        try {
            const response = await fetch(id ? `/api/update/${id}` : '/api/add', {
                method: id ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            if (result.success) {
                alert(`Blog ${id ? 'updated' : 'added'} successfully!`);
                // Reset form if needed
            } else {
                alert(`Error ${id ? 'updating' : 'adding'} blog`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Server error');
        }
    };

    const handleClick = () => {
        router.push(`/detail/${id}`);
    };

    return (
        <div className="container">
            <h1>{id ? 'Update' : 'Create'} a Blog Post</h1>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <input type="text" id="category" name="category" value={formData.category} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="heading">Heading</label>
                    <input type="text" id="heading" name="heading" value={formData.heading} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="content">Content</label>
                    <textarea id="content" name="content" value={editorData} onChange={handleEditorChange} rows={10} required />
                </div>
                <div className="form-group">
                    <label htmlFor="image">Image URL</label>
                    <input type="text" id="image" name="image" value={formData.image} onChange={handleChange} required />
                </div>
                <button type="submit" onClick={handleClick}>Submit</button>
            </form>
        </div>
    );
}

export default Home;
