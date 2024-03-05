import { reconnect } from '@wagmi/core'
import { defaultWagmiConfig } from '@web3modal/wagmi'
import { createWeb3Modal } from '@web3modal/wagmi/vue'
import { UseWagmiPlugin } from 'use-wagmi'
import { arbitrum, mainnet } from 'viem/chains'

export default defineNuxtPlugin((nuxtApp) => {
  //const configRuntime = useRuntimeConfig()

  // 1. Define constants
   const projectId = "b602800e0a4465c2192ee8f48909d7be"

  // 2. Create wagmiConfig
  const metadata = {
    name: 'Web3Modal',
    description: 'Web3Modal Example',
    url: 'https://web3modal.com', // origin must match your domain & subdomain
    icons: ['https://avatars.githubusercontent.com/u/37784886']
  }
    
  const chains = [mainnet, arbitrum]
    const config = defaultWagmiConfig({
    chains, // required
    projectId, // required
    metadata, // required
    enableWalletConnect: true, // Optional - true by default
    enableInjected: true, // Optional - true by default
    enableEIP6963: true, // Optional - true by default
    enableCoinbase: true // Optional - true by default
  })
 reconnect(config)
  // 3. Create modal
  const web3Modal = createWeb3Modal({
    wagmiConfig: config,
    projectId,
    enableAnalytics: true // Optional - defaults to your Cloud configuration
  })
  console.log(web3Modal,'web3Modal');
  nuxtApp.vueApp.use(UseWagmiPlugin, { config })

  
})