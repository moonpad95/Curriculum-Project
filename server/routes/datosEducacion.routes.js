import { Router } from "express";
import {
  getDatosEducacion,
  createEducacion, //Funcion para agregar datos a la tabla de informacion general
  deleteDatosEducacion,
  updateDatosEducacion,
} from "../controllers/datosEducacion.controller.js";

const router = Router();

router.get("/edu/:id", getDatosEducacion);

router.post("/edu", createEducacion);

router.put("/edu/:id", updateDatosEducacion);

router.delete("/edu/:id", deleteDatosEducacion);

export default router;
