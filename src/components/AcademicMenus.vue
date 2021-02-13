<template>
  <div class="w-full min-h-0 min-w-0">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
      <router-link :to="{name: 'academic.classroom'}" class="py-2 px-2 space-x-2 border border-gray-300 shadow rounded-lg hover:shadow-xl cursor-pointer flex items-center justify-center bg-white" title="Manajement kelas">
        <img src="/img/icon/building.svg" class="h-4 sm:h-12">
        <span>Kelas Akademik</span>
      </router-link>
    </div>
  </div>
</template>