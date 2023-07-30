import React, { useEffect, useState, useContext } from 'react';
import NewChatter from './newchat/newChatter';
import EditChatter from './editchat/editChatter';
import DeleteChatter from './deletechat/deleteChatter';
import styles from './chatter.module.css';
import UserContext from './contexts/UserContext';

const Chatter = () => {

    const [chatters, setChatters] = useState([]);
    const [showNewChat, setShowNewChat] = useState(false);
    const [editChatter, setEditChatter] = useState(null);
    const [deleteChatter, setDeleteChatter] = useState(null);
    const ctx = useContext(UserContext);

    useEffect(() => {
        const fetchChatter = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/contents/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                const data = await response.json();

                if (response.ok) {
                    const d = new Date();
                    console.log('Data fetched successfully at ' + d);
                    setChatters(data.content);
                } else {
                    throw new Error(data.message || 'Failed to fetch data');
                }
            } catch (err) {
                console.log(err.message);
            }
        }

        // Call the fetch function immediately
        fetchChatter();

        // Call it again every 60 seconds
        const intervalId = setInterval(fetchChatter, 60000);

        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);  // Empty dependency array so the effect only runs on mount and unmount

    const handleNewChatter = (newChatter) => {
        const newChatters = [...chatters, newChatter];
        setChatters(newChatters);
        setShowNewChat(false);
    };

    //Edit Chatter
    const handleEditChatter = (chatter) => {
        setEditChatter(chatter);
    };

    //Update Chatter
    const handleUpdateChatter = (updatedChatter) => {
        const updatedChatters = chatters.map((chatter) =>
            chatter.id === updatedChatter.id ? updatedChatter : chatter
        );
        setChatters(updatedChatters);
        setEditChatter(null);
    };

    //Delete Chatter
    const handleDeleteChatter = (chatterId) => {
        const updatedChatters = chatters.filter((chatter) => chatter.id !== chatterId);
        setChatters(updatedChatters);
        setDeleteChatter(null);
    };

    return (
        <div className={styles["main-container"]}>
            <h1>Chatter</h1>
            <button className={styles.button} onClick={() => setShowNewChat(true)}>New Chatter</button>

            {/* Handle New */}
            {showNewChat && (
                <NewChatter onNewChatter={handleNewChatter} onCancel={() => setShowNewChat(false)} />
            )}

            {/* Mapping fetched data.content from chatter */}
            {chatters.map((chatter) => (
                <div key={chatter._id} className={styles["post-container"]}>
                    <div>
                        <p className={styles["post-content"]}>{chatter.userinput}</p>
                        <p className={styles["post-content"]}>By: {chatter.userId.username}</p>
                    </div>
                    {/* Check if the post username is same as the current logged in user */}
                    {console.log(ctx.username())}
                    <div className={styles["button-container"]}>
                        {chatter.userId.username === ctx.username() && (
                            <>
                                <button className={styles.button} onClick={() => handleEditChatter(chatter)}>Edit</button>
                                <button className={styles.button} onClick={() => setDeleteChatter(chatter)}>Delete</button>
                            </>
                        )}
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