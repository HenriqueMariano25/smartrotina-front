<script setup lang="ts">
import {ref} from 'vue'
import {Icon} from "@iconify/vue";
import {ICONES} from "~/constants/icones";
import type {IResidencia} from "~/interfaces/residencias/residencia.interface";
import {buscarResidenciaPorUsuario} from "~/composable/residencias/buscarResidenciaPorUsuario";
import {useAutenticacaoStore} from "~/stores/auth";
import {buscarMoradoresPorResidencia} from "~/composable/residencias/buscarMoradoresPorResidencia";
import type {IMorador} from "~/interfaces/residencias/morador.interface";
import type {ICadastrarRotina} from "~/interfaces/rotinas/cadastrarRotina.interface";
import {cadastrarRotina} from "~/composable/rotinas/cadastrarRotina";
import type {IRotina} from "~/interfaces/rotinas/rotina.interface";
import {buscarRotina} from "~/composable/rotinas/buscarRotina";
import {editarRotina} from "~/composable/rotinas/editarRotina";
import type {IEditarRotina} from "~/interfaces/rotinas/editarRotina.interface";

const {$dayjs} = useNuxtApp()
const props = defineProps({
  visible: Boolean,
  rotinaId: {
    type: Number,
    default: null,
  }
})
const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
  (e: 'editado', rotina: IRotina): void
}>()

let dados = reactive<ICadastrarRotina>({
  nome: '',
  dataInicio: new Date(),
  dataTermino: null,
  horaInicio: null,
  horaTermino: null,
  repeticao: 'diária',
  periodo: [],
  intervalo: 1,
  residenciaId: null,
  responsavelId: null,
  observacao: null
})

const moradores = ref<IMorador[] | []>([])

const {usuario} = useAutenticacaoStore()
const residencias = ref<IResidencia[] | []>([])
const responsavelIdOriginal = ref<number | null>(null)
const dadosAtualizados = ref(false)


watch(() => props.visible, async () => {
  if (props.visible && props.rotinaId) {
    const rotina = await buscarRotina(props.rotinaId);
    dados.nome = rotina.nome;
    dados.dataInicio = $dayjs(rotina.dataInicio).toDate();
    dados.dataTermino = rotina.dataTermino ? $dayjs(rotina.dataTermino).toDate() : null;
    dados.horaInicio = rotina.horaInicio;
    dados.horaTermino = rotina.horaTermino;
    dados.repeticao = rotina.repeticao;
    dados.intervalo = rotina.intervalo;
    dados.residenciaId = rotina.residenciaId
    dados.observacao = rotina.observacao;
    dados.periodo = rotina.periodo;

    responsavelIdOriginal.value = rotina.responsavelId || null
  }
})


onMounted(async () => {
  if (usuario?.id) {
    residencias.value = await buscarResidenciaPorUsuario(parseInt(usuario.id))
  }
})

const opcoes = ref(['diária', 'semanal', 'mensal', 'anual']);

const diasDaSemana = ref([
  {sigla: 'Dom', valor: 'Domingo'},
  {sigla: 'Seg', valor: 'Segunda-feira'},
  {sigla: 'Ter', valor: 'Terça-feira'},
  {sigla: 'Qua', valor: 'Quarta-feira'},
  {sigla: 'Qui', valor: 'Quinta-feira'},
  {sigla: 'Sex', valor: 'Sexta-feira'},
  {sigla: 'Sab', valor: 'Sábado'}
])

const escritaIntervalo = computed(() => {
  const ehPlural = dados.intervalo > 1

  if (dados.repeticao === 'diária') {
    if (ehPlural) {
      return 'dias'
    }
    return 'dia'
  } else if (dados.repeticao === 'semanal') {
    if (ehPlural) {
      return 'semanas'
    }
    return 'semana'
  } else if (dados.repeticao === 'mensal') {
    if (ehPlural) {
      return 'meses'
    }
    return 'mês'
  } else if (dados.repeticao === 'anual') {
    if (ehPlural) {
      return 'anos'
    }
    return 'ano'
  }
  return "dia"
})

function adicionarRemoverPeriodo(diaSemana: string) {
  if (dados.periodo.includes(diaSemana)) {
    const index = dados.periodo.indexOf(diaSemana)
    dados.periodo.splice(index, 1)
  } else {
    dados.periodo.push(diaSemana)
  }
}

watch(() => dados.repeticao, () => {
  if (dadosAtualizados.value === true) {
    dados.periodo = []
  }
  dadosAtualizados.value = true
})

watch(() => dados.residenciaId, async (valor) => {
  dados.responsavelId = null
  if (valor) {
    moradores.value = await buscarMoradoresPorResidencia(valor)
    if (responsavelIdOriginal.value !== null) {
      dados.responsavelId = responsavelIdOriginal.value
    }
  }
})

