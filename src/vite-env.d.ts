/// <reference types="vite/client" />

interface Window {
  ethereum?: {
    request: (args: { method: string }) => Promise<string[]>
    selectedAddress: string | null
    on: (event: string, callback: (accounts: string[]) => void) => void
  }
}