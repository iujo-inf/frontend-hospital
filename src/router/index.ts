import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserListPacientView from '../views/UserListPacientView.vue'
import UserListSupplierView from '../views/UserListSupplierView.vue'
import PharmacyInventoryView from '../views/pharmacy/PharmacyInventoryView.vue'
import BillingView from '../views/pharmacy/BillingView.vue'
import SalesListView from '../views/Sales/SaleslistView.vue'
import BuyListView from '../views/buy/BuyListView.vue'

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
    name: 'facturacion',
    component: BillingView
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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router 