<template>
  <div class="container md:mx-auto flex flex-col justify-center space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4">
    <div class="w-full lg:w-3/4 lg:py-4 lg:px-4">
      <div class="bg-white py-2 px-2 border border-gray-300 shadow rounded-t-lg">
        <div class="flex justify-end space-x-2 mb-2">
          <router-link :to="{name:'resulting.plan.result'}" class="block w-4 h-4 bg-red-400 rounded-full cursor-pointer hover:shadow-xl hover:w-8 hover:h-8"></router-link>
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
        <div class="block bg-white mb-2 transition duration-300 hover:bg-blue-50" v-for="(subject, index) in filteredSubject" :key="index">
          <div class="flex flex-col sm:flex-row py-2 sm:justify-between sm:items-center">
            <div class="flex-1">
              <div class="px-3 font-semibold text-gray-700">{{ subject.subjectName }}</div>
              <span class="px-3 block text-gray-500 text-sm">
                <div class="w-full h-2 rounded-full bg-gray-200">
                  <div class="w-1/3 h-2 rounded-full bg-green-300"></div>
                </div>
              </span>
            </div>
            <span class="block px-3 text-gray-500 text-sm">
              <div class="flex space-x-1 pr-2 border-t md:border-0 border-gray-200 pt-2 md:pt-0">
                <router-link :to="{name: 'resulting.plan.result.subjct.result', params: {id: subject.id}}" class="py-1 px-4 text-sm rounded-md bg-blue-50 text-blue-600 border-blue-300 border hover:shadow-md">Hasil</router-link>
                <router-link :to="{name: 'resulting.plan.result.subject.input', params: {id: subject.id}}"class="py-1 px-4 text-sm rounded-md bg-red-50 text-green-600 border-green-300 border hover:shadow-md">Input nilai</router-link>
                <router-link :to="{name: 'resulting.plan.result.subject.input', params: {id: subject.id}}"class="py-1 px-4 text-sm rounded-md bg-red-50 text-yellow-600 border-yellow-300 border hover:shadow-md">Bulk Input</router-link>
              </div>
            </span>
          </div>
        </div>
      </perfect-scrollbar>
      <div class="bg-white py-2 px-2 border border-gray-300 shadow rounded-b-lg mb-2">
      </div>
    </div>
  </div>
</template>
<script>
import { showSweetError } from '@/core/helper/alert.helper'
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'
import { mapState, mapActions } from 'vuex'
export default {
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
    filteredSubject() {
      if (this.subjects == null || this.subjects == undefined) {
        return []
      }
      let result = []
      result = this.subjects.filter((item) => item.classroomAcademicID == parseInt(this.$route.params.id))
      return result
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
    }
  },
  created() {
    this.fetchDataSubjects()
  }
}
</script>