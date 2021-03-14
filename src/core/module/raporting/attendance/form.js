import { mapState, mapActions } from 'vuex'
import { showSweetError } from '@/core/helper/alert.helper'
import _ from 'lodash'

/**
 * vuex states
 * @type object
 */
const vuex_states = {
    ...mapState(['isLoading']),
    ...mapState('academic_student', ['students']),
    ...mapState('attendance', ['attendances'])
}

/**
 * vuex methods
 * @type object
 */
const vuex_methods = {
    ...mapActions('academic_student', [
        'fetchStudentsByClassroomAcademic',
    ]),
    ...mapActions('attendance', [
        'fetchAttendances',
        'storeAttendance'
    ])
}

/**
 * vue data
 * @type object
 */
const vue_data = {
    myclass: {},
}

/**
 * vue computed
 * @type object
 */
const vue_computed = {
    studentAttendances
}

/**
 * vue methods
 * @type object
 */
const vue_methods = {
    showError,
    getMyClassroom,
    fetchDataStudents,
    fetchDataAttendances,
    getNumberValue,
    storeDataAttendance,
    onInput: _.debounce(function (obj) {
        this.storeDataAttendance(obj)
    }, 300),
}

/**
 * let's play the game
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
 * @param object err
 */
function showError(err) {
    showSweetError(this, err)
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

/**
 * student attendance
 * @type vue-computed
 */
function studentAttendances() {
    if (!this.students) {
        return []
    }
    return this.students
}

/**
 * get student number attendance
 * @type vue-method
 */
function getNumberValue(studentID, type) {
    if (this.attendances == null || typeof this.attendances == 'undefined') {
      return 0
    }
    const find = this.attendances.filter((item) => item.studentID == studentID && item.type == type)
    if (find.length > 0){
      return find[0].total
    }
}

/**
 * store data student attendance
 * @type vue-method
 * @param object obj
 */
async function storeDataAttendance(obj) {
    try {
        const provider = await this.storeAttendance({
            studentID: obj.studentID,
            type: obj.type,
            total: obj.total
        })
        if(this.attendances != null) {
            const exist = this.attendances.filter((item) => item.studentID == obj.studentID && item.type == obj.type)
            if (exist.length > 0) {
                const idx = this.attendances.map((item) => item.id).indexOf(exist[0].id)
                if (idx != -1) {
                    this.$store.state.attendance.attendances[idx].total = provider.data.total
                }
            } else {
                this.$store.state.attendance.attendances.push({
                    id: provider.data.id,
                    studentID: provider.data.studentID,
                    type: provider.data.type,
                    total: provider.data.total
                })
            }
        } else {
            this.$store.state.attendance.attendances = [{
                id: provider.data.id,
                studentID: provider.data.studentID,
                type: provider.data.type,
                total: provider.data.total
            }]
        }
    } catch (e) {
        console.log(e)
        if (typeof e.error_code != 'undefined' && e.error_code == 1201) {
            this.storeDataAttendance()
            return 
        }
        this.showError(e)
    }
}

/**
 * fetch data attendances
 * @type vue-method
 */
async function fetchDataAttendances() {
    try {
        await this.fetchAttendances(this.myclass.id)
    } catch (e) {
        if (typeof e.error_code != 'undefined' && e.error_code == 1201) {
            this.fetchDataAttendances()
            return 
        }
        this.showError(e)
    }
}