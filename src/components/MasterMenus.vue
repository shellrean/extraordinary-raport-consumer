<template>
  <div class="w-full min-h-0 min-w-0">
    <div class="grid grid-cols-6 sm:grid-cols-6 lg:grid-cols-4 gap-4">
      <router-link :to="{name: 'master.major'}" class="border border-gray-300 shadow rounded-lg hover:shadow-xl cursor-pointer h-10 w-10 sm:h-16 sm:w-16 flex items-center justify-center bg-white" title="Manajement jurusan">
        <img src="/img/icon/lamp.svg" class="h-4 sm:h-12">
      </router-link>
      <router-link :to="{name: 'master.student'}" class="border border-gray-300 shadow rounded-lg hover:shadow-xl cursor-pointer h-10 w-10 sm:h-16 sm:w-16 flex items-center justify-center bg-white" title="Manajement siswa">
        <img src="/img/icon/user-student.svg" class="h-4 sm:h-12">
      </router-link>
      <router-link :to="{name: 'master.user'}" class="border border-gray-300 shadow rounded-lg hover:shadow-xl cursor-pointer h-10 w-10 sm:h-16 sm:w-16 flex items-center justify-center bg-white" title="Manajement user">
        <img src="/img/icon/user-teacher.svg" class="h-4 sm:h-12">
      </router-link>
      <router-link :to="{name: 'master.subject'}" class="border border-gray-300 shadow rounded-lg hover:shadow-xl cursor-pointer h-10 w-10 sm:h-16 sm:w-16 flex items-center justify-center bg-white" title="Manajement matpel">
        <img src="/img/icon/green-book-mark.svg" class="h-4 sm:h-12">
      </router-link>
      <router-link :to="{name: 'master.classroom'}" class="border border-gray-300 shadow rounded-lg hover:shadow-xl cursor-pointer h-10 w-10 sm:h-16 sm:w-16 flex items-center justify-center bg-white" title="Manajement kelas">
        <img src="/img/icon/building.svg" class="h-4 sm:h-12">
      </router-link>
      <router-link :to="{name: 'master.academic'}" class="border border-gray-300 shadow rounded-lg hover:shadow-xl cursor-pointer h-10 w-10 sm:h-16 sm:w-16 flex items-center justify-center bg-white" title="Tahun akademik">
        <img src="/img/icon/calendar.svg" class="h-4 sm:h-12">
      </router-link>
    </div>
  </div>
</template>