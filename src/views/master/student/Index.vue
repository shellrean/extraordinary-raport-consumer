<template>
  <div class="flex container md:mx-auto flex-col space-y-4 lg:flex-row lg:space-y-0 h-full w-full">
    <div class="h-full w-full mx-auto lg:flex-1 px-3 min-h-0 min-w-0">
      <div class="bg-white pt-6 pb-2 rounded-t-lg border-t border-l border-r border-gray-300 shadow-sm flex flex-col">
        <div class="flex justify-start space-x-2 mb-2 px-4">
          <router-link :to="{name:'master.index'}" class="block w-4 h-4 bg-red-400 rounded-full cursor-pointer hover:shadow-xl hover:w-8 hover:h-8"></router-link>
          <div class="w-4 h-4 bg-yellow-400 rounded-full cursor-pointer hover:shadow-xl hover:w-8 hover:h-8"></div>
          <div class="w-4 h-4 bg-green-400 rounded-full cursor-pointer hover:shadow-xl hover:w-8 hover:h-8"></div>
        </div>
        <div class="flex flex-col sm:flex-row justify-between items-center px-4 mb-4">
          <p class="text-lg sm:text-2xl font-bold text-gray-500">Daftar siswa</p>
          <div class="flex space-x-1">
            <router-link :to="{name: 'master.student.create' }" class="py-2 text-sm px-4 rounded-md border border-gray-300 text-gray-600 disabled:opacity-50 text-white font-medium">Import siswa</router-link>
            <router-link :to="{name: 'master.student.create' }" class="py-2 text-sm px-4 rounded-md bg-blue-400 disabled:opacity-50 text-white font-medium">Tambah siswa</router-link>
          </div>
        </div>
        <div class="flex">
          <p class="pb-2 border-b-2 border-gray-200 px-4 font-semibold text-gray-400">Siswa aktif</p>
          <p class="pb-2 border-b-2 border-blue-400 px-4 font-semibold text-blue-400">Semua siswa</p>
          <p class="pb-2 border-b-2 border-gray-200 px-4 flex-1"></p>
        </div>
        <div class="flex w-full py-1 px-4 py-2">
          <div class="w-full sm:w-md">
            <input v-model="search" type="text" class="rounded-md py-1 px-4 focus:border-blue-200 border border-gray-300 w-full" name="" placeholder="Cari siswa">
          </div>
        </div>
        <div class="flex px-2 flex-col border-t border-b py-2 border-gray-300 sm:flex-row py-1 justify-between sm:items-center border-gray-300">
          <div class="sm:px-1 flex items-center">
            <div class="pl-2 pr-2 sm:pr-0" v-if="selected.length != 'undefined' && students != null">
              <input :checked="selected.length == students.length" @input="onCheckAllClick" type="checkbox" />
            </div>
            <div class="flex flex-col">
              <p class="sm:px-3 font-medium text-gray-600 text-sm">INFO SISWA</p>
            </div>
          </div>
          <div class="flex space-x-1 pr-2 border-t md:border-0 border-gray-200 pt-2 md:pt-0">
            <p class="sm:px-3 font-medium text-gray-600 text-sm">AKSI</p>
          </div>
        </div>
      </div>
      <perfect-scrollbar class="max-h-96 overflow-y-scroll">
        <div class="bg-white py-2 px-2 border-l border-r border-gray-300">
          <div class="hover:bg-gray-50 p-1 sm:p-0 mb-1 border-b border-gray-200" v-for="(student,index) in students" :key="index">
            <div class="flex flex-col sm:flex-row py-1 justify-between sm:items-center">
              <div class="sm:px-1 flex items-center">
                <div class="pl-2 pr-2 sm:pr-0">
                  <input type="checkbox" :value="student.id" :checked="selected.includes(student.id)" @input="onCheckClick"/>
                </div>
                <div class="flex flex-col">
                  <p class="sm:px-3 text-xs text-gray-700">{{ student.srn }} | {{ student.nsrn }}</p>
                  <p class="sm:px-3 text-gray-700">{{ student.name }}</p>
                </div>
              </div>
              <div class="flex space-x-1 pr-2 border-t md:border-0 border-gray-200 pt-2 md:pt-0">
                <button class="py-1 px-4 text-sm rounded-md bg-gray-50 text-gray-600 border-gray-300 border hover:shadow-md" @click="showDataStudent(student.id)">Detail</button>
                <router-link :to="{name: 'master.student.edit', params: {id: student.id}}" class="py-1 px-4 text-sm rounded-md bg-yellow-50 text-yellow-600 border-yellow-300 border hover:shadow-md" >Edit</router-link>
                <button class="py-1 px-4 text-sm rounded-md bg-red-50 text-red-600 border-red-300 border hover:shadow-md" @click="deleteSingleStudent(student.id, index)">Hapus</button>
              </div>
            </div>
          </div>
        </div>
      </perfect-scrollbar>
      <div class="bg-white py-2 flex flex-col sm:flex-row justify-between px-2 rounded-b-lg mb-2 border-l border-b border-r border-gray-300 shadow-sm">
        <div>
          <button class="text-sm rounded-l-md py-1 px-3 bg-gray-100 text-gray-600 hover:shadow-xl hover:bg-gray-200 disabled:opacity-50 text-white border-l border-t border-b border-gray-300" @click="clearSelected" :disabled="selected.length === 0">Clear</button>
          <button class="text-sm py-1 px-3 bg-gray-100 text-gray-600 hover:shadow-xl hover:bg-gray-200  disabled:opacity-50 text-white border-t border-b border-gray-300" @click="selectAllRows" :disabled="selected.length == (students != null ? students.length : 0)">Pilih semua</button>
          <button class="text-sm rounded-r-md py-1 px-3 bg-gray-100 text-gray-600 hover:shadow-xl hover:bg-gray-200 disabled:opacity-50 text-white border-r border-t border-b border-gray-300" @click="deleteMultipleStudents" :disabled="selected.length === 0">Hapus</button>
        </div>
        <div>
          <button :disabled="isLoading || cursor.prev.length == 1" @click="prevPage" class="text-sm rounded-l-md py-1 px-3 bg-gray-100 text-gray-600 hover:shadow-xl hover:bg-gray-200 disabled:opacity-50 text-white border-t border-l border-b border-gray-300" :class="{'opacity-50 cursor-default': isLoading}">Kembali</button>
          <button class="text-sm rounded-r-md py-1 px-3 bg-gray-100 text-gray-600 hover:shadow-xl hover:bg-gray-200 disabled:opacity-50 text-white border-t border-r border-b border-gray-300" :disabled="isLoading || typeof cursor.next == 'undefined'" @click="nextPage" :class="{'opacity-50 cursor-default': isLoading}">Lanjut</button>  
        </div>
      </div>
    </div>
    <div class="fixed z-10 inset-0 overflow-y-auto" v-if="show_modal">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
          <div class="bg-white pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <h3 class="text-lg font-medium text-gray-900">
                  Detail siswa
                </h3>
                <div class="mt-2 text-gray-700">
                  <StudentDetail :detail="detail" />
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button :disabled="isLoading" @click="show_modal=false"type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MasterMenus from '@/components/MasterMenus'
import StudentDetail from './StudentDetail'
import { showSweetError } from '@/core/helper/alert.helper'
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'
import _ from 'lodash'

