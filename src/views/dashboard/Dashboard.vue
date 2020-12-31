<template>
  <div class="c-body">
    <main class="c-main">
        <div class="container-fluid">
            <HelloWorld msg="Welcome to Your Vue.js App"/>
        </div>
    </main>
</div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
