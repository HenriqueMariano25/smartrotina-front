<template>
  <div class="flex">
    <div class="w-1/2 bg-fundo">
      
    </div>
    <div class="h-screen w-1/2 overflow-hidden ">
      <NuxtImg src="images/tela-inicial.jpg" class="w-full h-full object-cover object-center"/>
      <div class="absolute justify-self-end top-0 inset-0 bg-gradient-to-r from-[#E8E9E3] to-transparent w-1/2 "/>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  setup() {


    return {}
  }
})
</script>

<style scoped>

</style>