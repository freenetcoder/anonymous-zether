import { ReactNode } from 'react'
import { useWeb3 } from '../context/Web3Context'

export function Layout({ children }: { children: ReactNode }) {
  const { account, connect, connecting } = useWeb3()

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <div className="flex flex-shrink-0 items-center">
                <h1 className="text-xl font-bold">Anonymous Zether</h1>
              </div>
            </div>
            <div className="flex items-center">
              {!account ? (
                <button
                  onClick={connect}
                  disabled={connecting}
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {connecting ? 'Connecting...' : 'Connect Wallet'}
                </button>
              ) : (
                <span className="text-sm text-gray-500">
                  {account.slice(0, 6)}...{account.slice(-4)}
                </span>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  )
}