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
            Salin Matpel
          </button>
        </div>
      </div>
      <div class="flex flex-col md:flex-row">
        <div class="w-full md:w-1/2 bg-white px-4 py-4 border border-gray-300 shadow">
          <form @submit.prevent="submit" >
          <div class="mb-4">
            <label for="" class="text-xs font-semibold text-gray-500 px-1">KKM</label>
            <div class="flex">
              <input required v-model.int="mgn" type="number" class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="KKM" required="" :readonly="isLoading">
            </div>
          </div>
          <div class="mb-4">
            <label for="" class="text-xs font-semibold text-gray-500 px-1">Mata Pelajaran</label>
            <div class="flex" v-if="!modalSubject">
              <input required @click="modalSubject = true" readonly v-model="subject.name" type="text" class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="Nama Matpel" required="">
            </div>
            <div class="bg-white border-2 border-gray-300 rounded-lg px-3 py-2" v-if="modalSubject">
              <div class="flex justify-end space-x-2 mb-2">
                <div @click="modalSubject = false" class="w-4 h-4 bg-red-400 rounded-full cursor-pointer hover:shadow-xl hover:w-8 hover:h-8"></div>
                <div @click="modalSubject = false" class="w-4 h-4 bg-yellow-400 rounded-full cursor-pointer hover:shadow-xl hover:w-8 hover:h-8"></div>
                <div @click="modalSubject = false" class="w-4 h-4 bg-green-400 rounded-full cursor-pointer hover:shadow-xl hover:w-8 hover:h-8"></div>
              </div>
              <div class="flex items-center bg-gray-200 rounded-md">
                <div class="pl-2">
                  <svg class="fill-current text-gray-500 w-6 h-6" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24">
                    <path class="heroicon-ui"
                    d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                  </svg>
                </div>
                <input v-model="searchSubject" class="w-full rounded-md bg-gray-200 text-gray-700 leading-tight focus:outline-none py-2 px-2" type="text" placeholder="Cari mata pelajaran">
              </div>
              <div class="py-3 text-sm">
                <div v-for="(subject, index) in subjects" @click="setSubject(subject)" class="flex items-center justify-start cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-100 rounded-md px-2 py-2 my-2">
                  <span class="bg-gray-400 h-2 w-2 m-2 rounded-full"></span>
                  <div class="flex-grow font-medium px-2">{{ subject.name }}</div>
                </div>
                <small v-if="subjects === null || subjects.length === 0" class="text-gray-600">Mata pelajaran tidak ditemukan</small>
              </div>
            </div>
          </div>
          <div class="mb-4">
            <label for="" class="text-xs font-semibold text-gray-500 px-1">Guru</label>
            <div class="flex" v-if="!modalTeacher">
              <input required @click="modalTeacher = true" readonly v-model="teacher.name" type="text" class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="Nama guru" required="">
            </div>
            <div class="bg-white border-2 border-gray-300 rounded-lg px-3 py-2" v-if="modalTeacher">
              <div class="flex justify-end space-x-2 mb-2">
                <div @click="modalTeacher = false" class="w-4 h-4 bg-red-400 rounded-full cursor-pointer hover:shadow-xl hover:w-8 hover:h-8"></div>
                <div @click="modalTeacher = false" class="w-4 h-4 bg-yellow-400 rounded-full cursor-pointer hover:shadow-xl hover:w-8 hover:h-8"></div>
                <div @click="modalTeacher = false" class="w-4 h-4 bg-green-400 rounded-full cursor-pointer hover:shadow-xl hover:w-8 hover:h-8"></div>
              </div>
              <div class="flex items-center bg-gray-200 rounded-md">
                <div class="pl-2">
                  <svg class="fill-current text-gray-500 w-6 h-6" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24">
                    <path class="heroicon-ui"
                    d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                  </svg>
                </div>
                <input v-model="searchTeacher" class="w-full rounded-md bg-gray-200 text-gray-700 leading-tight focus:outline-none py-2 px-2" type="text" placeholder="Cari mata pelajaran">
              </div>
              <div class="py-3 text-sm">
                <div v-for="(user, index) in users" @click="setTeacher(user)" class="flex items-center justify-start cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-100 rounded-md px-2 py-2 my-2 ">
                  <span class="bg-gray-400 h-2 w-2 m-2 rounded-full"></span>
                  <div class="flex-grow font-medium px-2">{{ user.name }}</div>
                </div>
                <small v-if="users === null || users.length === 0" class="text-gray-600">Guru tidak ditemukan</small>
              </div>
            </div>
          </div>
          <div class="flex space-x-2">
            <button type="submit" :disabled="isLoading" class="border-green-500 border-2 bg-green-400 text-white px-4 flex rounded-lg hover:shadow-lg justify-center items-center h-8 font-medium">
              Simpan
            </button>
            <button @click="clearForm" type="button" v-if="typeof $store.state.academic_subject.subject.id != 'undefined'" class="border-gray-300 border bg-gray-100 text-gray-600 block px-4 flex rounded-lg hover:shadow-lg justify-center items-center h-8 text-gray-600">
              Batal
            </button>
          </div>
          </form>
        </div>
        <div class="w-full md:w-1/2 bg-white px-4 py-4 border border-gray-300 shadow">
          <div class="flex flex-col space-y-2">
            <div v-for="(subject, index) in classroomSubjects" class="py-1 px-4 bg-gray-50 rounded-md border-2 border-gray-300 flex items-center justify-between">
              <div class="items-center flex">
                <div class="mr-2">
                  <p class="text-4xl font-medium text-green-600">{{ subject.mgn }}</p>
                </div>
                <div>
                  <p class="text-gray-500">{{ subject.teacherName }}</p>
                  <span class="text-gray-600 font-medium">{{ subject.subjectName }}</span>
                </div>
              </div>
              <div class="flex items-center">
                <button @click="getDataSubject(subject.id)" class="flex text-xs py-1 px-3 hover:bg-gray-300 rounded-full justify-center items-center">Edit</button>
                <button @click="deleteSubjectFromClassroom(subject.id, index)" class="h-4 w-4 flex justify-center items-center">&times;</button>
              </div>
            </div>  
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import Notify from '@/core/services/notif.service'
import Message from '@/core/domain/message.domain'
import _ from 'lodash'

