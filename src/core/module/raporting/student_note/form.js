import { showSweetError } from '@/core/helper/alert.helper'
import { mapState, mapActions } from 'vuex'
import _ from 'lodash'

/**
 * Vuex states
 * @type Object
 */
const vuex_states = {
    ...mapState(['isLoading']),
    ...mapState('academic_student', ['students']),
    ...mapState('student_note', ['notes']),
}

/**
 * Vuex methods
 * @type Object
 */
const vuex_methods = {
    ...mapActions('academic_student', [
        'fetchStudentsByClassroomAcademic',
    ]),
    ...mapActions('student_note', [
        'storeStudentNote',
        'getStudentNoteByTypeClassroom',
    ])
}

/**
 * Vue data
 * @type {Object}
 */
const vue_data = {
    myclass: {},
    search: "",
    note_type: ""
}

/**
 * Vue computed
 * @type {Object}
 */
const vue_computed = {
    studentsNotes
}

/**
 * Vue methods
 * @type {Object}
 */
const vue_methods = {
    showError,
    getMyClassroom,
    fetchDataStudents,
    storeDataStudentNote,
    getDataStudentNoteByTypeClassroom,
    getStudentNote,
    onInput: _.debounce(function (value, index) {
        this.storeDataStudentNote(value, index)
    }, 500)
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
 * Store data student note
 * @type vue-method
 */
async function storeDataStudentNote(value, index) {
    try {
        if(isNaN(value.type)) {
            this.$swal('Heii.','Pilih tipe catatan terlebih dahulu', "error")
            return
        }
        const provider = await this.storeStudentNote(value)
    } catch (err) {
        if (typeof err.error_code != 'undefined' && err.error_code == 1201) {
            this.storeDataStudentNote(payload)
            return
        }
        this.showError(err)
    }
}

/**
 * Get data student note by classroom
 * @type vue-method
 */
async function getDataStudentNoteByTypeClassroom() {
    try {
        if(isNaN(parseInt(this.note_type))) {
            this.$swal('Heii.','Pilih tipe catatan terlebih dahulu', "error")
            return
        }

        await this.getStudentNoteByTypeClassroom({
            type: this.note_type,
            classroomID: this.myclass.id,
        })
    } catch (err) {
        if (typeof err.error_code != 'undefined' && err.error_code == 1201) {
            this.getDataStudentNoteByTypeClassroom(payload)
            return
        }
        this.showError(err)
    }
}

function studentsNotes() {
    if (!this.students) {
        return []
    }
    return this.students.map((item) => ({
        ...item,
        note: this.getStudentNote(item.id)
    }))
}

/**
 * Get student's note
 * @type vue-method
 */
function getStudentNote(id) {
    if(!this.notes) {
        return ""
    }
    const note = this.notes.filter((item) => item.studentID == id)
    if (note.length > 0) {
        return note[0].note
    }
    return ""
}