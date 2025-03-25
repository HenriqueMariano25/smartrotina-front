<script setup lang="ts">
</script>
<template>
  <div>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>

<style>
.p-button{
  font-weight: bold;
}
.p-selectbutton > button{
  padding: 5px;
  background-color: rgb(229 231 235);
}
.p-selectbutton > .p-togglebutton-checked > span{
  background: white !important;
  border-radius: 0.25rem;
  padding-right: 5px;
  padding-left: 5px;
  padding-top: 3px;
  padding-bottom: 3px;
}
</style>