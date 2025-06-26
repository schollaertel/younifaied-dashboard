<<<<<<< HEAD
import { useState } from 'react'
=======
import { useState, useEffect } from 'react'
>>>>>>> 289c02e702defbe198c2460edef27ea764f648ed
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Lightbulb, TrendingUp, Clock, Target, Sparkles, ArrowRight, CheckCircle } from 'lucide-react'
<<<<<<< HEAD

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
=======
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
>>>>>>> 289c02e702defbe198c2460edef27ea764f648ed
              </CardContent>
            </Card>
          )
        })}
      </div>

<<<<<<< HEAD
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
=======
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
>>>>>>> 289c02e702defbe198c2460edef27ea764f648ed
    </div>
  )
}

