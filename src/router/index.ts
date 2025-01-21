import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserListPacientView from '../views/UserListPacientView.vue'
import PacientListView from '../views/patient/PatientListView.vue'
import AddPatientView from '../views/patient/AddPatientView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/usuarios/pacientes',
    name: 'pacientes',
    component: UserListPacientView
  },
  {
    path: '/usuarios/pacientes/lista',
    name: 'patientList',
    component: PacientListView
  },
  {
    path: '/usuarios/pacientes/agregar-paciente',
    name: 'addPatient',
    component: AddPatientView
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
