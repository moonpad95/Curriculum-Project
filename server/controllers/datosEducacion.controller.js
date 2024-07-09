import { pool } from "../db.js";

export const getDatosEducacion = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM educacion WHERE FK_datos_generales = ?", [
      req.params.id,
    ]);

    if (result.length === 0)
      return res.status(404).json({ message: "Task not found" });

    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createEducacion = async (req, res) => {
  try {
    // Extraer el título y la descripción del cuerpo de la solicitud (request body)
    const {certificado, fecha_inicio, fecha_graduacion, ubicacion_inst, FK_datos_generales } = req.body;

    // Realizar una inserción en la base de datos utilizando parámetros preparados
    const [result] = await pool.query(
      "INSERT INTO educacion(certificado, fecha_inicio, fecha_graduacion, ubicacion_inst, FK_datos_generales) VALUES (?, ?, ?, ?, ?)",
      [certificado, fecha_inicio, fecha_graduacion, ubicacion_inst, FK_datos_generales]
    );

    // Responder con un objeto JSON que contiene la información de la tarea creada
    res.json({
      id: result.insertId,  // El ID generado durante la inserción en la base de datos
      certificado, 
      fecha_inicio, 
      fecha_graduacion, 
      ubicacion_inst, 
      FK_datos_generales         // La descripción de la tarea
    });
  } catch (error) {
    // Manejar errores y responder con un código de estado 500 (Error interno del servidor)
    return res.status(500).json({ message: error.message });
  }
};

export const updateDatosEducacion = async (req, res) => {
  try {
    const result = await pool.query("UPDATE educacion SET ? WHERE ID_educacion = ?", [
      req.body,
      req.params.id,
    ]);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteDatosEducacion = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM educacion WHERE ID_educacion = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Task not found" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
