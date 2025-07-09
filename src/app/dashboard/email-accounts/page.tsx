'use client'

import { useState, useEffect } from 'react'
import { 
  Mail, 
  Plus, 
  Settings, 
  CheckCircle, 
  AlertCircle,
  XCircle,
  ExternalLink,
  Trash2,
  Edit
} from 'lucide-react'
import { toast } from 'react-hot-toast'

interface EmailAccount {
  id: string
  email: string
  provider: 'gmail' | 'outlook' | 'smtp'
  status: 'connected' | 'disconnected' | 'warming' | 'error'
  dailyLimit: number
  sentToday: number
  warmupEnabled: boolean
  deliverability: number
  reputation: 'excellent' | 'good' | 'fair' | 'poor'
  lastActivity: string
  createdAt: string
}

export default function EmailAccountsPage() {
  const [accounts, setAccounts] = useState<EmailAccount[]>([
    {
      id: '1',
      email: 'john.doe@company.com',
      provider: 'gmail',
      status: 'connected',
      dailyLimit: 200,
      sentToday: 45,
      warmupEnabled: true,
      deliverability: 95,
      reputation: 'excellent',
      lastActivity: '2024-01-15T10:30:00Z',
      createdAt: '2024-01-01T00:00:00Z'
    },
    {
      id: '2',
      email: 'sales@company.com',
      provider: 'outlook',
      status: 'warming',
      dailyLimit: 150,
      sentToday: 12,
      warmupEnabled: true,
      deliverability: 78,
      reputation: 'good',
      lastActivity: '2024-01-15T09:15:00Z',
      createdAt: '2024-01-10T00:00:00Z'
    },
    {
      id: '3',
      email: 'outreach@company.com',
      provider: 'smtp',
      status: 'error',
      dailyLimit: 100,
      sentToday: 0,
      warmupEnabled: false,
      deliverability: 45,
      reputation: 'poor',
      lastActivity: '2024-01-14T16:20:00Z',
      createdAt: '2024-01-12T00:00:00Z'
    }
  ])

  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedProvider, setSelectedProvider] = useState<'gmail' | 'outlook' | 'smtp'>('gmail')

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'warming':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return <XCircle className="h-5 w-5 text-gray-500" />
    }
  }

  const getProviderLogo = (provider: string) => {
    switch (provider) {
      case 'gmail':
        return <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">G</div>
      case 'outlook':
        return <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">O</div>
      case 'smtp':
        return <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center text-white text-xs font-bold">S</div>
      default:
        return <Mail className="h-6 w-6 text-gray-500" />
    }
  }

  const handleConnectAccount = async (provider: string) => {
    if (provider === 'gmail' || provider === 'outlook') {
      // In real app, redirect to OAuth flow
      toast.success(`Redirecting to ${provider} OAuth...`)
      setTimeout(() => {
        toast.success('Account connected successfully!')
        setShowAddModal(false)
      }, 2000)
    } else {
      // Show SMTP configuration form
      setShowAddModal(false)
      toast.success('Opening SMTP configuration...')
    }
  }

  const handleToggleWarmup = (accountId: string) => {
    setAccounts(accounts.map(account => 
      account.id === accountId 
        ? { ...account, warmupEnabled: !account.warmupEnabled }
        : account
    ))
    toast.success('Warmup settings updated')
  }

  const handleDeleteAccount = (accountId: string) => {
    setAccounts(accounts.filter(account => account.id !== accountId))
    toast.success('Account removed')
  }

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Email Accounts</h1>
              <p className="mt-2 text-sm text-gray-600">
                Manage your email accounts and sending infrastructure
              </p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Account
            </button>
          </div>
        </div>

        {/* Accounts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {accounts.map((account) => (
            <div key={account.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    {getProviderLogo(account.provider)}
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-900">{account.email}</h3>
                      <p className="text-xs text-gray-500 capitalize">{account.provider}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(account.status)}
                    <span className="text-xs text-gray-500 capitalize">{account.status}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Daily Limit</span>
                    <span className="text-sm font-medium text-gray-900">
                      {account.sentToday}/{account.dailyLimit}
                    </span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary-600 h-2 rounded-full"
                      style={{ width: `${(account.sentToday / account.dailyLimit) * 100}%` }}
                    />
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Deliverability</span>
                    <span className="text-sm font-medium text-gray-900">{account.deliverability}%</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Reputation</span>
                    <span className={`text-sm font-medium ${
                      account.reputation === 'excellent' ? 'text-green-600' :
                      account.reputation === 'good' ? 'text-blue-600' :
                      account.reputation === 'fair' ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {account.reputation}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Warmup</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={account.warmupEnabled}
                        onChange={() => handleToggleWarmup(account.id)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      Last activity: {new Date(account.lastActivity).toLocaleDateString()}
                    </span>
                    <div className="flex space-x-2">
                      <button className="text-gray-400 hover:text-gray-600">
                        <Settings className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteAccount(account.id)}
                        className="text-gray-400 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Account Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Add Email Account</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Choose Provider
                  </label>
                  <div className="grid grid-cols-1 gap-3">
                    <button
                      onClick={() => handleConnectAccount('gmail')}
                      className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg hover:border-primary-300 transition-colors"
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                          G
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">Gmail</div>
                          <div className="text-xs text-gray-500">Connect via OAuth</div>
                        </div>
                      </div>
                      <ExternalLink className="h-4 w-4 text-gray-400" />
                    </button>

                    <button
                      onClick={() => handleConnectAccount('outlook')}
                      className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg hover:border-primary-300 transition-colors"
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                          O
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">Outlook</div>
                          <div className="text-xs text-gray-500">Connect via OAuth</div>
                        </div>
                      </div>
                      <ExternalLink className="h-4 w-4 text-gray-400" />
                    </button>

                    <button
                      onClick={() => handleConnectAccount('smtp')}
                      className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg hover:border-primary-300 transition-colors"
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                          S
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">SMTP/IMAP</div>
                          <div className="text-xs text-gray-500">Manual configuration</div>
                        </div>
                      </div>
                      <Settings className="h-4 w-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}