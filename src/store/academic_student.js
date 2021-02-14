import $axios from '@/core/services/api.service.js'
import Message from '@/core/domain/message.domain.js'

/**
 * Freeze endpoint string
 * @type {Object}
 */
const endpoint = Object.freeze({
    fetchByCA: "classroom-students/classroom/",
    createSingleData: "classroom-students/classroom-student",
    copyData: "classroom-students/copy-students",
    deleteSingleData: "classroom-students/classroom-student/"
})

/**
 * State for academic_student
 * @type {Function}
 */
const state = () => ({
    students: [],
    student: {}
})

/**
 * Mutations for academic_student
 * @type {Object}
 */
const mutations = {
    _assign_students_data,
    _set_student_form_data
}

/**
 * Actions for academic_student
 * @type {Object}
 */
const actions = {
    fetchStudentsByClassroomAcademic,
    storeStudent,
    copyStudents,
    deleteStudent,
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
 * Assign list of student to state
 * @param {*} state
 * @param {*} payload
 */
function _assign_students_data(state, payload) {
    state.students = payload
}

/**
 * Assign single student to state
 * @param {*} state 
 * @param {*} payload 
 */
function _set_student_form_data(state, payload) {
    state.student = payload
}

/**
 * Fetch data students by classroom academic
 * @param {*} param0 
 * @param {*} classroomAcademicID 
 */
function fetchStudentsByClassroomAcademic({ commit }, classroomAcademicID) {
    return new Promise(async (resolve, reject) => {
        try {
            commit('_set_loading', true, { root: true })
            const network = await $axios.get(endpoint.fetchByCA+classroomAcademicID)
            if (network.data.success) {
                commit('_assign_students_data', network.data.data == null ? [] : network.data.data)
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
 * Create single data student
 * @param {*} store
 */
function storeStudent({ commit, state }) {
    return new Promise(async (resolve, reject) => {
        try {
            commit('_set_loading', true, { root: true })
            const network = await $axios.post(endpoint.createSingleData, state.student)
        
            commit('_set_loading', false, { root: true })
            resolve(network.data)
        } catch (error) {
            reject(getError(error))
            commit('_set_loading', false, { root: true })
        }
    })
}

/**
 * Copy students to other classroom
 * @param {*} store
 * @param {Object} params
 */
function copyStudents({ commit }, params = {classroomAcademicID: 0, toClassroomAcademicID: 0}) {
    return new Promise(async (resolve, reject) => {
        try {
            commit('_set_loading', true, { root: true })
            const network = await $axios.post(endpoint.copyData, params)
        
            commit('_set_loading', false, { root: true })
            resolve(network.data)
        } catch (error) {
            reject(getError(error))
            commit('_set_loading', false, { root: true })
        }
    })
}

/**
 * Delete single student
 * @param {*} store
 * @param {*} studentAcademicID
 */
function deleteStudent({ commit }, studentAcademicID) {
    return new Promise(async (resolve, reject) => {
        try {
            commit('_set_loading', true, { root: true })
            const network = await $axios.delete(endpoint.deleteSingleData+studentAcademicID)
        
            commit('_set_loading', false, { root: true })
            resolve(network.data)
        } catch (error) {
            reject(getError(error))
            commit('_set_loading', false, { root: true })
        }
    })
}