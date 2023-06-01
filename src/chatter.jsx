import React, { useState, useEffect } from 'react';
import NewChat from './newchat/newChatter.jsx';


const Chatter = () => {
    const [chats, setChats] = useState([]);
    console.log(chats);

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const response = await fetch("./data/chats.js");
                const data = await response.json();
                console.log(data);
                // setTweets(data);
            } catch (error) {
                console.error('Error fetching tweets:', error);
            }
        };
        fetchChats();
    }, []);

    const handleNewChat = (newChat) => {
        setChats([...chats, newChat]);
    };

    return (
        <div>
            <NewChat onNewChat={handleNewChat} />
            <div>
                {chats.map((index, chat) => (
                    <div key={index}>{chat}</div>
                ))}
            </div>
        </div>
    );
};

export default Chatter;