<template>
  <div class="bg-white border-gray-300 shadow">
    <div class="px-3">
      <perfect-scrollbar class="max-h-96 overflow-y-scroll">
      <table class="w-full ">
        <tbody>
          <tr  class="border-b rounded-md border-gray-100 font-semibold text-white">
            <td class="bg-blue-400 py-2 px-2 rounded-tl-md">No</td>
            <td class="bg-blue-400 py-2 px-2">NIS</td>
            <td class="bg-blue-400 py-2 px-2">Nama</td>
            <td class="bg-blue-400 py-2 px-2 rounded-tr-md">Nilai</td>
          </tr>
          <tr class="hover:bg-blue-50 border-b border-gray-200 font-medium text-gray-600" v-for="(i, index) in new Array(36)">
            <td class="py-1 px-2">{{ index+1 }}</td>
            <td class="py-1 px-2">912020129</td>
            <td class="py-1 px-2">Muhammad Ilham Nasution</td>
            <td class="py-1 px-2">
              <p class="font-semibold">100</p>
            </td>
          </tr>
        </tbody>
      </table>
      </perfect-scrollbar>
    </div>
  </div>
</template>
<script>
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'
export default {
  components: {
    PerfectScrollbar
  },
  data() {
    return {
      pageIndex: 0
    }
  }
}
</script>