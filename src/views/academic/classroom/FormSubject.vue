<template>
  <div class="container md:mx-auto flex flex-col justify-center space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4">
    <div class="w-full lg:w-3/4 lg:py-4 lg:px-4">
      <div class="bg-white py-2 px-2 border border-gray-300 shadow rounded-t-lg">
        <div class="flex justify-end space-x-2 mb-2">
          <div class="w-4 h-4 bg-red-400 rounded-full cursor-pointer hover:shadow-xl hover:w-8 hover:h-8"></div>
          <div class="w-4 h-4 bg-yellow-400 rounded-full cursor-pointer hover:shadow-xl hover:w-8 hover:h-8"></div>
          <div class="w-4 h-4 bg-green-400 rounded-full cursor-pointer hover:shadow-xl hover:w-8 hover:h-8"></div>
        </div>
        <div class="flex space-x-2">
          <router-link :to="{name: 'academic.classroom.detail', params: {id: $route.params.id} }" class="border-gray-300 border bg-gray-100 text-gray-600 block px-4 flex rounded-lg hover:shadow-lg justify-center items-center h-8 text-gray-600">
            Kembali
          </router-link>
          <button @click="formCopy = true" class="border-green-300 border bg-green-100 text-green-600 block px-4 flex rounded-lg hover:shadow-lg justify-center items-center h-8 text-gray-600">
            Salin Matpel
          </button>
        </div>
      </div>
      <div class="flex flex-col md:flex-row">
        <div class="w-full md:w-1/2 bg-white px-4 py-4 border border-gray-300 shadow">
          <form @submit.prevent="submit" v-if="!formCopy">
          <div class="mb-4">
            <label for="" class="text-xs font-semibold text-gray-500 px-1">KKM</label>
            <div class="flex">
              <input required v-model.int="mgn" type="number" class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="KKM" required="" :readonly="isLoading">
            </div>
          </div>
          <div class="mb-4">
            <label for="" class="text-xs font-semibold text-gray-500 px-1">Mata Pelajaran</label>
            <div class="flex" v-if="!modalSubject">
              <input required @click="modalSubject = true" readonly v-model="subject.name" type="text" class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="Nama Matpel" required="">
            </div>
            <div class="bg-white border-2 border-gray-300 rounded-lg px-3 py-2" v-if="modalSubject">
              <div class="flex justify-end space-x-2 mb-2">
                <div @click="modalSubject = false" class="w-4 h-4 bg-red-400 rounded-full cursor-pointer hover:shadow-xl hover:w-8 hover:h-8"></div>
                <div @click="modalSubject = false" class="w-4 h-4 bg-yellow-400 rounded-full cursor-pointer hover:shadow-xl hover:w-8 hover:h-8"></div>
                <div @click="modalSubject = false" class="w-4 h-4 bg-green-400 rounded-full cursor-pointer hover:shadow-xl hover:w-8 hover:h-8"></div>
              </div>
              <div class="flex items-center bg-gray-200 rounded-md">
                <div class="pl-2">
                  <svg class="fill-current text-gray-500 w-6 h-6" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24">
                    <path class="heroicon-ui"
                    d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                  </svg>
                </div>
                <input v-model="searchSubject" class="w-full rounded-md bg-gray-200 text-gray-700 leading-tight focus:outline-none py-2 px-2" type="text" placeholder="Cari mata pelajaran">
              </div>
              <div class="py-3 text-sm">
                <div v-for="(subject, index) in subjects" @click="setSubject(subject)" class="flex items-center justify-start cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-100 rounded-md px-2 py-2 my-2">
                  <span class="bg-gray-400 h-2 w-2 m-2 rounded-full"></span>
                  <div class="flex-grow font-medium px-2">{{ subject.name }}</div>
                </div>
                <small v-if="subjects === null || subjects.length === 0" class="text-gray-600">Mata pelajaran tidak ditemukan</small>
              </div>
            </div>
          </div>
          <div class="mb-4">
            <label for="" class="text-xs font-semibold text-gray-500 px-1">Guru</label>
            <div class="flex" v-if="!modalTeacher">
              <input required @click="modalTeacher = true" readonly v-model="teacher.name" type="text" class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="Nama guru" required="">
            </div>
            <div class="bg-white border-2 border-gray-300 rounded-lg px-3 py-2" v-if="modalTeacher">
              <div class="flex justify-end space-x-2 mb-2">
                <div @click="modalTeacher = false" class="w-4 h-4 bg-red-400 rounded-full cursor-pointer hover:shadow-xl hover:w-8 hover:h-8"></div>
                <div @click="modalTeacher = false" class="w-4 h-4 bg-yellow-400 rounded-full cursor-pointer hover:shadow-xl hover:w-8 hover:h-8"></div>
                <div @click="modalTeacher = false" class="w-4 h-4 bg-green-400 rounded-full cursor-pointer hover:shadow-xl hover:w-8 hover:h-8"></div>
              </div>
              <div class="flex items-center bg-gray-200 rounded-md">
                <div class="pl-2">
                  <svg class="fill-current text-gray-500 w-6 h-6" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24">
                    <path class="heroicon-ui"
                    d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                  </svg>
                </div>
                <input v-model="searchTeacher" class="w-full rounded-md bg-gray-200 text-gray-700 leading-tight focus:outline-none py-2 px-2" type="text" placeholder="Cari mata pelajaran">
              </div>
              <div class="py-3 text-sm">
                <div v-for="(user, index) in users" @click="setTeacher(user)" class="flex items-center justify-start cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-100 rounded-md px-2 py-2 my-2 ">
                  <span class="bg-gray-400 h-2 w-2 m-2 rounded-full"></span>
                  <div class="flex-grow font-medium px-2">{{ user.name }}</div>
                </div>
                <small v-if="users === null || users.length === 0" class="text-gray-600">Guru tidak ditemukan</small>
              </div>
            </div>
          </div>
          <div class="flex space-x-2">
            <button type="submit" :disabled="isLoading" class="border-green-500 border-2 bg-green-400 text-white px-4 flex rounded-lg hover:shadow-lg justify-center items-center h-8 font-medium">
              Simpan
            </button>
            <button @click="clearForm" type="button" v-if="typeof $store.state.academic_subject.subject.id != 'undefined'" class="border-gray-300 border bg-gray-100 text-gray-600 block px-4 flex rounded-lg hover:shadow-lg justify-center items-center h-8 text-gray-600">
              Batal
            </button>
          </div>
          </form>
          <div v-if="formCopy">
            <div class="mb-4">
              <label for="" class="text-xs font-semibold text-gray-500 px-1">Tahun Ajaran</label>
              <div class="flex" v-if="!modalAcademic">
                <input required @click="modalAcademic = true" :value="typeof academic.name == 'undefined' ? '' : academic.name+' Semester '+academic.semester" readonly type="text" class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="Tahun ajaran" required="">
              </div>
              <div class="bg-white border-2 border-gray-300 rounded-lg px-3 py-2" v-if="modalAcademic">
                <div class="flex justify-end space-x-2 mb-2">
                  <div @click="modalAcademic = false" class="w-4 h-4 bg-red-400 rounded-full cursor-pointer hover:shadow-xl hover:w-8 hover:h-8"></div>
                  <div @click="modalAcademic = false" class="w-4 h-4 bg-yellow-400 rounded-full cursor-pointer hover:shadow-xl hover:w-8 hover:h-8"></div>
                  <div @click="modalAcademic = false" class="w-4 h-4 bg-green-400 rounded-full cursor-pointer hover:shadow-xl hover:w-8 hover:h-8"></div>
                </div>
                <div class="flex items-center bg-gray-200 rounded-md">
                  <div class="pl-2">
                    <svg class="fill-current text-gray-500 w-6 h-6" xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24">
                      <path class="heroicon-ui"
                      d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                    </svg>
                  </div>
                  <input v-model="searchAcademic" class="w-full rounded-md bg-gray-200 text-gray-700 leading-tight focus:outline-none py-2 px-2" type="text" placeholder="Cari tahun ajaran">
                </div>
                <div class="py-3 text-sm">
                  <div v-for="(academic, index) in filteredAcademic" @click="setAcademik(academic)" class="flex items-center justify-start cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-100 rounded-md px-2 py-2 my-2">
                    <span class="bg-gray-400 h-2 w-2 m-2 rounded-full"></span>
                    <div class="flex-grow font-medium px-2">{{ academic.name }} Semester {{ academic.semester }}</div>
                  </div>
                  <small v-if="filteredAcademic === null || filteredAcademic.length === 0" class="text-gray-600">Tahun ajaran tidak ditemukan</small>
                </div>
              </div>
            </div>
            <div class="mb-4">
              <label for="" class="text-xs font-semibold text-gray-500 px-1">Kelas Akademik</label>
              <div class="flex" v-if="!modalClassAcademic">
                <input required @click="modalClassAcademic = true" :value="typeof classroom.classroomName == 'undefined' ? '' : classroom.classroomName+'/'+classroom.classroomMajor" readonly type="text" class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="Kelas akademik" required="">
              </div>
              <div class="bg-white border-2 border-gray-300 rounded-lg px-3 py-2" v-if="modalClassAcademic">
                <div class="flex justify-end space-x-2 mb-2">
                  <div @click="modalClassAcademic = false" class="w-4 h-4 bg-red-400 rounded-full cursor-pointer hover:shadow-xl hover:w-8 hover:h-8"></div>
                  <div @click="modalClassAcademic = false" class="w-4 h-4 bg-yellow-400 rounded-full cursor-pointer hover:shadow-xl hover:w-8 hover:h-8"></div>
                  <div @click="modalClassAcademic = false" class="w-4 h-4 bg-green-400 rounded-full cursor-pointer hover:shadow-xl hover:w-8 hover:h-8"></div>
                </div>
                <div class="flex items-center bg-gray-200 rounded-md">
                  <div class="pl-2">
                    <svg class="fill-current text-gray-500 w-6 h-6" xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24">
                      <path class="heroicon-ui"
                      d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                    </svg>
                  </div>
                  <input v-model="searchClassroom" class="w-full rounded-md bg-gray-200 text-gray-700 leading-tight focus:outline-none py-2 px-2" type="text" placeholder="Cari kelas Akademik">
                </div>
                <div class="py-3 text-sm">
                  <div v-for="(classroom, index) in filteredClassroom" @click="setClassroom(classroom)" class="flex items-center justify-start cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-100 rounded-md px-2 py-2 my-2">
                    <span class="bg-gray-400 h-2 w-2 m-2 rounded-full"></span>
                    <div class="flex-grow font-medium px-2">{{ classroom.classroomName }}/{{ classroom.classroomMajor }}</div>
                  </div>
                  <small v-if="filteredClassroom === null || filteredClassroom.length === 0" class="text-gray-600">Kelas akademik tidak ditemukan</small>
                </div>
              </div>
            </div>
            <div class="flex space-x-2">
              <button @click="copyClassroomSsubject" type="button" :disabled="isLoading" class="border-green-500 border-2 bg-green-400 text-white px-4 flex rounded-lg hover:shadow-lg justify-center items-center h-8 font-medium">
                Salin matpel
              </button>
              <button @click="formCopy = false" class="border-gray-300 border bg-gray-100 text-gray-600 block px-4 flex rounded-lg hover:shadow-lg justify-center items-center h-8 text-gray-600">
                Batal
              </button>
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/2 bg-white px-4 py-4 border border-gray-300 shadow">
          <div class="flex flex-col space-y-2">
            <div v-for="(subject, index) in classroomSubjects" class="py-1 px-4 bg-gray-50 rounded-md border-2 border-gray-300 flex items-center justify-between">
              <div class="items-center flex">
                <div class="mr-2">
                  <p class="text-4xl font-medium text-green-600">{{ subject.mgn }}</p>
                </div>
                <div>
                  <p class="text-gray-500">{{ subject.teacherName }}</p>
                  <span class="text-gray-600 font-medium">{{ subject.subjectName }}</span>
                </div>
              </div>
              <div class="flex items-center">
                <button @click="getDataSubject(subject.id)" class="flex text-xs py-1 px-3 hover:bg-gray-300 rounded-full justify-center items-center">Edit</button>
                <button @click="deleteSubjectFromClassroom(subject.id, index)" class="h-4 w-4 flex justify-center items-center">&times;</button>
              </div>
            </div>  
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { showSweetError } from '@/core/helper/alert.helper'
import { mapActions, mapState } from 'vuex'
import {
  vue_data,
  vue_computed,
  vue_methods,
  vuex_states,
  vuex_methods,
} from '@/core/module/academic/classroom/form_subject'
import _ from 'lodash'

export default {
  name: 'AcademicClassroomFormSubject',
  components: {
  },
  data() {
    return vue_data
  },
  computed: {
    ...vuex_states,
    ...vue_computed,
  },
  methods: {
    ...vuex_methods,
    ...vue_methods,
  },
  mounted() {
    this.fetchDataSubjects()
    this.fetchDataSubjectsClassroom()
  },
  watch: {
    searchTeacher:  _.debounce(function (value) {
      this.fetchDataUsers()
    }, 500),
    academic(value) {
      if(typeof value.id != 'undefined'){
        this.fetchDataClassroomByAcademic()
      }
    }
  }
}
</script>