export default {
  name: 'Student',
  components: {
    StudentDetail,
    MasterMenus,
    PerfectScrollbar
  },
  data() {
    return {
      show_modal: false,
      notif: [],
      detail: {},
      selected: [],
      search: '',
    }
  },
  computed: {
    ...mapState(['isLoading']),
    ...mapState('student', ['student','students','cursor']),
    limit: {
      get() {
        return this.$store.state.student.limit
      },
      set(val) {
        this.$store.commit('user/_set_student_limit_page', val)
      }
    }
  },
  methods: {
    ...mapActions('student',['fetchStudents', 'deleteStudent']),
    showError(err) {
      showSweetError(this, err)
    },
    showDataStudent(id) {
      let idx = this.students.map((item) => item.id).indexOf(id)
      if (idx !== -1) {
        this.detail = this.students[idx]
        this.show_modal = true
      }
    },
    selectAllRows() {
      this.selected = this.students.map((item) => item.id)
    },
    clearSelected() {
      this.selected = []
    },
    onCheckClick(e) {
      if(e.target.checked) {
        this.selected.push(e.target.value)
      } else {
        let idx = this.selected.indexOf(e.target.value)
        if (idx !== -1) {
          this.selected.splice(idx, 1)
        }
      }
    },
    onCheckAllClick(e) {
      if(e.target.checked) {
        this.selectAllRows()
      } else {
        this.clearSelected()
      }
    },
    prevPage() {
      (async () => {
        try {
          await this.fetchStudents({ search: this.search, reverse: true })
          this.clearSelected()
        } catch (err) {
          if (typeof err.error_code != 'undefined' && err.error_code == 1201) {
            this.prevPage()
            return
          }
          this.showError(err)
        }
      })()
    },
    nextPage() {
      (async () => {
        try {
          await this.fetchStudents({ search: this.search })
          this.clearSelected()
        } catch (err) {
          if (typeof err.error_code != 'undefined' && err.error_code == 1201) {
            this.nextPage()
            return
          }
          this.showError(err)
        }
      })()
    },
    doDeleteSingleStudent(id, index) {
      (async() => {
        try {
          await this.deleteStudent(id)
          this.students.splice(index, 1)
        } catch (err) {
          if (typeof err.error_code != 'undefined' && err.error_code == 1201) {
            this.doDeleteSingleStudent(id, index)
            return
          }
          this.showError(err)
        }
      })()
    },
    deleteSingleStudent(id, index) {
      this.$swal({
        title: 'Peringatan',
        text: "Siswa yang dipilih akan dihapus berserta data yang terkait",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#c7c7c7',
        confirmButtonText: 'Iya, Lanjutkan!'
      }).then((result) => {
        if (result.value) {
          this.doDeleteSingleStudent()
        }
      })
    },
    doDeleteMultipleStudents() {
      (async() => {
        try {

        } catch (err) {
          if (typeof err.error_code != 'undefined' && err.error_code == 1201) {
            this.doDeleteMultipleStudents()
            return
          }
          this.showError(err)
        }
      })()
    },
    deleteMultipleStudents() {
      this.$swal({
        title: 'Peringatan',
        text: `${this.selected.length } siswa akan dihapus berserta data yang terkait`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#c7c7c7',
        confirmButtonText: 'Iya, Lanjutkan!'
      }).then(async (result) => {

      })
    },
    fetchDataStudents() {
      (async() => {
        try {
          this.$store.commit('student/_reset_student_cursor')
          await this.fetchStudents({ search: this.search })
          this.clearSelected()
        } catch (err) {
          if (typeof err.error_code != 'undefined' && err.error_code == 1201) {
            this.fetchDataStudents()
            return
          }
          this.showError(err)
        }
      })()
    }
  },
  created() {
    this.fetchDataStudents()
  },
  watch: {
    search: _.debounce(function(value) {
      this.fetchDataStudents()
    })
  }
};
</script>