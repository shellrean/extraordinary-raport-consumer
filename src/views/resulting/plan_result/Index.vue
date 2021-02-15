<template>
  <div class="container md:mx-auto flex flex-col justify-center space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4">
    <div class="w-full lg:w-3/4 lg:py-4 lg:px-4">
      <div class="bg-white py-2 px-2 border border-gray-300 shadow rounded-t-lg">
        <div class="flex justify-end space-x-2 mb-2">
          <router-link :to="{name:'resulting.index'}" class="block w-4 h-4 bg-red-400 rounded-full cursor-pointer hover:shadow-xl hover:w-8 hover:h-8"></router-link>
          <div class="w-4 h-4 bg-yellow-400 rounded-full cursor-pointer hover:shadow-xl hover:w-8 hover:h-8"></div>
          <div class="w-4 h-4 bg-green-400 rounded-full cursor-pointer hover:shadow-xl hover:w-8 hover:h-8"></div>
        </div>
        <div class="flex space-x-4">
          <div class="flex-1">
            <input v-model="search" type="text" class="py-1 border-gray-200 border-2 rounded-full px-6 bg-gray-100 w-full focus:ring-0 focus:border-blue-300" placeholder="Cari"/>
          </div>
        </div>
      </div>
      <perfect-scrollbar class="max-h-96 overflow-y-scroll bg-white border border-gray-300 shadow">
        <router-link :to="{name: 'resulting.plan.result.subject', params: {id: classroom.classroomAcademicID}}" class="block bg-white mb-2 transition duration-300 hover:bg-blue-50 cursor-pointer" v-for="(classroom, index) in filteredClassroom" :key="index">
          <div class="flex flex-col sm:flex-row py-2 sm:justify-between sm:items-center">
            <div>
              <div class="px-3 font-semibold text-gray-700">{{ classroom.classroomName }}</div>
              <span class="px-3 text-gray-500 text-sm"><span v-for="matpel in getMatpels(classroom.classroomAcademicID)" class="pr-2">{{ matpel.subjectName }}</span></span>
            </div>
            <span class="px-3 text-gray-500 text-sm">{{ getMatpels(classroom.classroomAcademicID).length }} Matpel</span>
          </div>
        </router-link>
      </perfect-scrollbar>
      <div class="bg-white py-2 px-2 border border-gray-300 shadow rounded-b-lg mb-2">
      </div>
    </div>
  </div>
</template>
<script>
import { showSweetError } from '@/core/helper/alert.helper'
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'PlanResultIndex',
  components: {
    PerfectScrollbar
  },
  data() {
    return {
      search: ""
    }
  },
  computed: {
    ...mapState(['isLoading']),
    ...mapState('academic_subject', ['subjects']),
    filteredClassroom() {
      if (this.subjects == null || this.subjects == undefined) {
        return []
      }
      const result = []
      const map = new Map()
      for (const item of this.subjects) {
        if(!map.has(item.classroomAcademicID)) {
          map.set(item.classroomAcademicID, true);
          result.push(item)
        }
      }
      return result.filter((item) => item.classroomName.toLowerCase().includes(this.search.toLowerCase()));
    }
  },
  methods: {
    ...mapActions('academic_subject', ['fetchSubjects']),
    showError(err) {
      showSweetError(this, err)
    },
    fetchDataSubjects() {
      (async () => {
        try {
          await this.fetchSubjects()
        } catch (err) {
          if (typeof err.error_code != 'undefined' && err.error_code == 1201) {
            this.fetchDataSubjects()
            return
          }
          this.showError(err)
        }
      })()
    },
    getMatpels(classroomID) {
      if (this.subjects == null || this.subjects == undefined) {
        return []
      }
      return this.subjects.filter((item) => item.classroomAcademicID == classroomID)
    }
  },
  created() {
    this.fetchDataSubjects()
  }
}
</script>