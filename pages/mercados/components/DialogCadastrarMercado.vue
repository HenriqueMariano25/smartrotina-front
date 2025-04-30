<script setup lang="ts">

import type {IProduto} from "~/interfaces/produtos/produto.interface";
import {Icon} from "@iconify/vue";
import {cadastrarMercado} from "~/composable/mercados/cadastrarMercado";

const props = defineProps({
  visible: Boolean,
})

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
  (e: 'cadastrado', produto: IProduto): void
}>()

const dados = reactive({
  nome: '',
  observacao: '',
})
const camposObrigatorio = ['nome']

watch(() => props.visible, (valor) => {
  if (valor === true) {
    dados.nome = ''
    dados.observacao = ''
  }
})

const desabilitarBtn = computed(() => {
  return temCampoInvalido(dados, camposObrigatorio)
})

async function handleCadastrar() {
  const dadosPrCadastrar = limparDados(dados)
  const itemCadastrado = await cadastrarMercado(dadosPrCadastrar)
  emit('cadastrado', itemCadastrado)
}

</script>

<template>
  <Dialog
      class="w-6/12 bg-gray-200" :visible="visible" modal header="Cadastrar mercado"
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
        <Button :disabled="desabilitarBtn" @click="handleCadastrar()">
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