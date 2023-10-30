import React, { useEffect, useState, useContext, Fragment } from 'react';
import NewChatter from './newchat/newChatter';
import EditChatter from './editchat/editChatter';
import DeleteChatter from './deletechat/deleteChatter';
import NewComment from './newcomment/newComment';
import styles from './chatter.module.css';
import UserContext from './contexts/UserContext';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'



const Chatter = () => {

    const [chatters, setChatters] = useState([]);
    const [showNewChat, setShowNewChat] = useState(false);
    const [editChatter, setEditChatter] = useState(null);
    const [deleteChatter, setDeleteChatter] = useState(null);
    const [showComment, setShowComment] = useState(false);
    const handleCloseComment = () => setShowComment(false);
    const handleShowComment = () => setShowComment(true);
    const ctx = useContext(UserContext);

    useEffect(() => {
        const fetchChatter = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/contents/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
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
            chatter._id === updatedChatter._id ? updatedChatter : chatter
        );
        setChatters(updatedChatters);
        setEditChatter(null);
    };

    //Delete Chatter
    const handleDeleteChatter = (chatterId) => {
        const updatedChatters = chatters.filter((chatter) => chatter._id !== chatterId);
        setChatters(updatedChatters);
        setDeleteChatter(null);
    };

    return (
        <div className="container">
            <h1>Chatter</h1>
            {ctx.isLoggedIn && (
                <button className="btn btn-primary my-2" onClick={() => setShowNewChat(true)}>New Chatter</button>
            )}

            {
                // handle new chat
                showNewChat && (
                    <NewChatter onNewChatter={handleNewChatter} onCancel={() => setShowNewChat(false)} />
                )
            }


            {/* Mapping fetched data.content from chatter */}
            {chatters.map((chatter) => (
                <div key={chatter._id} className={styles["post-container"]}>
                    <div>
                        <p className={styles["post-content"]}>{chatter.userinput}</p>
                        <p className={styles["post-content"]}>By: {chatter.userId.username}</p>
                        <p>Comments:</p>
                        {/* Mapping fetched data.comments from chatter */}
                        {/* if comments don't exist return empty. */}
                        <div>
                            {chatter.commentId.length === 0 || chatter.commentId === null ? (
                                <p>No comments, Login or register and be the first to comment now!</p>
                            ) : (
                                chatter.commentId.map((comment, index) => (
                                    <Fragment key={index}>
                                        <p>@{comment.userId.username}: {comment.comments}</p>
                                    </Fragment>
                                ))
                            )}
                        </div>
                    </div>
                    {/* Check if the post username is same as the current logged in user */}
                    <div className={styles["button-container"]}>
                        {/* <div>
                            <p>Category: {chatter.categoryId.categoryname}</p>
                        </div> */}
                        {chatter.userId.username === ctx.username && (
                            <>
                                <button className="btn btn-primary" onClick={() => handleEditChatter(chatter)}><FontAwesomeIcon icon={faPencil} /> Edit Post</button>
                                <button className="btn btn-primary" onClick={() => setDeleteChatter(chatter)}><FontAwesomeIcon icon={faTrash} /> Delete Post</button>
                                <button type="button" className='btn btn-primary' onClick={handleShowComment}><FontAwesomeIcon icon={faComment} /> New Comment</button>
                                <Modal show={showComment} onHide={handleCloseComment}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>New Comment</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <NewComment chatter={chatter} />
                                    </Modal.Body>
                                </Modal>
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