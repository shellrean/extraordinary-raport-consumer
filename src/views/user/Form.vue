<template>
   <div>
    <form @submit.prevent="true">
      <div class="form-group">
        <label>Email</label>
        <input type="email" class="form-control form-control-sm" placeholder="Email" required/>
      </div>
      <div class="form-group">
        <label>Nama</label>
        <input type="text" class="form-control form-control-sm" placeholder="Nama"required />
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" class="form-control form-control-sm" placeholder="Password"required />
      </div>
      <div class="form-group">
        <label>Re-password</label>
        <input type="password" class="form-control form-control-sm" placeholder="Password konfirmasi"required />
      </div>
      <hr style="border-top: 1.9px dashed #ccc" />
      <div class="form-group">
        <button class="btn btn-primary btn-sm mr-1" type="submit">Simpan</button>
        <button class="btn btn-secondary btn-sm" type="button" @click="close">Batal</button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  methods: {
    close() {
      this.$bvModal.hide('modal-user')
    }
  }
}
</script>