import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginRegisterView from '../views/LoginRegisterView.vue'
import ProfileView from '../views/ProfileView.vue'
import ProductsView from '../views/ProductsView.vue'
import ContactView from '../views/ContactView.vue'
import CartView from '../views/CartView.vue'
import OrdersView from '../views/OrdersView.vue'
import ProductView from '../views/ProductView.vue'
import SearchView from '../views/SearchView'
import NotFound from '../views/NotFoundView'
import SuccessOrderView from '../views/SuccessOrderView'
import OrderView from '../views/OrderView'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/products/',
    name: 'products',
    component: ProductsView,
    props: true
  },
  {
    path: '/products/:id',
    name: 'product',
    props: true,
    component: ProductView
  },
  {
    path: '/search',
    name: 'search',
    component: SearchView,
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartView
  },
  {
    path: '/order',
    name: 'order',
    component: OrderView
  },
  {
    path: '/success',
    name: 'success',
    component: SuccessOrderView
  },
  {
    path: '/orders',
    name: 'orders',
    component: OrdersView
  },
  {
    path: '/loginregister',
    name: 'loginregister',
    component: LoginRegisterView
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactView
  },
  {
    path: "/:pathMatch(.*)*",
    name: 'notFound',
    component: NotFound 
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
