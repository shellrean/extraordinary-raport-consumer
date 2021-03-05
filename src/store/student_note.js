import $axios from '@/core/services/api.service'
import Message from '@/core/domain/message.domain.js'

/**
 * List of endpoint
 * @type Object
 */
const endpoint = Object.freeze({
    createSingleData: "student-notes/student-note",
    dataByClassroom: "student-notes/classroom/"
})

/**
 * State of "student_note"
 * @type Object
 */
const state = () => ({
    notes: []
})

/**
 * Mutations of "student_note"
 * @type Object
 */
const mutations = {
    _assign_notes_data
}

/**
 * Actions of "student_note"
 * @type Object
 */
const actions = {
    storeStudentNote,
    getStudentNoteByTypeClassroom
}

/**
 * Let's play the game
 * @type Object
 */
export default {
    namespaced: true,
    state,
    mutations,
    actions
}
/**
 * Assign data notes to state 
 * @param {*} state
 * @param {*} payload
 */
function _assign_notes_data(state, payload) {
    state.notes = payload
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
 * Store data 
 * @param {*} store
 * @param {
 *      type: Number
 *      studentID: Number
 *      note: String
 * } payload
 */
function storeStudentNote({ commit }, payload) {
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
 * retreive data student note 
 * by classroom
 * @param {
 *      type: Number,
 *      classroomID: Number
 * } payload
 */
function getStudentNoteByTypeClassroom({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
        try {
            commit('_set_loading', true, { root: true })
            let network = await $axios.get(`${endpoint.dataByClassroom}${payload.classroomID}?type=${payload.type}`)
            if (network.data.success) {
                commit('_assign_notes_data', network.data.data)
            }
            commit('_set_loading', false, { root: true })
            resolve(network.data)
        } catch (error) {
            reject(getError(error))
            commit('_set_loading', false, { root: true })
        }
    })
}