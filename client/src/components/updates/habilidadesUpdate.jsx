import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const HabilidadesEdit = () => {
  const initialState = {
    habilidad: '',
    descripcion: '',
    FK_datos_generales: '', // Aquí se asignará el ID obtenido de la ruta
  };
  const [datosHabilidades, setDatosHabilidades] = useState([]);

  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params; // CORRECTO, porque accede a la propiedad id del objeto params
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const API_URL = `http://localhost:4000/habilidades-put/${id}`;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerDatosHabilidades = async () => {
      try {
        const response = await axios.get(API_URL);
        setDatosHabilidades(response.data);
      } catch (error) {
        setError('Error al obtener los datos generales: '+ error.message);
        
      } finally {
        setLoading(false);
      }
    };

    obtenerDatosHabilidades();
  }, [API_URL]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!datosHabilidades || datosHabilidades.length === 0) {
    return <p>No hay datos disonibles.</p>;
  }


  const handleContinue = (e) => {
    e.preventDefault();
  
    const camposRequeridos = ['habilidad', 'descripcion'];
    const camposVacios = camposRequeridos.filter(campo => !formData[campo].trim());
  
    if (camposVacios.length > 0) {
      toast.error("Favor de llenar todos los campos");
      return;
    }
    
    // Envío de la solicitud HTTP dentro del bloque then
    axios.put(`http://localhost:4000/habilidades/${id}`, formData)
      .then(response => {
        console.log('Datos enviados correctamente');
        setFormData(initialState);
        toast.success("Datos Actualizados correctamente",
          {
            onClose: () => {
                navigate(`/curriculums`)
            },
            autoClose: 500,
          },
        );
      })
      .catch(error => {

        console.error('Error al enviar datos:', error);
      });
  };
  
  const handleCancelar = () => {
    setFormData(initialState);
  };

  return (
    <>
      <div className="container mx-auto">
        <ToastContainer />
        <h1 className="text-center text-3xl font-bold my-8">Habilidades Personales</h1>
        <h2 className="text-center text-xl font-bold my-8">De segunda mano, describa algunas de sus habilidades mas destacadas. Procure ser breve y usar el lenguaje adecuado.</h2>
        {datosHabilidades.map((dato) => (
        <form className="border rounded p-4 mt-4 text-start" method='post'>
          <div className="grid grid-cols-2 gap-4">
            <div className='mb-5'>
              <label className="block mb-1">Habilidad (Describa de manera profesional):</label>
              <input type="text" placeholder="Ejem: Programacion Full Stack con JS" name="habilidad" value={formData.habilidad} onChange={handleChange}  className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500" required />
            </div>
            <div>
              <label className="block mb-1">Descripcion de habilidad:</label>
                <textarea type="text" placeholder="Sea breve pero certero en su habilidad" name="descripcion" value={formData.descripcion} onChange={handleChange} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
          </div>
          <div className="flex justify-center mt-6">
          <button type="submit" onClick={handleContinue} className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded mr-4">Actualizar</button>
            <button type="button" onClick={handleCancelar} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Cancelar</button>
          </div>
        </form>
                ))}

      </div>
    </>
  );
}

export default HabilidadesEdit;
