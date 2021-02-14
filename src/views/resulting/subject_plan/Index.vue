<template>
  <div class="flex container md:mx-auto flex-col space-y-4 lg:flex-row lg:space-y-0 h-full w-full">
    <div class="h-full w-full mx-auto lg:flex-1 px-3 min-h-0 min-w-0">
      <div class="bg-white pt-4 pb-2 rounded-t-md border-t border-l border-r border-gray-300 shadow-sm flex flex-col">
        <div class="flex justify-start space-x-2 mb-6 px-4">
          <router-link :to="{name:'resulting.index'}" class="block w-4 h-4 bg-red-400 rounded-full cursor-pointer hover:shadow-xl hover:w-8 hover:h-8"></router-link>
          <div class="w-4 h-4 bg-yellow-400 rounded-full cursor-pointer hover:shadow-xl hover:w-8 hover:h-8"></div>
          <div class="w-4 h-4 bg-green-400 rounded-full cursor-pointer hover:shadow-xl hover:w-8 hover:h-8"></div>
        </div>
        <div class="flex flex-col sm:flex-row justify-between items-center px-4 mb-4">
          <p class="text-lg sm:text-2xl font-bold text-gray-500">Rencana pembelajaran</p>
          <div class="flex space-x-1">
            <router-link to="/" class="py-2 text-sm px-4 rounded-md border border-gray-300 text-gray-600 disabled:opacity-50 text-white font-medium">Dump rencana</router-link>
            <router-link :to="{name: 'resulting.subject.plan.create' }" class="py-2 text-sm px-5 rounded-md bg-blue-400 disabled:opacity-50 text-white font-medium">Tambah rencana</router-link>
          </div>
        </div>
        <div class="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-1 w-full py-1 px-4 py-2">
          <div class="w-full sm:w-56">
            <select v-model="classroomSelected" class="h-full text-gray-700 w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" :readonly="isLoading" :class="{'bg-gray-200' : isLoading}">
              <option :value="0">Semua kelas</option>
              <option v-for="(classroom, index) in filteredClassroom" :value="classroom.classroomAcademicID">{{ classroom.classroomName}}</option>
            </select>
          </div>
        </div>
      </div>
      <perfect-scrollbar class="border-t border-b border-gray-100 max-h-96 overflow-y-scroll">
        <div class="bg-white py-2 px-2 border-l border-r border-gray-300">
          <div class="hover:bg-gray-50 p-1 sm:p-0 mb-1 border-b border-gray-200" v-for="(plan, index) in plans" :key="plan.id">
            <div class="flex flex-col sm:flex-row py-1 justify-between sm:items-center">
              <div class="flex-1 sm:px-1 flex flex-col sm:flex-row items-start">
                <div class="pl-2 pr-2 sm:pr-0">
                  <input type="checkbox" :value="plan.id" :checked="selected.includes(plan.id)" @input="onCheckClick"/>
                </div>
                <div class="flex flex-col">
                  <p class="sm:px-3 text-base font-medium text-gray-700">{{ plan.name }}</p>
                  <p class="sm:px-3 text-gray-700 max-w-md text-xs">{{ plan.desc }}</p>
                  <p class="sm:px-3 text-xs text-gray-700 mt-2 underline">Matpel: {{ plan.subjectName }}</p>
                </div>
              </div>
              <div class="flex space-x-1 pr-2 border-t md:border-0 border-gray-200 pt-2 md:pt-0">
                <div class="flex space-x-1 pr-2 border-t md:border-0 border-gray-200 pt-2 md:pt-0">
                  <div class="flex flex-col">
                    <p class="sm:px-3 text-xs text-gray-700">Tipe</p>
                    <p class="sm:px-3 text-gray-800 max-w-md text-sm">{{ getTextType(plan.type) }}</p>
                  </div>
                </div>
                <div class="flex space-x-1 pr-2 border-t md:border-0 border-gray-200 pt-2 md:pt-0">
                  <div class="flex flex-col">
                    <p class="sm:px-3 text-xs text-gray-700">Jumlah</p>
                    <p class="sm:px-3 text-gray-800 max-w-md text-sm">{{ plan.countPlan }}</p>
                  </div>
                </div>
                <div class="flex space-x-1 pr-2 border-t md:border-0 border-gray-200 pt-2 md:pt-0">
                  <div class="flex flex-col">
                    <p class="sm:px-3 text-xs text-gray-700">Point</p>
                    <p class="sm:px-3 text-gray-800 max-w-md text-sm">{{ plan.maxPoint }}</p>
                  </div>
                </div>
              </div>
              <div class="flex space-x-1 pr-2 border-t md:border-0 border-gray-200 pt-2 md:pt-0">
                <div class="flex space-x-1 pr-2 border-t md:border-0 border-gray-200 pt-2 md:pt-0">
                <router-link :to="{name: 'resulting.subject.plan.edit', params: {id: plan.id}}" class="py-1 px-4 text-sm rounded-md bg-yellow-50 text-yellow-600 border-yellow-300 border hover:shadow-md">Edit</router-link>
                <button class="py-1 px-4 text-sm rounded-md bg-red-50 text-red-600 border-red-300 border hover:shadow-md" @click="deleteDataSubjectPlan(plan.id, index)">Hapus</button>
              </div>
              </div>
            </div>
          </div>
        </div>
      </perfect-scrollbar>
      <div class="bg-white py-2 flex justify-between px-2 rounded-b-lg mb-2 border-l border-b border-r border-gray-300 shadow-sm">
        <div>
          <button class="text-base rounded-l-md py-2 px-6 bg-gray-100 text-gray-600 hover:shadow-xl hover:bg-gray-200 disabled:opacity-50 text-white border-l border-t border-b border-gray-300" @click="clearSelected" :disabled="selected.length === 0">Clear</button>
          <button class="text-base py-2 px-6 bg-gray-100 text-gray-600 hover:shadow-xl hover:bg-gray-200  disabled:opacity-50 text-white border-t border-b border-gray-300" @click="selectAllRows" :disabled="selected.length == (plans != null ? plans.length : 0)">Pilih semua</button>
          <button class="text-base rounded-r-md py-2 px-6 bg-gray-100 text-gray-600 hover:shadow-xl hover:bg-gray-200 disabled:opacity-50 text-white border-r border-t border-b border-gray-300" @click="multipleDeletePlans" :disabled="selected.length === 0">Hapus</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { showSweetError } from '@/core/helper/alert.helper'
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'
import { mapState, mapActions } from 'vuex'
import _ from 'lodash'

