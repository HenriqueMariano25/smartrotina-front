<script setup lang="ts">
import type {IResidencia} from "~/interfaces/residencias/residencia.interface";
import {Icon} from "@iconify/vue";
import {cadastrarMorador} from "~/composable/residencias/cadastrarMorador";
import type {ICadastrarMorador} from "~/interfaces/residencias/cadastrarMorador.interface";
import {limparDados} from "~/utils/limparDados";

const props = defineProps({
  visible: Boolean,
  residenciaId: {
    type: Number,
    required: true
  }
})
const emit = defineEmits<{
  (event: 'update:visible', value: boolean): void,
  (event: 'cadastrado', value: IResidencia): void,
}>()

const maxDate = ref(new Date());
const dados = ref({
  nome: null,
  dataNascimento: null,
  usuario: null
})
const erroUsuario = ref<string | null>(null)

const cadastrar = async () => {
  try {
    const dadosParaCadastrar: ICadastrarMorador = limparDados({...dados.value})
    const moradorCadastrado = await cadastrarMorador(dadosParaCadastrar, props.residenciaId)
    emit('cadastrado', moradorCadastrado)
  } catch (err) {
    if (err === 'usuario must be an email') {
      erroUsuario.value = 'Formato de email inválido'
    } else if (err === 'Usuário não encontrado') {
      erroUsuario.value = 'Usuário não encontrado'
    }
  }
}

watch(() => props.visible, (valor) => {
  if (!valor) {
    dados.value = {
      nome: null,
      dataNascimento: null,
      usuario: null
    }
    erroUsuario.value = null
  }
})

</script>

<template>
  <Dialog
      class="w-5/12"
      :visible="visible"
      modal header="Cadastrar morador"
      @update:visible="$emit('update:visible', !visible)">
    <div class="flex flex-col gap-4 pt-1.5">
      <div class="flex flex-col gap-4">
        <FloatLabel variant="on">
          <InputText id="residencia" v-model="dados.nome" class="w-full"/>
          <label for="residencia" class="required">Nome</label>
        </FloatLabel>
        <FloatLabel variant="on">
          <DatePicker v-model="dados.dataNascimento" show-icon :max-date="maxDate" fluid date-format="dd/mm/yy"
                      iconDisplay="input" inputId="residencia">
            <template #inputicon="">
              <Icon icon="ic:baseline-calendar-month" width="20"/>
            </template>
          </DatePicker>
          <label for="residencia" class="required">Data de nascimento</label>
        </FloatLabel>
        <div>
          <FloatLabel variant="on">
            <label for="residencia">Email do usuário</label>
            <InputText id="residencia" v-model="dados.usuario" class="w-full"/>
          </FloatLabel>
          <Message size="small" severity="secondary" variant="simple">Indique a qual usuário representa esse morador.
          </Message>
          <Message v-if="erroUsuario" size="small" severity="error">{{ erroUsuario }}</Message>
        </div>
      </div>
      <div class="flex justify-end">
        <Button @click="cadastrar()">
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