import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Experiencia = () => {

  const initialState = {
    compania: '',
    cargo: '',
    ubi_empresa: '',
    tel_empresa: '',
    jefe_directo: '',
    fecha_inicio: '',
    fecha_termino: '',
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
  
    const camposRequeridos = ['compania', 'cargo', 'ubi_empresa', 'tel_empresa', 'jefe_directo',  'fecha_inicio', 'fecha_termino'];
    const camposVacios = camposRequeridos.filter(campo => !formData[campo].trim());
  
    if (camposVacios.length > 0) {
      toast.error("Favor de llenar todos los campos");
      return;
    }
    
    // Envío de la solicitud HTTP dentro del bloque then
    axios.post('http://localhost:4000/experiencia', formData)
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
  
    const camposRequeridos = ['compania', 'cargo', 'ubi_empresa', 'tel_empresa', 'jefe_directo',  'fecha_inicio', 'fecha_termino'];
    const camposVacios = camposRequeridos.filter(campo => !formData[campo].trim());
  
    if (camposVacios.length > 0) {
      toast.error("Favor de llenar todos los campos");
      return;
    }
    
    // Envío de la solicitud HTTP dentro del bloque then
    axios.post('http://localhost:4000/experiencia', formData)
      .then(response => {
        console.log('Datos enviados correctamente');
        setFormData(initialState);
        toast.success("Datos creados correctamente... procediendo a Hobbies",
          {
            onClose: () => {
                navigate(`/curriculum/${id}/hobbies`)
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
        <h1 className="text-center text-3xl font-bold my-8">Experiencia profesional</h1>
        <h2 className="text-center text-xl font-bold my-8">Ingrese los datos en los campos correspondientes a su experiencia laboral, procure no dejar campos vacios</h2>
        <form className="border rounded p-4 mt-4 text-start" method='post'>
          <div className="grid grid-cols-1 gap-4">
            <div className='mb-5'>
              <label className="block mb-1">Nombre de la compañia / empresa:</label>
              <input type="text" placeholder="Ingrese el nombre de la compañia" name="compania" value={formData.compania} onChange={handleChange} className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500" required />
            </div>
          </div>
          <h2 className='text-center text-2xl font-bold my-5'>Datos de ubicación empresarial</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Cargo desempeñado:</label>
              <input type="text" placeholder="Ingrese de manera especifica cual era su cargo dentro de la organizacion" name="cargo" value={formData.cargo} onChange={handleChange} className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500" required />
              </div>
              <div>
              <label className="block mb-1">Telefono de la empresa:</label>
              <input type="tel" placeholder="Ingresa el telefono de la empresa" name="tel_empresa" value={formData.tel_empresa} onChange={handleChange} className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500" required />
            </div>
            {/* Agregar más campos de entrada aquí */}
          </div>
          <div className="grid grid-cols-2 gap-4 my-5">
            <div>
              <label className="block mb-1">Ubicacion de la empresa:</label>
              <input type="text" placeholder="Ingrese la direccion de la empresa" name="ubi_empresa" value={formData.ubi_empresa} onChange={handleChange} className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500" required />
            </div>
            <div>
              <label className="block mb-1">Jefe directo:</label>
              <input type="text" placeholder="Ingrese el nombre de su jefe directo" name="jefe_directo" value={formData.jefe_directo} onChange={handleChange} className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500" required />
            </div>
            {/* Agregar más campos de entrada aquí */}
          </div>
          <h2 className='text-center text-2xl font-bold my-5'>Años de experiencia profesional</h2>
          <div className="grid grid-cols-2 gap-4 my-5">
          <div>
              <label className="block mb-1">Fecha de inicio de contrato:</label>
              <input type="date" placeholder="Seleccione la fecha en que comenzo a laborar en la empresa" name="fecha_inicio" value={formData.fecha_inicio} onChange={handleChange} className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500" required />
            </div>
            <div>
              <label className="block mb-1">Fecha de término de contrato:</label>
              <input type="date" placeholder="Selecciona la fecha de termino su contrato con la empresa" name="fecha_termino" value={formData.fecha_termino} onChange={handleChange} className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500" required />
            </div>
        </div>
          <div className="flex justify-center mt-6">
          <button type="submit" onClick={handleContinue} className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded mr-4">Aceptar y seguir con Mis Hobbies</button>
            <button type="submit" onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">Aceptar y registrar otro campo</button>
            <button type="button" onClick={handleCancelar} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Cancelar</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Experiencia;
