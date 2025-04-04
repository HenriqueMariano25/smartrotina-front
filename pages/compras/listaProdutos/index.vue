<script setup lang="ts">
import {Icon} from "@iconify/vue";
import {DataView} from "primevue";
import {ref} from "vue";
import DialogCadastrarProduto from "~/pages/compras/listaProdutos/components/DialogCadastrarProduto.vue";

const produtos = ref([
  {produtoId: 1, nome: 'Açúcar', quantidade: 1, unidade: 'kg'},
  {produtoId: 2, nome: 'Arroz', quantidade: 3, unidade: 'un'},
])

const mostrarDialogCadastrarProduto = ref(false)
</script>

<template>
  <div class="flex flex-col w-full gap-4 h-full">
    <div class="flex justify-end p-2 bg-white rounded">
      <Button type="button" class="font-bold" @click="mostrarDialogCadastrarProduto = true">
        <div>
          <Icon icon="ic:round-plus" width="24"/>
        </div>
        <span>Produto</span>
      </Button>
<!--      <DialogCadastrarLista v-model:visible="mostrarModal"/>-->
    </div>
    <div class="p-1 bg-white rounded">
      <DataView :value="produtos">
        <template #list="slotProps">
          <div class="flex flex-col">
            <div v-for="(item, index) in slotProps.items" :key="index">
              <div class="flex items-center gap-4 px-4" :class="{'border-t border-gray-300': index !== 0}">
                <Checkbox inputId="size_large" name="size" value="Large" size="large" />
                <div class="flex flex-col p-2">
                  <span class="font-bold">{{ item.nome }}</span>
                  <span>Quantidade: {{ item.quantidade }} {{ item.unidade }}</span>
                </div>
              </div>
            </div>
          </div>
        </template>
      </DataView>
    </div>
    <DialogCadastrarProduto v-model:visible="mostrarDialogCadastrarProduto"/>
  </div>
</template>

<style scoped>

</style>