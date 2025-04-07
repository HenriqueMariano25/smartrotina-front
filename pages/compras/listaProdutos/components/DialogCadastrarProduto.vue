<script setup lang="ts">
import {ref} from 'vue'
import {Icon} from "@iconify/vue";
import {ICONES} from "~/constants/icones";
import DialogTiposProdutos from "~/pages/compras/listaProdutos/components/DialogTiposProdutos.vue";

defineProps({
  visible: Boolean,
})
defineEmits(['update:visible'])

const tiposUnidade = ref([
  {nome: 'unidade', abreviacao: 'UN'},
  {nome: 'mililitro', abreviacao: 'ML'},
  {nome: 'litro', abreviacao: 'L'},
  {nome: 'grama', abreviacao: 'G'},
  {nome: 'quilo', abreviacao: 'KG'},
  {nome: 'pacote', abreviacao: 'PC'},
])

const mostrarDialogTiposProdutos = ref<boolean>(false)

</script>

<template>
  <Dialog class="w-6/12 bg-gray-200 " :visible="visible" modal header="Cadastrar produto"
          @update:visible="$emit('update:visible')">
    <div class="flex flex-col gap-4 pt-1.5">
      <FloatLabel variant="on">
        <InputText id="nomeLista" class="w-full"/>
        <label for="nomeLista" class="required">Nome</label>
      </FloatLabel>
      <div class="flex gap-4">
        <FloatLabel variant="on" class="w-full">
          <Select id="tipoProduto" :options="tiposUnidade" filter option-label="nome"
                  class="w-full"/>
          <label for="tipoProduto" class="required">Tipo de produto</label>
        </FloatLabel>
        <Button severity="primary" @click="mostrarDialogTiposProdutos = true">
          <Icon :icon="ICONES.EDITAR" width="24"/>
        </Button>
      </div>
      <div class="flex gap-4 w-full">
        <FloatLabel variant="on">
          <InputText id="quantidade" class="w-full" type="number"/>
          <label for="quantidade" class="required">Quantidade</label>
        </FloatLabel>
        <FloatLabel variant="on" class="w-full">
          <Select id="tipoUnidade" :options="tiposUnidade" option-label="nome"
                  class="w-full"/>
          <label for="tipoUnidade" class="required">Tipo de unidade</label>
        </FloatLabel>
      </div>
      <FloatLabel variant="on" class="w-full">
        <Textarea id="observacao" rows="3" class="w-full"/>
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
  <DialogTiposProdutos v-model:visible="mostrarDialogTiposProdutos"/>
</template>

<style scoped>

</style>