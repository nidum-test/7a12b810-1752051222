'use client'

import { useState, useEffect } from 'react'
import { 
  Plus, 
  Play, 
  Pause, 
  Edit, 
  Trash2, 
  BarChart3,
  Users,
  Mail,
  Clock,
  Target,
  Filter,
  Search
} from 'lucide-react'
import Link from 'next/link'
import { toast } from 'react-hot-toast'

interface Campaign {
  id: string
  name: string
  status: 'active' | 'paused' | 'completed' | 'draft'
  totalContacts: number
  emailsSent: number
  openRate: number
  replyRate: number
  clickRate: number
  bounceRate: number
  sequenceSteps: number
  createdAt: string
  updatedAt: string
  scheduledStart?: string
  estimatedCompletion?: string
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: '1',
      name: 'Q4 Sales Outreach',
      status: 'active',
      totalContacts: 1500,
      emailsSent: 1240,
      openRate: 38.5,
      replyRate: 14.2,
      clickRate: 8.7,
      bounceRate: 2.1,
      sequenceSteps: 3,
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-15T10:30:00Z',
      estimatedCompletion: '2024-02-15T10:30:00Z'
    },
    {
      id: '2',
      name: 'Partnership Prospects',
      status: 'paused',
      totalContacts: 800,
      emailsSent: 890,
      openRate: 29.1,
      replyRate: 8.3,
      clickRate: 4.2,
      bounceRate: 1.8,
      sequenceSteps: 4,
      createdAt: '2024-01-10T09:15:00Z',
      updatedAt: '2024-01-14T14:20:00Z',
      scheduledStart: '2024-01-20T09:00:00Z'
    },
    {
      id: '3',
      name: 'Product Launch Campaign',
      status: 'completed',
      totalContacts: 2200,
      emailsSent: 2140,
      openRate: 42.3,
      replyRate: 16.7,
      clickRate: 12.1,
      bounceRate: 1.4,
      sequenceSteps: 5,
      createdAt: '2024-01-05T08:00:00Z',
      updatedAt: '2024-01-12T18:30:00Z'
    },
    {
      id: '4',
      name: 'Holiday Promotion',
      status: 'draft',
      totalContacts: 0,
      emailsSent: 0,
      openRate: 0,
      replyRate: 0,
      clickRate: 0,
      bounceRate: 0,
      sequenceSteps: 2,
      createdAt: '2024-01-12T16:45:00Z',
      updatedAt: '2024-01-12T16:45:00Z'
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortBy, setSortBy] = useState('updated')

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const sortedCampaigns = [...filteredCampaigns].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name)
      case 'created':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case 'updated':
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      case 'performance':
        return b.replyRate - a.replyRate
      default:
        return 0
    }
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'paused':
        return 'bg-yellow-100 text-yellow-800'
      case 'completed':
        return 'bg-blue-100 text-blue-800'
      case 'draft':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleToggleCampaign = (campaignId: string) => {
    setCampaigns(campaigns.map(campaign => 
      campaign.id === campaignId 
        ? { 
            ...campaign, 
            status: campaign.status === 'active' ? 'paused' : 'active',
            updatedAt: new Date().toISOString()
          }
        : campaign
    ))
    toast.success('Campaign status updated')
  }

  const handleDeleteCampaign = (campaignId: string) => {
    setCampaigns(campaigns.filter(campaign => campaign.id !== campaignId))
    toast.success('Campaign deleted')
  }

  const totalStats = campaigns.reduce((acc, campaign) => ({
    totalContacts: acc.totalContacts + campaign.totalContacts,
    emailsSent: acc.emailsSent + campaign.emailsSent,
    avgOpenRate: campaigns.length > 0 ? campaigns.reduce((sum, c) => sum + c.openRate, 0) / campaigns.length : 0,
    avgReplyRate: campaigns.length > 0 ? campaigns.reduce((sum, c) => sum + c.replyRate, 0) / campaigns.length : 0,
  }), { totalContacts: 0, emailsSent: 0, avgOpenRate: 0, avgReplyRate: 0 })

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Campaigns</h1>
              <p className="mt-2 text-sm text-gray-600">
                Manage your email outreach campaigns and sequences
              </p>
            </div>
            <Link
              href="/dashboard/campaigns/new"
              className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Campaign
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Target className="h-8 w-8 text-primary-600" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">Total Campaigns</p>
                <p className="text-2xl font-bold text-gray-900">{campaigns.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">Total Contacts</p>
                <p className="text-2xl font-bold text-gray-900">{totalStats.totalContacts.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Mail className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">Emails Sent</p>
                <p className="text-2xl font-bold text-gray-900">{totalStats.emailsSent.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <BarChart3 className="h-8 w-8 text-yellow-600" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">Avg Reply Rate</p>
                <p className="text-2xl font-bold text-gray-900">{totalStats.avgReplyRate.toFixed(1)}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search campaigns..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="paused">Paused</option>
                <option value="completed">Completed</option>
                <option value="draft">Draft</option>
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="updated">Last Updated</option>
                <option value="created">Created Date</option>
                <option value="name">Name</option>
                <option value="performance">Performance</option>
              </select>
            </div>
          </div>
        </div>

        {/* Campaigns List */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Campaign
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Progress
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Performance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Updated
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedCampaigns.map((campaign) => (
                  <tr key={campaign.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                        <div className="text-sm text-gray-500">
                          {campaign.sequenceSteps} steps • {campaign.totalContacts.toLocaleString()} contacts
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(campaign.status)}`}>
                        {campaign.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {campaign.emailsSent.toLocaleString()} / {campaign.totalContacts.toLocaleString()} sent
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className="bg-primary-600 h-2 rounded-full"
                          style={{ width: campaign.totalContacts > 0 ? `${(campaign.emailsSent / campaign.totalContacts) * 100}%` : '0%' }}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <div>Open: {campaign.openRate}%</div>
                        <div>Reply: {campaign.replyRate}%</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(campaign.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleToggleCampaign(campaign.id)}
                          className="text-primary-600 hover:text-primary-900"
                          title={campaign.status === 'active' ? 'Pause campaign' : 'Start campaign'}
                        >
                          {campaign.status === 'active' ? (
                            <Pause className="h-4 w-4" />
                          ) : (
                            <Play className="h-4 w-4" />
                          )}
                        </button>
                        <Link
                          href={`/dashboard/campaigns/${campaign.id}`}
                          className="text-gray-400 hover:text-gray-600"
                          title="View campaign"
                        >
                          <BarChart3 className="h-4 w-4" />
                        </Link>
                        <Link
                          href={`/dashboard/campaigns/${campaign.id}/edit`}
                          className="text-gray-400 hover:text-gray-600"
                          title="Edit campaign"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleDeleteCampaign(campaign.id)}
                          className="text-gray-400 hover:text-red-600"
                          title="Delete campaign"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {sortedCampaigns.length === 0 && (
          <div className="text-center py-12">
            <Target className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No campaigns found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your filters or search terms.' 
                : 'Get started by creating your first campaign.'}
            </p>
            {!searchTerm && statusFilter === 'all' && (
              <div className="mt-6">
                <Link
                  href="/dashboard/campaigns/new"
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors inline-flex items-center"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Campaign
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}