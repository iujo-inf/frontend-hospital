import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/home/HomeView.vue'
import UserListPacientView from '../views/users/UserListPacientView.vue'
import UserListSupplierView from '../views/users/UserListSupplierView.vue'
import PharmacyInventoryView from '../views/pharmacy/PharmacyInventoryView.vue'
import BillingView from '../views/pharmacy/BillingView.vue'
import SalesListView from '../views/Sales/SaleslistView.vue'
import BuyListView from '../views/buy/BuyListView.vue'
import AppointmentsListView from '../views/appointments/appointmentsListView.vue'
import BillingAppointmentsListView from '../views/BillingAppointments/BillingAppointmentsListView.vue'
import BillingEmergenciesListView from '../views/BillingEmergencies/BillingEmergenciesListView.vue'

const routes: Array<RouteRecordRaw> = [
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
    path: '/citas/facturacion',
    name: 'facturacion-citas',
    component: BillingAppointmentsListView
  },
  {
    path: '/usuarios/proveedores',
    name: 'proveedores',
    component: UserListSupplierView
  },
  {
    path: '/farmacia/inventario',
    name: 'inventario',
    component: PharmacyInventoryView
  },
  {
    path: '/farmacia/facturacion',
    name: 'facturacion-farmacia',
    component: BillingView
  },
  {
    path: '/emergencia/facturacion',
    name: 'facturacion-emergencia',
    component: BillingEmergenciesListView
  },
  
  {
    path: '/ventas',
    name: 'ventas',
    component: SalesListView
  },
  {
    path: '/compras',
    name: 'compras',
    component: BuyListView
  },
  {
    path: '/cita',
    name: 'cita',
    component: AppointmentsListView
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