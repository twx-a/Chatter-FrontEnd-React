import React, { useState } from 'react';

const EditChatter = ({ chatter, onEditChatter, onCancel }) => {
    const [editedContent, setEditedContent] = useState(chatter.userinput);

    const handleEditChatter = async () => {
        if (editedContent.trim() !== '') {
            const updatedChatter = {
                ...chatter,
                userinput: editedContent,
            };
    
            try {
                const response = await fetch(`http://localhost:4000/api/contents/${chatter._id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedChatter)
                });
                const data = await response.json();
    
                if (response.ok) {
                    console.log('Chatter updated successfully');
                    console.log(data);
                    onEditChatter(updatedChatter);
                } else {
                    throw new Error(data.message || 'Failed to update chatter');
                }
            } catch (err) {
                console.log(err.message);
            }
        }
    };
    

    return (
        <div>
            <h2>Edit Chatter</h2>
            <div>
                <input
                    type="text"
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    placeholder="Enter content"
                />
            </div>
            <div>
                <button onClick={handleEditChatter}>Save Changes</button>
                <button onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
};

export default EditChatter;
