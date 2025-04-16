<script setup lang="ts">
import {Icon} from "@iconify/vue";
import {DataView} from "primevue";
import {ref} from "vue";
import DialogCadastrarProduto from "~/pages/compras/listaProdutos/components/DialogCadastrarProduto.vue";
import type {IProduto} from "~/interfaces/compras/produto.interface";
import {buscarProdutosPorListaProdutos} from "~/composable/compras/buscarProdutosPorListaProdutos";
import {ICONES} from "~/constants/icones";
import DialogEditarProduto from "~/pages/compras/listaProdutos/components/DialogEditarProduto.vue";
import {useToast} from "primevue/usetoast";
import {editarValorProduto} from "~/composable/compras/editarValorProduto";

const toast = useToast();
const listaProdutosId = useState<number>("listaProdutosId");
const produtos = ref<IProduto[]>([])


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

const produtosSelecionados = ref([])
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
  if(produtoEditandoValor?.value?.id) {
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
        <Icon icon="ic:round-checklist" width="28"/>
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
              <div v-if="!produtosSelecionados.some(produto => produto.id === item.id)"
                   class="flex items-center gap-4 px-4 justify-between"
                   :class="{'border-t border-gray-300': index !== 0}">
                <div class="flex items-center gap-4">
                  <Checkbox v-model="produtosSelecionados" name="size" :value="item" size="large"/>
                  <div class="flex flex-col p-2">
                    <span class="font-bold">{{ item.nome }}</span>
                    <div>
                      <span>Quantidade: {{ item.quantidade }} {{ item.unidade }}</span>
                      <span v-if="item.observacao" class="text-sm"> - Obs: {{ item.observacao }}</span>
                    </div>
                  </div>
                </div>
                <div class="flex gap-2">
                  <div class="flex gap-2" v-if="produtoEditandoValor?.id === item.id">
                    <FloatLabel variant="on">
                      <InputNumber v-model="novoValorProduto" id="valorParaAlterar" class="w-full" show-buttons mode="currency" currency="BRL"
                                   locale="pt-BR"
                                   :max-fraction-digits="2"/>
                      <label for="valor">Editar valor</label>
                    </FloatLabel>
                    <Button v-tooltip.left="{ value: 'Salvar', showDelay: 800}" class="!p-1" @click="handleEditarValorProduto()">
                      <Icon :icon="ICONES.SALVAR" width="32"/>
                    </Button>
                    <Button v-tooltip.left="{ value: 'Cancelar', showDelay: 800}" text class="!p-1">
                      <Icon :icon="ICONES.CANCELAR" width="32" @click="produtoEditandoValor = null"/>
                    </Button>
                  </div>
                  <template v-if="produtoEditandoValor?.id !== item.id">
                    <Button v-tooltip.left="{ value: 'Atualizar valor', showDelay: 800}" text class="!p-1"
                            @click="editandoValorProduto(item)">
                      <Icon icon="ri:money-dollar-circle-line" width="32"/>
                    </Button>
                    <Button v-tooltip.left="{ value: 'Editar', showDelay: 800}" text class="!p-1"
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
              <div class="flex items-center gap-4 bg-gray-100 text-gray-500 px-4 justify-between" :class="{'border-t border-gray-300': index !== 0}">
                <div class="flex items-center gap-4 px-4  ">
                  <Checkbox v-model="produtosSelecionados" :value="item" name="size" size="large"/>
                  <div class="flex flex-col p-2">
                    <span class="font-bold line-through">{{ item.nome }}</span>
                    <div>
                      <span>Quantidade: {{ item.quantidade }} {{ item.unidade }}</span>
                      <span v-if="item.observacao" class="text-sm"> - Obs: {{ item.observacao }}</span>
                    </div>
                  </div>
                </div>
                <div class="flex gap-2">
                  <div class="flex gap-2" v-if="produtoEditandoValor?.id === item.id">
                    <FloatLabel variant="on">
                      <InputNumber v-model="novoValorProduto" id="valorParaAlterar" class="w-full" show-buttons mode="currency" currency="BRL"
                                   locale="pt-BR"
                                   :max-fraction-digits="2"/>
                      <label for="valor">Editar valor</label>
                    </FloatLabel>
                    <Button v-tooltip.left="{ value: 'Salvar', showDelay: 800}" class="!p-1" @click="handleEditarValorProduto()">
                      <Icon :icon="ICONES.SALVAR" width="32"/>
                    </Button>
                    <Button v-tooltip.left="{ value: 'Cancelar', showDelay: 800}" text class="!p-1">
                      <Icon :icon="ICONES.CANCELAR" width="32" @click="produtoEditandoValor = null"/>
                    </Button>
                  </div>
                  <template v-if="produtoEditandoValor?.id !== item.id">
                    <Button v-tooltip.left="{ value: 'Atualizar valor', showDelay: 800}" text class="!p-1"
                            @click="editandoValorProduto(item)">
                      <Icon icon="ri:money-dollar-circle-line" width="32"/>
                    </Button>
                    <Button v-tooltip.left="{ value: 'Editar', showDelay: 800}" text class="!p-1"
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
    <DialogCadastrarProduto v-model:visible="mostrarDialogCadastrarProduto" @cadastrado="itemCadastrado"
                            :lista-produtos-id="listaProdutosId"/>
    <DialogEditarProduto :produto-id="produtoSelecionadoId" v-model:visible="mostrarDialogEditarProduto"
                         @editado="itemEditado"/>
    <Toast/>
  </div>
</template>

<style scoped>

</style>