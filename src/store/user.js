import $axios from '@/core/services/api.service.js'
import Message from '@/core/domain/message.domain.js'

/**
 * List of endpoint
 * @type {Object}
 */
const endpoint = Object.freeze({
    fetchData: "users/",
    createSingleData: "users/user",
    updateSingleData: "users/user/",
    getSingleData: "users/user/",
    deleteSingleData: "users/user/",
    deleteMultiData: "users/delete"
})

/**
 * State for user
 * @type {Object}
 */
const state = () => ({
    users: [],
    user: {},
    cursor: {
        prev: [],
        next: ''
    },
    limit: 10
})

/**
 * Mutations for user
 * @type {Object}
 */
const mutations = {
    _assign_user_data,
    _add_user_prev_cursor_data,
    _del_user_prev_cursor_data,
    _set_user_next_cursor_data,
    _set_user_limit_page,
    _set_user_form_data,
    _clear_user_form_data,
    _reset_user_cursor
}

/**
 * Actions for user
 * @type {Object}
 */
const actions = {
    fetchUsers,
    storeUser,
    updateUser,
    showUser,
    deleteUser,
    deleteUsers
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
 * Assign users to state
 * @param {*} state
 * @param {*} payload
 */
function _assign_user_data(state, payload) {
    state.users = payload
}

/**
 * Add prev cursor in state
 * @param {*} state
 * @param {*} payload
 */
function _add_user_prev_cursor_data(state, payload) {
    state.cursor.prev.push(payload)
}

/**
 * Delete prev cursor in state
 * @param {*} state
 */
function _del_user_prev_cursor_data(state) {
    state.cursor.prev.pop()
}

/**
 * Set next cursor in state
 * @param {*} state
 * @param {*} payload
 */
function _set_user_next_cursor_data(state, payload) {
    state.cursor.next = payload
}

/**
 * Set user limit in state
 * @param {*} state
 * @param {*} payload
 */
function _set_user_limit_page(state, payload) {
    state.limit = payload
}

/**
 * Set single user to state
 * @param {*} state
 * @param {*} payload
 */
function _set_user_form_data(state, payload) {
    state.user = payload
}

/**
 * Clear user data in state
 * @param {*} state 
 * @param {*} payload 
 */
function _clear_user_form_data(state, payload) {
    state.user = {}
}

/**
 * Reset cursor state
 * @param {*} state 
 */
function _reset_user_cursor(state) {
    state.cursor = {
        prev: [],
        next: ''
    }
}

/**
 * Get users data
 * @param {*} param0 
 * @param {*} params 
 */
function fetchUsers({ commit, state }, params = {reverse: false, search: ''}) {
    const { reverse, search } = params
    return new Promise(async (resolve, reject) => {
        try {
            commit('_set_loading', true, { root: true })
            if(reverse) {
                commit('_del_user_prev_cursor_data')
                commit('_set_user_next_cursor_data', state.cursor.prev[state.cursor.prev.length - 1])
            }
            let network = await $axios.get(`${endpoint.fetchData}?q=${search}&limit=${state.limit}&cursor=${state.cursor.next}`)

            if (network.data.success) {
                if(!state.cursor.prev.includes(state.cursor.next)) {
                    commit('_add_user_prev_cursor_data', state.cursor.next)
                }
                commit('_set_user_next_cursor_data', network.headers['x-cursor'])

                commit('_assign_user_data', network.data.data)
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
 * Create single user
 * @param {*} store
 */
function storeUser({ commit, state }) {
    return new Promise(async (resolve, reject) => {
        try {
            commit('_set_loading', true, { root: true })
            let network = await $axios.post(endpoint.createSingleData, state.user)

            commit('_set_loading', false, { root: true })
            commit('_clear_user_form_data')
            resolve(network.data)
        } catch (error) {
            reject(getError(error))
            commit('_set_loading', false, { root: true })
        }
    })
}

/**
 * Update single user
 * @param {*} store
 */
function updateUser({ commit, state }) {
    return new Promise(async (resolve, reject) => {
        try {
            commit('_set_loading', true, { root: true })
            let network = await $axios.put(`${endpoint.updateSingleData}${state.user.id}`, state.user)

            commit('_set_loading', false, { root: true })
            commit('_clear_user_form_data')
            resolve(network.data)
        } catch (error) {
            reject(getError(error))
            commit('_set_loading', false, { root: true })
        }
    })
}

/**
 * Get single user
 * @param {*} store
 * @param {int} userID
 */
function showUser({ commit }, userID) {
    return new Promise(async (resolve, reject) => {
        try {
            commit('_set_loading', true, { root: true })
            let network = await $axios.get(`${endpoint.getSingleData}${userID}`)

            if (network.data.success) {
                commit('_set_user_form_data', network.data.data)
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
 * Delete single user
 * @param {*} store
 * @param {int} userID
 */
function deleteUser({ commit }, userID) {
    return new Promise(async (resolve, reject) => {
        try {
            commit('_set_loading', true, { root: true })
            let network = await $axios.delete(`${endpoint.deleteSingleData}${userID}`)

            commit('_set_loading', false, { root: true })
            resolve(network.data)
        } catch (error) {
            reject(getError(error))
            commit('_set_loading', false, { root: true })
        }
    })
}

/**
 * Delete muti user
 * @param {*} store
 * @param {Array} ids
 */
function deleteUsers({ commit }, ids = []) {
    return new Promise(async (resolve, reject) => {
        try {
            commit('_set_loading', true, { root: true })
            let network = await $axios.delete(`${endpoint.deleteMultiData}?q=${ids.join(",")}`)

            commit('_set_loading', false, { root: true })
            resolve(network.data)
        } catch (error) {
            reject(getError(error))
            commit('_set_loading', false, { root: true })
        }
    })
}