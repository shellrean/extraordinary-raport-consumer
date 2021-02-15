import $axios from '@/core/services/api.service'
import Message from '@/core/domain/message.domain.js'

/**
 * List of endpoint
 */
const endpoint = Object.freeze({
    createSingleData: "cspr/s",
    fetchData: "cspr/plan/"
})

/**
 * State of plan_result
 * @type {Object}
 */
const state = () => ({
    results: []
})

/**
 * Mutations of plan_result
 * @type {Object}
 */
const mutations = {
    _assign_results_data
}

/**
 * Actions of plan_result
 * @type {Object}
 */
const actions = {
    storePlanResult,
    fetchPlanResults
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
 * Assign data result to state
 * @param {*} state
 * @param {*} payload
 */
function _assign_results_data(state, payload) {
    state.results = payload
}

/**
 * Store data 
 * @param {*} store
 * @param {
 *  index: Number
 *  studentID: Number
 *  subjectID: Number
 *  planID: Number
 *  number: Number
 * } payload
 */
function storePlanResult({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
        try {
            commit('_set_loading', true, { root: true })
            let network = await $axios.post(`${endpoint.createSingleData}`, payload)

            commit('_set_loading', false, { root: true })
            resolve(network.data)
        } catch (error) {
            reject(getError(error))
            commit('_set_loading', false, { root: true })
        }
    })
}

/**
 * Get data plan_result
 * @param {*} store
 * @param {*} planID
 */
function fetchPlanResults({ commit }, planID) {
    return new Promise(async (resolve, reject) => {
        try {
            commit('_set_loading', true, { root: true })
            let network = await $axios.get(endpoint.fetchData+planID)

            if (network.data.success) {
                commit('_assign_results_data', network.data.data)
            }
            commit('_set_loading', false, { root: true })
            resolve(network.data)
        } catch (error) {
            reject(getError(error))
            commit('_set_loading', false, { root: true })
        }
    })
}