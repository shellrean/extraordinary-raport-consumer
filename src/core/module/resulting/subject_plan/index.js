import { showSweetError } from '@/core/helper/alert.helper'
import { mapState, mapActions } from 'vuex'

/**
 * Vue data component
 * @type {object}
 */
const vue_data = {
  search: "",
  selected: [],
  classroomName: "",
  classroomSelected: 0,
  dialogClassroom: false,
}

/**
 * Vue computed
 * @type {Object}
 */
const vue_computed = {
  filteredClassroom
}

/**
 * Vue methods
 * @type {Object}
 */
const vue_methods = {
  showError,
  selectAllRows,
  clearSelected,
  fetchDataSubjects,
  fetchDataSubjectPlans,
  fetchDataClassrooms,
  setClassroom,
  getTextType,
  onCheckClick,
  doDeleteDataSubjectPlan,
  deleteDataSubjectPlan,
  doMultipleDeletePlans,
  multipleDeletePlans
}

/**
 * Vuex states
 * @type {Object}
 */
const vuex_states = {
  ...mapState(['isLoading']),
  ...mapState('auth',['authorized_user']),
  ...mapState('subject_plan', ['plans']),
  ...mapState('academic_classroom', ['classrooms']),
  ...mapState('academic_subject', ['subjects']),
}

/**
 * Vuex methods
 * @type {Object}
 */
const vuex_methods = {
  ...mapActions('subject_plan', ['fetchSubjectPlans', 'deleteSubjectPlan', 'deleteSubjectPlans']),
  ...mapActions('academic_classroom', ['fetchClassrooms']),
  ...mapActions('academic_subject', ['fetchSubjects']),
}

/**
 * Export module let's go
 */
export {
  vue_data,
  vue_methods,
  vue_computed,
  vuex_states,
  vuex_methods,
}

/**
 * Filter data subjects to classroom
 * @type vue computed
 * @return {Array}
 */
function filteredClassroom() {
  if (this.subjects == null || this.subjects == undefined) {
    return []
  }
  const result = []
  const map = new Map()
  for (const item of this.subjects) {
    if(!map.has(item.classroomAcademicID)) {
      map.set(item.classroomAcademicID, true);
      result.push(item)
    }
  }
  return result;
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
 * Selected all plans
 * @type vue method
 */
function selectAllRows() {
  this.selected = this.plans.map((item) => item.id)
}

/**
 * Clear selected plans
 * @type vue method
 */
function clearSelected() {
  this.selected = []
}

/**
 * Fetch data subjects from service
 * @type vue method
 */
async function fetchDataSubjects() {
  try {
    await this.fetchSubjects()
  } catch (err) {
    if (typeof err.error_code != 'undefined' && err.error_code == 1201) {
      this.fetchDataSubjects()
      return
    }
    this.showError(err)
  }
}

/**
 * Fetch data subject-plans from service
 * @type vue method
 */
async function fetchDataSubjectPlans() {
  try {
    this.clearSelected()
    await this.fetchSubjectPlans({
      query: this.search,
      teacherID: this.authorized_user.id,
      classroomID: this.classroomSelected,
    })
  } catch (err) {
    if (typeof err.error_code != 'undefined' && err.error_code == 1201) {
      this.fetchDataSubjectPlans()
      return
    }
    this.showError(err)
  }
}

/**
 * Fetch data classrooms-academic
 * @type vue method
 */
async function fetchDataClassrooms() {
  try {
    await this.fetchClassrooms()
  } catch (err) {
    if (typeof err.error_code != 'undefined' && err.error_code == 1201) {
      this.fetchDataClassrooms()
      return
    }
    this.showError(err)
  }
}

/**
 * Set classroom to classroomSelected data
 * @type vue method
 */
function setClassroom(classroom) {
  this.classroomSelected = classroom
}

/**
 * Get text-type 
 * @type vue method
 * @param {*} type
 * @return {String} 
 */
function getTextType(type) {
  const types = {
    "task": "Tugas",
    "evms": "Evaluasi Tengah Semester",
    "evls": "Evaluasi Akhir Semester",
    "exam": "Ulangan"
  }
  return types[type] != 'undefined' ? types[type] : '-'
}

/**
 * Do action when checklist clicked
 * @type vue method
 * @param {$event} e
 */
function onCheckClick(e) {
  if(e.target.checked) {
    this.selected.push(parseInt(e.target.value))
  } else {
    let idx = this.selected.indexOf(parseInt(e.target.value))
    if (idx !== -1) {
      this.selected.splice(idx, 1)
    }
  }
}

/**
 * Do delete data subject plan
 * @type vue method
 * @param {Int} id
 * @param {int} index
 */
async function doDeleteDataSubjectPlan(id, index) {
  try {
    await this.deleteSubjectPlan(id)
    this.$store.state.subject_plan.plans.splice(index, 1)
  } catch (err) {
    if (typeof err.error_code != 'undefined' && err.error_code == 1201) {
      this.doDeleteDataSubjectPlan(id, index)
      return
    }
    this.showError(err)
  }
}

/**
 * Delete data subject-plans
 * @type vue method
 * @param {Int} id
 * @param {Int} index
 */
function deleteDataSubjectPlan(id, index) {
  this.$swal({
    title: 'Peringatan',
    text: "Rencana pembelajaran ini akan dihapus berserta data yang terkait, Pastikan anda belum mengimplementasikan rencana pembelajaran yang dipilih pada penilaian",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#c7c7c7',
    confirmButtonText: 'Iya, Lanjutkan!'
  }).then((result) => { 
    if(result.value) {
      this.doDeleteDataSubjectPlan(id, index)
    }
  })
}

/**
 * Do  multiple delete subject-plans
 * @type vue method
 */
async function doMultipleDeletePlans() {
  try {
    await this.deleteSubjectPlans(this.selected)
    this.fetchDataSubjectPlans()
  } catch (err) {
    if (typeof err.error_code != 'undefined' && err.error_code == 1201) {
      this.doMultipleDeletePlans()
      return
    }
    this.showError(err)
  }
}

/**
 * Multiple delete subject-plans
 * @type vue method
 */
function multipleDeletePlans() {
  this.$swal({
    title: 'Peringatan',
    text: "Rencana pembelajaran yang dipilih akan dihapus berserta data yang terkait, Pastikan anda belum mengimplementasikan rencana pembelajaran yang dipilih pada penilaian",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#c7c7c7',
    confirmButtonText: 'Iya, Lanjutkan!'
  }).then((result) => {
    if(result.value) {
      this.doMultipleDeletePlans()
    }
  })
}