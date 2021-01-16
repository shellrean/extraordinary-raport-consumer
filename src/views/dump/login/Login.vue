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
                <form class="mt-8">
                  <div class="mx-auto max-w-lg">
                    <div class="py-2">
                      <span class="px-1 text-sm text-gray-600">Username</span>
                      <input placeholder="" type="text" class="text-md block px-3 py-2  rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none">
                    </div>
                    <div class="py-2">
                      <span class="px-1 text-sm text-gray-600">Password</span>
                      <div class="relative">
                        <input placeholder="" :type="show_pass ? 'password' : 'text'" class="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none">
                        <a href="#" @click.prevent="show_pass = !show_pass" class="text-gray-700 text-xs">{{ show_pass ? 'Show' : 'Hide' }} password</a>
                      </div>
                    </div>
                    <button class="transition duration-300 mt-3 text-lg font-semibold bg-gray-800 w-full text-white rounded-lg px-6 py-3 block shadow-xl hover:shadow-2xl"> Login </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Notif msg="You are using extraordinary raport for your academic" class="absolute left-4 bottom-4 xl:left-10 xl:bottom-10" />
  </div>
</template>
<script>
import Notif from '@/components/nano/Notif'
export default {
  components: {
    Notif,
  },
  data() {
    return {
      show_pass: true
    }
  }
};
</script>