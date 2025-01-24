import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserListPacientView from '../views/UserListPacientView.vue'
import BillingLaboratoriesListView from '../views/BillingLaboratories/BillingLaboratoriesListView.vue'


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
    path: '/laboratorio/facturacion',
    name: 'facturacion',
    component: BillingLaboratoriesListView
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
