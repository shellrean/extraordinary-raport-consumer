<template>
  <div class="container md:mx-auto flex flex-col justify-center space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4">
    <div class="bg-white w-full lg:w-1/2 py-4 px-4 rounded-lg shadow border border-gray-300">
      <p class="text-gray-500 text-xl mb-2 font-medium">Kelas Akademik</p>
      <form @submit.prevent="submit">
        <ClassroomForm />
        <router-link :to="{name: 'academic.classroom' }" class="inline-block mr-1 rounded-md py-1 px-3 bg-gray-400 border-2 border-gray-500 hover:shadow-xl disabled:opacity-50 text-white font-medium">Kembali</router-link>
        <button :disabled="isLoading" type="submit" class="py-1 px-3 rounded-md bg-green-400 border-2 border-green-500 hover:shadow-xl disabled:opacity-50 text-white font-medium">Simpan</button> 
      </form>
    </div>
  </div>
</template>
<script>
import Notify from '@/core/services/notif.service'
import Message from '@/core/domain/message.domain'
import ClassroomForm from './ClassroomForm'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'AcademicClassroomForm',
  components: {
    ClassroomForm,
  },
  data() {
    return {
      notif: []
    }
  },
  computed: {
    ...mapState(['isLoading']),
    ...mapState('academic_classroom', ['classroom'])
  },
  methods: {
    ...mapActions('academic_classroom', ['storeClassroom', 'updateClassroom']),
    showError(err) {
      const error = new Message(err)
      const message = error.getMessage()
      const code = error.getCode()
      const notification = new Notify(code, message)
      notification.sweetAlertNotif(this)
    },
    submit() {
      if(typeof this.classroom.id == 'undefined') {
        (async () => {
          try {
            await this.storeClassroom()
            this.$router.push({name: 'academic.classroom'})
          } catch (err) {
            this.showError(err)
          }
        })()
      } else {
        (async () => {
          try {
            await this.updateClassroom()
            this.$store.state.academic_classroom.classroom = {}
            this.$router.push({name: 'academic.classroom'})
          } catch (err) {
            this.showError(err)
          }
        })()
      }
    }
  }
}
</script>