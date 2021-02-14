import $axios from '@/core/services/api.service.js'
import Message from '@/core/domain/message.domain.js'

/**
 * List of endpoint
 * @type {Object} 
 */
const endpoint = Object.freeze({
    fetchData: "majors/",
})

/**
 * State for major
 * @type {Object}
 */
const state = () => ({
    majors: [],
    major: {}
})

/**
 * Mutations for major
 * @type {Object}
 */
const mutations = {
    _assign_majors_data,
    _set_major_form_data
}

/**
 * Actions for major
 * @type {Object}
 */
const actions = {
    fetchMajors
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
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
 * Assign majors data to state
 * @param {*} state
 * @param {*} payload
 */
function _assign_majors_data(state, payload) {
    state.majors = payload
}

/**
 * Assign major data to state
 * @param {*} state 
 * @param {*} payload 
 */
function _set_major_form_data(state, payload) {
    state.major = payload
}

/**
 * Get majors data
 * @param {*} store
 */
function fetchMajors({ commit, state }) {
    return new Promise(async (resolve, reject) => {
        try {
            commit('_set_loading', true, { root: true })
            const network = await $axios.get(endpoint.fetchData)
            if (network.data.success) {
                commit('_assign_majors_data', network.data.data)
            }
            commit('_set_loading', false, { root: true })
            resolve(network.data)
        } catch (error) {
            reject(getError(error))
            commit('_set_loading', false, { root: true })
        }
    })
}