import $axios from '@/core/services/api.service.js'
import Message from '@/core/domain/message.domain.js'

const state = () => ({
    students: [],
    student: {}
})

const mutations = {
    _assign_students_data(state, payload) {
        state.students = payload
    },
    _set_student_form_data(state, payload) {
        state.student = payload
    }
}

const actions = {
    fetchStudentsByClassroomAcademic({ commit }, classroomAcademicID) {
        return new Promise(async (resolve, reject) => {
            try {
                commit('_set_loading', true, { root: true })
                const network = await $axios.get(`classroom-students/classroom/${classroomAcademicID}`)
                if (network.data.success) {
                    commit('_assign_students_data', network.data.data == null ? [] : network.data.data)
                }
                commit('_set_loading', false, { root: true })
                resolve(network.data)
            } catch (error) {
                if (typeof error.response != 'undefined') {
                    if (typeof error.response.data != 'undefined') {
                        if (typeof error.response.data.error_code != 'undefined') {
                            reject(error.response.data)
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
                const network = await $axios.post(`classroom-students/classroom-student`, state.student)
            
                commit('_set_loading', false, { root: true })
                resolve(network.data)
            } catch (error) {
                if (typeof error.response != 'undefined') {
                    if (typeof error.response.data != 'undefined') {
                        if (typeof error.response.data.error_code != 'undefined') {
                            reject(error.response.data)
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
    deleteStudent({ commit }, studentAcademicID) {
        return new Promise(async (resolve, reject) => {
            try {
                commit('_set_loading', true, { root: true })
                const network = await $axios.delete(`classroom-students/classroom-student/${studentAcademicID}`)
            
                commit('_set_loading', false, { root: true })
                resolve(network.data)
            } catch (error) {
                if (typeof error.response != 'undefined') {
                    if (typeof error.response.data != 'undefined') {
                        if (typeof error.response.data.error_code != 'undefined') {
                            reject(error.response.data)
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