import $axios from '@/core/services/api.service.js'
import Message from '@/core/domain/message.domain.js'

/**
 * List of endpoint
 * @type {Object}
 */
const endpoint = Object.freeze({
    fetchData: "settings/",
    updateData: "settings/",
})

/**
 * State for setting
 * @type {Object}
 */
const state = () => ({
    settings: []
})

/**
 * Mutations for setting
 * @type {Object}
 */
const mutations = {
    _assign_setting_data
}

/**
 * Actions for setting
 * @type {Object}
 */
const actions = {
    fetchSettings,
    updateSetting
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
 * Assign setting to state
 * @param {*} state
 * @param {*} payload
 */
function _assign_setting_data(state, payload) {
    state.settings = payload
}

/**
 * Get settings data 
 * @param {*} store
 * @param {Array} names
 */
function fetchSettings({ commit }, names = []) {
    return new Promise(async (resolve, reject) => {
        try {
            commit('_set_loading', true, { root: true })
            let network = await $axios.get(`${endpoint.fetchData}?q=${names.join(",")}`)

            if (network.data.success) {
                commit('_assign_setting_data', network.data.data)
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
 * Update setting
 * @param {*} store
 * @param {Object} setting
 */
function updateSetting({ commit }, setting = {name: "", value: ""}) {
    return new Promise(async (resolve, reject) => {
        try {
            commit('_set_loading', true, { root: true })
            let network = await $axios.put(endpoint.updateData, setting)

            commit('_set_loading', false, { root: true })
            resolve(network.data)
        } catch (error) {
            reject(getError(error))
            commit('_set_loading', false, { root: true })
        }
    })
}