import { Router } from "express";
import { createIdiomas, deleteDatosIdiomas, getDatosIdiomas, updateDatosIdiomas } from "../controllers/datosIdiomas.controller.js";

const router = Router();

router.get("/idiomas/:id", getDatosIdiomas);

router.post("/idiomas", createIdiomas);

router.put("/idiomas/:id", updateDatosIdiomas);

router.delete("/idiomas/:id", deleteDatosIdiomas);

export default router;
