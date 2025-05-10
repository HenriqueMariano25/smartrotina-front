<script setup lang="ts">
import {ref} from 'vue'
import {Icon} from "@iconify/vue";
import {buscarComprasPorMes} from "~/composable/compras/compras/buscarComprasPorMes";
import {useAutenticacaoStore} from "~/stores/auth";

definePageMeta({
  layout: 'default'
})

const {$dayjs} = useNuxtApp()

const dataRelatorioPorMes = ref(new Date());

watch(dataRelatorioPorMes, async (valor) => {
  chartData.value = await setChartData();
  graficoCompraPorMes.value?.chart?.update()
})

const dadosPagina = useDadosPagina();
dadosPagina.value.titulo = 'Home'
dadosPagina.value.icone = 'ic:round-home'

onMounted(async () => {
  chartData.value = await setChartData();
  chartOptions.value = setChartOptions();
});

const chartData = ref();
const chartOptions = ref();
const graficoCompraPorMes = ref()

const setChartData = async () => {
  const mesAno = $dayjs(dataRelatorioPorMes.value).format('MM/YYYY');
  const compras = await buscarComprasPorMes(mesAno)

  return {
    labels: compras.map(item => item.nome),
    datasets: [
      {
        data: compras.map(item => item.valor),
        backgroundColor: ['#d9ed92', "#b5e48c", '#76c893', '#34a0a4', '#1a759f', '#184e77'],
      }
    ]
  };
};

const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue('--p-text-color');

  return {
    responsive: true,
    plugins: {

      title: {
        display: true,
        text: 'Compras por forma de pagamento'
      },
      legend: {
        labels: {
          usePointStyle: true,
          color: textColor
        }
      },
    }
  };
};

const autenticacao = useAutenticacaoStore()

</script>

<template>
  <div class="flex flex-col gap-4 w-full">
    <div class="w-full bg-white rounded p-4 text-xl font-medium shadow">
      <span>Bem vindo, {{ autenticacao.usuario?.nome }}!</span>
    </div>
    <div class="bg-white rounded p-4 flex flex-col gap-4 shadow w-full md:w-fit">
      <span class="font-bold text-xl">Compras por mês</span>
      <FloatLabel variant="on" class="flex w-full">
        <DatePicker
            v-model="dataRelatorioPorMes" view="month" show-icon date-format="mm/yy" icon-display="input"
            class="w-full"
            input-id="on_label"/>
        <label for="on_label">Mês</label>
      </FloatLabel>

      <Chart
          v-show="chartData?.datasets[0].data?.length > 0"
          ref="graficoCompraPorMes" type="doughnut" :data="chartData" :options="chartOptions"
          class="w-full md:w-[30rem]"/>
      <span v-show="chartData?.datasets[0].data?.length <= 0" class="font-bold text-xl text-gray-700">Nenhuma compra encontrada nesse mês</span>
    </div>
  </div>
</template>

<style scoped>

</style>