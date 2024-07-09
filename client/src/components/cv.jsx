import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const DatosGenerales = () => {
    const initialState = {
        nombre: '',
        apellido_paterno: '',
        apellido_materno: '',
        fecha_nacimiento: '',
        direccion: '',
        correo: '',
        telefono: '',
        url_webpage: ''
    };

    const [formData, setFormData] = useState(initialState);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    //Validar la edad ingresada, el usuario debe ser mayor de 18 años
    const validarEdad = (fechaNacimiento) => {
        const fechaNacimientoDate = new Date(fechaNacimiento);
        const fechaActual = new Date();
        const edadMinima = 18;

        fechaNacimientoDate.setFullYear(fechaNacimientoDate.getFullYear() + edadMinima);

        return fechaNacimientoDate <= fechaActual;
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        //Prevenir el envio de datos si el usuario no tiene 18 años
        if (!validarEdad(formData.fecha_nacimiento)) {
            toast.error("Debes tener al menos 18 años de edad");
            return;
        }

        axios.post('http://localhost:4000/tasks', formData)
            .then(response => {
                console.log('Datos enviados correctamente');
                setFormData(initialState);
                toast.success("Datos generales registrados correctamente", {
                    onClose: () => {
                        navigate('/curriculum');
                    },
                    autoClose: 500,
                });
            })
            .catch(error => {
                console.error('Error al enviar datos:', error);
            });
    };

    const handleCancelar = () => {
        setFormData(initialState);
    };

    return (
        <div className="container mx-auto">
            <ToastContainer />
            <div className='bg-indigo-500 rounded-lg shadow-md p-8 mt-8 w-full'>
                <h1 className="text-center text-4xl font-bold my-8 text-white">Datos Generales</h1>
                <h2 className="text-center text-xl font-bold my-8 text-white">Antes de iniciar, por favor ingresa tus datos generales</h2>
                <form className="border rounded p-4 mt-4 text-start" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4 my-5">
                        <div>
                            <label className="block mb-1 text-white">Nombres:</label>
                            <input type="text" placeholder="Ingresa tus nombres" name="nombre" value={formData.nombre} onChange={handleChange} className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500" required />
                        </div>
                        <div>
                            <label className="block mb-1 text-white">Apellido Paterno:</label>
                            <input type="text" placeholder="Ingresa tu apellido paterno" name="apellido_paterno" value={formData.apellido_paterno} onChange={handleChange} className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500" required />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 my-5">
                        <div>
                            <label className="block mb-1 text-white">Apellido Materno:</label>
                            <input type="text" placeholder="Ingresa tu apellido materno" name="apellido_materno" value={formData.apellido_materno} onChange={handleChange} className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500" required />
                        </div>
                        <div>
                            <label className="block mb-1 text-white">Fecha de Nacimiento:</label>
                            <input type="date" placeholder="Ingresa tu fecha de nacimiento" name="fecha_nacimiento" value={formData.fecha_nacimiento} onChange={handleChange} className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500" required />
                            {!validarEdad(formData.fecha_nacimiento) && (
                                <span className="text-red-300">Debes tener al menos 18 años de edad!</span>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4 my-5">
                        <div>
                            <label className="block mb-1 text-white">Correo Electrónico:</label>
                            <input type="email" placeholder="Ingresa tu correo electrónico" pattern="[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}" name="correo" value={formData.correo} onChange={handleChange} className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500" required />
                            <span className='text-red-300'>Ingresa tu correo en formato example@email.com</span>
                        </div>
                        <div>
                            <label className="block mb-1 text-white">Teléfono Celular:</label>
                            <input type="tel" placeholder="Ingresa tu teléfono celular" name="telefono" value={formData.telefono} onChange={handleChange} pattern="[0-9]{10}" className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500" required />
                            <span className='text-red-300'>Ingresa tu número a 10 dígitos sin caracteres</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                            <label className="block mb-1 text-white">Dirección:</label>
                            <input type="text" placeholder="Ingresa tu dirección" name="direccion" value={formData.direccion} onChange={handleChange} className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500" required />
                        </div>
                        <div>
                            <label className="block mb-1 text-white">URL de tu Portafolio de Experiencia:</label>
                            <input type="url" placeholder="Ingresa el URL de tu portafolio de experiencia" name="url_webpage" value={formData.url_webpage} onChange={handleChange} className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500" />
                        </div>
                    </div>

                    <div className="flex justify-center mt-6">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">Aceptar</button>
                        <button type="button" onClick={handleCancelar} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DatosGenerales;
