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
        <div class="shadow py-2 w-full border rounded-lg flex items-center  px-4 text-white" v-for="year in academics" :class="year.active ? 'bg-green-400 border-green-500' : 'bg-white'">
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
    ...mapState('academic', ['academics']),
  },
  methods: {
    ...mapActions('academic',['fetchAcademics']),
  },
  created() {
    (async () => {
      try {
        await this.fetchAcademics()
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