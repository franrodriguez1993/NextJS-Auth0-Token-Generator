'use client'

import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { profileAccessToken } from '../../services/user';
import { useState } from 'react';

const ProfilePage = () => {
  const { user } = useUser();
  const [token, setToken] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);


  const handleToken = async () => {
    const t = await profileAccessToken();
    setToken(t);
    setIsModalOpen(true); // Abre el modal cuando se obtiene el token
  }


  const closeModal = () => {
    setIsModalOpen(false);
  }
  const copyToClipboard = async () => {
    if (token) {
      await navigator.clipboard.writeText(token);
      alert("Token copiado al portapapeles");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100 bg-black">
      <h1 className="text-2xl font-bold mb-4 text-white-800">
        Bienvenido {user?.name}
      </h1>
      <h2 className="text-lg text-white-600 mb-6">
        Haz click en el botón para obtener tu accessToken.
      </h2>

      <button 
        onClick={handleToken} 
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
      >
        Obtener Token
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full flex items-center justify-center flex-col ">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Access Token</h3>
             <img src='/images/gahyun-dreamcatcher.gif' className='h-40 w-40 rounded-full' />
            <button
              onClick={copyToClipboard}
              className="mt-4 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold focus:outline-none rounded"
            >
            Copiar al portapapeles
            </button>
       
            <button 
              onClick={closeModal} 
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default withPageAuthRequired(ProfilePage);
