<script setup lang="ts">
import {Icon} from "@iconify/vue";
import {buscarProdutosPorUsuario} from "~/composable/produtos/buscarProdutoPorUsuario";
import type {IProduto} from "~/interfaces/produtos/produto.interface";
import {ICONES} from "~/constants/icones";
import DialogCadastrarProduto from "~/pages/produtos/components/DialogCadastrarProduto.vue";
import {useToast} from "primevue/usetoast";
import {ref} from "vue";
import DialogEditarProduto from "~/pages/produtos/components/DialogEditarProduto.vue";
import {deletarMorador} from "~/composable/residencias/deletarMorador";
import {deletarProduto} from "~/composable/produtos/deletarProduto";

const toast = useToast();
const menuOpcoes = ref();
const mostrarDialogCadastrarProduto = ref(false)
const mostrarDialogEditarProduto = ref(false)
const opcoesItemTabela = ref([
  {
    label: 'Editar',
    icon: ICONES.EDITAR,
    command: () => {
      mostrarDialogEditarProduto.value = true
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
const produtoClicado = ref<IProduto | null>(null)

const produtos = ref<IProduto[] | []>([])
produtos.value = await buscarProdutosPorUsuario()

const confirm = useConfirm();
const confimarDeletar = () => {
  confirm.require({
    message: `Tem certeza que deseja deletar o produto ${produtoClicado.value && produtoClicado?.value.nome}?`,
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
      handleDeletarProduto(produtoClicado.value?.id as number)
    },
  });
};

const handleDeletarProduto = async (produtoId: number) => {
  try {
    await deletarProduto(produtoId)
    const index = produtos.value?.findIndex(item => item.id === produtoId)
    if (index > -1) {
      produtos.value?.splice(index, 1)
    }
    toast.add({
      severity: 'success',
      summary: 'Sucesso ao deletar',
      detail: 'Produto deletado com sucesso',
      life: 4000
    });
  } catch (err) {
    console.log(err)
  }
}

const toggleMenuOpcoes = (event: Event, itemClicado: IProduto) => {
  event.stopPropagation()
  menuOpcoes.value?.toggle(event);
  if (menuOpcoes.value.overlayVisible === true) {
    produtoClicado.value = itemClicado
  }
};

function produtoCadastrado(produto: IProduto) {
  produtos.value.push(produto)
  toast.add({
    severity: 'success',
    summary: 'Sucesso no cadastro',
    detail: 'Produto cadatrado com sucesso',
    life: 4000
  });
  mostrarDialogCadastrarProduto.value = false
}

function produtoEditado(produto: IProduto) {
  const index = produtos.value.findIndex(item => item.id === produto.id)
  if (index > -1) {
    produtos.value[index] = produto
  }

  toast.add({
    severity: 'success',
    summary: 'Sucesso na edição',
    detail: 'Produto editado com sucesso',
    life: 4000
  });
  mostrarDialogEditarProduto.value = false
}

</script>

<template>
  <div class="flex flex-col w-full gap-4 h-full">
    <div class="flex justify-end p-2 bg-white rounded">
      <Button type="button" class="font-bold" @click="mostrarDialogCadastrarProduto = true">
        <div>
          <Icon icon="ic:round-plus" width="24"/>
        </div>
        <span>Produto</span>
      </Button>
    </div>

    <div class="p-1 bg-white rounded">
      <DataTable :value="produtos" table-style="min-width: 50rem" show-gridlines striped-rows size="small">
        <template #empty> Nenhum lista de compras adicionadas.</template>
        <Column header="" class="w-0">
          <template #body="{ data }">
            <Button text class="!p-1" @click="toggleMenuOpcoes($event, data )">
              <Icon :icon="ICONES.MAIS_OPCOES" style="color: #000000" width=""/>
            </Button>
          </template>
        </Column>
        <Column field="nome" header="Nome"/>
        <Column field="tipoProduto.descricao" header="Tipo"/>
        <Column field="tipoProduto.descricao" header="Observação"/>
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
    <DialogCadastrarProduto v-model:visible="mostrarDialogCadastrarProduto" @cadastrado="produtoCadastrado"/>
    <DialogEditarProduto
        v-model:visible="mostrarDialogEditarProduto" :produto-id="produtoClicado?.id"
        @editado="produtoEditado"/>
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