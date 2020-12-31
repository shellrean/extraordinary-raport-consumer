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
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="flaticon-email"></i>
                  </span>
                </div>
                <input class="form-control" type="text" placeholder="Email" name="username" required autofocus>
              </div>
              <div class="input-group mb-4">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="flaticon-lock"></i>
                  </span>
                </div>
                <input class="form-control" placeholder="Password" />
              </div>
              <button class="btn btn-primary px-4" type="submit" :disabled="isLoading">Login</button>
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
import { mapActions, mapMutations, mapGetters, mapState } from 'vuex'
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
    async postLogin() {
      try {

      } catch (error) {
        this.$bvToast.toast(`Error: ${error.message}`, {
          title: "Terjadi kesalahan",
          variant: "success",
          solid: true
        })
      }
    }
  }
}
</script>