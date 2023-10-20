import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../contexts/UserContext';

const NewChatter = ({ onNewChatter, onCancel }) => {
    const [newContent, setNewContent] = useState('');
    const [categories, setCategories] = useState([]);  // Array of category objects [{_id: '', name: ''}
    const [seletectedCategory, setSelectedCategory] = useState('');  // Category id
    const ctx = useContext(UserContext);  // Get the user context

    useEffect(() => {
        fetchCategories();
    }, []); // Run only once when the component is mounted

    const fetchCategories = async () => {
        try {
            // Send a GET request to fetch categories
            const response = await fetch('http://localhost:4000/api/categories', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();
            if (response.ok) {
                setCategories(data.categories);
            }
            else {
                throw new Error(data.message || 'Failed to fetch categories');
            }
        }
        catch (err) {
            console.log(err.message);
        }
    };
    const handleNewChatter = async () => {
        let newChatter = {};

        if (newContent.trim() !== '') {
            newChatter = {
                userinput: newContent,
                categoryId: seletectedCategory,
                userId: ctx.userId,
                username: ctx.username
            };
        }
        try {
            console.log(JSON.stringify(newChatter));
            // Send a POST request to create a new chatter/post
            const response = await fetch('http://localhost:4000/api/contents/createcontent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newChatter)  // Pass the new chatter data
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to create chatter');
            }


            // Add the id to the new chatter object
            newChatter._id = data._id;

            // Pass the new chatter data to the parent component
            onNewChatter(newChatter);

            // Clear the input
            setNewContent('');

        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <div>
            <h2>New Chatter</h2>
            <div className='col-6'>
                <input
                    type="text"
                    className='form-control my-3'
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    placeholder="Enter content"
                />
                {categories.length > 0 && (
                    <select className='form-control my-3' onChange={(e) => setSelectedCategory(e.target.value)}>
                        {categories.map((category) => (
                            <option key={category._id} value={category._id}>
                                {category.categoryname}
                            </option>
                        ))}
                    </select>
                )}
            </div>
            <div className='my-3'>
                <button className ='btn btn-success' onClick={handleNewChatter}>Create Chatter</button>
                <button className = 'btn btn-danger mx-2' onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
};

export default NewChatter;
