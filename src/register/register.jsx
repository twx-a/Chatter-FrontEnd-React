import React from 'react';
import { useState, useEffect } from 'react';

const NewUser = ({onNewUser}) => {

    useEffect(() => {
        const postData = async () => {
            const response = await fetch('http://localhost:3001/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    password: password,
                }),
            });
            const data = await response.json();
            console.log(data);
        }
    }, []);

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleNewUser = () => {
        if (name.trim() !== '' && password.trim() !== '') {
            const newUser = {
                id: Date.now(),
                name: name,
                password: password,
            };
            onNewUser(newUser);
            setName('');
            setPassword('');
        }
    };


    return (
    <div>
        <h1>New User</h1>
        <form>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={name} onChange={handleNameChange} />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={password} onChange={handlePasswordChange} />
            <button type="submit" onClick={handleNewUser}>Submit</button>
        </form>
    </div>
    )
}

export default NewUser;
