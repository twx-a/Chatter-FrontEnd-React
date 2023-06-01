import React, { useState } from 'react';

const NewChat = ({ onNewChat }) => {
    const [newChat, setNewChat] = useState('');

    const handleNewTweet = () => {
        if (newChat.trim() !== '') {
            onNewChat(newChat);
            setNewChat('');
        }
    };

    return (
        <div>
            <input
                type="text"
                value={newChat}
                onChange={(e) => setNewChat(e.target.value)}
                placeholder="What's happening?"
            />
            <button onClick={handleNewTweet}>Tweet</button>
        </div>
    );
};

export default NewChat;