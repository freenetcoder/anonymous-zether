import { useState } from 'react'
import { useZether } from '../context/ZetherContext'

export function Dashboard() {
  const { 
    balance,
    registered,
    loading,
    register,
    deposit,
    withdraw,
    transfer,
    addFriend,
    friends 
  } = useZether()

  const [amount, setAmount] = useState('')
  const [recipient, setRecipient] = useState('')
  const [friendName, setFriendName] = useState('')
  const [friendPublicKey, setFriendPublicKey] = useState('')
  const [selectedDecoys, setSelectedDecoys] = useState<string[]>([])
  const [beneficiary, setBeneficiary] = useState('')

  if (!registered) {
    return (
      <div className="text-center">
        <h2 className="mt-2 text-lg font-medium text-gray-900">Welcome to Anonymous Zether</h2>
        <p className="mt-1 text-sm text-gray-500">Get started by registering your account</p>
        <div className="mt-6">
          <button
            type="button"
            onClick={register}
            disabled={loading}
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-base font-semibold leading-6 text-gray-900">Account Balance</h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>Your current balance is: {balance}</p>
          </div>
          <div className="mt-5 space-y-4">
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                Amount
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => deposit(Number(amount))}
                disabled={loading}
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Deposit
              </button>
              <button
                onClick={() => withdraw(Number(amount))}
                disabled={loading}
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Withdraw
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-base font-semibold leading-6 text-gray-900">Transfer Funds</h3>
          <div className="mt-5 space-y-4">
            <div>
              <label htmlFor="recipient" className="block text-sm font-medium text-gray-700">
                Recipient
              </label>
              <select
                id="recipient"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              >
                <option value="">Select recipient</option>
                {friends.map((friend) => (
                  <option key={friend.name} value={friend.name}>
                    {friend.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="decoys" className="block text-sm font-medium text-gray-700">
                Decoys
              </label>
              <select
                id="decoys"
                multiple
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={selectedDecoys}
                onChange={(e) => setSelectedDecoys(Array.from(e.target.selectedOptions, option => option.value))}
              >
                {friends
                  .filter(friend => friend.name !== recipient)
                  .map((friend) => (
                    <option key={friend.name} value={friend.name}>
                      {friend.name}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label htmlFor="beneficiary" className="block text-sm font-medium text-gray-700">
                Beneficiary (Optional)
              </label>
              <select
                id="beneficiary"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={beneficiary}
                onChange={(e) => setBeneficiary(e.target.value)}
              >
                <option value="">Select beneficiary</option>
                {friends.map((friend) => (
                  <option key={friend.name} value={friend.name}>
                    {friend.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() => transfer(recipient, Number(amount), selectedDecoys, beneficiary || undefined)}
              disabled={loading || !recipient || !amount}
              className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Transfer
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-base font-semibold leading-6 text-gray-900">Add Friend</h3>
          <div className="mt-5 space-y-4">
            <div>
              <label htmlFor="friendName" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="friendName"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={friendName}
                onChange={(e) => setFriendName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="friendPublicKey" className="block text-sm font-medium text-gray-700">
                Public Key
              </label>
              <input
                type="text"
                id="friendPublicKey"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={friendPublicKey}
                onChange={(e) => setFriendPublicKey(e.target.value)}
                placeholder="Enter public key as comma-separated values"
              />
            </div>
            <button
              onClick={() => {
                const publicKey = friendPublicKey.split(',').map(k => k.trim())
                addFriend(friendName, publicKey)
                setFriendName('')
                setFriendPublicKey('')
              }}
              disabled={!friendName || !friendPublicKey}
              className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add Friend
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}