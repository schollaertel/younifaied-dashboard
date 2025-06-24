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

