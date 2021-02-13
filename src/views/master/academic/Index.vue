<template>
  <div class="flex flex-col space-y-4 lg:flex-row lg:space-y-0 h-full w-full">
    <div class=" h-full w-full lg:flex-1 px-3 min-h-0 min-w-0">
      <div class="max-w-md flex justify-center items-center h-full mx-auto">
        <div class="w-full bg-white pt-6 pb-2 rounded-lg border-b border-t border-l border-r border-gray-300 shadow-sm flex flex-col">
          <div class="flex justify-start space-x-2 mb-2 px-4">
            <router-link :to="{name:'master.index'}" class="block w-4 h-4 bg-red-400 rounded-full cursor-pointer hover:shadow-xl hover:w-8 hover:h-8"></router-link>
            <div class="w-4 h-4 bg-yellow-400 rounded-full cursor-pointer hover:shadow-xl hover:w-8 hover:h-8"></div>
            <div class="w-4 h-4 bg-green-400 rounded-full cursor-pointer hover:shadow-xl hover:w-8 hover:h-8"></div>
          </div>
          <div class="w-full min-h-0 min-w-0 px-4">
            <p class="text-xl mb-2 font-medium text-gray-600">Daftar akademik</p>
            <button @click="generate" :disabled="isLoading" v-if="generated" class="py-2 rounded-lg hover:shadow-xl border border-blue-500 px-4 text-white bg-blue-400 mb-2">
              <div class="flex flex-col">
                <span class="text-sm text-left font-bold text-white">Generate</span>
              </div>
            </button>
            <div class="grid grid-cols-1 gap-4">
              <div class="shadow py-2 w-full border rounded-lg flex items-center  px-4 text-white" v-for="year in academics" :class="year.id == academic_active.id ? 'bg-green-400 border-green-500' : 'bg-white'">
                <div class="flex flex-col">
                  <span class="text-xs font-bold" :class="year.id == academic_active.id ? 'text-green-600' : 'text-gray-400'">Semester {{ year.semester }}</span>
                  <span class="text-lg font-bold" :class="year.id == academic_active.id ? 'text-white' : 'text-gray-500'">{{ year.name }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Semester from '@/core/domain/semester.domain'
import MasterMenus from '@/components/MasterMenus'
import { showSweetError } from '@/core/helper/alert.helper'
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'
export default {
  components: {
    MasterMenus
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
    ...mapActions('academic',['fetchAcademics', 'generateAcademic']),
    showError(err) {
      showSweetError(this, err)
    },
    checkYearNow() {
      const academic = this.academics[this.academics.length-1]
      const academic_current = new Semester().getFormat()
      if(academic) {
        if(`${academic.name}-${academic.semester}` != academic_current) {
          this.generated = true
        } else {
          this.generated = false
        }
      }
    },
    generate() {
      (async() => {
        try {
          await this.generateAcademic()
          await this.fetchAcademics()
          this.checkYearNow()
        } catch (err) {
          this.showError(err)
        }
      })()
    }
  },
  created() {
    (async () => {
      try {
        await this.fetchAcademics()
        this.checkYearNow()
      } catch (err) {
        this.showError(err)
      }
    })()
  }
};
</script>