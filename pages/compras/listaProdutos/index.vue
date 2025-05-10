<script setup lang="ts">
import {Icon} from "@iconify/vue";
import {DataView} from "primevue";
import {ref} from "vue";
import DialogAdicionarProdutoListaProduto
  from "~/pages/compras/listaProdutos/components/DialogAdicionarProdutoListaProduto.vue";
import type {IProduto} from "~/interfaces/produtos/produto.interface";
import {buscarProdutosPorListaProdutos} from "~/composable/compras/buscarProdutosPorListaProdutos";
import {ICONES} from "~/constants/icones";
import DialogEditarProdutoListaProduto
  from "~/pages/compras/listaProdutos/components/DialogEditarProdutoListaProduto.vue";
import {useToast} from "primevue/usetoast";
import {editarValorProduto} from "~/composable/compras/editarValorProduto";
import BarraCarrinhoCompra from "~/pages/compras/components/BarraCarrinhoCompra.vue";
import type {IProdutoListaProduto} from "~/interfaces/compras/listaProdutos/produtoListaProduto";
import {editarStatusProdutoListaProdutos} from "~/composable/compras/listaProdutos/editarStatusProdutoListaProdutos";

const toast = useToast();
const listaProdutosId = useState<number>("listaProdutosId");
const produtos = ref<IProdutoListaProduto[]>([])
const produtosSelecionados = ref<IProdutoListaProduto[]>([])
const produtosComprados = ref(<IProdutoListaProduto[]>([]))

onMounted(() => {
  handleBuscarProdutos()
})

const nomeListaProdutos = useState('nomeListaProdutos')
const dadosPagina = useDadosPagina();
dadosPagina.value.titulo = `Produtos da lista: ${nomeListaProdutos.value}`
dadosPagina.value.icone = 'ic:round-checklist'

async function handleBuscarProdutos() {
  if (listaProdutosId.value) {
    const todosProdutos = await buscarProdutosPorListaProdutos(listaProdutosId?.value)
    produtos.value = todosProdutos.filter(item => item.compraId === null)
    produtosSelecionados.value = todosProdutos.filter(item => item.statusProdutoListaId === 2)
    produtosComprados.value = todosProdutos.filter(item => item.compraId !== null)
  }
}

const mostrarDialogCadastrarProduto = ref(false)
const mostrarDialogEditarProduto = ref(false)

const itemCadastrado = (item: IProduto) => {
  produtos.value.push(item)
  mostrarDialogCadastrarProduto.value = false

  toast.add({
    severity: 'success',
    summary: 'Sucesso no cadastro',
    detail: 'Produto cadastrado com sucesso',
    life: 4000
  });
}

const itemEditado = (item: IProduto) => {
  const index = produtos.value.findIndex(produto => produto.id === item.id)
  if (index !== -1) {
    produtos.value[index] = item
  }
  mostrarDialogEditarProduto.value = false
  toast.add({
    severity: 'success',
    summary: 'Sucesso na edição',
    detail: 'Produto editado com sucesso',
    life: 4000
  });
}


const produtoSelecionadoId = ref<number | undefined>(undefined)

const editandoProduto = (id: number) => {
  produtoSelecionadoId.value = id;
  mostrarDialogEditarProduto.value = true
}

const produtoEditandoValor = ref<IProduto | null>(null)
const novoValorProduto = ref<number>(0)
const editandoValorProduto = (item: IProduto) => {
  produtoEditandoValor.value = item
  novoValorProduto.value = item.valor || 0
}

const handleEditarValorProduto = async () => {
  if (produtoEditandoValor?.value?.id) {
    await editarValorProduto(produtoEditandoValor?.value?.id, novoValorProduto.value)

    const index = produtos.value.findIndex(produto => produto.id === produtoEditandoValor.value?.id)
    produtos.value[index].valor = novoValorProduto.value
    produtoEditandoValor.value = null
    toast.add({
      severity: 'success',
      summary: 'Sucesso na edição',
      detail: 'Valor do produto editado com sucesso',
      life: 4000
    });
  }
}

const totalValorSelecionados = computed(() => {
  return produtosSelecionados.value.reduce((total: number, produto: IProduto) => {
    return total + (produto.valor || 0)
  }, 0)
})

async function atualizarStatus(item: IProdutoListaProduto, statusProdutoListaId: number) {
  await editarStatusProdutoListaProdutos(item.id, statusProdutoListaId)
}

