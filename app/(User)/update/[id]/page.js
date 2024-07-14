"use client";

import './styles.css';
import React, { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useRouter } from 'next/navigation';

const Home = ({ params }) => {
    const router = useRouter();
    const id = params.id;
    console.log(id);
    console.log("123");
    const [editorData, setEditorData] = useState('');
    const [formData, setFormData] = useState({
        category: '',
        title: '',
        heading: '',
        image: ''
    });

    const handleClick = () => {
        router.push(`/detail/${id}`);
    };

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
                    console.log(blog);
                    setEditorData(blog.content);
                })
                .catch(error => console.error('Error fetching blog:', error));
        }
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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

export default Home;
