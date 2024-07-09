import { Router } from "express";
import { createHabilidad, deleteDatosHabilidad, getDatosHabilidad, updateDatosHabilidad, getDatosHabilidad2 } from "../controllers/datosHabilidades.controllers.js";

const router = Router();

router.get("/habilidades/:id", getDatosHabilidad);

router.get("/habilidades-put/:id", getDatosHabilidad2);

router.post("/habilidades", createHabilidad);

router.put("/habilidades/:id", updateDatosHabilidad);

router.delete("/habilidades/:id", deleteDatosHabilidad);

export default router;
