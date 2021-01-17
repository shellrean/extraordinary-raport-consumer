import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

const DumpLogin = () => import("@/views/dump/login/Login")

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


const Login = () => import("@/views/auth/Login")

const AppLayout = () => import("@/views/layout/App")
const MasterIndex = () => import("@/views/master/Index")
const MasterStudent = () => import("@/views/master/student/Index")
const MasterStudentForm = () => import("@/views/master/student/Form")
const MasterMajor = () => import("@/views/master/major/Index")
const MasterUser = () => import("@/views/master/user/Index")
const MasterUserForm = () => import("@/views/master/user/Form")
const MasterSubject = () => import("@/views/master/subject/Index")
const MasterClassroom = () => import("@/views/master/classroom/Index")
const MasterAcademic = () => import("@/views/master/academic/Index")

Vue.use(VueRouter)

const routes = [
  {
    path: "/login",
    name: 'login',
    component: Login
  },
  {
    path: '/d',
    meta: { requiresAuth: true },
    component: AppLayout,
    children: [
      {
        path: 'm',
        name: 'master.index',
        component: MasterIndex
      },
      {
        path: 'm/s',
        name: 'master.student',
        component: MasterStudent
      },
      {
        path: 'm/s/c',
        name: 'master.student.create',
        component: MasterStudentForm
      },
      {
        path: 'm/s/:id/u',
        name: 'master.student.edit',
        component: MasterStudentForm
      },
      {
        path: 'm/m',
        name: 'master.major',
        component: MasterMajor
      },
      {
        path: 'm/u',
        name: 'master.user',
        component: MasterUser
      },
      {
        path: 'm/u/c',
        name: 'master.user.create',
        component: MasterUserForm
      },
      {
        path: 'm/u/:id/u',
        name: 'master.user.edit',
        component: MasterUserForm
      },
      {
        path: 'm/su',
        name: 'master.subject',
        component: MasterSubject
      },
      {
        path: 'm/c',
        name: 'master.classroom',
        component: MasterClassroom
      },
      {
        path: 'm/a',
        name: 'master.academic',
        component: MasterAcademic
      }
    ]
  },
  {
    path: "/dump-login",
    name: "dump.login",
    component: DumpLogin
  },
  {
    path: "/f",
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
