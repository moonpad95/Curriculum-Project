import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const DeleteDatosGenerales = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Obtenemos el parámetro id de la URL

  useEffect(() => {
    // Envío de la solicitud HTTP dentro del bloque then
    axios.delete(`http://localhost:4000/tasks/${id}`)
      .then(response => {
        console.log('Datos eliminados correctamente');
        toast("Eliminación de datos exitosa..", {  
          onClose: () => {
            navigate(`/curriculums`);
          },
          autoClose: 500,
        });
      })
      .catch(error => {
        console.error('Error al eliminar datos:', error);
      });
  }, [id, navigate]); // Utilizamos id y navigate como dependencias del efecto

  return (
    <ToastContainer /> // Mostramos el ToastContainer
  );
};

export default DeleteDatosGenerales;
