import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { CheckCircle, XCircle, Eye, Edit, Clock, Image as ImageIcon, RefreshCw } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export function ContentReview() {
  const [pendingContent, setPendingContent] = useState([])
  const [selectedContent, setSelectedContent] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [editedText, setEditedText] = useState('')
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(null)

  // Fetch pending content from Supabase
  const fetchPendingContent = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('generated_content')
        .select('*')
        .eq('approval_status', 'pending_approval')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching content:', error)
      } else {
        setPendingContent(data || [])
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPendingContent()
  }, [])

  const handleApprove = async (contentId) => {
    setActionLoading(contentId)
    try {
      const { error } = await supabase
        .from('generated_content')
        .update({ 
          approval_status: 'approved',
          approved_at: new Date().toISOString(),
          approved_by: 'user' // You could add user authentication later
        })
        .eq('id', contentId)

      if (error) {
        console.error('Error approving content:', error)
        alert('Error approving content. Please try again.')
      } else {
        // Remove from pending list
        setPendingContent(prev => prev.filter(item => item.id !== contentId))
        if (selectedContent?.id === contentId) {
          setSelectedContent(null)
        }
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error approving content. Please try again.')
    } finally {
      setActionLoading(null)
    }
  }

  const handleReject = async (contentId) => {
    setActionLoading(contentId)
    try {
      const { error } = await supabase
        .from('generated_content')
        .update({ 
          approval_status: 'rejected',
          approved_at: new Date().toISOString(),
          approved_by: 'user'
        })
        .eq('id', contentId)

      if (error) {
        console.error('Error rejecting content:', error)
        alert('Error rejecting content. Please try again.')
      } else {
        // Remove from pending list
        setPendingContent(prev => prev.filter(item => item.id !== contentId))
        if (selectedContent?.id === contentId) {
          setSelectedContent(null)
        }
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error rejecting content. Please try again.')
    } finally {
      setActionLoading(null)
    }
  }

  const handleEdit = async () => {
    if (!selectedContent) return
    
    setActionLoading(selectedContent.id)
    try {
      const { error } = await supabase
        .from('generated_content')
        .update({ content_text: editedText })
        .eq('id', selectedContent.id)

      if (error) {
        console.error('Error updating content:', error)
        alert('Error updating content. Please try again.')
      } else {
        // Update local state
        setSelectedContent(prev => ({ ...prev, content_text: editedText }))
        setPendingContent(prev => 
          prev.map(item => 
            item.id === selectedContent.id 
              ? { ...item, content_text: editedText }
              : item
          )
        )
        setEditMode(false)
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error updating content. Please try again.')
    } finally {
      setActionLoading(null)
    }
  }

  const startEdit = () => {
    setEditedText(selectedContent?.content_text || '')
    setEditMode(true)
  }

  const cancelEdit = () => {
    setEditMode(false)
    setEditedText('')
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
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
      'expert-coach': 'bg-green-100 text-green-800',
      'relatable-mom': 'bg-purple-100 text-purple-800',
      'challenger': 'bg-orange-100 text-orange-800'
    }
    return colors[persona] || 'bg-gray-100 text-gray-800'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading pending content...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold younifaied-text-gradient mb-2">
            Review Content
          </h1>
          <p className="text-muted-foreground">
            Review and approve generated content before publishing
          </p>
        </div>
        <Button 
          onClick={fetchPendingContent}
          variant="outline"
          size="sm"
          disabled={loading}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {pendingContent.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">All caught up!</h3>
            <p className="text-muted-foreground">
              No pending content to review. New content will appear here when generated.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Content List */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Pending Approval ({pendingContent.length})</h2>
            {pendingContent.map((content) => (
              <Card 
                key={content.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedContent?.id === content.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedContent(content)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${getPlatformColor(content.platform)}`} />
                      <span className="font-medium capitalize">{content.platform}</span>
                      <Badge variant="secondary" className={getPersonaColor(content.persona)}>
                        {content.persona?.replace('-', ' ') || 'Unknown'}
                      </Badge>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {formatDate(content.created_at)}
                    </div>
                  </div>
                  
                  <h3 className="font-medium mb-2 line-clamp-2">
                    {content.topic || 'Untitled Content'}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {content.content_text}
                  </p>
                  
                  {content.generated_image_url && (
                    <div className="flex items-center mt-2 text-xs text-muted-foreground">
                      <ImageIcon className="h-3 w-3 mr-1" />
                      Image included
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Content Preview */}
          <div className="lg:sticky lg:top-6">
            {selectedContent ? (
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${getPlatformColor(selectedContent.platform)}`} />
                        <span className="capitalize">{selectedContent.platform} Post</span>
                      </CardTitle>
                      <CardDescription>
                        {selectedContent.topic}
                      </CardDescription>
                    </div>
                    <Badge className={getPersonaColor(selectedContent.persona)}>
                      {selectedContent.persona?.replace('-', ' ') || 'Unknown'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedContent.generated_image_url && (
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                      <div className="text-center text-muted-foreground">
                        <ImageIcon className="h-12 w-12 mx-auto mb-2" />
                        <p className="text-sm">Generated Image</p>
                        <p className="text-xs">Preview not available</p>
                      </div>
                    </div>
                  )}

                  <div>
                    <h4 className="font-medium mb-2">Content Text</h4>
                    {editMode ? (
                      <div className="space-y-3">
                        <Textarea
                          value={editedText}
                          onChange={(e) => setEditedText(e.target.value)}
                          className="min-h-[200px]"
                        />
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            onClick={handleEdit}
                            disabled={actionLoading === selectedContent.id}
                          >
                            {actionLoading === selectedContent.id ? 'Saving...' : 'Save Changes'}
                          </Button>
                          <Button size="sm" variant="outline" onClick={cancelEdit}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <p className="text-sm whitespace-pre-wrap bg-muted p-3 rounded">
                          {selectedContent.content_text}
                        </p>
                        <Button size="sm" variant="outline" onClick={startEdit}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Text
                        </Button>
                      </div>
                    )}
                  </div>

                  {selectedContent.hashtags && (
                    <div>
                      <h4 className="font-medium mb-2">Hashtags</h4>
                      <p className="text-sm text-blue-600">{selectedContent.hashtags}</p>
                    </div>
                  )}

                  {selectedContent.cta && (
                    <div>
                      <h4 className="font-medium mb-2">Call to Action</h4>
                      <p className="text-sm">{selectedContent.cta}</p>
                    </div>
                  )}

                  <div className="flex space-x-3 pt-4 border-t">
                    <Button 
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => handleApprove(selectedContent.id)}
                      disabled={actionLoading === selectedContent.id}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      {actionLoading === selectedContent.id ? 'Approving...' : 'Approve'}
                    </Button>
                    <Button 
                      variant="destructive" 
                      className="flex-1"
                      onClick={() => handleReject(selectedContent.id)}
                      disabled={actionLoading === selectedContent.id}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      {actionLoading === selectedContent.id ? 'Rejecting...' : 'Reject'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Eye className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Select Content to Review</h3>
                  <p className="text-muted-foreground">
                    Click on any content item from the list to preview and approve it
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

