<template>
  <div class="flex container md:mx-auto flex-col space-y-4 lg:flex-row lg:space-y-0 h-full w-full">
    <div class="h-full w-full mx-auto lg:flex-1 px-3 min-h-0 min-w-0">
      <div class="bg-white pt-6 pb-2 rounded-t-lg border-t border-l border-r border-gray-300 shadow-sm flex flex-col">
        <div class="flex justify-start space-x-2 mb-2 px-4">
          <router-link :to="{name:'master.index'}" class="block w-4 h-4 bg-red-400 rounded-full cursor-pointer hover:shadow-xl hover:w-8 hover:h-8"></router-link>
          <div class="w-4 h-4 bg-yellow-400 rounded-full cursor-pointer hover:shadow-xl hover:w-8 hover:h-8"></div>
          <div class="w-4 h-4 bg-green-400 rounded-full cursor-pointer hover:shadow-xl hover:w-8 hover:h-8"></div>
        </div>
        <div class="flex flex-col sm:flex-row justify-between items-center px-4 mb-4">
          <p class="text-lg sm:text-2xl font-bold text-gray-500">Daftar jurusan</p>
          <div class="flex space-x-1">
            <router-link to="/" class="py-2 text-sm px-4 rounded-md border border-gray-300 text-gray-600 disabled:opacity-50 text-white font-medium">Import jurusan</router-link> 
            <router-link :to="{name: 'dump.master.major.create' }" class="py-2 text-sm px-4 rounded-md bg-blue-400 disabled:opacity-50 text-white font-medium">Tambah</router-link>
          </div>
        </div>
        <div class="flex w-full py-1 px-4 py-2">
          <div class="w-full sm:w-md">
            <input v-model="search" type="text" class="rounded-md py-1 px-4 focus:border-blue-200 border border-gray-300 w-full" name="" placeholder="Cari jurusan">
          </div>
        </div>
        <div class="flex px-2 flex-col border-t border-b py-2 border-gray-300 sm:flex-row py-1 justify-between sm:items-center border-gray-300">
          <div class="sm:px-1 flex items-center">
            <div class="pl-2 pr-2 sm:pr-0">
              <input type="checkbox" />
            </div>
            <div class="flex flex-col">
              <p class="sm:px-3 font-medium text-gray-600 text-sm">INFO JURUSAN</p>
            </div>
          </div>
          <div class="flex space-x-1 pr-2 border-t md:border-0 border-gray-200 pt-2 md:pt-0">
            <p class="sm:px-3 font-medium text-gray-600 text-sm">AKSI</p>
          </div>
        </div>
      </div>
      <perfect-scrollbar class="max-h-96 overflow-y-scroll">
        <div class="bg-white py-2 px-2 border-l border-r border-gray-300">
          <div class="hover:bg-gray-50 p-1 sm:p-0 mb-1 border-b border-gray-200" v-for="(major,index) in majors" :key="index">
            <div class="flex flex-col sm:flex-row py-1 justify-between sm:items-center">
              <div class="sm:px-1 flex items-center">
                <div class="pl-2 pr-2 sm:pr-0">
                  <input type="checkbox" />
                </div>
                <div class="flex flex-col">
                  <p class="sm:px-3 text-gray-700">{{ major.name }}</p>
                </div>
              </div>
              <div class="flex space-x-1 pr-2 border-t md:border-0 border-gray-200 pt-2 md:pt-0">
                <button class="py-1 px-4 text-sm rounded-md bg-yellow-50 text-yellow-600 border-yellow-300 border hover:shadow-md">Edit</button>
                <button class="py-1 px-4 text-sm rounded-md bg-red-50 text-red-600 border-red-300 border hover:shadow-md">Hapus</button>
              </div>
            </div>
          </div>
        </div>
      </perfect-scrollbar>
      <div class="bg-white py-2 flex justify-between px-2 rounded-b-lg mb-2 border-l border-b border-r border-gray-300 shadow-sm">
        <div>
          <button class="text-sm rounded-l-md py-1 px-3 bg-gray-100 text-gray-600 hover:shadow-xl hover:bg-gray-200 disabled:opacity-50 text-white border-l border-t border-b border-gray-300">Clear</button>
          <button class="text-sm py-1 px-3 bg-gray-100 text-gray-600 hover:shadow-xl hover:bg-gray-200  disabled:opacity-50 text-white border-t border-b border-gray-300">Pilih semua</button>
          <button class="text-sm rounded-r-md py-1 px-3 bg-gray-100 text-gray-600 hover:shadow-xl hover:bg-gray-200 disabled:opacity-50 text-white border-r border-t border-b border-gray-300">Hapus</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MasterMenus from '@/components/MasterMenus'
import { showSweetError } from '@/core/helper/alert.helper'
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'
export default {
  components: {
    MasterMenus,
    PerfectScrollbar
  },
  data() {
    return {
      notif: [],
      search: ""
    }
  },
  computed: {
    ...mapState(['isLoading']),
    ...mapState('major', ['majors']),
  },
  methods: {
    ...mapActions('major',['fetchMajors']),
    showError(err) {
      showSweetError(this, err)
    },
    fetchDataMajors() {
      (async() => {
        try {
          await this.fetchMajors()
        } catch (err) {
          if (typeof err.error_code != 'undefined' && err.error_code == 1201) {
            this.fetchDataMajors()
            return
          }
          this.showError(err)
        }
      })()
    }
  },
  created() {
    this.fetchDataMajors()
  }
};
</script>