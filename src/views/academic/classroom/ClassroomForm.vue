<template>
  <div>
    <div class="mb-4">
      <label for="" class="text-xs font-semibold text-gray-500 px-1">Kelas</label>
      <div class="flex">
        <select v-model="classroom.classroomID" class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" required :readonly="isLoading">
          <option v-for="(cr, index) in classrooms" :value="cr.id" :key="index">{{ cr.name }}-{{ cr.grade }}</option>
        </select> 
      </div>
    </div>
    <div class="mb-4">
      <label for="" class="text-xs font-semibold text-gray-500 px-1">Wali kelas</label>
      <div class="flex" v-if="!show_modal_teacher">
        <input @click="show_modal_teacher = true" readonly v-model="teacher.name" type="text" class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="Nama" required="">
      </div>
      <div class="bg-white border-2 border-gray-300 rounded-lg px-3 py-2" v-if="show_modal_teacher">
        <div class="flex items-center bg-gray-200 rounded-md">
          <div class="pl-2">
            <svg class="fill-current text-gray-500 w-6 h-6" xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24">
              <path class="heroicon-ui"
              d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
            </svg>
          </div>
          <input v-model="search_teacher" class="w-full rounded-md bg-gray-200 text-gray-700 leading-tight focus:outline-none py-2 px-2" type="text" placeholder="Cari guru">
        </div>
        <div class="py-3 text-sm">
          <div v-for="(user, index) in users" @click="setTeacher(user)" class="flex items-center justify-start cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-100 rounded-md px-2 py-2 my-2">
            <span class="bg-gray-400 h-2 w-2 m-2 rounded-full"></span>
            <div class="flex-grow font-medium px-2">{{ user.name }}</div>
          </div>
          <small v-if="users === null || users.length === 0" class="text-gray-600">Pengguna tidak ditemukan</small>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { showSweetError } from '@/core/helper/alert.helper'
import { mapActions, mapState } from 'vuex'
import _ from 'lodash'

export default {
  name: 'ClassroomForm',
  components: {
  },
  data() {
    return {
      notif: [],
      search_teacher: '',
      teacher: {},
      show_modal_teacher: false
    }
  },
  computed: {
    ...mapState(['isLoading', 'academic_active']),
    ...mapState('classroom', ['classrooms']),
    ...mapState('academic_classroom',['classroom']),
    ...mapState('user', ['users']),
  },
  methods: {
    ...mapActions('classroom',['fetchClassrooms']),
    ...mapActions('user',['fetchUsers', 'showUser']),
    ...mapActions('academic_classroom', ['showClassroom']),
    showError(err) {
      showSweetError(this, err)
    },
    fetchDataClassrooms() {
      (async () => {
        try {
          await this.fetchClassrooms()
        } catch (err) {
          this.showError(err)
        }
      })()
    },
    fetchDataTeachers() {
      (async () => {
        try {
          this.$store.commit('user/_reset_user_cursor')
          await this.fetchUsers()
        } catch (err) {
          this.showError(err)
        }
      })()
    },
    setTeacher(user) {
      this.teacher = user
      this.show_modal_teacher = false
    }
  },
  mounted() {
    this.fetchDataClassrooms()
    this.fetchDataTeachers()
    if(this.$route.name == 'academic.classroom.edit') {
      (async() => {
        try {
          await this.showClassroom(this.$route.params.id)
          const provider = await this.showUser(this.$store.state.academic_classroom.classroom.teacherID)
          this.teacher = provider.data
        } catch (err) {
          this.showError(err)
        }
      })()
    }
  },
  watch: {
    search_teacher:  _.debounce(async function (value) {
      try {
        this.$store.commit('user/_reset_user_cursor')
        this.fetchUsers({ search: this.search_teacher })
      } catch (err) {
        this.showError(err)
      }
    }, 500),
    teacher(val) {
      this.$store.state.academic_classroom.classroom.teacherID = val.id
    }
  }
}
</script>