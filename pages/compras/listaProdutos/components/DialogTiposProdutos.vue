<script setup lang="ts">
import {ref} from 'vue'
import {buscarTipoProdutoPorUsuario} from "~/composable/compras/buscarTipoProdutoPorUsuario";
import type {ITipoProduto} from "~/interfaces/compras/tipoProduto.interface";
import {ICONES} from "~/constants/icones";
import {Icon} from "@iconify/vue";
import type {IListaProdutos} from "~/interfaces/compras/listaProdutos.interface";
import {cadastrarTipoProduto} from "~/composable/compras/cadastrarTipoProduto";
import type {ICadastrarTipoProduto} from "~/interfaces/compras/cadastrarTipoProduto";
import {useToast} from "primevue/usetoast";
import {editarTipoProduto} from "~/composable/compras/editarTipoProduto";
import {deletarTipoProduto} from "~/composable/compras/deletarTipoProduto";

defineProps({
  visible: Boolean,
})
const emits = defineEmits(['update:visible',  'atualizarTiposProdutos'])

const toast = useToast();
const confirm = useConfirm();
const handleConfimarDeletar = () => {
  confirm.require({
    message: 'Tem certeza que deseja deletar esse tipo de produto?',
    header: 'Deletar tipo de produto',
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
      handleDeletar()
    },
  });
};

const tiposProdutos = ref<ITipoProduto[] | []>([])
tiposProdutos.value = await buscarTipoProdutoPorUsuario()

const itemClicado = ref<ITipoProduto | null>(null)
const estaEditando = ref(false)

const menuOpcoes = ref()
const opcoesItemTabela = ref([
  {
    label: 'Editar',
    icon: ICONES.EDITAR,
    command: () => {
      editando()
    }
  },
  {
    label: 'Deletar',
    icon: ICONES.DELETAR,
    command: () => {
      handleConfimarDeletar()
    }
  },
])

const toggleMenuOpcoesMorador = (event: Event, item: ITipoProduto) => {
  event.stopPropagation()
  menuOpcoes.value?.toggle(event);
  if (menuOpcoes.value.overlayVisible === true) {
    itemClicado.value = item
  }
};

const dados: ICadastrarTipoProduto = reactive({
  descricao: ''
})

const cadastrar = async () => {
  const dadosParaCadastrar = limparDados(dados)
  const tipoProdutoCadastrado = await cadastrarTipoProduto(dadosParaCadastrar)
  tiposProdutos.value.push(tipoProdutoCadastrado)

  toast.add({
    severity: 'success',
    summary: 'Sucesso no cadastro',
    detail: 'Tipo de produto cadatrado com sucesso',
    life: 4000
  });
  dados.descricao = ''
  emits('atualizarTiposProdutos')
}

const editar = async () => {
  if (itemClicado.value?.id) {
    const tipoProdutoEditado = await editarTipoProduto(itemClicado.value?.id, dados)
    const itemEditadoIndex = tiposProdutos.value.findIndex(item => item.id === itemClicado.value?.id)
    if (itemEditadoIndex > -1) {
      tiposProdutos.value[itemEditadoIndex].descricao = tipoProdutoEditado.descricao
    }

    toast.add({
      severity: 'success',
      summary: 'Sucesso na edição',
      detail: 'Tipo de produto editado com sucesso',
      life: 4000
    });
    dados.descricao = ''
    estaEditando.value = false
    emits('atualizarTiposProdutos')
  }

}

const editando = async () => {
  estaEditando.value = true
  dados.descricao = itemClicado.value?.descricao || ''
}

const cancelar = async () => {
  estaEditando.value = false
  dados.descricao = ''
  itemClicado.value = null
}

const desabilitar = computed(() => {
  return temCampoInvalido(dados)
})

const handleDeletar = async () => {
  if (itemClicado.value?.id) {
    const itemDeletado = await deletarTipoProduto(itemClicado.value?.id)
    if (itemDeletado) {
      const indexItem = tiposProdutos.value.findIndex(item => item.id === itemDeletado.id)
      if (indexItem > -1) {
        tiposProdutos.value.splice(indexItem, 1)
      }

      toast.add({
        severity: 'success',
        summary: 'Sucesso ao deletar',
        detail: 'Tipo de produto deletado com sucesso',
        life: 4000
      });
      itemClicado.value = null
      emits('atualizarTiposProdutos')
    }
  }

}

</script>

<template>
  <Dialog class="w-6/12 bg-gray-200 " :visible="visible" modal header="Tipos de produtos"
          @update:visible="$emit('update:visible')">
    <div class="flex flex-col gap-4 pt-1.5">
      <div class="flex gap-4 items-center">
        <FloatLabel variant="on" class="w-full">
          <InputText v-model="dados.descricao" id="descricao" class="w-full"/>
          <label for="descricao" class="required">Descrição</label>
        </FloatLabel>
        <Button severity="primary" @click="cadastrar" v-if="!estaEditando" :disabled="desabilitar">
          <Icon :icon="ICONES.ADICIONAR" width="24"/>
        </Button>
        <Button v-if="estaEditando" severity="primary" @click="editar" :disabled="desabilitar">
          <Icon :icon="ICONES.SALVAR" width="24"/>
        </Button>
        <Button v-if="estaEditando" severity="secondary" @click="cancelar">
          <Icon :icon="ICONES.CANCELAR" width="24"/>
        </Button>
      </div>
      <DataTable :value="tiposProdutos" table-style="min-width: 50rem" show-gridlines striped-rows size="small">
        <template #empty> Nenhum lista de compras adicionadas.</template>
        <Column header="" class="w-0">
          <template #body="{ data }">
            <Button text class="!p-1" @click="toggleMenuOpcoesMorador($event, data )">
              <Icon :icon="ICONES.MAIS_OPCOES" style="color: #000000" width=""/>
            </Button>
          </template>
        </Column>
        <Column header="Descrição" class="" field="descricao"></Column>
      </DataTable>
    </div>
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
    <Toast/>
    <ConfirmDialog>
      <template #icon>

      </template>
      <template #message="slotProps">
        <div class="flex flex-col items-center w-full gap-4">
          <div class="flex gap-4 items-center">
            <Icon :icon="ICONES.PERIGO" width="32"/>
            <h3 class="text-xl">{{ slotProps.message.message }}</h3>
          </div>
          <span>Todos os produtos que tiver esse 'tipo de produto' será atualizado para 'sem tipo de produto'</span>
        </div>
      </template>
    </ConfirmDialog>
  </Dialog>
</template>

<style scoped>

</style>