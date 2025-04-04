<script setup lang="ts">
import {ref} from 'vue'
import {Icon} from "@iconify/vue";

defineProps({
  visible: Boolean,
})
defineEmits(['update:visible'])

const tiposUnidade = ref([
  { nome: 'unidade', abreviacao: 'UN' },
  { nome: 'mililitro', abreviacao: 'ML' },
  { nome: 'litro', abreviacao: 'L' },
  { nome: 'grama', abreviacao: 'G' },
  { nome: 'quilo', abreviacao: 'KG' },
  { nome: 'pacote', abreviacao: 'PC' },
])

</script>

<template>
  <Dialog class="w-5/12 bg-gray-200 " :visible="visible" modal header="Cadastrar produto"
          @update:visible="$emit('update:visible')">
    <div class="flex flex-col gap-4 pt-1.5">
      <FloatLabel variant="on">
        <InputText id="nomeLista" class="w-full"/>
        <label for="nomeLista" class="required">Nome</label>
      </FloatLabel>
      <div class="flex gap-4 w-full">
        <FloatLabel variant="on">
          <InputText id="quantidade" class="w-full" type="number"/>
          <label for="quantidade" class="required">Quantidade</label>
        </FloatLabel>
        <FloatLabel variant="on" class="w-full">
          <Select id="tipoUnidade" :options="tiposUnidade" filter option-label="nome"
                  class="w-full"/>
          <label for="tipoUnidade" class="required">Tipo de unidade</label>
        </FloatLabel>
      </div>
      <FloatLabel variant="on" class="w-full">
        <Textarea id="observacao" rows="3" class="w-full" />
        <label for="observacao">Observação</label>
      </FloatLabel>

      <div class="flex justify-end">
        <Button>
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