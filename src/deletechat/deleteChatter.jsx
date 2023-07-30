import React from 'react';

const DeleteChatter = ({ chatter, onDeleteChatter, onCancel }) => {
    const handleDeleteChatter = async () => {
        try {
            const response = await fetch(`http://localhost:4000/api/contents/${chatter._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
                // body: JSON.stringify(chatter.userinput)
            });
            
            const data = await response.json();

            if (response.ok) {
                console.log('deleted successfully');
                onDeleteChatter(chatter._id);
            } else {
                throw new Error(data.message || 'Failed to delete chatter');
            }
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <div>
            <h2>Delete Chatter</h2>
            <div>
                <p>Are you sure you want to delete this chatter?</p>
                <p>Content: {chatter.userinput}</p>
            </div>
            <div>
                <button onClick={handleDeleteChatter}>Delete</button>
                <button onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
};

export default DeleteChatter;
