<template>
  <div class="flex flex-col space-y-4 lg:flex-row lg:space-y-0 h-full w-full">
    <div class="border pb-2 lg:pb-0 w-full lg:max-w-xs px-3 flex flex-row lg:flex-col flex-wrap lg:flex-nowrap">
     <MasterMenus />
    </div>
    <div class="border h-full w-full lg:flex-1 px-3 min-h-0 min-w-0">
      <p class="text-xl mb-2 font-medium text-gray-600">Daftar akademik</p>
      <button v-if="generated" class="py-2 rounded-lg hover:shadow-xl border border-blue-500 px-4 text-white bg-blue-400 mb-2">
        <div class="flex flex-col">
          <span class="text-sm text-left font-bold text-white">Generate</span>
        </div>
      </button>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <div class="shadow py-2 w-full border rounded-lg flex items-center  px-4 text-white" v-for="year in academics" :class="year.id == academic_active.id ? 'bg-green-400 border-green-500' : 'bg-white'">
          <div class="flex flex-col">
            <span class="text-xs font-bold" :class="year.id == academic_active.id ? 'text-green-600' : 'text-gray-400'">Semester {{ year.semester }}</span>
            <span class="text-lg font-bold" :class="year.id == academic_active.id ? 'text-white' : 'text-gray-500'">{{ year.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Notif from '@/components/nano/Notif'
import Notify from '@/core/services/notif.service'
import Semester from '@/core/domain/semester.domain'
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
      generated: false
    }
  },
  computed: {
    ...mapState(['isLoading', 'academic_active']),
    ...mapState('academic', ['academics']),
  },
  methods: {
    ...mapActions('academic',['fetchAcademics']),
    checkYearNow() {
      const academic = this.academics[this.academics.length-1]
      const academic_current = Semester()
      if(academic) {
        if(`${academic.name}-${academic.semester}` != academic_current) {
          this.generated = true
        } else {
          this.generated = false
        }
      }
    }
  },
  created() {
    (async () => {
      try {
        await this.fetchAcademics()
        this.checkYearNow()
      } catch (err) {
        Notify.createNotif({msg: err.message, notif: this.notif})
      }
    })()
  }
};
</script>