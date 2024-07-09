import { pool } from "../db.js";

export const getDatosHabilidad = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM habilidades WHERE FK_datos_generales = ?", [
      req.params.id,
    ]);

    if (result.length === 0)
      return res.status(404).json({ message: "Sin datos" });

    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const getDatosHabilidad2 = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM habilidades WHERE ID_habilidad = ?", [
      req.params.id,
    ]);

    if (result.length === 0)
      return res.status(404).json({ message: "Sin datos" });

    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createHabilidad = async (req, res) => {
  try {
    // Extraer el título y la descripción del cuerpo de la solicitud (request body)
    const { habilidad, descripcion, FK_datos_generales } = req.body;

    // Realizar una inserción en la base de datos utilizando parámetros preparados
    const [result] = await pool.query(
      "INSERT INTO habilidades(habilidad, descripcion, FK_datos_generales) VALUES (?, ?, ?)",
      [habilidad, descripcion, FK_datos_generales]
    );

    // Responder con un objeto JSON que contiene la información de la tarea creada
    res.json({
      id: result.insertId,  // El ID generado durante la inserción en la base de datos
      habilidad, 
      descripcion,
      FK_datos_generales
    });
  } catch (error) {
    // Manejar errores y responder con un código de estado 500 (Error interno del servidor)
    return res.status(500).json({ message: error.message });
  }
};

export const updateDatosHabilidad = async (req, res) => {
  try {
    const result = await pool.query("UPDATE habilidades SET ? WHERE ID_habilidad = ?", [
      req.body,
      req.params.id,
    ]);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteDatosHabilidad = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM habilidades WHERE ID_habilidad = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Task not found" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
