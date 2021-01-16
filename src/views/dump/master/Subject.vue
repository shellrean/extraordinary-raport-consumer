<template>
  <div class="flex flex-col space-y-4 lg:flex-row lg:space-y-0 h-full w-full">
    <div class="border pb-2 lg:pb-0 w-full lg:max-w-xs px-3 flex flex-row lg:flex-col flex-wrap lg:flex-nowrap">
     <MasterMenus />
    </div>
    <div class="border h-full w-full lg:flex-1 px-3 min-h-0 min-w-0">
      <p class="text-xl mb-2 font-medium text-gray-600">Daftar Mata Pelajaran</p>
      <div class="bg-white py-2 px-2 rounded-lg mb-2 border border-gray-300 shadow flex items-center flex-col space-y-4 lg:flex-row lg:space-y-0">
        <div class="w-full lg:max-w-xs">
          <router-link :to="{name: 'dump.master.subject.create' }" class="rounded-md py-1 mr-1 px-3 bg-blue-400 border-2 border-blue-500 hover:shadow-xl disabled:opacity-50 text-white font-medium">Tambah</router-link>
          <router-link to="/" class="py-1 px-3 rounded-md bg-green-400 border-2 border-green-500 hover:shadow-xl disabled:opacity-50 text-white font-medium">Import</router-link> 
        </div>
        <div class="w-full lg:flex-1">
          <input type="text" class="rounded-md py-1 px-2 bg-gray-200 focus:bg-gray-100 border-2 border-gray-300 w-full" name="" placeholder="Cari">
        </div>
      </div>
      <div class="bg-white mb-2 border border-gray-300 shadow rounded-lg" v-for="subject in subjects">
        <div class="flex flex-col sm:flex-row py-2 justify-between items-center">
          <div class="px-3 font-semibold text-gray-700">{{ subject.name }}</div>
          <div class="flex pr-2">
            <button class="px-2 mr-1 rounded-sm bg-yellow-400 text-white hover:shadow-md border-yellow-500 border font-medium">Edit</button>
            <button class="px-2 rounded-sm bg-red-400 text-white font-medium border-red-500 border hover:shadow-md ">Hapus</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MasterMenus from './MasterMenus'
export default {
  components: {
    MasterMenus
  },
  data() {
    return {
      subjects: [
        {id:1, name: 'Pendidikan Agama dan Budi Pekerti'},
        {id:2, name: 'Science'},
        {id:3, name: 'Matematika'},
      ]
    }
  }
};
</script>