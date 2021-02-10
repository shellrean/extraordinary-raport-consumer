<template>
  <div class="flex container md:mx-auto flex-col space-y-4 lg:flex-row lg:space-y-0 h-full w-full">
    <div class="h-full w-full mx-auto lg:flex-1 px-3 min-h-0 min-w-0">
      <div class="bg-white pt-4 pb-2 rounded-t-md border-t border-l border-r border-gray-300 shadow-sm flex flex-col">
        <div class="flex justify-start space-x-2 mb-6 px-4">
          <div class="w-4 h-4 bg-red-400 rounded-full cursor-pointer hover:shadow-xl hover:w-8 hover:h-8"></div>
          <div class="w-4 h-4 bg-yellow-400 rounded-full cursor-pointer hover:shadow-xl hover:w-8 hover:h-8"></div>
          <div class="w-4 h-4 bg-green-400 rounded-full cursor-pointer hover:shadow-xl hover:w-8 hover:h-8"></div>
        </div>
        <div class="flex justify-between items-center px-4 mb-4">
          <p class="text-2xl font-bold text-gray-500">Rencana pembelajaran</p>
          <div class="flex space-x-1">
            <router-link :to="{name: 'master.student.create' }" class="py-2 text-sm px-5 rounded-md bg-blue-400 disabled:opacity-50 text-white font-medium">Tambah rencana</router-link>
          </div>
        </div>
        <div class="flex space-x-1 w-full py-1 px-4 py-2">
          <div class="w-md">
            <input v-model="search" type="text" class="pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300 w-full" name="" placeholder="Kelas Akademik">
          </div>
          <div class="w-md">
            <input  type="text" class="pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300 w-full" name="" placeholder="Cari...">
          </div>
        </div>
      </div>
      <perfect-scrollbar class="border-t border-b border-gray-100 max-h-96 overflow-y-scroll">
        <div class="bg-white py-2 px-2 border-l border-r border-gray-300">
          <div class="hover:bg-gray-50 p-1 sm:p-0 mb-1 border-b border-gray-200" v-for="c in [1,2,3,4,4,5]">
            <div class="flex flex-col sm:flex-row py-1 justify-between sm:items-center">
              <div class="sm:px-1 flex items-start">
                <div class="pl-2 pr-2 sm:pr-0">
                  <input type="checkbox" />
                </div>
                <div class="flex flex-col">
                  <p class="sm:px-3 text-base font-medium text-gray-700">Tugas harian</p>
                  <p class="sm:px-3 text-gray-700 max-w-md text-xs">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
                  <p class="sm:px-3 text-xs text-gray-700 mt-2 underline">Matpel: Bahasa Indonesia</p>
                </div>
              </div>
              <div class="flex space-x-1 pr-2 border-t md:border-0 border-gray-200 pt-2 md:pt-0">
                <div class="flex flex-col">
                  <p class="sm:px-3 text-xs text-gray-700">Tipe</p>
                  <p class="sm:px-3 text-gray-800 max-w-md text-sm">Tugas</p>
                </div>
              </div>
              <div class="flex space-x-1 pr-2 border-t md:border-0 border-gray-200 pt-2 md:pt-0">
                <div class="flex flex-col">
                  <p class="sm:px-3 text-xs text-gray-700">Jumlah</p>
                  <p class="sm:px-3 text-gray-800 max-w-md text-sm">4</p>
                </div>
              </div>
              <div class="flex space-x-1 pr-2 border-t md:border-0 border-gray-200 pt-2 md:pt-0">
                <div class="flex flex-col">
                  <p class="sm:px-3 text-xs text-gray-700">Point</p>
                  <p class="sm:px-3 text-gray-800 max-w-md text-sm">100</p>
                </div>
              </div>
              <div class="flex space-x-1 pr-2 border-t md:border-0 border-gray-200 pt-2 md:pt-0">
                <button class="py-1 px-4 text-sm rounded-md bg-gray-50 text-gray-600 border-gray-300 border hover:shadow-md">Detail</button>
              </div>
            </div>
          </div>
        </div>
      </perfect-scrollbar>
      <div class="bg-white py-2 flex justify-between px-2 rounded-b-lg mb-2 border-l border-b border-r border-gray-300 shadow-sm">
        <div>
          <button class="text-base rounded-l-md py-2 px-6 bg-gray-100 text-gray-600 hover:shadow-xl hover:bg-gray-200 disabled:opacity-50 text-white border-l border-t border-b border-gray-300">Clear</button>
          <button class="text-base py-2 px-6 bg-gray-100 text-gray-600 hover:shadow-xl hover:bg-gray-200  disabled:opacity-50 text-white border-t border-b border-gray-300">Pilih semua</button>
          <button class="text-base rounded-r-md py-2 px-6 bg-gray-100 text-gray-600 hover:shadow-xl hover:bg-gray-200 disabled:opacity-50 text-white border-r border-t border-b border-gray-300">Hapus</button>
        </div>
        <div>
          <button class="text-base rounded-l-md py-2 px-5 bg-gray-100 text-gray-600 hover:shadow-xl hover:bg-gray-200 disabled:opacity-50 text-white border-t border-l border-b border-gray-300">Kembali</button>
          <button class="text-base rounded-r-md py-2 px-5 bg-gray-100 text-gray-600 hover:shadow-xl hover:bg-gray-200 disabled:opacity-50 text-white border-t border-r border-b border-gray-300">Lanjut</button>  
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'

export default {
  name: 'ResultingPlanSubject',
  components: {
    PerfectScrollbar,
  }
};
</script>