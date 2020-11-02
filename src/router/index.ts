import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Login from '@/components/Login.vue'
import SignUp from '@/components/SignUp.vue'
import Dashboard from '@/components/Dashboard.vue'
import Customers from '@/components/Customers.vue'
import Settings from '@/components/Settings.vue'

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
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/customers',
    name: 'customers',
    component: Customers,
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
      next('/dashboard')
    else 
      next()
  } else {
    next()
  } 
})

export default router
