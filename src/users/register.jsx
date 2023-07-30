import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const NewUser = () => {

    const handleNewUser = async (e) => {
        e.preventDefault();
        if (username.length < 3) {
            alert('Username must be at least 3 characters');
            return;
        }
        if (password.length < 6) {
            alert('Password must be at least 6 characters');
            return;
        }


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
            <h1 className='mt-2'>New User</h1>
            <Form className='m-5' onSubmit={handleNewUser}>
                <Form.Group controlId="formName">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" value={username} onChange={handleNameChange} />
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
                </Form.Group>

                <Button className='mt-3' variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};
export default NewUser;
