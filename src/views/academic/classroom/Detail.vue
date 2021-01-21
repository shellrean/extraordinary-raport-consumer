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
          <router-link :to="{name: 'academic.classroom' }" class="border-gray-300 border bg-gray-100 text-gray-600 block px-4 flex rounded-lg hover:bg-gray-200 justify-center items-center h-8 text-gray-600">
            Kembali
          </router-link>
        </div>
      </div>
      <div class="grid md:grid-cols-2 md:gap-4 md:mb-2">
        <div class="max-h-96 overflow-y-scroll rounded-md bg-white py-4 px-4 border border-gray-300 shadow">
          <header class="mb-1 flex justify-between">
            <p class="font-medium text-gray-600">Mata Pelajan </p> 
            <router-link :to="{name: 'academic.classroom.subject'}" class="hover:shadow-lg font-normal text-xs py-1 px-4 rounded-full bg-blue-100 text-blue-600">Edit</router-link>
          </header>
          <input type="text" class="border-2 border-gray-200 mb-2 py-1 rounded-full px-6 bg-gray-100 w-full focus:ring-2" placeholder="Cari"/>

          <div class="flex items-center justify-start cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-100 rounded-md px-2 py-2 my-2">
            <span class="bg-gray-400 h-2 w-2 m-2 rounded-full"></span>
            <div class="flex-grow text-sm font-medium px-2">Bahasa Indonesia</div>
          </div>
        </div>
        <div class="max-h-96 overflow-y-scroll rounded-md bg-white py-4 px-4 border border-gray-300 shadow">
          <header class="mb-1 flex justify-between">
            <p class="font-medium text-gray-600">Siswa Kelas </p> 
            <a href="#" class="hover:shadow-lg font-normal text-xs py-1 px-4 rounded-full bg-blue-100 text-blue-600">Edit</a>
          </header>
          <input type="text" class="border-2 border-gray-200 mb-2 py-1 rounded-full px-6 bg-gray-100 w-full focus:ring-2" placeholder="Cari"/>

          <div class="flex items-center justify-start cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-100 rounded-md px-2 py-2 my-2">
            <span class="bg-gray-400 h-2 w-2 m-2 rounded-full"></span>
            <div class="flex-grow text-sm font-medium px-2">1012023 - Shellrean Bramasta Raditya Reihandina</div>
          </div>
        </div>
      </div>
      <div class="bg-white py-2 px-2 border border-gray-300 shadow rounded-b-lg mb-2">
        <div class="flex flex-col md:flex-row md:space-x-2 justify-between flex-1 items-center">
          <div>
            <div class="flex items-center">
              <span class="bg-blue-400 h-2 w-2 m-2"></span>
              <span class="text-sm">Jumlah siswa 30</span>
            </div>
            <div class="flex items-center">
              <span class="bg-blue-400 h-2 w-2 m-2"></span>
              <span class="text-sm">Jumlah mata pelajaran 30</span>
            </div>
          </div>
          <div class="flex space-x-2">
            <button class="text-sm py-1 px-4 border-green-300 border bg-green-100 text-green-600 rounded-full hover:shadow-md">
              Edit kelas
            </button>  
            <button @click="deleteClassroom" class="text-sm py-1 px-4 border-red-300 border bg-red-100 text-red-600 rounded-full hover:shadow-md">
              Hapus kelas
            </button>  
          </div>
        </div>
      </div>
    </div>
    <div class="absolute left-4 bottom-4 xl:left-10 xl:bottom-10">
      <div class="flex flex-col space-y-2">
        <Notif :msg="val.msg" v-for="val in notif" :key="val.id"/>
      </div>
    </div>
  </div>
</template>
<script>
import Notif from '@/components/nano/Notif'
import Notify from '@/core/services/notif.service'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'AcademicClassroomDetail',
  components: {
    Notif,
  },
  data() {
    return {
      notif: [],
      search_subject: "",
      search_student: ""
    }
  },
  computed: {
    ...mapState(['isLoading']),
    ...mapState('academic_classroom', ['classroom']),
  },
  methods: {
    ...mapActions('academic_classroom', ['showClassroom']),
    fetchSingleDataClassroom() {
      (async() => {
        try {
          await this.showClassroom(this.$route.params.id)
        } catch (err) {
          Notify.createNotif({msg: err.message, notif: this.notif})
        }
      })()
    },
    deleteClassroom() {
      this.$swal({
        title: 'Peringatan',
        text: "Kelas ini akan dihapus berserta data yang terkait",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#c7c7c7',
        confirmButtonText: 'Iya, Lanjutkan!'
      }).then(async (result) => {

      })
    }
  },
  mounted() {
    this.fetchSingleDataClassroom()
  },
  destroyed() {
    this.$store.state.academic_classroom.classroom = {}
  }
}
</script>