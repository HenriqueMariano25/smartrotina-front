<script setup lang="ts">

import {ICONES} from "~/constants/icones";
import {Icon} from "@iconify/vue";
import type {ICompra} from "~/interfaces/compras/compras/compra.interface";
import {buscarComprasPorUsuario} from "~/composable/compras/minhasCompras/buscarComprasPorUsuario";

const dadosPagina = useDadosPagina();
dadosPagina.value.titulo = 'Minhas compras'
dadosPagina.value.icone = 'ic:round-monetization-on'

const compras = ref<ICompra[]>([])
compras.value = await buscarComprasPorUsuario()

const {$dayjs} = useNuxtApp()

</script>

<template>
  <div class="flex flex-col w-full gap-4 h-full">
    <div class="flex justify-end p-2 bg-white rounded"/>
    <div class="bg-white p-1 rounded">
      <DataTable :value="compras" table-style="min-width: 50rem" show-gridlines striped-rows size="small">
        <template #empty> Nenhuma compra encontrada.</template>
        <!--        <Column header="" class="w-0">-->
        <!--          <template #body="{ data }">-->
        <!--            <Button text class="!p-1">-->
        <!--              <Icon :icon="ICONES.MAIS_OPCOES" style="color: #000000" width=""/>-->
        <!--            </Button>-->
        <!--          </template>-->
        <!--        </Column>-->
        <Column field="valor" header="Valor">
          <template #body="{ data }">
            <span>{{ formatarParaReal(data.valor) }}</span>
          </template>
        </Column>
        <Column field="compradoEm" header="Data da compra">
          <template #body="{ data }">
            <span>{{ $dayjs(data.compradoEm).format('DD/MM/YYYY') }}</span>
          </template>
        </Column>
        <Column field="mercado.nome" header="Mercado"/>
        <Column field="formaPagamento.descricao" header="Pagamento"/>
      </DataTable>
    </div>
  </div>
</template>

<style scoped>

</style>