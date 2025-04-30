<script setup lang="ts">
import {ref} from 'vue'
import {buscarMercadosPorUsuario} from "~/composable/mercados/buscarMercadosPorUsuario";
import {ICONES} from "~/constants/icones";
import {Icon} from "@iconify/vue";
import {useToast} from "primevue/usetoast";
import DialogCadastrarMercado from "~/pages/mercados/components/DialogCadastrarMercado.vue";
import DialogEditarMercado from "~/pages/mercados/components/DialogEditarMercado.vue";
import type {IMercado} from "~/interfaces/mercados/mercado.interface";


const toast = useToast();
const menuOpcoes = ref();

const dadosPagina = useDadosPagina();
dadosPagina.value.titulo = 'Mercados'
dadosPagina.value.icone = 'ic:round-point-of-sale'

const itemClicado = ref<IMercado | null>(null)
const mercados = ref([] as IMercado[] | [])
mercados.value = await buscarMercadosPorUsuario()

const mostrarDialogCadastrarMercado = ref(false)
const mostrarDialogEditarMercado = ref(false)


const opcoesItemTabela = ref([
  {
    label: 'Editar',
    icon: ICONES.EDITAR,
    command: () => {
      mostrarDialogEditarMercado.value = true
    }
  },
  {
    label: 'Deletar',
    icon: ICONES.DELETAR,
    command: () => {
      confimarDeletar()
    }
  },
])

const confirm = useConfirm();
const confimarDeletar = () => {
  if (itemClicado?.value)
    confirm.require({
      message: `Tem certeza que deseja deletar o mercado ${itemClicado.value && itemClicado?.value.nome}?`,
      header: 'Deletar produto',
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
        // handleDeletarProduto(produtoClicado.value?.id as number)
      },
    });
};


const toggleMenuOpcoes = (event: Event, item: IMercado) => {
  event.stopPropagation()
  menuOpcoes.value?.toggle(event);
  if (menuOpcoes.value.overlayVisible === true) {
    itemClicado.value = item
  }
};

function mercadoCadastrado(mercado: IMercado) {
  mercados.value.push(mercado)
  toast.add({
    severity: 'success',
    summary: 'Sucesso no cadastro',
    detail: 'Mercado cadatrado com sucesso',
    life: 4000
  });
  mostrarDialogCadastrarMercado.value = false
}

function mercadoEditado(mercado: IMercado) {
  const index = mercados.value.findIndex(item => item.id === mercado.id)
  if (index > -1) {
    mercados.value[index] = mercado
  }

  toast.add({
    severity: 'success',
    summary: 'Sucesso na edição',
    detail: 'Mercado editado com sucesso',
    life: 4000
  });
  mostrarDialogEditarMercado.value = false
}

</script>

<template>
  <div class="flex flex-col w-full gap-4 h-full">
    <div class="flex justify-end p-2 bg-white rounded">
      <Button type="button" class="font-bold" @click="mostrarDialogCadastrarMercado = true">
        <div>
          <Icon icon="ic:round-plus" width="24"/>
        </div>
        <span>Mercado</span>
      </Button>
    </div>

    <div class="p-1 bg-white rounded">
      <DataTable :value="mercados" table-style="min-width: 50rem" show-gridlines striped-rows size="small">
        <template #empty> Nenhum mercado adicionado.</template>
        <Column header="" class="w-0">
          <template #body="{ data }">
            <Button text class="!p-1" @click="toggleMenuOpcoes($event, data )">
              <Icon :icon="ICONES.MAIS_OPCOES" style="color: #000000" width=""/>
            </Button>
          </template>
        </Column>
        <Column field="nome" header="Nome"/>
        <Column field="observacao" header="Observação">
          <template #body="{ data }">
            {{ data.observacao || '-' }}
          </template>
        </Column>
      </DataTable>
    </div>
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
    <DialogCadastrarMercado v-model:visible="mostrarDialogCadastrarMercado" @cadastrado="mercadoCadastrado"/>
    <DialogEditarMercado
        v-model:visible="mostrarDialogEditarMercado" :mercado="itemClicado"
        @editado="mercadoEditado"/>
    <Toast/>
    <ConfirmDialog>
      <template #icon>
        <Icon icon="ic:round-warning" width="32"/>
      </template>
    </ConfirmDialog>
  </div>
</template>

<style scoped>

</style>