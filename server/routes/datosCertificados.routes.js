import { Router } from "express";
import {
  getDatosCertificados,
  createCertificados, //Funcion para agregar datos a la tabla de informacion general
  deleteDatosCertificados,
  updateDatosCertificados,
} from "../controllers/datosCertificados.controllers.js";

const router = Router();

router.get("/cert/:id", getDatosCertificados);

router.post("/cert", createCertificados);

router.put("/cert/:id", updateDatosCertificados);

router.delete("/cert/:id", deleteDatosCertificados);

export default router;
