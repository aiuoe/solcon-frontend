import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Login from '@/components/Login.vue'
import SignUp from '@/components/SignUp.vue'
import Dashboard from '@/components/Dashboard.vue'
import Customers from '@/components/Customers.vue'
import Profile from '@/components/Profile.vue'
import Company from '@/components/Company.vue'
import Bank from '@/components/Bank.vue'
import Sale from '@/components/Sale.vue'
import Purchase from '@/components/Purchase.vue'
import Report from '@/components/Report.vue'
import Settings from '@/components/Settings.vue'
import Preload from '@/components/Preload.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      islogged: true
    }
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp,
    meta: {
      islogged: true
    }
  },
  {
    path: '/inicio',
    name: 'inicio',
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/clientes',
    name: 'clientes',
    component: Customers,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/empresa',
    name: 'empresa',
    component: Company,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/banco',
    name: 'banco',
    component: Bank,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/ventas',
    name: 'ventas',
    component: Sale,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/compras',
    name: 'compras',
    component: Purchase,
    meta: {
      requiresAuth: true
    }
  },
    {
    path: '/reportes',
    name: 'reportes',
    component: Report,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/perfil',
    name: 'perfil',
    component: Profile,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/cargando',
    name: 'cargando',
    component: Preload,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '*',
    redirect: '/login'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
   if (to.matched.some(record => record.meta.requiresAuth)) {
    if (window.localStorage.getItem('token') == null) 
      next('/login')
    else 
      next()
  } else {
    next()
  } 
})

router.beforeEach((to, from, next) => {
   if (to.matched.some(record => record.meta.islogged)) {
    if (window.localStorage.getItem('token') != null) 
      next('/inicio')
    else 
      next()
  } else {
    next()
  } 
})

export default router
