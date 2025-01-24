import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import LabAnalysisListView from '../views/LabAnalysisListView.vue'; // Vista de la lista de análisis
import FormLabAnalysisRequest from '../views/FormLabAnalysisRequest.vue'; // Vista del formulario de solicitud
import UserListPacientView from '../views/UserListPacientView.vue'
import BillingView from '../views/billingView.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/laboratorio', // Ruta para la lista de análisis
    name: 'laboratorio',
    component: LabAnalysisListView
  },
  {
    path: '/agregar-solicitud-analisis', // Ruta para el formulario de agregar solicitud
    name: 'agregar-solicitud-analisis',
    component: FormLabAnalysisRequest
  },
    {
    path: '/laboratori',
    name: 'lsboratorio',
    component: LabAnalysisListView
  },
  {
    path: '/agregar-analisis',
    name: 'agregar-analisis',
    component: FormLabAnalysisRequest// Ruta para el formulario de agregar analisis
  }

  {
    path: '/usuarios/pacientes',
    name: 'pacientes',
    component: UserListPacientView
  },
  {
    path: '/facturacion/resumen',
    name: 'facturacion',
    component: BillingView 
  }  
  // Puedes agregar más rutas aquí si es necesario, como rutas para editar análisis, etc.
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
