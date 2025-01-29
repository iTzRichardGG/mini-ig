import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Post from '../components/Post/Post';
import CreatePost from '../components/Post/CreatePost';

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/auth'); 
        return;
      }

      try {
        await axios.get('http://localhost:3000', {
          headers: {
            'Authorization': token
          }
        });
      } catch (error) {
        console.error('Error fetching protected data:', error);
        navigate('/auth');
      }
    };

    verifyToken();
  }, []);


  return (
    
    <div>
      <Post/>

      <CreatePost/>

      <button onClick={() => {
        localStorage.removeItem('token');
        navigate('/auth');
      }}>Cerrar sesion</button>
    </div>
  );
};

export default HomePage;