import React, { useState } from 'react';

const NewChatter = ({ onNewChatter, onCancel }) => {
    const [newContent, setNewContent] = useState('');
    const [newName, setNewName] = useState('');

    const handleNewChatter = () => {
        if (newContent.trim() !== '' && newName.trim() !== '') {
            const newChatter = {
                id: Date.now(),
                content: newContent,
                name: newName,
            };
            onNewChatter(newChatter);
            setNewContent('');
            setNewName('');
        }
    };

    return (
        <div>
            <h2>New Chatter</h2>
            <div>
                <input
                    type="text"
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    placeholder="Enter content"
                />
            </div>
            <div>
                <button onClick={handleNewChatter}>Create Chatter</button>
                <button onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
};

export default NewChatter;
