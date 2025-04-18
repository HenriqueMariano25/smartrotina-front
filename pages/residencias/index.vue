<script setup lang="ts">
import {Icon} from '@iconify/vue';
import {ref} from 'vue'
import DialogCadastrarResidencia from "~/pages/residencias/components/DialogCadastrarResidencia.vue";
import DialogEditarMorador from "~/pages/residencias/components/DialogEditarMorador.vue";
import {buscarResidencias} from "~/composable/residencias/buscarResidencias";
import type {IResidencia} from "~/interfaces/residencias/residencia.interface";
import {useToast} from "primevue/usetoast";
import DialogCadastrarMorador from "~/pages/residencias/components/DialogCadastrarMorador.vue";
import {buscarMoradoresPorResidencia} from "~/composable/residencias/buscarMoradoresPorResidencia";
import type {IMorador} from "~/interfaces/residencias/morador.interface";
import {deletarMorador} from "~/composable/residencias/deletarMorador";

const dadosPagina = useDadosPagina();
dadosPagina.value.titulo = 'Residências'
dadosPagina.value.icone = 'ic:round-meeting-room'
const toast = useToast();
const confirm = useConfirm();
const confimarDeletar = () => {
  confirm.require({
    message: 'Tem certeza que deseja deletar esse morador?',
    header: 'Deletar morador',
    icon: 'pi pi-info-circle',
    rejectProps: {
      label: 'Cancelar',
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: 'Deletar',
      severity: 'danger'
    },
    accept: () => {
      handleDeletarMorador(morador.value?.id as number)
    },
  });
};

const tabs = ref<{ title: string; value: string; id: number }[]>([])
const subTab = ref('moradores')
const mostrarDialogCadastrarResidencia = ref(false)
const mostrarDialogCadastrarMorador = ref(false)
const mostrarDialogEditarMorador = ref(false)
const residenciaAtiva = ref<number>(0)
const residencias = ref<{ indexResidencia: number, moradores: IMorador[] }[]>([])
const menuOpcoesMorador = ref()
const opcoesItemTabela = ref([
  {
    label: 'Editar morador',
    icon: 'ic:baseline-edit',
    command: () => {
      mostrarDialogEditarMorador.value = true
    }
  },
  {
    label: 'Deletar morador',
    icon: 'ic:baseline-delete-forever',
    command: () => {
      confimarDeletar()
    }
  }
])
const morador = ref<IMorador | null>(null)

const toggleMenuOpcoesMorador = (event: Event, moradorClicado: IMorador) => {
  event.stopPropagation()
  menuOpcoesMorador.value?.toggle(event);
  if (menuOpcoesMorador.value.visible === true) {
    morador.value = moradorClicado
  }
};

await buscarResidencias().then(res => {
  let contador = 0

  for (const residencia of res as IResidencia[]) {
    tabs.value.push({title: residencia.nome, value: contador.toString(), id: residencia.id})
    residencias?.value.push({indexResidencia: residencia.id, moradores: []})
    contador++
  }
})

const residenciaCadastrada = (residencia: IResidencia) => {
  const ultimaResidencia = tabs.value[tabs.value.length - 1]
  tabs.value.push({title: residencia.nome, value: (ultimaResidencia.value + 1), id: residencia.id})
  toast.add({
    severity: 'success',
    summary: 'Sucesso no cadastro',
    detail: 'Residência cadatrada com sucesso',
    life: 4000
  });
  mostrarDialogCadastrarResidencia.value = false
}

if (residencias.value[residenciaAtiva.value]?.moradores?.length <= 0) {
  const moradores = await buscarMoradoresPorResidencia(residencias.value[residenciaAtiva.value]?.indexResidencia)
  residencias.value[0]?.moradores.push(...moradores)
}

const moradorCadastrado = (morador: IMorador) => {
  const residencia = residencias.value[residenciaAtiva.value]
  if (residencia) {
    residencia.moradores.push(morador)
  }
  toast.add({
    severity: 'success',
    summary: 'Sucesso no cadastro',
    detail: 'Morador cadastrado com sucesso',
    life: 4000
  });
  mostrarDialogCadastrarMorador.value = false
}

const moradorEditado = (morador: IMorador) => {
  const moradorEncontrado = residencias.value[residenciaAtiva.value]?.moradores.find(m => m.id === morador.id)
  if (moradorEncontrado) {
    moradorEncontrado.nome = morador.nome
    moradorEncontrado.dataNascimento = morador.dataNascimento
  }
  toast.add({
    severity: 'success',
    summary: 'Sucesso na edição',
    detail: 'Morador editado com sucesso',
    life: 4000
  });
  mostrarDialogEditarMorador.value = false
}

const handleDeletarMorador = async (moradorId: number) => {
  try {
    await deletarMorador(moradorId)
    const moradorEncontradoIndex = residencias.value[residenciaAtiva.value]?.moradores.findIndex(m => m.id === moradorId)
    if (moradorEncontradoIndex > -1) {
      residencias.value[residenciaAtiva.value]?.moradores.splice(moradorEncontradoIndex, 1)
    }
    toast.add({
      severity: 'success',
      summary: 'Sucesso ao deletar',
      detail: 'Morador deletado com sucesso',
      life: 4000
    });
  } catch (err) {
    console.log(err)
  }


}

