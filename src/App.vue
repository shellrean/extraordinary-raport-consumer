<template>
  <router-view />
</template>
<script>
import Notify from '@/core/services/notif.service'
import Message from '@/core/domain/message.domain'
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  name: 'App',
  // computed: {
  //   ...mapState(['isLoading']),
  //   ...mapGetters(['isAuth']),
  // },
  // methods: {
  //   ...mapActions('auth', ['getAuthorizeUser']),
  //   showError(err) {
  //     const error = new Message(err)
  //     const message = error.getMessage()
  //     const code = error.getCode()
  //     const notification = new Notify(code, message)
  //     notification.sweetAlertNotif(this)
  //   },
  //   getUserAuthorize() {
  //     (async() => {
  //       try {
  //         await this.getAuthorizeUser()
  //       } catch (err) {
  //         this.showError(err)
  //       }
  //     })()
  //   },
  // },
  // created() {
  //   if (this.isAuth) {
  //     this.getUserAuthorize()
  //   }
  // }
};
</script>
<style type="scss">
.swal2-popup {
  font-size: 0.7rem !important;
}
.swal2-popup {
  border: 2px solid #676565;
}
</style>