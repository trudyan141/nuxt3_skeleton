<script setup>
 import { useWeb3Modal } from '@web3modal/wagmi/vue';
  // 4. Use modal composable
  const modal = useWeb3Modal()
</script>

<template>
   <w3m-button />
   <button @click="modal.open()">Open Connect Modal</button>
  <button @click="modal.open({ view: 'Networks' })">Open Network Modal</button>
</template>