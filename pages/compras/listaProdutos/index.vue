<script setup lang="ts">
import {Icon} from "@iconify/vue";
import {DataView} from "primevue";
import {ref} from "vue";
import DialogCadastrarProduto from "~/pages/compras/listaProdutos/components/DialogCadastrarProduto.vue";
import type {IProduto} from "~/interfaces/compras/produto.interface";
import {buscarProdutosPorListaProdutos} from "~/composable/compras/buscarProdutosPorListaProdutos";

const listaProdutosId = useState<number>("listaProdutosId");

const produtos = ref<IProduto[] | []>([])
onMounted(() => {
  handleBuscarProdutos()
})

async function handleBuscarProdutos() {
  if (listaProdutosId.value) {
    produtos.value = await buscarProdutosPorListaProdutos(listaProdutosId?.value)
  }
}

const mostrarDialogCadastrarProduto = ref(false)

const itemCadastrado = (item: IProduto) => {
  produtos.value.push(item)
  mostrarDialogCadastrarProduto.value = false
}
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
    </div>
    <div class="p-1 bg-white rounded">
      <DataView :value="produtos">
        <template #empty>
          Nenhum produto adicionado.
        </template>
        <template #list="slotProps">
          <div class="flex flex-col">
            <div v-for="(item, index) in slotProps.items" :key="index">
              <div class="flex items-center gap-4 px-4" :class="{'border-t border-gray-300': index !== 0}">
                <Checkbox inputId="size_large" name="size" value="Large" size="large"/>
                <div class="flex flex-col p-2">
                  <span class="font-bold">{{ item.nome }}</span>
                  <div>
                    <span>Quantidade: {{ item.quantidade }} {{ item.unidade }}</span>
                    <span v-if="item.observacao" class="text-sm"> - Obs: {{ item.observacao}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </DataView>
    </div>
    <DialogCadastrarProduto v-model:visible="mostrarDialogCadastrarProduto" @cadastrado="itemCadastrado"
                            :lista-produtos-id="listaProdutosId"/>
  </div>
</template>

<style scoped>

</style>