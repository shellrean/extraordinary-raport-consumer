import $axios from '@/core/services/api.service.js'

const state = () => ({
    users: [],
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
    }
}

const actions = {
    fetchUsers({ commit, state }, reverse = false) {
        return new Promise(async (resolve, reject) => {
            try {
                if(reverse) {
                    commit('_del_user_prev_cursor_data')
                    commit('_set_user_next_cursor_data', state.cursor.prev[state.cursor.prev.length - 1])
                }
                let network = await $axios.get(`users?limit=${state.limit}&cursor=${state.cursor.next}`)

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
                            reject({message: error.response.data.message})
                        } else {
                            reject({message: 'Terjadi kesalahan yang tidak dapat dijelaskan'})
                        }
                    } else {
                        reject({message: 'Terjadi kesalahan yang tidak dapat dijelaskan'})
                    }
                } else {
                    reject({message: 'Terjadi kesalahan saat mengirim request ke server'})
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