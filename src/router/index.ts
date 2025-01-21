import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import EmergencyListView from '../views/EmergencyListView.vue';
import FormEmergency from '../views/FormEmergency.vue'; // Importa la vista del formulario

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/emergencias',
    name: 'emergencias',
    component: EmergencyListView
  },
  {
    path: '/agregar-emergencia',
    name: 'agregar-emergencia',
    component: FormEmergency // Ruta para el formulario de agregar emergencia
  }
  // Puedes agregar más rutas aquí si es necesario
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;

