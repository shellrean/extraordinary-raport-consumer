import $axios from '@/core/services/api.service.js'

const state = () => ({
    users: [],
})

const mutations = {
    _assign_user_data(state, payload) {
        state.users = payload
    }
}

const actions = {
    fetchUsers({ commit }) {
        return new Promise(async (resolve, reject) => {
            try {
                let network = await $axios.get(`users`)

                if (network.data.success) {
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