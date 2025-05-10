<script setup lang="ts">
import {Icon} from "@iconify/vue";
import {useDadosPagina} from "~/utils/useTituloPagina";

const dadosPagina = useDadosPagina()

</script>

<template>
  <div class="flex !bg-secundaria-250 p-2 justify-center items-center h-[76px]">
    <div class="items-center flex">
      <Button variant="text" class="!text-gray-800 !p-0" @click="$emit('toggle-menu')">
        <Icon icon="ic:round-menu" width="58"/>
      </Button>
    </div>
    <div class="ml-6 flex items-center gap-2 w-full justify-start">
      <div class="bg-secundaria-500 rounded">
        <Icon :icon="dadosPagina.icone" width="40"/>
      </div>
      <span class="text-2xl font-bold ">{{ dadosPagina?.titulo }}</span>
    </div>

  </div>
</template>

<style scoped>

</style>