<template>
  <div class="">
    <div class="px-3 pb-4">
      <table class="w-full ">
        <tbody>
          <tr  class="bg-green-100 border-b-2 border-t-2 border-green-300 font-semibold text-green-600">
            <td class="py-2 px-2">No</td>
            <td class="py-2 px-2">NIS</td>
            <td class="py-2 px-2">Nama</td>
            <td class="py-2 px-2">SAKIT</td>
            <td class="py-2 px-2">IZIN</td>
            <td class="py-2 px-2">TK</td>
          </tr>
          <tr class="hover:bg-green-50 border-b border-gray-200 font-medium text-gray-600" 
          v-for="(student, index) in studentAttendances" :key="student.id"
          >
            <td class="py-1 px-2">{{ index+1 }}</td>
            <td class="py-1 px-2">{{ student.studentSRN }}</td>
            <td class="py-1 px-2">{{ student.studentName }}</td>
            <td class="py-1 px-2">
              <input type="text" class="bg-white py-1 px-2 w-16 border-2 font-semibold border-gray-400 rounded-md" 
              @input="onInput({studentID: student.id, total: parseInt($event.target.value), type: 1})"
              :value="getNumberValue(student.id, 1)"
              :readonly="isLoading" 
              :class="{'bg-gray-200' : isLoading}"/>
            </td>
            <td class="py-1 px-2">
              <input type="text" class="bg-white py-1 px-2 w-16 border-2 font-semibold border-gray-400 rounded-md" 
              @input="onInput({studentID: student.id, total: parseInt($event.target.value), type: 2})"
              :value="getNumberValue(student.id, 2)"
              :readonly="isLoading" 
              :class="{'bg-gray-200' : isLoading}"/>
            </td>
            <td class="py-1 px-2">
              <input type="text" class="bg-white py-1 px-2 w-16 border-2 font-semibold border-gray-400 rounded-md" 
              @input="onInput({studentID: student.id, total: parseInt($event.target.value), type: 3})"
              :value="getNumberValue(student.id, 3)"
              :readonly="isLoading" 
              :class="{'bg-gray-200' : isLoading}"/>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import {
  vuex_states,
  vuex_methods,
  vue_data,
  vue_computed,
  vue_methods,
} from '@/core/module/raporting/attendance/form'
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
  },
  created() {
    this.getMyClassroom()
  },
  watch: {
    myclass() {
      this.fetchDataStudents()
      this.fetchDataAttendances()
    },
  }
}
</script>