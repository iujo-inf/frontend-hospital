import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserListPacientView from '../views/UserListPacientView.vue'
import PharmacyInventoryView from '../views/PharmacyInventoryView.vue'
import BillingView from '../views/BillingView.vue'
import SalesListView from '../views/Sales/SaleslistView.vue' // Mantenido
import BuyListView from '../views/buy/BuyListView.vue' // Mantenido

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
    path: '/farmacia/inventario',
    name: 'inventario',
    component: PharmacyInventoryView
  },
  {
    path: '/farmacia/facturacion',
    name: 'facturacion',
    component: BillingView
  },

    path: '/ventas',
    name: 'ventas',
    component: SalesListView // Mantenido
  },
  {
    path: '/compras',
    name: 'compras',
    component: BuyListView // Mantenido
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