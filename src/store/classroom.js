import $axios from '@/core/services/api.service.js'
import Message from '@/core/domain/message.domain.js'

/**
 * List of endpoint
 * @type {Object}
 */
const endpoint = Object.freeze({
    fetchData: "classrooms/",
})

/**
 * State for classroom
 * @type {Object}
 */
const state = () => ({
    classrooms: [],
    classroom: {}
})

/**
 * Mutations for classroom
 * @type {Object}
 */
const mutations = {
    _assign_classrooms_data,
    _set_classroom_form_data,
}

/**
 * Actions for classroom
 * @type {Object}
 */
const actions = {
    fetchClassrooms,
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
 * Assign classrooms data to state
 * @param {*} state 
 * @param {*} payload 
 */
function _assign_classrooms_data(state, payload) {
    state.classrooms = payload
}

/**
 * Assign single classroom data to state
 * @param {*} state
 * @param {*} payload
 */
function _set_classroom_form_data(state, payload) {
    state.classroom = payload
}

/**
 * Get classrooms
 * @param {*} store
 */
function fetchClassrooms({ commit }) {
    return new Promise(async (resolve, reject) => {
        try {
            commit('_set_loading', true, { root: true })
            const network = await $axios.get(endpoint.fetchData)
            if (network.data.success) {
                commit('_assign_classrooms_data', network.data.data)
            }
            commit('_set_loading', false, { root: true })
            resolve(network.data)
        } catch (error) {
            reject(getError(error))
            commit('_set_loading', false, { root: true })
        }
    })
}