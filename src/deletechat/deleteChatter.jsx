import React from 'react';

const DeleteChatter = ({ chatter, onDeleteChatter, onCancel }) => {
    const handleDeleteChatter = () => {
        onDeleteChatter(chatter.id);
    };

    return (
        <div>
            <h2>Delete Chatter</h2>
            <div>
                <p>Are you sure you want to delete this chatter?</p>
                <p>Content: {chatter.content}</p>
                <p>Name: {chatter.name}</p>
            </div>
            <div>
                <button onClick={handleDeleteChatter}>Delete</button>
                <button onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
};

export default DeleteChatter;
