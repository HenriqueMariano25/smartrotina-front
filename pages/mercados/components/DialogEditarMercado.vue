<script setup lang="ts">
import {Icon} from "@iconify/vue";
import type {IProduto} from "~/interfaces/produtos/produto.interface";
import {buscarUmProduto} from "~/composable/produtos/buscarUmProduto";
import {editarMercado} from "~/composable/mercados/editarMercado";

const props = defineProps({
  visible: Boolean,
  mercado: {
    type: Object,
    default: null
  }
})

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
  (e: 'editado', produto: IProduto): void
}>()


const dados = reactive({
  nome: '',
  observacao: '',
})

const camposObrigatorio = ['nome']

watch(() => props.visible, async (valor) => {
  if (valor && props.mercado) {
    dados.nome = props.mercado.nome
    dados.observacao = props.mercado?.observacao || ''
  }
})

const desabilitarBtn = computed(() => {
  return temCampoInvalido(dados, camposObrigatorio)
})

async function handleEditar() {
  if (props.mercado.id) {
    const dadosParaEditar = limparDados(dados)
    const mercadoEditado = await editarMercado(props.mercado.id, dadosParaEditar)
    emit('editado', mercadoEditado)
  }
}

</script>

<template>
  <Dialog
      class="w-6/12 bg-gray-200" :visible="visible" modal header="Editar mercado"
      @update:visible="(value) => emit('update:visible', value)">
    <div class="flex flex-col gap-4 pt-1.5">
      <FloatLabel variant="on">
        <InputText id="nome" v-model="dados.nome" class="w-full"/>
        <label for="nome" class="required">Nome</label>
      </FloatLabel>
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
</template>

<style scoped>

</style>