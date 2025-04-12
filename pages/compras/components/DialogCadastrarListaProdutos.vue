<script setup lang="ts">
import {Icon} from '@iconify/vue';
import {ref} from 'vue'
import {ICONES} from '~/constants/icones'
import type {IResidencia} from "~/interfaces/residencias/residencia.interface";
import {buscarResidenciaPorUsuario} from "~/composable/residencias/buscarResidenciaPorUsuario";
import {useAutenticacaoStore} from "~/stores/auth";
import type {ICadastrarListaProdutos} from "~/interfaces/compras/cadastrarListaProdutos.interface";
import type {IMorador} from "~/interfaces/residencias/morador.interface";
import {cadastrarListaProdutos} from "~/composable/compras/cadastrarListaProdutos";
import type {IListaProdutos} from "~/interfaces/compras/listaProdutos.interface";
import {buscarResponsaveisPorResidencia} from "~/composable/residencias/buscarResponsaveisPorResidencia";

const {usuario} = useAutenticacaoStore()

defineProps({
  visible: Boolean,
})
const emit = defineEmits<{
  (event: 'update:visible', value: boolean): void,
  (event: 'cadastrado', value: IListaProdutos): void,
}>()

const dados: ICadastrarListaProdutos = reactive({
  nome: "",
  residenciaId: null,
  responsavelId: null,
  observacao: null,
})

const responsaveis = ref<IMorador[] | []>([])

const residencias = ref<IResidencia[] | []>([])
if (usuario) {
  residencias.value = await buscarResidenciaPorUsuario(parseInt(usuario?.id))
}

watch(() => dados.residenciaId, async (valor) => {
  if (valor) {
    responsaveis.value = await buscarResponsaveisPorResidencia(valor)
  }
})

const handleCadastrarListaProdutos = async () => {
  try {
    const listaProdutosCadastrada = await cadastrarListaProdutos(dados)
    emit('cadastrado', listaProdutosCadastrada)
  } catch (err) {
    console.log(err)
  }
}

</script>

<template>
  <Dialog class="w-5/12 bg-gray-200 " :visible="visible" modal header="Cadastrar lista de compra"
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
        <Button class="" @click="handleCadastrarListaProdutos()" >
          <Icon :icon="ICONES.SALVAR" width="28"/>
          <span>Salvar</span>
        </Button>
      </div>
    </div>
  </Dialog>
</template>

<style scoped>

</style>