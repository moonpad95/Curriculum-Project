import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Escolaridades = () => {
  const initialState = {
    certificado: '',
    fecha_inicio: '',
    fecha_graduacion: '',
    ubicacion_inst: '',
    FK_datos_generales: '', // Aquí se asignará el ID obtenido de la ruta
  };

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
  const handleSubmit = (e) => {
    e.preventDefault();
    // Asignar el ID obtenido de la ruta al campo fk_datos_generales
    setFormData((prevFormData) => ({
      ...prevFormData,
      FK_datos_generales: id,
    }));
  
    const camposRequeridos = ['certificado', 'fecha_inicio', 'fecha_graduacion', 'ubicacion_inst'];
    const camposVacios = camposRequeridos.filter(campo => !formData[campo].trim());
  
    if (camposVacios.length > 0) {
      toast.error("Favor de llenar todos los campos");
      return;
    }
    
    // Envío de la solicitud HTTP dentro del bloque then
    axios.post('http://localhost:4000/edu', formData)
      .then(response => {
        console.log('Datos enviados correctamente');
        setFormData(initialState);
        toast.success("Datos registrados correctamente",
          {
            onClose: () => {
              //   navigate('/')
            },
            autoClose: 500,
          },
        );
      })
      .catch(error => {

        console.error('Error al enviar datos:', error);
      });
  };

  const handleContinue = (e) => {
    e.preventDefault();
    // Asignar el ID obtenido de la ruta al campo fk_datos_generales
    setFormData((prevFormData) => ({
      ...prevFormData,
      FK_datos_generales: id,
    }));
  
    const camposRequeridos = ['certificado', 'fecha_inicio', 'fecha_graduacion', 'ubicacion_inst'];
    const camposVacios = camposRequeridos.filter(campo => !formData[campo].trim());
  
    if (camposVacios.length > 0) {
      toast.error("Favor de llenar todos los campos");
      return;
    }
    
    // Envío de la solicitud HTTP dentro del bloque then
    axios.post('http://localhost:4000/edu', formData)
      .then(response => {
        console.log('Datos enviados correctamente');
        setFormData(initialState);
        toast.success("Datos registrados correctamente",
          {
            onClose: () => {
                navigate(`/curriculum/${id}/habilidades`)
            },
            autoClose: 500,
          },
        );
      })
      .catch(error => {

        console.error('Error al enviar datos:', error);
        console.log(FK_datos_generales)
      });
  };
  
  const handleCancelar = () => {
    setFormData(initialState);
  };

  return (
    <>
      <div className="container mx-auto">
        <ToastContainer />
        <h1 className="text-center text-3xl font-bold my-8">Información escolar</h1>
        <h2 className="text-center text-xl font-bold my-8">Como siguiente paso, favor de ingresar tu Información escolar. Procure ingresar su institucion de procedencia</h2>
        <form className="border rounded p-4 mt-4 text-start" method='post'>
          <div className="grid grid-cols-1 gap-4">
            <div className='mb-5'>
              <label className="block mb-1">Nombres:</label>
              <input type="text" placeholder="Tipo de certificado" name="certificado" value={formData.certificado} onChange={handleChange} className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500" required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Fecha de inicio escolar:</label>
              <input type="date" placeholder="Selecciona la fecha de inicio" name="fecha_inicio" value={formData.fecha_inicio} onChange={handleChange} className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500" required />
            </div>
            <div>
              <label className="block mb-1">Fecha de término escolar (graduación):</label>
              <input type="date" placeholder="Selecciona la fecha de termino" name="fecha_graduacion" value={formData.fecha_graduacion} onChange={handleChange} className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500" required />
            </div>
            {/* Agregar más campos de entrada aquí */}
          </div>

          <div className="grid grid-cols-2 gap-4 mt-5">
            <div>
              <label className="block mb-1">Direccion de la institucion:</label>
              <input type="text" placeholder="Ingresa la direccion de la institucion" name="ubicacion_inst" value={formData.ubicacion_inst} onChange={handleChange} className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500" required />
            </div>
            {/* Agregar más campos de entrada aquí */}
          </div>
          <div className="flex justify-center mt-6">
          <button type="submit" onClick={handleContinue} className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded mr-4">Aceptar y seguir con Habilidades</button>
            <button type="submit" onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">Aceptar y registrar otro campo</button>
            <button type="button" onClick={handleCancelar} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Cancelar</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Escolaridades;
