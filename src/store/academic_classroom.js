import $axios from '@/core/services/api.service.js'
import Message from '@/core/domain/message.domain.js'

/**
 * Freeze endpoint string
 * @return {Object}
 */
const endpoint = Object.freeze({
    fetchData: "classroom-academics/",
    fetchDataByAcademic: "classroom-academics/academic/",
    getSingleData: "classroom-academics/classroom-academic/",
    storeSingleData: "classroom-academics/classroom-academic",
    updateSigleData: "classroom-academics/classroom-academic",
    deleteSingleData: "classroom-academics/classroom-academic/"
})

/**
 * State for store
 * @param {*} error 
 */
const state = () => ({
    classrooms: [],
    classroom: {}
})

/**
 * Mutations for store
 * @param {*} error 
 */
const mutations = {
    _assign_classrooms_data,
    _set_classroom_form_data,
}

/**
 * Actions for store
 * @param {*} error 
 */
const actions = {
    fetchClassrooms,
    fetchClassroomsByAcademic,
    showClassroom,
    storeClassroom,
    updateClassroom,
    deleteClassroom
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
 * Assign data classrooms to state
 * @param {*} state 
 * @param {*} payload 
 */
function _assign_classrooms_data(state, payload) {
    state.classrooms = payload
}

/**
 * Assign single data classroom to state
 * @param {*} state 
 * @param {*} payload 
 */
function _set_classroom_form_data(state, payload) {
    state.classroom = payload
}

/**
 * Fetch classrooms academic
 * @param {*} param0 
 */
function fetchClassrooms({ commit }) {
    return new Promise(async (resolve, reject) => {
        try {
            commit('_set_loading', true, { root: true })
            const network = await $axios.get(endpoint.fetchData)
            if (network.data.success) {
                commit('_assign_classrooms_data', network.data.data)
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
 * Fetch classroom by academic year
 * @param {*} store
 * @param {*} academicID
 */
function fetchClassroomsByAcademic({ commit }, academicID) {
    return new Promise(async (resolve, reject) => {
        try {
            commit('_set_loading', true, { root: true })
            const network = await $axios.get(endpoint.fetchDataByAcademic+academicID)
            if (network.data.success) {
                commit('_assign_classrooms_data', network.data.data)
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
 * Get single classroom academic
 * @param {*} store
 * @param {int} classroomID
 */
function showClassroom({ commit}, classroomID) {
    return new Promise(async (resolve, reject) => {
        try {
            commit('_set_loading', true, { root: true })
            const network = await $axios.get(endpoint.getSingleData+classroomID)
            if (network.data.success) {
                commit('_set_classroom_form_data', network.data.data)
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
 * Create single classroom academic
 * @param {*} store
 */
function storeClassroom({ commit, state }) {
    return new Promise(async (resolve, reject) => {
        try {
            commit('_set_loading', true, { root: true })
            const network = await $axios.post(endpoint.storeSingleData, state.classroom)
            
            commit('_set_loading', false, { root: true })
            resolve(network.data)
        } catch (error) {
            reject(getError(error))
            commit('_set_loading', false, { root: true })
        }
    })
}

/**
 * Update single classroom academic
 * @param {*} store
 */
function updateClassroom({ commit, state }) {
    return new Promise(async (resolve, reject) => {
        try {
            commit('_set_loading', true, { root: true })
            const network = await $axios.put(endpoint.updateSigleData+state.classroom.id, state.classroom)
            
            if (network.data.success) {
                commit('_set_classroom_form_data', network.data.data)
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
 * Delete single classroom academic
 * @param {*} store
 * @param {int} classroomAcademicID
 */
function deleteClassroom({ commit }, classroomAcademicID) {
    return new Promise(async (resolve, reject) => {
        try {
            commit('_set_loading', true, { root: true })
            const network = await $axios.delete(endpoint.deleteSingleData+classroomAcademicID)
            
            commit('_set_loading', false, { root: true })
            resolve(network.data)
        } catch (error) {
            reject(getError(error))
            commit('_set_loading', false, { root: true })
        }
    })
}