<script setup lang="ts">
import {Icon} from "@iconify/vue";
</script>

<template>
  <div>
    <Menubar class="!bg-secundaria-250 !rounded-none !border-0">
      <template #start>
        <img src="@/assets/images/logo.png" alt="Logo" class="" width="140px"/>
      </template>
      <template #end>
        <div class="flex items-center gap-2">
          <div class="bg-secundaria-50 p-1 rounded flex items-center gap-2">
            <Icon icon="ic:round-notifications" width="32"/>
          </div>
          <div class="bg-secundaria-50 p-1 rounded flex items-center gap-2">
            <Avatar label="H" shape="circle" class="!bg-secundaria-800 !text-white font-bold"/>
            <span class="font-bold ">Henrique Mariano</span>
          </div>
        </div>
      </template>
    </Menubar>
  </div>
</template>

<style scoped>

</style>