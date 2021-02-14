<template>
  <div class="container md:mx-auto flex flex-col justify-center space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4">
    <div class="bg-white w-full lg:w-1/2 py-4 px-4 rounded-lg shadow border border-gray-300">
      <p class="text-gray-500 text-2xl mb-2 font-medium">Renca pembelajaran</p>
      <hr class="mb-4">
      <form @submit.prevent="submit">
        <SubjectPlanForm />
        <router-link :to="{name: 'resulting.subject.plan' }" class="inline-block mr-1 rounded-md py-1 px-3 bg-gray-400 border-2 border-gray-500 hover:shadow-xl disabled:opacity-50 text-white font-medium">Kembali</router-link>
        <button type="submit" class="py-1 px-3 rounded-md bg-green-400 border-2 border-green-500 hover:shadow-xl disabled:opacity-50 text-white font-medium">{{ isLoading ? 'Processing...' : 'Simpan' }}</button> 
      </form>
    </div>
  </div>
</template>
<script>
import SubjectPlanForm from './SubjectPlanForm'
import { showSweetError } from '@/core/helper/alert.helper'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'Form',
  components: {
    SubjectPlanForm
  },
  data() {
    return {

    }
  },
  computed: {
    ...mapState(['isLoading']),
  },
  methods: {
    ...mapActions('subject_plan', ['createSubjectPlan']),
    ...mapActions('academic_subject', ['fetchSubjects']),
    showError(err) {
      showSweetError(this, err)
    },
    fetchDataSubjects() {
      (async () => {
        try {
          await this.fetchSubjects()
        } catch (err) {
          if (typeof err.error_code != 'undefined' && err.error_code == 1201) {
            this.fetchDataSubjects()
            return
          }
          this.showError(err)
        }
      })()
    },
    submit() {
      (async () => {
        try {
          await this.createSubjectPlan()
          this.$swal('Sukses', 'Rencana pembelajaran berhasil disimpan', 'success')
          this.$store.state.subject_plan.plan = {}
          this.$router.push({name: 'resulting.subject.plan'})
        } catch (err) {
          if (typeof err.error_code != 'undefined' && err.error_code == 1201) {
            this.submit()
            return
          }
          this.showError(err)
        }
      })()
    }
  },
  created() {
    this.fetchDataSubjects()
  }
}
</script>