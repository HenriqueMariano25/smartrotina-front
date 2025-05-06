<script setup lang="ts">
import {Icon} from "@iconify/vue";

</script>

<template>
  <div class="flex !bg-secundaria-250 p-2 justify-center items-center">
    <div class="items-center flex">
      <Button variant="text" class="!text-gray-800 !p-0" @click="$emit('toggle-menu')">
        <Icon icon="ic:round-menu" width="58"/>
      </Button>
    </div>
    <NuxtLink to="/" class="flex justify-center m-auto ">
      <img src="@/assets/images/logo.png" alt="Logo" class="" width="160px">
    </NuxtLink>
  </div>
</template>

<style scoped>

</style>