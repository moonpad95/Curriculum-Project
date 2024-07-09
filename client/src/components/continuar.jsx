import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const VistaContinua = () => {
  const API_URL = 'http://localhost:4000/tasks-last';
  const [datosGenerales, setDatosGenerales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerDatosGenerales = async () => {
      try {
        const response = await axios.get(API_URL);
        setDatosGenerales(response.data);
      } catch (error) {
        setError('Error al obtener los datos generales: ' + error.message);
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

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 text-center my-5">Continuar registro</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-800">
        <thead className='bg-purple-600 text-white'>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Apellido Paterno</th>
              <th className="px-4 py-2">Apellido Materno</th>
              <th className="px-4 py-2">Fecha de Nacimiento</th>
              <th className="px-4 py-2">Dirección</th>
              <th className="px-4 py-2">Correo</th>
              <th className="px-4 py-2">Teléfono</th>
              <th className="px-4 py-2">Acciones</th>
              {/* Agregar más encabezados aquí según las columnas de tu tabla */}
            </tr>
          </thead>
          <tbody>
            {datosGenerales.map((dato) => (
              <tr key={dato.ID_datos_generales} className="bg-gray-100">
                <td className="border px-4 py-2">{dato.ID_datos_generales}</td>
                <td className="border px-4 py-2">{dato.nombre}</td>
                <td className="border px-4 py-2">{dato.apellido_paterno}</td>
                <td className="border px-4 py-2">{dato.apellido_materno}</td>
                <td className="border px-4 py-2">{dato.fecha_nacimiento}</td>
                <td className="border px-4 py-2">{dato.direccion}</td>
                <td className="border px-4 py-2">{dato.correo}</td>
                <td className="border px-4 py-2">{dato.telefono}</td>
                <td className="px-4 py-2">
                  <Button className="btn btn-sm btn-success" onClick={() => navigate(`${dato.ID_datos_generales}/escolaridad`)}>
                    Continuar
                  </Button>
                </td>
                {/* Agregar más celdas aquí según las columnas de tu tabla */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VistaContinua;
