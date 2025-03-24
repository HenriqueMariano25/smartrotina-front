<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  setup() {


    return {}
  }
})
  definePageMeta({
    layout: "autenticacao"
  })

</script>

<template>
  <div class="flex">
    <div class="w-1/2 bg-fundo items-center flex justify-center">
      <div class="flex flex-col gap-4 w-6/12">
        <img src="@/assets/images/logo.png" alt="Logo" class="mb-4"/>
        <span class="text-4xl font-bold text-center ">Entrar na conta</span>
        <span class="text-center">Entre e continue tornando seu lar mais prático e organizado.</span>
        <FloatLabel variant="on">
          <InputText name="email" class="w-full"/>
          <label for="email">Email</label>
        </FloatLabel>
        <FloatLabel variant="on">
          <InputText type="password" name="senha" class="w-full"/>
          <label for="senha">Senha</label>
        </FloatLabel>
        <Button label="Entrar" severity="primary-50"/>
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