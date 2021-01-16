<template>
  <div class="container md:mx-auto flex flex-col justify-center space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4">
    <div class="bg-white w-full lg:w-1/2 py-4 px-4 rounded-lg shadow border border-gray-300">
      <p class="text-gray-500 text-2xl mb-2 font-medium">Pengguna</p>
      <hr>
      <div class="mb-4">
        <label for="" class="text-xs font-semibold text-gray-500 px-1">Nama</label>
        <div class="flex">
          <input type="text" class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="Nama">
        </div>
      </div>
      <div class="mb-4">
        <label for="" class="text-xs font-semibold text-gray-500 px-1">Email</label>
        <div class="flex">
          <input type="email" class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="email@shellrean.com">
        </div>
      </div>
      <div class="mb-4">
        <label for="" class="text-xs font-semibold text-gray-500 px-1">Password</label>
        <div class="flex">
          <input type="password" class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="************">
        </div>
      </div>
      <div class="mb-4">
        <label for="" class="text-xs font-semibold text-gray-500 px-1">Re Password</label>
        <div class="flex">
          <input type="email" class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="************" />
        </div>
      </div>
      <router-link :to="{name: 'dump.master.user' }" class="mr-1 rounded-md py-1 px-3 bg-gray-400 border-2 border-gray-500 hover:shadow-xl disabled:opacity-50 text-white font-medium">Kembali</router-link>
      <router-link to="/" class="py-1 px-3 rounded-md bg-green-400 border-2 border-green-500 hover:shadow-xl disabled:opacity-50 text-white font-medium">Simpan</router-link> 
    </div>
  </div>
</template>