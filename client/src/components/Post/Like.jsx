import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Like = ({postId}) => {

    const [likes, setLikes] = useState(0);

    useEffect(() => {
    const fetchLikes = async () => {
      console.log('Fetching likes...');
      try {
        const response = await axios.get(`http://localhost:3000/posts/${postId}/likes`);
        setLikes(response.data.likes);
      } catch (error) {
        console.error('Error fetching likes:', error);
      }
    };

    fetchLikes();
  }, [postId]);

  const handleLike = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(`http://localhost:3000/posts/${postId}/like`, {}, {
        headers: {
          'Authorization': token
        }
      });
      if (response.data.message === 'Like removed') {
        setLikes(likes - 1);
      } else {
        setLikes(likes + 1);
      }
      setError(null);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

    return (
        <div>
            <button onClick={handleLike}>Like</button>
            <p>{likes}</p>
        </div>
    );
};

export default Like;