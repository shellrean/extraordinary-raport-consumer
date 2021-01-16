<template>
  <div class="flex flex-col space-y-4 lg:flex-row lg:space-y-0 h-full w-full">
    <div class="border pb-2 lg:pb-0 w-full lg:max-w-xs px-3 flex flex-row lg:flex-col flex-wrap lg:flex-nowrap">
     <MasterMenus />
    </div>
    <div class="border h-full w-full lg:flex-1 px-3 min-h-0 min-w-0">
      <p class="text-xl mb-2 font-medium text-gray-600">Daftar akademik</p>
      <button class="py-2 rounded-lg hover:shadow-xl border border-blue-500 px-4 text-white bg-blue-400 mb-2">
        <div class="flex flex-col">
          <span class="text-sm text-left font-bold text-white">Generate</span>
        </div>
      </button>
      <div class="grid grid-cols-4 gap-4">
        <div class="shadow py-2 w-full border rounded-lg flex items-center  px-4 text-white" v-for="year in years" :class="year.active ? 'bg-green-400 border-green-500' : 'bg-white'">
          <div class="flex flex-col">
            <span class="text-xs font-bold" :class="year.active ? 'text-green-600' : 'text-gray-400'">Semester {{ year.semester }}</span>
            <span class="text-lg font-bold" :class="year.active ? 'text-white' : 'text-gray-500'">{{ year.name }}</span>
          </div>
        </div>
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
      years: [
        {name: '2019/2020', semester: '2', active: true},
        {name: '2019/2020', semester: '1', active: false},
        {name: '2018/2019', semester: '2', active: false},
      ]
    }
  },
  methods: {
    
  }
};
</script>