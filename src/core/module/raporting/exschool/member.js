import { mapState, mapActions } from 'vuex'
import { showSweetError } from '@/core/helper/alert.helper'

/**
 * vuex state
 * @type {Object}
 */
const vuex_state = {
    ...mapState('exschool_student', {
        exschool_students: state => state.students
    }),
    ...mapState('academic_student', [
        'students'
    ]),
}

/**
 * vuex methods
 * @type {Object}
 */
const vuex_methods = {
    ...mapActions('exschool_student', [
        'storeStudent',
        'deleteStudent'
    ])
}

/**
 * vue data
 * @type {Object}
 */
const vue_data = {
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
    isMember,
    showError,
    storeDataMember,
    deleteDataMember,
    onCheckMember,
}

/**
 * Let's play the game
 */
export {
    vuex_state,
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
 * Check if the given data is a member
 * @type vue method
 * @param {int} exID
 * @param {int} sID
 * @return {bool}
 */
function isMember(exID, sID) {
    if (this.exschool_students == null) {
        return false
    }
    const members = this.exschool_students.filter((item) => item.exschoolID == exID && item.studentID == sID)
    if (members.length > 0) {
        return true
    }
}

/**
 * Create new data member
 * @type vue method
 * @param {Object} member
 */
async function storeDataMember(member) {
    try {
        const network = await this.storeStudent(member)
        const finds = this.exschool_students.filter((item) => item.exschoolID == member.exschoolID && item.studentID == member.studentID)
        if (finds.length < 1) {
            this.$store.state.exschool_student.students.push(network.data)
        }
    } catch (err) {
        if (typeof err.error_code != 'undefined' && err.error_code == 1201) {
            this.storeDataMember(member)
            return
        }
        this.showError(err)
    }
}

/**
 * Delete data member
 * @type vue method
 * @param {int} memberID
 */
async function deleteDataMember(memberID) {
    try {
        await this.deleteStudent(memberID)
        const finds = this.exschool_students.filter((item) => item.id == memberID)
        if (finds.length > 0) {
            const index = this.exschool_students.map((item) => item.id).indexOf(finds[0].id)
            if (index != -1) {
                this.$store.state.exschool_student.students.splice(index, 1)
            }
        }
    } catch (err) {
        if (typeof err.error_code != 'undefined' && err.error_code == 1201) {
            this.storeDataMember(memberID)
            return
        }
        this.showError(err)
    }
}

/**
 * Check when member doing input checkbox
 * @param {*} e 
 */
function onCheckMember(e) {
    if (e.target.checked) {
        this.storeDataMember({
            exschoolID: this.exschool.id,
            studentID:  parseInt(e.target.value)
        })
    } else {
        const finds = this.exschool_students.filter((item) => item.exschoolID ==this.exschool.id && item.studentID == parseInt(e.target.value))
        if (finds.length > 0) {
            this.deleteDataMember(finds[0].id)
        }
    }
}