import React, { useState } from 'react';
import axios from 'axios';
import Modal from '../Modal';

const CreatePost = () => {
    const [image, setImage] = useState('');
    const [content, setContent] = useState('');

    const [showModal, setShowModal] = useState(false);


    const handleCreatePost = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
        const response = await axios.post('http://localhost:3000/create-post', {
            content,
            image
            
        }, {
            headers: {
            'Authorization': token
            }
        });
        console.log('Post created:', response.data);
        setContent('');
        setImage('');
        } catch (error) {
        console.error('Error creating post:', error);
        }
    };

    return (
       <div>
            <button onClick={() => setShowModal(true)}>Create post</button>
        
            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <div>
                    <h1>Create post</h1>
                    <form onSubmit={handleCreatePost}>
                        <div>
                            <label>image</label>
                            <input type="image" value={image} onChange={(e) => setImage(e.target.value)} />
                        </div>
                        <div>
                            <label>content</label>
                            <input type="text" value={content} onChange={(e) => setContent(e.target.value)} />
                        </div>
                        <button type="submit">create</button>
                    </form>
                </div>
            </Modal>
        </div>
    )
}

export default CreatePost;