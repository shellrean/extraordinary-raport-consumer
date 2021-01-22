<template>
  <div>
    <header class="mb-1 flex justify-between">
      <p class="font-medium text-gray-600">Mata Pelajaran </p> 
      <router-link :to="{name: 'academic.classroom.subject', params: {id: $route.params.id}}" class="hover:shadow-lg font-normal text-xs py-1 px-4 rounded-full bg-blue-100 text-blue-600 border-blue-300 border">Edit</router-link>
    </header>
    <input v-model="searchSubject" type="text" class="border-2 border-gray-200 mb-2 py-1 rounded-full px-6 bg-gray-100 w-full focus:border-blue-300" placeholder="Cari"/>
    <div v-for="(subject, index) in filteredSubject" class="py-1 mb-1 px-4 bg-gray-50 rounded-md border-2 border-gray-200 flex items-center justify-between">
      <div class="items-center flex">
        <div class="mr-2">
          <p class="text-4xl font-medium text-green-600">{{ subject.mgn }}</p>
        </div>
        <div>
          <p class="text-gray-500">{{ subject.teacherName }}</p>
          <span class="text-gray-600 font-medium">{{ subject.subjectName }}</span>
        </div>
      </div>
    </div>
    <small v-if="filteredSubject == null ? false : filteredSubject.length === 0" class="text-gray-600">Matpel tidak ditemukan</small>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'ClassroomSubject',
  data() {
    return {
      searchSubject: ""
    }
  },
  computed: {
    ...mapState('academic_subject', ['subjects']),
    filteredSubject() {
      if (this.subjects == null) {
        return []
      }
      return this.subjects.filter(
        (item) => item.subjectName.toLowerCase().includes(this.searchSubject.toLowerCase())
      )
    }
  }
}
</script>