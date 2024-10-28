import Agregar from "../components/Agregar.vue";
import Actividades from "../components/Actividades.vue";
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  { path: "/", redirect: "/Actividades" }, // Redirige al path raíz
  { path: "/Actividades", component: Actividades, name: "Actividades" },
  { path: "/Agregar", component: Agregar, name: "Agregar" },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
