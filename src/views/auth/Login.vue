<template>
  <div class="h-screen overflow-hidden flex items-center justify-center"> 
    <div class="container max-w-full mx-auto py-24 px-6">
      <div class="font-sans">
        <div class="max-w-sm mx-auto px-6">
          <div class="relative flex flex-wrap">
            <div class="w-full relative">
              <div class="mt-6">
                <div class="text-center mb-5">
                  <img src="/img/logo.ico" class="mx-auto h-16 ">
                </div>
                <div class="text-center font-semibold text-black">
                  Extraordinary Rapor
                </div>
                <form class="mt-8" @submit.prevent="postLogin">
                  <div class="mx-auto max-w-lg">
                    <div class="py-2">
                      <span class="px-1 text-sm text-gray-600">Email</span>
                      <input v-model="data.email" placeholder="" type="email" required="" class="text-md block px-3 py-2  rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none">
                    </div>
                    <div class="py-2">
                      <span class="px-1 text-sm text-gray-600">Password</span>
                      <div class="relative">
                        <input v-model="data.password" placeholder="" :type="show_pass ? 'password' : 'text'" class="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none" required="">
                        <a href="#" @click.prevent="show_pass = !show_pass" class="text-gray-700 text-xs">{{ show_pass ? 'Show' : 'Hide' }} password</a>
                      </div>
                    </div>
                    <button :disabled="isLoading" type="submit" class="transition duration-300 mt-3 text-lg font-semibold bg-gray-800 w-full text-white rounded-lg px-6 py-3 block shadow-xl hover:shadow-2xl" :class="{'opacity-50 cursor-default' : isLoading}"> Login </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Notify from '@/core/services/notif.service'
import Message from '@/core/domain/message.domain'
import { Role } from '@/core/domain/role.domain'
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  name: 'Login',
  components: {
  },
  data() {
    return {
      show_pass: true,
      data: {
        email: '',
        password: ''
      },
      notif: {
        show: false,
        msg: ""
      },
      returnUrl: ''
    }
  },
  computed: {
    ...mapGetters(['isAuth']),
    ...mapState(['errors','isLoading','loadPage']),
    ...mapState('auth', ['authorized_user'])
  },
  created() {
    this.returnUrl = this.$route.query.returnUrl || '';
  },
  methods: {
    ...mapActions('auth', ['submit']),
    showError(err) {
      const error = new Message(err)
      const message = error.getMessage()
      const code = error.getCode()
      const notification = new Notify(code, message)
      notification.sweetAlertNotif(this)
    },
    async postLogin() {
      try {
        let provider = await this.submit(this.data)
        if (this.isAuth) {
          if(this.returnUrl != '') {
            return this.$router.push(this.returnUrl)
          }
          if (this.authorized_user.role == Role.Admin) {
            return this.$router.push({ name: 'master.index' })
          }
          return this.$router.push({ name: 'resulting.index' })
        }
      } catch (err) {
        this.showError(err)
      }
    }
  }
};
</script>