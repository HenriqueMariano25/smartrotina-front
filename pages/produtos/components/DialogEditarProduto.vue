<script setup lang="ts">
import {ref} from 'vue'
import {Icon} from '@iconify/vue'
import {ICONES} from '~/constants/icones'
import DialogTiposProdutos from '~/pages/compras/listaProdutos/components/DialogTiposProdutos.vue'
import type {ITipoProduto} from '~/interfaces/compras/tipoProduto.interface'
import {buscarTipoProdutoPorUsuario} from '~/composable/compras/buscarTipoProdutoPorUsuario'
import type {IProduto} from '~/interfaces/produtos/produto.interface'
import type {IEditarProduto} from "~/interfaces/produtos/editarProduto.interface";
import {editarProduto} from "~/composable/produtos/editarProduto";
import {buscarUmProduto} from "~/composable/produtos/buscarUmProduto";

const props = defineProps({
  visible: Boolean,
  produtoId: {
    type: Number,
    default: null
  }
})

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
  (e: 'editado', produto: IProduto): void
}>()

const dados = reactive<{
  nome: string
  tipoProdutoId: number | null
  observacao: string
}>({
  nome: '',
  tipoProdutoId: null,
  observacao: '',
})
const camposObrigatorio = ['nome', 'tipoProdutoId']
const mostrarDialogTiposProdutos = ref<boolean>(false)
const tiposProdutos = ref<ITipoProduto[] | []>([])

onMounted(() => {
  handleBuscaTiposProdutos()
})

async function handleBuscaTiposProdutos() {
  tiposProdutos.value = await buscarTipoProdutoPorUsuario()
}

watch(() => props.visible, async (valor) => {
  if (valor && props.produtoId) {
    const produtoBuscado = await buscarUmProduto(props.produtoId)
    dados.nome = produtoBuscado.nome
    dados.tipoProdutoId = produtoBuscado.tipoProdutoId
    dados.observacao = produtoBuscado.observacao || ''
  }
})

const desabilitarBtn = computed(() => {
  return temCampoInvalido(dados, camposObrigatorio)
})

const handleEditar = async () => {

  if (props.produtoId) {
    const dadosPrEditar: IEditarProduto = {...limparDados(dados)}
    const itemEditado = await editarProduto(props.produtoId, dadosPrEditar)
    emit('editado', itemEditado)
  }
}

watch(() => props.visible, (valor) => {
  if (valor === true) {
    dados.nome = ''
    dados.tipoProdutoId = null
    dados.observacao = ''
  }
})

</script>

<template>
  <Dialog
      class="w-11/12 md:w-6/12 bg-gray-200" :visible="visible" modal header="Editar produto"
      @update:visible="(value) => emit('update:visible', value)">
    <div class="flex flex-col gap-4 pt-1.5">
      <FloatLabel variant="on">
        <InputText id="nome" v-model="dados.nome" class="w-full"/>
        <label for="nome" class="required">Nome</label>
      </FloatLabel>
      <div class="flex gap-4">
        <FloatLabel variant="on" class="w-full">
          <Select
              id="tipoProduto" v-model="dados.tipoProdutoId" :options="tiposProdutos" filter option-value="id"
              option-label="descricao"
              class="w-full"/>
          <label for="tipoProduto" class="required">Tipo de produto</label>
        </FloatLabel>
        <Button severity="primary" @click="mostrarDialogTiposProdutos = true">
          <Icon :icon="ICONES.EDITAR" width="24"/>
        </Button>
      </div>
      <FloatLabel variant="on" class="w-full">
        <Textarea id="observacao" v-model="dados.observacao" rows="3" class="w-full"/>
        <label for="observacao">Observação</label>
      </FloatLabel>

      <div class="flex justify-between">
        <Button text severity="secondary" @click="$emit('update:visible', false)">
          Cancelar
        </Button>
        <Button :disabled="desabilitarBtn" @click="handleEditar()">
          <div>
            <Icon icon="ic:baseline-save" width="32"/>
          </div>
          <span>Salvar</span>
        </Button>
      </div>
    </div>
    <DialogTiposProdutos
        v-model:visible="mostrarDialogTiposProdutos"
        @atualizar-tipos-produtos="handleBuscaTiposProdutos"/>
  </Dialog>
</template>

<style scoped>

</style>
