import $axios from '@/core/services/api.service.js'
import Message from '@/core/domain/message.domain.js'

/**
 * Freeze endpoint string
 * @return {Object}
 */
const endpoint = Object.freeze({
    fetchData: "classroom-subject-plans/",
    createData: "classroom-subject-plans/classroom-subject-plan",
    getSingleData: "classroom-subject-plans/classroom-subject-plan/",
    updateData: "classroom-subject-plans/classroom-subject-plan",
    deleteData: "classroom-subject-plans/classroom-subject-plan/",
    deleteMultiData: "classroom-subject-plans/delete"
})

/**
 * State for store
 * @param {*} error 
 */
const state = () => ({
    plans: [],
    plan: {}
})

/**
 * Mutations for store
 * @param {*} error 
 */
const mutations = {
    _assign_plans_data,
    _assign_plan_data,
}

/**
 * Actions for store
 * @param {*} error 
 */
const actions = {
    fetchSubjectPlans,
    getSubjectPlan,
    createSubjectPlan,
    updateSubjectPlan,
    deleteSubjectPlan,
    deleteSubjectPlans,
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
 * Assign data to state "plans"
 * @type mutations
 * 
 * @param {*} state
 * @param {*} payload
 */
function _assign_plans_data(state, payload) {
    state.plans = payload
}

/**
 * Assign data to state "plan"
 * @param {*} state
 * @param {*} payload 
 */
function _assign_plan_data(state, payload) {
    state.plan = payload
}

/**
 * Fetch "subject plans" data
 * @type actions
 * 
 * @param {*} commit 
 * @param {*} payload 
 */
function fetchSubjectPlans({ commit }, payload = {query: "", teacherID: 0, classroomID: 0}) {
    return new Promise(async (resolve, reject) => {
        try {
            const network = await $axios.post(endpoint.fetchData, payload,{
                before: () => {
                    commit('_set_loading', true, { root: true })
                }
            })
            if (network.data.success) {
                commit('_assign_plans_data', network.data.data)
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
 * Get single "subject plan" data
 * @param {*} store
 * @param {*} subjectPlanID
 */
function getSubjectPlan({ commit }, subjectPlanID) {
    return new Promise(async (resolve, reject) => {
        try {
            const network = await $axios.get(endpoint.getSingleData+subjectPlanID,{
                before: () => {
                    commit('_set_loading', true, { root: true })
                }
            })
            if (network.data.success) {
                commit('_assign_plan_data', network.data.data)
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
 * Create new "subject plans"
 * @type actions
 * 
 * @param {*} commit 
 * @param {*} payload
 */
function createSubjectPlan({ commit, state }) {
    return new Promise(async (resolve, reject) => {
        try {
            const network = await $axios.post(endpoint.createData, state.plan, {
                before: () => {
                    commit('set_loading', true, { root: true })
                }
            })
            commit('_set_loading', false, { root: true })
            resolve(network.data)
        } catch (error) {
            reject(getError(error))
            commit('_set_loading', false, { root: true })
        }
    })
}

/**
 * Update "subject plans"
 * @type actions
 * 
 * @param {*} commit
 * @param {*} payload
 */
function updateSubjectPlan({ commit, state }) {
    return new Promise(async (resolve, reject) => {
        try {
            const network = await $axios.put(endpoint.createData, state.plan, {
                before: () => {
                    commit('set_loading', true, { root: true })
                }
            })
            commit('_set_loading', false, { root: true })
            resolve(network.data)
        } catch (error) {
            reject(getError(error))
            commit('_set_loading', false, { root: true })
        }
    })
}

/**
 * Delete "subject plans"
 * @type actions
 * 
 * @param {*} commit
 * @param {*} planID
 */
function deleteSubjectPlan({ commit }, planID) {
    return new Promise(async (resolve, reject) => {
        try {
            const network = await $axios.delete(endpoint.deleteData+planID, {
                before: () => {
                    commit('set_loading', true, { root: true })
                }
            })
            commit('_set_loading', false, { root: true })
            resolve(network.data)
        } catch (error) {
            reject(getError(error))
            commit('_set_loading', false, { root: true })
        }
    })
}

/**
 * Delete multiple "subject plans"
 * @param {*} store
 * @param {Array} ids
 */
function deleteSubjectPlans({ commit }, ids = []) {
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