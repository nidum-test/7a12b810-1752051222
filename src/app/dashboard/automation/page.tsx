'use client'

import { useState } from 'react'
import { 
  Zap, 
  Play, 
  Pause, 
  Settings, 
  TrendingUp,
  Mail,
  Shield,
  Clock,
  Target,
  CheckCircle,
  AlertCircle,
  Plus
} from 'lucide-react'
import { toast } from 'react-hot-toast'

interface WarmupAccount {
  id: string
  email: string
  provider: string
  status: 'active' | 'paused' | 'warming' | 'error'
  warmupDays: number
  dailyEmails: number
  deliverabilityScore: number
  reputationTrend: 'up' | 'down' | 'stable'
  lastActivity: string
}

interface AutomationRule {
  id: string
  name: string
  trigger: string
  action: string
  status: 'active' | 'paused'
  conditions: string[]
  lastTriggered?: string
}

export default function AutomationPage() {
  const [warmupAccounts, setWarmupAccounts] = useState<WarmupAccount[]>([
    {
      id: '1',
      email: 'john.doe@company.com',
      provider: 'Gmail',
      status: 'active',
      warmupDays: 15,
      dailyEmails: 25,
      deliverabilityScore: 95,
      reputationTrend: 'up',
      lastActivity: '2 hours ago'
    },
    {
      id: '2',
      email: 'sales@company.com',
      provider: 'Outlook',
      status: 'warming',
      warmupDays: 8,
      dailyEmails: 18,
      deliverabilityScore: 78,
      reputationTrend: 'up',
      lastActivity: '30 minutes ago'
    },
    {
      id: '3',
      email: 'outreach@company.com',
      provider: 'SMTP',
      status: 'error',
      warmupDays: 0,
      dailyEmails: 0,
      deliverabilityScore: 45,
      reputationTrend: 'down',
      lastActivity: '1 day ago'
    }
  ])

  const [automationRules, setAutomationRules] = useState<AutomationRule[]>([
    {
      id: '1',
      name: 'Reply Detection',
      trigger: 'Email reply received',
      action: 'Remove from sequence',
      status: 'active',
      conditions: ['Contains positive keywords', 'Not auto-reply'],
      lastTriggered: '5 minutes ago'
    },
    {
      id: '2',
      name: 'Bounce Handler',
      trigger: 'Hard bounce detected',
      action: 'Mark contact as invalid',
      status: 'active',
      conditions: ['Bounce type: permanent', 'Not temporary failure'],
      lastTriggered: '1 hour ago'
    },
    {
      id: '3',
      name: 'Unsubscribe Processor',
      trigger: 'Unsubscribe request',
      action: 'Add to suppression list',
      status: 'active',
      conditions: ['Contains unsubscribe keywords', 'Valid email format'],
      lastTriggered: '3 hours ago'
    },
    {
      id: '4',
      name: 'Engagement Optimizer',
      trigger: 'Low open rate detected',
      action: 'Pause campaign',
      status: 'paused',
      conditions: ['Open rate < 20%', 'Minimum 100 emails sent'],
      lastTriggered: undefined
    }
  ])

  const [activeTab, setActiveTab] = useState('warmup')

  const handleToggleWarmup = (accountId: string) => {
    setWarmupAccounts(accounts => 
      accounts.map(account => 
        account.id === accountId 
          ? { 
              ...account, 
              status: account.status === 'active' ? 'paused' : 'active'
            }
          : account
      )
    )
    toast.success('Warmup status updated')
  }

  const handleToggleRule = (ruleId: string) => {
    setAutomationRules(rules => 
      rules.map(rule => 
        rule.id === ruleId 
          ? { 
              ...rule, 
              status: rule.status === 'active' ? 'paused' : 'active'
            }
          : rule
      )
    )
    toast.success('Automation rule updated')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'warming':
        return 'bg-yellow-100 text-yellow-800'
      case 'paused':
        return 'bg-gray-100 text-gray-800'
      case 'error':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case 'down':
        return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />
      default:
        return <div className="h-4 w-4 bg-gray-400 rounded-full" />
    }
  }

  const warmupStats = {
    totalAccounts: warmupAccounts.length,
    activeAccounts: warmupAccounts.filter(a => a.status === 'active').length,
    avgDeliverability: warmupAccounts.reduce((sum, a) => sum + a.deliverabilityScore, 0) / warmupAccounts.length,
    dailyEmails: warmupAccounts.reduce((sum, a) => sum + a.dailyEmails, 0)
  }

  const automationStats = {
    totalRules: automationRules.length,
    activeRules: automationRules.filter(r => r.status === 'active').length,
    recentTriggers: automationRules.filter(r => r.lastTriggered).length,
    efficiency: 95
  }

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Automation & Warmup</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage email warming and automation rules to optimize deliverability
          </p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('warmup')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'warmup'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Email Warmup
            </button>
            <button
              onClick={() => setActiveTab('automation')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'automation'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Automation Rules
            </button>
          </nav>
        </div>

        {activeTab === 'warmup' && (
          <div className="space-y-6">
            {/* Warmup Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Mail className="h-8 w-8 text-primary-600" />
                  </div>
                  <div className="ml-5">
                    <p className="text-sm font-medium text-gray-500">Total Accounts</p>
                    <p className="text-2xl font-bold text-gray-900">{warmupStats.totalAccounts}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Zap className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="ml-5">
                    <p className="text-sm font-medium text-gray-500">Active Warming</p>
                    <p className="text-2xl font-bold text-gray-900">{warmupStats.activeAccounts}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Shield className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="ml-5">
                    <p className="text-sm font-medium text-gray-500">Avg Deliverability</p>
                    <p className="text-2xl font-bold text-gray-900">{warmupStats.avgDeliverability.toFixed(1)}%</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Clock className="h-8 w-8 text-yellow-600" />
                  </div>
                  <div className="ml-5">
                    <p className="text-sm font-medium text-gray-500">Daily Emails</p>
                    <p className="text-2xl font-bold text-gray-900">{warmupStats.dailyEmails}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Warmup Accounts */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">Warmup Accounts</h3>
                  <button className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors flex items-center">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Account
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Account
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Warmup Progress
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Deliverability
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Daily Emails
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Activity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {warmupAccounts.map((account) => (
                      <tr key={account.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                                <Mail className="h-5 w-5 text-primary-600" />
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{account.email}</div>
                              <div className="text-sm text-gray-500">{account.provider}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(account.status)}`}>
                            {account.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{account.warmupDays} days</div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div 
                              className="bg-primary-600 h-2 rounded-full"
                              style={{ width: `${Math.min((account.warmupDays / 30) * 100, 100)}%` }}
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="text-sm font-medium text-gray-900">{account.deliverabilityScore}%</span>
                            <div className="ml-2">{getTrendIcon(account.reputationTrend)}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {account.dailyEmails}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {account.lastActivity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleToggleWarmup(account.id)}
                              className="text-primary-600 hover:text-primary-900"
                            >
                              {account.status === 'active' ? (
                                <Pause className="h-4 w-4" />
                              ) : (
                                <Play className="h-4 w-4" />
                              )}
                            </button>
                            <button className="text-gray-400 hover:text-gray-600">
                              <Settings className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'automation' && (
          <div className="space-y-6">
            {/* Automation Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Target className="h-8 w-8 text-primary-600" />
                  </div>
                  <div className="ml-5">
                    <p className="text-sm font-medium text-gray-500">Total Rules</p>
                    <p className="text-2xl font-bold text-gray-900">{automationStats.totalRules}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="ml-5">
                    <p className="text-sm font-medium text-gray-500">Active Rules</p>
                    <p className="text-2xl font-bold text-gray-900">{automationStats.activeRules}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Zap className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="ml-5">
                    <p className="text-sm font-medium text-gray-500">Recent Triggers</p>
                    <p className="text-2xl font-bold text-gray-900">{automationStats.recentTriggers}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <TrendingUp className="h-8 w-8 text-yellow-600" />
                  </div>
                  <div className="ml-5">
                    <p className="text-sm font-medium text-gray-500">Efficiency</p>
                    <p className="text-2xl font-bold text-gray-900">{automationStats.efficiency}%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Automation Rules */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">Automation Rules</h3>
                  <button className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors flex items-center">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Rule
                  </button>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                {automationRules.map((rule) => (
                  <div key={rule.id} className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center">
                          <h4 className="text-lg font-medium text-gray-900">{rule.name}</h4>
                          <span className={`ml-3 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(rule.status)}`}>
                            {rule.status}
                          </span>
                        </div>
                        <div className="mt-2 text-sm text-gray-600">
                          <p><strong>Trigger:</strong> {rule.trigger}</p>
                          <p><strong>Action:</strong> {rule.action}</p>
                        </div>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            <strong>Conditions:</strong> {rule.conditions.join(', ')}
                          </p>
                          {rule.lastTriggered && (
                            <p className="text-sm text-gray-500 mt-1">
                              <strong>Last triggered:</strong> {rule.lastTriggered}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleToggleRule(rule.id)}
                          className="text-primary-600 hover:text-primary-900"
                        >
                          {rule.status === 'active' ? (
                            <Pause className="h-5 w-5" />
                          ) : (
                            <Play className="h-5 w-5" />
                          )}
                        </button>
                        <button className="text-gray-400 hover:text-gray-600">
                          <Settings className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}