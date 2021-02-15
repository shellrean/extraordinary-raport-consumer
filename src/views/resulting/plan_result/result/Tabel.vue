<template>
  <div class="bg-white border-gray-300 shadow">
    <div class="flex items-center space-x-1 px-3 w-64 mb-4">
      <select class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="Nomor Induk Siswa Nasional" :readonly="isLoading" :class="{'bg-gray-200' : isLoading}" v-model="planIndex">
        <option v-for="(plan, index) in plans" :value="index">{{ plan.name }}</option>
      </select> 
    </div>
    <div class="px-3">
      <perfect-scrollbar class="max-h-96 overflow-y-scroll">
      <table class="w-full ">
        <tbody>
          <tr  class="bg-blue-100 border-b-2 border-t-2 border-blue-300 font-semibold text-blue-600">
            <td class="py-2 px-2">No</td>
            <td class="py-2 px-2">NIS</td>
            <td class="py-2 px-2">Nama</td>
            <td class="py-2 px-2 w-16" v-if="typeof planSelected.countPlan != 'undefined'" v-for="(_, i) in new Array(planSelected.countPlan)">Nilai {{ i+1 }}</td>
          </tr>
          <tr class="hover:bg-blue-50 border-b border-gray-200 font-medium text-gray-600" v-for="(student, index) in students" :key="student.id">
            <td class="py-1 px-2">{{ index+1 }}</td>
            <td class="py-1 px-2">{{ student.studentSRN }}</td>
            <td class="py-1 px-2">{{ student.studentName }}</td>
            <td class="py-1 px-2" v-if="typeof planSelected.countPlan != 'undefined'" v-for="(_, i) in new Array(planSelected.countPlan)" :key="i">
              <p class="font-semibold">{{ getNumberValue(student.id, i) }}</p>
            </td>
          </tr>
        </tbody>
      </table>
      </perfect-scrollbar>
    </div>
  </div>
</template>
<script>
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'
import { mapState, mapActions } from 'vuex'
import { showSweetError } from '@/core/helper/alert.helper'
export default {
  components: {
    PerfectScrollbar
  },
  data() {
    return {
      planIndex: null,
      planSelected: {},
      showInfo: false,
      value: {}
    }
  },
  computed: {
    ...mapState(['isLoading']),
    ...mapState('academic_student', ['students']),
    ...mapState('subject_plan', ['plans']),
    ...mapState('plan_result', ['results'])
  },
  methods: {
    ...mapActions('plan_result', ['fetchPlanResults']),
    fetchDataPlanResults() {
      (async() => {
        try {
          await this.fetchPlanResults(this.planSelected.id)
        } catch (err) {
          if (typeof err.error_code != 'undefined' && err.error_code == 1201) {
            this.fetchDataPlanResults(this.planSelected.id)
            return
          }
          this.showError(err)
        }
      })()
    },
    getNumberValue(studentID, index) {
      if (this.results == null || typeof this.results == 'undefined') {
        return 0
      }
      const find = this.results.filter((item) => item.studentID == studentID && item.index == index)
      if (find.length > 0){
        return find[0].number
      }
    }
  },
  watch: {
    planIndex(v) {
      this.planSelected = this.plans[v]
      this.fetchDataPlanResults()
    }
  }
}
</script>