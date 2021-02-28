<template>
  <div>
    <div class="flex mt-3">
      <p class="pb-2 border-b-2 px-4 font-semibold cursor-pointer" :class="page == 0 ? 'border-blue-400 text-blue-400' : 'border-gray-300 text-gray-400'" @click="page=0">Form</p>
      <p class="pb-2 border-b-2 px-4 font-semibold cursor-pointer " :class="page == 1 ? 'border-blue-400 text-blue-400' : 'border-gray-300 text-gray-400'" @click="page=1">Excel</p>
      <p class="pb-2 border-b-2 border-gray-300 px-4 flex-1"></p>
    </div>
    <div class="py-4" v-if="page==0">
      <div class="hidden sm:flex px-2 flex-col border-t border-b py-2 border-gray-300 sm:flex-row py-1 justify-between sm:items-center border-gray-300">
        <div class="sm:px-1 flex items-center">
          <div class="flex items-center">
            <div class="pr-2 sm:pr-0 w-20 font-medium text-gray-600 text-sm">
              ANGGOTA
            </div>
            <p class="sm:px-2 font-medium text-gray-600 text-sm">SISWA</p>
          </div>
        </div>
        <div class="flex space-x-1 pr-2 border-t md:border-0 border-gray-200 pt-2 md:pt-0">
          <p class="sm:px-3 font-medium text-gray-600 text-sm w-16">NILAI</p>
        </div>
      </div>
      <div v-if="students != null">
        <div class="hover:bg-gray-50 p-1 sm:p-0 mb-1 border-b border-gray-200" v-for="(student, index) in students" :key="index">
          <div class="flex flex-col sm:flex-row py-1 justify-between sm:items-center">
            <div class="px-2 sm:px-1 flex items-center">
              <div class="hidden sm:block pl-2 pr-2 sm:pr-0 w-20 font-medium text-gray-600 text-sm">
                <input type="checkbox" :value="student.id" :checked="isMember(exschool.id, student.id)" @input="onCheckMember"/>
              </div>
              <div class="flex flex-col">
                <p class="sm:px-3 text-xs text-gray-700">{{ student.studentSRN }}</p>
                <p class="sm:px-3 text-gray-700">{{ student.studentName }}</p>
              </div>
            </div>
            <div class="flex space-x-1 pr-2 border-t md:border-0 border-gray-200 pt-2 md:pt-0">
              <input type="text" class="bg-white py-1 px-2 w-16 border-2 font-semibold border-gray-400 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="page==1">
      <div class="px-3 py-2">
        <div class="w-full h-52 px-2 flex justify-center items-center border-2 border-gray-200 rounded-md">
          <div class="">
            <p class="text-lg text-gray-600 font-medium">coba.xlxs</p>
            <div class="flex space-x-1">
              <button class="py-1 px-4 rounded-md bg-green-400 text-white font-medium hover:shadow-lg">Upload file</button>
              <button class="py-1 px-4 rounded-md bg-gray-200 text-gray-600 font-medium hover:shadow-lg">Download format</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  vuex_state,
  vuex_methods,
  vue_data,
  vue_computed,
  vue_methods
} from '@/core/module/raporting/exschool/member'
export default {
  props: {
    exschool: {
      type: Object,
      required: true
    }
  },
  data() {
    return vue_data
  },
  computed: {
    ...vuex_state,
    ...vue_computed
  },
  methods: {
    ...vuex_methods,
    ...vue_methods
  },
  created() {
  }
}
</script>