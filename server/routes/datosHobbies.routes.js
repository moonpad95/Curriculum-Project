import { Router } from "express";
import {
    getDatosHobbies,
    createHobbies, //Funcion para agregar datos a la tabla de informacion general
    deleteDatosHobbies,
    updateDatosHobbies,
} from "../controllers/datosHobbies.controllers.js";

const router = Router();

router.get("/hob/:id", getDatosHobbies);

router.post("/hob", createHobbies);

router.put("/hob/:id", updateDatosHobbies);

router.delete("/hob/:id", deleteDatosHobbies);

export default router;
