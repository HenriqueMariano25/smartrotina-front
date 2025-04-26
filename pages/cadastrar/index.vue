<script setup lang="ts">
import {ref} from 'vue'
import {navigateTo} from "#app";
import type {ICadastrarUsuario} from "~/interfaces/cadastrar/cadastrarUsuario.interface";
import {limparDados, useAutenticacaoStore} from "#imports";
import {cadastrarUsuario} from "~/composable/cadastrar/cadastrarUsuario";

definePageMeta({
  layout: "autenticacao",
})

const autenticacaoStore = useAutenticacaoStore()

const dadosCadastro = ref({
  nome: '',
  email: '',
  senha: ''
})

const desabilitarBtn = computed(() => {
  return temCampoInvalido(dadosCadastro)
})

const erroCadastro = ref(false)
const textoErroCadastro = ref("")
const handleCadastrar = async () => {
  erroCadastro.value = false
  const data: ICadastrarUsuario = limparDados(dadosCadastro.value)

  try {
    const usuarioCadastrado = await cadastrarUsuario(data)
    await autenticacaoStore.login({email: data.email, senha: data.senha})
    await navigateTo("/")
  } catch (err) {
    erroCadastro.value = true
    textoErroCadastro.value = err.message
  }

}

</script>

<template>
  <div class="flex h-full">
    <div class="md:w-1/2 bg-fundo items-center flex justify-center">
      <div class="flex flex-col gap-4 w-11/12 sm:8/12 xl:w-6/12">
        <img src="@/assets/images/logo.png" alt="Logo" class="mb-4">
        <span class="text-4xl font-bold text-center ">Criar conta</span>
        <span class="text-center">Crie sua conta e descubra uma nova forma de gerenciar seu lar!</span>
        <FloatLabel variant="on">
          <InputText v-model="dadosCadastro.nome" name="nome" class="w-full"/>
          <label for="nome">Nome</label>
        </FloatLabel>
        <FloatLabel variant="on">
          <InputText v-model="dadosCadastro.email" name="email" class="w-full"/>
          <label for="email">Email</label>
        </FloatLabel>
        <FloatLabel variant="on">
          <InputText v-model="dadosCadastro.senha" type="password" name="senha" class="w-full"/>
          <label for="senha">Senha</label>
        </FloatLabel>
        <Message v-if="erroCadastro" severity="error" closable>{{ textoErroCadastro }}</Message>
        <Button label="Criar" severity="primary-50" :disabled="desabilitarBtn" @click="handleCadastrar()"/>
        <NuxtLink to="/login" class="text-center">
          <span class="text-sm">Já tem conta ? <b>Entrar</b></span>
        </NuxtLink>
      </div>
    </div>
    <div class="h-screen w-1/2 overflow-hidden md:block hidden ">
      <img
          src="@/assets/images/tela-inicial.jpg" class="w-full h-full object-cover object-center"
          alt="imagem lateral com uma lista de compras">
      <div class="absolute justify-self-end top-0 inset-0 bg-gradient-to-r from-[#E8E9E3] to-transparent w-1/2 "/>
    </div>
  </div>
</template>

<style scoped>

</style>