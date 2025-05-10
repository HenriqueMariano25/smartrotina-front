<script setup lang="ts">
import {ref} from "vue";
import {Icon} from "@iconify/vue";
import {useRouter} from "#vue-router";
import {useAutenticacaoStore} from "~/stores/auth";
import type {IProduto} from "~/interfaces/produtos/produto.interface";

defineProps({
  visible: Boolean
})

const emit = defineEmits<{
  (e: 'esconder'): void
}>()

const router = useRouter();
const autenticacao = useAutenticacaoStore()

const items = ref([
  {
    label: 'Home',
    icon: 'ic:round-home',
    command: () => {
      emit('esconder');
      router.push('/');
    }
  },
  {
    label: 'Compras',
    icon: 'ic:round-shopping-cart',
    items: [
      {
        label: 'Listas de compras',
        icon: 'ic:round-checklist',
        command: () => {
          emit('esconder');
          router.push('/compras');
        }
      },
      {
        label: 'Minhas compras',
        icon: 'ic:round-monetization-on',
        command: () => {
          emit('esconder');
          router.push('/minhasCompras');
        }
      },
      {
        label: 'Produtos',
        icon: 'fluent:food-apple-20-filled',
        command: () => {
          emit('esconder');
          router.push('/produtos');
        }
      },
      {
        label: 'Mercados',
        icon: 'ic:round-point-of-sale',
        command: () => {
          emit('esconder');
          router.push('/mercados');
        }
      },
    ]
  },
  {
    label: 'Residências',
    icon: 'ic:round-meeting-room',
    command: () => {
      emit('esconder');
      router.push('/residencias');
    }
  },
  {
    label: autenticacao.usuario?.nome.split(' ')[0],
    icon: 'ic:round-person',
    items: [
      {
        label: 'Sair',
        icon: 'ic:round-log-out',
        command: async () => {
          emit('esconder');
          useAutenticacaoStore().logout()
        }
      }
    ]

  }
]);
</script>

<template>
  <div
      :class="{'': visible, '-translate-x-full': !visible}"
      style="height: calc(100vh - 76px);"
      class="flex gap-4 flex-col items-start card w-60 absolute z-10 ease-in-out duration-4000 transition !bg-secundaria-500 p-2 !border-0 !rounded-none">
    <PanelMenu :model="items" class="w-full ">
      <h1>Tete</h1>
      <template #item="{ item, hasSubmenu }">
        <div class="flex gap-2 items-center p-1 cursor-pointer">
          <div class="bg-secundaria-150 rounded">
            <Icon v-if="item.icon" :icon="item?.icon" width="32" height="32" class="!text-secundaria-900"/>
          </div>
          <span class="font-medium text-gray-700">{{ item.label }}</span>
          <Icon v-if="hasSubmenu" icon="ic:round-keyboard-arrow-down" width="24" class="!text-secundaria-900 ml-auto"/>
        </div>
      </template>
    </PanelMenu>
    <div class="w-full mt-auto bg-white/50 rounded p-2">
      <NuxtLink to="/" class="flex justify-center m-auto ">
        <img src="@/assets/images/logo.png" alt="Logo" class="" width="190px">
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>


</style>