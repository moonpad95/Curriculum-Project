import { pool } from "../db.js";

export const getDatosGenerales = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM datos_generales WHERE ID_datos_generales = ?", [
      req.params.id,
    ]);

    if (result.length === 0)
      return res.status(404).json({ message: "Task not found" });

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const getDatos = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM datos_generales;")
    
    if (result.length === 0)
      return res.status(404).json({ message: "No existen registros" });

    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUltimoDato = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM datos_generales ORDER BY ID_datos_generales DESC LIMIT 1;");
    
    if (result.length === 0)
      return res.status(404).json({ message: "No existen registros" });

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const createGeneral = async (req, res) => {
  try {
    // Extraer el título y la descripción del cuerpo de la solicitud (request body)
    const { nombre, apellido_paterno, apellido_materno, fecha_nacimiento, direccion, correo, telefono, ruta_image, name_image, url_webpage } = req.body;

    // Realizar una inserción en la base de datos utilizando parámetros preparados
    const [result] = await pool.query(
      "INSERT INTO datos_generales(nombre, apellido_paterno, apellido_materno, fecha_nacimiento, direccion, correo, telefono, ruta_image, name_image, url_webpage) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [nombre, apellido_paterno, apellido_materno, fecha_nacimiento, direccion, correo, telefono, ruta_image, name_image, url_webpage]
    );

    // Responder con un objeto JSON que contiene la información de la tarea creada
    res.json({
      id: result.insertId,  // El ID generado durante la inserción en la base de datos
      nombre, 
      apellido_paterno, 
      apellido_materno, 
      fecha_nacimiento, 
      direccion, 
      correo, 
      telefono, 
      ruta_image, 
      name_image,
      url_webpage         // La descripción de la tarea
    });
  } catch (error) {
    // Manejar errores y responder con un código de estado 500 (Error interno del servidor)
    return res.status(500).json({ message: error.message });
  }
};

export const updateDatosGeneral = async (req, res) => {
  try {
    const result = await pool.query("UPDATE datos_generales SET ? WHERE ID_datos_generales = ?", [
      req.body,
      req.params.id,
    ]);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteDatosGeneral = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM datos_generales WHERE ID_datos_generales = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Task not found" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
