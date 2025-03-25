<script setup lang="ts">
import {ref} from "vue";
import {Icon} from "@iconify/vue";
import { useRouter} from "#vue-router";

const router = useRouter();

const items = ref([
  {
    label: 'Home',
    icon: 'ic:round-home',
    // shortcut: '⌘+N'
    rota: '/',
    command: () => {
      router.push('/');
    }
  },
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
]);
</script>

<template>
  <div>
    <Menu :model="items" class="h-full w-full !bg-secundaria-500 p-3 !border-0 !rounded-none">
      <template #item="{ item, props }">
          <a v-ripple class="flex items-center bg-secundaria-50 hover:bg-secundaria-150 mb-3 rounded "
             v-bind="props.action">
            <Icon v-if="item.icon" :icon="item?.icon" width="32" height="32" class="!text-black"/>
            <span class="!text-black">{{ item.label }}</span>
          </a>
      </template>
    </Menu>
  </div>
</template>

<style scoped>

</style>