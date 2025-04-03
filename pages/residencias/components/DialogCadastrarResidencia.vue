<script setup lang="ts">
import {Icon} from "@iconify/vue";
import { cadastrarResidencia} from "~/composable/residencias/cadastrarResidencia";
import type {IResidencia} from "~/interfaces/residencias/residencia.interface";
import type {ICadastrarResidencia} from "~/interfaces/residencias/cadastrarResidencia.interface";

defineProps({
  visible: Boolean
})

const dados = ref<ICadastrarResidencia>({
  nome: '',
})
const mostrarErro = ref(false)
const mensagemErro = ref()

const emit = defineEmits<{
  (event: 'update:visible', value: boolean): void,
  (event: 'cadastrado', value: IResidencia): void
}>()


const cadastrar = async () => {
  try {
    const residenciaCadastrada = await cadastrarResidencia(dados.value)
    emit('cadastrado', residenciaCadastrada)
  }catch (err){
    mostrarErro.value = true
    mensagemErro.value = err
  }
}

</script>

<template>
  <Dialog
      class="w-5/12"
      :visible="visible"
      modal header="Cadastrar residência"
      @update:visible="$emit('update:visible', false)">
    <div class="flex flex-col gap-4 pt-1.5">
      <div class="flex flex-col gap-4">
        <FloatLabel variant="on">
          <InputText id="residencia" v-model="dados.nome" class="w-full"/>
          <label for="rotina">Nome da residência</label>
        </FloatLabel>
        <Message v-if="mostrarErro" severity="error" closable>{{ mensagemErro }}</Message>
      </div>
      <div class="flex justify-end">
        <Button @click="cadastrar()">
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