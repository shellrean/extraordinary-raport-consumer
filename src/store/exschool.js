import $axios from '@/core/services/api.service.js'
import Message from '@/core/domain/message.domain.js'

/**
 * List of endpoint
 * @type {Object}
 */
const endpoint = Object.freeze({
    fetchData: "exschools/"
})

/**
 * state exschool
 * @type {Object}
 */
const state = () => ({
    exschools: []
})

/**
 * mutations exschool
 * @type {Object}
 */
const mutations = {
    _assign_exschools_data,
}

/**
 * actions exschool
 * @type {Object}
 */
const actions = {
    fetchExschools,
}

/**
 * Let's play the game
 * 
 */
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
 * Assign exschools data to state
 * @param {*} state
 * @param {*} payload
 */
function _assign_exschools_data(state, payload) {
    state.exschools = payload
}

/**
 * Get data exschools
 * @param {*} store
 */
function fetchExschools({commit}) {
    return new Promise(async (resolve, reject) => {
        try {
            commit('_set_loading', true, { root: true })
            const network = await $axios.get(endpoint.fetchData)
            if (network.data.success) {
                commit('_assign_exschools_data', network.data.data)
            }
            commit('_set_loading', false, { root: true })
            resolve(network.data)
        } catch (error) {
            reject(getError(error))
            commit('_set_loading', false, { root: true })
        }
    })
}