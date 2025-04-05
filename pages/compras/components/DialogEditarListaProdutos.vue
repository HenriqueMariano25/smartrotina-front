<script setup lang="ts">

import {ICONES} from "~/constants/icones";
import {Icon} from "@iconify/vue";
import type {ICadastrarListaProdutos} from "~/interfaces/compras/cadastrarListaProdutos.interface";
import type {IListaProdutos} from "~/interfaces/compras/listaProdutos.interface";
import {ref} from "vue";
import type {IMorador} from "~/interfaces/residencias/morador.interface";
import type {IResidencia} from "~/interfaces/residencias/residencia.interface";
import {buscarResidenciaPorUsuario} from "~/composable/residencias/buscarResidenciaPorUsuario";
import {buscarMoradoresPorResidencia} from "~/composable/residencias/buscarMoradoresPorResidencia";
import {useAutenticacaoStore} from "~/stores/auth";
import {buscarListaProdutos} from "~/composable/compras/buscarListaProdutos";
import {buscarResponsaveisPorResidencia} from "~/composable/residencias/buscarResponsaveisPorResidencia";
import {cadastrarListaProdutos} from "~/composable/compras/cadastrarListaProdutos";
import {editarListaProdutos} from "~/composable/compras/editarListaProdutos";
import type {IEditarListaProdutos} from "~/interfaces/compras/editarListaProdutos.interface";

const props = defineProps({
  visible: Boolean,
  listaProdutosId: Number
})
const emit = defineEmits<{
  (event: 'update:visible', value: boolean): void,
  (event: 'editado', value: IListaProdutos): void,
}>()

const {usuario} = useAutenticacaoStore()
const responsaveis = ref<IMorador[] | []>([])
const residencias = ref<IResidencia[] | []>([])
const buscouDados = ref(false)
const dados: IEditarListaProdutos = reactive({
  nome: "",
  residenciaId: null,
  responsavelId: null,
  observacao: null,
})


if (usuario) {
  residencias.value = await buscarResidenciaPorUsuario(parseInt(usuario?.id))
}

watch(() => dados.residenciaId, async (valor) => {
  if (valor && buscouDados.value === true) {
    responsaveis.value = await buscarResponsaveisPorResidencia(valor)
  }
})

watch(() => props.visible, async (valor) => {
  if (valor === true && props.listaProdutosId) {
    const listaProdutosEncontrada = await buscarListaProdutos(props.listaProdutosId)
    if (listaProdutosEncontrada) {
      dados.nome = listaProdutosEncontrada.nome
      dados.residenciaId = listaProdutosEncontrada.residenciaId
      dados.responsavelId = listaProdutosEncontrada.responsavelId
      dados.observacao = listaProdutosEncontrada.observacao
    }
    buscouDados.value = true
  }
})

const handleEditarListaProdutos = async () => {
  if (props.listaProdutosId) {
    try {
      const listaProdutosEditada = await editarListaProdutos(props.listaProdutosId, dados)
      emit('editado', listaProdutosEditada)
    } catch (err) {
      console.log(err)
    }
  }
}

</script>

<template>
  <Dialog class="w-5/12 bg-gray-200 " :visible="props.visible" modal header="Editar lista de compra"
          @update:visible="$emit('update:visible')">
    <div class="flex flex-col gap-4 pt-1.5">
      <FloatLabel variant="on">
        <InputText v-model="dados.nome" id="nomeLista" class="w-full"/>
        <label for="nomeLista" class="required">Nome da lista</label>
      </FloatLabel>
      <FloatLabel variant="on">
        <Select v-model="dados.residenciaId" :options="residencias" filter option-label="nome" option-value="id"
                class="w-full"/>
        <label for="on_label">Residencia</label>
      </FloatLabel>
      <FloatLabel variant="on">
        <Select v-model="dados.responsavelId" :options="responsaveis" filter option-label="nome"
                :disabled="!dados.residenciaId" option-value="usuarioId"
                class="w-full"/>
        <label for="on_label">Responsável</label>
      </FloatLabel>
      <FloatLabel variant="on" class="w-full">
        <Textarea v-model="dados.observacao" id="observacao" rows="3" class="w-full"/>
        <label for="observacao">Observação</label>
      </FloatLabel>
      <div class="flex justify-end">
        <Button class="" @click="handleEditarListaProdutos()">
          <Icon :icon="ICONES.SALVAR" width="28"/>
          <span>Salvar</span>
        </Button>
      </div>
    </div>
  </Dialog>
</template>

<style scoped>

</style>