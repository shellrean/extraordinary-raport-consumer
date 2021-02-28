<template>
  <div class="w-full min-h-0 min-w-0">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
      <router-link :to="{name: 'raporting.student.index'}" class="py-2 px-2 space-x-2 border border-gray-300 shadow rounded-lg hover:shadow-xl cursor-pointer flex items-center justify-start bg-white" title="Manajement siswa">
        <img src="/img/icon/user-student.svg" class="h-4 sm:h-12">
        <span>Siswa Kelas</span>
      </router-link>
      <router-link :to="{name: 'raporting.exschool.index'}" class="px-2  space-x-2 py-2 border border-gray-300 shadow rounded-lg hover:shadow-xl cursor-pointer flex items-center justify-start bg-white" title="Rencana pembelajaran">
        <img src="/img/icon/headset.svg" class="h-8 md:h-12">
        <span>Ekstrakurikuler</span>
      </router-link>
      <router-link :to="{name: 'raporting.student_note.index'}" class="px-2  space-x-2 py-2 border border-gray-300 shadow rounded-lg hover:shadow-xl cursor-pointer flex items-center justify-start bg-white" title="Rencana pembelajaran">
        <img src="/img/icon/note.svg" class="h-8 md:h-12">
        <span>Catatan Siswa</span>
      </router-link>
      <router-link :to="{name: 'raporting.attendance.index'}" class="px-2  space-x-2 py-2 border border-gray-300 shadow rounded-lg hover:shadow-xl cursor-pointer flex items-center justify-start bg-white" title="Rencana pembelajaran">
        <img src="/img/icon/binder.svg" class="h-8 md:h-12">
        <span>Absensi Siswa</span>
      </router-link>
      <router-link :to="{name: 'raporting.result.index'}" class="px-2  space-x-2 py-2 border border-gray-300 shadow rounded-lg hover:shadow-xl cursor-pointer flex items-center justify-start bg-white" title="Rencana pembelajaran">
        <img src="/img/icon/sheet.svg" class="h-8 md:h-12">
        <span>Penilaian</span>
      </router-link>
      <router-link :to="{name: 'raporting.final.index'}" class="px-2  space-x-2 py-2 border border-gray-300 shadow rounded-lg hover:shadow-xl cursor-pointer flex items-center justify-start bg-white" title="Rencana pembelajaran">
        <img src="/img/icon/zip.svg" class="h-8 md:h-12">
        <span>Raport</span>
      </router-link>
    </div>
  </div>
</template>