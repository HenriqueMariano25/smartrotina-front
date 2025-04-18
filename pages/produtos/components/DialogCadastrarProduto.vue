<script setup lang="ts">
import {ref} from 'vue'
import {Icon} from '@iconify/vue'
import {ICONES} from '~/constants/icones'
import DialogTiposProdutos from '~/pages/compras/listaProdutos/components/DialogTiposProdutos.vue'
import type {ITipoProduto} from '~/interfaces/compras/tipoProduto.interface'
import {buscarTipoProdutoPorUsuario} from '~/composable/compras/buscarTipoProdutoPorUsuario'
import {cadastrarProduto} from '~/composable/produtos/cadastrarProduto'
import type {ICadastrarProduto} from '~/interfaces/produtos/cadastrarProduto.interface'
import type {IProduto} from '~/interfaces/produtos/produto.interface'

const props = defineProps({
  visible: Boolean,
})

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
  (e: 'cadastrado', produto: IProduto): void
}>()

const dados = reactive({
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

const desabilitarBtn = computed(() => {
  return temCampoInvalido(dados, camposObrigatorio)
})

const handleCadastrar = async () => {
  const dadosPrCadastrar: ICadastrarProduto = limparDados(dados)
  const itemCadastrado = await cadastrarProduto(dadosPrCadastrar)
  emit('cadastrado', itemCadastrado)
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
      class="w-6/12 bg-gray-200" :visible="visible" modal header="Cadastrar produto"
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
        <Button :disabled="desabilitarBtn" @click="handleCadastrar()">
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
