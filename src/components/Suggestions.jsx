import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Lightbulb, TrendingUp, Clock, Target, Sparkles, ArrowRight, CheckCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export function Suggestions() {
  const [implementedSuggestions, setImplementedSuggestions] = useState(new Set())
  const [contentData, setContentData] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch content data to generate real suggestions
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

  const handleImplementSuggestion = (suggestionId) => {
    setImplementedSuggestions(prev => new Set([...prev, suggestionId]))
  }

  // Generate real suggestions based on content data
  const generateSuggestions = () => {
    if (!contentData || contentData.length === 0) return []

    const suggestions = []
    
    // Analyze platform distribution
    const platformCounts = contentData.reduce((acc, post) => {
      acc[post.platform] = (acc[post.platform] || 0) + 1
      return acc
    }, {})

    const totalPosts = contentData.length
    const mostUsedPlatform = Object.entries(platformCounts).sort(([,a], [,b]) => b - a)[0]
    
    if (mostUsedPlatform && mostUsedPlatform[1] / totalPosts > 0.5) {
      suggestions.push({
        id: 1,
        type: 'content',
        priority: 'medium',
        title: 'Diversify Your Platform Strategy',
        description: `${Math.round((mostUsedPlatform[1] / totalPosts) * 100)}% of your content is on ${mostUsedPlatform[0]}. Consider expanding to other platforms.`,
        insight: 'Platform diversification increases overall reach',
        action: 'Create content for Instagram, LinkedIn, or Twitter',
        impact: 'Broader audience reach and engagement',
        platforms: ['instagram', 'linkedin', 'twitter'],
        icon: Target,
        color: 'bg-blue-500'
      })
    }

    // Analyze persona usage
    const personaCounts = contentData.reduce((acc, post) => {
      acc[post.persona] = (acc[post.persona] || 0) + 1
      return acc
    }, {})

    const mostUsedPersona = Object.entries(personaCounts).sort(([,a], [,b]) => b - a)[0]
    
    if (mostUsedPersona && Object.keys(personaCounts).length > 1) {
      suggestions.push({
        id: 2,
        type: 'content',
        priority: 'low',
        title: 'Optimize Your Voice Strategy',
        description: `Your "${mostUsedPersona[0]}" persona is used most frequently. Consider balancing with other personas.`,
        insight: 'Voice variety keeps content fresh and engaging',
        action: 'Experiment with different personas for variety',
        impact: 'More diverse content and audience engagement',
        platforms: ['facebook', 'instagram', 'linkedin'],
        icon: Sparkles,
        color: 'bg-purple-500'
      })
    }

    // Recent activity suggestion
    const recentPosts = contentData.filter(post => {
      const postDate = new Date(post.created_at)
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      return postDate >= weekAgo
    })

    if (recentPosts.length > 0) {
      suggestions.push({
        id: 3,
        type: 'timing',
        priority: 'high',
        title: 'Maintain Your Content Momentum',
        description: `You've created ${recentPosts.length} posts this week. Keep up the consistent posting schedule.`,
        insight: 'Consistent posting improves audience engagement',
        action: 'Continue your current posting frequency',
        impact: 'Better algorithm performance and audience retention',
        platforms: Object.keys(platformCounts),
        icon: TrendingUp,
        color: 'bg-green-500'
      })
    }

    return suggestions
  }

  const suggestions = generateSuggestions()

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold younifaied-text-gradient mb-2">Smart Suggestions</h1>
          <p className="text-muted-foreground">Loading AI-powered content recommendations...</p>
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

  if (suggestions.length === 0) {
    return (
      <div className="space-y-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold younifaied-text-gradient mb-2">Smart Suggestions</h1>
          <p className="text-muted-foreground">AI-powered content recommendations based on your performance data</p>
        </div>

        <Card className="text-center py-12">
          <CardContent>
            <Lightbulb className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Suggestions Yet</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Once you create and publish more content, our AI will analyze your performance and provide personalized recommendations to improve your social media strategy.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• Optimal posting times for each platform</p>
              <p>• Trending hashtags and topics</p>
              <p>• Content format recommendations</p>
              <p>• Audience engagement insights</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold younifaied-text-gradient mb-2">Smart Suggestions</h1>
        <p className="text-muted-foreground">AI-powered content recommendations based on your performance data</p>
      </div>

      <div className="grid gap-6">
        {suggestions.map((suggestion) => {
          const Icon = suggestion.icon
          const isImplemented = implementedSuggestions.has(suggestion.id)
          
          return (
            <Card key={suggestion.id} className={`transition-all duration-200 ${isImplemented ? 'opacity-60' : 'hover:shadow-md'}`}>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg ${suggestion.color}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-lg">{suggestion.title}</h3>
                          <Badge variant={suggestion.priority === 'high' ? 'destructive' : suggestion.priority === 'medium' ? 'default' : 'secondary'}>
                            {suggestion.priority} priority
                          </Badge>
                        </div>
                        <p className="text-muted-foreground">{suggestion.description}</p>
                      </div>
                      
                      {isImplemented && (
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-blue-600 mb-1">💡 Insight</p>
                        <p className="text-muted-foreground">{suggestion.insight}</p>
                      </div>
                      <div>
                        <p className="font-medium text-green-600 mb-1">🎯 Expected Impact</p>
                        <p className="text-muted-foreground">{suggestion.impact}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">Platforms:</span>
                        <div className="flex space-x-1">
                          {suggestion.platforms.map((platform) => (
                            <Badge key={platform} variant="outline" className="text-xs">
                              {platform}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      {!isImplemented && (
                        <Button 
                          onClick={() => handleImplementSuggestion(suggestion.id)}
                          className="younifaied-gradient text-white"
                          size="sm"
                        >
                          Implement
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                      )}
                    </div>

                    <div className="bg-muted p-3 rounded-lg">
                      <p className="text-sm font-medium mb-1">🚀 Recommended Action</p>
                      <p className="text-sm text-muted-foreground">{suggestion.action}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {suggestions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Performance Insights</CardTitle>
            <CardDescription>Based on your content analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-blue-600">{contentData.length}</p>
                <p className="text-sm text-muted-foreground">Total Posts Analyzed</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">{suggestions.length}</p>
                <p className="text-sm text-muted-foreground">Active Suggestions</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-600">{implementedSuggestions.size}</p>
                <p className="text-sm text-muted-foreground">Implemented</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

