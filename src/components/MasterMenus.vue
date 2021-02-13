<template>
  <div class="w-full min-h-0 min-w-0">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
      <router-link :to="{name: 'master.major'}" class="py-2 px-2 space-x-2 border border-gray-300 shadow rounded-lg hover:shadow-xl cursor-pointer flex items-center justify-center bg-white" title="Manajement jurusan">
        <img src="/img/icon/lamp.svg" class="h-4 sm:h-12">
        <span>Manajemen Jurusan</span>
      </router-link>
      <router-link :to="{name: 'master.student'}" class="py-2 px-2 space-x-2 border border-gray-300 shadow rounded-lg hover:shadow-xl cursor-pointer flex items-center justify-center bg-white" title="Manajement siswa">
        <img src="/img/icon/user-student.svg" class="h-4 sm:h-12">
        <span>Manajemen Siswa</span>
      </router-link>
      <router-link :to="{name: 'master.user'}" class="py-2 px-2 space-x-2 border border-gray-300 shadow rounded-lg hover:shadow-xl cursor-pointer flex items-center justify-center bg-white" title="Manajement user">
        <img src="/img/icon/user-teacher.svg" class="h-4 sm:h-12">
        <span>Manajemen User</span>
      </router-link>
      <router-link :to="{name: 'master.subject'}" class="py-2 px-2 space-x-2 border border-gray-300 shadow rounded-lg hover:shadow-xl cursor-pointer flex items-center justify-center bg-white" title="Manajement matpel">
        <img src="/img/icon/green-book-mark.svg" class="h-4 sm:h-12">
        <span>Manajemen Matpel</span>
      </router-link>
      <router-link :to="{name: 'master.classroom'}" class="py-2 px-2 space-x-2 border border-gray-300 shadow rounded-lg hover:shadow-xl cursor-pointer flex items-center justify-center bg-white" title="Manajement kelas">
        <img src="/img/icon/building.svg" class="h-4 sm:h-12">
        <span>Manajemen Kelas</span>
      </router-link>
      <router-link :to="{name: 'master.academic'}" class="py-2 px-2 space-x-2 border border-gray-300 shadow rounded-lg hover:shadow-xl cursor-pointer flex items-center justify-center bg-white" title="Tahun akademik">
        <img src="/img/icon/calendar.svg" class="h-4 sm:h-12">
        <span>Tahun Akademik</span>
      </router-link>
    </div>
  </div>
</template>