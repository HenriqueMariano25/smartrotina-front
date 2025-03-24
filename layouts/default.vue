<script setup lang="ts">

import MenuLateral from "~/components/layout/MenuLateral.vue";
import NavBar from "~/components/layout/NavBar.vue";
</script>

<template>
  <div class="flex flex-col h-[100vh]">
    <NavBar />
    <div class="flex h-full ">
      <MenuLateral />
      <div class="p-4">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>