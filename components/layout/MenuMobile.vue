<script setup lang="ts">
import {Icon} from "@iconify/vue";
import {ref} from "vue";
import {useRouter} from "#vue-router";

const router = useRouter();

const items = ref([
  {
    label: 'Compras',
    icon: 'ic:round-shopping-cart',
    // shortcut: '⌘+S'
    command: () => {
      router.push('/compras');
    }
  },
  {
    label: 'Rotinas',
    icon: 'ic:round-calendar-month',
    // shortcut: '⌘+S'
    command: () => {
      router.push('/rotinas');
    }
  },
  {
    label: 'Residências',
    icon: 'ic:round-meeting-room',
    // shortcut: '⌘+S'
    command: () => {
      router.push('/residencias');
    }
  },
  {
    label: 'Perfil',
    icon: 'ic:round-person',
    // shortcut: '⌘+S'
    command: () => {
      router.push('/perfil');
    }
  },
]);

</script>

<template>
  <div class="!bg-secundaria-400/70 px-4 py-2 shadow absolute bottom-0 w-full">
    <div class="flex gap-2 justify-between text-gray-800">
      <div class="flex flex-col font-medium items-center" v-for="(item, index) in items" :key="index" @click="item.command">
        <Icon :icon="item.icon" width="48"/>
        <span class="text-sm">{{ item.label }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>