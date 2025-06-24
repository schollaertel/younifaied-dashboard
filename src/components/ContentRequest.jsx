import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Send, Sparkles, Upload, Image, Video, X, FileImage, FileVideo, CheckCircle, ChevronDown, Settings, Target, TestTube } from 'lucide-react'
import BlotatoAPI from '@/lib/blotato-api'
import WorkflowRouter from '@/lib/workflow-router'
import BlotAtoAPI from '@/lib/blotato-api'

export function ContentRequest() {
  const [formData, setFormData] = useState({
    // Core Content Fields
    content_type: 'social_post',
    content_description: '',
    business_objective: 'engagement',
    priority: 'normal',
    platforms: [],
    
    // User Content
    user_content: {
      images: [],
      videos: [],
      custom_captions: '',
      custom_hashtags: ''
    },
    
    // A/B Testing
    ab_testing: {
      enabled: false,
      variations: 1,
      success_metrics: ['engagement_rate']
    },
    
    // Advanced Options
    advanced_options: {
      tone: 'professional',
      audience_persona: '',
      custom_cta: '',
      scheduling: 'optimal_time'
    }
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [workflowResult, setWorkflowResult] = useState(null)
  const [abTestingOpen, setAbTestingOpen] = useState(false)
  const [advancedOpen, setAdvancedOpen] = useState(false)

  // Platform options with enhanced metadata
  const platforms = [
    { id: 'instagram', label: 'Instagram', color: 'bg-pink-500', formats: ['Post', 'Story', 'Reel'] },
    { id: 'facebook', label: 'Facebook', color: 'bg-blue-500', formats: ['Post', 'Story', 'Reel'] },
    { id: 'twitter', label: 'Twitter/X', color: 'bg-black', formats: ['Tweet', 'Thread'] },
    { id: 'linkedin', label: 'LinkedIn', color: 'bg-blue-600', formats: ['Post', 'Article'] },
    { id: 'youtube', label: 'YouTube', color: 'bg-red-500', formats: ['Shorts'] },
    { id: 'tiktok', label: 'TikTok', color: 'bg-black', formats: ['Video'] },
    { id: 'pinterest', label: 'Pinterest', color: 'bg-red-600', formats: ['Pin'] }
  ]

  const contentTypes = [
    { value: 'social_post', label: 'Social Media Post', description: 'Standard social media content' },
    { value: 'video_script', label: 'Video Script', description: 'Script for video content creation' },
    { value: 'blog_post', label: 'Blog Post', description: 'Long-form written content' },
    { value: 'email_campaign', label: 'Email Campaign', description: 'Email newsletter or promotional content' },
    { value: 'infographic', label: 'Infographic', description: 'Visual data presentation' }
  ]

  const businessObjectives = [
    { value: 'engagement', label: 'Increase Engagement', icon: '💬' },
    { value: 'reach', label: 'Expand Reach', icon: '📈' },
    { value: 'conversions', label: 'Drive Conversions', icon: '🎯' },
    { value: 'brand_awareness', label: 'Build Brand Awareness', icon: '🌟' },
    { value: 'lead_generation', label: 'Generate Leads', icon: '🔗' },
    { value: 'community_building', label: 'Build Community', icon: '👥' }
  ]

  const priorityLevels = [
    { value: 'low', label: 'Low', color: 'bg-gray-100 text-gray-800' },
    { value: 'normal', label: 'Normal', color: 'bg-blue-100 text-blue-800' },
    { value: 'high', label: 'High', color: 'bg-orange-100 text-orange-800' },
    { value: 'urgent', label: 'Urgent', color: 'bg-red-100 text-red-800' }
  ]

  const toneOptions = [
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
    { value: 'clicks', label: 'Click-through Rate' },
    { value: 'conversions', label: 'Conversions' },
    { value: 'shares', label: 'Shares/Reposts' },
    { value: 'comments', label: 'Comments' }
  ]
  // Handle form updates
  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const updateNestedFormData = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
  }

  // Handle platform selection
  const togglePlatform = (platformId) => {
    setFormData(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platformId)
        ? prev.platforms.filter(p => p !== platformId)
        : [...prev.platforms, platformId]
    }))
  }

  // Handle file uploads
  const handleFileUpload = (files, type) => {
    const fileArray = Array.from(files)
    updateNestedFormData('user_content', type, [
      ...formData.user_content[type],
      ...fileArray
    ])
  }

  const removeFile = (index, type) => {
    const updatedFiles = formData.user_content[type].filter((_, i) => i !== index)
    updateNestedFormData('user_content', type, updatedFiles)
  }

  // Handle A/B testing metrics
  const toggleSuccessMetric = (metric) => {
    const currentMetrics = formData.ab_testing.success_metrics
    const updatedMetrics = currentMetrics.includes(metric)
      ? currentMetrics.filter(m => m !== metric)
      : [...currentMetrics, metric]
    
    updateNestedFormData('ab_testing', 'success_metrics', updatedMetrics)
  }

  // Main form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitSuccess(false)
    setWorkflowResult(null)

    try {
      // Step 1: Validate required fields
      if (!formData.content_description.trim()) {
        throw new Error('Content description is required')
      }
      if (formData.platforms.length === 0) {
        throw new Error('At least one platform must be selected')
      }

      // Step 2: Create content request in database
      const contentRequestResult = await createContentRequest({
        ...formData,
        status: 'pending',
        created_at: new Date().toISOString()
      })

      if (!contentRequestResult.success) {
        throw new Error(contentRequestResult.error)
      }

      const contentRequestId = contentRequestResult.data.id

      // Step 3: Initialize workflow router
      const workflowRouter = new WorkflowRouter()
      const routingResult = workflowRouter.routeContentRequest({
        ...formData,
        content_request_id: contentRequestId
      })

      // Step 4: Create workflow execution record
      const workflowExecutionResult = await createWorkflowExecution({
        content_request_id: contentRequestId,
        ...routingResult
      })

      if (!workflowExecutionResult.success) {
        throw new Error(workflowExecutionResult.error)
      }

      // Step 5: Get Blotato account IDs
      const accountIdsResult = await getBlotatoAccountIds()
      if (accountIdsResult.success) {
        routingResult.payload.account_ids = accountIdsResult.data
      }

      // Step 6: Process with Blotato API (if API key is available)
      const blotato ApiKey = import.meta.env.VITE_BLOTATO_API_KEY
      if (blotato ApiKey) {
        const blotato API = new BlotAtoAPI(blotato ApiKey)
        const blotato Result = await blotato API.processContentRequest(routingResult.payload)
        
        // Save Blotato results
        if (blotato Result.success) {
          await saveBlotato Results(workflowExecutionResult.data.id, blotato Result)
        }
        
        setWorkflowResult({
          ...routingResult,
          blotato Result,
          workflowExecutionId: workflowExecutionResult.data.id
        })
      } else {
        // No API key - show workflow routing result only
        setWorkflowResult({
          ...routingResult,
          message: 'Workflow routed successfully. Add VITE_BLOTATO_API_KEY to environment for content generation.',
          workflowExecutionId: workflowExecutionResult.data.id
        })
      }

      setSubmitSuccess(true)
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          content_type: 'social_post',
          content_description: '',
          business_objective: 'engagement',
          priority: 'normal',
          platforms: [],
          user_content: { images: [], videos: [], custom_captions: '', custom_hashtags: '' },
          ab_testing: { enabled: false, variations: 1, success_metrics: ['engagement_rate'] },
          advanced_options: { tone: 'professional', audience_persona: '', custom_cta: '', scheduling: 'optimal_time' }
        })
        setSubmitSuccess(false)
        setWorkflowResult(null)
      }, 5000)

    } catch (error) {
      console.error('Submission error:', error)
      alert(`Error: ${error.message}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-500" />
            Enhanced Content Request
          </CardTitle>
          <CardDescription>
            Create AI-powered content optimized for multiple platforms with A/B testing capabilities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Core Content Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Content Details</h3>
              
              {/* Content Type */}
              <div className="space-y-2">
                <Label htmlFor="content_type">Content Type</Label>
                <Select value={formData.content_type} onValueChange={(value) => updateFormData('content_type', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select content type" />
                  </SelectTrigger>
                  <SelectContent>
                    {contentTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div>
                          <div className="font-medium">{type.label}</div>
                          <div className="text-sm text-gray-500">{type.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Content Description */}
              <div className="space-y-2">
                <Label htmlFor="content_description">Content Description *</Label>
                <Textarea
                  id="content_description"
                  placeholder="Describe what you want to create... (AI will optimize for each platform)"
                  value={formData.content_description}
                  onChange={(e) => updateFormData('content_description', e.target.value)}
                  className="min-h-[100px]"
                  required
                />
                <p className="text-sm text-gray-500">
                  💡 Leave blank for AI to optimize - the more specific you are, the better the results
                </p>
              </div>

              {/* Business Objective & Priority */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Business Objective</Label>
                  <Select value={formData.business_objective} onValueChange={(value) => updateFormData('business_objective', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {businessObjectives.map((obj) => (
                        <SelectItem key={obj.value} value={obj.value}>
                          <span className="flex items-center gap-2">
                            <span>{obj.icon}</span>
                            {obj.label}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Priority Level</Label>
                  <Select value={formData.priority} onValueChange={(value) => updateFormData('priority', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {priorityLevels.map((priority) => (
                        <SelectItem key={priority.value} value={priority.value}>
                          <Badge className={priority.color}>{priority.label}</Badge>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Platform Selection */}
              <div className="space-y-2">
                <Label>Target Platforms *</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {platforms.map((platform) => (
                    <div
                      key={platform.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-all ${
                        formData.platforms.includes(platform.id)
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => togglePlatform(platform.id)}
                    >
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={formData.platforms.includes(platform.id)}
                          onChange={() => togglePlatform(platform.id)}
                        />
                        <div>
                          <div className="font-medium">{platform.label}</div>
                          <div className="text-xs text-gray-500">
                            {platform.formats.join(', ')}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* User Content Upload */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Your Content (Optional)</h3>
              <p className="text-sm text-gray-600">
                Upload your own images/videos or leave blank for AI to generate content
              </p>
              
              {/* Image Upload */}
              <div className="space-y-2">
                <Label>Images</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e.target.files, 'images')}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center">
                    <Image className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">Click to upload images</span>
                  </label>
                </div>
                
                {/* Display uploaded images */}
                {formData.user_content.images.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.user_content.images.map((file, index) => (
                      <div key={index} className="relative">
                        <div className="flex items-center gap-2 bg-gray-100 rounded px-3 py-2">
                          <FileImage className="h-4 w-4" />
                          <span className="text-sm">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => removeFile(index, 'images')}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Video Upload */}
              <div className="space-y-2">
                <Label>Videos</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <input
                    type="file"
                    multiple
                    accept="video/*"
                    onChange={(e) => handleFileUpload(e.target.files, 'videos')}
                    className="hidden"
                    id="video-upload"
                  />
                  <label htmlFor="video-upload" className="cursor-pointer flex flex-col items-center">
                    <Video className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">Click to upload videos</span>
                  </label>
                </div>
                
                {/* Display uploaded videos */}
                {formData.user_content.videos.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.user_content.videos.map((file, index) => (
                      <div key={index} className="relative">
                        <div className="flex items-center gap-2 bg-gray-100 rounded px-3 py-2">
                          <FileVideo className="h-4 w-4" />
                          <span className="text-sm">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => removeFile(index, 'videos')}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Custom Captions & Hashtags */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Custom Captions (Optional)</Label>
                  <Textarea
                    placeholder="Your custom caption text (will override AI-generated captions)"
                    value={formData.user_content.custom_captions}
                    onChange={(e) => updateNestedFormData('user_content', 'custom_captions', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Custom Hashtags (Optional)</Label>
                  <Textarea
                    placeholder="#hashtag1 #hashtag2 (will override AI-generated hashtags)"
                    value={formData.user_content.custom_hashtags}
                    onChange={(e) => updateNestedFormData('user_content', 'custom_hashtags', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* A/B Testing Section */}
            <Collapsible open={abTestingOpen} onOpenChange={setAbTestingOpen}>
              <CollapsibleTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  <span className="flex items-center gap-2">
                    <TestTube className="h-4 w-4" />
                    A/B Testing Options
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-4 mt-4">
                <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
                  {/* Enable A/B Testing */}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="ab-testing-enabled"
                      checked={formData.ab_testing.enabled}
                      onCheckedChange={(checked) => updateNestedFormData('ab_testing', 'enabled', checked)}
                    />
                    <Label htmlFor="ab-testing-enabled">Enable A/B Testing</Label>
                  </div>

                  {formData.ab_testing.enabled && (
                    <>
                      {/* Number of Variations */}
                      <div className="space-y-2">
                        <Label>Number of Variations (1-4)</Label>
                        <Select 
                          value={formData.ab_testing.variations.toString()} 
                          onValueChange={(value) => updateNestedFormData('ab_testing', 'variations', parseInt(value))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 (No A/B Testing)</SelectItem>
                            <SelectItem value="2">2 Variations</SelectItem>
                            <SelectItem value="3">3 Variations</SelectItem>
                            <SelectItem value="4">4 Variations</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Success Metrics */}
                      <div className="space-y-2">
                        <Label>Success Metrics</Label>
                        <div className="grid grid-cols-2 gap-2">
                          {successMetrics.map((metric) => (
                            <div key={metric.value} className="flex items-center space-x-2">
                              <Checkbox
                                id={`metric-${metric.value}`}
                                checked={formData.ab_testing.success_metrics.includes(metric.value)}
                                onCheckedChange={() => toggleSuccessMetric(metric.value)}
                              />
                              <Label htmlFor={`metric-${metric.value}`} className="text-sm">
                                {metric.label}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </CollapsibleContent>
            </Collapsible>
            {/* Advanced Options */}
            <Collapsible open={advancedOpen} onOpenChange={setAdvancedOpen}>
              <CollapsibleTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  <span className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Advanced Options
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-4 mt-4">
                <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
                  {/* Tone & Audience */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Tone</Label>
                      <Select 
                        value={formData.advanced_options.tone} 
                        onValueChange={(value) => updateNestedFormData('advanced_options', 'tone', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {toneOptions.map((tone) => (
                            <SelectItem key={tone.value} value={tone.value}>
                              {tone.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Audience Persona</Label>
                      <Input
                        placeholder="e.g., Young professionals, Parents, Students"
                        value={formData.advanced_options.audience_persona}
                        onChange={(e) => updateNestedFormData('advanced_options', 'audience_persona', e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Custom CTA */}
                  <div className="space-y-2">
                    <Label>Custom Call-to-Action</Label>
                    <Input
                      placeholder="e.g., Sign up now, Learn more, Shop today (leave blank for AI to optimize)"
                      value={formData.advanced_options.custom_cta}
                      onChange={(e) => updateNestedFormData('advanced_options', 'custom_cta', e.target.value)}
                    />
                  </div>

                  {/* Scheduling */}
                  <div className="space-y-2">
                    <Label>Scheduling Preference</Label>
                    <Select 
                      value={formData.advanced_options.scheduling} 
                      onValueChange={(value) => updateNestedFormData('advanced_options', 'scheduling', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="optimal_time">Optimal Time (AI-suggested)</SelectItem>
                        <SelectItem value="immediate">Post Immediately</SelectItem>
                        <SelectItem value="custom">Custom Schedule</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting || formData.platforms.length === 0}
            >
              {isSubmitting ? (
                <>
                  <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                  Processing Content Request...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Create Content
                </>
              )}
            </Button>

            {/* Success Message */}
            {submitSuccess && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 text-green-800">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-medium">Content request submitted successfully!</span>
                </div>
                {workflowResult && (
                  <div className="mt-2 text-sm text-green-700">
                    <p>Workflow: {workflowResult.workflowId}</p>
                    <p>Estimated completion: {workflowResult.estimatedTime} minutes</p>
                    <p>Platforms: {workflowResult.platformRequirements?.length || 0}</p>
                    {workflowResult.blotato Result && (
                      <p>Blotato Status: {workflowResult.blotato Result.success ? 'Success' : 'Error'}</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
