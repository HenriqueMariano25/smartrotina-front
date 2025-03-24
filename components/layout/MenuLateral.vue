<script setup lang="ts">
import {ref} from "vue";
import {Icon} from "@iconify/vue";

const items = ref([
  {
    label: 'Home',
    icon: 'ic:round-home',
    // shortcut: '⌘+N'
  },
  {
    label: 'Lista de compras',
    icon: 'ic:round-shopping-cart',
    // shortcut: '⌘+S'
  },
  {
    label: 'Rotinas',
    icon: 'ic:round-calendar-month',
    // shortcut: '⌘+S'
  },
  {
    label: 'Residências',
    icon: 'ic:round-meeting-room',
    // shortcut: '⌘+S'
  },
]);
</script>

<template>
  <div>
    <Menu :model="items" class="h-full w-full !bg-secundaria-500 p-3 !border-0 !rounded-none">
      <template #item="{ item, props }">
        <a v-ripple class="flex items-center bg-secundaria-50 hover:bg-secundaria-150 mb-3 rounded" v-bind="props.action">
          <Icon v-if="item.icon" :icon="item?.icon" width="32" height="32"/>
          <span>{{ item.label }}</span>
        </a>
      </template>
    </Menu>
  </div>
</template>

<style scoped>

</style>