<template>
  <div class="">
    <div class="flex items-center space-x-1 px-3 w-64 mb-4">
      <select class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" 
      v-model="note_type"
      :readonly="isLoading" 
      :class="{'bg-gray-200' : isLoading}"
      >
        <option value="3">Catatan Akademik</option>
        <option value="2">Catatan Perkembangan Karakter</option>
        <option value="4">Deskripsi Integritas</option>
        <option value="5">Deskripsi Religius</option>
        <option value="6">Deskripsi Nasionalis</option>
        <option value="7">Deskripsi Mandiri</option>
        <option value="8">Deskripsi Gotong-royong</option>
      </select> 
    </div>
    <div class="px-3 pb-4">
      <table class="w-full ">
        <tbody>
          <tr  class="bg-green-100 border-b-2 border-t-2 border-green-300 font-semibold text-green-600">
            <td class="py-2 px-2">No</td>
            <td class="py-2 px-2">NIS</td>
            <td class="py-2 px-2">Nama</td>
            <td class="py-2 px-2">Catatan</td>
          </tr>
          <tr class="hover:bg-green-50 border-b border-gray-200 font-medium text-gray-600" 
          v-for="(student, index) in studentsNotes" :key="student.id"
          >
            <td class="py-1 px-2">{{ index+1 }}</td>
            <td class="py-1 px-2">{{ student.studentSRN }}</td>
            <td class="py-1 px-2">{{ student.studentName }}</td>
            <td class="py-1 px-2">
              <textarea class="py-1 px-2 rounded-lg border-2 border-gray-400 outline-none focus:border-green-300 w-full"
              @input="onInput({type: parseInt(note_type), studentID: student.id, note: $event.target.value}, index)"
              v-if="!isNaN(parseInt(note_type))"
              v-model="student.note"
              ></textarea>
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
} from '@/core/module/raporting/student_note/form'
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
    },
    note_type(v) {
      if (!isNaN(parseInt(v))) {
        this.getDataStudentNoteByTypeClassroom(v)
      }
    }
  }
}
</script>