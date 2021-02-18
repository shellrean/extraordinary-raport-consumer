import { showSweetError } from '@/core/helper/alert.helper'
import { mapState, mapActions } from 'vuex'

/**
 * Vuex states
 * @type {Object}
 */
const vuex_states = {
    ...mapState([
        'isLoading'
    ]),
    ...mapState('academic_classroom', [
        'classrooms'
    ])
}

/**
 * Vuex methods
 * @type {Object} 
 */
const vuex_methods = {
    ...mapActions('academic_classroom', [
        'fetchClassrooms'
    ])
}

/**
 * Vue data
 * @type {Object}
 */
const vue_data ={

}

/**
 * Vue computed
 * @type {Object}
 */
const vue_computed = {

}

/**
 * Vue methods
 * @type {Object}
 */
const vue_methods = {
    showError,
    setMyClassroom,
    fetchDataMyClassroom
}

/**
 * Let's export the module
 * 
 */
export {
    vuex_states,
    vuex_methods,
    vue_data,
    vue_computed,
    vue_methods,
}

/**
 * Show error message use sweetalert
 * @type vue method
 * @param {Axios.response}
 */
function showError(err) {
    showSweetError(this, err)
}

/**
 * Store data classroom to localStorage
 * @type vue-method
 * @param {Object} classroom
 */
function setMyClassroom(classroom) {
    try {
        localStorage.setItem("myclass", JSON.stringify(classroom.data))
    } catch (err) {
        console.log("Not support for local storage")
    }
}
  
/**
 * Fetch the teacher's classroom-academic
 * @type vue-method
 */
async function fetchDataMyClassroom() {
    try {
        const provider = await this.fetchClassrooms()
        this.setMyClassroom(provider)
    } catch (err) {
        if (typeof err.error_code != 'undefined' && err.error_code == 1201) {
            this.fetchDataMyClassroom()
            return
        }
        this.showError(err)
    }
}