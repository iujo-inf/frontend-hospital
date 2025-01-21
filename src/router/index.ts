import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserListPacientView from '../views/UserListPacientView.vue'
import UserListSupplierView from '../views/UserListSupplierView.vue'
import FormSupplier from '../components/utils/user/supplier/FormSupplier.vue'

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
    path: '/usuarios/proveedores',
    name: 'proveedores',
    component: UserListSupplierView
  },
  {
    path: '/editSupplier/:id/:isEditing',
    name: 'editSupplier',
    component: FormSupplier,
    props: (route: any) => ({ id: route.params.id, isEditing: route.params.isEditing })
  }
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
