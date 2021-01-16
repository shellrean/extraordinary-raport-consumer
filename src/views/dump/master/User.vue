<template>
  <div class="flex flex-col space-y-4 lg:flex-row lg:space-y-0 h-full w-full">
    <div class="border pb-2 lg:pb-0 w-full lg:max-w-xs px-3 flex flex-row lg:flex-col flex-wrap lg:flex-nowrap">
     <MasterMenus />
    </div>
    <div class="border h-full w-full lg:flex-1 px-3 min-h-0 min-w-0">
      <p class="text-xl mb-2 font-medium text-gray-600">Daftar pengguna</p>
      <div class="bg-white py-2 px-2 rounded-t-lg mb-2 border border-gray-300 shadow flex items-center flex-col space-y-4 lg:flex-row lg:space-y-0">
        <div class="w-full lg:max-w-xs">
          <router-link :to="{name: 'dump.master.user.create' }" class="mr-1 rounded-md py-1 px-3 bg-blue-400 border-2 border-blue-500 hover:shadow-xl disabled:opacity-50 text-white font-medium">Tambah</router-link>
          <router-link to="/" class="py-1 px-3 rounded-md bg-green-400 border-2 border-green-500 hover:shadow-xl disabled:opacity-50 text-white font-medium">Import</router-link> 
        </div>
        <div class="w-full lg:flex-1">
          <input type="text" class="rounded-md py-1 px-2 bg-gray-200 focus:bg-gray-100 border-2 border-gray-300 w-full" name="" placeholder="Cari">
        </div>
      </div>
      <div class="h-96 overflow-y-scroll mb-2">
        <div class="bg-white p-1 sm:p-0 mb-2 border border-gray-300 shadow rounded-lg" v-for="user in users">
          <div class="flex flex-col sm:flex-row py-1 justify-between sm:items-center">
            <div class="sm:px-1 flex items-center">
              <div class="flex flex-col">
                <p class="sm:px-3 text-xs text-gray-700">{{ user.email }}</p>
                <p class="sm:px-3 font-semibold text-gray-700">{{ user.name }}</p>
              </div>
            </div>
            <div class="flex pr-2">
              <button class="px-2 mr-1 rounded-sm bg-yellow-400 text-white hover:shadow-md border-yellow-500 border font-medium">Edit</button>
              <button class="px-2 rounded-sm bg-red-400 text-white font-medium border-red-500 border hover:shadow-md ">Hapus</button>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-white py-2 px-2 rounded-b-lg mb-2 border border-gray-300 shadow">
        <button class="rounded-l-md py-1 px-3 bg-gray-500 hover:shadow-xl disabled:opacity-50 text-white font-medium border-2 border-gray-600">Kembali</button>
        <button class="rounded-r-md py-1 px-3 bg-gray-500 hover:shadow-xl disabled:opacity-50 text-white font-medium border-t-2 border-r-2 border-b-2 border-gray-600">Lanjut</button>  
      </div>
    </div>
  </div>
</template>
<script>
import MasterMenus from './MasterMenus'
export default {
  name: 'User',
  components: {
    MasterMenus
  },
  data() {
    return {
      users: [
        {id:1, email: '7813@shellrean.com', name: 'Muhammad Irfan Ramadhan Bla bla bal'},
        {id:2, email: '7814@shellrean.com', name: 'Novanti'},
        {id:3, email: '7815@shellrean.com', name: 'Shellrean'},
        {id:2, email: '7814@shellrean.com', name: 'Novanti'},
        {id:3, email: '7815@shellrean.com', name: 'Shellrean'},
        {id:2, email: '7814@shellrean.com', name: 'Novanti'},
        {id:3, email: '7815@shellrean.com', name: 'Shellrean'},
        {id:2, email: '7814@shellrean.com', name: 'Novanti'},
        {id:3, email: '7815@shellrean.com', name: 'Shellrean'},
        {id:2, email: '7814@shellrean.com', name: 'Novanti'},
        {id:3, email: '7815@shellrean.com', name: 'Shellrean'},
      ]
    }
  },
  methods: {
    
  }
};
</script>