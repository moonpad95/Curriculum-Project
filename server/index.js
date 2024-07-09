import express from "express";
import cors from "cors";
import {dirname, join} from 'path'
import {fileURLToPath} from 'url'
import { PORT } from "./config.js";


import indexRoutes from "./routes/index.routes.js";
import taskRoutes from "./routes/datosGenerales.routes.js"; //Datos generales
import educacionRoutes from "./routes/datosEducacion.routes.js"
import certificadosRoutes from "./routes/datosCertificados.routes.js"
import laboralRoutes from "./routes/datosLaboral.routes.js"
import habilidadesRoutes from "./routes/datosHabilidades.routes.js"
import hobbiesRoutes from "./routes/datosHobbies.routes.js"
import proyectosRoutes from "./routes/datosProyectos.routes.js"
import redesRoutes from "./routes/datosRedes.routes.js"
import idiomasRoutes from "./routes/datosIdiomas.routes.js"


const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
console.log(__dirname)

app.use(cors());
app.use(express.json());
app.use(redesRoutes)
app.use(idiomasRoutes)
app.use(indexRoutes);
app.use(taskRoutes);
app.use(educacionRoutes);
app.use(proyectosRoutes)
app.use(certificadosRoutes);
app.use(laboralRoutes);
app.use(habilidadesRoutes);
app.use(hobbiesRoutes);
app.use(idiomasRoutes);
app.use(proyectosRoutes);
app.use(redesRoutes);

app.use(express.static(join(__dirname, '../client/dist')))

app.listen(PORT);
console.log(`Server is listening on port ${PORT}`);
