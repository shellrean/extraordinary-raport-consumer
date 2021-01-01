<template>
   <div>
    <form @submit.prevent="submit">
      <div class="form-group">
        <label>Email</label>
        <input type="email" class="form-control form-control-sm" placeholder="Email" required v-model="user.email"/>
      </div>
      <div class="form-group">
        <label>Nama</label>
        <input type="text" class="form-control form-control-sm" placeholder="Nama"required v-model="user.name"/>
      </div>
      <div class="form-group" v-if="typeof user.id == 'undefined'">
        <label>Password</label>
        <input type="password" class="form-control form-control-sm" placeholder="Password"required v-model="user.password" @input="onInputPassword"/>
      </div>
      <div class="form-group" v-if="typeof user.id == 'undefined'">
        <label>Re-password</label>
        <input type="password" class="form-control form-control-sm" placeholder="Password konfirmasi"required v-model="data.password" @input="onInputPassword"/>
         <small class="text-danger" v-show="submit_disable">Re-password harus sama dengan password</small>
      </div>
      <hr style="border-top: 1.9px dashed #ccc" />
      <div class="form-group">
        <button class="btn btn-primary btn-sm mr-1" type="submit" :disabled="isLoading || submit_disable">Simpan</button>
        <button class="btn btn-secondary btn-sm" type="button" @click="close" :disabled="isLoading">Batal</button>
      </div>
    </form>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'
export default {
  data() {
    return {
      data: {
        password: ''
      },
      submit_disable: false
    }
  },
  computed: {
    ...mapState(['isLoading']),
    ...mapState('user', ['user']),
  },
  methods: {
    ...mapActions('user', ['storeUsers', 'fetchUsers', 'updateUsers']),
    close() {
      this.$bvModal.hide('modal-user')
      this.$store.commit('user/_set_user_form_data', {})
    },
    onInputPassword() {
      if(this.user.password != this.data.password) {
        this.submit_disable = true
      } else {
        this.submit_disable = false
      }
    },
    submit() {
      if(typeof this.user.id != 'undefined') {
        (async () => {
          try {
            await this.updateUsers()
            this.close()
            this.$store.commit('user/_set_user_next_cursor_data', this.$store.state.user.cursor.prev[this.$store.state.user.cursor.prev.length - 1])
            await this.fetchUsers()
          } catch (error) {
            this.$bvToast.toast(`Error: ${error.message}`, {
              title: "Terjadi kesalahan",
              variant: "danger",
              solid: true
            })
          }
        })()
      } else {
        (async () => {
          try {
            await this.storeUsers()
            this.close()
            this.$store.commit('user/_set_user_next_cursor_data', this.$store.state.user.cursor.prev[this.$store.state.user.cursor.prev.length - 1])
            await this.fetchUsers()
          } catch (error) {
            this.$bvToast.toast(`Error: ${error.message}`, {
              title: "Terjadi kesalahan",
              variant: "danger",
              solid: true
            })
          }
        })()
      }
    }
  },
  created() {

  },
}
</script>