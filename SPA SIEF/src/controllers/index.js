import Home from './home.controller.js';
import Post from './post.controller.js';
import Inicio from './inicio.controller.js'
import notFound from './404.controller.js';
import NuevaInfoEstadistica from './nuevaInfoEstadistica.js';
import InformacionEstadistica from './informacionEstadisticaController.js';
import registrarUsuariosController from './registrarUsuariosController.js';
import auditoriasController from './auditoriasController.js';


const pages = {
    home : Home,
    post : Post,
    isNotFound : notFound,
    inicio: Inicio,
    infoEstadistica: NuevaInfoEstadistica,
    informacionEstadisttcia : InformacionEstadistica,
    registrarUsuarios : registrarUsuariosController,
    auditorias : auditoriasController

}

export {pages}