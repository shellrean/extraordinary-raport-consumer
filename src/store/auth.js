import $axios from '@/core/services/api.service.js'
import Message from '@/core/domain/message.domain.js'

const state = () => ({
    authorized_user: JSON.parse(localStorage.getItem('authorized_user') != null ? localStorage.getItem('authorized_user') : '{}'),
})

const mutations = {
    _assign_authorized_user(state, payload) {
        state.authorized_user = payload
    }
}

const actions = {
    getAuthorizeUser({ commit }) {
        return new Promise(async (resolve, reject) => {
            try {
                commit('_set_loading', true, { root: true })
                const network = await $axios.get(`users/auth-current`)
                if (network.data.success) {
                    localStorage.setItem('authorized_user', JSON.stringify(network.data.data))
                    commit('_assign_authorized_user', network.data.data)
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
    submit({ commit, dispatch }, payload) {
        return new Promise(async (resolve, reject) => {
            try {
                localStorage.setItem('access_token', null)
                commit('_set_access_token', null, { root: true })
                commit('_set_refresh_token', null, { root: true })
                commit('_set_loading', true, { root: true })

                let network = await $axios.post(`auth`, payload)

                if (network.data.success) {
                    dispatch('getAuthorizeUser')
                    localStorage.setItem('access_token', network.data.data.access_token)
                    localStorage.setItem('refresh_token', network.data.data.refresh_token)
                    commit('_set_access_token', network.data.data.access_token, { root: true })
                    commit('_set_refresh_token', network.data.data.refresh_token, { root: true })
                }
                commit('_set_loading', false, { root: true })
                resolve(network.data)
            } catch (error) {
                if (typeof error.response != 'undefined') {
                    if (typeof error.response.data != 'undefined') {
                        if (typeof error.response.data.error_code != 'undefined') {
                            if (error.response.data.error_code == 1106) {
                                commit('_set_errors', error.response.data.errors, { root: true })
                            }
                            else {
                                reject(error.response.data)
                            }
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
    refreshToken({ commit }, payload) {
        return new Promise(async (resolve, reject) => {
            try {
                let network = await $axios.post(`refresh-token`, payload)
                if (network.data.success) {
                    localStorage.setItem('access_token', network.data.data.access_token)
                    localStorage.setItem('refresh_token', network.data.data.refresh_token)
                    commit('_set_access_token', network.data.data.access_token, { root: true })
                    commit('_set_refresh_token', network.data.data.refresh_token, { root: true })
                }
                resolve(network.data)
            } catch (err) {
                reject(err)
            }
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}