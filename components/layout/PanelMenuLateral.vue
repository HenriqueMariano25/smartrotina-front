<script setup lang="ts">
import {ref} from 'vue';
import {Icon} from "@iconify/vue";
import {useRouter} from "#vue-router";

const router = useRouter();

const items = ref([
  {
    label: 'Home',
    icon: 'ic:round-home',
    command: () => {
      router.push('/');
    }
  },
  {
    label: 'Compras',
    icon: 'ic:round-shopping-cart',
    items: [
      {
        label: 'Lista de compras',
        icon: 'ic:round-checklist',
        command: () => {
          router.push('/compras');
        }
      },
      {
        label: 'Produtos',
        icon: 'fluent:food-apple-20-filled',
        command: () => {
          router.push('/produtos');
        }
      },
      {
        label: 'Mercados',
        icon: 'ic:round-point-of-sale',
        command: () => {
          router.push('/mercados');
        }
      },
    ]
  },
  {
    label: 'Residências',
    icon: 'ic:round-meeting-room',
    command: () => {
      router.push('/residencias');
    }
  }
]);
</script>

<template>
  <div class="card flex justify-center bg-white w-60">
    <PanelMenu :model="items" class="w-full !bg-secundaria-500 p-2 !border-0 !rounded-none">
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
  </div>
</template>

<style scoped>

</style>