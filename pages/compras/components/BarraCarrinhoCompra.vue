<script setup lang="ts">
import {Icon} from "@iconify/vue";
import {formatarParaReal} from "../../../utils/formatarParaReal";
import DialogFinalizarCompra from "~/pages/compras/listaProdutos/components/DialogFinalizarCompra.vue";
import {ref} from 'vue'

defineProps({
  totalSelecionados: {type: Number, default: 0},
  totalValor: {type: Number, default: 0},
  produtosListaProdutos: {
    type: Array,
    default: () => []
  }
})

const mostrarDialogFinalizarCompra = ref(false)


</script>

<template>
  <div
      class="w-full bg-primaria-500 text-white h-16 p-2 items-center flex absolute bottom-0 -mb-4 -ml-4 justify-between "
      style="width: calc(100% + 2rem);">
    <div class="flex gap-2 items-center">
      <Icon icon="mdi:calculator" width="44"/>
      <div class="flex flex-col">
        <span class="font-medium text-xs">{{
            totalSelecionados > 1 ? totalSelecionados + " produtos" : totalSelecionados === 1 ? "1 produto" : ""
          }}</span>
        <span class="font-bold text-xl">{{ formatarParaReal(totalValor) }}</span>
      </div>
    </div>
    <div class="flex gap-4">
      <Button
          class="!bg-secundaria-200 !text-gray-900" :disabled="totalSelecionados === 0"
          @click="mostrarDialogFinalizarCompra = true">
        <Icon icon="ic:round-payment" width="36px"/>
        <span>Finalizar compra</span>
      </Button>
    </div>
    <DialogFinalizarCompra
        v-model:visible="mostrarDialogFinalizarCompra" :valor-previsto="totalValor"
        :quantidade-produtos="totalSelecionados"
        :produtos-lista-produtos="produtosListaProdutos"
        @comprado="$emit('comprado'); mostrarDialogFinalizarCompra = false"
    />
  </div>
</template>

<style scoped>

</style>