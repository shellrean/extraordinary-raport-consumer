<template>
  <div class="bg-white w-full lg:w-1/2 py-4 px-4 rounded-lg shadow border border-gray-300">
    <button @click="$emit('close')" class="block w-8 flex rounded-full hover:bg-gray-200 justify-center items-center h-8 text-gray-600">
      <HomeIconLine class="mx-auto"/>
    </button>
    <hr>
    <div class="mb-4">
      <label for="" class="text-xs font-semibold text-gray-500 px-1">Tahun Ajaran</label>
      <div class="flex">
        <select v-model="academicID" class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300">
          <option :value="academic.id" v-for="(academic, index) in academics" :key="index">{{ academic.name }} Semester {{ academic.semester }}</option>
        </select> 
      </div>
    </div>
    <button @click="submit" :disabled="isLoading" class="py-1 px-3 rounded-md bg-green-400 border-2 border-green-500 hover:shadow-xl disabled:opacity-50 text-white font-medium">Simpan</button> 
  </div>
</template>
<script>
import HomeIconLine from '@/components/icons/HomeIconLine'
import Notify from '@/core/services/notif.service'
import Message from '@/core/domain/message.domain'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'AcademicYear',
  components: {
    HomeIconLine,
  },
  data() {
    return {
      academicID: 0
    }
  },
  computed: {
    ...mapState(['isLoading','academic_active']),
    ...mapState('academic', ['academics']),
  },
  methods: {
    ...mapActions(['setAcademicYear']),
    ...mapActions('sett', ['updateSetting']),
    showError(err) {
      const error = new Message(err)
      const message = error.getMessage()
      const code = error.getCode()
      const notification = new Notify(code, message)
      notification.sweetAlertNotif(this)
    },
    setAcademic() {
      const academic = this.academics.filter((item) => item.id == this.academicID)
      if (academic.length > 0) {
        if(academic[0].id !== this.academics[this.academics.length - 1].id) {
          academic[0].archive = true
        } else {
          academic[0].archive = false
        }
        this.setAcademicYear(academic[0])
      }
    },
    submit() {
      (async() => {
        try {
          await this.updateSetting({
            name: "academic_active",
            value: String(this.academicID)
          })
          this.setAcademic()
        } catch (err) {
          this.showError(err)
        }
      })()
    }
  },
  mounted() {
    this.academicID = this.academic_active.id
  }
}
</script>