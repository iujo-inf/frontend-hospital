import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/home/HomeView.vue'
import UserListPacientView from '../views/users/UserListPacientView.vue'
import UserListSupplierView from '../views/users/UserListSupplierView.vue'
import PharmacyInventoryView from '../views/pharmacy/PharmacyInventoryView.vue'
import BillingView from '../views/pharmacy/BillingView.vue'
import SalesListView from '../views/Sales/SaleslistView.vue'
import BuyListView from '../views/buy/BuyListView.vue'
import BuyListViewRequest from '../views/BuyRequest/BuyRequestListView.vue'
import AppointmentsListView from '../views/appointments/appointmentsListView.vue'
import BillingAppointmentsListView from '../views/BillingAppointments/BillingAppointmentsListView.vue'
import BillingEmergenciesListView from '../views/BillingEmergencies/BillingEmergenciesListView.vue'
import BillingLaboratoriesListView from '../views/BillingLaboratories/BillingLaboratoriesListView.vue'
import EmergencyListView from '@/views/emergency/EmergencyListView.vue'
import FinanceView from '@/views/finance/FinanceView.vue'
import StoreProductsListView from '@/views/storeProducts/StoreProductsListView.vue'
import doctorView from '@/views/doctors/doctorview.vue'
import homeScreenView from '@/views/homeScreen/homeScreenView.vue'
import UserListClientView from '../views/users/UserListClientView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    component: homeScreenView
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true }
  },
  {
    path: '/usuarios/pacientes',
    name: 'pacientes',
    component: UserListPacientView,
    meta: { requiresAuth: true }
  },
  {
    path: '/usuarios/doctor',
    name: 'doctor',
    component: doctorView
  },
  {
    path: '/laboratorio/facturacion',
    name: 'facturacion-laboratorio',
    component: BillingLaboratoriesListView
  },
  {
    path: '/citas/facturacion',
    name: 'facturacion-citas',
    component: BillingAppointmentsListView
  },
  {
    path: '/usuarios/proveedores',
    name: 'proveedores',
    component: UserListSupplierView,
    meta: { requiresAuth: true }
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
    path: '/emergencia/listado',
    name: 'listado-emergencia',
    component: EmergencyListView
  },
  {
    path: '/emergencia/facturacion',
    name: 'facturacion-emergencia',
    component: BillingEmergenciesListView
  },
  {
    path: '/almacen/productos',
    name: 'productos',
    component: StoreProductsListView
  },
  {
    path: '/ventas',
    name: 'ventas',
    component: SalesListView
  },
  {
    path: '/compras/solicitar-compra',
    name: 'solicitar-compras',
    component: BuyListView
  },
  {
    path: '/compras/solicitudes-de-compras',
    name: 'solicitudes-de-compras',
    component: BuyListViewRequest
  },
  {
    path: '/cita',
    name: 'cita',
    component: AppointmentsListView
  },
  {
    path: '/finanzas/resumen',
    name: 'finanzas',
    component: FinanceView
  },
  {
    path: '/usuarios/clientes',
    name: 'clientes',
    component: UserListClientView,
    meta: { requiresAuth: true }
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

// Agregar guard de navegación
router.beforeEach((to, from, next) => {
  // Verificar si la ruta requiere autenticación
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Verificar si existe la sesión
    if (!sessionStorage.getItem('user_id')) {
      // No hay sesión, redirigir al login
      next({
        path: '/',
        query: { redirect: to.fullPath }  // Guardar la ruta a la que intentaba ir
      })
    } else {
      // Hay sesión, permitir la navegación
      next()
    }
  } else {
    // Ruta pública, permitir la navegación
    next()
  }
})

export default router