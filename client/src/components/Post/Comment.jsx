import React, {useState, useEffect} from 'react';
import Modal from '../Modal';
import axios from 'axios';

const Comment = ({postId}) => {

    const [comments, setComments] = useState([]);
    const [content, setContent] = useState('');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/posts/${postId}/comments`);
                setComments(response.data);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };
        
        fetchComments();
    }, []);

    const handleComment = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post(`http://localhost:3000/posts/${postId}/comment`, {
                content,
            }, {
                headers: {
                    'Authorization': token
                }
            });
            console.log('Comment created:', response.data);
            setContent('');
            const updatedComments = await axios.get(`http://localhost:3000/posts/${postId}/comments`);
            setComments(updatedComments.data);
        } catch (error) {
            console.error('Error creating comment:', error);
        }
    }

    return (
        <div>
            <button onClick={() => setShowModal(true)}>Comment</button>

            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <div>

                {comments.map(comment => (
                <div key={comment.id}>
                    <p>{comment.user.nickname}</p>
                    <p>{comment.content}</p>
                </div>
        ))}
                    
                    <form onSubmit={handleComment}>
                        <input type="text" value={content} onChange={(e)=> setContent(e.target.value)}/>
                        <button type="submit">Comment</button>
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default Comment;