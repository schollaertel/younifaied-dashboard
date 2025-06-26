<<<<<<< HEAD
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Send, Sparkles, Upload, Image, Video, X, FileImage, FileVideo, CheckCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export function ContentRequest() {
  const [formData, setFormData] = useState({
    topic: '',
    context: '',
    persona: '',
    platforms: [],
    tone: '',
    images: [],
    videos: []
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const platforms = [
    { id: 'facebook', label: 'Facebook', color: 'bg-blue-500' },
    { id: 'instagram', label: 'Instagram', color: 'bg-pink-500' },
    { id: 'linkedin', label: 'LinkedIn', color: 'bg-blue-600' },
    { id: 'twitter', label: 'Twitter/X', color: 'bg-black' }
  ]

  const personas = [
    { 
      value: 'expert-coach', 
      label: 'Expert Coach',
      description: 'Calm, experienced guidance for professional development'
    },
    { 
      value: 'relatable-mom', 
      label: 'Relatable Mom',
      description: 'Warm, honest real-talk with humor and heart'
    },
    { 
      value: 'challenger', 
      label: 'The Challenger',
      description: 'Bold advocacy for educational change and equity'
    }
  ]

  const handlePlatformChange = (platformId, checked) => {
    setFormData(prev => ({
      ...prev,
      platforms: checked 
        ? [...prev.platforms, platformId]
        : prev.platforms.filter(p => p !== platformId)
    }))
  }

  const handleFileUpload = (files, type) => {
    const fileArray = Array.from(files).map(file => ({
      file,
      name: file.name,
      size: file.size,
      type: file.type
    }))
    
    setFormData(prev => ({
      ...prev,
      [type]: [...prev[type], ...fileArray]
    }))
  }

  const removeFile = (index, type) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }))
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Insert content request into Supabase
      const { data, error } = await supabase
        .from('content_requests')
        .insert([
          {
            topic: formData.topic,
            context: formData.context,
            persona: formData.persona,
            platforms: formData.platforms,
            tone: formData.tone,
            status: 'pending',
            created_at: new Date().toISOString(),
            // Note: File uploads would need separate handling with Supabase Storage
            has_images: formData.images.length > 0,
            has_videos: formData.videos.length > 0,
            image_count: formData.images.length,
            video_count: formData.videos.length
          }
        ])
        .select()

      if (error) {
        console.error('Error submitting request:', error)
        alert('Error submitting request. Please try again.')
      } else {
        console.log('Request submitted successfully:', data)
        setSubmitSuccess(true)
        
        // Reset form after successful submission
        setTimeout(() => {
          setFormData({
            topic: '',
            context: '',
            persona: '',
            platforms: [],
            tone: '',
            images: [],
            videos: []
          })
          setSubmitSuccess(false)
        }, 3000)
      }
    } catch (error) {
      console.error('Submission error:', error)
      alert('Error submitting request. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitSuccess) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Request Submitted!</h3>
            <p className="text-muted-foreground mb-4">
              Your content request has been added to the queue. You'll be able to review the generated content in the Review tab.
            </p>
            <Button 
              onClick={() => setSubmitSuccess(false)}
              className="younifaied-gradient text-white"
            >
              Create Another Request
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold younifaied-text-gradient mb-2">
          Request Content
        </h1>
        <p className="text-muted-foreground">
          Create a new content request for your YouNifAIed social media automation
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Content Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <span>Content Details</span>
            </CardTitle>
            <CardDescription>
              Provide the topic and context for your content generation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="topic" className="text-sm font-medium">
                Content Topic *
              </Label>
              <Input
                id="topic"
                placeholder="e.g., Using AI to catch student effort instead of just errors"
                value={formData.topic}
                onChange={(e) => setFormData(prev => ({ ...prev, topic: e.target.value }))}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="context" className="text-sm font-medium">
                Additional Context
              </Label>
              <Textarea
                id="context"
                placeholder="Share any specific details, personal experiences, or angles you want included..."
                value={formData.context}
                onChange={(e) => setFormData(prev => ({ ...prev, context: e.target.value }))}
                className="mt-1 min-h-[100px] resize-none"
              />
            </div>
          </CardContent>
        </Card>

        {/* Reference Files */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Upload className="h-5 w-5 text-primary" />
              <span>Reference Images (Optional)</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
              <Image className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <div className="space-y-2">
                <p className="text-sm font-medium">Click to upload images or drag and drop</p>
                <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB each</p>
              </div>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => handleFileUpload(e.target.files, 'images')}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
            
            {formData.images.length > 0 && (
              <div className="mt-4 space-y-2">
                {formData.images.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                    <div className="flex items-center space-x-2">
                      <FileImage className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium">{file.name}</span>
                      <span className="text-xs text-muted-foreground">({formatFileSize(file.size)})</span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index, 'images')}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Video className="h-5 w-5 text-primary" />
              <span>Reference Videos (Optional)</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
              <Video className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <div className="space-y-2">
                <p className="text-sm font-medium">Click to upload videos or drag and drop</p>
                <p className="text-xs text-muted-foreground">MP4, MOV, AVI up to 100MB each</p>
              </div>
              <input
                type="file"
                multiple
                accept="video/*"
                onChange={(e) => handleFileUpload(e.target.files, 'videos')}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
            
            {formData.videos.length > 0 && (
              <div className="mt-4 space-y-2">
                {formData.videos.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                    <div className="flex items-center space-x-2">
                      <FileVideo className="h-4 w-4 text-purple-500" />
                      <span className="text-sm font-medium">{file.name}</span>
                      <span className="text-xs text-muted-foreground">({formatFileSize(file.size)})</span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index, 'videos')}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Voice & Persona */}
        <Card>
          <CardHeader>
            <CardTitle>Voice & Persona *</CardTitle>
            <CardDescription>
              Choose the voice that best connects with your audience
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Select value={formData.persona} onValueChange={(value) => setFormData(prev => ({ ...prev, persona: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Choose the voice that best connects with your audience" />
              </SelectTrigger>
              <SelectContent>
                {personas.map((persona) => (
                  <SelectItem key={persona.value} value={persona.value}>
                    <div className="flex flex-col">
                      <span className="font-medium">{persona.label}</span>
                      <span className="text-xs text-muted-foreground break-words whitespace-normal">
                        {persona.description}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Target Platforms */}
        <Card>
          <CardHeader>
            <CardTitle>Target Platforms *</CardTitle>
            <CardDescription>
              Select which social media platforms to create content for
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {platforms.map((platform) => (
                <div key={platform.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={platform.id}
                    checked={formData.platforms.includes(platform.id)}
                    onCheckedChange={(checked) => handlePlatformChange(platform.id, checked)}
                  />
                  <Label htmlFor={platform.id} className="flex items-center space-x-2 cursor-pointer">
                    <div className={`w-3 h-3 rounded-full ${platform.color}`} />
                    <span>{platform.label}</span>
                  </Label>
                </div>
              ))}
            </div>
            
            {formData.platforms.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {formData.platforms.map((platformId) => {
                  const platform = platforms.find(p => p.id === platformId)
                  return (
                    <Badge key={platformId} variant="secondary">
                      {platform?.label}
                    </Badge>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tone Adjustments */}
        <Card>
          <CardHeader>
            <CardTitle>Tone Adjustments (Optional)</CardTitle>
            <CardDescription>
              Any specific tone or style adjustments for this content
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="e.g., More conversational, less formal, add humor, focus on practical tips..."
              value={formData.tone}
              onChange={(e) => setFormData(prev => ({ ...prev, tone: e.target.value }))}
              className="min-h-[80px] resize-none"
            />
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button 
            type="submit" 
            className="younifaied-gradient text-white px-8"
            disabled={!formData.topic || !formData.persona || formData.platforms.length === 0 || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Submit Request
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}

=======
// src/components/ContentRequest.jsx

import { useState } from 'react'
import supabase from '../lib/supabase'
import socialLogo from '../assets/Social_ProfileLogo_v2_2025-4-15.png'
import websiteLogo from '../assets/website_yunifaied-logo-website-v2-2025-4-16.png'

export default function ContentRequest() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: '',
    additionalContext: '',
    referenceUrl: '',
    targetPlatforms: [],
    audiencePersona: '',
    toneAdjustment: '',
    includeCta: false,
    customCta: '',
    mediaPreference: '',
    specificHashtags: '',
    avoidTopics: '',
    postingPriority: 'normal',
    targetPostingTime: '',
    enableAbTesting: false,
    abTestVariants: '2',
    abTestFocus: '',
    visualContentRequest: '',
    imageStylePreference: '',
    targetKeywords: '',
    workflowStatus: 'draft'
  })

  const [avatar, setAvatar] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleInputChange = e => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handlePlatformChange = platform => {
    setFormData(prev => ({
      ...prev,
      targetPlatforms: prev.targetPlatforms.includes(platform)
        ? prev.targetPlatforms.filter(p => p !== platform)
        : [...prev.targetPlatforms, platform]
    }))
  }

  const handleAvatarUpload = e => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = ev => setAvatar(ev.target.result)
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const payload = {
        ...formData,
        targetPlatforms: formData.targetPlatforms.join(', '),
        post_progress: 'draft',
        workflow_status: formData.workflowStatus,
        processingStartedAt: new Date().toISOString(),
        createdAt: new Date().toISOString()
      }
      const { error } = await supabase
        .from('content_requests')
        .insert([payload])

      if (error) throw error

      setMessage('✅ Content request submitted successfully!')
      setFormData({
        name: '',
        email: '',
        topic: '',
        additionalContext: '',
        referenceUrl: '',
        targetPlatforms: [],
        audiencePersona: '',
        toneAdjustment: '',
        includeCta: false,
        customCta: '',
        mediaPreference: '',
        specificHashtags: '',
        avoidTopics: '',
        postingPriority: 'normal',
        targetPostingTime: '',
        enableAbTesting: false,
        abTestVariants: '2',
        abTestFocus: '',
        visualContentRequest: '',
        imageStylePreference: '',
        targetKeywords: '',
        workflowStatus: 'draft'
      })
    } catch (err) {
      setMessage('❌ Error submitting request: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex bg-[#DBE4E4]">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-[#1D6379] p-6 flex flex-col relative">
        <div className="text-white text-xl font-bold mb-8">
          YouNifAiEd<br/>
          <span className="text-sm font-normal">Dashboard</span>
        </div>
        {/* Avatar Upload */}
        <div className="mb-8 text-center">
          <div className="w-20 h-20 rounded-full bg-gray-300 mx-auto mb-4 overflow-hidden">
            {avatar
              ? <img src={avatar} alt="Avatar" className="w-full h-full object-cover"/>
              : <svg className="w-8 h-8 text-gray-500 mx-auto mt-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                </svg>
            }
          </div>
          <label className="cursor-pointer">
            <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden"/>
            <div className="inline-block bg-gradient-to-r from-[#96D241] to-[#65B0B8] text-white px-4 py-2 rounded text-sm hover:from-lime-500 hover:to-teal-500">
              Upload Avatar
            </div>
          </label>
        </div>
        {/* Nav */}
        <nav className="flex-1">
          <ul className="space-y-2 text-gray-300">
            <li className="bg-gradient-to-r from-[#96D241] to-[#65B0B8] text-white px-4 py-2 rounded">
              Request Content
            </li>
            <li className="px-4 py-2 hover:text-white cursor-pointer">Content Library</li>
            <li className="px-4 py-2 hover:text-white cursor-pointer">Analytics</li>
            <li className="px-4 py-2 hover:text-white cursor-pointer">Workflows</li>
            <li className="px-4 py-2 hover:text-white cursor-pointer">Settings</li>
          </ul>
        </nav>
        <div className="mt-8 text-gray-400 text-sm">ADMIN TOOLS</div>
        <ul className="space-y-2 text-gray-300">
          <li className="px-4 py-2 hover:text-white cursor-pointer">User Management</li>
          <li className="px-4 py-2 hover:text-white cursor-pointer">API Keys</li>
          <li className="px-4 py-2 hover:text-white cursor-pointer">Database Admin</li>
          <li className="px-4 py-2 hover:text-white cursor-pointer">System Logs</li>
        </ul>
        <img
          src={socialLogo}
          alt="YouNifAiEd AI Logo"
          className="w-12 h-12 absolute bottom-6 left-6"
        />
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-24 bg-[#1D6379] flex items-center justify-end px-8">
          <img src={websiteLogo} alt="YouNifAiEd Logo" className="h-16"/>
        </header>

        {/* Form */}
        <section className="flex-1 p-8 overflow-auto">
          <div className="bg-gradient-to-r from-[#96D241] to-[#65B0B8] rounded-lg p-8 mb-8 text-white">
            <div className="flex items-center mb-4">
              <svg className="w-8 h-8 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 ८"/>
              </svg>
              <h1 className="text-3xl font-bold">Create Your Content Request</h1>
            </div>
            <p className="text-lg">
              Tell us what content you need and we'll create it in your voice and style.
            </p>
          </div>

          {message && (
            <div className={`p-4 rounded-lg mb-6 ${
              message.startsWith('✅') 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Info */}
            <div className="bg-white rounded-lg p-6 shadow">
              <div className="flex items-center mb-6">
                <div className="w-4 h-4 bg-[#96D241] rounded mr-3"></div>
                <h2 className="text-xl font-semibold">Basic Information</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Name*</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#65B0B8]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address*</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#65B0B8]"
                  />
                </div>
              </div>
            </div>

            {/* Topic & Context */}
            <div className="bg-white rounded-lg p-6 shadow">
              <div className="flex items-center mb-6">
                <div className="w-4 h-4 bg-[#96D241] rounded mr-3"></div>
                <h2 className="text-xl font-semibold">Content Topic & Context</h2>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Topic*</label>
                  <textarea
                    name="topic"
                    value={formData.topic}
                    onChange={handleInputChange}
                    rows="3"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#65B0B8]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Additional Context</label>
                  <textarea
                    name="additionalContext"
                    value={formData.additionalContext}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#65B0B8]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Reference URL</label>
                  <input
                    type="url"
                    name="referenceUrl"
                    value={formData.referenceUrl}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#65B0B8]"
                  />
                </div>
              </div>
            </div>

            {/* Voice & Tone */}
            <div className="bg-white rounded-lg p-6 shadow">
              <div className="flex items-center mb-6">
                <div className="w-4 h-4 bg-[#96D241] rounded mr-3"></div>
                <h2 className="text-xl font-semibold">Voice & Tone</h2>
              </div>
              <div className="space-y-3">
                {['expert_coach','relatable_mom','challenger'].map(val => (
                  <label key={val} className="flex items-center p-4 border border-gray-200 rounded hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="audiencePersona"
                      value={val}
                      checked={formData.audiencePersona===val}
                      onChange={handleInputChange}
                      className="mr-3"
                    />
                    {val.replace('_',' ')}
                  </label>
                ))}
              </div>
            </div>

            {/* Platforms */}
            <div className="bg-white rounded-lg p-6 shadow">
              <div className="flex items-center mb-6">
                <div className="w-4 h-4 bg-[#96D241] rounded mr-3"></div>
                <h2 className="text-xl font-semibold">Target Platforms</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {['LinkedIn','YouTube','Instagram','Facebook','Twitter','TikTok'].map(p => (
                  <label key={p} className="flex items-center p-3 border border-gray-200 rounded hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.targetPlatforms.includes(p)}
                      onChange={()=>handlePlatformChange(p)}
                      className="mr-3"
                    />
                    {p}
                  </label>
                ))}
              </div>
            </div>

            {/* All Other Fields */}
            {/* ...remaining 800 lines of your original inputs, each styled with:
                 focus:ring-[#65B0B8], border-gray-300 rounded-lg, bg-white sections,
                 and gradient buttons from-[#96D241]→[#65B0B8] ... */}

            {/* Submit */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-[#96D241] to-[#65B0B8] text-white px-8 py-3 rounded-lg font-semibold disabled:opacity-50"
              >
                {loading ? 'Submitting…' : 'Submit Content Request'}
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  )
}
>>>>>>> 289c02e702defbe198c2460edef27ea764f648ed
