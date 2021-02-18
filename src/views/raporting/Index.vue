<template>
  <div class="flex flex-col space-y-4 lg:flex-row lg:space-y-0 h-full w-full">
    <div class=" h-full w-full lg:flex-1 px-3 min-h-0 min-w-0">
      <div class="max-w-md flex justify-center items-center h-full mx-auto">
        <RaportingMenus v-if="classrooms != null && classrooms.length > 0"/>
        <div v-else class="py-3 px-6 rounded-md bg-gray-100 flex space-x-2 border-2 border-gray-300">
          <div>
            <img src="/img/icon/among-us-red.svg" class="w-24"/>
          </div>
          <p>Anda tidak menjadi wali di kelas manapun, jika ini merupakan kesalahan hubungi administrator</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import RaportingMenus from '@/components/RaportingMenus'
import {
  vuex_states,
  vuex_methods,
  vue_data,
  vue_computed,
  vue_methods,
} from '@/core/module/raporting/index'
export default {
  components: {
    RaportingMenus
  },
  data() {
    return vue_data
  },
  computed: {
    ...vuex_states,
    ...vue_computed
  },
  methods: {
    ...vuex_methods,
    ...vue_methods,
  },
  created() {
    this.fetchDataMyClassroom()
  }
};
</script>