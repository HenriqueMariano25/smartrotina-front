<script setup lang="ts">
import {Icon} from "@iconify/vue";
import {useAutenticacao} from "~/composable/login/useAutenticacao";
import {useAutenticacaoStore} from "~/stores/auth";

const menuRef = ref();

const items = ref([
  {
    label: 'Perfil',
    icon: 'ic:round-person',
  },
  {
    label: 'Trocar tema',
    icon: 'ic:round-color-lens'
  },
  {
    separator: true
  },
  {
    label: 'Sair',
    icon: 'ic:round-log-out',
    command: async () => {
      useAutenticacaoStore().logout()
    }
  }
]);

const toggle = (event: Event) => {
  event.stopPropagation();
  menuRef.value?.toggle(event)
};

const autenticacao = useAutenticacaoStore()
const nomeFormatado = autenticacao.usuario?.nome.split(' ')[0];

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
          <div
              aria-haspopup="true"
              aria-controls="overlay_tmenu"
              class="bg-secundaria-50 p-1 rounded flex items-center gap-2 px-2 cursor-pointer hover:bg-secundaria-100"
              @click="toggle">
            <Avatar label="H" shape="circle" class="!bg-secundaria-800 !text-white font-bold"/>
            <span class="font-bold">{{ nomeFormatado }}</span>
            <Menu
                id="overlay_tmenu"
                ref="menuRef"
                :model="items"
                :popup="true"
            >
              <template #item="{ item, props }">
                <a v-ripple class="flex items-center" v-bind="props.action">
                  <Icon v-if="item.icon" :icon="item?.icon" width="24"/>
                  <span :class="item.icon"/>
                  <span>{{ item.label }}</span>
                </a>
              </template>
            </Menu>
          </div>
        </div>
      </template>
    </Menubar>
  </div>
</template>

<style scoped>

</style>