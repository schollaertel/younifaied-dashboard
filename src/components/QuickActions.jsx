<<<<<<< HEAD
import { useState } from 'react'
=======
import { useState, useEffect } from 'react'
>>>>>>> 289c02e702defbe198c2460edef27ea764f648ed
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
<<<<<<< HEAD
  Settings
} from 'lucide-react'
=======
  Settings,
  Lightbulb
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
>>>>>>> 289c02e702defbe198c2460edef27ea764f648ed

export function QuickActions() {
  const [autopilotMode, setAutopilotMode] = useState(false)
  const [selectedSuggestions, setSelectedSuggestions] = useState([])
<<<<<<< HEAD

  const suggestedTopics = [
    {
      id: 1,
      topic: "AI tools that catch student effort, not just errors",
      reason: "Your AI assessment posts get 3x more engagement",
      confidence: 95,
      platforms: ['LinkedIn', 'Facebook'],
      estimatedReach: 1200,
      bestTime: "Tuesday 4 PM"
    },
    {
      id: 2,
      topic: "Quick wins for personalized learning without the buzzwords",
      reason: "Practical teaching tips perform 40% better than theory",
      confidence: 88,
      platforms: ['Instagram', 'Twitter'],
      estimatedReach: 800,
      bestTime: "Wednesday 2 PM"
    },
    {
      id: 3,
      topic: "The real story behind that 'difficult' student's breakthrough",
      reason: "Personal classroom stories drive highest engagement",
      confidence: 92,
      platforms: ['Facebook', 'LinkedIn'],
      estimatedReach: 1500,
      bestTime: "Thursday 6 PM"
    },
    {
      id: 4,
      topic: "Academic integrity that actually works (beyond the cheating panic)",
      reason: "Trending topic in education circles this week",
      confidence: 85,
      platforms: ['LinkedIn', 'Twitter'],
      estimatedReach: 900,
      bestTime: "Friday 10 AM"
    }
  ]

  const handleSuggestionToggle = (id) => {
    setSelectedSuggestions(prev => 
      prev.includes(id) 
        ? prev.filter(s => s !== id)
        : [...prev, id]
=======
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
>>>>>>> 289c02e702defbe198c2460edef27ea764f648ed
    )
  }

  const handleCreateSelected = () => {
<<<<<<< HEAD
    const selected = suggestedTopics.filter(s => selectedSuggestions.includes(s.id))
    console.log('Creating content for:', selected)
    alert(`Creating ${selected.length} pieces of content and scheduling them automatically!`)
    setSelectedSuggestions([])
  }

  const handleAutopilot = () => {
    console.log('Enabling autopilot mode')
    alert('Autopilot enabled! I\'ll generate and schedule 3 high-confidence posts this week.')
=======
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
>>>>>>> 289c02e702defbe198c2460edef27ea764f648ed
  }

  return (
    <div className="space-y-6">
      <div className="mb-6">
<<<<<<< HEAD
        <h1 className="text-3xl font-bold younifaied-text-gradient mb-2">
          Quick Actions
        </h1>
        <p className="text-muted-foreground">
          Smart suggestions and automated content creation for busy educators
        </p>
      </div>

      {/* Automation Level Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5 text-primary" />
            <span>Automation Level</span>
          </CardTitle>
          <CardDescription>
            Choose how much control you want over your content creation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-3">
              <Zap className="h-5 w-5 text-green-500" />
              <div>
                <Label className="font-medium">Autopilot Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically generate and schedule high-confidence content
                </p>
              </div>
            </div>
            <Switch 
              checked={autopilotMode} 
              onCheckedChange={setAutopilotMode}
            />
          </div>

=======
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
          
>>>>>>> 289c02e702defbe198c2460edef27ea764f648ed
          {autopilotMode && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Play className="h-4 w-4 text-green-600" />
                <span className="font-medium text-green-800">Autopilot Active</span>
              </div>
<<<<<<< HEAD
              <p className="text-sm text-green-700 mb-3">
                I'll automatically create and schedule 3 posts this week based on your top-performing topics.
              </p>
              <Button 
                onClick={handleAutopilot}
                className="bg-green-600 hover:bg-green-700 text-white"
                size="sm"
              >
                <Zap className="h-4 w-4 mr-2" />
                Enable Autopilot
              </Button>
=======
              <p className="text-sm text-green-700">
                AI will automatically create and schedule content when confidence scores are above 90%.
                You'll still review everything before it goes live.
              </p>
>>>>>>> 289c02e702defbe198c2460edef27ea764f648ed
            </div>
          )}
        </CardContent>
      </Card>

<<<<<<< HEAD
      {/* Smart Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span>Smart Topic Suggestions</span>
          </CardTitle>
          <CardDescription>
            AI-powered content ideas based on your performance data and trending topics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {suggestedTopics.map((suggestion) => (
              <div 
                key={suggestion.id}
                className={`border rounded-lg p-4 transition-all ${
                  selectedSuggestions.includes(suggestion.id) 
                    ? 'border-primary bg-primary/5' 
                    : 'border-muted hover:border-muted-foreground/50'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">{suggestion.topic}</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      💡 {suggestion.reason}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {suggestion.confidence}% confidence
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        <Users className="h-3 w-3 mr-1" />
                        ~{suggestion.estimatedReach} reach
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        {suggestion.bestTime}
                      </Badge>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {suggestion.platforms.map((platform) => (
                        <Badge key={platform} variant="secondary" className="text-xs">
                          {platform}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2 ml-4">
                    <Button
                      variant={selectedSuggestions.includes(suggestion.id) ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleSuggestionToggle(suggestion.id)}
                    >
                      {selectedSuggestions.includes(suggestion.id) ? (
                        <>
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          Selected
                        </>
                      ) : (
                        'Select'
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {selectedSuggestions.length > 0 && (
            <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium mb-1">
                    {selectedSuggestions.length} topic{selectedSuggestions.length !== 1 ? 's' : ''} selected
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Ready to generate and schedule content automatically
                  </p>
                </div>
                <Button 
                  onClick={handleCreateSelected}
                  className="younifaied-gradient text-white"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Create & Schedule
                </Button>
              </div>
=======
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
>>>>>>> 289c02e702defbe198c2460edef27ea764f648ed
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Stats */}
<<<<<<< HEAD
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm font-medium">This Week</p>
                <p className="text-2xl font-bold">3</p>
                <p className="text-xs text-muted-foreground">Posts scheduled</p>
              </div>
            </div>
=======
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
>>>>>>> 289c02e702defbe198c2460edef27ea764f648ed
          </CardContent>
        </Card>

        <Card>
<<<<<<< HEAD
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium">Avg. Reach</p>
                <p className="text-2xl font-bold">1.2K</p>
                <p className="text-xs text-muted-foreground">Per post</p>
              </div>
            </div>
=======
          <CardContent className="p-6 text-center">
            <Target className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">{contentData.length}</p>
            <p className="text-sm text-muted-foreground">Total Published</p>
>>>>>>> 289c02e702defbe198c2460edef27ea764f648ed
          </CardContent>
        </Card>

        <Card>
<<<<<<< HEAD
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm font-medium">Time Saved</p>
                <p className="text-2xl font-bold">4.5h</p>
                <p className="text-xs text-muted-foreground">This week</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
=======
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
>>>>>>> 289c02e702defbe198c2460edef27ea764f648ed
    </div>
  )
}