export default {
  name: 'ResultingPlanSubject',
  components: {
    PerfectScrollbar,
  },
  data() {
    return {
      search: "",
      selected: [],
      classroomName: "",
      classroomSelected: 0,
      dialogClassroom: false,
    }
  },
  computed: {
    ...mapState(['isLoading']),
    ...mapState('auth',['authorized_user']),
    ...mapState('subject_plan', ['plans']),
    ...mapState('academic_classroom', ['classrooms']),
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
      return result;
    },
  },
  methods: {
    ...mapActions('subject_plan', ['fetchSubjectPlans', 'deleteSubjectPlan', 'deleteSubjectPlans']),
    ...mapActions('academic_classroom', ['fetchClassrooms']),
    ...mapActions('academic_subject', ['fetchSubjects']),
    showError(err) {
      showSweetError(this, err)
    },
    selectAllRows() {
      this.selected = this.plans.map((item) => item.id)
    },
    clearSelected() {
      this.selected = []
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
    fetchDataSubjectPlans() {
      (async() => {
        try {
          this.clearSelected()
          await this.fetchSubjectPlans({
            query: this.search,
            teacherID: this.authorized_user.id,
            classroomID: this.classroomSelected,
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
    fetchDataClassrooms() {
      (async() => {
        try {
          await this.fetchClassrooms()
        } catch (err) {
          if (typeof err.error_code != 'undefined' && err.error_code == 1201) {
            this.fetchDataClassrooms()
            return
          }
          this.showError(err)
        }
      })()
    },
    setClassroom(classroom) {
      this.classroomSelected = classroom
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
    onCheckClick(e) {
      if(e.target.checked) {
        this.selected.push(parseInt(e.target.value))
      } else {
        let idx = this.selected.indexOf(parseInt(e.target.value))
        if (idx !== -1) {
          this.selected.splice(idx, 1)
        }
      }
    },
    doDeleteDataSubjectPlan(id, index) {
      (async() => {
        try {
          await this.deleteSubjectPlan(id)
          this.$store.state.subject_plan.plans.splice(index, 1)
        } catch (err) {
          if (typeof err.error_code != 'undefined' && err.error_code == 1201) {
            this.doDeleteDataSubjectPlan(id, index)
            return
          }
          this.showError(err)
        }
      })()
    },
    deleteDataSubjectPlan(id, index) {
      this.$swal({
        title: 'Peringatan',
        text: "Rencana pembelajaran ini akan dihapus berserta data yang terkait, Pastikan anda belum mengimplementasikan rencana pembelajaran yang dipilih pada penilaian",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#c7c7c7',
        confirmButtonText: 'Iya, Lanjutkan!'
      }).then((result) => { 
        if(result.value) {
          this.doDeleteDataSubjectPlan(id, index)
        }
      })
    },
    doMultipleDeletePlans() {
      (async() => {
        try {
          await this.deleteSubjectPlans(this.selected)
          this.fetchDataSubjectPlans()
        } catch (err) {
          if (typeof err.error_code != 'undefined' && err.error_code == 1201) {
            this.doMultipleDeletePlans()
            return
          }
          this.showError(err)
        }
      })()
    },
    multipleDeletePlans() {
      this.$swal({
        title: 'Peringatan',
        text: "Rencana pembelajaran yang dipilih akan dihapus berserta data yang terkait, Pastikan anda belum mengimplementasikan rencana pembelajaran yang dipilih pada penilaian",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#c7c7c7',
        confirmButtonText: 'Iya, Lanjutkan!'
      }).then(async (result) => {
        if(result.value) {
          this.doMultipleDeletePlans()
        }
      })
    }
  },
  created() {
    this.fetchDataSubjectPlans()
    this.fetchDataSubjects()
  },
  watch: {
    search: _.debounce(function(value) {
      this.fetchDataSubjectPlans()
    }),
    classroomSelected: _.debounce(function(value) {
      this.fetchDataSubjectPlans()
    })
  }
};
</script>