import $axios from '@/core/services/api.service.js'
import Message from '@/core/domain/message.domain.js'

/**
 * List of endpoint
 * @type {Object}
 */
const endpoint = Object.freeze({
    fetchData: "subjects/"
})

/**
 * State for subject
 * @type {Object}
 */
const state = () => ({
    subjects: [],
    subject: {}
})

/**
 * Mutations for subject
 * @type {Object}
 */
const mutations = {
    _assign_subjects_data,
    _set_subject_form_data
}

/**
 * Actions for subject
 * @type {Object}
 */
const actions = {
    fetchSubjects
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
 * Assign subjects to state
 * @param {*} state 
 * @param {*} payload 
 */
function _assign_subjects_data(state, payload) {
    state.subjects = payload
}

/**
 * Assign single subject to state
 * @param {*} state
 * @param {*} payload
 */
function _set_subject_form_data(state, payload) {
    state.subject = payload
}

/**
 * Get subjects data
 * @param {*} param0 
 */
function fetchSubjects({ commit }) {
    return new Promise(async (resolve, reject) => {
        try {
            commit('_set_loading', true, { root: true })
            const network = await $axios.get(endpoint.fetchData)
            if (network.data.success) {
                commit('_assign_subjects_data', network.data.data)
            }
            commit('_set_loading', false, { root: true })
            resolve(network.data)
        } catch (error) {
            reject(getError(error))
            commit('_set_loading', false, { root: true })
        }
    })
}