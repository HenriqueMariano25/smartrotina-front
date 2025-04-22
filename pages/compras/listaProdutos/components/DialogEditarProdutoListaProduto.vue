<script setup lang="ts">
import {ref} from 'vue'
import {Icon} from "@iconify/vue";
import {ICONES} from "~/constants/icones";
import DialogTiposProdutos from "~/pages/compras/listaProdutos/components/DialogTiposProdutos.vue";
import type {ITipoProduto} from "~/interfaces/compras/tipoProduto.interface";
import {buscarTipoProdutoPorUsuario} from "~/composable/compras/buscarTipoProdutoPorUsuario";
import type {IProduto} from "~/interfaces/produtos/produto.interface";
import {buscarUmProdutoListaProdutos} from "~/composable/compras/listaProdutos/buscarUmProdutoListaProdutos";
import type {
  IEditarProduto,
  IEditarProdutoLista
} from "~/interfaces/compras/listaProdutos/editarProdutoLista.interface";
import {editarProdutoLista} from "~/composable/compras/listaProdutos/editarProdutoLista";

const props = defineProps({
  visible: Boolean,
  listaProdutoId: Number,
  produtoId: Number
})
// const emits = defineEmits(['update:visible'])
const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
  (e: 'editado', produto: IProduto): void
}>()

const tiposUnidade = ref([
  {nome: 'unidade', abreviacao: 'UN'},
  {nome: 'mililitro', abreviacao: 'ML'},
  {nome: 'litro', abreviacao: 'L'},
  {nome: 'grama', abreviacao: 'G'},
  {nome: 'quilo', abreviacao: 'KG'},
  {nome: 'pacote', abreviacao: 'PC'},
])
const dados = reactive({
  produtoListaProdutoId: null,
  nome: '',
  tipoProdutoId: null,
  quantidade: 1,
  unidade: 'unidade',
  observacao: '',
  valor: 0
})
const camposObrigatorio = ['nome', 'tipoProdutoId', 'quantidade', 'tipoUnidade']
const mostrarDialogTiposProdutos = ref<boolean>(false)
const tiposProdutos = ref<ITipoProduto[] | []>([])

onBeforeMount(async () => {
  await handleBuscaTiposProdutos()
})

async function handleBuscaTiposProdutos() {
  tiposProdutos.value = await buscarTipoProdutoPorUsuario()
}

const desabilitarBtn = computed(() => {
  return temCampoInvalido(dados, camposObrigatorio)
})

const produtoId = ref<number | null>(null)
watch(() => props.visible, async (valor) => {
  if (valor && props.produtoId) {
    const produtoBuscado = await buscarUmProdutoListaProdutos(props.produtoId)
    dados.produtoListaProdutoId = produtoBuscado.id
    dados.nome = produtoBuscado.produto?.nome
    dados.quantidade = produtoBuscado.quantidade
    dados.tipoProdutoId = produtoBuscado.produto?.tipoProdutoId
    dados.valor = produtoBuscado.valor || 0
    dados.observacao = produtoBuscado.produto?.observacao
    dados.unidade = produtoBuscado.unidade

    produtoId.value = produtoBuscado.produtoId
  }
})

const handleEditar = async () => {
  if (produtoId.value && props.listaProdutoId) {
    const dadosPrEditar: IEditarProdutoLista = limparDados(dados)
    const itemEditado = await editarProdutoLista(props?.listaProdutoId, produtoId.value, dadosPrEditar)
    emit('editado', itemEditado)
  }
}

</script>

<template>
  <Dialog
      class="w-6/12 bg-gray-200 " :visible="visible" modal header="Editar produto"
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
      <div class="flex gap-4 w-full">
        <FloatLabel variant="on">
          <InputNumber
              id="quantidade" v-model="dados.quantidade" class="w-full" :min="1" show-buttons
              :max-fraction-digits="2"/>
          <label for="quantidade" class="required">Quantidade</label>
        </FloatLabel>
        <FloatLabel variant="on" class="w-full">
          <Select
              id="tipoUnidade" v-model="dados.unidade" :options="tiposUnidade" option-value="nome"
              option-label="nome"
              class="w-full"/>
          <label for="tipoUnidade" class="required">Tipo de unidade</label>
        </FloatLabel>
        <FloatLabel variant="on">
          <InputNumber
              id="valor" v-model="dados.valor" class="w-full" show-buttons mode="currency" currency="BRL"
              locale="pt-BR"
              :max-fraction-digits="2"/>
          <label for="valor">Valor</label>
        </FloatLabel>
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
  </Dialog>
  <DialogTiposProdutos
      v-model:visible="mostrarDialogTiposProdutos"
      @atualizar-tipos-produtos="handleBuscaTiposProdutos"/>
</template>

<style scoped>

</style>