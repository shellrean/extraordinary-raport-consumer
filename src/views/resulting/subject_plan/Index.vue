<template>
  <div class="flex container md:mx-auto flex-col space-y-4 lg:flex-row lg:space-y-0 h-full w-full">
    <div class="h-full w-full mx-auto lg:flex-1 px-3 min-h-0 min-w-0">
      <div class="bg-white pt-4 pb-2 rounded-t-md border-t border-l border-r border-gray-300 shadow-sm flex flex-col">
        <div class="flex justify-start space-x-2 mb-6 px-4">
          <div class="w-4 h-4 bg-red-400 rounded-full cursor-pointer hover:shadow-xl hover:w-8 hover:h-8"></div>
          <div class="w-4 h-4 bg-yellow-400 rounded-full cursor-pointer hover:shadow-xl hover:w-8 hover:h-8"></div>
          <div class="w-4 h-4 bg-green-400 rounded-full cursor-pointer hover:shadow-xl hover:w-8 hover:h-8"></div>
        </div>
        <div class="flex justify-between items-center px-4 mb-4">
          <p class="text-2xl font-bold text-gray-500">Rencana pembelajaran</p>
          <div class="flex space-x-1">
            <router-link :to="{name: 'master.student.create' }" class="py-2 text-sm px-5 rounded-md bg-blue-400 disabled:opacity-50 text-white font-medium">Tambah rencana</router-link>
          </div>
        </div>
        <div class="flex space-x-1 w-full py-1 px-4 py-2">
          <div class="w-md">
            <input v-model="classroomSelected.classroomName" v-if="!dialogClassroom" @click="dialogClassroom = !dialogClassroom" type="text" class="pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300 w-full" name="" placeholder="Kelas Akademik">
            <div class="bg-white border-2 border-gray-300 rounded-lg px-3 py-2" v-if="dialogClassroom">
              <div class="flex items-center bg-gray-200 rounded-md">
                <div class="pl-2">
                  <svg class="fill-current text-gray-500 w-6 h-6" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24">
                    <path class="heroicon-ui"
                    d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                  </svg>
                </div>
                <input v-model="classroomName" class="w-full rounded-md bg-gray-200 text-gray-700 leading-tight focus:outline-none py-2 px-2" type="text" placeholder="Cari Kelas">
              </div>
              <div class="py-3 text-sm">
                <div v-for="(classroom, index) in filteredClassroom" @click="setClassroom(classroom)" class="flex items-center justify-start cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-100 rounded-md px-2 py-2 my-2">
                  <span class="bg-gray-400 h-2 w-2 m-2 rounded-full"></span>
                  <div class="flex-grow font-medium px-2">{{ classroom.name }}</div>
                </div>
                <small v-if="filteredClassroom === null || filteredClassroom.length === 0" class="text-gray-600">Kelas tidak ditemukan</small>
              </div>
            </div>
          </div>
          <div class="w-md">
            <input type="text" class="pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300 w-full" name="" placeholder="Cari...">
          </div>
        </div>
      </div>
      <perfect-scrollbar class="border-t border-b border-gray-100 max-h-96 overflow-y-scroll">
        <div class="bg-white py-2 px-2 border-l border-r border-gray-300">
          <div class="hover:bg-gray-50 p-1 sm:p-0 mb-1 border-b border-gray-200" v-for="(plan, index) in plans" :key="plan.id">
            <div class="flex flex-col sm:flex-row py-1 justify-between sm:items-center">
              <div class="sm:px-1 flex items-start">
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
              <div class="flex space-x-1 pr-2 border-t md:border-0 border-gray-200 pt-2 md:pt-0">
                <button class="py-1 px-4 text-sm rounded-md bg-gray-50 text-gray-600 border-gray-300 border hover:shadow-md">Detail</button>
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
      classroomSelected: {},
      dialogClassroom: false,
    }
  },
  computed: {
    ...mapState(['isLoading']),
    ...mapState('auth',['authorized_user']),
    ...mapState('subject_plan', ['plans']),
    ...mapState('academic_classroom', ['classrooms']),
    filteredClassroom() {
      if(this.classrooms == null) {
        return []
      }
      return this.classrooms.filter((item) => item.classroomName.toLowerCase().includes(this.classroomName.toLowerCase()))
    }
  },
  method: {
    ...mapActions('subject_plan', ['fetchSubjectPlans']),
    ...mapActions('academic_classroom', ['fetchClassrooms']),
    showError(err) {
      showSweetError(this, err)
    },
    selectAllRows() {
      this.selected = this.plans.map((item) => item.id)
    },
    clearSelected() {
      this.selected = []
    },
    fetchDataSubjectPlans() {
      (async() => {
        try {
          await this.fetchDataSubjectPlans({
            query: this.search,
            teacherID: this.authorized_user.id,
            classroomID: this.classroomSelected.id,
          })
        } catch (err) {
          this.showError(err)
        }
      })()
    },
    fetchDataClassrooms() {
      (async() => {
        try {
          await this.fetchClassrooms()
        } catch (err) {
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

      })
    }
  },
  created() {
    this.fetchDataSubjectPlans()
  },
  watch: {
    search: _.debounce(function (value) {
      this.fetchDataSubjectPlans()
    })
  }
};
</script>