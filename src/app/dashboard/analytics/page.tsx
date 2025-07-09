'use client'

import { useState, useEffect } from 'react'
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Mail, 
  MousePointer,
  AlertCircle,
  Download,
  Filter,
  Calendar
} from 'lucide-react'
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('30d')
  const [selectedCampaign, setSelectedCampaign] = useState('all')

  const performanceData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Open Rate',
        data: [32, 38, 35, 42],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Reply Rate',
        data: [8, 12, 10, 15],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Click Rate',
        data: [5, 8, 7, 11],
        borderColor: 'rgb(245, 158, 11)',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        tension: 0.4,
      },
    ],
  }

  const emailVolumeData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sent',
        data: [1200, 1900, 3000, 2500, 3200, 2800],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
      },
      {
        label: 'Delivered',
        data: [1150, 1820, 2880, 2400, 3080, 2700],
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
      },
      {
        label: 'Bounced',
        data: [50, 80, 120, 100, 120, 100],
        backgroundColor: 'rgba(239, 68, 68, 0.8)',
      },
    ],
  }

  const responseTypeData = {
    labels: ['Positive', 'Negative', 'Neutral', 'Unsubscribe'],
    datasets: [
      {
        data: [65, 15, 18, 2],
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(107, 114, 128, 0.8)',
          'rgba(245, 158, 11, 0.8)',
        ],
        borderColor: [
          'rgb(16, 185, 129)',
          'rgb(239, 68, 68)',
          'rgb(107, 114, 128)',
          'rgb(245, 158, 11)',
        ],
        borderWidth: 1,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  }

  const stats = [
    {
      name: 'Total Emails Sent',
      value: '15,420',
      change: '+12.3%',
      changeType: 'positive',
      icon: Mail,
    },
    {
      name: 'Average Open Rate',
      value: '34.2%',
      change: '+2.4%',
      changeType: 'positive',
      icon: BarChart3,
    },
    {
      name: 'Average Reply Rate',
      value: '12.8%',
      change: '+1.2%',
      changeType: 'positive',
      icon: Users,
    },
    {
      name: 'Average Click Rate',
      value: '8.5%',
      change: '-0.5%',
      changeType: 'negative',
      icon: MousePointer,
    },
  ]

  const campaignPerformance = [
    {
      name: 'Q4 Sales Outreach',
      sent: 1240,
      delivered: 1198,
      opened: 476,
      clicked: 95,
      replied: 176,
      openRate: 38.5,
      replyRate: 14.2,
      clickRate: 7.9,
    },
    {
      name: 'Partnership Prospects',
      sent: 890,
      delivered: 874,
      opened: 254,
      clicked: 37,
      replied: 73,
      openRate: 29.1,
      replyRate: 8.3,
      clickRate: 4.2,
    },
    {
      name: 'Product Launch Campaign',
      sent: 2140,
      delivered: 2110,
      opened: 893,
      clicked: 255,
      replied: 352,
      openRate: 42.3,
      replyRate: 16.7,
      clickRate: 12.1,
    },
  ]

  const handleExportData = () => {
    // In real app, generate and download CSV/PDF report
    const csvData = campaignPerformance.map(campaign => ({
      Campaign: campaign.name,
      Sent: campaign.sent,
      Delivered: campaign.delivered,
      'Open Rate': `${campaign.openRate}%`,
      'Reply Rate': `${campaign.replyRate}%`,
      'Click Rate': `${campaign.clickRate}%`,
    }))
    
    console.log('Exporting data:', csvData)
    // toast.success('Report exported successfully')
  }

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
              <p className="mt-2 text-sm text-gray-600">
                Track your email campaign performance and engagement metrics
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              <button
                onClick={handleExportData}
                className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className="flex-shrink-0">
                  <stat.icon className="h-8 w-8 text-gray-400" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                {stat.changeType === 'positive' ? (
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                )}
                <span className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500 ml-1">vs last period</span>
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Performance Trends
            </h3>
            <Line data={performanceData} options={chartOptions} />
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Email Volume
            </h3>
            <Bar data={emailVolumeData} options={chartOptions} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Response Types
            </h3>
            <div className="h-64">
              <Doughnut data={responseTypeData} options={doughnutOptions} />
            </div>
          </div>

          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Top Performing Campaigns
            </h3>
            <div className="space-y-4">
              {campaignPerformance.map((campaign, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{campaign.name}</h4>
                    <p className="text-sm text-gray-600">
                      {campaign.sent.toLocaleString()} sent • {campaign.delivered.toLocaleString()} delivered
                    </p>
                  </div>
                  <div className="flex space-x-4 text-sm">
                    <div className="text-center">
                      <div className="font-medium text-gray-900">{campaign.openRate}%</div>
                      <div className="text-gray-500">Open</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-gray-900">{campaign.replyRate}%</div>
                      <div className="text-gray-500">Reply</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-gray-900">{campaign.clickRate}%</div>
                      <div className="text-gray-500">Click</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Table */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Campaign Performance Details
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Campaign
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sent
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Delivered
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Opened
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Clicked
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Replied
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Open Rate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reply Rate
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {campaignPerformance.map((campaign, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {campaign.sent.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {campaign.delivered.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {campaign.opened.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {campaign.clicked.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {campaign.replied.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {campaign.openRate}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {campaign.replyRate}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}