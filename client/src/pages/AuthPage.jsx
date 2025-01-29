import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const AuthPage = () => {
  
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerNickname, setRegisterNickname] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/register', {
        email: registerEmail,
        name: registerName,
        nickname: registerNickname,
        password: registerPassword
      });
      console.log('User registered:', response.data);
      localStorage.setItem('token', response.data.token); // Almacenar el token en localStorage
      navigate('/');

    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/login', {
        email: loginEmail,
        password: loginPassword
      });
      console.log('User logged in:', response.data);
      localStorage.setItem('token', response.data.token); // Almacenar el token en localStorage
      navigate('/');
    } catch (error) {
      console.error('Error logging in user:', error);
    }
  };

  return (
    <div>
      <div className='flex justify-center items-center h-screen'>
        <div className='flex-col flex justify-around w-13/20 h-full'>
          <div className='flex flex-col items-center justify-center mt-16 space-y-3'>
            <img className='size-32' src={logo} alt="" />
            <p className='font-[Oooh Baby] text-2xl font-thin text-[#66fcf1]'>Macacos</p>
          </div>
          <div className='mb-13'>
            <p className='text-center font-bold text-3xl text-[#66fcf1]'>¡Hola de nuevo!</p> 
            <p className='mb-8 text-center font-light'>¿Listo para continuar?</p>
            <form onSubmit={handleLogin}>
              <div className='space-y-4 text-center'>
                <div>
                  <input className='bg-[#1f2833] text-white rounded-lg py-4 pl-4 w-full text-xs' 
                    placeholder='Correo' value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
                </div>
                <div>
                  <input className='bg-[#1f2833] text-white rounded-lg py-4 pl-4 w-full text-xs' 
                  placeholder='Contraseña' type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                </div>
                <div className='mt-3 mb-11'>
                  <p className='text-xs text-end hover:underline font-light'>Olvidaste tu contraseña?</p>
                </div>
                <div className='text-center'>
                  <button className='px- py-4 w-7/10 text-md rounded-lg text-[#66fcf1] bg-[#1f2833]' type="submit">Iniciar sesion</button>
                </div>
              </div>
            </form>
          </div>
          <div className='text-md/6 text-center '>
            <p>No tienes una cuenta?</p>
            <p className='text-[#66fcf1]'>Registrate ahora</p>
          </div>
        </div>

        <div className='border-slate-900 border-2 rounded-lg p-4 hidden'> 
          <h1>Register</h1>
          <form onSubmit={handleRegister}>
            <div>
              <p>Nombre</p>
              <input type="text" value={registerName} onChange={(e) => setRegisterName(e.target.value)} />
            </div>
            <div>
              <p>Nombre se usuario</p>
              <input type="text" value={registerNickname} onChange={(e) => setRegisterNickname(e.target.value)} />
            </div>
            <div>
              <p>Email:</p>
              <input type="" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} />
            </div>
            <div>
              <p>Contraseña</p>
              <input type="password" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} />
            </div>
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;