<script setup lang="ts">
import {Icon} from '@iconify/vue';
import {ref} from 'vue'
import DialogCadastrarResidencia from "~/pages/residencias/components/DialogCadastrarResidencia.vue";
import {buscarResidencias} from "~/composable/residencias/buscarResidencias";
import type {IResidencia} from "~/interfaces/residencias/residencia";
import {useToast} from "primevue/usetoast";

const toast = useToast();

const tabs = ref<{ title: string; value: string; id: number }[]>([])
const subTab = ref('moradores')
const mostrarDialog = ref(false)
const moradores = ref([
  {id: 1, nome: "Henrique Mariano", dataNascimento: "25-01-1999"},
  {id: 2, nome: "Maria Eduarda", dataNascimento: "27-09-2001"},
])

await buscarResidencias().then(residencias => {
  let contador = 0

  for (const residencia of residencias as IResidencia[]) {
    tabs.value.push({title: residencia.nome, value: contador.toString(), id: residencia.id})
    contador++
  }
})

const residenciaCadastrada = (residencia: IResidencia) => {
  const ultimaResidencia = tabs.value[tabs.value.length - 1]
  tabs.value.push({title: residencia.nome, value: (ultimaResidencia.value + 1).toString(), id: residencia.id})
  toast.add({
    severity: 'success',
    summary: 'Sucesso no cadastro',
    detail: 'Residência cadatrada com sucesso',
    life: 4000
  });
  mostrarDialog.value = false
}

</script>

<template>
  <div class="flex flex-col w-full gap-4 h-full">
    <div class="flex justify-end p-2 bg-white rounded">
      <Button type="button" class="font-bold" @click="mostrarDialog = true">
        <Icon icon="ic:round-plus" width="24"/>
        <span>Residência</span>
      </Button>
    </div>
    <div class="p-1 bg-white rounded h-full">
      <Tabs value="0" class="w-full !rounded h-full">
        <TabList class="!rounded">
          <Tab v-for="tab in tabs" :key="tab.title" :value="tab.value">{{ tab.title }}</Tab>
        </TabList>
        <TabPanels class="!p-0  h-full ">
          <TabPanel v-for="tab in tabs" :key="tab.value" :value="tab.value" class="!p-0 h-full">
            <div class="flex h-full">
              <div class="flex flex-col h-full bg-gray-400 p-2 gap-2">
                <div class="!p-1 rounded bg-secundaria-50 cursor-pointer text-black"
                     v-tooltip="{ value: 'Moradores', showDelay: 800,}"
                     :class="{'!bg-primaria-200': subTab === 'moradores' }" @click="subTab = 'moradores'">
                  <Icon icon="ic:round-person" width="30" height="30"/>
                </div>
                <div class="!p-1 rounded bg-secundaria-50 cursor-pointer text-black"
                     v-tooltip="{ value: 'Contas', showDelay: 800}" :class="{'!bg-primaria-200': subTab === 'contas' }"
                     @click="subTab = 'contas'">
                  <Icon icon="ic:round-attach-money" width="30" height="30"/>
                </div>
              </div>
              <div class="flex flex-col w-full p-2 gap-2" v-if="subTab === 'moradores'">
                <div class="flex gap-2">
                  <InputText type="text" placeholder="Buscar..." class="w-full"/>
                  <Button type=button class="font-bold">
                    <div>
                      <Icon icon="ic:round-plus" width="24"/>
                    </div>
                    <span>Moradores</span>
                  </Button>
                </div>
                <DataTable :value="moradores" tableStyle="min-width: 50rem" showGridlines stripedRows>
                  <template #empty> Nenhum morador adicionado nessa residência.</template>
                  <Column header="" class="w-0">
                    <template #body="slotProps">
                      <Button text class="!p-1">
                        <Icon icon="tabler:dots" style="color: #000000" width=""/>
                      </Button>
                    </template>
                  </Column>
                  <Column field="nome" header="Nome"></Column>
                  <Column field="dataNascimento" header="Data de nascimento"></Column>
                </DataTable>
              </div>
              <div class="flex flex-col w-full p-2 gap-2" v-if="subTab === 'contas'">
                <div class="flex gap-2">
                  <InputText type="text" placeholder="Buscar..." class="w-full"/>
                  <Button type=button class="font-bold">
                    <div>
                      <Icon icon="ic:round-plus" width="24"/>
                    </div>
                    <span>Contas</span>
                  </Button>
                </div>
                <DataTable :value="contas" tableStyle="min-width: 50rem" showGridlines stripedRows>
                  <template #empty> Nenhuma conta adicionada nessa residência.</template>
                  <Column header="" class="w-0">
                    <template #body="slotProps">
                      <Button text class="!p-1">
                        <Icon icon="tabler:dots" style="color: #000000" width=""/>
                      </Button>
                    </template>
                  </Column>
                  <Column field="tipoConta" header="Tipo da conta"></Column>
                  <Column field="valor" header="Valor"></Column>
                  <Column field="dataLancamento" header="Data lançamento"></Column>
                </DataTable>
              </div>
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
    <DialogCadastrarResidencia v-model:visible="mostrarDialog" @cadastrado="residenciaCadastrada"/>
    <Toast/>
  </div>
</template>

<style scoped>

</style>