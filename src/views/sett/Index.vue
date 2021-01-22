<template>
  <div class="container md:mx-auto flex flex-col justify-center space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4">
    <div v-if="setting == 0" class="bg-white w-full lg:w-1/2 py-4 px-4 rounded-lg shadow border border-gray-300">
      <p class="text-gray-500 text-2xl mb-2 font-medium">Pengaturan</p>
      <hr>
      <ul class="space-y-2">
        <li class="border-b border-gray-200 py-2"><a href="#" @click.prevent="setting = 1" class="text-blue-400 font-medium">Tahun Ajaran</a></li>
      </ul>
    </div>
    <AcademicYear @close="setting = 0" v-if="setting == 1" />
  </div>
</template>
<script>
import AcademicYear from './AcademicYear'
export default {
  name: 'SettingIndex',
  components: {
    AcademicYear
  },
  data() {
    return {
      setting: 0
    }
  }
}
</script>