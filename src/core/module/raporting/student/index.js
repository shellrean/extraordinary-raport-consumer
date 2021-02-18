import { showSweetError } from '@/core/helper/alert.helper'
import { mapState, mapActions } from 'vuex'

/**
 * Vuex states
 * @type {Object}
 */
const vuex_states = {
    ...mapState('academic_student', ['students']),
}

/**
 * Vuex methods
 * @type {Object}
 */
const vuex_methods = {
    ...mapActions('academic_student', [
        'fetchStudentsByClassroomAcademic',
    ])
}

/**
 * Vue data
 * @type {Object}
 */
const vue_data = {
    myclass: {},
    search: ""
}

/**
 * Vue computed
 * @type {Object}
 */
const vue_computed = {
    filteredStudent
}

/**
 * Vue methods
 * @type {Object}
 */
const vue_methods = {
    showError,
    getMyClassroom,
    fetchDataStudents
}

/**
 * Let's export the game
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
 * @param {Object}
 */
function showError(err) {
    showSweetError(this, err)
}

/**
 * Get filtered student
 * @type vue computed
 */
function filteredStudent() {
    if (this.students == null) {
        return []
    }

    return this.students.filter((item) => item.studentName.toLowerCase().includes(this.search.toLowerCase()) || item.studentSRN.includes(this.search))
}

/**
 * Get the teacher's classroom
 * @type vue-method
 */
function getMyClassroom() {
    const classrooms = JSON.parse(localStorage.getItem("myclass"))
    if (typeof classrooms != 'undefined' && classrooms.length > 0) {
        this.myclass = classrooms[0]
        return
    }
    this.$router.replace({name: 'raporting.index'})
}

/**
 * Get the classroom's student
 * @type vue-method
 */
async function fetchDataStudents() {
    try {
        await this.fetchStudentsByClassroomAcademic(this.myclass.id)
    } catch (err) {
        if (typeof err.error_code != 'undefined' && err.error_code == 1201) {
            this.fetchDataStudents()
            return 
        }
        this.showError(err)
    }
}