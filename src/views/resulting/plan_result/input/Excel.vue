<template>
  <div>
    <div class="flex px-3 w-56 mb-4">
      <select class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="Nomor Induk Siswa Nasional" :readonly="isLoading" :class="{'bg-gray-200' : isLoading}">
        <option value="task">Tugas</option>
        <option value="evms">Evaluasi Tengah Semester</option>
        <option value="evls">Evaluasi Akhir Semester</option>
        <option value="exam">Ulangan</option>
      </select> 
    </div>
    <div class="px-3 py-2">
      <div class="w-full h-52 px-2 flex justify-center items-center border-2 border-gray-200 rounded-md">
        <div class="">
          <p class="text-lg text-gray-600 font-medium">coba.xlxs</p>
          <div class="flex space-x-1">
            <button class="py-1 px-4 rounded-md bg-green-400 text-white font-medium hover:shadow-lg">Upload file</button>
            <button class="py-1 px-4 rounded-md bg-gray-200 text-gray-600 font-medium hover:shadow-lg">Download format</button>
          </div>
        </div>
      </div>
      <p class="py-2 px-4 rounded-md bg-blue-100 mt-2 text-blue-700 font-medium">Perhatikan pada rencana penilaian yang dipilih, pastikan sesuai dengan format yang diupload</p>
    </div>
  </div>
</template>