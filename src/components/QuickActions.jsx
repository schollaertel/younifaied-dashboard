import { useState } from 'react'
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
  Settings
} from 'lucide-react'

export function QuickActions() {
  const [autopilotMode, setAutopilotMode] = useState(false)
  const [selectedSuggestions, setSelectedSuggestions] = useState([])

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
    )
  }

  const handleCreateSelected = () => {
    const selected = suggestedTopics.filter(s => selectedSuggestions.includes(s.id))
    console.log('Creating content for:', selected)
    alert(`Creating ${selected.length} pieces of content and scheduling them automatically!`)
    setSelectedSuggestions([])
  }

  const handleAutopilot = () => {
    console.log('Enabling autopilot mode')
    alert('Autopilot enabled! I\'ll generate and schedule 3 high-confidence posts this week.')
  }

  return (
    <div className="space-y-6">
      <div className="mb-6">
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

          {autopilotMode && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Play className="h-4 w-4 text-green-600" />
                <span className="font-medium text-green-800">Autopilot Active</span>
              </div>
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
            </div>
          )}
        </CardContent>
      </Card>

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
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Stats */}
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
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium">Avg. Reach</p>
                <p className="text-2xl font-bold">1.2K</p>
                <p className="text-xs text-muted-foreground">Per post</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
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
    </div>
  )
}

