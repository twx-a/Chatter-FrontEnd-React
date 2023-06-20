import React, { useState } from 'react';
import NewChatter from './newchat/newChatter';
import EditChatter from './editchat/editChatter';
import DeleteChatter from './deletechat/deleteChatter';
import chatsData from './data/chatterData';
import styles from './chatter.module.css';

const Chatter = () => {
    const [chatters, setChatters] = useState(chatsData);
    const [showNewChat, setShowNewChat] = useState(false);
    const [editChatter, setEditChatter] = useState(null);
    const [deleteChatter, setDeleteChatter] = useState(null);

    const handleNewChatter = (newChatter) => {
        const newChatters = [...chatters, newChatter];
        setChatters(newChatters);
        setShowNewChat(false);
    };

    const handleEditChatter = (chatter) => {
        setEditChatter(chatter);
    };

    const handleUpdateChatter = (updatedChatter) => {
        const updatedChatters = chatters.map((chatter) =>
            chatter.id === updatedChatter.id ? updatedChatter : chatter
        );
        setChatters(updatedChatters);
        setEditChatter(null);
    };

    const handleDeleteChatter = (chatterId) => {
        const updatedChatters = chatters.filter((chatter) => chatter.id !== chatterId);
        setChatters(updatedChatters);
        setDeleteChatter(null);
    };

    return (
        <div className={styles["main-container"]}>
            <h1>Chatter</h1>
            <button className={styles.button} onClick={() => setShowNewChat(true)}>New Chatter</button>

            {showNewChat && (
                <NewChatter onNewChatter={handleNewChatter} onCancel={() => setShowNewChat(false)} />
            )}

            {chatters.map((chatter) => (
                <div className={styles["post-container"]}>
                    <div key={chatter.id}>
                        <p className={styles["post-content"]}>{chatter.content}</p>
                        <p className={styles["post-content"]}>By: {chatter.name}</p>
                    </div>
                    <div className={styles["button-container"]}>
                        <button className={styles.button} onClick={() => handleEditChatter(chatter)}>Edit</button>
                        <button className={styles.button} onClick={() => setDeleteChatter(chatter)}>Delete</button>
                    </div>
                </div>
            ))}

            {editChatter && (
                <EditChatter
                    chatter={editChatter}
                    onEditChatter={handleUpdateChatter}
                    onCancel={() => setEditChatter(null)}
                />
            )}

            {deleteChatter && (
                <DeleteChatter
                    chatter={deleteChatter}
                    onDeleteChatter={handleDeleteChatter}
                    onCancel={() => setDeleteChatter(null)}
                />
            )}
        </div>
    );
};

export default Chatter;
