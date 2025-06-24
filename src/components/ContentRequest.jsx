import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Send, Sparkles, Upload, Image, Video, X, FileImage, FileVideo, CheckCircle, ChevronDown, ChevronUp, Zap, Target, Calendar, BarChart3, Settings } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export function ContentRequest() {
  const [formData, setFormData] = useState({
    topic: '',
    context: '',
    persona: '',
    platforms: [],
    tone: '',
    images: [],
    videos: [],
    // Enhanced fields
    content_type: '',
    priority_level: '',
    business_objective: '',
    custom_cta: '',
    tone_adjustment: '',
    scheduled_publish_time: '',
    content_variations: 1,
    success_metrics: {
      target_engagement_rate: '',
      target_reach: '',
      target_clicks: '',
      target_conversions: ''
    },
    user_provided_content: false
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [showABTesting, setShowABTesting] = useState(false)
  const [showScheduling, setShowScheduling] = useState(false)

  const contentTypes = [
    { value: 'social_post', label: 'Social Media Post', description: 'Standard social media content' },
    { value: 'blog_article', label: 'Blog Article', description: 'Long-form blog content' },
    { value: 'email_campaign', label: 'Email Campaign', description: 'Email marketing content' },
    { value: 'video_script', label: 'Video Script', description: 'Script for video content' },
    { value: 'infographic_text', label: 'Infographic Text', description: 'Text for visual infographics' }
  ]

  const priorityLevels = [
    { value: 'low', label: 'Low', color: 'bg-gray-100 text-gray-800' },
    { value: 'normal', label: 'Normal', color: 'bg-blue-100 text-blue-800' },
    { value: 'high', label: 'High', color: 'bg-orange-100 text-orange-800' },
    { value: 'urgent', label: 'Urgent', color: 'bg-red-100 text-red-800' }
  ]

  const businessObjectives = [
    { value: 'engagement', label: 'Engagement', description: 'Maximize likes, comments, shares' },
    { value: 'reach', label: 'Reach', description: 'Maximize audience reach' },
    { value: 'conversions', label: 'Conversions', description: 'Drive specific actions' },
    { value: 'brand_awareness', label: 'Brand Awareness', description: 'Increase brand recognition' },
    { value: 'lead_generation', label: 'Lead Generation', description: 'Generate qualified leads' },
    { value: 'community_building', label: 'Community Building', description: 'Build audience community' }
  ]

  const toneAdjustments = [
    { value: 'standard', label: 'Standard' },
    { value: 'more_playful', label: 'More Playful' },
    { value: 'more_professional', label: 'More Professional' },
    { value: 'more_casual', label: 'More Casual' },
    { value: 'more_urgent', label: 'More Urgent' }
  ]

  const platforms = [
    { id: 'linkedin', name: 'LinkedIn', icon: '💼' },
    { id: 'facebook', name: 'Facebook', icon: '📘' },
    { id: 'twitter', name: 'Twitter', icon: '🐦' },
    { id: 'instagram', name: 'Instagram', icon: '📸' },
    { id: 'youtube', name: 'YouTube', icon: '📺' },
    { id: 'tiktok', name: 'TikTok', icon: '🎵' }
  ]

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files)
    const newImages = files.map(file => ({
      file,
      name: file.name,
      size: file.size,
      preview: URL.createObjectURL(file)
    }))
    
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newImages],
      user_provided_content: true
    }))
  }

  const handleVideoUpload = (event) => {
    const files = Array.from(event.target.files)
    const newVideos = files.map(file => ({
      file,
      name: file.name,
      size: file.size,
      preview: URL.createObjectURL(file)
    }))
    
    setFormData(prev => ({
      ...prev,
      videos: [...prev.videos, ...newVideos],
      user_provided_content: true
    }))
  }

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  const removeVideo = (index) => {
    setFormData(prev => ({
      ...prev,
      videos: prev.videos.filter((_, i) => i !== index)
    }))
  }

  const togglePlatform = (platformId) => {
    setFormData(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platformId)
        ? prev.platforms.filter(p => p !== platformId)
        : [...prev.platforms, platformId]
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Prepare data for submission
      const submissionData = {
        topic: formData.topic,
        additional_context: formData.context,
        target_platforms: formData.platforms.length > 0 ? formData.platforms : ['linkedin'],
        audience_persona_name: formData.persona || 'AI will determine optimal persona',
        brand_profile_name: 'YouNifAIed Brand',
        content_type: formData.content_type || 'social_post',
        priority_level: formData.priority_level || 'normal',
        business_objective: formData.business_objective || 'engagement',
        custom_cta: formData.custom_cta,
        tone_adjustment: formData.tone_adjustment || 'standard',
        scheduled_publish_time: formData.scheduled_publish_time || null,
        success_metrics: {
          target_engagement_rate: formData.success_metrics.target_engagement_rate || null,
          target_reach: formData.success_metrics.target_reach || null,
          target_clicks: formData.success_metrics.target_clicks || null,
          target_conversions: formData.success_metrics.target_conversions || null,
          content_variations: formData.content_variations
        },
        request_metadata: {
          user_provided_images: formData.images.length,
          user_provided_videos: formData.videos.length,
          user_provided_content: formData.user_provided_content,
          form_version: '2.0_enhanced'
        },
        user_id: '00000000-0000-0000-0000-000000000000', // Replace with actual user ID
        user_email: 'user@example.com' // Replace with actual user email
      }

      const { data, error } = await supabase
        .from('content_requests')
        .insert([submissionData])
        .select()

      if (error) throw error

      // Reset form
      setFormData({
        topic: '',
        context: '',
        persona: '',
        platforms: [],
        tone: '',
        images: [],
        videos: [],
        content_type: '',
        priority_level: '',
        business_objective: '',
        custom_cta: '',
        tone_adjustment: '',
        scheduled_publish_time: '',
        content_variations: 1,
        success_metrics: {
          target_engagement_rate: '',
          target_reach: '',
          target_clicks: '',
          target_conversions: ''
        },
        user_provided_content: false
      })

      alert('Content request submitted successfully!')
    } catch (error) {
      console.error('Error submitting request:', error)
      alert('Error submitting request. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Sparkles className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">Request Content</h2>
      </div>
      <p className="text-muted-foreground">
        Create a new content request for your YouNifAIed social media automation
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Content Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5" />
              <span>Content Details</span>
            </CardTitle>
            <CardDescription>
              Provide the topic and context for your content generation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="topic">Content Topic *</Label>
              <Input
                id="topic"
                placeholder="e.g., Using AI to catch student effort instead of just errors"
                value={formData.topic}
                onChange={(e) => setFormData(prev => ({ ...prev, topic: e.target.value }))}
                required
              />
            </div>

            <div>
              <Label htmlFor="content-type">Content Type</Label>
              <Select value={formData.content_type} onValueChange={(value) => setFormData(prev => ({ ...prev, content_type: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="AI will choose optimal type" />
                </SelectTrigger>
                <SelectContent>
                  {contentTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div>
                        <div className="font-medium">{type.label}</div>
                        <div className="text-xs text-muted-foreground">{type.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="context">Additional Context</Label>
              <Textarea
                id="context"
                placeholder="Share any specific details, personal experiences, or angles you want included... (AI will enhance if left blank)"
                value={formData.context}
                onChange={(e) => setFormData(prev => ({ ...prev, context: e.target.value }))}
                rows={3}
              />
            </div>

            <div>
              <Label>Target Platforms</Label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {platforms.map((platform) => (
                  <Button
                    key={platform.id}
                    type="button"
                    variant={formData.platforms.includes(platform.id) ? "default" : "outline"}
                    className="justify-start"
                    onClick={() => togglePlatform(platform.id)}
                  >
                    <span className="mr-2">{platform.icon}</span>
                    {platform.name}
                  </Button>
                ))}
              </div>
              {formData.platforms.length === 0 && (
                <p className="text-xs text-muted-foreground mt-1">
                  <Zap className="h-3 w-3 inline mr-1" />
                  AI will select optimal platforms if none chosen
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* User Content Upload */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Upload className="h-5 w-5" />
              <span>Upload Your Content</span>
            </CardTitle>
            <CardDescription>
              Upload your own images or videos - these will take priority over AI-generated content
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Image Upload */}
            <div>
              <Label>Upload Your Images</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <FileImage className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600">Click to upload images or drag and drop</p>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB each</p>
                </label>
              </div>

              {formData.images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image.preview}
                        alt={image.name}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </button>
                      <p className="text-xs text-gray-600 mt-1 truncate">{image.name}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Video Upload */}
            <div>
              <Label>Upload Your Videos</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <input
                  type="file"
                  multiple
                  accept="video/*"
                  onChange={handleVideoUpload}
                  className="hidden"
                  id="video-upload"
                />
                <label htmlFor="video-upload" className="cursor-pointer">
                  <FileVideo className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600">Click to upload videos or drag and drop</p>
                  <p className="text-xs text-gray-500">MP4, MOV, AVI up to 100MB each</p>
                </label>
              </div>

              {formData.videos.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  {formData.videos.map((video, index) => (
                    <div key={index} className="relative group">
                      <video
                        src={video.preview}
                        className="w-full h-24 object-cover rounded-lg"
                        controls={false}
                      />
                      <button
                        type="button"
                        onClick={() => removeVideo(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </button>
                      <p className="text-xs text-gray-600 mt-1 truncate">{video.name}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {(formData.images.length > 0 || formData.videos.length > 0) && (
              <div className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-800">
                  Your uploaded content will be used instead of AI-generated visuals
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Advanced Options */}
        <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
          <Card>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-gray-50">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Settings className="h-5 w-5" />
                    <span>Advanced Options</span>
                  </div>
                  {showAdvanced ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </CardTitle>
                <CardDescription>
                  Optional settings - AI will optimize if left blank
                </CardDescription>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="priority">Priority Level</Label>
                    <Select value={formData.priority_level} onValueChange={(value) => setFormData(prev => ({ ...prev, priority_level: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Normal (AI default)" />
                      </SelectTrigger>
                      <SelectContent>
                        {priorityLevels.map((priority) => (
                          <SelectItem key={priority.value} value={priority.value}>
                            <div className="flex items-center space-x-2">
                              <Badge className={priority.color}>{priority.label}</Badge>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="tone">Tone Adjustment</Label>
                    <Select value={formData.tone_adjustment} onValueChange={(value) => setFormData(prev => ({ ...prev, tone_adjustment: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Standard (AI default)" />
                      </SelectTrigger>
                      <SelectContent>
                        {toneAdjustments.map((tone) => (
                          <SelectItem key={tone.value} value={tone.value}>
                            {tone.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="business-objective">Business Objective</Label>
                  <Select value={formData.business_objective} onValueChange={(value) => setFormData(prev => ({ ...prev, business_objective: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="AI will determine optimal objective" />
                    </SelectTrigger>
                    <SelectContent>
                      {businessObjectives.map((objective) => (
                        <SelectItem key={objective.value} value={objective.value}>
                          <div>
                            <div className="font-medium">{objective.label}</div>
                            <div className="text-xs text-muted-foreground">{objective.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="custom-cta">Custom Call-to-Action</Label>
                  <Input
                    id="custom-cta"
                    placeholder="e.g., 'Book a demo today!' (AI will create if blank)"
                    value={formData.custom_cta}
                    onChange={(e) => setFormData(prev => ({ ...prev, custom_cta: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="persona">Target Audience Persona</Label>
                  <Input
                    id="persona"
                    placeholder="e.g., 'K-12 educators interested in AI tools' (AI will determine if blank)"
                    value={formData.persona}
                    onChange={(e) => setFormData(prev => ({ ...prev, persona: e.target.value }))}
                  />
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* A/B Testing Options */}
        <Collapsible open={showABTesting} onOpenChange={setShowABTesting}>
          <Card>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-gray-50">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Target className="h-5 w-5" />
                    <span>A/B Testing & Success Metrics</span>
                  </div>
                  {showABTesting ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </CardTitle>
                <CardDescription>
                  Configure content variations and success tracking
                </CardDescription>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="variations">Number of Content Variations</Label>
                  <Select 
                    value={formData.content_variations.toString()} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, content_variations: parseInt(value) }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 (Single version)</SelectItem>
                      <SelectItem value="2">2 (A/B test)</SelectItem>
                      <SelectItem value="3">3 (A/B/C test)</SelectItem>
                      <SelectItem value="4">4 (Multi-variant test)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-1">
                    AI will create different versions to test performance
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="target-engagement">Target Engagement Rate (%)</Label>
                    <Input
                      id="target-engagement"
                      type="number"
                      placeholder="e.g., 5.5"
                      value={formData.success_metrics.target_engagement_rate}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        success_metrics: { ...prev.success_metrics, target_engagement_rate: e.target.value }
                      }))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="target-reach">Target Reach</Label>
                    <Input
                      id="target-reach"
                      type="number"
                      placeholder="e.g., 10000"
                      value={formData.success_metrics.target_reach}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        success_metrics: { ...prev.success_metrics, target_reach: e.target.value }
                      }))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="target-clicks">Target Clicks</Label>
                    <Input
                      id="target-clicks"
                      type="number"
                      placeholder="e.g., 500"
                      value={formData.success_metrics.target_clicks}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        success_metrics: { ...prev.success_metrics, target_clicks: e.target.value }
                      }))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="target-conversions">Target Conversions</Label>
                    <Input
                      id="target-conversions"
                      type="number"
                      placeholder="e.g., 50"
                      value={formData.success_metrics.target_conversions}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        success_metrics: { ...prev.success_metrics, target_conversions: e.target.value }
                      }))}
                    />
                  </div>
                </div>

                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <BarChart3 className="h-4 w-4 inline mr-1" />
                    AI will set realistic targets based on your historical performance if left blank
                  </p>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Scheduling Options */}
        <Collapsible open={showScheduling} onOpenChange={setShowScheduling}>
          <Card>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-gray-50">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5" />
                    <span>Scheduling Options</span>
                  </div>
                  {showScheduling ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </CardTitle>
                <CardDescription>
                  Schedule your content for optimal posting times
                </CardDescription>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="scheduled-time">Scheduled Publish Time</Label>
                  <Input
                    id="scheduled-time"
                    type="datetime-local"
                    value={formData.scheduled_publish_time}
                    onChange={(e) => setFormData(prev => ({ ...prev, scheduled_publish_time: e.target.value }))}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    <Zap className="h-3 w-3 inline mr-1" />
                    AI will suggest optimal posting times if left blank
                  </p>
                </div>

                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800">
                    <Calendar className="h-4 w-4 inline mr-1" />
                    Content will be generated and queued for review before scheduled publish time
                  </p>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <Button type="submit" disabled={isSubmitting || !formData.topic.trim()}>
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Creating Request...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Create Content Request
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}

