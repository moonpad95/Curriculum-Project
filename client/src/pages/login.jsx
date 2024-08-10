import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await axios.post("http://localhost:4000/login-in", {
        email: email,
        password: password
      });

      const { mensaje, auth, resultado } = response.data;

      if (auth) {
        const from = location.state?.from?.pathname || '/';
        
      localStorage.setItem('token', resultado.token);
      const decodedToken = jwtDecode(resultado.token)
      const username = decodedToken.username;
      localStorage.setItem('username', username);

        toast.success(mensaje, {
          position: "top-center",
          autoClose: 1000,
          onClose: () => navigate(from, { replace: true }),
          theme: "dark",
        })
      } else {
        toast.error(mensaje, {
          position: "top-center",
          autoClose: 1000,
          theme: "dark",
        });
        localStorage.removeItem('token');
      }

    } catch (error) {
      console.error(error);
      toast.error("Error al iniciar sesion, intentalo mas tarde");
    }
  };

  return (
    <div className="flex items-center justify-center py-40 bg-gray-100">
      <div className="bg-white w-3/5 py-14 px-10 rounded-xl shadow-md">
        <h2 className="text-3xl font-sans font-semibold text-white py-6 mb-6 bg-orange-500 rounded-xl text-center shadow-violet-800">
          Iniciar sesión
        </h2>
        <form onSubmit={handleSubmit}>
          <div className='flex space-x-10'>
            <div className="mb-16 w-full">
              <label className="flex text-gray-700 mb-5">Ingresa tu correo registrado:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder='Correo Electrónico'
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4 w-full">
              <label className="flex text-gray-700 mb-5">Ingresa tu contraseña:</label>
              <input
                type="password"
                placeholder='Contraseña'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <p className='mb-5'>¿No tienes una cuenta? <a href="/sign-up" className='text-purple-300'>Crear una cuenta</a></p>

          <button
            type="submit"
            className="w-full py-3 bg-violet-500 text-white rounded hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            Acceder
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
