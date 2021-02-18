<template>
  <div class="py-2">
    <div class="hidden sm:flex px-2 flex-col border-t border-b py-2 border-gray-300 sm:flex-row py-1 justify-between sm:items-center border-gray-300">
      <div class="sm:px-1 flex items-center">
        <div class="flex items-center">
          <div class="pr-2 sm:pr-0 w-10 font-medium text-gray-600 text-sm">
            NO
          </div>
          <p class="sm:px-2 font-medium text-gray-600 text-sm">INFO EKTRAKURIKULER</p>
        </div>
      </div>
      <div class="flex space-x-1 pr-2 border-t md:border-0 border-gray-200 pt-2 md:pt-0">
        <p class="sm:px-3 font-medium text-gray-600 text-sm">AKSI</p>
      </div>
    </div>
    <div class="hover:bg-gray-50 p-1 sm:p-0 mb-1 border-b border-gray-200" v-if="exschools != null" v-for="(exschool, index) in exschools">
      <div class="flex flex-col sm:flex-row py-1 justify-between sm:items-center">
        <div class="px-2 sm:px-1 flex items-start">
          <div class="hidden sm:block pl-2 pr-2 sm:pr-0 w-10 font-medium text-gray-600 text-sm">
              {{ index+1 }}
          </div>
          <div class="flex flex-col">
            <p class="sm:px-3 text-gray-700">{{ exschool.name }}</p>
          </div>
        </div>
        <div class="flex space-x-1 pr-2 border-t md:border-0 border-gray-200 pt-2 md:pt-0">
          <button class="py-1 px-4 text-sm rounded-md bg-gray-50 text-gray-600 border-gray-300 border hover:shadow-md" @click="$emit('member-list', index)">Anggota</button>
          <button class="py-1 px-4 text-sm rounded-md bg-green-50 text-green-600 border-green-300 border hover:shadow-md">Input nilai</button>
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
  vue_methods,
} from '@/core/module/raporting/exschool/list'
export default {
  data() {
    return vue_data
  },
  computed: {
    ...vuex_state,
    ...vue_computed,
  },
  methods: {
    ...vuex_methods,
    ...vue_methods,
  }
}
</script>