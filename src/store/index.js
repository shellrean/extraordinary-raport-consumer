import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import user from './user'
import sett from './sett'
import student from './student'
import major from './major'
import subject from './subject'
import classroom from './classroom'
import academic from './academic'
import academic_classroom from './academic_classroom'
import academic_student from './academic_student'
import academic_subject from './academic_subject'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    errors: [],
    isLoading: false,
    loadPage: false,
    access_token: localStorage.getItem('access_token'),
    refresh_token: localStorage.getItem('refresh_token'),
    baseURL: process.env.VUE_APP_URL,
    academic_active: {}
  },
  getters: {
    isAuth: state => {
      return state.access_token != "null" && state.access_token != null
    },
  },
  mutations: {
    _set_access_token(state, payload) {
      state.access_token = payload
    },
    _set_refresh_token(state, payload) {
      state.refresh_token = payload
    },
    _set_errors(state, payload) {
      state.errors = payload
    },
    _clear_errors({ errors }) {
      errors = []
    },
    _loading_page(state, payload) {
      state.loadPage = payload
    },
    _set_loading(state, payload) {
      state.isLoading = payload
    },
    _set_baseurl(state, payload) {
      state.baseURL = payload
    },
    _set_academic_year(state, payload) {
      state.academic_active = payload
    }
  },
  actions: {
    setAcademicYear({ commit }, payload) {
      commit('_set_academic_year', payload)
    }
  },
  modules: {
    auth,
    user,
    sett,
    student,
    major,
    subject,
    classroom,
    academic,
    academic_classroom,
    academic_student,
    academic_subject,
  }
})
