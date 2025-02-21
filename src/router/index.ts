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
import UserListPatientView from '../views/users/UserListPatientView.vue'
import ReportsView from '@/views/ReportsView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    component: homeScreenView,
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true }
  },
  {
    path: '/usuarios/pacientes',
    name: 'UserListPatient',
    component: UserListPatientView,
    meta: { requiresAuth: true }
  },
  {
    path: '/usuarios/doctor',
    name: 'doctor',
    component: doctorView,
    meta: { requiresAuth: true }
  },
  {
    path: '/laboratorio/facturacion',
    name: 'facturacion-laboratorio',
    component: BillingLaboratoriesListView,
    meta: { requiresAuth: true }
  },
  {
    path: '/citas/facturacion',
    name: 'facturacion-citas',
    component: BillingAppointmentsListView,
    meta: { requiresAuth: true }
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
    component: PharmacyInventoryView,
    meta: { requiresAuth: true }
  },
  {
    path: '/farmacia/facturacion',
    name: 'facturacion-farmacia',
    component: BillingView,
    meta: { requiresAuth: true }
  },
  {
    path: '/emergencia/listado',
    name: 'listado-emergencia',
    component: EmergencyListView,
    meta: { requiresAuth: true }
  },
  {
    path: '/emergencia/facturacion',
    name: 'facturacion-emergencia',
    component: BillingEmergenciesListView,
    meta: { requiresAuth: true }
  },
  {
    path: '/almacen/productos',
    name: 'productos',
    component: StoreProductsListView,
    meta: { requiresAuth: true }
  },
  {
    path: '/ventas',
    name: 'ventas',
    component: SalesListView,
    meta: { 
      requiresAuth: true,
      title: 'Ventas'
    }
  },
  {
    path: '/compras/solicitar-compra',
    name: 'solicitar-compras',
    component: BuyListView,
    meta: { requiresAuth: true }
  },
  {
    path: '/compras/solicitudes-de-compras',
    name: 'solicitudes-de-compras',
    component: BuyListViewRequest,
    meta: { requiresAuth: true }
  },
  {
    path: '/cita',
    name: 'cita',
    component: AppointmentsListView,
    meta: { requiresAuth: true }
  },
  {
    path: '/finanzas/resumen',
    name: 'finanzas',
    component: FinanceView,
    meta: { requiresAuth: true }
  },
  {
    path: '/reportes',
    name: 'reportes',
    component: ReportsView,
    meta: { 
      requiresAuth: true,
      title: 'Reportes',
    }
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