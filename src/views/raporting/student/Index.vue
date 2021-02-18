<template>
  <div class="container md:mx-auto flex flex-col justify-center space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4">
    <div class="w-full lg:w-3/4 lg:py-4 lg:px-4">
      <div class="bg-white border border-gray-300 shadow rounded-t-lg rounded-b-lg">
        <div class="pt-4 pb-2 px-2 flex justify-between border-b border-gray-300 mb-2">
          <div>
            <p class="font-medium text-gray-700 px-2">Siswa kelas</p>
          </div>
          <div class="flex justify-end space-x-2 mb-2">
            <router-link :to="{name:'raporting.index'}" class="block w-4 h-4 bg-red-400 rounded-full cursor-pointer hover:shadow-xl hover:w-8 hover:h-8"></router-link>
            <div class="w-4 h-4 bg-yellow-400 rounded-full cursor-pointer hover:shadow-xl hover:w-8 hover:h-8"></div>
            <div class="w-4 h-4 bg-green-400 rounded-full cursor-pointer hover:shadow-xl hover:w-8 hover:h-8"></div>
          </div>
        </div>
        <div class="px-2">
          <div class="flex space-x-4">
            <div class="flex-1">
              <input type="text" v-model="search" class="py-1 border-gray-200 border-2 rounded-md px-4 bg-gray-100 focus:ring-0 focus:border-blue-300" placeholder="Cari"/>
            </div>
          </div>
        </div>
        <div class="py-4">
          <div class="hidden sm:flex px-2 flex-col border-t border-b py-2 border-gray-300 sm:flex-row py-1 justify-between sm:items-center border-gray-300">
            <div class="sm:px-1 flex items-center">
              <div class="flex items-center">
                <div class="pr-2 sm:pr-0 w-10 font-medium text-gray-600 text-sm">
                  NO
                </div>
                <p class="sm:px-2 font-medium text-gray-600 text-sm">INFO SISWA</p>
              </div>
            </div>
            <div class="flex space-x-1 pr-2 border-t md:border-0 border-gray-200 pt-2 md:pt-0">
              <p class="sm:px-3 font-medium text-gray-600 text-sm">AKSI</p>
            </div>
          </div>
          <perfect-scrollbar class="max-h-96 overflow-y-scroll">
            <div class="hover:bg-gray-50 p-1 sm:p-0 mb-1 border-b border-gray-200" v-for="(student, index) in filteredStudent" :key="student.id">
              <div class="flex flex-col sm:flex-row py-1 justify-between sm:items-center">
                <div class="px-2 sm:px-1 flex items-start">
                  <div class="hidden sm:block pl-2 pr-2 sm:pr-0 w-10 font-medium text-gray-600 text-sm">
                    {{ index+1 }}
                  </div>
                  <div class="flex flex-col">
                    <p class="sm:px-3 text-xs text-gray-700">{{ student.studentSRN }} | {{ student.studentNSRN }}</p>
                    <p class="sm:px-3 text-gray-700">{{ student.studentName }}</p>
                  </div>
                </div>
                <div class="flex space-x-1 pr-2 border-t md:border-0 border-gray-200 pt-2 md:pt-0">
                  <button class="py-1 px-4 text-sm rounded-md bg-gray-50 text-gray-600 border-gray-300 border hover:shadow-md">Detail</button>
                </div>
              </div>
            </div>
          </perfect-scrollbar>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'
import {
  vuex_states,
  vuex_methods,
  vue_data,
  vue_computed,
  vue_methods,
} from '@/core/module/raporting/student/index'

export default {
  components: {
    PerfectScrollbar
  },
  data() {
    return vue_data
  },
  computed: {
    ...vuex_states,
    ...vue_computed,
  },
  methods: {
    ...vuex_methods,
    ...vue_methods,
  },
  created() {
    this.getMyClassroom()
  },
  watch: {
    myclass() {
      this.fetchDataStudents()
    }
  }
}
</script>