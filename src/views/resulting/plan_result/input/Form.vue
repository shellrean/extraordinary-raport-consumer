<template>
  <div>
    <div class="flex px-3 w-56 mb-4">
      <select class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="Nomor Induk Siswa Nasional" :readonly="isLoading" :class="{'bg-gray-200' : isLoading}">
        <option value="task">Tugas</option>
        <option value="evms">Evaluasi Tengah Semester</option>
        <option value="evls">Evaluasi Akhir Semester</option>
        <option value="exam">Ulangan</option>
      </select> 
    </div>
    <div class="px-3">
      <table class="w-full ">
        <tbody>
          <tr  class="bg-green-400 border-b border-gray-100 font-semibold text-white">
            <td class="py-2 px-2">No</td>
            <td class="py-2 px-2">NIS</td>
            <td class="py-2 px-2">Nama</td>
            <td class="py-2 px-2">Nilai</td>
          </tr>
          <tr class="hover:bg-green-50 border-b border-gray-200 font-medium text-gray-600" v-for="(i, index) in new Array(36)">
            <td class="py-1 px-2">{{ index+1 }}</td>
            <td class="py-1 px-2">912020129</td>
            <td class="py-1 px-2">Muhammad Ilham Nasution</td>
            <td class="py-1 px-2">
              <input type="text" class="bg-white py-1 px-2 w-14 border-2 font-semibold border-gray-400 rounded-md" value="0" :readonly="isLoading" :class="{'bg-gray-200' : isLoading}"/>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'FormInput',
  components: {

  },
  computed: {
    ...mapState(['isLoading'])
  },
  created() {
    console.log('okee')
  }
}
</script>