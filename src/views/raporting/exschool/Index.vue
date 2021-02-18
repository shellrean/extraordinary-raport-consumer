<template>
  <div class="container md:mx-auto flex flex-col justify-center space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4">
    <div class="w-full lg:w-3/4 lg:py-4 lg:px-4">
      <div class="bg-white border border-gray-300 shadow rounded-t-lg rounded-b-lg">
        <div class="pt-4 pb-2 px-2 flex justify-between border-b border-gray-300 mb-2">
          <div>
            <p class="font-medium text-gray-700 px-2">Ektrakurikuler kelas</p>
          </div>
          <div class="flex justify-end space-x-2 mb-2">
            <router-link :to="{name:'raporting.index'}" class="block w-4 h-4 bg-red-400 rounded-full cursor-pointer hover:shadow-xl hover:w-8 hover:h-8"></router-link>
            <div class="w-4 h-4 bg-yellow-400 rounded-full cursor-pointer hover:shadow-xl hover:w-8 hover:h-8" @click="page=0"></div>
            <div class="w-4 h-4 bg-green-400 rounded-full cursor-pointer hover:shadow-xl hover:w-8 hover:h-8"></div>
          </div>
        </div>
        <list-exschool v-if="page==0" v-on:member-list="selectedExschool = exschools[$event]; page=1"></list-exschool>
        <member-exschool v-if="page==1" :exschool="selectedExschool"></member-exschool>
      </div>
    </div>
  </div>
</template>
<script>
import {
  vuex_states,
  vuex_methods,
  vue_data,
  vue_computed,
  vue_methods
} from '@/core/module/raporting/exschool/index'
import ListExschool from './List'
import MemberExschool from './Member'
export default {
  name: 'ExschoolIndex',
  components: {
    ListExschool,
    MemberExschool
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
    ...vue_methods
  },
  created() {
    this.getMyClassroom()
    this.fetchDataExschools()
    this.fetchDataStudentByCA()
    this.fetcDataByClassroom(this.myclass.id)
  }
}
</script>