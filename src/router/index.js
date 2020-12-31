import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

const Login = () => import("@/views/auth/Login")
const Layout = () => import("@/views/layout/App")
const Dashboard = () => import("@/views/dashboard/Dashboard")

const User = () => import("@/views/user/Index")

Vue.use(VueRouter)

const routes = [
  {
    path: "/login",
    name: 'login',
    component: Login
  },
  {
    path: "/",
    component: Layout,
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        redirect: '/dashboard'
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard
      },
      {
        path: '/users',
        name: 'user.data',
        component: User
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  store.commit('_clear_errors')
  store.commit('_loading_page', true)
  if (to.matched.some(record => record.meta.requiresAuth)) {
    let auth = store.getters.isAuth
    if (!auth) {
      next({ name: 'login' })
    }
    else {
      next()
    }
  }
  else {
    next()
  }
})

router.afterEach(() => {
  store.commit('_loading_page', false)
  store.commit('_set_loading', false)
})

export default router
