import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Like from './Like';
import Comment from './Comment';


const Post = () => {

    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
              const response = await axios.get('http://localhost:3000/posts');
              setPosts(response.data);
            } catch (error) {
              if (error.response && error.response.status === 401) {
                navigate('/auth');
              } else {
                console.error('Error fetching posts:', error);
              }
            }
        };
          
        fetchPosts();
    }, []);

    return (

    <div>
        <h1>Posts</h1>
        {posts.map(post => (
            <div key={post.id}>
            <h2>{post.user.nickname}</h2>
            <h2>{post.content}</h2>
            <Like postId={post.id} />
            <Comment postId={post.id} />
            </div>
        ))}
    </div>
    );
}

export default Post;
