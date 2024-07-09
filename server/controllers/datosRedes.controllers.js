import { pool } from "../db.js";

export const getDatosRedes = async (req, res) => {
  try {

    const [result] = await pool.query("SELECT * FROM redes_sociales WHERE FK_datos_generales = ?", [
      req.params.id,
    ]);

    if (result.length === 0)
      return res.status(404).json({ message: "Task not found" });

    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createRedes = async (req, res) => {
  try {
    // Extraer el título y la descripción del cuerpo de la solicitud (request body)
    const { nombre_red_social, link_red, FK_datos_generales } = req.body;

    // Realizar una inserción en la base de datos utilizando parámetros preparados
    const [result] = await pool.query(
      "INSERT INTO redes_sociales(nombre_red_social, link_red, FK_datos_generales) VALUES (?, ?, ?)",
      [nombre_red_social, link_red, FK_datos_generales]
    );

    // Responder con un objeto JSON que contiene la información de la tarea creada
    res.json({
      id: result.insertId,  // El ID generado durante la inserción en la base de datos
      nombre_red_social, 
      link_red, 
      FK_datos_generales
    });
  } catch (error) {
    // Manejar errores y responder con un código de estado 500 (Error interno del servidor)
    return res.status(500).json({ message: error.message });
  }
};

export const updateDatosRedes = async (req, res) => {
  try {
    const result = await pool.query("UPDATE redes_sociales SET ? WHERE ID_redes_sociales = ?", [
      req.body,
      req.params.id,
    ]);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteDatosRedes = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM redes_sociales WHERE ID_redes_sociales = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Task not found" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
