<script setup lang="ts">
import {ref} from 'vue'
import type {IMercado} from "~/interfaces/mercados/mercado.interface";
import {buscarMercadosPorUsuario} from "~/composable/mercados/buscarMercadosPorUsuario";
import {Icon} from "@iconify/vue";
import {ICONES} from "~/constants/icones";
import type {IFormaPagamento} from "~/interfaces/compras/compras/formaPagamento.interface";
import {buscarFormasPagamento} from "~/composable/compras/compras/buscarFormasPagamento";
import type {ICadastrarCompra} from "~/interfaces/compras/compras/cadastrarCompra.interface";
import {cadastrarCompra} from "~/composable/compras/compras/cadastrarCompra";
import type {IProduto} from "~/interfaces/produtos/produto.interface";

const props = defineProps({
  visible: Boolean,
  quantidadeProdutos: {
    type: Number,
    default: 0
  },
  valorPrevisto: {
    type: Number,
    default: 0
  },
  produtosListaProdutos: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
  (e: 'comprado'): void
}>()

const mercados = ref<IMercado[]>([])
mercados.value = await buscarMercadosPorUsuario()

const formasPagamento = ref<IFormaPagamento[]>([])
formasPagamento.value = await buscarFormasPagamento()

watch(() => props.valorPrevisto, (valor) => {
  if (valor !== 0) {
    dados.value.valor = valor
  }
})

const dados = ref({
  mercadoId: null,
  valor: 0,
  compradoEm: new Date(),
  formaPagamentoId: null
})
const maxDate = ref(new Date());

const desabilitarBtn = computed(() => {
  return temCampoInvalido(dados.value)
})

async function finalizarCompra() {
  const dadosCadastrarCompra: ICadastrarCompra = {
    ...dados.value,
    produtosListaProdutos: props.produtosListaProdutos
  }
  await cadastrarCompra(dadosCadastrarCompra)
  emit('comprado')
}

</script>

<template>
  <Dialog
      class="w-11/12 md:w-8/12 bg-gray-200 " :visible="visible" modal header="Finalizar compra"
      @update:visible="emit('update:visible')">
    <div class="flex flex-col gap-4">
      <div class="flex flex-col">
        <span>Total de produtos: {{ quantidadeProdutos }}</span>
        <span>Valor previsto: {{ formatarParaReal(valorPrevisto) }}</span>
      </div>
      <div class="flex flex-col gap-4">
        <div class="flex flex-col md:flex-row gap-4">
          <FloatLabel variant="on" class="w-full">
            <Select
                v-model="dados.mercadoId" :options="mercados" filter option-label="nome"
                name="mercado"
                option-value="id"
                class="w-full"/>
            <label for="mercado" class="required">Mercado</label>
          </FloatLabel>
          <FloatLabel variant="on">
            <DatePicker
                v-model="dados.compradoEm" show-icon :max-date="maxDate" fluid date-format="dd/mm/yy"
                icon-display="input" input-id="residencia">
              <template #inputicon="">
                <Icon icon="ic:baseline-calendar-month" width="20"/>
              </template>
            </DatePicker>
            <label for="residencia" class="required">Data da compra</label>
          </FloatLabel>
        </div>

        <div class="flex w-full flex-col md:flex-row gap-4">
          <FloatLabel variant="on" class="w-full">
            <InputNumber
                id="valor" v-model="dados.valor" class="w-full" show-buttons mode="currency" currency="BRL"
                locale="pt-BR"
                :max-fraction-digits="2"/>
            <label for="valor" class="required">Valor da compra</label>
          </FloatLabel>
          <FloatLabel variant="on" class="w-full">
            <Select
                v-model="dados.formaPagamentoId" :options="formasPagamento" filter option-label="descricao"
                name="formaPagamento"
                option-value="id"
                class="w-full"/>
            <label for="formaPagamento" class="required">Forma de Pagamento</label>
          </FloatLabel>
        </div>
      </div>
      <div class="flex justify-between">
        <Button text severity="secondary" @click="$emit('update:visible', false)">
          Cancelar
        </Button>
        <Button class="" :disabled="desabilitarBtn" @click.stop.prevent="finalizarCompra()">
          <Icon :icon="ICONES.SALVAR" width="28"/>
          <span>Finalizar compra</span>
        </Button>
      </div>
    </div>
  </Dialog>
</template>

<style scoped>

</style>