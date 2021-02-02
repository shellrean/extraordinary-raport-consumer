<template>
  <div>
    <header class="mb-1 flex justify-between">
      <p class="font-medium text-gray-600">Siswa Kelas </p> 
      <router-link v-if="!academic_active.archive" :to="{name: 'academic.classroom.student', params: {id: $route.params.id}}" class="hover:shadow-lg font-normal text-xs py-1 px-4 rounded-full bg-blue-100 text-blue-600 border-blue-300 border">Edit</router-link>
    </header>
    <input v-model="searchStudent" type="text" class="border-2 border-gray-200 mb-2 py-1 rounded-full px-6 bg-gray-100 w-full focus:ring-0 focus:border-blue-300" placeholder="Cari"/>
    <div v-for="(student, index) in filteredStudent" :key="index" class="py-1 mb-1 px-4 bg-gray-50 rounded-md border-2 border-gray-200 flex items-center justify-between">
      <div>
        <p class="text-gray-500">{{student.studentSRN}}/{{student.studentNSRN}}</p>
        <span class="text-gray-600 font-medium">{{student.studentName}}</span>
      </div>
    </div>
    <small v-if="filteredStudent == null ? false : filteredStudent.length === 0" class="text-gray-600">Siswa tidak ditemukan</small>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import _ from 'lodash'
export default {
  name: 'ClassroomStudent',
  data() {
    return {
      searchStudent: ""
    }
  },
  computed: {
    ...mapState(['academic_active']),
    ...mapState('academic_student', ['students']),
    filteredStudent() {
      if (this.students == null) {
        return []
      }
      return this.students.filter(
        (item) => item.studentName.toLowerCase().includes(this.searchStudent.toLowerCase())
      )
    }
  }
}
</script>