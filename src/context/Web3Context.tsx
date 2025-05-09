import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import Web3 from 'web3'
import toast from 'react-hot-toast'

interface Web3ContextType {
  web3: Web3 | null
  account: string | null
  connecting: boolean
  connect: () => Promise<void>
}

const Web3Context = createContext<Web3ContextType>({
  web3: null,
  account: null,
  connecting: false,
  connect: async () => {},
})

export function Web3Provider({ children }: { children: ReactNode }) {
  const [web3, setWeb3] = useState<Web3 | null>(null)
  const [account, setAccount] = useState<string | null>(null)
  const [connecting, setConnecting] = useState(false)

  async function connect() {
    if (connecting) return
    setConnecting(true)

    try {
      if (!window.ethereum) {
        throw new Error('Please install MetaMask')
      }

      const web3Instance = new Web3(window.ethereum)
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      
      setWeb3(web3Instance)
      setAccount(accounts[0])
      
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        setAccount(accounts[0] || null)
      })

    } catch (error) {
      console.error('Failed to connect:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to connect')
    } finally {
      setConnecting(false)
    }
  }

  useEffect(() => {
    if (window.ethereum?.selectedAddress) {
      connect()
    }
  }, [])

  return (
    <Web3Context.Provider value={{ web3, account, connecting, connect }}>
      {children}
    </Web3Context.Provider>
  )
}

export function useWeb3() {
  return useContext(Web3Context)
}