<template>
  <div class="container md:mx-auto flex flex-col justify-center space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4">
    <div class="bg-white w-full lg:w-1/2 py-4 px-4 rounded-lg shadow border border-gray-300">
      <article aria-label="File Upload Modal" class="relative h-full flex flex-col" v-on:drop="dropHandler" v-on:dragover="allowDrop">
        <section class="h-full overflow-auto p-8 w-full h-full flex flex-col">
          <header class="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center">
            <p class="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
              <span>Drag and drop your</span>&nbsp;<span>files anywhere or</span>
            </p>
            <input id="hidden-input" ref="file" type="file" multiple accept=".xls,.xlsx" class="hidden" @change="onChangeFile"/>
            <button @click="$refs.file.click()" class="mt-2 rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none">
              Upload a file
            </button>
          </header>
          <h1 class="pt-8 pb-3 font-semibold sm:text-lg text-gray-900">
            To Upload
          </h1>
          <div class="flex flex-col space-y-2">
            <div v-if="files.length === 0" class="h-full w-full text-center flex flex-col items-center justify-center items-center">
              <img class="mx-auto w-32" src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png" alt="no data" />
              <span class="text-small text-gray-500">No files selected</span>
            </div>
            <div v-for="(file, index) in files" :key="index" class="flex justify-between py-2 px-4 rounded-md bg-gray-100 border border-gray-300 text-gray-600">
              <div class="flex flex-col">
                <span class="text-sm text-gray-600 font-medium">{{ file.name }}</span>
                <span class="text-xs pointer">{{ file.type }}</span>
              </div>
              <div><span class="cursor-pointer" @click="removeFile(index)">&times;</span></div>
            </div>
          </div>
        </section>

        <footer class="flex justify-end px-8 pb-8 pt-4">
          <button id="submit" class="mr-1 py-1 px-3 rounded-md bg-green-400 border-2 border-green-500 hover:shadow-xl disabled:opacity-50 text-white font-medium">
            Upload now
          </button>
          <router-link :to="{name: 'master.user' }" class="inline-block mr-1 rounded-md py-1 px-3 bg-gray-400 border-2 border-gray-500 hover:shadow-xl disabled:opacity-50 text-white font-medium">Kembali</router-link>
        </footer>
      </article>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ImportUser',
  data() {
    return {
      files: [],
      allow: /(\.xls|\.xlsx)$/i
    }
  },
  methods: {
    onChangeFile(e) {
      for (const file of e.target.files) {
        this.files.push(file)
      }
    },
    dropHandler(ev) {
      ev.preventDefault()
      for (const file of ev.dataTransfer.files) {
        if (!this.allow.exec(file.name)) {
          alert("Tipe file tidak diizinkan")
          continue
        }
        this.files.push(file)
      }
    },
    allowDrop(e) {
      e.preventDefault();
    },
    removeFile(index) {
      this.files.splice(index, 1)
    }
  }
}
</script>