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
          <router-link :to="{name: 'academic.classroom' }" class="border-gray-300 border bg-gray-100 text-gray-600 block px-4 flex rounded-lg hover:shadow-lg justify-center items-center h-8 text-gray-600">
            Kembali
          </router-link>
        </div>
      </div>
      <div class="grid md:grid-cols-2">
        <perfect-scrollbar class="max-h-96 overflow-y-scroll bg-white py-4 px-4 border border-gray-300 shadow">
          <ClassroomSubject />
        </perfect-scrollbar>
        <perfect-scrollbar class="max-h-96 overflow-y-scroll bg-white py-4 px-4 border border-gray-300 shadow">
          <ClassroomStudent />
        </perfect-scrollbar>
      </div>
      <div class="bg-white py-2 px-2 border border-gray-300 shadow rounded-b-lg mb-2">
        <div class="flex flex-col md:flex-row md:space-x-2 justify-between flex-1 items-center">
          <div>
            <div class="flex items-center">
              <span class="bg-blue-400 h-2 w-2 m-2"></span>
              <span class="text-sm">Jumlah siswa {{ students == null ? 0 : students.length }}</span>
            </div>
            <div class="flex items-center">
              <span class="bg-blue-400 h-2 w-2 m-2"></span>
              <span class="text-sm">Jumlah mata pelajaran {{ subjects == null ? 0 : subjects.lengt }}</span>
            </div>
          </div>
          <div class="flex space-x-2" v-if="!academic_active.archive">
            <router-link :to="{name: 'academic.classroom.edit', params: {id: $route.params.id}}" class="text-sm py-1 px-4 border-green-300 border bg-green-100 text-green-600 rounded-full hover:shadow-md">
              Edit kelas
            </router-link>  
            <button @click="deleteDataClassroom" class="text-sm py-1 px-4 border-red-300 border bg-red-100 text-red-600 rounded-full hover:shadow-md">
              Hapus kelas
            </button>  
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ClassroomStudent from './ClassroomStudent'
import ClassroomSubject from './ClassroomSubject'
import { showSweetError } from '@/core/helper/alert.helper'
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'AcademicClassroomDetail',
  components: {
    ClassroomStudent,
    ClassroomSubject,
    PerfectScrollbar
  },
  data() {
    return {
      notif: [],
      search_subject: "",
      search_student: ""
    }
  },
  computed: {
    ...mapState(['academic_active','isLoading']),
    ...mapState('academic_classroom', ['classroom']),
    ...mapState('academic_student', ['students']),
    ...mapState('academic_subject', ['subjects']),
  },
  methods: {
    ...mapActions('academic_classroom', ['showClassroom', 'deleteClassroom']),
    ...mapActions('academic_student', ['fetchStudentsByClassroomAcademic']),
    ...mapActions('academic_subject', ['fetchSubjectsByClassroomAcademic']),
    showError(err) {
      showSweetError(this, err)
    },
    fetchSingleDataClassroom() {
      (async() => {
        try {
          await this.showClassroom(this.$route.params.id)
        } catch (err) {
          if (typeof err.error_code != 'undefined' && err.error_code == 1201) {
            this.fetchSingleDataClassroom()
            return
          }
          this.showError(err)
        }
      })()
    },
    fetchDataStudentsClassroom() {
      (async() => {
        try {
          await this.fetchStudentsByClassroomAcademic(this.$route.params.id)
        } catch (err) {
          if (typeof err.error_code != 'undefined' && err.error_code == 1201) {
            this.fetchDataStudentsClassroom()
            return
          }
          this.showError(err)
        }
      })()
    },
    fetchDataSubjectsClassroom() {
      (async() => {
        try {
          await this.fetchSubjectsByClassroomAcademic(this.$route.params.id)
        } catch (err) {
          if (typeof err.error_code != 'undefined' && err.error_code == 1201) {
            this.fetchDataSubjectsClassroom()
            return
          }
          this.showError(err)
        }
      })()
    },
    doDeleteClassroom() {
      (async() => {
        try {
          await this.deleteClassroom(this.$route.params.id)
          this.$router.push({name: 'academic.classroom'})
        } catch (err) {
          if (typeof err.error_code != 'undefined' && err.error_code == 1201) {
            this.doDeleteClassroom()
            return
          }
          this.showError(err)
        }
      })()
    },
    deleteDataClassroom() {
      this.$swal({
        title: 'Peringatan',
        text: "Kelas ini akan dihapus berserta data yang terkait",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#c7c7c7',
        confirmButtonText: 'Iya, Lanjutkan!'
      }).then((result) => {
        if(result.value) {
          this.doDeleteClassroom()
        }
      })
    }
  },
  mounted() {
    this.fetchSingleDataClassroom()
    this.fetchDataStudentsClassroom()
    this.fetchDataSubjectsClassroom()
  },
  destroyed() {
    this.$store.state.academic_classroom.classroom = {}
  }
}
</script>