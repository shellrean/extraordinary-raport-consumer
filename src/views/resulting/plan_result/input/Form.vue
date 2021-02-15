<template>
  <div>
    <div class="flex items-center space-x-1 px-3 w-64 mb-4">
      <select class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="Nomor Induk Siswa Nasional" :readonly="isLoading" :class="{'bg-gray-200' : isLoading}" v-model="planIndex">
        <option v-for="(plan, index) in plans" :value="index">{{ plan.name }}</option>
      </select> 
      <button class="py-1 w-8 h-8 px-1 rounded-md bg-blue-400 font-bold text-white hover:shadow-lg" @click="showInfo = !showInfo">{{ showInfo ? 'X' : '?' }}</button>
    </div>
    <div class="rounded-md px-4 py-2 mx-3 mb-4 text-gray-600 border-2 border-gray-200" v-if="showInfo">
      <p class="pb-2 mb-1 border-b border-gray-200">{{ planSelected.name }}</p>
      <p>{{ planSelected.desc }} - Tipe: {{ getTextType(planSelected.type) }}</p>
    </div>
    <div class="px-3">
      <table class="w-full ">
        <tbody>
          <tr  class="bg-green-100 border-b-2 border-t-2 border-green-300 font-semibold text-green-600">
            <td class="py-2 px-2">No</td>
            <td class="py-2 px-2">NIS</td>
            <td class="py-2 px-2">Nama</td>
            <td class="py-2 px-2 w-16" v-if="typeof planSelected.countPlan != 'undefined'" v-for="(_, i) in new Array(planSelected.countPlan)">Nilai {{ i+1 }}</td>
          </tr>
          <tr class="hover:bg-green-50 border-b border-gray-200 font-medium text-gray-600" v-for="(student, index) in students" :key="student.id">
            <td class="py-1 px-2">{{ index+1 }}</td>
            <td class="py-1 px-2">{{ student.studentSRN }}</td>
            <td class="py-1 px-2">{{ student.studentName }}</td>
            <td class="py-1 px-2" v-if="typeof planSelected.countPlan != 'undefined'" v-for="(_, i) in new Array(planSelected.countPlan)" :key="i">
              <input type="text" @input="onInput({index: i, studentID: student.id, number: parseInt($event.target.value)}, index)" :value="getNumberValue(student.id, i)" class="bg-white py-1 px-2 w-16 border-2 font-semibold border-gray-400 rounded-md" :readonly="isLoading" :class="{'bg-gray-200' : isLoading}"/>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import { showSweetError } from '@/core/helper/alert.helper'
import { mapState, mapActions } from 'vuex'
import _ from 'lodash'

export default {
  name: 'FormInput',
  components: {
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
    ...mapActions('plan_result', ['storePlanResult', 'fetchPlanResults']),
    showError(err) {
      showSweetError(this, err)
    },
    getTextType(type) {
      const types = {
        "task": "Tugas",
        "evms": "Evaluasi Tengah Semester",
        "evls": "Evaluasi Akhir Semester",
        "exam": "Ulangan"
      }
      return types[type] != 'undefined' ? types[type] : '-'
    },
    pushDataToResult(data) {
      this.$store.state.plan_result.results.push({
        id: data.data.id,
        index: data.data.index,
        number: data.data.number,
        planID: data.data.planID,
        studentID: data.data.studentID,
        subjectID: data.data.subjectID,
        updatedByID: data.data.updatedByID,
      })
    },
    storeDataResult(payload, index) {
      (async() => {
        try {
          const provider = await this.storePlanResult({
            planID: this.planSelected.id,
            subjectID: this.planSelected.classroomSubjectID,
            ...payload
          })
          if (this.results == null || typeof this.results == 'undefined') {
            this.results = []
            this.pushDataToResult(provider)
            return
          }
          const find = this.results.filter((item) => item.studentID == payload.studentID && item.index == payload.index)
          if (find.length == 0){
            this.pushDataToResult(provider)
          } else {
            const idx = this.results.map((item) => item.id).indexOf(find[0].id)
            if (idx !== -1) {
              this.$store.state.plan_result.results[idx].number = payload.number
            }
          }
        } catch (err) {
          if (typeof err.error_code != 'undefined' && err.error_code == 1201) {
            this.storeDataResult(payload)
            return
          }
          this.showError(err)
        }
      })()
    },
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
    },
    onInput: _.debounce(function (value, index) {
      this.storeDataResult(value, index)
    }, 300),
  },
  watch: {
    planIndex(v) {
      this.planSelected = this.plans[v]
      this.fetchDataPlanResults()
    }
  }
}
</script>