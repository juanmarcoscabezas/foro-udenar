import { barraNavegacion } from "../componentes/barras/barraNavegacion.js";
import { barraLateral } from "../componentes/barras/barraLateral.js";
import { barraInferior } from "../componentes/barras/barraInferior.js";
import { entradas } from "../componentes/entradas/entradas.js";
import { entradasTabla } from "../componentes/entradas/entradasTabla.js";
import { publicaciones } from "../componentes/publicaciones/publicaciones.js";
import { adminLogin } from "../componentes/admin/adminLogin.js";
import { adminPublicaciones } from "../componentes/admin/adminPublicaciones.js";
import { encuestasTabla } from "../componentes/encuestas/encuestasTabla.js";
import { encuestas } from "../componentes/encuestas/encuestas.js";
import { notFound } from "../componentes/notFound.js";
import { ayuda } from "../componentes/ayuda/ayuda.js";

const routes = [
    { path: '/', component: publicaciones },
    { path: '/inicio', component: publicaciones },
    { path: '/entradas', component: entradasTabla },
    { path: '/entradas/:id', component: entradas, props: true },
    { path: '/encuestas', component: encuestasTabla },
    { path: '/encuestas/:id', component: encuestas, props: true },
    { path: '/admin', component: adminLogin },
    { path: '/admin-publicaciones', component: adminPublicaciones },
    { path: '/ayuda', component: ayuda },
    { path: '*', component: notFound }
];

const router = new VueRouter({
    routes
});


export { router };