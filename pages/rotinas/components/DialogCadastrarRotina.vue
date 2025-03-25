<script setup lang="ts">
import {ref} from 'vue'
import {Icon} from "@iconify/vue";

defineProps({
  visible: Boolean
})
defineEmits(['update:visible'])

const moradores = ref([
  {id: 1, nome: "Henrique Mariano"},
  {id: 2, nome: "Maria Eduarda"},
])

const dados = ref({
  repeticao: 'diária'
})
const opcoes = ref(['diária', 'semanal', 'mensal', 'anual']);

</script>

<template>
  <Dialog class="w-5/12" :visible="visible" modal header="Cadastrar rotina" @update:visible="$emit('update:visible')">
    <div class="flex flex-col gap-4 pt-1">
      <FloatLabel variant="on">
        <InputText id="rotina" class="w-full"/>
        <label for="rotina">Nome da rotina</label>
      </FloatLabel>
      <FloatLabel variant="on">
        <Select :options="moradores" name="moradores" filter option-label="nome" class="w-full"/>
        <label for="moradores">Responsável</label>
      </FloatLabel>
      <FloatLabel variant="on">
        <DatePicker show-icon fluid name="dataInicio"/>
        <label for="dataInicio">Data de início</label>
      </FloatLabel>
      <div class="flex flex-col">
        <span class="pl-1 font-bold">Repetição</span>
        <SelectButton v-model="dados.repeticao" :options="opcoes" aria-labelledby="custom" size="large" />
      </div>
    </div>
    <div class="flex justify-end">
      <Button>
        <div>
          <Icon icon="ic:baseline-save" width="32"/>
        </div>
        <span>Salvar</span>
      </Button>
    </div>
  </Dialog>
</template>

<style scoped>

</style>