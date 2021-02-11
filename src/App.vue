<template>
  <router-view />
</template>
<script>
import Notify from '@/core/services/notif.service'
import Message from '@/core/domain/message.domain'
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  name: 'App',
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