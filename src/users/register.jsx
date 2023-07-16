import React from 'react';
import { useState } from 'react';

const NewUser = () => {

    const handleNewUser = async (e) => {
        e.preventDefault();
        console.log('username: ' + username);
        console.log('password: ' + password);
        try {
            const response = await fetch('http://localhost:4000/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('User created successfully');
                return data.token;
            } else {
                throw new Error(data.message || 'Error creating user');
            }
        } catch (err) {
            console.log(err.message);
        }
    }


    const [username, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };


    return (
        <div>
            <h1>New User</h1>
            <form onSubmit={handleNewUser}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" value={username} onChange={handleNameChange} />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" value={password} onChange={handlePasswordChange} />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default NewUser;
