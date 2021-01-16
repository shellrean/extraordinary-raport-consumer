<template>
  <div class="flex flex-col space-y-4 lg:flex-row lg:space-y-0 h-full w-full">
    <div class="border pb-2 lg:pb-0 w-full lg:max-w-xs px-3 flex flex-row lg:flex-col flex-wrap lg:flex-nowrap">
     <MasterMenus />
    </div>
    <div class="border h-full w-full lg:flex-1 px-3 min-h-0 min-w-0">
      <div class="bg-white rounded-md border-1 mb-2 text-gray-600 text-sm border-gray-300 shadow py-2 px-4 flex flex-col">
        <span class="text-blue-400 font-medium">Sebelum anda mengisi data</span>
        <input type="text" ref="type" name="" placeholder="Hei">
      </div>
    </div>
  </div>
</template>
<script>
import MasterMenus from './MasterMenus'
export default {
  components: {
    MasterMenus
  },
  data() {
    return {
      texts: [
        'Pastikan anda bahagia',
        'Pikirkan apakah anda cukup tidur',
        'Yakinkan anda adalah orang yang bertanggung jawab'
      ]
    }
  },
  methods: {
    init() {
      this.interval = setInterval(() => {
        this.nextLetter();
      }, 75);
    },
    nextLetter() {
      if (this.text === undefined) {
        this.current = 0;
        this.text = this.texts[this.current];
        this.index = 0;
      }

      if (this.index <= this.text.length) {
        this.$refs.type.placeholder = this.text.substr(0, this.index++);
      } else {
        clearInterval(this.interval);

        this.index = 0;
        if (this.current >= this.texts) {
          this.current = 0;
          this.text = this.texts[this.current];
        } else {
          this.current++;
          this.text = this.texts[this.current];
        }
          
        setTimeout(() => { this.init() }, 3000);
      }
    }
  },
  created() {
    this.init()
  }
};
</script>