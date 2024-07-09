import { pool } from "../db.js";

export const getDatosCertificados = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM certificados WHERE FK_datos_generales = ?", [
      req.params.id,
    ]);

    if (result.length === 0)
      return res.status(404).json({ message: "Task not found" });

    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createCertificados = async (req, res) => {
  try {
    // Extraer el título y la descripción del cuerpo de la solicitud (request body)
    const { titulo, descripcion, fecha, certificadora, vigencia,  FK_datos_generales } = req.body;

    // Realizar una inserción en la base de datos utilizando parámetros preparados
    const [result] = await pool.query(
      "INSERT INTO certificados(titulo, descripcion, fecha, certificadora, vigencia, FK_datos_generales) VALUES (?, ?, ?, ?, ?, ?)",
      [titulo, descripcion, fecha, certificadora, vigencia, FK_datos_generales]
    );

    // Responder con un objeto JSON que contiene la información de la tarea creada
    res.json({
      id: result.insertId,  // El ID generado durante la inserción en la base de datos
      titulo, 
      descripcion, 
      fecha,
      certificadora, 
      vigencia,
      FK_datos_generales
    });
  } catch (error) {
    // Manejar errores y responder con un código de estado 500 (Error interno del servidor)
    return res.status(500).json({ message: error.message });
  }
};

export const updateDatosCertificados = async (req, res) => {
  try {
    const result = await pool.query("UPDATE certificados SET ? WHERE ID_certificados = ?", [
      req.body,
      req.params.id,
    ]);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteDatosCertificados = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM certificados WHERE ID_certificados = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Task not found" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
