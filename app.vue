<script setup>
  import { theme } from 'ant-design-vue';
</script>
<template>
  <div>
  <a-config-provider
     :theme="{
      algorithm: theme.defaultAlgorithm,
    }"
  >
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
   </a-config-provider>
   
  </div>
</template>
