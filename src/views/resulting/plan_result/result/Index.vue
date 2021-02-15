<template>
  <div class="container md:mx-auto flex flex-col justify-center space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4">
    <div class="w-full lg:w-3/4 lg:py-4 lg:px-4">
      <div class="bg-white py-2 px-2 border-t border-gray-300 shadow rounded-t-lg">
        <div class="flex justify-end space-x-2 mb-2">
          <router-link :to="{name:'resulting.plan.result'}" class="block w-4 h-4 bg-red-400 rounded-full cursor-pointer hover:shadow-xl hover:w-8 hover:h-8"></router-link>
          <div class="w-4 h-4 bg-yellow-400 rounded-full cursor-pointer hover:shadow-xl hover:w-8 hover:h-8"></div>
          <div class="w-4 h-4 bg-green-400 rounded-full cursor-pointer hover:shadow-xl hover:w-8 hover:h-8"></div>
        </div>
        <div class="flex space-x-1 items-center mb-4">
          <div class="flex px-3 w-56">
            <select class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="Nomor Induk Siswa Nasional" :readonly="isLoading" :class="{'bg-gray-200' : isLoading}">
              <option value="task">Tugas</option>
              <option value="evms">Evaluasi Tengah Semester</option>
              <option value="evls">Evaluasi Akhir Semester</option>
              <option value="exam">Ulangan</option>
            </select> 
          </div>
        </div>
        <div class="flex mb-4">
          <p class="pb-2 border-b-2 px-4 font-semibold cursor-pointer" :class="pageIndex == 0 ? 'border-blue-400 text-blue-400' : 'border-gray-200 text-gray-400'" @click="pageIndex=0">Tabel</p>
          <p class="pb-2 border-b-2 px-4 font-semibold cursor-pointer " :class="pageIndex == 1 ? 'border-blue-400 text-blue-400' : 'border-gray-200 text-gray-400'" @click="pageIndex=1">Export</p>
          <p class="pb-2 border-b-2 border-gray-200 px-4 flex-1"></p>
        </div>
      </div>
      <tabel-result v-if="pageIndex == 0"></tabel-result>
      <export-result v-if="pageIndex == 1"></export-result>
      <div class="bg-white py-2 px-2 border border-gray-300 shadow rounded-b-lg mb-2">
      </div>
    </div>
  </div>
</template>
<script>
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'
import TabelResult from './Tabel'
import ExportResult from './Export'
export default {
  components: {
    PerfectScrollbar,
    TabelResult,
    ExportResult
  },
  data() {
    return {
      pageIndex: 0
    }
  }
}
</script>