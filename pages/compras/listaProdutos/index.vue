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

const nomeListaProdutos = useState('nomeListaProdutos')
const tituloPagina = useTituloPagina()
tituloPagina.value = `Produtos da lista: ${nomeListaProdutos.value}`

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

const produtosSelecionados = ref([])

</script>

<template>
  <div class="flex flex-col w-full gap-4 h-full relative">
    <div class="flex justify-end p-2 bg-white rounded">
      <Button type="button" class="font-bold" @click="mostrarDialogCadastrarProduto = true">
        <div>
          <Icon icon="ic:round-plus" width="24"/>
        </div>
        <span>Produto</span>
      </Button>
    </div>
    <div class="p-1 bg-white rounded">
      <div class="bg-primaria-200 rounded px-2 py-1 text-lg font-medium flex gap-2 items-center">
        <Icon icon="ic:round-checklist" width=""/>
        <span>Produtos pendentes</span>
        <span class="ml-auto">Total: {{ produtos.length - produtosSelecionados.length  }}</span>
      </div>
      <DataView :value="produtos">
        <template #empty>
          Nenhum produto adicionado.
        </template>
        <template #list="slotProps">
          <div class="flex flex-col">
            <div v-for="(item, index) in slotProps.items" :key="index">
              <div v-if="!produtosSelecionados.some(produto => produto.id === item.id)"
                   class="flex items-center gap-4 px-4" :class="{'border-t border-gray-300': index !== 0}">
                <!--                <Checkbox inputId="size_large" name="size" :value="item.id" size="large" @change="selecionarProduto(item.id)"/>-->
                <Checkbox v-model="produtosSelecionados" name="size" :value="item" size="large"/>
                <div class="flex flex-col p-2">
                  <span class="font-bold">{{ item.nome }}</span>
                  <div>
                    <span>Quantidade: {{ item.quantidade }} {{ item.unidade }}</span>
                    <span v-if="item.observacao" class="text-sm"> - Obs: {{ item.observacao }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </DataView>
    </div>
    <div class="p-1 bg-white rounded">
      <div class="bg-primaria-200 rounded px-2 py-1 text-lg font-medium flex gap-2 items-center">
        <Icon icon="ic:round-shopping-cart" width="28"/>
        <span>Carrinho de compras</span>
        <span class="ml-auto">Total: {{ produtosSelecionados.length }}</span>
      </div>
      <DataView :value="produtosSelecionados">
        <template #empty>
          Nenhum produto selecionado.
        </template>
        <template #list="slotProps">
          <div class="flex flex-col">
            <div v-for="(item, index) in slotProps.items" :key="index">
              <div class="flex items-center gap-4 px-4 bg-gray-100 text-gray-500"
                   :class="{'border-t border-gray-300': index !== 0}">
                <Checkbox v-model="produtosSelecionados" :value="item" name="size" size="large"/>
                <div class="flex flex-col p-2">
                  <span class="font-bold line-through">{{ item.nome }}</span>
                  <div>
                    <span>Quantidade: {{ item.quantidade }} {{ item.unidade }}</span>
                    <span v-if="item.observacao" class="text-sm"> - Obs: {{ item.observacao }}</span>
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