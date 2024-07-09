import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const VistaCurri = () => {
    const [datosGenerales, setDatosGenerales] = useState(null);
    const [datosEscolaridad, setDatosEscolaridad] = useState(null);
    const [datosExperiencia, setDatosExperiencia] = useState(null);
    const [datosHabilidades, setDatosHabilidades] = useState(null);
    const [datosProyectos, setDatosProyectos] = useState(null);
    const [datosIdiomas, setDatosIdiomas] = useState(null);
    const [datosHobbies, setDatosHobbies] = useState(null);
    const [datosRedes, setDatosRedes] = useState(null);
    const [datosCertificaciones, setDatoCertificaciones] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const obtenerDatosGenerales = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/tasks/${id}`);
                setDatosGenerales(response.data);
            } catch (error) {
                setError('Error al obtener los datos generales: ' + error.message);
            }
        };

        const obtenerDatosEscolaridad = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/edu/${id}`);
                setDatosEscolaridad(response.data);
            } catch (error) {
                setError('Error al obtener los datos de escolaridad: ' + error.message);
            }

        };

        const obtenerDatosExperiencia = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/experiencia/${id}`);
                setDatosExperiencia(response.data);
            } catch (error) {
                setError('Error al obtener los datos de experiencia: ' + error.message);
            } finally {
                setLoading(false);
            }
        };
        const obtenerDatosHabilidades = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/habilidades/${id}`);
                setDatosHabilidades(response.data);
            } catch (error) {
                setError('Error al obtener los datos de experiencia: ' + error.message);
            } finally {
                setLoading(false);
            }
        };
        const obtenerDatosProyectos = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/proyectos/${id}`);
                setDatosProyectos(response.data);
            } catch (error) {
                setError('Error al obtener los datos de experiencia: ' + error.message);
            } finally {
                setLoading(false);
            }
        };
        const obtenerDatosIdiomas = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/idiomas/${id}`);
                setDatosIdiomas(response.data);
            } catch (error) {
                setError('Error al obtener los datos de experiencia: ' + error.message);
            } finally {
                setLoading(false);
            }
        };
        const obtenerDatosHobbies = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/hob/${id}`);
                setDatosHobbies(response.data);
            } catch (error) {
                setError('Error al obtener los datos de experiencia: ' + error.message);
            } finally {
                setLoading(false);
            }
        };
        const obtenerDatosRedes = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/redes/${id}`);
                setDatosRedes(response.data);
            } catch (error) {
                setError('Error al obtener los datos de experiencia: ' + error.message);
            } finally {
                setLoading(false);
            }
        };
        const obtenerDatosCertificaciones = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/cert/${id}`);
                setDatoCertificaciones(response.data);
            } catch (error) {
                setError('Error al obtener los datos de experiencia: ' + error.message);
            } finally {
                setLoading(false);
            }
        };

        obtenerDatosGenerales();
        obtenerDatosEscolaridad();
        obtenerDatosExperiencia();
        obtenerDatosHabilidades();
        obtenerDatosProyectos();
        obtenerDatosIdiomas();
        obtenerDatosHobbies();
        obtenerDatosRedes();
        obtenerDatosCertificaciones();


    }, [id]);

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }


    return (
        <div>
            <h1 className="text-3xl font-bold mb-4 text-center my-5">Modificar un registro</h1>
            <div className="overflow-x-auto mt-5 ">
                <table className="table-auto w-full border-collapse border border-gray-800">
                    <thead className='bg-purple-600 text-white'>
                        <tr>
                            <th className="px-4 py-2">Nombre</th>
                            <th className="px-4 py-2">Apellido Paterno</th>
                            <th className="px-4 py-2">Apellido Materno</th>
                            <th className="px-4 py-2">Fecha de Nacimiento</th>
                            <th className="px-4 py-2">Dirección</th>
                            <th className="px-4 py-2">Correo</th>
                            <th className="px-4 py-2">Teléfono</th>
                            <th className='px-4 py-2'>Actualizar registro</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border px-4 py-2">{datosGenerales?.nombre}</td>
                            <td className="border px-4 py-2">{datosGenerales?.apellido_paterno}</td>
                            <td className="border px-4 py-2">{datosGenerales?.apellido_materno}</td>
                            <td className="border px-4 py-2">{datosGenerales?.fecha_nacimiento}</td>
                            <td className="border px-4 py-2">{datosGenerales?.direccion}</td>
                            <td className="border px-4 py-2">{datosGenerales?.correo}</td>
                            <td className="border px-4 py-2">{datosGenerales?.telefono}</td>
                            <td className="border px-4 py-2 text-center">     
                            <Button className="bg-purple-600 hover:bg-amber-500 px-2 p-1 m-2 rounded-lg text-white" onClick={() => navigate(`/curriculum/${datosGenerales.ID_datos_generales}/modify`)}>
                                Editar registro
                            </Button></td>
                        </tr>
                    </tbody>
                </table>
                {/* Tabla de experiencia */}
                <h1 className='font-bold text-2xl my-5 text-purple-700 text-center'>Datos de experiencia profesional</h1>
                {datosExperiencia && (
                    <table className="table-auto w-full border-collapse border border-gray-800">
                        <thead className='bg-purple-600 text-white'>
                            <tr>
                                <th className="px-4 py-2">Cargo</th>
                                <th className="px-4 py-2">Telefono Empresarial</th>
                                <th className="px-4 py-2">Ubicación</th>
                                <th className="px-4 py-2">Jefe Directo</th>
                                <th className="px-4 py-2">Fecha de Inicio</th>
                                <th className="px-4 py-2">Fecha de Termino de contrado</th>
                                <th className='px-4 py-2'>Actualizar registro</th>

                            </tr>
                        </thead>
                        <tbody className='text-center'>
                            {datosExperiencia.map((datosExperiencia, index) => (
                                <tr key={index} className={(index % 2 === 0) ? 'bg-gray-100' : ''}>
                                    <td className="border px-4 py-2">{datosExperiencia?.cargo}</td>
                                    <td className="border px-4 py-2">{datosExperiencia?.tel_empresa}</td>
                                    <td className="border px-4 py-2">{datosExperiencia?.ubi_empresa}</td>
                                    <td className="border px-4 py-2">{datosExperiencia?.jefe_directo}</td>
                                    <td className="border px-4 py-2">{datosExperiencia?.fecha_inicio}</td>
                                    <td className="border px-4 py-2">{datosExperiencia?.fecha_termino}</td>
                                    <td className="border px-4 py-2 text-center">     
                            <Button className="bg-purple-600 hover:bg-amber-500 px-2 p-1 m-2 rounded-lg text-white" onClick={() => navigate(`modify/${datosExperiencia.ID_experiencia_laboral}/experiencia`)}>
                                Editar registro
                            </Button></td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                )}
                {/* Tabla de escolaridad */}
                <h1 className='font-bold text-2xl my-5 text-purple-700 text-center'>Datos de Escolaridad</h1>

                {datosEscolaridad && (
                    <table className="table-auto w-full border-collapse border border-gray-800">
                        <thead className='bg-purple-600 text-white'>
                            <tr>
                                <th className="px-4 py-2">Certificado Obtenido</th>
                                <th className="px-4 py-2">Fecha de Inicio</th>
                                <th className="px-4 py-2">Fecha de Graduación</th>
                                <th className="px-4 py-2">Ubicación</th>
                                <th className='px-4 py-2'>Actualizar registro</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datosEscolaridad.map((dato, index) => (
                                <tr key={index} className={(index % 2 === 0) ? 'bg-gray-100' : ''}>
                                    <td className="border px-4 py-2">{dato.certificado}</td>
                                    <td className="border px-4 py-2">{dato.fecha_inicio}</td>
                                    <td className="border px-4 py-2">{dato.fecha_graduacion}</td>
                                    <td className="border px-4 py-2">{dato.ubicacion_inst}</td>
                                    <td className="border px-4 py-2 text-center">     
                            <Button className="bg-purple-600 hover:bg-amber-500 px-2 p-1 m-2 rounded-lg text-white" onClick={() => navigate(`/curriculum/${datosGenerales.ID_datos_generales}/modify`)}>
                                Editar registro
                            </Button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                                <h1 className='font-bold text-2xl my-5 text-purple-700 text-center'>Datos de Habilidades profesionales</h1>

                {datosHabilidades && (
                    <table className="table-auto w-full border-collapse border border-gray-800">
                        <thead className='bg-purple-600 text-white'>
                            <tr>
                                <th className="px-4 py-2">Habilidad</th>
                                <th className="px-4 py-2">Descripción</th>
                                <th className='px-4 py-2'>Actualizar registro</th>

                            </tr>
                        </thead>
                        <tbody>
                            {datosHabilidades.map((habilidad, index) => (
                                <tr key={index} className={(index % 2 === 0) ? 'bg-gray-100' : ''}>
                                    <td className="border px-4 py-2">{habilidad.habilidad}</td>
                                    <td className="border px-4 py-2">{habilidad.descripcion}</td>
                                    <td className="border px-4 py-2 text-center">     
                                    <Button className="bg-purple-600 hover:bg-amber-500 px-2 p-1 m-2 rounded-lg text-white" onClick={() => navigate(`/modify/${habilidad.ID_habilidad}/habilidades`)}>
                                Editar registro
                            </Button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                                <h1 className='font-bold text-2xl my-5 text-purple-700 text-center'>Datos de Proyectos</h1>
                {datosProyectos && (
                    <table className="table-auto w-full border-collapse border border-gray-800">
                        <thead className='bg-purple-600 text-white'>
                            <tr>
                                <th className="px-4 py-2">Nombre del proyecto</th>
                                <th className="px-4 py-2">Descripción</th>
                                <th className="px-4 py-2">Estatus del proyecto</th>
                                <th className='px-4 py-2'>Actualizar registro</th>

                            </tr>
                        </thead>
                        <tbody>
                            {datosProyectos.map((proyectos, index) => (
                                <tr key={index} className={(index % 2 === 0) ? 'bg-gray-100' : ''}>
                                    <td className="border px-4 py-2">{proyectos.nombre_proyecto}</td>
                                    <td className="border px-4 py-2">{proyectos.descripcion}</td>
                                    <td className="border px-4 py-2">{proyectos.estado}</td>
                                    <td className="border px-4 py-2 text-center">     
                            <Button className="bg-purple-600 hover:bg-amber-500 px-2 p-1 m-2 rounded-lg text-white" onClick={() => navigate(`/curriculum/${datosGenerales.ID_datos_generales}/modify`)}>
                                Editar registro
                            </Button></td>  
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                                <h1 className='font-bold text-2xl my-5 text-purple-700 text-center'>Datos de Idiomas</h1>

                {datosIdiomas && (
                    <table className="table-auto w-full border-collapse border border-gray-800">
                        <thead className='bg-purple-600 text-white'>
                            <tr>
                                <th className="px-4 py-2">Idioma</th>
                                <th className="px-4 py-2">Nivel</th>
                                <th className='px-4 py-2'>Actualizar registro</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datosIdiomas.map((Idiomas, index) => (
                                <tr key={index} className={(index % 2 === 0) ? 'bg-gray-100' : ''}>
                                    <td className="border px-4 py-2">{Idiomas.idioma}</td>
                                    <td className="border px-4 py-2">{Idiomas.nivel}</td>
                                    <td className="border px-4 py-2 text-center">     
                            <Button className="bg-purple-600 hover:bg-amber-500 px-2 p-1 m-2 rounded-lg text-white" onClick={() => navigate(`/curriculum/${datosGenerales.ID_datos_generales}/modify`)}>
                                Editar registro
                            </Button></td>  
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                                <h1 className='font-bold text-2xl my-5 text-purple-700 text-center'>Datos de Hobbies y Pasatiempos</h1>

                {datosHobbies && (
                    <table className="table-auto w-full border-collapse border border-gray-800">
                        <thead className='bg-purple-600 text-white'>
                            <tr>
                                <th className="px-4 py-2">Mis Hobbies y pasatiempos</th>
                                <th className='px-4 py-2'>Actualizar registro</th>

                            </tr>
                        </thead>
                        <tbody>
                            {datosHobbies.map((Hobbies, index) => (
                                <tr key={index} className={(index % 2 === 0) ? 'bg-gray-100' : ''}>
                                    <td className="border px-4 py-2">{Hobbies.hobbies}</td>
                                    <td className="border px-4 py-2 text-center">     
                            <Button className="bg-purple-600 hover:bg-amber-500 px-2 p-1 m-2 rounded-lg text-white" onClick={() => navigate(`/curriculum/${datosGenerales.ID_datos_generales}/modify`)}>
                                Editar registro
                            </Button></td> 
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                                <h1 className='font-bold text-2xl my-5 text-purple-700 text-center'>Datos de Redes Sociales</h1>

                {datosRedes && (
                    <table className="table-auto w-full border-collapse border border-gray-800">
                        <thead className='bg-purple-600 text-white'>
                            <tr>
                                <th className="px-4 py-2">Red social</th>
                                <th className="px-4 py-2">Perfil de usuario</th>
                                <th className='px-4 py-2'>Actualizar registro</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datosRedes.map((Redes, index) => (
                                <tr key={index} className={(index % 2 === 0) ? 'bg-gray-100' : ''}>
                                    <td className="border px-4 py-2">{Redes.nombre_red_social}</td>
                                    <td className="border px-4 py-2">@{Redes.link_red}</td>
                                    <td className="border px-4 py-2 text-center">     
                            <Button className="bg-purple-600 hover:bg-amber-500 px-2 p-1 m-2 rounded-lg text-white" onClick={() => navigate(`/curriculum/${datosGenerales.ID_datos_generales}/modify`)}>
                                Editar registro
                            </Button></td> 
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                                <h1 className='font-bold text-2xl my-5 text-purple-700 text-center'>Datos de Certificaciones</h1>

                {datosCertificaciones && (
                    <table className="table-auto w-full border-collapse border border-gray-800">
                        <thead className='bg-purple-600 text-white'>
                            <tr>
                                <th className="px-4 py-2">Titulo o Certifiacion</th>
                                <th className="px-4 py-2">Descripcion</th>
                                <th className="px-4 py-2">Fecha de Certificacion</th>
                                <th className="px-4 py-2">Certificadora Acreditada</th>
                                <th className="px-4 py-2">Vigencia del Certificado</th>
                                <th className='px-4 py-2'>Actualizar registro</th>

                            </tr>
                        </thead>
                        <tbody>
                            {datosCertificaciones.map((Certificaciones, index) => (
                                <tr key={index} className={(index % 2 === 0) ? 'bg-gray-100' : ''}>
                                    <td className="border px-4 py-2">{Certificaciones.titulo}</td>
                                    <td className="border px-4 py-2">{Certificaciones.descripcion}</td>
                                    <td className="border px-4 py-2">{Certificaciones.fecha}</td>
                                    <td className="border px-4 py-2">{Certificaciones.certificadora}</td>
                                    <td className="border px-4 py-2">{Certificaciones.vigencia}</td>
                                    <td className="border px-4 py-2 text-center">     
                            <Button className="bg-purple-600 hover:bg-amber-500 px-2 p-1 m-2 rounded-lg text-white" onClick={() => navigate(`/curriculum/${datosGenerales.ID_datos_generales}/modify`)}>
                                Editar registro
                            </Button></td> 
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

            </div>
        </div>
    );
};

export default VistaCurri;
