<script setup lang="ts">
import {ref} from 'vue'
import {Icon} from "@iconify/vue";

const dadosPagina = useDadosPagina();
dadosPagina.value.titulo = 'Home'
dadosPagina.value.icone = 'ic:round-home'

const rotinas = ref([
  {id: 1, nome: 'Cortar a grama', diaSemana: 'Segunda-feira', hora: '08:00', responsavel: 'Henrique Mariano'},
  {id: 2, nome: 'Limpar a piscina', diaSemana: 'Terça-feira', hora: '09:00', responsavel: 'Maria Eduarda'},
  {id: 3, nome: 'Limpar a casa', diaSemana: 'Quarta-feira', hora: '10:00', responsavel: 'Henrique Mariano'},
  {id: 4, nome: 'Lavar o carro', diaSemana: 'Quinta-feira', hora: '11:00', responsavel: 'Maria Eduarda'},
  {id: 5, nome: 'Fazer compras', diaSemana: 'Sexta-feira', hora: '12:00', responsavel: 'Henrique Mariano'},
])

definePageMeta({
  layout: 'default'
})
</script>

<template>
  <div class="flex gap-4 w-full">
    <div class="flex flex-col rounded p-4 gap-4 bg-white w-full">
      <span class="font-bold text-xl">Rotinas de hoje</span>
      <DataTable :value="rotinas" table-style="min-width: 50rem" show-gridlines striped-rows size="small">
        <template #empty> Rotina adicionada adicionadas.</template>
        <Column header="" class="w-0">
          <template #body="slotProps">
            <Button text class="!p-1">
              <Icon icon="tabler:dots" style="color: #000000" width=""/>
            </Button>
          </template>
        </Column>
        <Column field="nome" header="Rotina"/>
        <Column field="hora" header="Hora"/>
        <Column field="responsavel" header="Responsável"/>
      </DataTable>

    </div>
  </div>
</template>

<style scoped>

</style>