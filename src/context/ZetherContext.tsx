import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useWeb3 } from './Web3Context'
import Client from '@anonymous-zether/anonymous.js/src/client.js'
import toast from 'react-hot-toast'

interface Friend {
  name: string
  publicKey: string[]
}

interface ZetherContextType {
  client: typeof Client | null
  balance: number
  friends: Friend[]
  loading: boolean
  registered: boolean
  register: () => Promise<void>
  deposit: (amount: number) => Promise<void>
  withdraw: (amount: number) => Promise<void>
  transfer: (to: string, amount: number, decoys?: string[], beneficiary?: string) => Promise<void>
  addFriend: (name: string, publicKey: string[]) => void
}

const ZetherContext = createContext<ZetherContextType>({
  client: null,
  balance: 0,
  friends: [],
  loading: false,
  registered: false,
  register: async () => {},
  deposit: async () => {},
  withdraw: async () => {},
  transfer: async () => {},
  addFriend: () => {},
})

export function ZetherProvider({ children }: { children: ReactNode }) {
  const { web3, account } = useWeb3()
  const [client, setClient] = useState<typeof Client | null>(null)
  const [balance, setBalance] = useState(0)
  const [friends, setFriends] = useState<Friend[]>([])
  const [loading, setLoading] = useState(false)
  const [registered, setRegistered] = useState(false)

  useEffect(() => {
    if (web3 && account) {
      initializeClient()
    }
  }, [web3, account])

  async function initializeClient() {
    try {
      // Initialize client with contract addresses
      // This needs to be updated with actual deployed contract addresses
      const zsc = {} // TODO: Initialize with actual ZSC contract
      const client = new Client(web3, zsc, account)
      setClient(client)
    } catch (error) {
      console.error('Failed to initialize Zether client:', error)
      toast.error('Failed to initialize Zether client')
    }
  }

  async function register() {
    if (!client) return
    setLoading(true)
    try {
      await client.register()
      setRegistered(true)
      toast.success('Successfully registered')
    } catch (error) {
      console.error('Registration failed:', error)
      toast.error('Registration failed')
    } finally {
      setLoading(false)
    }
  }

  async function deposit(amount: number) {
    if (!client) return
    setLoading(true)
    try {
      await client.deposit(amount)
      toast.success(`Successfully deposited ${amount}`)
    } catch (error) {
      console.error('Deposit failed:', error)
      toast.error('Deposit failed')
    } finally {
      setLoading(false)
    }
  }

  async function withdraw(amount: number) {
    if (!client) return
    setLoading(true)
    try {
      await client.withdraw(amount)
      toast.success(`Successfully withdrew ${amount}`)
    } catch (error) {
      console.error('Withdrawal failed:', error)
      toast.error('Withdrawal failed')
    } finally {
      setLoading(false)
    }
  }

  async function transfer(to: string, amount: number, decoys: string[] = [], beneficiary?: string) {
    if (!client) return
    setLoading(true)
    try {
      await client.transfer(to, amount, decoys, beneficiary)
      toast.success(`Successfully transferred ${amount} to ${to}`)
    } catch (error) {
      console.error('Transfer failed:', error)
      toast.error('Transfer failed')
    } finally {
      setLoading(false)
    }
  }

  function addFriend(name: string, publicKey: string[]) {
    setFriends(prev => [...prev, { name, publicKey }])
    if (client) {
      client.friends.add(name, publicKey)
    }
    toast.success(`Added ${name} as friend`)
  }

  return (
    <ZetherContext.Provider 
      value={{
        client,
        balance,
        friends,
        loading,
        registered,
        register,
        deposit,
        withdraw,
        transfer,
        addFriend,
      }}
    >
      {children}
    </ZetherContext.Provider>
  )
}

export function useZether() {
  return useContext(ZetherContext)
}