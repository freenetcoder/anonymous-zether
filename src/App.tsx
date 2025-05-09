import { useState, useEffect } from 'react'
import { Web3Provider } from './context/Web3Context'
import { ZetherProvider } from './context/ZetherContext'
import { Layout } from './components/Layout'
import { Dashboard } from './components/Dashboard'
import { Toaster } from 'react-hot-toast'

function App() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <Web3Provider>
      <ZetherProvider>
        <Layout>
          <Dashboard />
        </Layout>
        <Toaster position="bottom-right" />
      </ZetherProvider>
    </Web3Provider>
  )
}

export default App