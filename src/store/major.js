import $axios from '@/core/services/api.service.js'
import Message from '@/core/domain/message.domain.js'

const state = () => ({
    majors: [],
    major: {}
})

const mutations = {
    _assign_majors_data(state, payload) {
        state.majors = payload
    },
    _set_major_form_data(state, payload) {
        state.major = payload
    }
}

const actions = {
    fetchMajors({ commit, state }) {
        return new Promise(async (resolve, reject) => {
            try {
                commit('_set_loading', true, { root: true })
                const network = await $axios.get(`majors/`)
                if (network.data.success) {
                    commit('_assign_majors_data', network.data.data)
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
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}