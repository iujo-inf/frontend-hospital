import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import EmergencyListView from '../views/EmergencyListView.vue';

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
  
  // Puedes agregar más rutas aquí si es necesario
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;

