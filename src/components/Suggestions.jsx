import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Lightbulb, TrendingUp, Clock, Target, Sparkles, ArrowRight, CheckCircle } from 'lucide-react'

export function Suggestions() {
  const [implementedSuggestions, setImplementedSuggestions] = useState(new Set())

  const suggestions = [
    {
      id: 1,
      type: 'timing',
      priority: 'high',
      title: 'Optimize Instagram Posting Time',
      description: 'Your carousel posts at 4 PM on Instagram are performing 45% better than other times.',
      insight: 'Posts between 3-5 PM get 2.3x more engagement',
      action: 'Schedule more carousel content for 4 PM weekdays',
      impact: 'Potential 45% engagement increase',
      platforms: ['instagram'],
      icon: Clock,
      color: 'bg-blue-500'
    },
    {
      id: 2,
      type: 'trending',
      priority: 'high',
      title: 'Trending Hashtag Opportunity',
      description: '#AIinEducation is trending 340% higher this week. Create content to ride this wave.',
      insight: 'Hashtag has 2.1M impressions in the last 7 days',
      action: 'Create 2-3 posts about AI tools for teachers',
      impact: 'Potential reach increase of 200%',
      platforms: ['linkedin', 'twitter'],
      icon: TrendingUp,
      color: 'bg-green-500'
    },
    {
      id: 3,
      type: 'content',
      priority: 'medium',
      title: 'Double Down on "Real Talk" Content',
      description: 'Your "Relatable Mom" persona posts get 60% more comments than other personas.',
      insight: 'Authentic, personal stories drive engagement',
      action: 'Increase "Relatable Mom" content to 40% of posts',
      impact: 'Higher comment rates and community building',
      platforms: ['facebook', 'instagram'],
      icon: Target,
      color: 'bg-purple-500'
    },
    {
      id: 4,
      type: 'format',
      priority: 'medium',
      title: 'Carousel Content Performs Best',
      description: 'Your carousel posts get 3x more saves and shares than single image posts.',
      insight: 'Educational carousels have highest retention',
      action: 'Convert top single posts into carousel format',
      impact: 'Increased saves and viral potential',
      platforms: ['instagram', 'linkedin'],
      icon: Sparkles,
      color: 'bg-orange-500'
    },
    {
      id: 5,
      type: 'engagement',
      priority: 'low',
      title: 'Ask More Questions',
      description: 'Posts ending with questions get 85% more comments than statements.',
      insight: 'Community wants to share their experiences',
      action: 'End posts with specific, actionable questions',
      impact: 'Build stronger teacher community',
      platforms: ['facebook', 'linkedin'],
      icon: Lightbulb,
      color: 'bg-teal-500'
    }
  ]

  const handleImplement = (suggestionId) => {
    setImplementedSuggestions(prev => new Set([...prev, suggestionId]))
    // TODO: Create content request based on suggestion
    console.log('Implementing suggestion:', suggestionId)
  }

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800'
    }
    return colors[priority] || colors.medium
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

  const getTypeIcon = (type) => {
    const icons = {
      timing: Clock,
      trending: TrendingUp,
      content: Target,
      format: Sparkles,
      engagement: Lightbulb
    }
    return icons[type] || Lightbulb
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold younifaied-text-gradient mb-2">
          Smart Suggestions
        </h1>
        <p className="text-muted-foreground">
          AI-powered recommendations based on your content performance and trending data
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-full">
                <Lightbulb className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{suggestions.length}</p>
                <p className="text-sm text-muted-foreground">Active Suggestions</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-full">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{implementedSuggestions.size}</p>
                <p className="text-sm text-muted-foreground">Implemented</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 rounded-full">
                <TrendingUp className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">+23%</p>
                <p className="text-sm text-muted-foreground">Avg. Improvement</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Suggestions List */}
      <div className="space-y-4">
        {suggestions.map((suggestion) => {
          const Icon = getTypeIcon(suggestion.type)
          const isImplemented = implementedSuggestions.has(suggestion.id)
          
          return (
            <Card key={suggestion.id} className={isImplemented ? 'opacity-60' : ''}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 ${suggestion.color} rounded-full`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <CardTitle className="text-lg">{suggestion.title}</CardTitle>
                        <Badge className={getPriorityColor(suggestion.priority)}>
                          {suggestion.priority} priority
                        </Badge>
                        {isImplemented && (
                          <Badge className="bg-green-100 text-green-800">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Implemented
                          </Badge>
                        )}
                      </div>
                      <CardDescription className="text-base">
                        {suggestion.description}
                      </CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Platforms */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">Platforms:</span>
                  {suggestion.platforms.map((platform) => (
                    <Badge 
                      key={platform} 
                      className={`${getPlatformColor(platform)} text-white text-xs`}
                    >
                      {platform}
                    </Badge>
                  ))}
                </div>

                {/* Insight */}
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-sm">
                    <span className="font-medium">💡 Insight:</span> {suggestion.insight}
                  </p>
                </div>

                {/* Action & Impact */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium mb-1">Recommended Action</h4>
                    <p className="text-sm text-muted-foreground">{suggestion.action}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1">Expected Impact</h4>
                    <p className="text-sm text-muted-foreground">{suggestion.impact}</p>
                  </div>
                </div>

                {/* Action Button */}
                <div className="flex justify-end">
                  {isImplemented ? (
                    <Button disabled variant="outline">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Implemented
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => handleImplement(suggestion.id)}
                      className="younifaied-gradient text-white"
                    >
                      Implement Suggestion
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Help Text */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <Lightbulb className="h-6 w-6 text-primary mt-1" />
            <div>
              <h3 className="font-medium mb-2">How Smart Suggestions Work</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Our AI analyzes your content performance, engagement patterns, trending topics, and optimal posting times 
                to provide personalized recommendations. Implementing these suggestions can significantly improve your 
                content's reach and engagement. Each suggestion is backed by data from your actual performance metrics.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

