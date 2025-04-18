<script setup lang="ts">
import {ref} from 'vue'
import {Icon} from "@iconify/vue";
import DialogCadastrarListaProdutos from "~/pages/compras/components/DialogCadastrarListaProdutos.vue";
import type {IListaProdutos} from "~/interfaces/compras/listaProdutos.interface";
import {useRouter} from "#vue-router";
import {ICONES} from "~/constants/icones";
import {useToast} from "primevue/usetoast";
import {buscarListaProdutosPorUsuarioLogado} from "~/composable/compras/buscarListaProdutosPorUsuario";
import DialogEditarListaProdutos from "~/pages/compras/components/DialogEditarListaProdutos.vue";

const router = useRouter()
const toast = useToast();

const listaProdutosId = useState("listaProdutosId", () => null);
const listaProdutos = ref<IListaProdutos | null>(null)
const listasProdutos = ref<IListaProdutos[] | []>([])
listasProdutos.value = await buscarListaProdutosPorUsuarioLogado()

const mostrarDialogCadastrarListaProdutos = ref(false)
const mostrarDialogEditarListaProdutos = ref(false)
const dadosPagina = useDadosPagina();
dadosPagina.value.titulo = 'Lista compras'
dadosPagina.value.icone = 'ic:round-checklist'

const menuOpcoes = ref()
const opcoesItemTabela = ref([
  {
    label: 'Ver lista',
    icon: ICONES.VISUALIZAR,
    command: () => {
      handleVerListaProdutos()
    }
  },
  {
    label: 'Editar lista',
    icon: ICONES.EDITAR,
    command: () => {
      mostrarDialogEditarListaProdutos.value = true
    }
  },
])

const toggleMenuOpcoesMorador = (event: Event, listaClicada: IListaProdutos) => {
  event.stopPropagation()
  menuOpcoes.value?.toggle(event);
  if (menuOpcoes.value.overlayVisible === true) {
    listaProdutos.value = listaClicada
  }
};
const nomeListaProdutos = useState<string | null>('nomeListaProdutos', () => null)

const handleVerListaProdutos = () => {
  listaProdutosId.value = listaProdutos.value?.id || null;
  nomeListaProdutos.value = listaProdutos.value?.nome || null;

  router.push('/compras/listaProdutos')
}

const listaProdutosCadastrada = (item: IListaProdutos) => {
  (listasProdutos.value as IListaProdutos[]).push(item)
  mostrarDialogCadastrarListaProdutos.value = false
  toast.add({
    severity: 'success',
    summary: 'Sucesso no cadastro',
    detail: 'Lista de produtos cadatrada com sucesso',
    life: 4000
  });
}

const listaProdutosEditada = (item: IListaProdutos) => {
  const index = listasProdutos.value.findIndex((lista) => lista.id === item.id)
  if (index !== -1) {
    listasProdutos.value[index] = item
  }

  mostrarDialogEditarListaProdutos.value = false
  toast.add({
    severity: 'success',
    summary: 'Sucesso na edição',
    detail: 'Lista de produtos editada com sucesso',
    life: 4000
  });
}

</script>

<template>
  <div class="flex flex-col w-full gap-4 h-full">
    <div class="flex justify-end p-2 bg-white rounded">
      <Button type="button" class="font-bold" @click="mostrarDialogCadastrarListaProdutos = true">
        <div>
          <Icon icon="ic:round-plus" width="24"/>
        </div>
        <span>Lista</span>
      </Button>
      <DialogCadastrarListaProdutos
          v-model:visible="mostrarDialogCadastrarListaProdutos"
          @cadastrado="listaProdutosCadastrada"/>
      <DialogEditarListaProdutos
          v-model:visible="mostrarDialogEditarListaProdutos"
          :lista-produtos-id="listaProdutos?.id" @editado="listaProdutosEditada"/>
    </div>
    <DataTable :value="listasProdutos" table-style="min-width: 50rem" show-gridlines striped-rows size="small">
      <template #empty> Nenhum lista de compras adicionadas.</template>
      <Column header="" class="w-0">
        <template #body="{ data }">
          <Button text class="!p-1" @click="toggleMenuOpcoesMorador($event, data )">
            <Icon :icon="ICONES.MAIS_OPCOES" style="color: #000000" width=""/>
          </Button>
        </template>
      </Column>
      <Column field="nome" header="Nome"/>
      <Column field="quantidadeProdutos" header="Quant. Produtos"/>
      <Column field="responsavel" header="Responsável">
        <template #body="{ data }">
          <span>{{ data?.responsavel?.nome || '-' }}</span>
        </template>
      </Column>
    </DataTable>
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
    <Toast/>
  </div>
</template>

<style scoped>

</style>