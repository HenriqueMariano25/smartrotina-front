<script setup lang="ts">

import {Icon} from "@iconify/vue";
import {editarMorador} from "~/composable/residencias/editarMorador";
import type {IEditarMorador} from "~/interfaces/residencias/editarMorador.interface";
import type {IMorador} from "~/interfaces/residencias/morador.interface";

const props = defineProps({
  visible: Boolean,
  morador: {
    type: Object,
    default: null
  }
})
const emit = defineEmits<{
  (event: 'update:visible', value: boolean): void,
  (event: 'editado', value: IMorador): void,
}>()

const maxDate = ref(new Date());
const dados = ref<IEditarMorador>({
  nome: "",
  dataNascimento: "",
})

watch(() => props.visible, (valor) => {
  if (valor === true && props.morador?.id) {
    dados.value.nome = props.morador.nome
    dados.value.dataNascimento = props.morador.dataNascimento
  }
})

const editar = async () => {
  try {
    const moradorEditado = await editarMorador(props.morador.id, limparDados(dados.value))
    emit('editado', moradorEditado)
  } catch (err) {
    console.log(err)
  }
}
</script>

<template>
  <Dialog
      class="w-11/12 md:w-6/12"
      :visible="visible"
      modal header="Editar morador"
      @update:visible="$emit('update:visible', false)">
    <div class="flex flex-col gap-4 pt-1.5">
      <div class="flex flex-col gap-4">
        <FloatLabel variant="on">
          <InputText id="residencia" v-model="dados.nome" class="w-full"/>
          <label for="residencia">Nome</label>
        </FloatLabel>
        <FloatLabel variant="on">
          <DatePicker
v-model="dados.dataNascimento" show-icon :max-date="maxDate" fluid date-format="dd/mm/yy"
                      icon-display="input" input-id="residencia">
            <template #inputicon="">
              <Icon icon="ic:baseline-calendar-month" width="20"/>
            </template>
          </DatePicker>
          <label for="residencia">Data de nascimento</label>
        </FloatLabel>
      </div>
      <div class="flex justify-end">
        <Button @click="editar()">
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