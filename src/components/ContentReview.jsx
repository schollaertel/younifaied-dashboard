import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { CheckCircle, XCircle, Eye, Edit, Clock, Image as ImageIcon } from 'lucide-react'

export function ContentReview() {
  const [pendingContent, setPendingContent] = useState([])
  const [selectedContent, setSelectedContent] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [editedText, setEditedText] = useState('')

  // Mock data - replace with Supabase integration
  useEffect(() => {
    const mockContent = [
      {
        id: 1,
        topic: 'Using AI to catch student effort instead of just errors',
        platform: 'facebook',
        persona: 'Expert Coach',
        content_text: 'As educators, we often focus on what students get wrong. But what if AI could help us see what they\'re getting right? When we shift from catching errors to catching effort, we unlock a powerful tool for authentic growth. AI can reveal patterns in student work that show persistence, creative thinking, and genuine understanding - even when the final answer isn\'t perfect. This isn\'t about lowering standards; it\'s about raising our awareness of the learning process itself.',
        hashtags: '#EducationInnovation #AIinEducation #StudentGrowth #TeachingWithAI',
        cta: 'How do you recognize effort in your classroom? Share your strategies below!',
        generated_image_url: 'https://example.com/image1.jpg',
        created_at: '2025-06-23T10:30:00Z',
        approval_status: 'pending_approval'
      },
      {
        id: 2,
        topic: 'Academic integrity in the AI age',
        platform: 'linkedin',
        persona: 'The Challenger',
        content_text: 'Academic integrity isn\'t dead in the AI age - it\'s evolving. Instead of banning AI tools, we need to teach students how to use them ethically and effectively. This means redefining what original work looks like and helping students understand the difference between AI as a collaborator versus AI as a replacement for thinking. The goal isn\'t to eliminate AI from education; it\'s to ensure students develop critical thinking skills alongside technological literacy.',
        hashtags: '#AcademicIntegrity #AIEthics #EducationReform #FutureOfLearning',
        cta: 'What\'s your take on AI and academic integrity? Let\'s discuss in the comments.',
        generated_image_url: 'https://example.com/image2.jpg',
        created_at: '2025-06-23T09:15:00Z',
        approval_status: 'pending_approval'
      },
      {
        id: 3,
        topic: 'Personalized learning without the buzzwords',
        platform: 'instagram',
        persona: 'Relatable Mom',
        content_text: 'Personalized learning sounds fancy, but here\'s the real talk: it\'s just good teaching with better tools. It\'s knowing that Sarah learns best with visual examples while Marcus needs to talk through problems. AI can help us track these patterns and suggest resources, but it can\'t replace the human connection that makes learning stick. Sometimes the most "personalized" thing you can do is simply notice when a student lights up about something and lean into that curiosity.',
        hashtags: '#PersonalizedLearning #TeachingReality #EducationTech #RealTalk',
        cta: 'What makes learning click for your students? Drop a comment! 👇',
        generated_image_url: 'https://example.com/image3.jpg',
        created_at: '2025-06-23T08:45:00Z',
        approval_status: 'pending_approval'
      }
    ]
    setPendingContent(mockContent)
  }, [])

  const handleApprove = async (contentId) => {
    // TODO: Update Supabase
    setPendingContent(prev => prev.filter(item => item.id !== contentId))
    setSelectedContent(null)
    console.log('Approved content:', contentId)
  }

  const handleReject = async (contentId) => {
    // TODO: Update Supabase
    setPendingContent(prev => prev.filter(item => item.id !== contentId))
    setSelectedContent(null)
    console.log('Rejected content:', contentId)
  }

  const handleEdit = (content) => {
    setSelectedContent(content)
    setEditedText(content.content_text)
    setEditMode(true)
  }

  const handleSaveEdit = async () => {
    // TODO: Update Supabase with edited content
    setSelectedContent(prev => ({ ...prev, content_text: editedText }))
    setEditMode(false)
    console.log('Saved edited content')
  }

  const getPlatformColor = (platform) => {
    const colors = {
      facebook: 'bg-blue-500',
      instagram: 'bg-pink-500',
      linkedin: 'bg-blue-600',
      twitter: 'bg-black'
    }
    return colors[platform] || 'bg-gray-500'
  }

  const getPersonaColor = (persona) => {
    const colors = {
      'Expert Coach': 'bg-green-500',
      'Relatable Mom': 'bg-purple-500',
      'The Challenger': 'bg-orange-500'
    }
    return colors[persona] || 'bg-gray-500'
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold younifaied-text-gradient mb-2">
          Review Content
        </h1>
        <p className="text-muted-foreground">
          Review and approve generated content before publishing
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Content List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Pending Approval ({pendingContent.length})</h2>
          
          {pendingContent.map((content) => (
            <Card 
              key={content.id} 
              className={`cursor-pointer transition-all ${
                selectedContent?.id === content.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setSelectedContent(content)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-base line-clamp-2">
                      {content.topic}
                    </CardTitle>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge className={`${getPlatformColor(content.platform)} text-white`}>
                        {content.platform}
                      </Badge>
                      <Badge variant="outline" className={`${getPersonaColor(content.persona)} text-white`}>
                        {content.persona}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span className="text-xs">
                      {new Date(content.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {content.content_text}
                </p>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center space-x-1 text-muted-foreground">
                    <ImageIcon className="h-4 w-4" />
                    <span className="text-xs">Image generated</span>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedContent(content)
                    }}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Review
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {pendingContent.length === 0 && (
            <Card>
              <CardContent className="text-center py-8">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">All caught up!</h3>
                <p className="text-muted-foreground">
                  No content pending approval at the moment.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Content Preview */}
        <div className="lg:sticky lg:top-6">
          {selectedContent ? (
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{selectedContent.topic}</CardTitle>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge className={`${getPlatformColor(selectedContent.platform)} text-white`}>
                        {selectedContent.platform}
                      </Badge>
                      <Badge variant="outline" className={`${getPersonaColor(selectedContent.persona)} text-white`}>
                        {selectedContent.persona}
                      </Badge>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(selectedContent)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Generated Image Preview */}
                <div className="bg-muted rounded-lg p-4 text-center">
                  <ImageIcon className="h-16 w-16 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Generated Image Preview</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {selectedContent.generated_image_url}
                  </p>
                </div>

                {/* Content Text */}
                <div>
                  <h4 className="font-medium mb-2">Content Text</h4>
                  {editMode ? (
                    <div className="space-y-3">
                      <Textarea
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        rows={8}
                        className="resize-none"
                      />
                      <div className="flex space-x-2">
                        <Button onClick={handleSaveEdit} size="sm">
                          Save Changes
                        </Button>
                        <Button 
                          onClick={() => setEditMode(false)} 
                          size="sm" 
                          variant="outline"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm leading-relaxed bg-muted p-3 rounded-lg">
                      {selectedContent.content_text}
                    </p>
                  )}
                </div>

                {/* Hashtags */}
                <div>
                  <h4 className="font-medium mb-2">Hashtags</h4>
                  <p className="text-sm text-primary">{selectedContent.hashtags}</p>
                </div>

                {/* Call to Action */}
                <div>
                  <h4 className="font-medium mb-2">Call to Action</h4>
                  <p className="text-sm bg-muted p-3 rounded-lg">{selectedContent.cta}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4">
                  <Button 
                    onClick={() => handleApprove(selectedContent.id)}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve & Publish
                  </Button>
                  <Button 
                    onClick={() => handleReject(selectedContent.id)}
                    variant="destructive"
                    className="flex-1"
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Eye className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Select content to review</h3>
                <p className="text-muted-foreground">
                  Choose a content item from the list to preview and approve.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

