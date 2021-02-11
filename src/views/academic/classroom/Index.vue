<template>
  <div class="container md:mx-auto flex flex-col justify-center space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4">
    <div class="w-full lg:w-3/4 lg:py-4 lg:px-4">
      <div class="bg-white py-2 px-2 border border-gray-300 shadow rounded-t-lg">
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
            <input v-model="search" type="text" class="py-1 border-gray-200 border-2 rounded-full px-6 bg-gray-100 w-full focus:ring-0 focus:border-blue-300" placeholder="Cari"/>
          </div>
        </div>
      </div>
      <perfect-scrollbar class="max-h-96 overflow-y-scroll bg-white border border-gray-300 shadow">
        <router-link :to="{name: 'academic.classroom.detail', params: {id: classroom.id}}" class="block bg-white mb-2 transition duration-300 hover:bg-blue-50 cursor-pointer" v-for="(classroom, index) in filteredClassroom" :key="index">
          <div class="flex flex-col sm:flex-row py-2 sm:justify-between sm:items-center">
            <div>
              <div class="px-3 font-semibold text-gray-700">{{ classroom.classroomName }}</div>
              <span class="px-3 text-gray-500 text-sm">{{ classroom.classroomMajor }}</span>
            </div>
            <span class="px-3 text-gray-500 text-sm">{{ classroom.teacherName }}</span>
          </div>
        </router-link>
      </perfect-scrollbar>
      <div class="bg-white py-2 px-2 border border-gray-300 shadow rounded-b-lg mb-2">
        <router-link :to="{name: 'academic.classroom.create'}" class="py-1 px-4 border-blue-300 border bg-blue-100 text-blue-600 rounded-md hover:shadow-md" v-if="!academic_active.archive">Buat kelas akademik</router-link>
      </div>
    </div>
  </div>
</template>
<script>
import HomeIconLine from '@/components/icons/HomeIconLine'
import Notify from '@/core/services/notif.service'
import Message from '@/core/domain/message.domain'
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'AcademicClassroom',
  components: {
    HomeIconLine,
    PerfectScrollbar
  },
  data() {
    return {
      notif: [],
      search: ""
    }
  },
  computed: {
    ...mapState(['isLoading','academic_active']),
    ...mapState('academic_classroom', ['classrooms']),
    filteredClassroom() {
      if(this.classrooms == null) {
        return []
      }
      return this.classrooms.filter((item) => item.classroomName.toLowerCase().includes(this.search.toLowerCase()))
    }
  },
  methods: {
    ...mapActions('academic_classroom', ['fetchClassrooms']),
    showError(err) {
      const error = new Message(err)
      const message = error.getMessage()
      const code = error.getCode()
      const notification = new Notify(code, message)
      notification.sweetAlertNotif(this)
    },
    fetchData() {
      (async() => {
        try {
          await this.fetchClassrooms()
        } catch (err) {
          this.showError(err)
        }
      })()
    }
  },
  created() {
    this.fetchData()
  }
};
</script>