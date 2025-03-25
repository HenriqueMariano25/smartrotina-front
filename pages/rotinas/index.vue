<script setup lang="ts">
import {Icon} from "@iconify/vue";
import { ref } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import ptBrLocale from '@fullcalendar/core/locales/pt-br'
import DialogCadastrarRotina from "~/pages/rotinas/components/DialogCadastrarRotina.vue";
// import interactionPlugin from '@fullcalendar/core'


const tipoMostragem = ref('Tabela')
const opcoes = ref([
  { icon: 'lucide:table', value: 'Tabela' },
  { icon: 'ic:round-calendar-month', value: 'Calendário' },
]);

const rotinas = ref([
  { id: 1, nome: 'Cortar a grama', diaSemana: 'Segunda-feira', hora: '08:00', responsavel: 'Henrique Mariano' },
  { id: 2, nome: 'Limpar a piscina', diaSemana: 'Terça-feira', hora: '09:00', responsavel: 'Maria Eduarda' },
  { id: 3, nome: 'Limpar a casa', diaSemana: 'Quarta-feira', hora: '10:00', responsavel: 'Henrique Mariano' },
  { id: 4, nome: 'Lavar o carro', diaSemana: 'Quinta-feira', hora: '11:00', responsavel: 'Maria Eduarda' },
  { id: 5, nome: 'Fazer compras', diaSemana: 'Sexta-feira', hora: '12:00', responsavel: 'Henrique Mariano' },
])

const calendarOptions = {
  plugins: [ dayGridPlugin ],
  locale: ptBrLocale,
  initialView: 'dayGridMonth',
  height: '100%',
  width: '100%',
  events: [
    {
      title: 'Lavar a louça',
      start: '2025-03-01'
    },
  ]
}
const mostrarModal = ref(true)

</script>

<template>
  <div class="flex flex-col w-full gap-4 h-full">
    <div class="flex justify-between p-2 bg-white rounded items-center">
      <div>
        <SelectButton v-model="tipoMostragem" :options="opcoes" option-value="value" data-key="value" aria-labelledby="custom" size="large">
          <template #option="slotProps">
            <Icon :icon="slotProps.option.icon" width="34"/>
          </template>
        </SelectButton>
      </div>
      <Button type="button" class="font-bold" @click="mostrarModal = true">
        <div>
          <Icon icon="ic:round-plus" width="24"/>
        </div>
        <span>Rotina</span>
      </Button>
      <DialogCadastrarRotina v-model:visible="mostrarModal" />
    </div>
    <div v-if="tipoMostragem === 'Tabela'">
      <DataTable :value="rotinas" tableStyle="min-width: 50rem" showGridlines stripedRows>
        <template #empty> Rotina adicionada adicionadas. </template>
        <Column header="" class="w-0">
          <template #body="slotProps">
            <Button text class="!p-1">
              <Icon icon="tabler:dots" style="color: #000000" width=""/>
            </Button>
          </template>
        </Column>
        <Column field="nome" header="Rotina"></Column>
        <Column field="diaSemana" header="Dias da semana"></Column>
        <Column field="hora" header="Hora"></Column>
        <Column field="responsavel" header="Responsável"></Column>
      </DataTable>
    </div>
    <div v-else-if="tipoMostragem === 'Calendário'" class="h-full w-full flex bg-white rounded p-4">
      <FullCalendar :options="calendarOptions" class="w-full"  />
    </div>
  </div>
</template>

<style scoped>

</style>