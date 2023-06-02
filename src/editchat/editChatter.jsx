import React, { useState, useEffect } from 'react';

const EditChatter = ({ chatter, onEditChatter, onCancel }) => {
    const [editedContent, setEditedContent] = useState(chatter.content);
    const [editedName, setEditedName] = useState(chatter.name);

    useEffect(() => {
        setEditedContent(chatter.content);
        setEditedName(chatter.name);
    }, [chatter]);

    const handleEditChatter = () => {
        if (editedContent.trim() !== '' && editedName.trim() !== '') {
            const updatedChatter = {
                ...chatter,
                content: editedContent,
                name: editedName,
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
                <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    placeholder="Enter name"
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
