<template>
  <div class="container md:mx-auto flex flex-col justify-center space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4">
    <div class="w-full lg:w-3/4 lg:py-4 lg:px-4">
      <div class="bg-white py-2 px-2 border border-gray-300 shadow rounded-t-lg md:mb-2">
        <div class="flex justify-end space-x-2 mb-2">
          <div class="w-4 h-4 bg-red-400 rounded-full cursor-pointer hover:shadow-xl hover:w-8 hover:h-8"></div>
          <div class="w-4 h-4 bg-yellow-400 rounded-full cursor-pointer hover:shadow-xl hover:w-8 hover:h-8"></div>
          <div class="w-4 h-4 bg-green-400 rounded-full cursor-pointer hover:shadow-xl hover:w-8 hover:h-8"></div>
        </div>
        <div class="flex space-x-2">
          <router-link :to="{name: 'academic.classroom.detail', params: {id: $route.params.id} }" class="border-gray-300 border bg-gray-100 text-gray-600 block px-4 flex rounded-lg hover:bg-gray-200 justify-center items-center h-8 text-gray-600">
            Kembali
          </router-link>
        </div>
      </div>
      <div class="flex flex-col md:flex-row md:space-x-2">
        <div class="w-full md:w-1/2 bg-white px-4 py-4 rounded-md border border-gray-300 shadow">
          <div class="bg-white border-2 border-gray-300 rounded-lg px-3 py-2">
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
              <div v-for="(subject, index) in subjects" @click="addSubjectToclassroom(subject)" class="flex items-center justify-start cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-100 rounded-md px-2 py-2 my-2">
                <span class="bg-gray-400 h-2 w-2 m-2 rounded-full"></span>
                <div class="flex-grow font-medium px-2">{{ subject.name }}</div>
              </div>
              <small v-if="subjects === null || subjects.length === 0" class="text-gray-600">Mata pelajaran tidak ditemukan</small>
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/2 bg-white px-4 py-4 rounded-md border border-gray-300 shadow">
          <div class="flex flex-col space-y-2">
            <div class="py-1 px-4 bg-gray-100 rounded-md border-2 border-gray-300 flex items-center justify-between">
              <p class="text-gray-600 font-medium">Matematika</p>
              <button class="h-4 w-4 flex justify-center items-center">&times;</button>
            </div>
            <div class="py-1 px-4 bg-gray-100 rounded-md border-2 border-gray-300 flex items-center justify-between">
              <p class="text-gray-600 font-medium">Pendidikan Agama dan Budi Pekerti</p>
              <button class="h-4 w-4 flex justify-center items-center">&times;</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'AcademicClassroomFormSubject',
  data() {
    return {
      searchSubject: ''
    }
  },
  computed: {
    ...mapState(['isLoading']),
    ...mapState('subject', ['subjects']),
  },
  methods: {
    ...mapActions('subject',['fetchSubjects']),
    fetchDataSubjects() {
      (async () => {
        try {
          await this.fetchSubjects()
        } catch (err) {
          Notify.createNotif({msg: err.message, notif: this.notif})
        }
      })()
    },
    addSubjectToclassroom(subject) {

    }
  },
  mounted() {
    this.fetchDataSubjects()
  }
}
</script>