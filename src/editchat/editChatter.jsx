import React, { useState, useEffect } from 'react';

const EditChatter = ({ chatter, onEditChatter, onCancel }) => {
    const [editedContent, setEditedContent] = useState(chatter.content);

    useEffect(() => {
        setEditedContent(chatter.content);
    }, [chatter]);

    const handleEditChatter = () => {
        if (editedContent.trim() !== '') {
            const updatedChatter = {
                ...chatter,
                content: editedContent,
            };
            onEditChatter(updatedChatter);
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
