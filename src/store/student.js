import $axios from '@/core/services/api.service.js'
import Message from '@/core/domain/message.domain.js'

const state = () => ({
    students: [],
    student: {},
    cursor: {
        prev: [],
        next: ''
    },
    limit: 10
})

const mutations = {
    _assign_students_data(state, payload) {
        state.students = payload
    },
    _add_student_prev_cursor_data(state, payload) {
        state.cursor.prev.push(payload)
    },
    _del_student_prev_cursor_data(state) {
        state.cursor.prev.pop()
    },
    _set_student_next_cursor_data(state, payload) {
        state.cursor.next = payload
    },
    _set_student_limit_page(state, payload) {
        state.limit = payload
    },
    _set_student_form_data(state, payload) {
        state.student = payload
    },
    _reset_student_cursor(state) {
        state.cursor = {
            prev: [],
            next: ''
        }
    }
}

const actions = {
    fetchStudents({ commit, state }, reverse = false) {
        return new Promise(async (resolve, reject) => {
            try {
                commit('_set_loading', true, { root: true })
                if(reverse) {
                    commit('_del_student_prev_cursor_data')
                    commit('_set_student_next_cursor_data', state.cursor.prev[state.cursor.prev.length - 1])
                }
                const network = await $axios.get(`students/?limit=${state.limit}&cursor=${state.cursor.next}`)
                if (network.data.success) {
                    if(!state.cursor.prev.includes(state.cursor.next)) {
                        commit('_add_student_prev_cursor_data', state.cursor.next)
                    }
                    commit('_set_student_next_cursor_data', network.headers['x-cursor'])

                    commit('_assign_students_data', network.data.data)
                }
                commit('_set_loading', false, { root: true })
                resolve(network.data)
            } catch (error) {
                if (typeof error.response != 'undefined') {
                    if (typeof error.response.data != 'undefined') {
                        if (typeof error.response.data.error_code != 'undefined') {
                            reject({message: error.response.data.message})
                        } else {
                            reject(Message.ErrUnExHappen)
                        }
                    } else {
                        reject(Message.ErrUnExHappen)
                    }
                } else {
                    reject(Message.ErrNotSendRequest)
                }
                commit('_set_loading', false, { root: true })
            }
        })
    },
    showStudent({ commit }, payload) {
        return new Promise(async (resolve, reject) => {
            try {
                commit('_set_loading', true, { root: true })
                let network = await $axios.get(`students/${payload}`)

                if (network.data.success) {
                    commit('_set_student_form_data', network.data.data)
                }
                commit('_set_loading', false, { root: true })
                resolve(network.data)
            } catch (error) {
                if (typeof error.response != 'undefined') {
                    if (typeof error.response.data != 'undefined') {
                        if (typeof error.response.data.error_code != 'undefined') {
                            reject({message: error.response.data.message})
                        } else {
                            reject(Message.ErrUnExHappen)
                        }
                    } else {
                        reject(Message.ErrUnExHappen)
                    }
                } else {
                    reject(Message.ErrNotSendRequest)
                }
                commit('_set_loading', false, { root: true })
            }
        })
    },
    storeStudent({ commit, state }) {
        return new Promise(async (resolve, reject) => {
            try {
                commit('_set_loading', true, { root: true })
                let network = await $axios.post(`students/`, state.student)

                commit('_set_loading', false, { root: true })
                resolve(network.data)
            } catch (error) {
                if (typeof error.response != 'undefined') {
                    if (typeof error.response.data != 'undefined') {
                        if (typeof error.response.data.error_code != 'undefined') {
                            reject({message: error.response.data.message})
                        } else {
                            reject(Message.ErrUnExHappen)
                        }
                    } else {
                        reject(Message.ErrUnExHappen)
                    }
                } else {
                    reject(Message.ErrNotSendRequest)
                }
                commit('_set_loading', false, { root: true })
            }
        })
    },
    updateStudent({ commit, state }) {
        return new Promise(async (resolve, reject) => {
            try {
                commit('_set_loading', true, { root: true })
                let network = await $axios.put(`students/${state.student.id}`, state.student)

                commit('_set_loading', false, { root: true })
                resolve(network.data)
            } catch (error) {
                if (typeof error.response != 'undefined') {
                    if (typeof error.response.data != 'undefined') {
                        if (typeof error.response.data.error_code != 'undefined') {
                            reject({message: error.response.data.message})
                        } else {
                            reject(Message.ErrUnExHappen)
                        }
                    } else {
                        reject(Message.ErrUnExHappen)
                    }
                } else {
                    reject(Message.ErrNotSendRequest)
                }
                commit('_set_loading', false, { root: true })
            }
        })
    },
    deleteStudent({ commit }, payload) {
        return new Promise(async (resolve, reject) => {
            try {
                commit('_set_loading', true, { root: true })
                let network = await $axios.delete(`students/${payload}`)

                commit('_set_loading', false, { root: true })
                resolve(network.data)
            } catch (error) {
                if (typeof error.response != 'undefined') {
                    if (typeof error.response.data != 'undefined') {
                        if (typeof error.response.data.error_code != 'undefined') {
                            reject({message: error.response.data.message})
                        } else {
                            reject(Message.ErrUnExHappen)
                        }
                    } else {
                        reject(Message.ErrUnExHappen)
                    }
                } else {
                    reject(Message.ErrNotSendRequest)
                }
                commit('_set_loading', false, { root: true })
            }
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}