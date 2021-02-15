<template>
  <div class="container md:mx-auto flex flex-col justify-center space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4">
    <div class="w-full lg:w-3/4 lg:py-4 lg:px-4">
      <div class="bg-white py-2 px-2 border-t shadow border-gray-300 rounded-t-lg">
        <div class="flex justify-end space-x-2 mb-2">
          <router-link :disabled="typeof currentData.classroomAcademicID == 'undefined'" :to="{name:'resulting.plan.result.subject', params: {id: currentData.classroomAcademicID}}" class="block w-4 h-4 bg-red-400 rounded-full cursor-pointer hover:shadow-xl hover:w-8 hover:h-8"></router-link>
          <div class="w-4 h-4 bg-yellow-400 rounded-full cursor-pointer hover:shadow-xl hover:w-8 hover:h-8"></div>
          <div class="w-4 h-4 bg-green-400 rounded-full cursor-pointer hover:shadow-xl hover:w-8 hover:h-8"></div>
        </div>
        <div class="flex mb-4">
          <p class="pb-2 border-b-2 px-4 font-semibold cursor-pointer" :class="pageIndex == 0 ? 'border-blue-400 text-blue-400' : 'border-gray-300 text-gray-400'" @click="pageIndex=0">Tabel</p>
          <p class="pb-2 border-b-2 px-4 font-semibold cursor-pointer " :class="pageIndex == 1 ? 'border-blue-400 text-blue-400' : 'border-gray-300 text-gray-400'" @click="pageIndex=1">Export</p>
          <p class="pb-2 border-b-2 border-gray-300 px-4 flex-1"></p>
        </div>
      </div>
      <tabel-result v-if="pageIndex == 0"></tabel-result>
      <export-result v-if="pageIndex == 1"></export-result>
      <div class="bg-white py-2 px-2 border border-gray-300 rounded-b-lg mb-2">
      </div>
    </div>
  </div>
</template>
<script>
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'
import TabelResult from './Tabel'
import ExportResult from './Export'
import { showSweetError } from '@/core/helper/alert.helper'
import { mapState, mapActions } from 'vuex'
export default {
  components: {
    PerfectScrollbar,
    TabelResult,
    ExportResult
  },
  data() {
    return {
      pageIndex: 0,
      currentData: {},
    }
  },
  computed: {
    ...mapState(['isLoading']),
    ...mapState('academic_subject', ['subjects']),
    ...mapState('academic_student', ['students']),
    ...mapState('subject_plan', ['plans']),
    ...mapState('plan_result', ['results'])
  },
  methods: {
    ...mapActions('academic_student', ['fetchStudentsByClassroomAcademic']),
    ...mapActions('subject_plan', ['fetchSubjectPlans']),
    ...mapActions('academic_subject', ['fetchSubjects']),
    showError(err) {
      showSweetError(this, err)
    },
    fetchDataStudentByCA() {
      (async() => {
        try {
          await this.fetchStudentsByClassroomAcademic(this.currentData.classroomAcademicID)
        } catch (err) {
          if (typeof err.error_code != 'undefined' && err.error_code == 1201) {
            this.fetchDataStudentByCA()
            return
          }
          this.showError(err)
        }
      })()
    },
    fetchDataSubjectPlans() {
      (async() => {
        try {
          await this.fetchSubjectPlans({
            classroomID: this.currentData.classroomAcademicID
          })
        } catch (err) {
          if (typeof err.error_code != 'undefined' && err.error_code == 1201) {
            this.fetchDataSubjectPlans()
            return
          }
          this.showError(err)
        }
      })()
    },
    setCurrentData() {
      if (this.subjects == null || this.subjects == undefined) {
        return
      }
      const result = this.subjects.filter((item) => item.id == parseInt(this.$route.params.id))
      if (result.length > 0) {
        this.currentData = result[0]
      }
    },
    fetchDataSubjects() {
      (async () => {
        try {
          await this.fetchSubjects()
          this.setCurrentData()
        } catch (err) {
          if (typeof err.error_code != 'undefined' && err.error_code == 1201) {
            this.fetchDataSubjects()
            return
          }
          this.showError(err)
        }
      })()
    }
  },
  created() {
    this.fetchDataSubjects()
  },
  watch: {
    currentData() {
      this.fetchDataStudentByCA()
      this.fetchDataSubjectPlans()
    }
  }
}
</script>