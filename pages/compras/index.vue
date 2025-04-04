<script setup lang="ts">
import {ref} from 'vue'
import {Icon} from "@iconify/vue";
import DialogCadastrarLista from "~/pages/compras/components/DialogCadastrarLista.vue";
import type {IListaProdutos} from "~/interfaces/compras/listaProdutos.interface";
import {useRouter} from "#vue-router";

const router = useRouter()
const listaProdutosId = useState("listaProdutosId", () => null);

const lista = ref([
  {id: 1, nome: "Mensal", quantidadeProdutos: 18, responsavel: "Henrique Mariano"},
  {id: 2, nome: "Semanal", quantidadeProdutos: 5, responsavel: "Maria Eduarda"},
])

const mostrarModal = ref(false)

const menuOpcoes = ref()
const opcoesItemTabela = ref([
  {
    label: 'Ver lista',
    icon: 'ic:round-remove-red-eye',
    command: () => {
      handleVerListaProdutos()
    }
  },
  // {
  //   label: 'Deletar morador',
  //   icon: 'ic:baseline-delete-forever',
  //   command: () => {
  //     confimarDeletar()
  //   }
  // }
])
const listaProdutos = ref<IListaProdutos | null>(null)
const toggleMenuOpcoesMorador = (event: Event, listaClicada: IListaProdutos) => {
  event.stopPropagation()
  menuOpcoes.value?.toggle(event);
  if (menuOpcoes.value.visible === true) {
    listaProdutos.value = listaClicada
  }
};

const handleVerListaProdutos = () => {
  listaProdutosId.value = listaProdutos.value?.id  || null;
  router.push('/compras/listaProdutos')
}

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
      <DialogCadastrarLista v-model:visible="mostrarModal"/>
    </div>
    <DataTable :value="lista" table-style="min-width: 50rem" show-gridlines striped-rows size="small">
      <template #empty> Nenhum lista de compras adicionadas.</template>
      <Column header="" class="w-0">
        <template #body="{ data }">
          <Button text class="!p-1" @Click="toggleMenuOpcoesMorador($event, data )">
            <Icon icon="tabler:dots" style="color: #000000" width=""/>
          </Button>

        </template>
      </Column>
      <Column field="nome" header="Nome"></Column>
      <Column field="quantidadeProdutos" header="Quant. Produtos"></Column>
      <Column field="responsavel" header="Responsável"></Column>
    </DataTable>
    <div>
      <Menu ref="menuOpcoes" id="overlay_tmenu" :model="opcoesItemTabela" popup>
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