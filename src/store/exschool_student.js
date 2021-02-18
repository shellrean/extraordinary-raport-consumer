import $axios from '@/core/services/api.service.js'
import Message from '@/core/domain/message.domain.js'

/**
 * List of endpoint
 * @type {Object}
 */
const endpoint = Object.freeze({
    fetchByClass: "exschool-students/classroom/",
    storeSingleData: "exschool-students/exschool-student",
    deleteSingleData: "exschool-students/exschool-student/"
})

/**
 * state exschool-student
 * @type {Object}
 */
const state = () => ({
    students: []
})

/**
 * mutations exschool
 * @type {Object}
 */
const mutations = {
    _assign_students_data
}

/**
 * actions exschool
 * @type {Object}
 */
const actions = {
    fetcByClassroom,
    storeStudent,
    deleteStudent
}

/**
 * Let's play the game
 */
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
 * Assign students data to state
 * @param {*} state
 * @param {*} payload
 */
function _assign_students_data(state, payload) {
    state.students = payload
}

/**
 * Get exschool's student by class
 * @param {*} store
 * @param {*} classID
 */
function fetcByClassroom({commit}, classID = 0) {
    return new Promise(async (resolve, reject) => {
        try {
            commit('_set_loading', true, { root: true })
            const network = await $axios.get(endpoint.fetchByClass+classID)
            if (network.data.success) {
                commit('_assign_students_data', network.data.data)
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
 * Create exschool's student
 * @param {*} store
 * @param {*} member
 */
function storeStudent({commit}, member) {
    return new Promise(async (resolve, reject) => {
        try {
            commit('_set_loading', true, { root: true })
            const network = await $axios.post(endpoint.storeSingleData, member)
         
            commit('_set_loading', false, { root: true })
            resolve(network.data)
        } catch (error) {
            reject(getError(error))
            commit('_set_loading', false, { root: true })
        }
    })
}

/**
 * Delete exschool's student
 * @param {*} store
 * @param {*} memberID
 */
function deleteStudent({commit}, memberID = 0) {
    return new Promise(async (resolve, reject) => {
        try {
            commit('_set_loading', true, { root: true })
            const network = await $axios.delete(endpoint.deleteSingleData+memberID)
         
            commit('_set_loading', false, { root: true })
            resolve(network.data)
        } catch (error) {
            reject(getError(error))
            commit('_set_loading', false, { root: true })
        }
    })
}