import { useContext, useState } from "react";
import UserContext from "../contexts/UserContext";

const NewComment = (chatter) => {
    const ctx = useContext(UserContext);  // Get the user context
    const [newComment, setNewComment] = useState('');

    const handleNewComment = async () => {
        let newComment = {};

        if (newComment.trim() !== '') {
            newComment = {
                userinput: newComment,
                userId: ctx.userId,
                contentId: chatter._id,
            };
        }
        try {
            console.log(JSON.stringify(newComment));
            // Send a POST request to create a new chatter/post
            const response = await fetch('http://localhost:4000/api/comments/newcomment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newComment)  // Pass the new chatter data
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to create chatter');
            }


            // Add the id to the new chatter object
            newComment._id = data._id;

        } catch (err) {
            console.log(err.message);
        }
    }
    return (
        <div>
            <form>
                <div className="form-group">
                    <label htmlFor="comment">Comment</label>
                    <input
                    type="text"
                    className='form-control my-3'
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Enter content"
                />
                </div>
                <button type="submit" onClick={handleNewComment} className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default NewComment;