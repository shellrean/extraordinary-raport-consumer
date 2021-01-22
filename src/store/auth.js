import $axios from '@/core/services/api.service.js'
import Message from '@/core/domain/message.domain.js'

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
                            else if (error.response.data.error_code == 1206) {
                                reject({message: 'Akun tidak ditemukan'})
                            }
                            else if (error.response.data.error_code == 1301) {
                                reject({message: 'Password salah'})
                            }
                            else {
                                reject({message: error.response.data.message})
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
    }
}

export default {
    namespaced: true,
    actions
}