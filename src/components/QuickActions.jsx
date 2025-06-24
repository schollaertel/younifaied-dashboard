import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { 
  Zap, 
  Target, 
  Hand, 
  TrendingUp, 
  Clock, 
  Users, 
  ThumbsUp,
  Calendar,
  Sparkles,
  Play,
  Settings,
  Lightbulb
} from 'lucide-react'
import { supabase } from '@/lib/supabase'

export function QuickActions() {
  const [autopilotMode, setAutopilotMode] = useState(false)
  const [selectedSuggestions, setSelectedSuggestions] = useState([])
  const [contentData, setContentData] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch content data to generate suggestions
  const fetchContentData = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('generated_content')
        .select('*')
        .eq('approval_status', 'approved')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching content:', error)
      } else {
        setContentData(data || [])
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchContentData()
  }, [])

  const handleTopicSelect = (topicId) => {
    setSelectedSuggestions(prev => 
      prev.includes(topicId) 
        ? prev.filter(id => id !== topicId)
        : [...prev, topicId]
    )
  }

  const handleCreateSelected = () => {
    if (selectedSuggestions.length === 0) return
    
    // Here you would trigger content generation for selected topics
    console.log('Creating content for topics:', selectedSuggestions)
    alert(`Creating content for ${selectedSuggestions.length} selected topics!`)
    setSelectedSuggestions([])
  }

  // Generate suggestions based on existing content
  const generateTopicSuggestions = () => {
    if (!contentData || contentData.length === 0) return []

    // Analyze existing topics to suggest similar ones
    const topicKeywords = contentData.map(post => post.topic?.toLowerCase() || '').join(' ')
    
    const suggestions = []
    
    if (topicKeywords.includes('ai') || topicKeywords.includes('artificial intelligence')) {
      suggestions.push({
        id: 1,
        topic: "AI tools that help teachers work smarter, not harder",
        reason: "AI-related content shows strong engagement",
        confidence: 85,
        platforms: ['LinkedIn', 'Facebook'],
        estimatedReach: 'Medium',
        bestTime: "Tuesday 4 PM"
      })
    }

    if (topicKeywords.includes('student') || topicKeywords.includes('classroom')) {
      suggestions.push({
        id: 2,
        topic: "Real classroom moments that changed everything",
        reason: "Personal teaching stories resonate with educators",
        confidence: 90,
        platforms: ['Facebook', 'Instagram'],
        estimatedReach: 'High',
        bestTime: "Wednesday 2 PM"
      })
    }

    if (topicKeywords.includes('assessment') || topicKeywords.includes('grading')) {
      suggestions.push({
        id: 3,
        topic: "Assessment strategies that actually measure learning",
        reason: "Assessment content performs well with educators",
        confidence: 88,
        platforms: ['LinkedIn', 'Twitter'],
        estimatedReach: 'Medium',
        bestTime: "Thursday 3 PM"
      })
    }

    return suggestions
  }

  const suggestedTopics = generateTopicSuggestions()

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold younifaied-text-gradient mb-2">Quick Actions</h1>
          <p className="text-muted-foreground">Loading smart suggestions & autopilot...</p>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold younifaied-text-gradient mb-2">Quick Actions</h1>
        <p className="text-muted-foreground">Smart suggestions & autopilot for busy educators</p>
      </div>

      {/* Autopilot Mode */}
      <Card className="border-2 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-primary" />
            <span>Autopilot Mode</span>
            <Badge variant={autopilotMode ? "default" : "secondary"}>
              {autopilotMode ? "Active" : "Inactive"}
            </Badge>
          </CardTitle>
          <CardDescription>
            Let AI handle your content creation automatically based on performance data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="autopilot" className="text-base font-medium">
                Enable Autopilot
              </Label>
              <p className="text-sm text-muted-foreground">
                Automatically generate and schedule high-confidence content
              </p>
            </div>
            <Switch
              id="autopilot"
              checked={autopilotMode}
              onCheckedChange={setAutopilotMode}
            />
          </div>
          
          {autopilotMode && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Play className="h-4 w-4 text-green-600" />
                <span className="font-medium text-green-800">Autopilot Active</span>
              </div>
              <p className="text-sm text-green-700">
                AI will automatically create and schedule content when confidence scores are above 90%.
                You'll still review everything before it goes live.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Smart Topic Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-primary" />
            <span>Smart Topic Suggestions</span>
          </CardTitle>
          <CardDescription>
            AI-powered content ideas based on your performance data
          </CardDescription>
        </CardHeader>
        <CardContent>
          {suggestedTopics.length === 0 ? (
            <div className="text-center py-8">
              <Lightbulb className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Suggestions Yet</h3>
              <p className="text-muted-foreground mb-4">
                Create more content to get AI-powered topic suggestions based on your performance data.
              </p>
              <p className="text-sm text-muted-foreground">
                Once you have published content, our AI will analyze what works best and suggest similar topics.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {suggestedTopics.map((suggestion) => (
                <div 
                  key={suggestion.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedSuggestions.includes(suggestion.id) 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => handleTopicSelect(suggestion.id)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-medium mb-1">{suggestion.topic}</h4>
                      <p className="text-sm text-muted-foreground">{suggestion.reason}</p>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <Badge variant="outline" className="text-xs">
                        {suggestion.confidence}% confidence
                      </Badge>
                      {selectedSuggestions.includes(suggestion.id) && (
                        <ThumbsUp className="h-4 w-4 text-primary" />
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Users className="h-3 w-3" />
                      <span>Reach: {suggestion.estimatedReach}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{suggestion.bestTime}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Target className="h-3 w-3" />
                      <span>{suggestion.platforms.join(', ')}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="h-3 w-3" />
                      <span>High engagement</span>
                    </div>
                  </div>
                </div>
              ))}
              
              {selectedSuggestions.length > 0 && (
                <div className="flex justify-between items-center pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    {selectedSuggestions.length} topic{selectedSuggestions.length !== 1 ? 's' : ''} selected
                  </p>
                  <Button 
                    onClick={handleCreateSelected}
                    className="younifaied-gradient text-white"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Create & Schedule
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <Calendar className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">
              {contentData.filter(post => {
                const postDate = new Date(post.created_at)
                const weekAgo = new Date()
                weekAgo.setDate(weekAgo.getDate() - 7)
                return postDate >= weekAgo
              }).length}
            </p>
            <p className="text-sm text-muted-foreground">Posts This Week</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Target className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">{contentData.length}</p>
            <p className="text-sm text-muted-foreground">Total Published</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-8 w-8 text-purple-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">
              {contentData.length > 0 ? Math.round(contentData.length / 4) : 0}
            </p>
            <p className="text-sm text-muted-foreground">Avg Per Week</p>
          </CardContent>
        </Card>
      </div>

      {/* Manual Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Hand className="h-5 w-5 text-primary" />
            <span>Manual Actions</span>
          </CardTitle>
          <CardDescription>
            Take direct control when you need it
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="h-auto p-4 justify-start">
              <div className="text-left">
                <p className="font-medium">Create Custom Content</p>
                <p className="text-sm text-muted-foreground">Use the full request form</p>
              </div>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 justify-start">
              <div className="text-left">
                <p className="font-medium">Review Pending</p>
                <p className="text-sm text-muted-foreground">Check content awaiting approval</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

