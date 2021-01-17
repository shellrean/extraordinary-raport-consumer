<template>
  <div class="flex flex-col space-y-4 lg:flex-row lg:space-y-0 h-full w-full">
    <div class="border pb-2 lg:pb-0 w-full lg:max-w-xs px-3 flex flex-row lg:flex-col flex-wrap lg:flex-nowrap">
     <MasterMenus />
    </div>
    <div class="border h-full w-full lg:flex-1 px-3 min-h-0 min-w-0">
      <p class="text-xl mb-2 font-medium text-gray-600">Daftar kelas</p>
      <div class="bg-white py-2 px-2 rounded-lg mb-2 border border-gray-300 shadow flex items-center flex-col space-y-4 lg:flex-row lg:space-y-0">
        <div class="w-full lg:max-w-xs">
          <router-link :to="{name: 'dump.master.student.create' }" class="rounded-md mr-1 py-1 px-3 bg-blue-400 border-2 border-blue-500 hover:shadow-xl disabled:opacity-50 text-white font-medium">Tambah</router-link>
          <router-link to="/" class="py-1 px-3 rounded-md bg-green-400 border-2 border-green-500 hover:shadow-xl disabled:opacity-50 text-white font-medium">Import</router-link> 
        </div>
        <div class="w-full lg:flex-1">
          <input type="text" class="rounded-md py-1 px-2 bg-gray-200 focus:bg-gray-100 border-2 border-gray-300 w-full" name="" placeholder="Cari">
        </div>
      </div>
      <div class="bg-white mb-2 border border-gray-300 shadow rounded-lg" v-for="classroom in classrooms">
        <div class="flex flex-col sm:flex-row py-2 sm:justify-between sm:items-center">
          <div>
            <span class="px-3 text-gray-500 text-sm">{{ classroom.major }}</span>
            <div class="px-3 font-semibold text-gray-700">{{ classroom.name }} <span class="px-2 rounded-sm bg-gray-400 text-white text-sm font-normal">Tingkat {{ classroom.grade }}</span></div>
          </div>
          <div class="flex pl-3 lg:pl-1 pr-2">
            <button class="px-2 mr-1 rounded-sm bg-yellow-400 text-white hover:shadow-md border-yellow-500 border font-medium">Edit</button>
            <button class="px-2 rounded-sm bg-red-400 text-white font-medium border-red-500 border hover:shadow-md ">Hapus</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Notif from '@/components/nano/Notif'
import MasterMenus from '@/components/MasterMenus'
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'
export default {
  components: {
    MasterMenus,
    Notif
  },
  data() {
    return {
      notif: [],
    }
  },
  computed: {
    ...mapState(['isLoading']),
    ...mapState('classroom', ['classrooms']),
  },
  methods: {
    ...mapActions('classroom',['fetchClassrooms']),
  },
  created() {
    (async () => {
      try {
        await this.fetchClassrooms()
      } catch (err) {
        let id = new Date().getTime()
        this.notif.push({id: id, msg: err.message})
        let idx = this.notif.map((item) => item.id).indexOf(id)
        if(idx !== -1) {
          setTimeout(() => { 
            this.notif.splice(idx, 1)
          }, 3000);
        }
      }
    })()
  }
};
</script>