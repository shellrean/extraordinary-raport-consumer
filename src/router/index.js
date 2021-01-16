import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

const DumpLogin = () => import("@/views/dump/login/Login")

const AppLayout = () => import("@/views/dump/layout/App")
const DumpMasterIndex = () => import("@/views/dump/master/Index")
const DumpMasterMajor = () => import("@/views/dump/master/Major")
const DumpMasterMajorCreate = () => import("@/views/dump/master/MajorCreate")
const DumpMasterUser = () => import("@/views/dump/master/User")
const DumpMasterUserCreate = () => import("@/views/dump/master/UserCreate")
const DumpMasterStudent = () => import("@/views/dump/master/Student")
const DumpMasterStudentCreate = () => import("@/views/dump/master/StudentCreate")
const DumpMasterAcademic = () => import("@/views/dump/master/Academic")
const DumpMasterSubject = () => import("@/views/dump/master/Subject")
const DumpMasterSubjectCreate = () => import("@/views/dump/master/SubjectCreate")
const DumpMasterClassroom = () => import("@/views/dump/master/Classroom")

Vue.use(VueRouter)

const routes = [
  {
    path: "/dump-login",
    name: "dump.login",
    component: DumpLogin
  },
  {
    path: "/d",
    component: AppLayout,
    children: [
      {
        path: 'dump-master-index',
        name: 'dump.master.index',
        component: DumpMasterIndex
      },
      {
        path: 'dump-master-major',
        name: 'dump.master.major',
        component: DumpMasterMajor
      },
      {
        path: 'dump-master-major-create',
        name: 'dump.master.major.create',
        component: DumpMasterMajorCreate
      },
      {
        path: 'dump-master-user',
        name: 'dump.master.user',
        component: DumpMasterUser
      },
      {
        path: 'dump-master-user-create',
        name: 'dump.master.user.create',
        component: DumpMasterUserCreate
      },
      {
        path: 'dump-master-student',
        name: 'dump.master.student',
        component: DumpMasterStudent
      },
      {
        path: 'dump-master-student-create',
        name: 'dump.master.student.create',
        component: DumpMasterStudentCreate
      },
      {
        path: 'dump-master-academic',
        name: 'dump.master.academic',
        component: DumpMasterAcademic
      },
      {
        path: 'dump-master-subject',
        name: 'dump.master.subject',
        component: DumpMasterSubject
      },
      {
        path: 'dump-master-subject-create',
        name: 'dump.master.subject.create',
        component: DumpMasterSubjectCreate
      },
      {
        path: 'dump-master-classroom',
        name: 'dump.master.classroom',
        component: DumpMasterClassroom
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
