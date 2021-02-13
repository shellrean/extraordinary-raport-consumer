import $axios from '@/core/services/api.service.js'
import Message from '@/core/domain/message.domain.js'

const state = () => ({
    users: [],
    user: {},
    cursor: {
        prev: [],
        next: ''
    },
    limit: 10
})

const mutations = {
    _assign_user_data(state, payload) {
        state.users = payload
    },
    _add_user_prev_cursor_data(state, payload) {
        state.cursor.prev.push(payload)
    },
    _del_user_prev_cursor_data(state) {
        state.cursor.prev.pop()
    },
    _set_user_next_cursor_data(state, payload) {
        state.cursor.next = payload
    },
    _set_user_limit_page(state, payload) {
        state.limit = payload
    },
    _set_user_form_data(state, payload) {
        state.user = payload
    },
    _clear_user_form_data(state, payload) {
        state.user = {}
    },
    _reset_user_cursor(state) {
        state.cursor = {
            prev: [],
            next: ''
        }
    }
}

const actions = {
    fetchUsers({ commit, state }, params = {reverse: false, search: ''}) {
        const { reverse, search } = params
        return new Promise(async (resolve, reject) => {
            try {
                commit('_set_loading', true, { root: true })
                if(reverse) {
                    commit('_del_user_prev_cursor_data')
                    commit('_set_user_next_cursor_data', state.cursor.prev[state.cursor.prev.length - 1])
                }
                let network = await $axios.get(`users/?q=${search}&limit=${state.limit}&cursor=${state.cursor.next}`)

                if (network.data.success) {
                    if(!state.cursor.prev.includes(state.cursor.next)) {
                        commit('_add_user_prev_cursor_data', state.cursor.next)
                    }
                    commit('_set_user_next_cursor_data', network.headers['x-cursor'])

                    commit('_assign_user_data', network.data.data)
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
    storeUser({ commit, state }) {
        return new Promise(async (resolve, reject) => {
            try {
                commit('_set_loading', true, { root: true })
                let network = await $axios.post(`users/user`, state.user)

                commit('_set_loading', false, { root: true })
                commit('_clear_user_form_data')
                resolve(network.data)
            } catch (error) {
                if (typeof error.response != 'undefined') {
                    if (typeof error.response.data != 'undefined') {
                        if (typeof error.response.data.error_code != 'undefined') {
                            reject(err.response.data)
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
    updateUser({ commit, state }) {
        return new Promise(async (resolve, reject) => {
            try {
                commit('_set_loading', true, { root: true })
                let network = await $axios.put(`users/user/${state.user.id}`, state.user)

                commit('_set_loading', false, { root: true })
                commit('_clear_user_form_data')
                resolve(network.data)
            } catch (error) {
                if (typeof error.response != 'undefined') {
                    if (typeof error.response.data != 'undefined') {
                        if (typeof error.response.data.error_code != 'undefined') {
                            reject(err.response.data)
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
    showUser({ commit }, payload) {
        return new Promise(async (resolve, reject) => {
            try {
                commit('_set_loading', true, { root: true })
                let network = await $axios.get(`users/user/${payload}`)

                if (network.data.success) {
                    commit('_set_user_form_data', network.data.data)
                }
                commit('_set_loading', false, { root: true })
                resolve(network.data)
            } catch (error) {
                if (typeof error.response != 'undefined') {
                    if (typeof error.response.data != 'undefined') {
                        if (typeof error.response.data.error_code != 'undefined') {
                            reject(err.response.data)
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
    deleteUser({ commit }, payload) {
        return new Promise(async (resolve, reject) => {
            try {
                commit('_set_loading', true, { root: true })
                let network = await $axios.delete(`users/user/${payload}`)

                commit('_set_loading', false, { root: true })
                resolve(network.data)
            } catch (error) {
                if (typeof error.response != 'undefined') {
                    if (typeof error.response.data != 'undefined') {
                        if (typeof error.response.data.error_code != 'undefined') {
                            reject(err.response.data)
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
    deleteUsers({ commit }, ids = []) {
        return new Promise(async (resolve, reject) => {
            try {
                commit('_set_loading', true, { root: true })
                let network = await $axios.delete(`users/delete?q=${ids.join(",")}`)

                commit('_set_loading', false, { root: true })
                resolve(network.data)
            } catch (error) {
                if (typeof error.response != 'undefined') {
                    if (typeof error.response.data != 'undefined') {
                        if (typeof error.response.data.error_code != 'undefined') {
                            reject(err.response.data)
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
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}