import { pool } from "../db.js";

export const getDatosProyectos = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM proyectos WHERE FK_datos_generales = ?", [
      req.params.id,
    ]);

    if (result.length === 0)
      return res.status(404).json({ message: "Task not found" });

    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createProyectos = async (req, res) => {
  try {
    // Extraer el título y la descripción del cuerpo de la solicitud (request body)
    const { nombre_proyecto, descripcion, estado, FK_datos_generales } = req.body;

    // Realizar una inserción en la base de datos utilizando parámetros preparados
    const [result] = await pool.query(
      "INSERT INTO proyectos(nombre_proyecto, descripcion, estado, FK_datos_generales) VALUES (?, ?, ?, ?)",
      [nombre_proyecto, descripcion, estado, FK_datos_generales]
    );

    // Responder con un objeto JSON que contiene la información de la tarea creada
    res.json({
      id: result.insertId,  // El ID generado durante la inserción en la base de datos
      nombre_proyecto, 
      descripcion, 
      estado, 
      descripcion,
      estado,
      FK_datos_generales
    });
  } catch (error) {
    // Manejar errores y responder con un código de estado 500 (Error interno del servidor)
    return res.status(500).json({ message: error.message });
  }
};

export const updateDatosProyectos = async (req, res) => {
  try {
    const result = await pool.query("UPDATE proyectos SET ? WHERE ID_proyectos = ?", [
      req.body,
      req.params.id,
    ]);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteDatosProyectos = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM proyectos WHERE ID_proyectos = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Task not found" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
