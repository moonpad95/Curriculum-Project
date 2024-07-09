import { Router } from "express";
import {
    getDatosProyectos,
    createProyectos, //Funcion para agregar datos a la tabla de informacion general
    deleteDatosProyectos,
    updateDatosProyectos,
} from "../controllers/datosProyectos.controllers.js";

const router = Router();

router.get("/proyectos/:id", getDatosProyectos);

router.post("/proyectos", createProyectos);

router.put("/proyectos/:id", updateDatosProyectos);

router.delete("/proyectos/:id", deleteDatosProyectos);

export default router;
