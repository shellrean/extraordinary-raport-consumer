import { showSweetError } from '@/core/helper/alert.helper'
import { mapActions, mapState } from 'vuex'

/**
 * Vue data
 * @type {Object}
 */
const vue_data = {
  searchSubject: '',
  searchTeacher: '',
  modalSubject: false,
  modalTeacher: false,
  subject: {},
  teacher: {},
  mgn: 75,
  notif: [],
  formCopy: false,
  searchAcademic: "",
  searchClassroom: "",
  academic: {},
  classroom: {},
  modalAcademic: false,
  modalClassAcademic: false,
}

/**
 * Vue computed
 * @type {Object}
 */
const vue_computed = {
  filteredAcademic,
  filteredClassroom,
}

/**
 * Vue methods
 * @type {Object}
 */
const vue_methods = {
  showError,
  fetchDataSubjectsClassroom,
  fetchDataSubjects,
  getDataSubject,
  setSubject,
  setTeacher,
  createDataSubject,
  updateDataSubject,
  submit,
  doDeleteSubjectFromClassroom,
  deleteSubjectFromClassroom,
  clearForm,
  setAcademik,
  setClassroom,
  doCopyClassroomSubject,
  copyClassroomSsubject,
  fetchDataClassroomByAcademic,
  fetchDataUsers,
}

/**
 * Vuex states
 * @type {Object}
 */
const vuex_states = {
  ...mapState([
    'isLoading'
  ]),
  ...mapState('subject', [
    'subjects'
  ]),
  ...mapState('user', [
    'users',
    'user'
  ]),
  ...mapState('academic_subject', {
    classroomSubjects: state => state.subjects
  }),
  ...mapState('academic', [
    'academics'
  ]),
  ...mapState('academic_classroom', [
    'classrooms'
  ]),
}

/**
 * Vuex methods
 * @type {Object}
 */
const vuex_methods = {
  ...mapActions('subject',[
    'fetchSubjects'
  ]),
  ...mapActions('user',[
    'fetchUsers', 
    'showUser'
  ]),
  ...mapActions('academic_classroom', [
    'fetchClassroomsByAcademic'
  ]),
  ...mapActions('academic_subject', [
    'fetchSubjectsByClassroomAcademic', 
    'storeSubject', 
    'showSubject', 
    'deleteSubject', 
    'updateSubject', 
    'copySubjects'
  ]),
}

/**
 * Let's export the module
 */
export {
  vue_data,
  vue_computed,
  vue_methods,
  vuex_states,
  vuex_methods
}

/**
 * Filtered academic in search
 * @type vue-computed
 * @return {Array}
 */
function filteredAcademic() {
  if(this.academics == null) {
    return []
  }
  return this.academics.filter((item) => item.name.toLowerCase().includes(this.searchAcademic.toLowerCase()))
}

/**
 * Filtered classroom in search
 * @type vue-computed
 * @return {Array}
 */
function filteredClassroom() {
  if(this.classrooms == null) {
    return []
  }
  return this.classrooms.filter((item) => item.classroomName.toLowerCase().includes(this.searchClassroom.toLowerCase()) && item.id != this.$route.params.id)
}

/**
 * Show sweet error message
 * @type vue-method
 * @param {Error} error
 */
function showError(err) {
  showSweetError(this, err)
}

/**
 * Fetch data subject-classroom
 * @type vue-method
 */
async function fetchDataSubjectsClassroom() {
  try {
    await this.fetchSubjectsByClassroomAcademic(this.$route.params.id)
  } catch (err) {
    if (typeof err.error_code != 'undefined' && err.error_code == 1201) {
      this.fetchDataSubjectsClassroom()
      return
    }
    this.showError(err)
  }
}

/**
 * Fetch data subjects
 * @type vue-method
 */
async function fetchDataSubjects() {
  try {
    await this.fetchSubjects()
  } catch (err) {
    if (typeof err.error_code != 'undefined' && err.error_code == 1201) {
      this.fetchDataSubjects()
    }
    this.showError(err)
  }
}

/**
 * Get data subjects by id
 * @type vue-method
 * @param {Int} id
 */
async function getDataSubject(id) {
  try {
    await this.showSubject(id)
    await this.showUser(this.$store.state.academic_subject.subject.teacherID)
    const indexSubject = this.subjects.map((item) => item.id)
      .indexOf(this.$store.state.academic_subject.subject.subjectID)
    if (indexSubject !== -1) {
      this.subject = this.subjects[indexSubject]
    }
    this.teacher = this.user
    this.mgn = this.$store.state.academic_subject.subject.mgn
  } catch (err) {
    if (typeof err.error_code != 'undefined' && err.error_code == 1201) {
      this.getDataSubject(id)
      return
    }
    this.showError(err)
  }
}

/**
 * set subject to data
 * @type vue-method
 * @param {Object} subject
 */
function setSubject(subject) {
  this.subject = subject
  this.modalSubject = false
}

/**
 * Set teacher to data
 * @type vue-method
 * @param {Object} teacher
 */
function setTeacher(teacher) {
  this.teacher = teacher
  this.modalTeacher = false
}

/**
 * Create new data subject
 * @type vue-method
 */
