import $axios from '@/core/services/api.service.js'
import Message from '@/core/domain/message.domain.js'

/**
 * List of endpoint
 * @type {Object}
 */
const endpoint = Object.freeze({
    fetchData: "students/",
    getSingleData: "students/",
    createSingleData: "students/",
    updateSingleData: "students/",
    deleteSingleData: "students/"
})

/**
 * State for student
 * @type {Object}
 */
const state = () => ({
    students: [],
    student: {},
    cursor: {
        prev: [],
        next: ''
    },
    limit: 10
})

/**
 * Mutations for student
 * @type {Object}
 */
const mutations = {
    _assign_students_data,
    _add_student_prev_cursor_data,
    _del_student_prev_cursor_data,
    _set_student_next_cursor_data,
    _set_student_limit_page,
    _set_student_form_data,
    _reset_student_cursor
}

/**
 * Actions for student
 * @type {Object}
 */
const actions = {
    fetchStudents,
    showStudent,
    storeStudent,
    updateStudent,
    deleteStudent
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
 * Assign data students to state
 * @param {*} state
 * @param {*} payload
 */
function _assign_students_data(state, payload) {
    state.students = payload
}

/**
 * Push cursor to state
 * @param {*} state
 * @param {*} payload
 */
function _add_student_prev_cursor_data(state, payload) {
    state.cursor.prev.push(payload)
}

/**
 * Delete cursor from state
 * @param {*} state 
 */
function _del_student_prev_cursor_data(state) {
    state.cursor.prev.pop()
}

/**
 * Set next cursor to state
 * @param {*} state
 * @param {*} payload
 */
function _set_student_next_cursor_data(state, payload) {
    state.cursor.next = payload
}

/**
 * Set limit to state
 * @param {*} state
 * @param {*} payload
 */
function _set_student_limit_page(state, payload) {
    state.limit = payload
}

/**
 * Set single data student
 * @param {*} state
 * @param {*} payload
 */
function _set_student_form_data(state, payload) {
    state.student = payload
}

/**
 * Reset cursor state
 * @param {*} state
 */
function _reset_student_cursor(state) {
    state.cursor = {
        prev: [],
        next: ''
    }
}

/**
 * Get students data
 * @param {*} store
 * @param {Object} params
 */
function fetchStudents({ commit, state }, params = { reverse: false, search: '' }) {
    return new Promise(async (resolve, reject) => {
        try {
            const { reverse, search } = params
            commit('_set_loading', true, { root: true })
            if(reverse) {
                commit('_del_student_prev_cursor_data')
                commit('_set_student_next_cursor_data', state.cursor.prev[state.cursor.prev.length - 1])
            }
            const network = await $axios.get(`${endpoint.fetchData}?q=${search}&limit=${state.limit}&cursor=${state.cursor.next}`)
            if (network.data.success) {
                if(!state.cursor.prev.includes(state.cursor.next)) {
                    commit('_add_student_prev_cursor_data', state.cursor.next)
                }
                commit('_set_student_next_cursor_data', network.headers['x-cursor'])

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
 * Get single student data
 * @param {*} store
 * @param {*} payload
 */
function showStudent({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
        try {
            commit('_set_loading', true, { root: true })
            let network = await $axios.get(`${endpont.getSingleData}${payload}`)

            if (network.data.success) {
                commit('_set_student_form_data', network.data.data)
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
 * Create single student data
 * @param {*} store
 */
function storeStudent({ commit, state }) {
    return new Promise(async (resolve, reject) => {
        try {
            commit('_set_loading', true, { root: true })
            let network = await $axios.post(endpoint.createSingleData, state.student)

            commit('_set_loading', false, { root: true })
            resolve(network.data)
        } catch (error) {
            reject(getError(error))
            commit('_set_loading', false, { root: true })
        }
    })
}

/**
 * Update single student data
 * @param {*} store
 */
function updateStudent({ commit, state }) {
    return new Promise(async (resolve, reject) => {
        try {
            commit('_set_loading', true, { root: true })
            let network = await $axios.put(`${endpoint.updateSingleData}${state.student.id}`, state.student)

            commit('_set_loading', false, { root: true })
            resolve(network.data)
        } catch (error) {
            reject(getError(error))
            commit('_set_loading', false, { root: true })
        }
    })
}

/**
 * Delete single student data
 * @param {*} store
 * @param {int} studentID
 */
function deleteStudent({ commit }, studentID) {
    return new Promise(async (resolve, reject) => {
        try {
            commit('_set_loading', true, { root: true })
            let network = await $axios.delete(`students/${studentID}`)

            commit('_set_loading', false, { root: true })
            resolve(network.data)
        } catch (error) {
            reject(getError(error))
            commit('_set_loading', false, { root: true })
        }
    })
}