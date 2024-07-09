import { Router } from "express";
import { createLaboral, deleteDatosLaboral, getDatosLaboral, updateDatosLaboral } from "../controllers/datosLaboral.controllers.js";

const router = Router();

router.get("/experiencia/:id", getDatosLaboral);

router.post("/experiencia", createLaboral);

router.put("/experiencia/:id", updateDatosLaboral);

router.delete("/experiencia/:id", deleteDatosLaboral);

export default router;
