import { pool } from "../db.js";

export const getDatosLaboral = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM experiencia_laboral WHERE FK_datos_generales = ?", [
      req.params.id,
    ]);

    if (result.length === 0)
      return res.status(404).json({ message: "Task not found" });

    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createLaboral = async (req, res) => {
  try {
    // Extraer el título y la descripción del cuerpo de la solicitud (request body)
    const { compania, cargo, ubi_empresa,tel_empresa, jefe_directo, fecha_inicio, fecha_termino, FK_datos_generales } = req.body;

    // Realizar una inserción en la base de datos utilizando parámetros preparados
    const [result] = await pool.query(
      "INSERT INTO experiencia_laboral(compania, cargo, ubi_empresa,tel_empresa, jefe_directo, fecha_inicio, fecha_termino, FK_datos_generales) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [compania, cargo, ubi_empresa,tel_empresa, jefe_directo, fecha_inicio, fecha_termino, FK_datos_generales]
    );

    // Responder con un objeto JSON que contiene la información de la tarea creada
    res.json({
      id: result.insertId,  // El ID generado durante la inserción en la base de datos
      compania, 
      cargo, 
      ubi_empresa,
      tel_empresa, 
      jefe_directo, 
      fecha_inicio, 
      fecha_termino, 
      FK_datos_generales
    });
  } catch (error) {
    // Manejar errores y responder con un código de estado 500 (Error interno del servidor)
    return res.status(500).json({ message: error.message });
  }
};

export const updateDatosLaboral = async (req, res) => {
  try {
    const result = await pool.query("UPDATE experiencia_laboral SET ? WHERE ID_experiencia_laboral = ?", [
      req.body,
      req.params.id,
    ]);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteDatosLaboral = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM experiencia_laboral WHERE ID_experiencia_laboral = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Task not found" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
