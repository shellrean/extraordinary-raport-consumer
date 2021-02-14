<template>
  <div class="container md:mx-auto flex flex-col justify-center space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4">
    <div class="bg-white w-full lg:w-1/2 py-4 px-4 rounded-lg shadow border border-gray-300">
      <p class="text-gray-500 text-2xl mb-2 font-medium">Pengguna</p>
      <hr>
      <form @submit.prevent="submit">
        <UserForm />
        <router-link :to="{name: 'master.user' }" class="inline-block mr-1 rounded-md py-1 px-3 bg-gray-400 border-2 border-gray-500 hover:shadow-xl disabled:opacity-50 text-white font-medium">Kembali</router-link>
        <button type="submit" class="py-1 px-3 rounded-md bg-green-400 border-2 border-green-500 hover:shadow-xl disabled:opacity-50 text-white font-medium">{{ isLoading ? 'Processing...' : 'Simpan' }}</button> 
      </form>
    </div>
  </div>
</template>
<script>
import UserForm from './UserForm'
import { showSweetError } from '@/core/helper/alert.helper'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'Form',
  components: {
    UserForm,
  },
  data() {
    return {
      notif: [],
    }
  },
  computed: {
    ...mapState(['isLoading']),
    ...mapState('user', ['user']),
  },
  methods: {
    ...mapActions('user', ['storeUser', 'updateUser', 'showUser']),
    showError(err) {
      showSweetError(this, err)
    },
    updateDataUser() {
      (async() => {
        try {
          await this.updateUser()
          this.$swal('Sukses', 'Perubahan berhasil disimpan', 'success');
          this.$router.push({name: 'master.user'})
        } catch (err) {
          if (typeof err.error_code != 'undefined' && err.error_code == 1201) {
            this.updateDataUser()
            return
          }
          this.showError(err)
        }
      })()
    },
    createDataUser() {
      (async() => {
        try {
          await this.storeUser()
          this.$swal('Sukses', 'Pengguna baru berhasil disimpan', 'success');
          this.$router.push({name: 'master.user'})
        } catch (err) {
          if (typeof err.error_code != 'undefined' && err.error_code == 1201) {
            this.createDataUser()
            return
          }
          this.showError(err)
        }
      })()
    },
    submit() {
      if(typeof this.user.id != 'undefined') {
        this.updateDataUser()
      } else {
        this.createDataUser()
      }
    },
    getDataUser() {
      (async() => {
        try {
          await this.showUser(this.$route.params.id)
        } catch (err) {
          if (typeof err.error_code != 'undefined' && err.error_code == 1201) {
            this.getDataUser()
            return
          }
          this.showError(err)
        }
      })()
    }
  },
  created() {
    if(this.$route.name == 'master.user.edit') {
      this.getDataUser()
    }
  }
};
</script>