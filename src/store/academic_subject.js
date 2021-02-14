import $axios from '@/core/services/api.service.js'
import Message from '@/core/domain/message.domain.js'

/**
 * List of endpoint
 * @type {Object}
 */
const endpoint = Object.freeze({
    fetchData: "classroom-subjects/",
    fetchByCA: "classroom-subjects/classroom/",
    createSingleData: "classroom-subjects/classroom-subject",
    copyData: "classroom-subjects/copy-subjects",
    updateSingleData: "classroom-subjects/classroom-subject/",
    getSingleData: "classroom-subjects/classroom-subject/",
    deleteSingleData: "classroom-subjects/classroom-subject/"
})

/**
 * State for academic_subject
 * @type {function}
 */
const state = () => ({
    subjects: [],
    subject: {}
})

/**
 * Mutations for academic_subject
 * @type {object}
 */
const mutations = {
    _assign_subjects_data,
    _set_subject_form_data
}

/**
 * Actions for academic_subject
 * @type {object}
 */
const actions = {
    fetchSubjects,
    fetchSubjectsByClassroomAcademic,
    storeSubject,
    copySubjects,
    updateSubject,
    showSubject,
    deleteSubject
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
 * Assign subjects data to state
 * @param {*} state
 * @param {*} payload
 */
function _assign_subjects_data(state, payload) {
    state.subjects = payload
}

/**
 * Assign single subject to state
 * @param {*} state
 * @param {*} payload
 */
function _set_subject_form_data(state, payload) {
    state.subject = payload
}

/**
 * Get data subjects
 * @param {*} store
 */
function fetchSubjects({ commit }) {
    return new Promise(async (resolve, reject) => {
        try {
            commit('_set_loading', true, { root: true })
            const network = await $axios.get(endpoint.fetchData)
            if (network.data.success) {
                commit('_assign_subjects_data', network.data.data == null ? [] : network.data.data)
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
 * Get data subjects by classroom academic
 * @param {*} store
 * @param {*} classroomAcademicID
 */
function fetchSubjectsByClassroomAcademic({ commit }, classroomAcademicID) {
    return new Promise(async (resolve, reject) => {
        try {
            commit('_set_loading', true, { root: true })
            const network = await $axios.get(endpoint.fetchByCA+classroomAcademicID)
            if (network.data.success) {
                commit('_assign_subjects_data', network.data.data == null ? [] : network.data.data)
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
 * Create single subject
 * @param {*} store
 */
function storeSubject({ commit, state }) {
    return new Promise(async (resolve, reject) => {
        try {
            commit('_set_loading', true, { root: true })
            const network = await $axios.post(endpoint.createSingleData, state.subject)
        
            commit('_set_loading', false, { root: true })
            resolve(network.data)
        } catch (error) {
            reject(getError(error))
            commit('_set_loading', false, { root: true })
        }
    })
}

/**
 * Copy subject to other classroom
 * @param {*} store
 * @param {*} params
 */
function copySubjects({ commit }, params = {classroomAcademicID: 0, toClassroomAcademicID: 0}) {
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
 * Update single subject
 * @param {*} store
 */
function updateSubject({ commit, state }) {
    return new Promise(async (resolve, reject) => {
        try {
            commit('_set_loading', true, { root: true })
            const network = await $axios.put(endpoint.updateSingleData+state.subject.id, state.subject)
        
            commit('_set_loading', false, { root: true })
            resolve(network.data)
        } catch (error) {
            reject(getError(error))
            commit('_set_loading', false, { root: true })
        }
    })
}

/**
 * Get single data subject
 * @param {*} store
 * @param {*} academicSubjectID
 */
function showSubject({ commit }, academicSubjectID) {
    return new Promise(async (resolve, reject) => {
        try {
            commit('_set_loading', true, { root: true })
            const network = await $axios.get(endpoint.getSingleData+academicSubjectID)
            
            if (network.data.success) {
                commit('_set_subject_form_data', network.data.data == null ? {} : network.data.data)
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
 * Delete single data subject
 * @param {*} store
 * @param {*} academicSsubjectID
 */
function deleteSubject({ commit }, academicSubjectID) {
    return new Promise(async (resolve, reject) => {
        try {
            commit('_set_loading', true, { root: true })
            const network = await $axios.delete(endpoint.deleteSingleData+academicSubjectID)
            
            if (network.data.success) {
                commit('_set_subject_form_data', network.data.data == null ? {} : network.data.data)
            }

            commit('_set_loading', false, { root: true })
            resolve(network.data)
        } catch (error) {
            reject(getError(error))
            commit('_set_loading', false, { root: true })
        }
    })
}