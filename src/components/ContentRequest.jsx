'use client'

import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { createContentRequest, createWorkflowExecution, getBlotatoAccountIds } from '../lib/supabase'

export function ContentRequest() {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    content_type: '',
    platforms: [],
    topic: '',
    content_description: '',
    primary_keywords: '',
    secondary_keywords: '',
    long_tail_keywords: '',
    business_objective: '',
    priority: 'normal',
    inspiration_link: '',
    audience_persona_name: '',
    brand_profile_name: 'YouNifAiEd'
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success', 'error', or null

  // Audience personas from your database
  const audiencePersonas = [
    { value: 'tech_innovator', label: 'Tech Innovator', description: 'Forward-thinking technology enthusiast' },
    { value: 'expert_coach', label: 'Expert Coach', description: 'Calm, steady, experienced, and empowering' },
    { value: 'relatable_mom', label: 'The Relatable Mom', description: 'Warm, honest, supportive, and inclusive' },
    { value: 'community_builder', label: 'Community Builder', description: 'Inclusive leader focused on bringing people together' },
    { value: 'the_challenger', label: 'The Challenger', description: 'Raw, unapologetic, bold, and thought-provoking' }
  ]

  const resetForm = () => {
    setFormData({
      content_type: '',
      platforms: [],
      topic: '',
      content_description: '',
      primary_keywords: '',
      secondary_keywords: '',
      long_tail_keywords: '',
      business_objective: '',
      priority: 'normal',
      inspiration_link: '',
      audience_persona_name: '',
      brand_profile_name: 'YouNifAiEd'
    })
    setIsSubmitting(false)
    setSubmitStatus(null)
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    // Clear status when user starts typing again
    if (submitStatus) {
      setSubmitStatus(null)
    }
  }

  const handlePlatformChange = (platform, checked) => {
    setFormData(prev => ({
      ...prev,
      platforms: checked 
        ? [...prev.platforms, platform]
        : prev.platforms.filter(p => p !== platform)
    }))
    if (submitStatus) {
      setSubmitStatus(null)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!user) {
      setSubmitStatus('error')
      return
    }

    if (!formData.content_type || formData.platforms.length === 0 || !formData.topic || !formData.content_description || !formData.audience_persona_name) {
      setSubmitStatus('error')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // Create content request with user data
      const requestData = {
        user_id: user.id,
        user_email: user.email,
        content_type: formData.content_type,
        platforms: formData.platforms,
        topic: formData.topic,
        content_description: formData.content_description,
        primary_keywords: formData.primary_keywords,
        secondary_keywords: formData.secondary_keywords,
        long_tail_keywords: formData.long_tail_keywords,
        business_objective: formData.business_objective,
        priority: formData.priority,
        inspiration_link: formData.inspiration_link,
        audience_persona_name: formData.audience_persona_name,
        brand_profile_name: formData.brand_profile_name,
        status: 'pending'
      }

      const contentResult = await createContentRequest(requestData)
      
      if (!contentResult.success) {
        throw new Error(contentResult.error)
      }

      // Success - reset form and show success message
      setSubmitStatus('success')
      setTimeout(() => {
        resetForm()
      }, 2000) // Reset form after 2 seconds

    } catch (error) {
      console.error('Error submitting content request:', error)
      setSubmitStatus('error')
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Request Content Creation</h2>
      
      {/* Success Message */}
      {submitStatus === 'success' && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">Content Request Submitted Successfully!</h3>
              <div className="mt-2 text-sm text-green-700">
                <p>Your content request has been saved and will be processed shortly. The form will reset automatically.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {submitStatus === 'error' && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error Submitting Request</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>Please fill in all required fields and try again.</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Content Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content Type *
          </label>
          <select
            value={formData.content_type}
            onChange={(e) => handleInputChange('content_type', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            disabled={isSubmitting}
          >
            <option value="">Select content type</option>
            <option value="social_post">Social Media Post</option>
            <option value="blog_article">Blog Article</option>
            <option value="email_campaign">Email Campaign</option>
            <option value="video_script">Video Script</option>
            <option value="infographic">Infographic</option>
          </select>
        </div>

        {/* Platforms */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target Platforms *
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {['Instagram', 'Facebook', 'LinkedIn', 'Twitter', 'YouTube', 'TikTok'].map(platform => (
              <label key={platform} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.platforms.includes(platform.toLowerCase())}
                  onChange={(e) => handlePlatformChange(platform.toLowerCase(), e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  disabled={isSubmitting}
                />
                <span className="text-sm text-gray-700">{platform}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Topic */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Topic *
          </label>
          <input
            type="text"
            value={formData.topic}
            onChange={(e) => handleInputChange('topic', e.target.value)}
            placeholder="Main topic/theme (e.g., 'AI in Education', 'Productivity Tips')"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            disabled={isSubmitting}
          />
          <p className="text-xs text-gray-500 mt-1">Short, focused topic for image mapping and content categorization</p>
        </div>

        {/* Content Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content Description *
          </label>
          <textarea
            value={formData.content_description}
            onChange={(e) => handleInputChange('content_description', e.target.value)}
            placeholder="Detailed description of what you want to create..."
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            disabled={isSubmitting}
          />
        </div>

        {/* Audience Persona */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Audience Persona *
          </label>
          <select
            value={formData.audience_persona_name}
            onChange={(e) => handleInputChange('audience_persona_name', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            disabled={isSubmitting}
          >
            <option value="">Select audience persona</option>
            {audiencePersonas.map(persona => (
              <option key={persona.value} value={persona.value}>
                {persona.label} - {persona.description}
              </option>
            ))}
          </select>
        </div>

        {/* Keywords Section */}
        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Keyword Focus</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Primary Keywords
              </label>
              <input
                type="text"
                value={formData.primary_keywords}
                onChange={(e) => handleInputChange('primary_keywords', e.target.value)}
                placeholder="main keyword, key phrase"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isSubmitting}
              />
              <p className="text-xs text-gray-500 mt-1">1-3 main keywords (comma separated)</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Secondary Keywords
              </label>
              <input
                type="text"
                value={formData.secondary_keywords}
                onChange={(e) => handleInputChange('secondary_keywords', e.target.value)}
                placeholder="related terms, synonyms"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isSubmitting}
              />
              <p className="text-xs text-gray-500 mt-1">Supporting keywords</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Long-tail Keywords
              </label>
              <input
                type="text"
                value={formData.long_tail_keywords}
                onChange={(e) => handleInputChange('long_tail_keywords', e.target.value)}
                placeholder="specific phrases, questions"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isSubmitting}
              />
              <p className="text-xs text-gray-500 mt-1">Specific, longer phrases</p>
            </div>
          </div>
        </div>

        {/* Business Objective */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Business Objective
          </label>
          <select
            value={formData.business_objective}
            onChange={(e) => handleInputChange('business_objective', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isSubmitting}
          >
            <option value="">Select objective</option>
            <option value="brand_awareness">Brand Awareness</option>
            <option value="lead_generation">Lead Generation</option>
            <option value="engagement">Engagement</option>
            <option value="conversions">Conversions</option>
            <option value="education">Education</option>
            <option value="community_building">Community Building</option>
          </select>
        </div>

        {/* Priority */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Priority Level
          </label>
          <select
            value={formData.priority}
            onChange={(e) => handleInputChange('priority', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isSubmitting}
          >
            <option value="low">Low Priority</option>
            <option value="normal">Normal Priority</option>
            <option value="high">High Priority</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>

        {/* Inspiration Link */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Inspiration Link (Optional)
          </label>
          <input
            type="url"
            value={formData.inspiration_link}
            onChange={(e) => handleInputChange('inspiration_link', e.target.value)}
            placeholder="Link to content you want to rip off and make better"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isSubmitting}
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Content...
              </div>
            ) : (
              'Create Content Request'
            )}
          </button>
        </div>

        {/* AI Assistance Note */}
        <div className="bg-green-50 border border-green-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">AI Will Optimize</h3>
              <div className="mt-2 text-sm text-green-700">
                <p>Leave any field blank and AI will fill in optimized content based on your topic, keywords, and business objective.</p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

