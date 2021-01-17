<template>
  <div class="flex flex-col space-y-4 lg:flex-row lg:space-y-0 h-full w-full">
    <div class="border pb-2 lg:pb-0 w-full lg:max-w-xs px-3 flex flex-row lg:flex-col flex-wrap lg:flex-nowrap">
     <MasterMenus />
    </div>
    <div class="border h-full w-full lg:flex-1 px-3 min-h-0 min-w-0">
      <p class="text-xl mb-2 font-medium text-gray-600">Daftar siswa</p>
      <div class="bg-white py-2 px-2 rounded-t-lg mb-2 border border-gray-300 shadow flex items-center flex-col space-y-4 lg:flex-row lg:space-y-0">
        <div class="w-full lg:max-w-xs">
          <router-link :to="{name: 'master.student.create' }" class="mr-1 rounded-md py-1 px-3 bg-blue-400 border-2 border-blue-500 hover:shadow-xl disabled:opacity-50 text-white font-medium">Tambah</router-link>
          <router-link to="/" class="py-1 px-3 rounded-md bg-green-400 border-2 border-green-500 hover:shadow-xl disabled:opacity-50 text-white font-medium">Import</router-link> 
        </div>
        <div class="w-full lg:flex-1">
          <input type="text" class="rounded-md py-1 px-2 bg-gray-200 focus:bg-gray-100 border-2 border-gray-300 w-full" name="" placeholder="Cari">
        </div>
      </div>
      <div class="max-h-96 overflow-y-scroll mb-2">
        <div class="bg-white p-1 sm:p-0 mb-2 border border-gray-300 shadow rounded-lg" v-for="(student,index) in students" :key="index">
          <div class="flex flex-col sm:flex-row py-1 justify-between sm:items-center">
            <div class="sm:px-1 flex items-center">
              <div class="flex flex-col">
                <p class="sm:px-3 text-xs text-gray-700">{{ student.srn }} | {{ student.nsrn }}</p>
                <p class="sm:px-3 font-semibold text-gray-700">{{ student.name }}</p>
              </div>
            </div>
            <div class="flex pr-2">
              <button class="px-2 mr-1 rounded-sm bg-blue-400 text-white hover:shadow-md border-blue-500 border font-medium" @click="showDataStudent(student.id)">Detail</button>
              <router-link :to="{name: 'master.student.edit', params: {id: student.id}}" class="px-2 mr-1 rounded-sm bg-yellow-400 text-white hover:shadow-md border-yellow-500 border font-medium" >Edit</router-link>
              <button class="px-2 rounded-sm bg-red-400 text-white font-medium border-red-500 border hover:shadow-md" @click="deleteSingleStudent(student.id, index)">Hapus</button>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-white py-2 px-2 rounded-b-lg mb-2 border border-gray-300 shadow">
        <button :disabled="isLoading || cursor.prev.length == 1" @click="prevPage" class="rounded-l-md py-1 px-3 bg-gray-500 hover:shadow-xl disabled:opacity-50 text-white font-medium border-2 border-gray-600" :class="{'opacity-50 cursor-default': isLoading}">Kembali</button>
        <button class="rounded-r-md py-1 px-3 bg-gray-500 hover:shadow-xl disabled:opacity-50 text-white font-medium border-t-2 border-r-2 border-b-2 border-gray-600" :disabled="isLoading || typeof cursor.next == 'undefined'" @click="nextPage" :class="{'opacity-50 cursor-default': isLoading}">Lanjut</button>  
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
    <div class="absolute left-4 bottom-4 xl:left-10 xl:bottom-10">
      <div class="flex flex-col space-y-2">
        <Notif :msg="val.msg" v-for="val in notif" :key="val.id"/>
      </div>
    </div>
  </div>
</template>
<script>
import Notif from '@/components/nano/Notif'
import MasterMenus from '@/components/MasterMenus'
import StudentDetail from './StudentDetail'
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'Student',
  components: {
    StudentDetail,
    MasterMenus,
    Notif,
  },
  data() {
    return {
      show_modal: false,
      notif: [],
      detail: {}
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
    showDataStudent(id) {
      let idx = this.students.map((item) => item.id).indexOf(id)
      if (idx !== -1) {
        this.detail = this.students[idx]
        this.show_modal = true
      }
    },
    prevPage() {
      (async () => {
        try {
          await this.fetchStudents(true)
        } catch (err) {
         let id = new Date().getTime()
          this.notif.push({id: id, msg: err.message})
          let idx = this.notif.map((item) => item.id).indexOf(id)
          if(idx !== -1) {
            setTimeout(() => { 
              this.notif.splice(idx, 1)
            }, 3000);
          }
        }
      })()
    },
    nextPage() {
      (async () => {
        try {
          await this.fetchStudents()
        } catch (err) {
          let id = new Date().getTime()
          this.notif.push({id: id, msg: err.message})
          let idx = this.notif.map((item) => item.id).indexOf(id)
          if(idx !== -1) {
            setTimeout(() => { 
              this.notif.splice(idx, 1)
            }, 3000);
          }
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
      }).then(async (result) => {
        if (result.value) {
          try {
            await this.deleteStudent(id)
            this.students.splice(index, 1)
          } catch (err) {
            let id = new Date().getTime()
            this.notif.push({id: id, msg: err.message})
            let idx = this.notif.map((item) => item.id).indexOf(id)
            if(idx !== -1) {
              setTimeout(() => { 
                this.notif.splice(idx, 1)
              }, 3000);
            }
          }
        }
      })
    }
  },
  created() {
    (async () => {
      try {
        this.$store.commit('student/_reset_student_cursor')
        await this.fetchStudents()
      } catch (err) {
        let id = new Date().getTime()
        this.notif.push({id: id, msg: err.message})
        let idx = this.notif.map((item) => item.id).indexOf(id)
        if(idx !== -1) {
          setTimeout(() => { 
            this.notif.splice(idx, 1)
          }, 3000);
        }
      }
    })()
  },
};
</script>