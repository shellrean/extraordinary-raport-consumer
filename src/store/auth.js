import $axios from '@/core/services/api.service.js'
import Message from '@/core/domain/message.domain.js'

/**
 * List of endpoint
 * @type {Object}
 */
const endpoint = Object.freeze({
    getAuthUser: "users/auth-current",
    auth: "auth",
    refreshToken: "refresh-token"
})

/**
 * State for auth
 * @type {Object}
 */
const state = () => ({
    authorized_user: JSON.parse(localStorage.getItem('authorized_user') != null ? localStorage.getItem('authorized_user') : '{}'),
})

/**
 * Mutations for auth
 * @type {Object}
 */
const mutations = {
    _assign_authorized_user
}

/**
 * Actions for auth
 * @type {Object}
 */
const actions = {
    getAuthorizeUser,
    submit,
    refreshToken
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}

/**
 * Get error data
 * @param {*} error 
 */
function getError(error) {
    if (typeof error.response != 'undefined') {
        if (typeof error.response.data != 'undefined') {
            if (typeof error.response.data.error_code != 'undefined') {
                return error.response.data
            }
            return Message.ErrUnExHappen
        }
        return Message.ErrUnExHappen
    }
    return Message.ErrNotSendRequest
}

/**
 * Assign auth detail to state
 * @param {*} state 
 * @param {*} payload 
 */
function _assign_authorized_user(state, payload) {
    state.authorized_user = payload
}

/**
 * Get authorize user detail
 * @param {*} store
 */
function getAuthorizeUser({ commit }) {
    return new Promise(async (resolve, reject) => {
        try {
            commit('_set_loading', true, { root: true })
            const network = await $axios.get(endpoint.getAuthUser)
            if (network.data.success) {
                localStorage.setItem('authorized_user', JSON.stringify(network.data.data))
                commit('_assign_authorized_user', network.data.data)
            }
            commit('_set_loading', false, { root: true })
            resolve(network.data)
        } catch (error) {
            reject(getError(error))
            commit('_set_loading', false, { root: true })
        }
    })
}

/**
 * Get authentication
 * @param {*} store
 * @param {*} payload
 */
function submit({ commit, dispatch }, payload) {
    return new Promise(async (resolve, reject) => {
        try {
            localStorage.setItem('access_token', null)
            commit('_set_access_token', null, { root: true })
            commit('_set_refresh_token', null, { root: true })
            commit('_set_loading', true, { root: true })

            let network = await $axios.post(endpoint.auth, payload)

            if (network.data.success) {
                localStorage.setItem('access_token', network.data.data.access_token)
                localStorage.setItem('refresh_token', network.data.data.refresh_token)
                commit('_set_access_token', network.data.data.access_token, { root: true })
                commit('_set_refresh_token', network.data.data.refresh_token, { root: true })
            }
            commit('_set_loading', false, { root: true })
            resolve(network.data)
        } catch (error) {
            reject(getError(error))
            commit('_set_loading', false, { root: true })
        }
    })
}

/**
 * Get access token by refresh token
 * @param {*} store
 * @param {*} payload
 */
function refreshToken({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
        try {
            let network = await $axios.post(endpoint.refreshToken, payload)
            if (network.data.success) {
                localStorage.setItem('access_token', network.data.data.access_token)
                localStorage.setItem('refresh_token', network.data.data.refresh_token)
                commit('_set_access_token', network.data.data.access_token, { root: true })
                commit('_set_refresh_token', network.data.data.refresh_token, { root: true })
            }
            resolve(network.data)
        } catch (error) {
            reject(getError(error))
        }
    })
}