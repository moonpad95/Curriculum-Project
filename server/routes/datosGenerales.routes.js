import { Router } from "express";
import {
  getDatosGenerales,
  getDatos,
  createGeneral, //Funcion para agregar datos a la tabla de informacion general
  deleteDatosGeneral,
  updateDatosGeneral,
  getUltimoDato,
  loginUser,
} from "../controllers/datosGenerales.controllers.js";


const router = Router();
router.get("/tasks-all", getDatos);

router.get("/tasks-last", getUltimoDato);

router.get("/tasks/:id", getDatosGenerales);

router.post("/tasks", createGeneral);

router.put("/tasks/:id", updateDatosGeneral);

router.delete("/tasks/:id", deleteDatosGeneral);

router.post("/login-in/", loginUser)

export default router;
