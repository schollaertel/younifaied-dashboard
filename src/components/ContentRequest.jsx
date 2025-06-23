import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Send, Sparkles, Upload, Image, Video, X, FileImage, FileVideo } from 'lucide-react'

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

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    const imageFiles = files.filter(file => file.type.startsWith('image/'))
    
    if (imageFiles.length > 0) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...imageFiles]
      }))
    }
  }

  const handleVideoUpload = (e) => {
    const files = Array.from(e.target.files)
    const videoFiles = files.filter(file => file.type.startsWith('video/'))
    
    if (videoFiles.length > 0) {
      setFormData(prev => ({
        ...prev,
        videos: [...prev.videos, ...videoFiles]
      }))
    }
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

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // TODO: Submit to Supabase with file uploads
    console.log('Submitting content request:', formData)
    
    // Reset form
    setFormData({
      topic: '',
      context: '',
      persona: '',
      platforms: [],
      tone: '',
      images: [],
      videos: []
    })
    
    // Show success message
    alert('Content request submitted successfully!')
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold younifaied-text-gradient mb-2">
          Request New Content
        </h1>
        <p className="text-muted-foreground">
          Create a new content request for your YouNifAIed social media automation
        </p>
      </div>

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
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Topic */}
            <div className="space-y-2">
              <Label htmlFor="topic">Content Topic *</Label>
              <Input
                id="topic"
                placeholder="e.g., Using AI to catch student effort instead of just errors"
                value={formData.topic}
                onChange={(e) => setFormData(prev => ({ ...prev, topic: e.target.value }))}
                required
                className="w-full"
              />
            </div>

            {/* Context */}
            <div className="space-y-2">
              <Label htmlFor="context">Additional Context</Label>
              <Textarea
                id="context"
                placeholder="Share any specific details, personal experiences, or angles you want included..."
                value={formData.context}
                onChange={(e) => setFormData(prev => ({ ...prev, context: e.target.value }))}
                rows={3}
                className="w-full resize-none"
              />
            </div>

            {/* Image Upload */}
            <div className="space-y-3">
              <Label>Reference Images (Optional)</Label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-muted-foreground/50 transition-colors">
                <input
                  type="file"
                  id="image-upload"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <div className="flex flex-col items-center space-y-2">
                    <Image className="h-8 w-8 text-muted-foreground" />
                    <div className="text-sm text-center">
                      <span className="font-medium text-primary">Click to upload images</span>
                      <span className="text-muted-foreground"> or drag and drop</span>
                    </div>
                    <p className="text-xs text-muted-foreground text-center">
                      PNG, JPG, GIF up to 10MB each
                    </p>
                  </div>
                </label>
              </div>
              
              {/* Image Preview */}
              {formData.images.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Uploaded Images ({formData.images.length})</Label>
                  <div className="grid grid-cols-1 gap-2">
                    {formData.images.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center space-x-3 min-w-0 flex-1">
                          <FileImage className="h-5 w-5 text-blue-500 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium truncate">{file.name}</p>
                            <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeImage(index)}
                          className="h-8 w-8 p-0 flex-shrink-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Video Upload */}
            <div className="space-y-3">
              <Label>Reference Videos (Optional)</Label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-muted-foreground/50 transition-colors">
                <input
                  type="file"
                  id="video-upload"
                  multiple
                  accept="video/*"
                  onChange={handleVideoUpload}
                  className="hidden"
                />
                <label htmlFor="video-upload" className="cursor-pointer">
                  <div className="flex flex-col items-center space-y-2">
                    <Video className="h-8 w-8 text-muted-foreground" />
                    <div className="text-sm text-center">
                      <span className="font-medium text-primary">Click to upload videos</span>
                      <span className="text-muted-foreground"> or drag and drop</span>
                    </div>
                    <p className="text-xs text-muted-foreground text-center">
                      MP4, MOV, AVI up to 100MB each
                    </p>
                  </div>
                </label>
              </div>
              
              {/* Video Preview */}
              {formData.videos.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Uploaded Videos ({formData.videos.length})</Label>
                  <div className="grid grid-cols-1 gap-2">
                    {formData.videos.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center space-x-3 min-w-0 flex-1">
                          <FileVideo className="h-5 w-5 text-purple-500 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium truncate">{file.name}</p>
                            <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeVideo(index)}
                          className="h-8 w-8 p-0 flex-shrink-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Persona Selection */}
            <div className="space-y-2">
              <Label htmlFor="persona">Voice & Persona *</Label>
              <Select 
                value={formData.persona} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, persona: value }))}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose the voice that best connects with your audience" />
                </SelectTrigger>
                <SelectContent>
                  {personas.map((persona) => (
                    <SelectItem key={persona.value} value={persona.value}>
                      <div className="w-full">
                        <div className="font-medium">{persona.label}</div>
                        <div className="text-xs text-muted-foreground whitespace-normal break-words">
                          {persona.description}
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Platform Selection */}
            <div className="space-y-3">
              <Label>Target Platforms *</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {platforms.map((platform) => (
                  <div key={platform.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={platform.id}
                      checked={formData.platforms.includes(platform.id)}
                      onCheckedChange={(checked) => handlePlatformChange(platform.id, checked)}
                    />
                    <Label 
                      htmlFor={platform.id}
                      className="flex items-center space-x-2 cursor-pointer flex-1"
                    >
                      <div className={`w-3 h-3 rounded-full ${platform.color} flex-shrink-0`} />
                      <span className="text-sm">{platform.label}</span>
                    </Label>
                  </div>
                ))}
              </div>
              {formData.platforms.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.platforms.map((platformId) => {
                    const platform = platforms.find(p => p.id === platformId)
                    return (
                      <Badge key={platformId} variant="secondary" className="text-xs">
                        {platform?.label}
                      </Badge>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Tone Adjustment */}
            <div className="space-y-2">
              <Label htmlFor="tone">Tone Adjustment (Optional)</Label>
              <Input
                id="tone"
                placeholder="e.g., More conversational, less formal"
                value={formData.tone}
                onChange={(e) => setFormData(prev => ({ ...prev, tone: e.target.value }))}
                className="w-full"
              />
            </div>

            {/* Upload Summary */}
            {(formData.images.length > 0 || formData.videos.length > 0) && (
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <h4 className="font-medium mb-2 flex items-center">
                  <Upload className="h-4 w-4 mr-2 flex-shrink-0" />
                  Upload Summary
                </h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  {formData.images.length > 0 && (
                    <p>• {formData.images.length} image{formData.images.length !== 1 ? 's' : ''} ready for upload</p>
                  )}
                  {formData.videos.length > 0 && (
                    <p>• {formData.videos.length} video{formData.videos.length !== 1 ? 's' : ''} ready for upload</p>
                  )}
                  <p className="text-xs mt-2 text-muted-foreground">
                    Files will be uploaded when you submit the content request
                  </p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full younifaied-gradient text-white"
              disabled={!formData.topic || !formData.persona || formData.platforms.length === 0}
            >
              <Send className="h-4 w-4 mr-2" />
              Submit Content Request
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

