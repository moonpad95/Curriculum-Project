import { Router } from "express";
import {
    getDatosRedes,
    createRedes, //Funcion para agregar datos a la tabla de informacion general
    deleteDatosRedes,
    updateDatosRedes,
} from "../controllers/datosRedes.controllers.js";

const router = Router();

router.get("/redes/:id", getDatosRedes);

router.post("/redes", createRedes);

router.put("/redes/:id", updateDatosRedes);

router.delete("/redes/:id", deleteDatosRedes);

export default router;