</script>

<template>
  <div class="flex flex-col w-full gap-4 h-full">
    <div class="flex justify-end p-2 bg-white rounded">
      <Button type="button" class="font-bold" @click="mostrarDialogCadastrarResidencia = true">
        <Icon icon="ic:round-plus" width="24"/>
        <span>Residência</span>
      </Button>
    </div>
    <div class="p-1 bg-white rounded h-full">
      <Tabs v-model:value="residenciaAtiva" value="0" class="w-full !rounded h-full">
        <TabList class="!rounded">
          <Tab v-for="tab in tabs" :key="tab.title" :value="tab.value">{{ tab.title }}</Tab>
        </TabList>
        <TabPanels class="!p-0  h-full ">
          <TabPanel v-for="tab in tabs" :key="tab.value" :value="tab.value" class="!p-0 h-full">
            <div class="flex h-full">
              <div class="flex flex-col h-full bg-gray-400 p-2 gap-2">
                <div
v-tooltip="{ value: 'Moradores', showDelay: 800,}"
                     class="!p-1 rounded bg-secundaria-50 cursor-pointer text-black"
                     :class="{'!bg-primaria-200': subTab === 'moradores' }" @click="subTab = 'moradores'">
                  <Icon icon="ic:round-person" width="30" height="30"/>
                </div>
                <div
v-tooltip="{ value: 'Contas', showDelay: 800}"
                     class="!p-1 rounded bg-secundaria-50 cursor-pointer text-black" :class="{'!bg-primaria-200': subTab === 'contas' }"
                     @click="subTab = 'contas'">
                  <Icon icon="ic:round-attach-money" width="30" height="30"/>
                </div>
              </div>
              <div v-if="subTab === 'moradores'" class="flex flex-col w-full p-2 gap-2">
                <div class="flex gap-2">
                  <InputText type="text" placeholder="Buscar..." class="w-full"/>
                  <Button type=button class="font-bold" @click="mostrarDialogCadastrarMorador = true">
                    <div>
                      <Icon icon="ic:round-plus" width="24"/>
                    </div>
                    <span>Moradores</span>
                  </Button>
                </div>
                <DataTable
:value="residencias[residenciaAtiva]?.moradores" table-style="min-width: 50rem" show-gridlines
                           striped-rows size="small">
                  <template #empty> Nenhum morador adicionado nessa residência.</template>
                  <Column header="" class="w-0">
                    <template #body="{ data }">
                      <Button
text class="!p-1" aria-haspopup="true" aria-controls="overlay_tmenu"
                              @click="toggleMenuOpcoesMorador($event, data)">
                        <Icon icon="tabler:dots" style="color: #000000" width=""/>
                      </Button>
                    </template>
                  </Column>
                  <Column field="nome" header="Nome"/>
                  <Column field="dataNascimento" header="Data de nascimento">
                    <template #body="{ data }">
                      <span>{{ $dayjs(data?.dataNascimento).format("DD/MM/YYYY") }}</span>
                    </template>
                  </Column>
                </DataTable>
              </div>
              <div v-if="subTab === 'contas'" class="flex flex-col w-full p-2 gap-2">
                <div class="flex gap-2">
                  <InputText type="text" placeholder="Buscar..." class="w-full"/>
                  <Button type=button class="font-bold">
                    <div>
                      <Icon icon="ic:round-plus" width="24"/>
                    </div>
                    <span>Contas</span>
                  </Button>
                </div>
                <DataTable :value="contas" table-style="min-width: 50rem" show-gridlines striped-rows>
                  <template #empty> Nenhuma conta adicionada nessa residência.</template>
                  <Column header="" class="w-0">
                    <template #body="slotProps">
                      <Button text class="!p-1">
                        <Icon icon="tabler:dots" style="color: #000000" width=""/>
                      </Button>
                    </template>
                  </Column>
                  <Column field="tipoConta" header="Tipo da conta"/>
                  <Column field="valor" header="Valor"/>
                  <Column field="dataLancamento" header="Data lançamento"/>
                </DataTable>
              </div>
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <TieredMenu id="overlay_tmenu" ref="menuOpcoesMorador" :model="opcoesItemTabela" popup>
        <template #item="{ item, props }">
          <a v-ripple class="flex items-center" v-bind="props.action">
            <Icon v-if="item.icon" :icon="item?.icon" width="24"/>
            <span :class="item.icon"/>
            <span>{{ item.label }}</span>
          </a>
        </template>
      </TieredMenu>
    </div>
    <DialogCadastrarResidencia v-model:visible="mostrarDialogCadastrarResidencia" @cadastrado="residenciaCadastrada"/>
    <DialogCadastrarMorador
        v-model:visible="mostrarDialogCadastrarMorador"
        :residencia-id="tabs[residenciaAtiva].id"
        @cadastrado="moradorCadastrado"/>
    <DialogEditarMorador
        v-model:visible="mostrarDialogEditarMorador"
        :morador="morador"
        @editado="moradorEditado"/>
    <ConfirmDialog>
      <template #icon>
        <Icon icon="ic:round-warning" width="32"/>
      </template>
    </ConfirmDialog>
    <Toast/>
  </div>
</template>

<style scoped>

</style>