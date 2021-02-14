import $axios from '@/core/services/api.service.js'
import Message from '@/core/domain/message.domain.js'

/**
 * List of endpoint
 * @type {Object}
 */
const endpoint = Object.freeze({
    fetchData: "academics/",
    generateData: "academics/"
})

/**
 * State for academic
 * @type {Function}
 */
const state = () => ({
    academics: [],
    academic: {}
})

/**
 * Mutations for academic
 * @type {Object}
 */
const mutations = {
    _assign_academics_data,
    _set_academic_form_data
}

/**
 * Actions for academic
 * @type {Object}
 */
const actions = {
    fetchAcademics,
    generateAcademic
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
 * Assign academics data to state
 * @param {*} state
 * @param {*} payload
 */
function _assign_academics_data(state, payload) {
    state.academics = payload
}

/**
 * Assign single academic data to state
 * @param {*} state
 * @param {*} payload
 */
function _set_academic_form_data(state, payload) {
    state.academic = payload
}

/**
 * Fetch data academics
 * @param {*} param0 
 */
function fetchAcademics({ commit, state }) {
    return new Promise(async (resolve, reject) => {
        try {
            commit('_set_loading', true, { root: true })
            const network = await $axios.get(endpoint.fetchData)
            if (network.data.success) {
                commit('_assign_academics_data', network.data.data)
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
 * Generate new academic
 * @param {*} store
 */
function generateAcademic({ commit }) {
    return new Promise(async (resolve, reject) => {
        try {
            commit('_set_loading', true, { root: true })
            const network = await $axios.post(endpoint.generateData)
            commit('_set_loading', false, { root: true })
            resolve(network.data)
        } catch (error) {
            reject(getError(error))
            commit('_set_loading', false, { root: true })
        }
    })
}