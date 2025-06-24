'use client'

import { useState } from 'react'
import { createContentRequest, createWorkflowExecution, getBlotatoAccountIds } from '@/lib/supabase'
import WorkflowRouter from '@/lib/workflow-router'
import BlotatoAPI from '@/lib/blotato-api'

export default function ContentRequest() {
  const [formData, setFormData] = useState({
    content_type: '',
    platforms: [],
    content_description: '',
    business_objective: '',
    priority: 'normal',
    user_content: {
      images: [],
      videos: [],
      custom_caption: '',
      custom_hashtags: ''
    },
    ab_testing: {
      enabled: false,
      variations: 1,
      success_metrics: []
    },
    advanced_options: {
      tone: '',
      audience_persona: '',
      custom_cta: '',
      scheduling: 'optimal_time'
    }
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [showABTesting, setShowABTesting] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)

  const contentTypes = [
    { value: 'social_post', label: 'Social Media Post' },
    { value: 'video_script', label: 'Video Script' },
    { value: 'blog_post', label: 'Blog Post' },
    { value: 'email_campaign', label: 'Email Campaign' },
    { value: 'infographic', label: 'Infographic' }
  ]

  const platforms = [
    { value: 'instagram', label: 'Instagram' },
    { value: 'facebook', label: 'Facebook' },
    { value: 'twitter', label: 'Twitter/X' },
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'youtube', label: 'YouTube' },
    { value: 'tiktok', label: 'TikTok' },
    { value: 'pinterest', label: 'Pinterest' }
  ]

  const businessObjectives = [
    { value: 'engagement', label: 'Increase Engagement' },
    { value: 'reach', label: 'Expand Reach' },
    { value: 'conversions', label: 'Drive Conversions' },
    { value: 'brand_awareness', label: 'Build Brand Awareness' },
    { value: 'lead_generation', label: 'Generate Leads' },
    { value: 'customer_retention', label: 'Retain Customers' }
  ]

  const priorities = [
    { value: 'low', label: 'Low', color: 'bg-gray-100 text-gray-800' },
    { value: 'normal', label: 'Normal', color: 'bg-blue-100 text-blue-800' },
    { value: 'high', label: 'High', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'urgent', label: 'Urgent', color: 'bg-red-100 text-red-800' }
  ]

  const tones = [
    { value: 'professional', label: 'Professional' },
    { value: 'casual', label: 'Casual' },
    { value: 'playful', label: 'Playful' },
    { value: 'urgent', label: 'Urgent' },
    { value: 'inspirational', label: 'Inspirational' },
    { value: 'educational', label: 'Educational' }
  ]

  const successMetrics = [
    { value: 'engagement_rate', label: 'Engagement Rate' },
    { value: 'reach', label: 'Reach' },
    { value: 'clicks', label: 'Clicks' },
    { value: 'conversions', label: 'Conversions' },
    { value: 'shares', label: 'Shares' },
    { value: 'comments', label: 'Comments' }
  ]

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }))
    }
  }

  const handlePlatformChange = (platform) => {
    setFormData(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform]
    }))
  }

  const handleMetricChange = (metric) => {
    setFormData(prev => ({
      ...prev,
      ab_testing: {
        ...prev.ab_testing,
        success_metrics: prev.ab_testing.success_metrics.includes(metric)
          ? prev.ab_testing.success_metrics.filter(m => m !== metric)
          : [...prev.ab_testing.success_metrics, metric]
      }
    }))
  }

  const handleFileUpload = (files, type) => {
    const fileArray = Array.from(files)
    setFormData(prev => ({
      ...prev,
      user_content: {
        ...prev.user_content,
        [type]: [...prev.user_content[type], ...fileArray]
      }
    }))
  }

  const removeFile = (index, type) => {
    setFormData(prev => ({
      ...prev,
      user_content: {
        ...prev.user_content,
        [type]: prev.user_content[type].filter((_, i) => i !== index)
      }
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // Validate required fields
      if (!formData.content_type || !formData.content_description || formData.platforms.length === 0) {
        throw new Error('Please fill in all required fields')
      }

      // Create content request in database
      const requestResult = await createContentRequest({
        content_type: formData.content_type,
        platforms: formData.platforms,
        content_description: formData.content_description,
        business_objective: formData.business_objective,
        priority: formData.priority,
        user_content: formData.user_content,
        ab_testing: formData.ab_testing,
        advanced_options: formData.advanced_options,
        status: 'pending'
      })

      if (!requestResult.success) {
        throw new Error(requestResult.error)
      }

      // Initialize workflow router
      const router = new WorkflowRouter()
      
      // Route the content request
      const routingResult = router.routeContentRequest({
        ...formData,
        id: requestResult.data.id
      })

      // Create workflow execution record
      const workflowResult = await createWorkflowExecution({
        content_request_id: requestResult.data.id,
        workflowId: routingResult.workflowId,
        workflowType: routingResult.workflowType,
        platformRequirements: routingResult.platformRequirements,
        estimatedTime: routingResult.estimatedTime
      })

      if (!workflowResult.success) {
        throw new Error(workflowResult.error)
      }

      // Get Blotato account IDs
      const accountIdsResult = await getBlotatoAccountIds()
      
      // Process with Blotato API if API key is available
      const blotatoApiKey = import.meta.env.VITE_BLOTATO_API_KEY
      if (blotatoApiKey) {
        const blotatoAPI = new BlotatoAPI(blotatoApiKey)
        const blotatoResult = await blotatoAPI.processContentRequest(routingResult.payload)
        
        // Save Blotato results
        if (blotatoResult.success) {
          console.log('Blotato processing completed:', blotatoResult.summary)
        }
      }

      setSubmitStatus({
        type: 'success',
        message: `Content request submitted successfully! Estimated completion time: ${routingResult.estimatedTime} minutes.`
      })

      // Reset form
      setFormData({
        content_type: '',
        platforms: [],
        content_description: '',
        business_objective: '',
        priority: 'normal',
        user_content: {
          images: [],
          videos: [],
          custom_caption: '',
          custom_hashtags: ''
        },
        ab_testing: {
          enabled: false,
          variations: 1,
          success_metrics: []
        },
        advanced_options: {
          tone: '',
          audience_persona: '',
          custom_cta: '',
          scheduling: 'optimal_time'
        }
      })

    } catch (error) {
      console.error('Submission error:', error)
      setSubmitStatus({
        type: 'error',
        message: error.message || 'Failed to submit content request. Please try again.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Create Content Request</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Content Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content Type *
          </label>
          <select
            value={formData.content_type}
            onChange={(e) => handleInputChange('content_type', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select content type...</option>
            {contentTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Platform Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Platforms * (Select all that apply)
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {platforms.map(platform => (
              <label key={platform.value} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.platforms.includes(platform.value)}
                  onChange={() => handlePlatformChange(platform.value)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{platform.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Content Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content Description *
          </label>
          <textarea
            value={formData.content_description}
            onChange={(e) => handleInputChange('content_description', e.target.value)}
            placeholder="Describe what content you want created... (Leave blank for AI to optimize)"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={4}
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            💡 AI will optimize and expand your description for each platform
          </p>
        </div>

        {/* Business Objective & Priority */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Business Objective
            </label>
            <select
              value={formData.business_objective}
              onChange={(e) => handleInputChange('business_objective', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Leave blank for AI to optimize</option>
              {businessObjectives.map(obj => (
                <option key={obj.value} value={obj.value}>
                  {obj.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Priority Level
            </label>
            <div className="flex space-x-2">
              {priorities.map(priority => (
                <button
                  key={priority.value}
                  type="button"
                  onClick={() => handleInputChange('priority', priority.value)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    formData.priority === priority.value
                      ? priority.color
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {priority.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* User Content Upload */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Upload Your Content (Optional)
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            🎯 User content takes priority over AI-generated content
          </p>

          {/* Image Upload */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Images
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleFileUpload(e.target.files, 'images')}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {formData.user_content.images.length > 0 && (
              <div className="mt-2 space-y-1">
                {formData.user_content.images.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <span className="text-sm text-gray-700">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeFile(index, 'images')}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Video Upload */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Videos
            </label>
            <input
              type="file"
              multiple
              accept="video/*"
              onChange={(e) => handleFileUpload(e.target.files, 'videos')}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {formData.user_content.videos.length > 0 && (
              <div className="mt-2 space-y-1">
                {formData.user_content.videos.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <span className="text-sm text-gray-700">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeFile(index, 'videos')}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Custom Caption */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Custom Caption (Optional)
            </label>
            <textarea
              value={formData.user_content.custom_caption}
              onChange={(e) => handleInputChange('user_content.custom_caption', e.target.value)}
              placeholder="Leave blank for AI to create optimized captions"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
            />
          </div>

          {/* Custom Hashtags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Custom Hashtags (Optional)
            </label>
            <input
              type="text"
              value={formData.user_content.custom_hashtags}
              onChange={(e) => handleInputChange('user_content.custom_hashtags', e.target.value)}
              placeholder="Leave blank for AI to optimize hashtags"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">
              💡 AI will research trending hashtags for your content and platforms
            </p>
          </div>
        </div>

        {/* A/B Testing Section */}
        <div className="border border-gray-200 rounded-lg p-4">
          <button
            type="button"
            onClick={() => setShowABTesting(!showABTesting)}
            className="flex items-center justify-between w-full text-left"
          >
            <h3 className="text-lg font-medium text-gray-900">
              A/B Testing Options
            </h3>
            <span className="text-gray-500">
              {showABTesting ? '−' : '+'}
            </span>
          </button>

          {showABTesting && (
            <div className="mt-4 space-y-4">
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.ab_testing.enabled}
                    onChange={(e) => handleInputChange('ab_testing.enabled', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Enable A/B Testing</span>
                </label>
              </div>

              {formData.ab_testing.enabled && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Variations (1-4)
                    </label>
                    <select
                      value={formData.ab_testing.variations}
                      onChange={(e) => handleInputChange('ab_testing.variations', parseInt(e.target.value))}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value={1}>1 (No A/B Testing)</option>
                      <option value={2}>2 Variations</option>
                      <option value={3}>3 Variations</option>
                      <option value={4}>4 Variations</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Success Metrics to Track
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {successMetrics.map(metric => (
                        <label key={metric.value} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.ab_testing.success_metrics.includes(metric.value)}
                            onChange={() => handleMetricChange(metric.value)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">{metric.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Advanced Options */}
        <div className="border border-gray-200 rounded-lg p-4">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center justify-between w-full text-left"
          >
            <h3 className="text-lg font-medium text-gray-900">
              Advanced Options
            </h3>
            <span className="text-gray-500">
              {showAdvanced ? '−' : '+'}
            </span>
          </button>

          {showAdvanced && (
            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tone
                  </label>
                  <select
                    value={formData.advanced_options.tone}
                    onChange={(e) => handleInputChange('advanced_options.tone', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Leave blank for AI to optimize</option>
                    {tones.map(tone => (
                      <option key={tone.value} value={tone.value}>
                        {tone.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Audience Persona
                  </label>
                  <input
                    type="text"
                    value={formData.advanced_options.audience_persona}
                    onChange={(e) => handleInputChange('advanced_options.audience_persona', e.target.value)}
                    placeholder="Leave blank for AI to optimize"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Custom Call-to-Action
                </label>
                <input
                  type="text"
                  value={formData.advanced_options.custom_cta}
                  onChange={(e) => handleInputChange('advanced_options.custom_cta', e.target.value)}
                  placeholder="Leave blank for AI to optimize"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Scheduling
                </label>
                <select
                  value={formData.advanced_options.scheduling}
                  onChange={(e) => handleInputChange('advanced_options.scheduling', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="optimal_time">Optimal Time (AI Recommended)</option>
                  <option value="immediate">Post Immediately</option>
                  <option value="custom">Custom Schedule</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Submit Status */}
        {submitStatus && (
          <div className={`p-4 rounded-md ${
            submitStatus.type === 'success' 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {submitStatus.message}
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-3 rounded-md font-medium transition-colors ${
              isSubmitting
                ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            }`}
          >
            {isSubmitting ? 'Creating Content...' : 'Create Content Request'}
          </button>
        </div>
      </form>
    </div>
  )
}

