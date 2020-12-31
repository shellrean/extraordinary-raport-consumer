import $axios from '@/core/services/api.service.js'

const actions = {
    submit({ commit }, payload) {
        return new Promise(async (resolve, reject) => {
            try {
                localStorage.setItem('access_token', null)
                commit('_set_access_token', null, { root: true })
                commit('_set_refresh_token', null, { root: true })
                commit('_set_loading', true, { root: true })

                let network = await $axios.post(`auth`, payload)

                if (network.data.success) {
                    localStorage.setItem('access_token', network.data.access_token)
                    localStorage.setItem('refresh_token', network.data.refresh_token)
                    commit('_set_access_token', network.data.access_token, { root: true })
                    commit('_set_refresh_token', network.data.refresh_token, { root: true })
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
    actions
}