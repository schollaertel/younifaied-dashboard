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
    inspiration_link: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handlePlatformChange = (platform, checked) => {
    setFormData(prev => ({
      ...prev,
      platforms: checked 
        ? [...prev.platforms, platform]
        : prev.platforms.filter(p => p !== platform)
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!user) {
      alert('Please log in to submit content requests')
      return
    }

    if (!formData.content_type || formData.platforms.length === 0 || !formData.topic || !formData.content_description) {
      alert('Please fill in all required fields: Content Type, Platforms, Topic, and Content Description')
      return
    }

    setIsSubmitting(true)

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
        status: 'pending'
      }

      const contentResult = await createContentRequest(requestData)
      
      if (!contentResult.success) {
        throw new Error(contentResult.error)
      }

      // Reset form
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
        inspiration_link: ''
      })

      alert('Content request submitted successfully!')

    } catch (error) {
      console.error('Error submitting content request:', error)
      alert('Error submitting request: ' + error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Request Content Creation</h2>
      
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
          />
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
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Creating Content...' : 'Create Content Request'}
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