const handleEditarRotina = async () => {
  const dadosPrEditar: IEditarRotina = limparDados(dados)

  const itemEditado = await editarRotina(props.rotinaId, dadosPrEditar)
  emit('editado', itemEditado)
}

</script>

<template>
  <Dialog class="w-6/12" :visible="visible" modal header="Editar rotina"
          @update:visible="(value) => emit('update:visible', value)">
    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-4 pt-1">
        <FloatLabel variant="on">
          <InputText v-model="dados.nome" id="rotina" class="w-full"/>
          <label for="rotina" class="required">Nome da rotina</label>
        </FloatLabel>
        <FloatLabel variant="on">
          <DatePicker v-model="dados.dataInicio" show-icon fluid name="dataInicio" id="dataInicio"
                      :min-date="new Date()"
                      date-format="dd/mm/yy"/>
          <label for="dataInicio" class="required">Data de início</label>
        </FloatLabel>
        <FloatLabel variant="on">
          <DatePicker v-model="dados.dataTermino" show-icon fluid name="dataTermino" :min-date="dados.dataInicio"
                      date-format="dd/mm/yy"/>
          <label for="dataTermino">Data de término</label>
        </FloatLabel>
        <div class="flex gap-4">
          <FloatLabel variant="on" class="w-full">
            <InputText type="time" v-model="dados.horaInicio" id="horaInicio" class="w-full"/>
            <label for="horaInicio">Hora de inicio</label>
          </FloatLabel>
          <FloatLabel variant="on" class="w-full">
            <InputText type="time" v-model="dados.horaTermino" id="horaInicio" class="w-full"/>
            <label for="horaTemino">Hora de término</label>
          </FloatLabel>
        </div>
        <div class="flex flex-col">
          <span class="pl-1 font-bold">Repetição</span>
          <SelectButton v-model="dados.repeticao" :options="opcoes" aria-labelledby="custom" size="large"/>
          <div class="flex gap-2 w-full mt-2" v-if="dados.repeticao === 'semanal'">
            <div v-for="dia of diasDaSemana" :key="dia.valor">
              <div class="bg-primaria-100 rounded-full py-2 px-4 hover:bg-primaria-200 cursor-pointer"
                   :class="{'!bg-primaria-400 text-white': dados.periodo.includes(dia.valor)}"
                   @click="adicionarRemoverPeriodo(dia.valor)">
                {{ dia.sigla }}
              </div>
            </div>
          </div>
        </div>
        <div v-if="dados.repeticao === 'mensal'" class="flex gap-2 w-full mt-2">
          <div class="grid grid-cols-7 gap-2">
            <div v-for="dia of 31" :key="dia">
              <div class="bg-primaria-100 rounded-full py-2 px-3 hover:bg-primaria-200 cursor-pointer text-center"
                   :class="{'!bg-primaria-400 text-white': dados.periodo.includes(dia)}"
                   @click="adicionarRemoverPeriodo(dia)">
                {{ dia }}
              </div>
            </div>
          </div>
        </div>
        <div>
          <span class="pl-1 font-bold">Intervalo</span>
          <div class="flex gap-4 items-center">
            <span class="text-nowrap font-medium">A cada</span>
            <InputNumber v-model="dados.intervalo" input-id="horizontal-buttons" show-buttons button-layout="horizontal"
                         :step="1" mode="decimal" fluid>
              <template #incrementbuttonicon>
                <Icon :icon="ICONES.MAIS" width="24"/>
              </template>
              <template #decrementbuttonicon>
                <Icon :icon="ICONES.MENOS" width="24"/>
              </template>
            </InputNumber>
            <span class="font-medium">{{ escritaIntervalo }}</span>
          </div>
        </div>
        <FloatLabel variant="on">
          <Select v-model="dados.residenciaId" :options="residencias" name="residencia" filter option-label="nome"
                  option-value="id" class="w-full"/>
          <label for="residencia">Residência</label>
        </FloatLabel>
        <FloatLabel variant="on">
          <Select v-model="dados.responsavelId" :options="moradores" name="responsavel" filter option-label="nome"
                  option-value="id" class="w-full" :disabled="!dados.residenciaId || dados.responsavelId === ''"/>
          <label for="responsavel">Responsável</label>
        </FloatLabel>
        <FloatLabel variant="on" class="w-full">
          <Textarea v-model="dados.observacao" id="observacao" rows="3" class="w-full"/>
          <label for="observacao">Observação</label>
        </FloatLabel>
      </div>
      <div class="flex justify-between">
        <Button text severity="secondary" @click="$emit('update:visible', false)">
          Cancelar
        </Button>
        <Button @click="handleEditarRotina">
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