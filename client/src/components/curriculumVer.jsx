import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEnvelope,
    faPhoneAlt,
    faSuitcase,
    faGraduationCap,
    faLanguage,
    faComments,
    faTasks,
    faAddressCard,
} from '@fortawesome/free-solid-svg-icons';

const VistaContinua = () => {
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
        <>
            <div className="">
                <div className="bg-white  text-zinc-800 shadow-md p-5 w-full ">
                    <h1 className="text-3xl font-bold mb-4">
                        {datosGenerales?.nombre} {datosGenerales?.apellido_paterno} {datosGenerales?.apellido_materno}
                    </h1>
                    <p className="mb-4">
                        <b>Fecha de nacimiento:</b> {datosGenerales?.fecha_nacimiento}
                    </p>
                    <p className="mb-4">
                        <b>Dirección particular:</b> {datosGenerales?.direccion}
                    </p>

                    <p className="mb-4">
                        <FontAwesomeIcon icon={faEnvelope} /> {datosGenerales?.correo}
                    </p>
                    <p className="mb-4">
                        <FontAwesomeIcon icon={faPhoneAlt} /> {datosGenerales?.telefono}
                    </p>
                </div>
                <div className='flex bg-indigo-500'>
                    <div className='w-1/3 rounded-lg'>
                        <div className="bg-indigo-500 text-white shadow-md p-8 ">
                            <h2 className="text-2xl font-bold mb-4 text-center"> Hobbies y pasatiempos</h2>
                            <ul className="mb-4">
                                <li>
                                    {datosExperiencia && (
                                        <table className="text-xl">
                                            <tbody className='text-justify'>
                                                {datosHobbies.map((Hobbies, index) => (
                                                    <tr key={index} className={(index % 2 === 0) ? 'bg-indigo-500' : ''}>
                                                        <td className="px-5  py-2">
                                                            <ol className='list-disc'>
                                                                <li>
                                                                    {Hobbies.hobbies}.
                                                                </li>
                                                            </ol>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    )}
                                </li>
                            </ul>
                        </div>
                        <div className="bg-indigo-500 text-white shadow-md p-8 ">
                            <h2 className="text-2xl font-bold mb-4 text-center"> Redes sociales</h2>
                            <ul className="mb-4">
                                <li>
                                    {datosExperiencia && (
                                        <table className="text-xl">
                                            <tbody className=''>
                                                {datosRedes.map((Redes, index) => (
                                                    <tr key={index} className='text-justify'>
                                                        <td>
                                                            <ol className='list-disc'>
                                                                <li>
                                                                    {Redes.nombre_red_social}:
                                                                </li>
                                                            </ol>
                                                        </td>
                                                        <td>
                                                            <li className='ml-5'>
                                                                @{Redes.link_red}.
                                                            </li>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    )}
                                </li>
                            </ul>
                        </div>
                        <div className="bg-indigo-500 text-white shadow-md p-8 ">
                            <h2 className="text-2xl font-bold mb-4 text-center"> Idiomas</h2>
                            <ul className="mb-4">
                                <li>
                                    {datosIdiomas && (
                                        <table className="text-xl">
                                            <tbody className=''>
                                                {datosIdiomas.map((Idiomas, index) => (
                                                    <tr key={index} className='text-justify'>
                                                        <td>
                                                            <ol className='list-disc'>
                                                                <li>
                                                                    {Idiomas.idioma}:
                                                                </li>
                                                            </ol>
                                                        </td>
                                                        <td>
                                                            <li className='ml-5'>
                                                                {Idiomas.nivel}.
                                                            </li>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    )}
                                </li>
                            </ul>
                        </div>
                        <div className="bg-indigo-500 text-white shadow-md p-8 ">
                            <h2 className="text-2xl font-bold mb-4 text-center"> Habilidades</h2>
                            <ul className="mb-4">
                                <li>
                                    {datosHabilidades && (
                                        <table className="text-xl">
                                            <tbody className=''>
                                                {datosHabilidades.map((habilidad, index) => (
                                                    <tr key={index} className='text-justify'>
                                                        <td>
                                                            <ol className='list-disc'>
                                                                <li className='py-2'>
                                                                    {habilidad.habilidad}.
                                                                </li>
                                                            </ol>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    )}
                                </li>
                            </ul>
                        </div>
                        <div className="bg-indigo-500 text-white shadow-md p-8 ">
                            <h2 className="text-2xl font-bold mb-4 text-center"> Certificaciones y Seminarios</h2>
                            <ul className="mb-4">
                                <li>
                                    {datosCertificaciones && (
                                        <table className="text-lg">
                                            <tbody className=''>
                                                {datosCertificaciones.map((Certificaciones, index) => (
                                                    <tr key={index} className='text-justify'>
                                                        <td>
                                                            <ol className='list-disc'>
                                                                <li>
                                                                    {Certificaciones.titulo} ({Certificaciones.fecha}) - {Certificaciones.certificadora}
                                                                </li>
                                                                <hr />
                                                                {Certificaciones.descripcion}.
                                                                <br />Vig: {Certificaciones.vigencia} Años.

                                                            </ol>
                                                        </td>
                                                        <td>
                                                            <li className='ml-5'>
                                                            </li>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='w-2/3'>
                        <div className="bg-zinc-100 shadow-md p-8">
                            <h2 className="text-2xl font-bold mb-4"><FontAwesomeIcon icon={faAddressCard} /> Experiencia Profesional</h2>
                            <ul className="mb-4">
                                <li>
                                    {datosExperiencia && (
                                        <table>
                                            <thead className=' text-zinc-100 '>
                                                <tr>
                                                    <th className="px-4 py-2 text-center">Fechas de actividad</th>
                                                    <th className="px-4 py-2">Experiencia</th>
                                                </tr>
                                            </thead>
                                            <tbody className='text-center'>
                                                {datosExperiencia.map((datosExperiencia, index) => (
                                                    <tr key={index} className={(index % 2 === 0) ? 'bg-zinc-200' : ''}>
                                                        <td className='w-1/4 font-semibold '>
                                                            <h1>{`${datosExperiencia?.fecha_inicio} - ${datosExperiencia?.fecha_termino}`}</h1>
                                                        </td>
                                                        <td className=" px-4 py-2 text-justify">
                                                            <p className='font-bold'>{datosExperiencia?.cargo}</p>
                                                            <br />
                                                            <p>Compañia: {datosExperiencia.compania}</p>
                                                            <br />
                                                            <p>Tel: de la empresa: {datosExperiencia?.tel_empresa}</p>
                                                            <br />Ubicacion de la empresa: {datosExperiencia?.ubi_empresa}
                                                            <p>Jefe directo: {datosExperiencia?.jefe_directo}</p>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    )}

                                </li>
                            </ul>
                        </div>
                        <div className="bg-gray-100 shadow-md p-8">
                            <h2 className="text-2xl font-bold mb-4"><FontAwesomeIcon icon={faGraduationCap} /> Educación</h2>
                            <ul className="mb-4">
                                <li>
                                    {datosEscolaridad && (
                                        <table>
                                            <thead className=' text-zinc-100 '>
                                                <tr>
                                                    <th className="px-4 py-2 text-center">Fechas de actividad</th>
                                                    <th className="px-4 py-2">Experiencia</th>
                                                </tr>
                                            </thead>
                                            <tbody className='text-center'>
                                                {datosEscolaridad.map((datosEscolaridad, index) => (
                                                    <tr key={index} className={(index % 2 === 0) ? 'bg-zinc-200' : ''}>
                                                        <td className='w-1/4 font-semibold '>
                                                            <h1>{`${datosEscolaridad?.fecha_inicio} - ${datosEscolaridad?.fecha_graduacion}`}</h1>
                                                        </td>
                                                        <td className=" px-4 py-2 text-justify">
                                                            <p className='font-bold'>{datosEscolaridad.certificado}</p>
                                                            <br />
                                                            <br />Escuela: {datosEscolaridad.ubicacion_inst}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    )}

                                </li>
                            </ul>
                        </div>
                        <div className="bg-gray-100 shadow-md p-8">
                            <h2 className="text-2xl font-bold mb-4"><FontAwesomeIcon icon={faGraduationCap} /> Proyectos Profesionales</h2>
                            <ul className="mb-4">
                                <li>
                                    {datosProyectos && (
                                        <table className="">
                                            <thead className=' text-zinc-100 '>
                                                <tr>
                                                    <th className="px-4 py-2 text-center">Fechas de actividad</th>
                                                    <th className="px-4 py-2">Experiencia</th>
                                                </tr>
                                            </thead>
                                            <tbody className='text-center'>
                                                {datosProyectos.map((datosProyectos, index) => (
                                                    <tr key={index} className={(index % 2 === 0) ? 'bg-zinc-200' : ''}>
                                                        <td className='w-1/4 font-semibold '>
                                                            <h1>{datosProyectos.nombre_proyecto}</h1>
                                                        </td>
                                                        <td className=" px-4 py-2 text-justify">
                                                            <p className='font-bold'>{datosProyectos.descripcion}</p>
                                                            <br />
                                                            <p>Estatus del proyecto: <p className='font-bold'> {datosProyectos.estado}</p></p>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default VistaContinua;
