<script setup lang="ts">
import {ref} from 'vue'
import {Icon} from "@iconify/vue";
import DialogCadastrarLista from "~/pages/compras/components/DialogCadastrarLista.vue";

const lista = ref([
  { id: 1, nome: "Mensal", quantidadeProdutos: 18, responsavel: "Henrique Mariano" },
  { id: 2, nome: "Semanal", quantidadeProdutos: 5, responsavel: "Maria Eduarda" },
])

const mostrarModal = ref(true)

</script>

<template>
  <div class="flex flex-col w-full gap-4 h-full">
    <div class="flex justify-end p-2 bg-white rounded">
      <Button type="button" class="font-bold" @click="mostrarModal = true">
        <div>
          <Icon icon="ic:round-plus" width="24"/>
        </div>
        <span>Lista</span>
      </Button>
      <DialogCadastrarLista v-model:visible="mostrarModal" />
    </div>
    <DataTable :value="lista" table-style="min-width: 50rem" show-gridlines striped-rows size="small">
      <template #empty> Nenhum lista de compras adicionadas. </template>
      <Column header="" class="w-0">
        <template #body="">
          <Button text class="!p-1">
            <Icon icon="tabler:dots" style="color: #000000" width=""/>
          </Button>
        </template>
      </Column>
      <Column field="nome" header="Nome"></Column>
      <Column field="quantidadeProdutos" header="Quant. Produtos"></Column>
      <Column field="responsavel" header="Responsável"></Column>
    </DataTable>
  </div>
</template>

<style scoped>

</style>