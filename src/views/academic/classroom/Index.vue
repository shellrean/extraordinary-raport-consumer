<template>
  <div class="container md:mx-auto flex flex-col justify-center space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4">
    <div class="w-full lg:w-3/4 lg:py-4 lg:px-4">
      <div class="bg-white py-2 px-2 border border-gray-300 shadow rounded-t-lg mb-2">
        <div class="flex justify-end space-x-2 mb-2">
          <div class="w-4 h-4 bg-red-400 rounded-full cursor-pointer hover:shadow-xl hover:w-8 hover:h-8"></div>
          <div class="w-4 h-4 bg-yellow-400 rounded-full cursor-pointer hover:shadow-xl hover:w-8 hover:h-8"></div>
          <div class="w-4 h-4 bg-green-400 rounded-full cursor-pointer hover:shadow-xl hover:w-8 hover:h-8"></div>
        </div>
        <div class="flex space-x-4">
          <router-link :to="{name: 'academic.index' }" class="block w-8 flex rounded-full hover:bg-gray-200 justify-center items-center h-8 text-gray-600">
            <HomeIconLine class="mx-auto"/>
          </router-link>
          <div class="flex-1">
            <input v-model="search" type="text" class="py-1 rounded-full px-6 bg-gray-100 w-full focus:ring-2" placeholder="Cari"/>
          </div>
        </div>
      </div>
      <div class="max-h-96 overflow-y-scroll">
        <div class="bg-white mb-2 border border-gray-300 shadow rounded-lg transition duration-500 hover:shadow-xl cursor-pointer" v-for="classroom in filteredClassroom">
          <div class="flex flex-col sm:flex-row py-2 sm:justify-between sm:items-center">
            <div>
              <div class="px-3 font-semibold text-gray-700">{{ classroom.classroomName }}</div>
              <span class="px-3 text-gray-500 text-sm">{{ classroom.classroomMajor }}</span>
            </div>
            <span class="px-3 text-gray-500 text-sm">{{ classroom.teacherName }}</span>
          </div>
        </div>
      </div>
      <div class="bg-white py-2 px-2 border border-gray-300 shadow rounded-b-lg mb-2">
        <router-link :to="{name: 'academic.classroom.create'}" class="py-1 px-4 border-gray-300 border bg-gray-100 text-gray-600 rounded-md hover:shadow-md">Buat kelas akademik</router-link>
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
import HomeIconLine from '@/components/icons/HomeIconLine'
import Notif from '@/components/nano/Notif'
import Notify from '@/core/services/notif.service'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'AcademicClassroom',
  components: {
    Notif,
    HomeIconLine,
  },
  data() {
    return {
      notif: [],
      search: ""
    }
  },
  computed: {
    ...mapState(['isLoading']),
    ...mapState('academic_classroom', ['classrooms']),
    filteredClassroom() {
      return this.classrooms.filter((item) => item.classroomName.toLowerCase().includes(this.search.toLowerCase()))
    }
  },
  methods: {
    ...mapActions('academic_classroom', ['fetchClassrooms']),
    fetchData() {
      (async() => {
        try {
          await this.fetchClassrooms()
        } catch (err) {
          Notify.createNotif({msg: err.message, notif: this.notif})
        }
      })()
    }
  },
  created() {
    this.fetchData()
  }
};
</script>