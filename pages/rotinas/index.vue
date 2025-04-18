<script setup lang="ts">
import {Icon} from "@iconify/vue";
import {ref} from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import ptBrLocale from '@fullcalendar/core/locales/pt-br'
import DialogCadastrarRotina from "~/pages/rotinas/components/DialogCadastrarRotina.vue";
import type {IRotina} from "~/interfaces/rotinas/rotina.interface";
import {useToast} from "primevue/usetoast";
import {buscarRotinasPorUsuario} from "~/composable/rotinas/buscarRotinasPorUsuario";
import {ICONES} from "~/constants/icones";
import DialogEditarRotina from "~/pages/rotinas/components/DialogEditarRotina.vue";

const toast = useToast();
const dadosPagina = useDadosPagina();
dadosPagina.value.titulo = 'Rotina'
dadosPagina.value.icone = 'ic:round-home'

const tipoMostragem = ref('Tabela')
const opcoes = ref([
  {label: 'Tabela', icon: 'lucide:table', value: 'Tabela'},
  {label: 'Calendário', icon: 'ic:round-calendar-month', value: 'Calendário'},
]);

const rotinas = ref<IRotina[] | []>([])

onMounted(async () => {
  rotinas.value = await buscarRotinasPorUsuario()
})

const calendarOptions = {
  plugins: [dayGridPlugin],
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
const mostrarDialogCadastrarRotina = ref(false)
const mostrarDialogEditarRotina = ref(false)

const rotinaCadastrada = (rotina: IRotina) => {
  mostrarDialogCadastrarRotina.value = false
  rotinas.value.push(rotina)
  toast.add({
    severity: 'success',
    summary: 'Sucesso no cadastro',
    detail: 'Rotina cadastrado com sucesso',
    life: 4000
  });
}

const rotinaEditada = (rotina: IRotina) => {
  const indexRotina = rotinas.value.findIndex(item => item.id === rotina.id)
  if (indexRotina > -1) {
    rotinas.value[indexRotina] = rotina
  }

  mostrarDialogEditarRotina.value = false
  toast.add({
    severity: 'success',
    summary: 'Sucesso na edição',
    detail: 'Rotina editada com sucesso',
    life: 4000
  });
}

const menuOpcoes = ref()
const opcoesItemTabela = ref([
  {
    label: 'Editar rotina',
    icon: ICONES.EDITAR,
    command: () => {
      mostrarDialogEditarRotina.value = true
    }
  },
  {
    label: 'Deletar rotina',
    icon: ICONES.DELETAR,
    command: () => {
    }
  }
])

const item = ref<IRotina | null>(null)
const toggleMenuOpcoes = (event: Event, itemClicado: IRotina) => {
  event.stopPropagation()
  menuOpcoes.value?.toggle(event);
  if (menuOpcoes.value.overlayVisible === true) {
    item.value = itemClicado
  }
};

</script>

<template>
  <div class="flex flex-col w-full gap-4 h-full">
    <div class="flex justify-between p-2 bg-white rounded items-center">
      <div>
        <SelectButton
v-model="tipoMostragem" :options="opcoes" option-label="label" option-value="value"
                      data-key="value"
                      size="large">
          <template #option="slotProps">
            <Icon :icon="slotProps.option.icon" width="34"/>
          </template>
        </SelectButton>
      </div>
      <Button type="button" class="font-bold" @click="mostrarDialogCadastrarRotina = true">
        <div>
          <Icon icon="ic:round-plus" width="24"/>
        </div>
        <span>Rotina</span>
      </Button>
      <DialogCadastrarRotina v-model:visible="mostrarDialogCadastrarRotina" @cadastrado="rotinaCadastrada"/>
      <DialogEditarRotina v-model:visible="mostrarDialogEditarRotina" :rotina-id="item?.id" @editado="rotinaEditada"/>
    </div>
    <div v-show="tipoMostragem === 'Tabela'">
      <DataTable :value="rotinas" table-style="min-width: 50rem" show-gridlines striped-rows size="small">
        <template #empty> Rotina adicionada adicionadas.</template>
        <Column header="" class="w-0">
          <template #body="{ data }">
            <Button text class="!p-1" @click="toggleMenuOpcoes($event,data )">
              <Icon icon="tabler:dots" style="color: #000000"/>
            </Button>
          </template>
        </Column>
        <Column field="nome" header="Rotina"/>
        <Column field="diaSemana" header="Próxima data"/>
        <Column field="inicio" header="Início">
          <template #body="{ data }">
            <span>{{
                data?.horaInicio && data?.dataInicio ? `${$dayjs(data?.dataInicio).format('DD/MM/YYYY')} - ${data?.horaInicio}` : '-'
              }}</span>
          </template>
        </Column>
        <Column field="responsavel.nome" header="Responsável">
          <template #body="{ data }">
            <span>{{ data?.responsavel?.nome || '-' }}</span>
          </template>
        </Column>
      </DataTable>
    </div>
    <div v-show="tipoMostragem === 'Calendário'" class="h-full w-full flex bg-white rounded p-4">
      <FullCalendar :options="calendarOptions" class="w-full"/>
    </div>
    <Toast/>
    <div>
      <Menu id="overlay_tmenu" ref="menuOpcoes" :model="opcoesItemTabela" popup>
        <template #item="{ item, props }">
          <a v-ripple class="flex items-center" v-bind="props.action">
            <Icon v-if="item.icon" :icon="item?.icon" width="24"/>
            <span :class="item.icon"/>
            <span>{{ item.label }}</span>
          </a>
        </template>
      </Menu>
    </div>
  </div>
</template>

<style scoped>

</style>