async function createDataSubject() {
  try {
    this.$store.state.academic_subject.subject = {
      classroomAcademicID: parseInt(this.$route.params.id),
      subjectID: this.subject.id,
      teacherID: this.teacher.id,
      mgn: parseInt(this.mgn),
    }
    const provider = await this.storeSubject()
    this.$store.state.academic_subject.subjects.push({
      id: provider.id,
      classroomAcademicID: provider.classroomAcademicID,
      subjectID: provider.subjectID,
      teacherID: provider.teacherID,
      subjectName: this.subject.name,
      teacherName: this.teacher.name,
      mgn: this.mgn,
    })
    this.clearForm()
  } catch (err) {
    if (typeof err.error_code != 'undefined' && err.error_code == 1201) {
      this.createDataSubject()
      return
    }
    this.showError(err)
  }
}

/**
 * Update data subject
 * @type vue-method
 */
async function updateDataSubject() {
  try {
    this.$store.state.academic_subject.subject = {
      id: this.$store.state.academic_subject.subject.id,
      classroomAcademicID: parseInt(this.$route.params.id),
      subjectID: this.subject.id,
      teacherID: this.teacher.id,
      mgn: parseInt(this.mgn),
    }
    const provider = await this.updateSubject()
    const index = this.classroomSubjects.map((item) => item.id)
      .indexOf(this.$store.state.academic_subject.subject.id)
    if (index !== -1) {
      const subjects = this.$store.state.academic_subject.subjects
      subjects[index].subjectID =  this.subject.id
      subjects[index].teacherID = this.teacher.id
      subjects[index].subjectName = this.subject.name
      subjects[index].teacherName = this.teacher.name
      subjects[index].mgn = this.mgn
    }
    this.clearForm()
  } catch (err) {
    if (typeof err.error_code != 'undefined' && err.error_code == 1201) {
      this.updateDataSubject()
      return
    }
    this.showError(err)
  }
}

/**
 * Submit form data
 * @type vue-method
 */
function submit() {
  if(typeof this.$store.state.academic_subject.subject.id == 'undefined') {
    this.createDataSubject()
  } else {
    this.updateDataSubject()
  }
}

/**
 * Do delete subject from classroom
 * @type vue-method
 * @param {Int} id
 * @param {Int} index
 */
async function doDeleteSubjectFromClassroom(id, index) {
  try {
    await this.deleteSubject(id)
    this.$store.state.academic_subject.subjects.splice(index, 1)
  } catch (err) {
    if (typeof err.error_code != 'undefined' && err.error_code == 1201) {
      this.doDeleteSubjectFromClassroom(id, index)
      return
    }
    this.showError(err)
  }
}

/**
 * Delete subject from classroom
 * @type vue-method
 * @param {Int} id
 * @param {Int} index
 */
function deleteSubjectFromClassroom(id, index) {
  this.$swal({
    title: 'Peringatan',
    text: "Mata pelajran yang dipilih akan dikeluarkan dan akan menghapus data yang terkait",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#c7c7c7',
    confirmButtonText: 'Iya, Lanjutkan!'
  }).then((result) => {
    if (result.value) {
      this.doDeleteSubjectFromClassroom(id, index)
    }
  })
}

/**
 * Clear form data
 * @type vue-method
 */
function clearForm() {
  this.modalSubject = false
  this.modalTeacher = false
  this.subject = {}
  this.teacher = {}
  this.mgn = 75
  this.$store.state.academic_subject.subject = {}
}

/**
 * Set academic to data
 * @type vue-method
 */
function setAcademik(academic) {
  this.academic = academic
  this.modalAcademic = false
}

/**
 * Set classroom to data
 * @type vue-method
 */
function setClassroom(classroom) {
  this.classroom = classroom
  this.modalClassAcademic = false
}

/**
 * Do copy classroom subject
 * @type vue-method
 */
async function doCopyClassroomSubject() {
  try {
    await this.copySubjects({
      classroomAcademicID: this.classroom.id,
      toClassroomAcademicID: parseInt(this.$route.params.id),
    })
    this.classroom = {}
    this.academic = {}
    this.formCopy = false
    this.fetchDataSubjectsClassroom()
  } catch (err) {
    if (typeof err.error_code != 'undefined' && err.error_code == 1201) {
      this.doCopyClassroomSubject()
      return
    }
    this.showError(err)
  }
}

/**
 * Copy classroom subject
 * @type vue-methods
 */
function copyClassroomSsubject() {
  this.$swal({
    title: 'Informasi',
    text: "Mata pelajaran pada kelas akademik yang dipilih akan disalin ke kelas ini, aksi ini tidak mencegah duplikasi, cek kembali setelah data diterima. Tindakan ini tidak akan menghapus data yang sudah ada sebelumnya",
    icon: 'info',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#c7c7c7',
    confirmButtonText: 'Iya, Lanjutkan!'
  }).then(async (result) => {
    if(result.value) {
      this.doCopyClassroomSubject()
    }
  })
}

/**
 * Fetch data classroom by academic
 * @type vue-method
 */
async function fetchDataClassroomByAcademic() {
  try {
    await this.fetchClassroomsByAcademic(this.academic.id)
  } catch (err) {
    if (typeof err.error_code != 'undefined' && err.error_code == 1201) {
      this.fetchDataClassroomByAcademic()
      return
    }
    this.showError(err)
  }
}

/**
 * Fetch data users
 * @type vue-method
 */
async function fetchDataUsers() {
  try {
    this.$store.commit('user/_reset_user_cursor')
    this.fetchUsers({ search: this.searchTeacher })
  } catch (err) {
    if (typeof err.error_code != 'undefined' && err.error_code == 1201) {
      this.fetchDataUsers()
      return
    }
    this.showError(err)
  }
}