export default {
  name: 'AcademicClassroomFormSubject',
  components: {
  },
  data() {
    return {
      searchSubject: '',
      searchTeacher: '',
      modalSubject: false,
      modalTeacher: false,
      subject: {},
      teacher: {},
      mgn: 75,
      notif: [],
    }
  },
  computed: {
    ...mapState(['isLoading']),
    ...mapState('subject', ['subjects']),
    ...mapState('user', ['users','user']),
    ...mapState('academic_subject', {
      classroomSubjects: state => state.subjects
    }),
  },
  methods: {
    ...mapActions('subject',['fetchSubjects']),
    ...mapActions('user',['fetchUsers', 'showUser']),
    ...mapActions('academic_subject', ['fetchSubjectsByClassroomAcademic', 'storeSubject', 'showSubject', 'deleteSubject', 'updateSubject']),
    showError(err) {
      const error = new Message(err)
      const message = error.getMessage()
      const code = error.getCode()
      const notification = new Notify(code, message)
      notification.sweetAlertNotif(this)
    },
    fetchDataSubjectsClassroom() {
      (async() => {
        try {
          await this.fetchSubjectsByClassroomAcademic(this.$route.params.id)
        } catch (err) {
          this.showError(err)
        }
      })()
    },
    fetchDataSubjects() {
      (async () => {
        try {
          await this.fetchSubjects()
        } catch (err) {
          this.showError(err)
        }
      })()
    },
    getDataSubject(id) {
      (async () => {
        try {
          await this.showSubject(id)
          await this.showUser(this.$store.state.academic_subject.subject.teacherID)
          const indexSubject = this.subjects.map((item) => item.id).indexOf(this.$store.state.academic_subject.subject.subjectID)
          if (indexSubject !== -1) {
            this.subject = this.subjects[indexSubject]
          }
          this.teacher = this.user
          this.mgn = this.$store.state.academic_subject.subject.mgn
        } catch (err) {
          this.showError(err)
        }
      })()
    },
    addSubjectToclassroom(subject) {

    },
    setSubject(subject) {
      this.subject = subject
      this.modalSubject = false
    },
    setTeacher(teacher) {
      this.teacher = teacher
      this.modalTeacher = false
    },
    submit() {
      if(typeof this.$store.state.academic_subject.subject.id == 'undefined') {
        (async () => {
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
            this.showError(err)
          }
        })()
      } else {
        (async () => {
          try {
            this.$store.state.academic_subject.subject = {
              id: this.$store.state.academic_subject.subject.id,
              classroomAcademicID: parseInt(this.$route.params.id),
              subjectID: this.subject.id,
              teacherID: this.teacher.id,
              mgn: parseInt(this.mgn),
            }

            const provider = await this.updateSubject()

            const index = this.classroomSubjects.map((item) => item.id).indexOf(this.$store.state.academic_subject.subject.id)
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
            this.showError(err)
          }
        })()
      }
    },
    deleteSubjectFromClassroom(id, index) {
      this.$swal({
        title: 'Peringatan',
        text: "Mata pelajran yang dipilih akan dikeluarkan dan akan menghapus data yang terkait",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#c7c7c7',
        confirmButtonText: 'Iya, Lanjutkan!'
      }).then(async (result) => {
        if (result.value) {
          try {
            await this.deleteSubject(id)
            this.$store.state.academic_subject.subjects.splice(index, 1)
          } catch (err) {
            this.showError(err)
          }
        }
      })
    },
    clearForm() {
      this.modalSubject = false
      this.modalTeacher = false
      this.subject = {}
      this.teacher = {}
      this.mgn = 75
      this.$store.state.academic_subject.subject = {}
    }
  },
  mounted() {
    this.fetchDataSubjects()
    this.fetchDataSubjectsClassroom()
  },
  watch: {
    searchTeacher:  _.debounce(async function (value) {
      try {
        this.$store.commit('user/_reset_user_cursor')
        this.fetchUsers({ search: this.searchTeacher })
      } catch (err) {
        this.showError(err)
      }
    }, 500),
  }
}
</script>