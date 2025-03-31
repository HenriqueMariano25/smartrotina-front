<script setup lang="ts">
import {ref} from 'vue'
import type {LoginDto} from "~/dto/login/loginDto.js";
import {useAutenticacaoStore} from "~/stores/auth";
import {navigateTo} from "#app";

definePageMeta({
  layout: "autenticacao"
})

const autenticacaoStore = useAutenticacaoStore()

const dadosLogin = ref({
  email: null,
  senha: null
})

const erroLogin = ref(false)
const handleLogin = async () => {
  erroLogin.value = false
  if (dadosLogin.value.email && dadosLogin.value.senha) {
    const data: LoginDto = {email: dadosLogin.value.email, senha: dadosLogin.value.senha}

    try {
      await autenticacaoStore.login(data)
      await navigateTo("/")
    } catch (err) {
      console.log(err)
      erroLogin.value = true
    }
  }

}
</script>

<template>
  <div class="flex">
    <div class="w-1/2 bg-fundo items-center flex justify-center">
      <div class="flex flex-col gap-4 w-6/12">
        <img src="@/assets/images/logo.png" alt="Logo" class="mb-4"/>
        <span class="text-4xl font-bold text-center ">Entrar na conta</span>
        <span class="text-center">Entre e continue tornando seu lar mais prático e organizado.</span>
        <FloatLabel variant="on">
          <InputText v-model="dadosLogin.email" name="email" class="w-full"/>
          <label for="email">Email</label>
        </FloatLabel>
        <FloatLabel variant="on">
          <InputText v-model="dadosLogin.senha" type="password" name="senha" class="w-full"/>
          <label for="senha">Senha</label>
        </FloatLabel>
        <Button label="Entrar" severity="primary-50" :disabled="dadosLogin.email === null || dadosLogin.senha === null"
                @click="handleLogin()"/>
        <Message v-if="erroLogin" severity="error" closable>Email ou senha incorreta</Message>
        <NuxtLink to="/cadastrar" class="text-center">
          <span class="text-center text-sm">Não tem conta ainda ? <b>Criar</b></span>
        </NuxtLink>
      </div>
    </div>
    <div class="h-screen w-1/2 overflow-hidden ">
      <img src="@/assets/images/tela-inicial.jpg" class="w-full h-full object-cover object-center"
           alt="imagem lateral com uma lista de compras"/>
      <div class="absolute justify-self-end top-0 inset-0 bg-gradient-to-r from-[#E8E9E3] to-transparent w-1/2 "/>
    </div>
  </div>
</template>

<style scoped>

</style>