import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import { Role } from '@/core/domain/role.domain'

const Login = () => import("@/views/auth/Login")

const AppLayout = () => import("@/views/layout/App")
const MasterIndex = () => import("@/views/master/Index")
const MasterStudent = () => import("@/views/master/student/Index")
const MasterStudentForm = () => import("@/views/master/student/Form")
const MasterMajor = () => import("@/views/master/major/Index")
const MasterUser = () => import("@/views/master/user/Index")
const MasterUserForm = () => import("@/views/master/user/Form")
const MasterUserImport = () => import("@/views/master/user/Import")
const MasterSubject = () => import("@/views/master/subject/Index")
const MasterClassroom = () => import("@/views/master/classroom/Index")
const MasterAcademic = () => import("@/views/master/academic/Index")

const AcademicIndex = () => import("@/views/academic/Index")
const AcademicClassroom = () => import("@/views/academic/classroom/Index")
const AcademicClassroomForm = () => import("@/views/academic/classroom/Form")
const AcademicClassroomDetail = () => import("@/views/academic/classroom/Detail")
const AcademicClassroomSubject = () => import("@/views/academic/classroom/FormSubject")
const AcademicClassroomStudent = () => import("@/views/academic/classroom/FormStudent")

const SettingIndex = () => import("@/views/sett/Index")

const ResultingIndex = () => import("@/views/resulting/Index")
const ResultingSubjectPlanIndex = () => import("@/views/resulting/subject_plan/Index")
const ResultingSubjectPlanForm = () => import("@/views/resulting/subject_plan/Form")
const ResultingPlanResultIndex = () => import("@/views/resulting/plan_result/Index")
const ResultingPlanResultSubject = () => import("@/views/resulting/plan_result/Subject")
const ResultingPlanResultSubjectInput = () => import("@/views/resulting/plan_result/input/Index")
const ResultingPlanResultSubjectResult = () => import("@/views/resulting/plan_result/result/Index")

const RaportingIndex = () => import("@/views/raporting/Index")

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
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
        component: MasterIndex,
        meta: { authorize: [Role.Admin] }
      },
      {
        path: 'm/s',
        name: 'master.student',
        component: MasterStudent,
        meta: { authorize: [Role.Admin] }
      },
      {
        path: 'm/s/c',
        name: 'master.student.create',
        component: MasterStudentForm,
        meta: { authorize: [Role.Admin] }
      },
      {
        path: 'm/s/:id/u',
        name: 'master.student.edit',
        component: MasterStudentForm,
        meta: { authorize: [Role.Admin] }
      },
      {
        path: 'm/m',
        name: 'master.major',
        component: MasterMajor,
        meta: { authorize: [Role.Admin] }
      },
      {
        path: 'm/u',
        name: 'master.user',
        component: MasterUser,
        meta: { authorize: [Role.Admin] }
      },
      {
        path: 'm/u/c',
        name: 'master.user.create',
        component: MasterUserForm,
        meta: { authorize: [Role.Admin] }
      },
      {
        path: 'm/u/:id/u',
        name: 'master.user.edit',
        component: MasterUserForm,
        meta: { authorize: [Role.Admin] }
      },
      {
        path: 'm/u/i',
        name: 'master.user.import',
        component: MasterUserImport,
        meta: { authorize: [Role.Admin] }
      },
      {
        path: 'm/su',
        name: 'master.subject',
        component: MasterSubject,
        meta: { authorize: [Role.Admin] }
      },
      {
        path: 'm/c',
        name: 'master.classroom',
        component: MasterClassroom,
        meta: { authorize: [Role.Admin] }
      },
      {
        path: 'm/a',
        name: 'master.academic',
        component: MasterAcademic,
        meta: { authorize: [Role.Admin] }
      },
      {
        path:'a',
        name: 'academic.index',
        component: AcademicIndex,
        meta: { authorize: [Role.Admin] }
      },
      {
        path: 'a/c',
        name: 'academic.classroom',
        component: AcademicClassroom,
        meta: { authorize: [Role.Admin] }
      },
      {
        path: 'a/c/c',
        name: 'academic.classroom.create',
        component: AcademicClassroomForm,
        meta: { authorize: [Role.Admin] }
      },
      {
        path: 'a/c/:id/u',
        name: 'academic.classroom.edit',
        component: AcademicClassroomForm,
        meta: { authorize: [Role.Admin] }
      },
      {
        path: 'a/c/:id/d',
        name: 'academic.classroom.detail',
        component: AcademicClassroomDetail,
        meta: { authorize: [Role.Admin] }
      },
      {
        path: 'a/c/:id/su',
        name: 'academic.classroom.subject',
        component: AcademicClassroomSubject,
        meta: { authorize: [Role.Admin] }
      },
      {
        path: 'a/c/:id/s',
        name: 'academic.classroom.student',
        component: AcademicClassroomStudent,
        meta: { authorize: [Role.Admin] }
      },
      {
        path: 's',
        name: 'setting.index',
        component: SettingIndex,
        meta: { authorize: [Role.Admin] }
      },
      {
        path: 'r',
        name: 'resulting.index',
        component: ResultingIndex,
        meta: { authorize: [Role.Teacher] }
      },
      {
        path: 'r/sp',
        name: 'resulting.subject.plan',
        component: ResultingSubjectPlanIndex,
        meta: { authorize: [Role.Teacher] }
      },
      {
        path: 'r/sp/c',
        name: 'resulting.subject.plan.create',
        component: ResultingSubjectPlanForm,
        meta: { authorize: [Role.Teacher] }
      },
      {
        path: 'r/sp/:id/e',
        name: 'resulting.subject.plan.edit',
        component: ResultingSubjectPlanForm,
        meta: { authorize: [Role.Teacher] }
      },
      {
        path: 'r/pr',
        name: 'resulting.plan.result',
        component: ResultingPlanResultIndex,
        meta: { authorize: [Role.Teacher] }
      },
      {
        path: 'r/pr/:id/s',
        name: 'resulting.plan.result.subject',
        component: ResultingPlanResultSubject,
        meta: { authorize: [Role.Teacher] }
      },
      {
        path: 'r/pr/s/:id/i',
        name: 'resulting.plan.result.subject.input',
        component: ResultingPlanResultSubjectInput,
        meta: { authorize: [Role.Teacher] }
      },
      {
        path: 'r/pr/s/:id/r',
        name: 'resulting.plan.result.subjct.result',
        component: ResultingPlanResultSubjectResult,
        meta: { authorize: [Role.Teacher] }
      },
      {
        path: 'ra',
        name: 'raporting.index',
        component: RaportingIndex,
        meta: { authorize: [Role.Teacher] }
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

  const { authorize } = to.meta;
  const auth = store.getters.isAuth
  const currentUser = store.state.auth.authorized_user

  if (authorize) {
    if (!auth) {
      return next({ name: 'login', query: { returnUrl: to.path } })
    }

    if (authorize.length && !authorize.includes(currentUser.role)) {
      if (currentUser.role == Role.Admin) {
        return next({ name: 'master.index' })
      }
      return next({ name: 'resulting.index' })
    }
  }

  next()
})

router.afterEach(() => {
  store.commit('_loading_page', false)
  store.commit('_set_loading', false)
})
export default router
