<script setup lang="ts">
import {Icon} from "@iconify/vue";
import {formatarParaReal} from "../../../utils/formatarParaReal";

defineProps({
  totalSelecionados: { type: Number, default: 0},
  totalValor: { type: Number, default: 0}
})
</script>

<template>
  <div class="w-full bg-primaria-500 text-white h-16 p-2 items-center flex absolute bottom-0 -mb-4 -ml-4 " style="width: calc(100% + 2rem);">
    <div class="flex gap-2 items-center">
      <Icon icon="mdi:calculator" width="44"/>
      <div class="flex flex-col">
        <span class="font-medium text-xs">{{
            totalSelecionados > 1 ? totalSelecionados + " produtos" : totalSelecionados === 1 ? "1 produto" : ""
          }}</span>
        <span class="font-bold text-xl">{{ formatarParaReal(totalValor)  }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>