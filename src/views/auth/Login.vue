<template>
  <div class="app flex-row align-items-center">
  <div class="container">
    <div class="row justify-content-center mt-4">
      <div class="col-md-8">
        <div class="card-group">
          <div class="card p-4">
            <div class="card-body">
              <h2>Login</h2>
              <p class="text-muted">Masuk akun anda</p>
              <form @submit.prevent="postLogin">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="flaticon-email"></i>
                  </span>
                </div>
                <input class="form-control" type="email" placeholder="Email" name="username" required autofocus v-model="data.email">
              </div>
              <div class="input-group mb-4">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="flaticon-lock"></i>
                  </span>
                </div>
                <input type="password" class="form-control" placeholder="Password" required v-model="data.password"/>
              </div>
              <button class="btn btn-primary px-4" type="submit" :disabled="isLoading">Login</button>
              </form>
            </div>
          </div>
          <div class="card text-white bg-primary py-5 d-md-down-none" style="width:44%">
            <div class="card-body text-center">
              <div>
                <img src="/img/logo.ico" loading="lazy" width="70px" class="mb-3">
                <p>Selamat datang di Admin Panel, Silahkan masukan email dan password untuk login ke halaman administrasi.</p>
              </div>
            </div>
          </div>
        </div>            
      </div>
    </div>
  </div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  data() {
    return {
      data: {
        email: '',
        password: ''
      }
    }
  },
  computed: {
    ...mapGetters(['isAuth']),
    ...mapState(['errors','isLoading','loadPage'])
  },
  created() {
    this.$bvToast.toast("Extraordinary raport manajement sistem",{
      title: "Selamat datang",
      variant: "info",
      solid: true
    }) 
  },
  methods: {
    ...mapActions('auth', ['submit']),
    async postLogin() {
      try {
        let provider = await this.submit(this.data)
        if (this.isAuth) {
          this.$router.push({ name: 'dashboard' })
        }
      } catch (error) {
        this.$bvToast.toast(`Error: ${error.message}`, {
          title: "Terjadi kesalahan",
          variant: "danger",
          solid: true
        })
      }
    }
  }
}
</script>