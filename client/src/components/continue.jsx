import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import PrintButton from './print';
import { useNavigate } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faArrowCircleRight,
  faArrowCircleLeft,
  faTrash,
  faEye,
  faPencil
} from '@fortawesome/free-solid-svg-icons';

const VistaTareas = () => {
  const API_URL = 'http://localhost:4000/tasks-all';
  const [datosGenerales, setDatosGenerales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtro, setFiltro] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  const navigate = useNavigate();
  const tasksPerPage = 2;
  const pagesVisited = pageNumber * tasksPerPage;

  useEffect(() => {
    const obtenerDatosGenerales = async () => {
      try {
        const response = await axios.get(API_URL);
        setDatosGenerales(response.data);
      } catch (error) {
        setError('No se encontraron registros');
      } finally {
        setLoading(false);
      }
    };

    obtenerDatosGenerales();
  }, [API_URL]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!datosGenerales || datosGenerales.length === 0) {
    return <p>No hay datos generales disponibles.</p>;
  }

  const handleChangePage = ({ selected }) => {
    setPageNumber(selected);
  };


  // Filtrar los datos basados en el filtro de búsqueda
  const datosFiltrados = datosGenerales.filter((dato) =>
    dato.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
    dato.apellido_paterno.toLowerCase().includes(filtro.toLowerCase()) ||
    dato.apellido_materno.toLowerCase().includes(filtro.toLowerCase()) ||
    dato.fecha_nacimiento.toLowerCase().includes(filtro.toLowerCase()) ||
    dato.direccion.toLowerCase().includes(filtro.toLowerCase()) ||
    dato.correo.toLowerCase().includes(filtro.toLowerCase())
  );

  const pageCount = Math.ceil(datosFiltrados.length / tasksPerPage);
  const handleDelete = (id, nombre) => {
    swal({
      title: `¿Estás seguro de eliminar el CV de ${nombre}?`,
      text: "¡Los archivos eliminados ya no se pueden recuperar!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("¡Curriculum eliminado correctamente!", {
          icon: "success",
        }).then(() => {
          navigate(`/curriculum/${id}/delete`);
        });
      } else {
        swal("Cancelación eliminada", {
          icon: "warning",
        });
      }
    });
  };


  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='container'>

        <h1 className="text-3xl font-bold mb-4 text-center my-5">Continuar registro</h1>
        <div className="overflow-x-auto">
          <input
            type="text"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            placeholder="Buscar..."
            className="p-2 m-2 border border-gray-400 rounded-lg"
          />
          <table className="table-auto w-full border-collapse border border-gray-800 rounded-lg mt-5">
            <thead className='bg-purple-600 text-white'>
              <tr>
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">Apellido Paterno</th>
                <th className="px-4 py-2">Apellido Materno</th>
                <th className="px-4 py-2">Fecha de Nacimiento</th>
                <th className="px-4 py-2">Dirección</th>
                <th className="px-4 py-2">Correo</th>
                <th className="px-4 py-2">Teléfono</th>
                <th className="px-4 py-2">Curriculum</th>
                <th className="px-4 py-2">Modificar CV</th>
              </tr>
            </thead>
            <tbody>
              {datosFiltrados.slice(pagesVisited, pagesVisited + tasksPerPage).map((dato) => (
                <tr key={dato.ID_datos_generales} className="bg-gray-100">
                  <td className="border px-4 py-2">{dato.nombre}</td>
                  <td className="border px-4 py-2">{dato.apellido_paterno}</td>
                  <td className="border px-4 py-2">{dato.apellido_materno}</td>
                  <td className="border px-4 py-2">{dato.fecha_nacimiento}</td>
                  <td className="border px-4 py-2">{dato.direccion}</td>
                  <td className="border px-4 py-2">{dato.correo}</td>
                  <td className="border px-4 py-2">{dato.telefono}</td>
                  <td className="px-4 py-2 text-center">
                    {/* <Button className="bg-red-500  hover:bg-red-700  p-2 m-2 rounded-lg text-white" onClick={() => navigate(`/curriculum/${dato.ID_datos_generales}/delete`)}> */}
                    <Button
                      className="bg-red-600 hover:bg-amber-500 p-3 m-2 rounded-lg text-white"
                      onClick={() => handleDelete(dato.ID_datos_generales, dato.nombre)}
                    >
                      <FontAwesomeIcon className='text-lg font-bold text-zinc-100' icon={faTrash} />
                    </Button>
                    <Button className="bg-teal-600  hover:bg-teal-700 p-3 m-2 rounded-lg text-white" onClick={() => navigate(`/curriculum/${dato.ID_datos_generales}/ver`)}>
                      <FontAwesomeIcon className='text-lg font-bold text-zinc-100' icon={faEye} />
                    </Button>
                  </td>
                  <td className="px-4 py-2">
                    <Button className="bg-purple-600 hover:bg-purple-400 p-3 m-2 rounded-lg text-white" onClick={() => navigate(`/curriculum/${dato.ID_datos_generales}/update`)}>
                      <FontAwesomeIcon className='text-lg font-bold text-zinc-100' icon={faPencil} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination mt-4 flex px-12">
            <ReactPaginate
              previousLabel={<FontAwesomeIcon className='text-2xl font-bold text-purple-800' icon={faArrowCircleLeft} />}
              nextLabel={<FontAwesomeIcon className='text-2xl font-bold text-purple-800' icon={faArrowCircleRight} />}
              pageCount={pageCount}
              onPageChange={handleChangePage}
              containerClassName={"pagination mt-12"}
              previousLinkClassName={"pagination__link"}
              nextLinkClassName={"pagination__link"}
              disabledClassName={"pagination__link--disabled"}
              activeClassName={"pagination__link--active"}
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default VistaTareas;
