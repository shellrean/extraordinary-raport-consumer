<template>
  <div class="container md:mx-auto flex flex-col justify-center space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4">
    <div class="bg-white w-full lg:w-1/2 py-4 px-4 rounded-lg shadow border border-gray-300">
      <p class="text-gray-500 text-2xl mb-2 font-medium">Biodata Siswa</p>
      <hr>
      <form @submit.prevent="submit">
      <StudentForm />
      <router-link :disabled="isLoading" :to="{name:'master.student'}" class="inline-block mr-1 rounded-md py-1 px-3 bg-gray-400 border-2 border-gray-500 hover:shadow-xl disabled:opacity-50 text-white font-medium">Batal</router-link>
      <button :disabled="isLoading" type="submit" class="py-1 px-3 rounded-md bg-green-400 border-2 border-green-500 hover:shadow-xl disabled:opacity-50 text-white font-medium">{{ isLoading ? 'Processing' : 'Simpan' }}</button>
      </form>
    </div>
  </div>
</template>
<script>
import StudentForm from './StudentForm'
import { showSweetError } from '@/core/helper/alert.helper'
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'CreateStudent',
  components: {
    Notif,
    StudentForm,
  },
  data() {
    return {
      notif: [],
    }
  },
  computed: {
    ...mapState(['isLoading']),
    ...mapState('student', ['student']),
  },
  methods: {
    ...mapActions('student', ['storeStudent', 'updateStudent', 'showStudent']),
    showError(err) {
      showSweetError(this, err)
    }
    submit() {
      if(typeof this.student.id != 'undefined') {
        (async() => {
          try {
            await this.updateStudent()
            this.$router.push({name: 'master.student'})
          } catch (err) {
            this.showError(err)
          }
        })()
      } else {
        (async() => {
          try {
            await this.storeStudent()
            this.$router.push({name: 'master.student'})
          } catch (err) {
            this.showError(err)
          }
        })()
      }
    }
  },
  created() {
    if(this.$route.name == 'master.student.edit') {
      (async() => {
        try {
          await this.showStudent(this.$route.params.id)
        } catch (err) {
          this.showError(err)
        }
      })()
    }
  }
};
</script>