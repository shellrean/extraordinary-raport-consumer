import $axios from '@/core/services/api.service.js'
import Message from '@/core/domain/message.domain.js'

class SubjectPlan {
    constructor() {
        this.endpoint = Object.freeze({
            fetchData: "classroom-subject-plans/",
            createData: "classroom-subject-plans/classroom-subject-plan",
            updateData: "classroom-subject-plans/classroom-subject-plan",
            deleteData: "classroom-subject-plans/classroom-subject-plan/",
        })
    }

    /**
     * Register states
     * @return Object
     */
    registerStates() {
        return () => ({
            plans: [],
            plan: {}
        })
    }

    /**
     * Register actions
     * @return Object
     */
    registerMutations() {
        return Object.freeze({
            _assign_plans_data: this._assign_plans_data,
        })
    }
    
    /**
     * Register actions
     * @return Object
     */
    registerActions() {
        return Object.freeze({
            fetchSubjectPlans: this.fetchSubjectPlans,
            createSubjectPlan: this.createSubjectPlan,
            updateSubjectPlan: this.updateSubjectPlan,
            deleteSubjectPlan: this.deleteSubjectPlan,
        })
    } 
    /**
     * Get error data
     * @param {*} error 
     */
    getError(error) {
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
    _assign_plans_data(state, payload) {
        state.plans = payload
    }

    /**
     * Fetch "subject plans" data
     * @type actions
     * 
     * @param {*} commit 
     * @param {*} payload 
     */
    fetchSubjectPlans({ commit }, payload = {query: "", teacherID: 0, classroomID: 0}) {
        return new Promise(async (resolve, reject) => {
            try {
                const network = await $axios.post(this.endpoint.fetchData, payload,{
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
     * Create new "subject plans"
     * @type actions
     * 
     * @param {*} commit 
     * @param {*} payload
     */
    createSubjectPlan({ commit }, payload) {
        return new Promise(async (resolve, reject) => {
            try {
                const network = await $axios.post(this.endpoint.createData, payload, {
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
    updateSubjectPlan({ commit }, payload) {
        return new Promise(async (resolve, reject) => {
            try {
                const network = await $axios.put(this.endpoint.createData, payload, {
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
    deleteSubjectPlan({ commit }, planID) {
        return new Promise(async (resolve, reject) => {
            try {
                const network = await $axios.delete(this.endpoint.deleteData+planID, {
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
}

const object = new SubjectPlan()

export default {
    namespaced: true,
    states: object.registerStates(),
    mutations: object.registerMutations(),
    actions: object.registerActions(),
}