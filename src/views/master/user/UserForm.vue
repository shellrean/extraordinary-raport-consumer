<template>
  <div>
    <div class="mb-4">
      <label for="" class="text-xs font-semibold text-gray-500 px-1">Nama</label>
      <div class="flex">
        <input v-model="user.name" type="text" class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="Nama" required="" :readonly="isLoading">
      </div>
    </div>
    <div class="mb-4">
      <label for="" class="text-xs font-semibold text-gray-500 px-1">Email</label>
      <div class="flex">
        <input v-model="user.email" type="email" class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="email@shellrean.com" required="" :readonly="isLoading">
      </div>
    </div>
    <div class="mb-4" v-if="typeof user.id == 'undefined'">
      <label for="" class="text-xs font-semibold text-gray-500 px-1">Password</label>
      <div class="flex">
        <input v-model="user.password" type="password" class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="************" required="" :readonly="isLoading">
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'UserForm',
  computed: {
    ...mapState(['isLoading']),
    ...mapState('user', ['user']),
  }
};
</script>