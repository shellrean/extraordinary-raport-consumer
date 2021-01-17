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
    <div class="absolute left-4 bottom-4 xl:left-10 xl:bottom-10">
      <div class="flex flex-col space-y-2">
        <Notif :msg="val.msg" v-for="val in notif" :key="val.id"/>
      </div>
    </div>
  </div>
</template>
<script>
import Notif from '@/components/nano/Notif'
import UserForm from './UserForm'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'Form',
  components: {
    UserForm,
    Notif,
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
    submit() {
      if(typeof this.user.id != 'undefined') {
        (async() => {
          try {
            await this.updateUser()
            this.$swal('Sukses', 'Perubahan berhasil disimpan', 'success');
            this.$router.push({name: 'master.user'})
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
      } else {
        (async() => {
          try {
            await this.storeUser()
            this.$swal('Sukses', 'Pengguna baru berhasil disimpan', 'success');
            this.$router.push({name: 'master.user'})
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
      }
    }
  },
  created() {
    if(this.$route.name == 'master.user.edit') {
      (async() => {
        try {
          await this.showUser(this.$route.params.id)
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
    }
  }
};
</script>