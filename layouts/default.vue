<script setup lang="ts">
import NavBar from "~/components/layout/NavBar.vue";
import NavBarMobile from "~/components/layout/NavBarMobile.vue";
import {useEhMobile} from "~/utils/ehMobile";
import MenuMobile from "~/components/layout/MenuMobile.vue";
import PanelMenuLateral from "~/components/layout/PanelMenuLateral.vue";


const { ehMobile } = useEhMobile()

</script>

<template>
  <div class="flex flex-col h-[100vh] bg-fundo">
    <NavBar v-if="!ehMobile"/>
    <NavBarMobile v-if="ehMobile"/>
    <div class="flex flex-col md:flex-row h-full ">
      <PanelMenuLateral v-if="!ehMobile" />
      <MenuMobile v-if="ehMobile" />
      <div class="p-4 w-full">
        <slot />
      </div>
    </div>
  </div>
</template>

<style>
label.required::after {
  content: " *";
  color: red;
  font-weight: bold;
}
</style>