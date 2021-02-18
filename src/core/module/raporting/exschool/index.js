import { mapState, mapActions } from 'vuex'
import { showSweetError } from '@/core/helper/alert.helper'

/**
 * vuex state
 * @type {Object}
 */
const vuex_states = {
    ...mapState('exschool', [
        'exschools'
    ]),
    ...mapState('exschool', {
        exschool_students: state => state.students
    }),
    ...mapState('academic_student', [
        'students'
    ]),
}

/**
 * vuex methods
 */
const vuex_methods = {
    ...mapActions('exschool', ['fetchExschools']),
    ...mapActions('exschool_student', [
        'fetcByClassroom'
    ]),
    ...mapActions('academic_student', [
        'fetchStudentsByClassroomAcademic'
    ]),
}

/**
 * vue data
 * @type {Object}
 */
const vue_data = {
    myclass: {},
    selectedExschool: {},
    page: 0
}

/**
 * vue computed
 * @type {Object}
 */
const vue_computed = {

}

/**
 * vue methods
 * @type {Object}
 */
const vue_methods = {
    showError,
    fetchDataExschools,
    getMyClassroom,
    fetcDataByClassroom,
    fetchDataStudentByCA
}

/**
 * Let's play the game
 */
export {
    vuex_states,
    vuex_methods,
    vue_data,
    vue_computed,
    vue_methods
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
 * get exschools data
 * @type vue method
 */
async function fetchDataExschools() {
    try {
        await this.fetchExschools()
    } catch (err) {
        if (typeof err.error_code != 'undefined' && err.error_code == 1201) {
            this.fetchDataExschools()
            return
        }
        this.showError(err)
    }
}

/**
 * get exschools student data
 * @type vue method
 * @param {int} classID
 */
async function fetcDataByClassroom(classID) {
    try {
        await this.fetcByClassroom(classID)
    } catch (err) {
        if (typeof err.error_code != 'undefined' && err.error_code == 1201) {
            this.fetcDataByClassroom(classID)
            return
        }
        this.showError(err)
    }
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
 * @type vue method
 */
async function fetchDataStudentByCA() {
    try {
        await this.fetchStudentsByClassroomAcademic(this.myclass.id)
    } catch (err) {
        if (typeof err.error_code != 'undefined' && err.error_code == 1201) {
            this.fetchDataStudentByCA()
            return
        }
        this.showError(err)
    }
}