async function eProdutosComprados() {
  produtosComprados.value.push(...produtosSelecionados.value)
  produtosSelecionados.value = []

  toast.add({
    severity: 'success',
    summary: 'Sucesso ao realizar compra',
    detail: 'Compra registrada com sucesso',
    life: 4000
  });
}

</script>

<template>
  <div class="flex flex-col w-full gap-4  relative md:!h-full "
       style="height: calc(100vh - 108px);">
    <div class="flex justify-end p-2 bg-white rounded ">
      <Button type="button" class="font-bold" @click="mostrarDialogCadastrarProduto = true">
        <div>
          <Icon icon="ic:round-plus" width="24"/>
        </div>
        <span>Produto</span>
      </Button>
    </div>
    <div class="p-1 bg-white rounded">
      <div class="bg-primaria-200 rounded px-2 py-1 text-lg font-medium flex gap-2 items-center">
        <Icon icon="ic:baseline-format-list-numbered" width="28"/>
        <span>Produtos pendentes</span>
        <span class="ml-auto">Total: {{ produtos.length - produtosSelecionados.length }}</span>
      </div>
      <DataView :value="produtos" data-key="id">
        <template #empty>
          <div class="py-1 px-2">
            <span class="text-lg font-medium">Nenhum produto adicionado.</span>
          </div>
        </template>
        <template #list="slotProps">
          <div class="flex flex-col">
            <div v-for="(item, index) in slotProps.items" :key="index">
              <div
                  v-if="!produtosSelecionados.some(produto => produto.id === item.id)"
                  class="flex items-center gap-4 px-4 justify-between"
                  :class="{'border-t border-gray-300': index !== 0}">
                <div class="flex items-center gap-4">
                  <Checkbox
                      v-model="produtosSelecionados" name="size" :value="item" size="large"
                      @change="atualizarStatus(item, 2)"/>
                  <div class="flex flex-col p-2">
                    <span class="font-bold">{{ item.produto?.nome }}</span>
                    <div>
                      <span>Quantidade: {{ item.quantidade }} {{ item.unidade }}</span>
                      <span v-if="item.produto?.observacao" class="text-sm"> - Obs: {{
                          item.produto?.observacao
                        }}</span>
                    </div>
                  </div>
                </div>
                <div class="flex gap-2">
                  <div v-if="produtoEditandoValor?.id === item.id" class="flex gap-2">
                    <FloatLabel variant="on">
                      <InputNumber
                          id="valorParaAlterar" v-model="novoValorProduto" class="w-full" show-buttons
                          mode="currency" currency="BRL"
                          locale="pt-BR"
                          :max-fraction-digits="2"/>
                      <label for="valor">Editar valor</label>
                    </FloatLabel>
                    <Button
                        v-tooltip.left="{ value: 'Salvar', showDelay: 800}" class="!p-1"
                        @click="handleEditarValorProduto()">
                      <Icon :icon="ICONES.SALVAR" width="32"/>
                    </Button>
                    <Button v-tooltip.left="{ value: 'Cancelar', showDelay: 800}" text class="!p-1">
                      <Icon :icon="ICONES.CANCELAR" width="32" @click="produtoEditandoValor = null"/>
                    </Button>
                  </div>
                  <template v-if="produtoEditandoValor?.id !== item.id">
                    <Button
                        v-tooltip.left="{ value: 'Atualizar valor', showDelay: 800}" text class="!p-1 !hidden md:!flex"
                        @click="editandoValorProduto(item)">
                      <Icon icon="ri:money-dollar-circle-line" width="32"/>
                    </Button>
                    <Button
                        v-tooltip.left="{ value: 'Editar', showDelay: 800}" text class="!p-1"
                        @click="editandoProduto(item.id)">
                      <Icon :icon="ICONES.EDITAR" width="32"/>
                    </Button>
                  </template>
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
      <DataView :value="produtosSelecionados" data-key="id">
        <template #empty>
          <div class="py-1 px-2">
            <span class="text-lg font-medium">Nenhum produto selecionado.</span>
          </div>

        </template>
        <template #list="slotProps">
          <div class="flex flex-col">
            <div v-for="(item, index) in slotProps.items" :key="index">
              <div
                  class="flex items-center gap-4 bg-gray-100 text-gray-500 px-4 justify-between"
                  :class="{'border-t border-gray-300': index !== 0}">
                <div class="flex items-center gap-4 ">
                  <Checkbox
                      v-model="produtosSelecionados" :value="item" name="size" size="large"
                      @change="atualizarStatus(item, 1)"/>
                  <div class="flex flex-col p-2">
                    <span class="font-bold line-through">{{ item.produto.nome }}</span>
                    <div>
                      <span>Quantidade: {{ item.quantidade }} {{ item.unidade }}</span>
                      <span v-if="item.produto.observacao" class="text-sm"> - Obs: {{ item.produto?.observacao }}</span>
                    </div>
                  </div>
                </div>
                <div class="flex gap-2">
                  <div v-if="produtoEditandoValor?.id === item.id" class="flex gap-2">
                    <FloatLabel variant="on">
                      <InputNumber
                          id="valorParaAlterar" v-model="novoValorProduto" class="w-full" show-buttons
                          mode="currency" currency="BRL"
                          locale="pt-BR"
                          :max-fraction-digits="2"/>
                      <label for="valor">Editar valor</label>
                    </FloatLabel>
                    <Button
                        v-tooltip.left="{ value: 'Salvar', showDelay: 800}" class="!p-1"
                        @click="handleEditarValorProduto()">
                      <Icon :icon="ICONES.SALVAR" width="32"/>
                    </Button>
                    <Button v-tooltip.left="{ value: 'Cancelar', showDelay: 800}" text class="!p-1">
                      <Icon :icon="ICONES.CANCELAR" width="32" @click="produtoEditandoValor = null"/>
                    </Button>
                  </div>
                  <template v-if="produtoEditandoValor?.id !== item.id">
                    <Button
                        v-tooltip.left="{ value: 'Atualizar valor', showDelay: 800}" text class="!p-1 !hidden md:!flex"
                        @click="editandoValorProduto(item)">
                      <Icon icon="ri:money-dollar-circle-line" width="32"/>
                    </Button>
                    <Button
                        v-tooltip.left="{ value: 'Editar', showDelay: 800}" text class="!p-1"
                        @click="editandoProduto(item.id)">
                      <Icon :icon="ICONES.EDITAR" width="32"/>
                    </Button>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </template>
      </DataView>
    </div>
    <div class="p-1 bg-white rounded">
      <div class="bg-primaria-200 rounded px-2 py-1 text-lg font-medium flex gap-2 items-center">
        <Icon icon="ic:round-monetization-on" width="28"/>
        <span>Produtos comprados</span>
        <span class="ml-auto">Total: {{ produtosComprados.length }}</span>
      </div>
      <DataView :value="produtosComprados" data-key="id">
        <template #empty>
          <div class="py-1 px-2">
            <span class="text-lg font-medium">Nenhum produto selecionado.</span>
          </div>

        </template>
        <template #list="slotProps">
          <div class="flex flex-col">
            <div v-for="(item, index) in slotProps.items" :key="index">
              <div
                  class="flex items-center gap-4 bg-gray-100 text-gray-500 px-4 justify-between"
                  :class="{'border-t border-gray-300': index !== 0}">
                <div class="flex items-center gap-4 ">
                  <div class="flex flex-col p-2">
                    <span class="font-bold line-through">{{ item.produto.nome }}</span>
                    <div>
                      <span>Quantidade: {{ item.quantidade }} {{ item.unidade }}</span>
                      <span v-if="item.produto.observacao" class="text-sm"> - Obs: {{ item.produto?.observacao }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </DataView>
    </div>
    <BarraCarrinhoCompra :total-selecionados="produtosSelecionados.length" :total-valor="totalValorSelecionados"
                         :produtos-lista-produtos="produtosSelecionados.map(item => item.id)"
                         @comprado="eProdutosComprados"/>
    <DialogAdicionarProdutoListaProduto
        v-model:visible="mostrarDialogCadastrarProduto" :lista-produtos-id="listaProdutosId"
        @cadastrado="itemCadastrado"/>
    <DialogEditarProdutoListaProduto
        v-model:visible="mostrarDialogEditarProduto"
        :produto-id="produtoSelecionadoId"
        :lista-produto-id="listaProdutosId"
        @editado="itemEditado"/>
    <Toast/>
  </div>
</template>

<style scoped>

</style>