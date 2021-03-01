<template>
</template>
<script>
import {
  vuex_states,
  vuex_methods,
  vue_data,
  vue_computed,
  vue_methods,
} from '@/core/module/raporting/student_note/index'
export default {
  data() {
    return vue_data
  },
  computed: {
    ...vuex_states,
    ...vue_computed,
  },
  methods: {
    ...vuex_methods,
    ...vue_methods
  }
}
</script>