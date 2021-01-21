import $axios from '@/core/services/api.service.js'
import Message from '@/core/domain/message.domain.js'

const state = () => ({
    classrooms: [],
    classroom: {}
})

const mutations = {
    _assign_classrooms_data(state, payload) {
        state.classrooms = payload
    },
    _set_classroom_form_data(state, payload) {
        state.classroom = payload
    }
}

const actions = {
    fetchClassrooms({ commit }) {
        return new Promise(async (resolve, reject) => {
            try {
                commit('_set_loading', true, { root: true })
                const network = await $axios.get(`classroom-academics/`)
                if (network.data.success) {
                    commit('_assign_classrooms_data', network.data.data)
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
    storeClassroom({ commit, state }) {
        return new Promise(async (resolve, reject) => {
            try {
                commit('_set_loading', true, { root: true })
                const network = await $axios.post(`classroom-academics/`, state.classroom)
                
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