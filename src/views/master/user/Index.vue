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
          <p class="text-lg sm:text-2xl font-bold text-gray-500">Daftar pengguna</p>
          <div class="flex space-x-1">
            <router-link :to="{name: 'master.user.import' }" class="py-2 text-sm px-4 rounded-md border border-gray-300 text-gray-600 disabled:opacity-50 text-white font-medium">Import user</router-link> 
            <router-link :to="{name: 'master.user.create' }" class="py-2 text-sm px-4 rounded-md bg-blue-400 disabled:opacity-50 text-white font-medium">Tambah user</router-link>
          </div>
        </div>
        <div class="flex w-full py-1 px-4 py-2">
          <div class="w-full sm:w-md">
            <input v-model="search" type="text" class="rounded-md py-1 px-4 focus:border-blue-200 border border-gray-300 w-full" name="" placeholder="Cari user">
          </div>
        </div>
        <div class="flex px-2 flex-col border-t border-b py-2 border-gray-300 sm:flex-row py-1 justify-between sm:items-center border-gray-300">
          <div class="sm:px-1 flex items-center">
            <div class="pl-2 pr-2 sm:pr-0" v-if="selected.length != 'undefined' && users != null">
              <input :checked="selected.length == users.length" @input="onCheckAllClick" type="checkbox" />
            </div>
            <div class="flex flex-col">
              <p class="sm:px-3 font-medium text-gray-600 text-sm">INFO USER</p>
            </div>
          </div>
          <div class="flex space-x-1 pr-2 border-t md:border-0 border-gray-200 pt-2 md:pt-0">
            <p class="sm:px-3 font-medium text-gray-600 text-sm">AKSI</p>
          </div>
        </div>
      </div>
      <perfect-scrollbar class="max-h-96 overflow-y-scroll">
        <div class="bg-white py-2 px-2 border-l border-r border-gray-300">
          <div class="hover:bg-gray-50 p-1 sm:p-0 mb-1 border-b border-gray-200" v-for="(user,index) in users" :key="index">
            <div class="flex flex-col sm:flex-row py-1 justify-between sm:items-center">
              <div class="sm:px-1 flex items-center">
                <div class="pl-2 pr-2 sm:pr-0">
                  <input type="checkbox" :value="user.id" :checked="selected.includes(user.id)" @input="onCheckClick">
                </div>
                <div class="flex flex-col">
                  <p class="sm:px-3 text-xs text-gray-700">{{ user.email }}</p>
                  <p class="sm:px-3 text-gray-700">{{ user.name }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </perfect-scrollbar>
      <div class="bg-white py-2 flex flex-col sm:flex-row justify-between px-2 rounded-b-lg mb-2 border-l border-b border-r border-gray-300 shadow-sm">
        <div>
          <button class="text-sm rounded-l-md py-1 px-3 bg-gray-100 text-gray-600 hover:shadow-xl hover:bg-gray-200 disabled:opacity-50 text-white border-l border-t border-b border-gray-300" @click="clearSelected" :disabled="selected.length === 0">Clear</button>
          <button class="text-sm py-1 px-3 bg-gray-100 text-gray-600 hover:shadow-xl hover:bg-gray-200  disabled:opacity-50 text-white border-t border-b border-gray-300" @click="selectAllRows" :disabled="selected.length == (users != null ? users.length : 0)">Pilih semua</button>
          <button class="text-sm rounded-r-md py-1 px-3 bg-gray-100 text-gray-600 hover:shadow-xl hover:bg-gray-200 disabled:opacity-50 text-white border-r border-t border-b border-gray-300" @click="deleteMultipleUsers" :disabled="selected.length === 0">Hapus</button>
        </div>
        <div>
          <button :disabled="isLoading || cursor.prev.length == 1"  class="text-sm rounded-l-md py-1 px-3 bg-gray-100 text-gray-600 hover:shadow-xl hover:bg-gray-200 disabled:opacity-50 text-white border-t border-l border-b border-gray-300"  @click="prevPage">Kembali</button>
          <button :disabled="isLoading || typeof cursor.next == 'undefined'" class="text-sm rounded-r-md py-1 px-3 bg-gray-100 text-gray-600 hover:shadow-xl hover:bg-gray-200 disabled:opacity-50 text-white border-t border-r border-b border-gray-300" @click="nextPage">Lanjut</button>  
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Notify from '@/core/services/notif.service'
import Message from '@/core/domain/message.domain'
import MasterMenus from '@/components/MasterMenus'
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'
import _ from 'lodash'

export default {
  name: 'User',
  components: {
    MasterMenus,
    PerfectScrollbar
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
    showError(err) {
      const error = new Message(err)
      const message = error.getMessage()
      const code = error.getCode()
      const notification = new Notify(code, message)
      notification.sweetAlertNotif(this)
    },
    selectAllRows() {
      this.selected = this.users.map((item) => item.id)
    },
    onCheckAllClick(e) {
      if(e.target.checked) {
        this.selectAllRows()
      } else {
        this.clearSelected()
      }
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
          this.clearSelected()
        } catch (err) {
          this.showError(err)
        }
      })()
    },
    nextPage() {
      this.clearSelected()
      (async () => {
        try {
          await this.fetchUsers()
          this.clearSelected()
        } catch (err) {
          this.showError(err)
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
            this.showError(err)
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
            this.clearSelected()
          } catch (err) {
            this.showError(err)
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
        this.clearSelected()
      } catch (err) {
        this.showError(err)
      }
    })()
  },
  watch: {
    search:  _.debounce(async function (value) {
      try {
        this.$store.commit('user/_reset_user_cursor')
        this.fetchUsers({ search: this.search })
        this.clearSelected()
      } catch (err) {
        this.showError(err)
      }
    }, 500),
  }
};
</script>