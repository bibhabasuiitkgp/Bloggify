// (user)/create/page.js
"use client";

import './styles.css';
import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter();
    const [editorData, setEditorData] = useState('');
    const [formData, setFormData] = useState({
        category: '',
        title: '',
        heading: '',
        image: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleClick = () => {
        router.push(`/home`);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { ...formData, content: editorData };

        try {
            const response = await fetch('/api/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            if (result.success) {
                alert('Blog added successfully!');
                // Reset form if needed
            } else {
                alert('Error adding blog');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Server error');
        }
    };

    return (
        <div className="container">
            <h1>Create a Blog Post</h1>
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
                    <div>
                        <CKEditor
                            id="content"
                            name="content"
                            editor={ClassicEditor}
                            data={editorData}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setEditorData(data);
                            }}
                        />
                    </div>
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
