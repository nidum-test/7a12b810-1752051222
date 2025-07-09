'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Wand2,
  Clock,
  Users,
  Mail,
  Target,
  Settings,
  Save,
  Play
} from 'lucide-react'
import Link from 'next/link'
import { toast } from 'react-hot-toast'

interface EmailSequence {
  id: string
  subject: string
  content: string
  waitDays: number
  type: 'initial' | 'follow-up'
}

interface CampaignSettings {
  dailyLimit: number
  timezone: string
  sendingHours: {
    start: string
    end: string
  }
  workingDays: string[]
  trackOpens: boolean
  trackClicks: boolean
  unsubscribeLink: boolean
}

export default function NewCampaignPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  
  const [campaignData, setCampaignData] = useState({
    name: '',
    description: '',
    fromEmail: '',
    replyToEmail: '',
    contactList: null as File | null,
    sequences: [
      {
        id: '1',
        subject: '',
        content: '',
        waitDays: 0,
        type: 'initial' as const
      }
    ] as EmailSequence[],
    settings: {
      dailyLimit: 50,
      timezone: 'America/New_York',
      sendingHours: {
        start: '09:00',
        end: '17:00'
      },
      workingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
      trackOpens: true,
      trackClicks: true,
      unsubscribeLink: true
    } as CampaignSettings
  })

  const steps = [
    { id: 1, name: 'Basic Info', icon: Target },
    { id: 2, name: 'Sequences', icon: Mail },
    { id: 3, name: 'Settings', icon: Settings },
    { id: 4, name: 'Review', icon: Users }
  ]

  const handleAddSequence = () => {
    const newSequence: EmailSequence = {
      id: Date.now().toString(),
      subject: '',
      content: '',
      waitDays: 3,
      type: 'follow-up'
    }
    setCampaignData(prev => ({
      ...prev,
      sequences: [...prev.sequences, newSequence]
    }))
  }

  const handleRemoveSequence = (sequenceId: string) => {
    setCampaignData(prev => ({
      ...prev,
      sequences: prev.sequences.filter(seq => seq.id !== sequenceId)
    }))
  }

  const handleSequenceChange = (sequenceId: string, field: keyof EmailSequence, value: string | number) => {
    setCampaignData(prev => ({
      ...prev,
      sequences: prev.sequences.map(seq => 
        seq.id === sequenceId ? { ...seq, [field]: value } : seq
      )
    }))
  }

  const handleGenerateWithAI = async (sequenceId: string, type: 'subject' | 'content') => {
    toast.success('AI generation feature coming soon!')
    // In real app, call OpenAI API
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setCampaignData(prev => ({ ...prev, contactList: file }))
      toast.success('Contact list uploaded')
    }
  }

  const handleSaveCampaign = async (isDraft: boolean = false) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast.success(isDraft ? 'Campaign saved as draft' : 'Campaign created successfully!')
      router.push('/dashboard/campaigns')
    } catch (error) {
      toast.error('Failed to save campaign')
    } finally {
      setIsLoading(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Campaign Name *
              </label>
              <input
                type="text"
                value={campaignData.name}
                onChange={(e) => setCampaignData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter campaign name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={campaignData.description}
                onChange={(e) => setCampaignData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Describe your campaign"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  From Email *
                </label>
                <select
                  value={campaignData.fromEmail}
                  onChange={(e) => setCampaignData(prev => ({ ...prev, fromEmail: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Select email account</option>
                  <option value="john.doe@company.com">john.doe@company.com</option>
                  <option value="sales@company.com">sales@company.com</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reply-To Email
                </label>
                <input
                  type="email"
                  value={campaignData.replyToEmail}
                  onChange={(e) => setCampaignData(prev => ({ ...prev, replyToEmail: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="reply@company.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact List *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept=".csv,.xlsx"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="contact-upload"
                />
                <label htmlFor="contact-upload" className="cursor-pointer">
                  <Users className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 mb-2">
                    {campaignData.contactList 
                      ? `File: ${campaignData.contactList.name}`
                      : 'Upload CSV or Excel file with contacts'
                    }
                  </p>
                  <p className="text-xs text-gray-500">
                    Required columns: email, first_name, last_name
                  </p>
                </label>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Email Sequences</h3>
              <button
                onClick={handleAddSequence}
                className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Follow-up
              </button>
            </div>

            {campaignData.sequences.map((sequence, index) => (
              <div key={sequence.id} className="bg-gray-50 rounded-lg p-6 border">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-md font-medium text-gray-900">
                    {sequence.type === 'initial' ? 'Initial Email' : `Follow-up ${index}`}
                  </h4>
                  {sequence.type === 'follow-up' && (
                    <button
                      onClick={() => handleRemoveSequence(sequence.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {sequence.type === 'follow-up' && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Wait Days
                    </label>
                    <input
                      type="number"
                      value={sequence.waitDays}
                      onChange={(e) => handleSequenceChange(sequence.id, 'waitDays', parseInt(e.target.value))}
                      className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      min="1"
                      max="30"
                    />
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Subject Line
                      </label>
                      <button
                        onClick={() => handleGenerateWithAI(sequence.id, 'subject')}
                        className="text-primary-600 hover:text-primary-700 text-sm flex items-center"
                      >
                        <Wand2 className="h-4 w-4 mr-1" />
                        AI Generate
                      </button>
                    </div>
                    <input
                      type="text"
                      value={sequence.subject}
                      onChange={(e) => handleSequenceChange(sequence.id, 'subject', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter subject line"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Email Content
                      </label>
                      <button
                        onClick={() => handleGenerateWithAI(sequence.id, 'content')}
                        className="text-primary-600 hover:text-primary-700 text-sm flex items-center"
                      >
                        <Wand2 className="h-4 w-4 mr-1" />
                        AI Generate
                      </button>
                    </div>
                    <textarea
                      value={sequence.content}
                      onChange={(e) => handleSequenceChange(sequence.id, 'content', e.target.value)}
                      rows={8}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter email content. Use variables like {{first_name}}, {{company}}, {{custom_note}}"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Available variables: {{first_name}}, {{last_name}}, {{company}}, {{custom_note}}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Daily Sending Limit
              </label>
              <input
                type="number"
                value={campaignData.settings.dailyLimit}
                onChange={(e) => setCampaignData(prev => ({
                  ...prev,
                  settings: { ...prev.settings, dailyLimit: parseInt(e.target.value) }
                }))}
                className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                min="1"
                max="1000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Timezone
              </label>
              <select
                value={campaignData.settings.timezone}
                onChange={(e) => setCampaignData(prev => ({
                  ...prev,
                  settings: { ...prev.settings, timezone: e.target.value }
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="America/New_York">Eastern Time (EST)</option>
                <option value="America/Chicago">Central Time (CST)</option>
                <option value="America/Denver">Mountain Time (MST)</option>
                <option value="America/Los_Angeles">Pacific Time (PST)</option>
                <option value="Europe/London">London (GMT)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sending Hours
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Start Time</label>
                  <input
                    type="time"
                    value={campaignData.settings.sendingHours.start}
                    onChange={(e) => setCampaignData(prev => ({
                      ...prev,
                      settings: { 
                        ...prev.settings, 
                        sendingHours: { ...prev.settings.sendingHours, start: e.target.value }
                      }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">End Time</label>
                  <input
                    type="time"
                    value={campaignData.settings.sendingHours.end}
                    onChange={(e) => setCampaignData(prev => ({
                      ...prev,
                      settings: { 
                        ...prev.settings, 
                        sendingHours: { ...prev.settings.sendingHours, end: e.target.value }
                      }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Working Days
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map(day => (
                  <label key={day} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={campaignData.settings.workingDays.includes(day)}
                      onChange={(e) => {
                        const newWorkingDays = e.target.checked
                          ? [...campaignData.settings.workingDays, day]
                          : campaignData.settings.workingDays.filter(d => d !== day)
                        setCampaignData(prev => ({
                          ...prev,
                          settings: { ...prev.settings, workingDays: newWorkingDays }
                        }))
                      }}
                      className="mr-2"
                    />
                    <span className="text-sm capitalize">{day}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={campaignData.settings.trackOpens}
                  onChange={(e) => setCampaignData(prev => ({
                    ...prev,
                    settings: { ...prev.settings, trackOpens: e.target.checked }
                  }))}
                  className="mr-2"
                />
                <span className="text-sm">Track email opens</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={campaignData.settings.trackClicks}
                  onChange={(e) => setCampaignData(prev => ({
                    ...prev,
                    settings: { ...prev.settings, trackClicks: e.target.checked }
                  }))}
                  className="mr-2"
                />
                <span className="text-sm">Track link clicks</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={campaignData.settings.unsubscribeLink}
                  onChange={(e) => setCampaignData(prev => ({
                    ...prev,
                    settings: { ...prev.settings, unsubscribeLink: e.target.checked }
                  }))}
                  className="mr-2"
                />
                <span className="text-sm">Include unsubscribe link</span>
              </label>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Campaign Summary</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Basic Information</h4>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-gray-600">Name:</span> {campaignData.name}</p>
                    <p><span className="text-gray-600">From:</span> {campaignData.fromEmail}</p>
                    <p><span className="text-gray-600">Contacts:</span> {campaignData.contactList?.name || 'None'}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Sequences</h4>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-gray-600">Total steps:</span> {campaignData.sequences.length}</p>
                    <p><span className="text-gray-600">Daily limit:</span> {campaignData.settings.dailyLimit}</p>
                    <p><span className="text-gray-600">Timezone:</span> {campaignData.settings.timezone}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-medium text-yellow-800 mb-2">Pre-launch Checklist</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>✓ Campaign name and description set</li>
                <li>✓ Email sequences configured</li>
                <li>✓ Sending settings configured</li>
                <li>{campaignData.contactList ? '✓' : '✗'} Contact list uploaded</li>
                <li>✓ Unsubscribe link included</li>
              </ul>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="py-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center">
            <Link
              href="/dashboard/campaigns"
              className="text-gray-400 hover:text-gray-600 mr-4"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Create New Campaign</h1>
              <p className="mt-2 text-sm text-gray-600">
                Set up your email outreach campaign with sequences and automation
              </p>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <nav className="flex justify-center">
            <ol className="flex items-center space-x-8">
              {steps.map((step) => (
                <li key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                    currentStep >= step.id 
                      ? 'bg-primary-600 border-primary-600 text-white' 
                      : 'border-gray-300 text-gray-300'
                  }`}>
                    <step.icon className="h-4 w-4" />
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    currentStep >= step.id ? 'text-primary-600' : 'text-gray-500'
                  }`}>
                    {step.name}
                  </span>
                </li>
              ))}
            </ol>
          </nav>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>

          <div className="flex space-x-3">
            <button
              onClick={() => handleSaveCampaign(true)}
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
            >
              <Save className="h-4 w-4 mr-2" />
              Save as Draft
            </button>

            {currentStep < steps.length ? (
              <button
                onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
                className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                onClick={() => handleSaveCampaign(false)}
                disabled={isLoading}
                className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
              >
                {isLoading ? (
                  <div className="spinner mr-2"></div>
                ) : (
                  <Play className="h-4 w-4 mr-2" />
                )}
                Launch Campaign
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}