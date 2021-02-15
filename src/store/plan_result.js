import $axios from '@/core/services/api.service'
import Message from '@/core/domain/message.domain.js'

/**
 * List of endpoint
 */
const endpoint = Object.freeze({

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

