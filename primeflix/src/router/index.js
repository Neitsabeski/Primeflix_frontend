import { createRouter, createWebHistory } from 'vue-router'

// shop
import ShopView from '../views/ShopView'
import HomeView from '../views/shop/HomeView.vue'
import LoginRegisterView from '../views/shop/LoginRegisterView.vue'
import ProfileView from '../views/shop/ProfileView.vue'
import ProductsView from '../views/shop/ProductsView.vue'
import ContactView from '../views/shop/ContactView.vue'
import AboutView from '../views/shop/AboutView'
import CartView from '../views/shop/CartView.vue'
import OrdersView from '../views/shop/OrdersView.vue'
import ProductView from '../views/shop/ProductView.vue'
import SearchView from '../views/shop/SearchView'
import NotFound from '../views/shop/NotFoundView'
import OrderCloseView from '../views/shop/OrderCloseView'
import OrderView from '../views/shop/OrderView'

// office
import OfficeView from '../views/OfficeView'
import LoginView from '../views/office/LoginView'

const routes = [
  {
    path: '/office/login',
    name: 'login',
    component: LoginView
  },
  {    
    path: '/office', component: OfficeView, redirect: '/office/',
    children: [
      {
        path: "/office/:pathMatch(.*)*",
        redirect: '/office'
      },
    ]
  },
  {
    path: '/', component: ShopView, redirect: '/shop/',
    children: [
      {
        path: '/shop/',
        name: 'Home',
        component: HomeView
      },
      {
        path: '/shop/products/',
        name: 'products',
        component: ProductsView,
        props: true
      },
      {
        path: '/shop/products/:id',
        name: 'product',
        props: true,
        component: ProductView
      },
      {
        path: '/shop/search',
        name: 'search',
        component: SearchView,
      },
      {
        path: '/shop/cart',
        name: 'cart',
        component: CartView
      },
      {
        path: '/shop/order',
        name: 'order',
        component: OrderView
      },
      {
        path: '/shop/ordersuccess',
        name: 'success',
        component: OrderCloseView,
        props: { state: "success" }
      },
      {
        path: '/shop/ordercancel',
        name: 'cancel',
        component: OrderCloseView,
        props: { state: "cancel" }
      },
      {
        path: '/shop/orders',
        name: 'orders',
        component: OrdersView
      },
      {
        path: '/shop/loginregister',
        name: 'loginregister',
        component: LoginRegisterView
      },
      {
        path: '/shop/profile',
        name: 'profile',
        component: ProfileView
      },
      {
        path: '/shop/about',
        name: 'about',
        component: AboutView
      },
      {
        path: '/shop/contact',
        name: 'contact',
        component: ContactView
      },
      {
        path: "/:pathMatch(.*)*",
        name: 'notFound',
        component: NotFound 
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
