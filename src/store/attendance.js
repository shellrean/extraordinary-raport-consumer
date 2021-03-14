import $axios from '@/core/services/api.service'
import Message from '@/core/domain/message.domain.js'

/**
 * states for "attendance"
 * @type object
 */
const state = () => ({
    attendances: []
})

/**
 * mutations for "attendance"
 * @type object
 */
const mutations = {
    _assign_data_attendances(state, payload) {
        state.attendances = payload
    }
}

/**
 * actions for "attendance"
 * @type object
 */
const actions = {
    fetchAttendances,
    storeAttendance
}

/**
 * let's play the game
 * 
 */
export default{
    namespaced: true,
    state,
    mutations,
    actions,
}

/**
 * Get error data
 * @param object error 
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
 * get attendances data
 * @param object store
 * @param int classroomId
 */
function fetchAttendances({ commit }, classroomId) {
    return new Promise(async (v,t) => {
        try {
            commit('_set_loading', true, { root: true })
            const network = await $axios.get(`attendances/${classroomId}`)
            if (network.data.success) {
                if (network.data.data != null) {
                    commit('_assign_data_attendances', network.data.data)
                }
            }
            commit('_set_loading', false, { root: true })
            v(network.data)
        } catch (e) {
            t(getError(e))
            commit('_set_loading', false, { root: true })
        }
    })
}

/**
 * create attendance data
 * @param object store
 * @param object attendance
 */
function storeAttendance({ commit }, attendance) {
    return new Promise(async (v,t) => {
        try {
            commit('_set_loading', true, { root: true })
            const network = await $axios.post(`attendances/`, attendance)
            commit('_set_loading', false, { root: true })
            v(network.data)
        } catch (e) {
            t(getError(e))
            commit('_set_loading', false, { root: true })
        }
    })
}