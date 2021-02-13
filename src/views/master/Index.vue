<template>
  <div class="flex flex-col space-y-4 lg:flex-row lg:space-y-0 h-full w-full">
    <div class=" h-full w-full lg:flex-1 px-3 min-h-0 min-w-0">
      <div class="max-w-md flex justify-center items-center h-full mx-auto">
        <MasterMenus />
      </div>
    </div>
  </div>
</template>
<script>
import MasterMenus from '@/components/MasterMenus'
export default {
  components: {
    MasterMenus
  }
};
</script>