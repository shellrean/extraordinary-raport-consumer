import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import("@/views/auth/Login")
const Layout = () => import("@/views/layout/App")
const Dashboard = () => import("@/views/dashboard/Dashboard")

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
    children: [
      {
        path: "",
        redirect: '/dashboard'
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
