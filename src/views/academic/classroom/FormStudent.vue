<template>
  <div class="container md:mx-auto flex flex-col justify-center space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4">
    <div class="w-full lg:w-3/4 lg:py-4 lg:px-4">
      <div class="bg-white py-2 px-2 border border-gray-300 shadow rounded-t-lg">
        <div class="flex justify-end space-x-2 mb-2">
          <div class="w-4 h-4 bg-red-400 rounded-full cursor-pointer hover:shadow-xl hover:w-8 hover:h-8"></div>
          <div class="w-4 h-4 bg-yellow-400 rounded-full cursor-pointer hover:shadow-xl hover:w-8 hover:h-8"></div>
          <div class="w-4 h-4 bg-green-400 rounded-full cursor-pointer hover:shadow-xl hover:w-8 hover:h-8"></div>
        </div>
        <div class="flex space-x-2">
          <router-link :to="{name: 'academic.classroom.detail', params: {id: $route.params.id} }" class="border-gray-300 border bg-gray-100 text-gray-600 block px-4 flex rounded-lg hover:shadow-lg justify-center items-center h-8 text-gray-600">
            Kembali
          </router-link>
          <button class="border-green-300 border bg-green-100 text-green-600 block px-4 flex rounded-lg hover:shadow-lg justify-center items-center h-8 text-gray-600">
            Salin Siswa
          </button>
        </div>
      </div>
      <div class="flex flex-col md:flex-row">
        <div class="w-full md:w-1/2 bg-white px-4 py-4 border border-gray-300 shadow">
          <div class="bg-white border-2 border-gray-300 rounded-lg px-3 py-2">
            <div class="flex items-center bg-gray-200 rounded-md">
              <div class="pl-2">
                <svg class="fill-current text-gray-500 w-6 h-6" xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24">
                  <path class="heroicon-ui"
                  d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                </svg>
              </div>
              <input v-model="searchStudent" class="w-full rounded-md bg-gray-200 text-gray-700 leading-tight focus:outline-none py-2 px-2" type="text" placeholder="Cari siswa">
            </div>
            <div class="py-3 text-sm">
              <div @click="addStudentToClassroom(student)" v-for="(student, index) in students" class="flex items-center justify-start cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-100 rounded-md px-2 py-2 my-2">
                <span class="bg-gray-400 h-2 w-2 m-2 rounded-full"></span>
                <div class="flex-grow font-medium px-2">{{ student.srn }} <span class="font-normal">{{ student.name }}</span></div>
              </div>
              <small v-if="students === null ? true : students.length === 0" class="text-gray-600">Siswa tidak ditemukan</small>
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/2 bg-white px-4 py-4 border border-gray-300 shadow">
          <div class="flex flex-col space-y-2">
            <div v-for="(student, index) in classroomStudents" :key="index" class="py-1 px-4 bg-gray-100 rounded-md border-2 border-gray-300 flex items-center justify-between">
              <div>
                <p class="text-gray-500">{{student.studentSRN}}/{{student.studentNSRN}}</p>
                <span class="text-gray-600 font-medium">{{student.studentName}}</span>
              </div>
              <button @click="deleteStudentFromClassroom(student.id, index)" class="h-4 w-4 flex justify-center items-center">&times;</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Notify from '@/core/services/notif.service'
import Message from '@/core/domain/message.domain'
import { mapActions, mapState } from 'vuex'
import _ from 'lodash'
export default {
  name: 'AcademicClassroomStudentForm',
  components: {
  },
  data() {
    return {
      notif: [],
      searchStudent: ""
    }
  },
  computed: {
    ...mapState(['isLoading']),
    ...mapState('academic_student', {
      classroomStudents: state => state.students
    }),
    ...mapState('student', ['students', 'student']),
  },
  methods: {
    ...mapActions('academic_classroom', ['showClassroom']),
    ...mapActions('academic_student', ['fetchStudentsByClassroomAcademic', 'storeStudent', 'deleteStudent']),
    ...mapActions('student',['fetchStudents']),
    showError(err) {
      const error = new Message(err)
      const message = error.getMessage()
      const code = error.getCode()
      const notification = new Notify(code, message)
      notification.sweetAlertNotif(this)
    },
    fetchDataStudentsClassroom() {
      (async() => {
        try {
          await this.fetchStudentsByClassroomAcademic(this.$route.params.id)
        } catch (err) {
          this.showError(err)
        }
      })()
    },
    fetchDataStudents() {
      (async() => {
        try {
          this.$store.commit('student/_reset_student_cursor')
          await this.fetchStudents()
        } catch (err) {
          this.showError(err)
        }
      })()
    },
    addStudentToClassroom(student) {
      (async() => {
        try {
          this.$store.state.academic_student.student = {
            classroomAcademicID: parseInt(this.$route.params.id),
            studentID: student.id
          }

          const provider = await this.storeStudent()
          this.$store.state.academic_student.students.push({
            id: provider.data.id,
            classroomAcademicID: provider.data.classroomAcademicID,
            studentID: provider.data.studentID,
            studentSRN: student.srn,
            studentNSRN: student.nsrn,
            studentName: student.name,
          })
        } catch (err) {
          this.showError(err)
        }
      })()
    },
    deleteStudentFromClassroom(id, index) {
      this.$swal({
        title: 'Peringatan',
        text: "Siswa yang dipilih akan dikeluarkan dan akan menghapus data yang terkait",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#c7c7c7',
        confirmButtonText: 'Iya, Lanjutkan!'
      }).then(async (result) => {
        if (result.value) {
          try {
            await this.deleteStudent(id)
            this.$store.state.academic_student.students.splice(index, 1)
          } catch (err) {
            this.showError(err)
          }
        }
      })
    }
  },
  mounted() {
    this.fetchDataStudentsClassroom()
  },
  watch: {
    searchStudent:  _.debounce(async function (value) {
      try {
        this.$store.commit('student/_reset_student_cursor')
        this.fetchStudents({ search: this.searchStudent })
      } catch (err) {
        this.showError(err)
      }
    }, 500)
  }
}
</script>