<template>
  <div class="flex flex-col space-y-4 lg:flex-row lg:space-y-0 h-full w-full">
    <div class="border pb-2 lg:pb-0 w-full lg:max-w-xs px-3 flex flex-row lg:flex-col flex-wrap lg:flex-nowrap">
      <MasterMenus />
    </div>
    <div class="border h-full w-full lg:flex-1 px-3 min-h-0 min-w-0">
      <p class="text-xl mb-2 font-medium text-gray-600">Daftar pengguna</p>
      <div class="bg-white py-4 sm:py-2 px-2 rounded-t-lg mb-2 border border-gray-300 shadow flex items-center flex-col space-y-4 lg:flex-row lg:space-y-0">
        <div class="w-full lg:max-w-xs">
          <router-link :to="{name: 'master.user.create' }" class="mr-1 rounded-md py-1 px-3 bg-blue-400 border-2 border-blue-500 hover:shadow-xl disabled:opacity-50 text-white font-medium">Tambah</router-link>
          <router-link :to="{name: 'master.user.import' }" class="py-1 px-3 rounded-md bg-green-400 border-2 border-green-500 hover:shadow-xl disabled:opacity-50 text-white font-medium">Import</router-link> 
        </div>
        <div class="w-full lg:flex-1">
          <input v-model="search" type="text" class="rounded-md py-1 px-2 bg-gray-200 focus:bg-gray-100 border-2 border-gray-300 w-full" name="" placeholder="Cari">
        </div>
      </div>
      <div class="max-h-96 overflow-y-scroll mb-2">
        <span class="font-medium text-gray-600" v-if="typeof users == 'undefined' || users === null || users.length === 0">Tidak ada data pengguna...</span>
        <div class="bg-white p-1 sm:p-0 mb-2 border border-gray-300 shadow rounded-lg" v-for="(user, index) in users">
          <div class="flex flex-col sm:flex-row py-1 justify-between sm:items-center">
            <div class="sm:px-1 flex items-center">
              <div class="pl-2 pr-2 sm:pr-0">
                <input type="checkbox" :value="user.id" :checked="selected.includes(user.id)" @input="onCheckClick">
              </div>
              <div class="flex flex-col">
                <p class="sm:px-3 font-semibold text-gray-700">{{ user.name }}</p>
                <p class="sm:px-3 text-xs text-gray-600">{{ user.email }}</p>
              </div>
            </div>
            <div class="flex pt-2 sm:pt-0 pr-2 border-t sm:border-0 border-gray-300">
              <router-link :to="{name: 'master.user.edit', params: {id: user.id}}" class="inline-block px-2 mr-1 rounded-sm bg-gray-100 text-gray-600 hover:shadow-md border-gray-300 border">Edit</router-link>
              <button @click="deleteSingleUser(user.id, index)" class="px-2 rounded-sm bg-gray-100 text-gray-600 border-gray-300 border hover:shadow-md ">Hapus</button>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-white py-2 flex justify-between px-2 rounded-b-lg mb-2 border border-gray-300 shadow">
        <div>
          <button class="rounded-l-md py-1 px-3 bg-gray-100 text-gray-600 hover:shadow-xl hover:bg-gray-200 disabled:opacity-50 text-white border-l border-t border-b border-gray-300" @click="clearSelected" :disabled="selected.length === 0">Clear</button>
          <button class="py-1 px-3 bg-gray-100 text-gray-600 hover:shadow-xl hover:bg-gray-200  disabled:opacity-50 text-white border-t border-b border-gray-300" @click="selectAllRows" :disabled="selected.length == (users != null ? users.length : 0)">Pilih semua</button>
          <button class="rounded-r-md py-1 px-3 bg-gray-100 text-gray-600 hover:shadow-xl hover:bg-gray-200 disabled:opacity-50 text-white border-r border-t border-b border-gray-300" @click="deleteMultipleUsers" :disabled="selected.length === 0">Hapus</button>
        </div>
        <div>
          <button :disabled="isLoading || cursor.prev.length == 1"  class="rounded-l-md py-1 px-3 bg-gray-100 text-gray-600 hover:shadow-xl hover:bg-gray-200 disabled:opacity-50 text-white border-t border-l border-b border-gray-300"  @click="prevPage">Kembali</button>
          <button :disabled="isLoading || typeof cursor.next == 'undefined'" class="rounded-r-md py-1 px-3 bg-gray-100 text-gray-600 hover:shadow-xl hover:bg-gray-200 disabled:opacity-50 text-white border-t border- border-b border-gray-300" @click="nextPage">Lanjut</button>  
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
import LoadBar from '@/components/nano/LoadBar'
import MasterMenus from '@/components/MasterMenus'
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'
import _ from 'lodash'

export default {
  name: 'User',
  components: {
    MasterMenus,
    Notif,
    LoadBar
  },
  data() {
    return {
      notif: [],
      selected: [],
      search: ''
    }
  },
  computed: {
    ...mapState(['isLoading']),
    ...mapState('user', ['users','users','cursor']),
  },
  methods: {
    ...mapActions('user',['fetchUsers', 'deleteUser', 'deleteUsers']),
    selectAllRows() {
      this.selected = this.users.map((item) => item.id)
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
    prevPage() {
      this.clearSelected()
      (async () => {
        try {
          await this.fetchUsers({reverse: true })
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
      this.clearSelected()
      (async () => {
        try {
          await this.fetchUsers()
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
    deleteSingleUser(id, index) {
      this.$swal({
        title: 'Peringatan',
        text: "Pengguna yang dipilih akan dihapus berserta data yang terkait",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#c7c7c7',
        confirmButtonText: 'Iya, Lanjutkan!'
      }).then(async (result) => {
        if (result.value) {
          try {
            await this.deleteUser(id)
            this.users.splice(index, 1)
            this.$swal('Sukses', 'Pengguna berhasil dihapus', 'success');
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
    },
    deleteMultipleUsers() {
      this.$swal({
        title: 'Peringatan',
        text: `${this.selected.length } pengguna akan dihapus berserta data yang terkait`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#c7c7c7',
        confirmButtonText: 'Iya, Lanjutkan!'
      }).then(async (result) => {
        if (result.value) {
          try {
            await this.deleteUsers(this.selected)
            this.$swal('Sukses', 'Pengguna berhasil dihapus', 'success')
            this.$store.commit('user/_reset_user_cursor')
            await this.fetchUsers()
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
        this.$store.commit('user/_reset_user_cursor')
        await this.fetchUsers()
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
  watch: {
    search:  _.debounce(async function (value) {
      try {
        this.$store.commit('user/_reset_user_cursor')
        this.fetchUsers({ search: this.search })
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
    }, 500),
  }
};
</script>