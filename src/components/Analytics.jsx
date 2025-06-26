<<<<<<< HEAD
import { useState } from 'react'
=======
import { useState, useEffect } from 'react'
>>>>>>> 289c02e702defbe198c2460edef27ea764f648ed
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
<<<<<<< HEAD
import { TrendingUp, TrendingDown, Users, Heart, MessageCircle, Share, Calendar } from 'lucide-react'

export function Analytics() {
  const [timeRange, setTimeRange] = useState('7d')

  // Mock analytics data
  const performanceData = [
    { date: '2025-06-17', facebook: 245, instagram: 189, linkedin: 156, twitter: 98 },
    { date: '2025-06-18', facebook: 289, instagram: 234, linkedin: 178, twitter: 123 },
    { date: '2025-06-19', facebook: 312, instagram: 267, linkedin: 198, twitter: 145 },
    { date: '2025-06-20', facebook: 278, instagram: 298, linkedin: 234, twitter: 167 },
    { date: '2025-06-21', facebook: 356, instagram: 334, linkedin: 267, twitter: 189 },
    { date: '2025-06-22', facebook: 398, instagram: 378, linkedin: 289, twitter: 234 },
    { date: '2025-06-23', facebook: 423, instagram: 412, linkedin: 312, twitter: 267 }
  ]

  const engagementData = [
    { name: 'Facebook', value: 35, color: '#1877F2' },
    { name: 'Instagram', value: 28, color: '#E4405F' },
    { name: 'LinkedIn', value: 22, color: '#0A66C2' },
    { name: 'Twitter', value: 15, color: '#000000' }
  ]

  const topPerformingPosts = [
    {
      id: 1,
      platform: 'instagram',
      topic: 'Using AI to catch student effort instead of just errors',
      engagement: 412,
      likes: 89,
      comments: 23,
      shares: 12,
      posted_at: '2025-06-23T16:00:00Z',
      performance: 'high'
    },
    {
      id: 2,
      platform: 'facebook',
      topic: 'Academic integrity in the AI age',
      engagement: 398,
      likes: 76,
      comments: 34,
      shares: 18,
      posted_at: '2025-06-22T14:30:00Z',
      performance: 'high'
    },
    {
      id: 3,
      platform: 'linkedin',
      topic: 'Personalized learning without the buzzwords',
      engagement: 312,
      likes: 67,
      comments: 19,
      shares: 15,
      posted_at: '2025-06-23T09:00:00Z',
      performance: 'medium'
    }
  ]

  const keyMetrics = [
    {
      title: 'Total Engagement',
      value: '2,847',
      change: '+23.5%',
      trend: 'up',
      icon: Heart,
      description: 'Last 7 days'
    },
    {
      title: 'Reach',
      value: '12.4K',
      change: '+18.2%',
      trend: 'up',
      icon: Users,
      description: 'Unique users reached'
    },
    {
      title: 'Comments',
      value: '156',
      change: '+31.7%',
      trend: 'up',
      icon: MessageCircle,
      description: 'Meaningful conversations'
    },
    {
      title: 'Shares',
      value: '89',
      change: '-5.3%',
      trend: 'down',
      icon: Share,
      description: 'Content amplification'
    }
  ]

  const getPlatformColor = (platform) => {
    const colors = {
      facebook: 'bg-blue-500',
      instagram: 'bg-pink-500',
      linkedin: 'bg-blue-600',
      twitter: 'bg-black'
    }
    return colors[platform] || 'bg-gray-500'
  }

  const getPerformanceBadge = (performance) => {
    const variants = {
      high: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-red-100 text-red-800'
    }
    return variants[performance] || variants.medium
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold younifaied-text-gradient mb-2">
            Analytics Dashboard
          </h1>
          <p className="text-muted-foreground">
            Track your content performance and engagement metrics
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 3 months</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {keyMetrics.map((metric, index) => {
          const Icon = metric.icon
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {metric.title}
                    </p>
                    <p className="text-2xl font-bold">{metric.value}</p>
                    <div className="flex items-center space-x-1 mt-1">
                      {metric.trend === 'up' ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      )}
                      <span className={`text-sm font-medium ${
                        metric.trend === 'up' ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {metric.change}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {metric.description}
                    </p>
                  </div>
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Engagement Over Time</CardTitle>
            <CardDescription>
              Daily engagement across all platforms
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                />
                <YAxis />
                <Tooltip 
                  labelFormatter={(value) => new Date(value).toLocaleDateString()}
                />
                <Line type="monotone" dataKey="facebook" stroke="#1877F2" strokeWidth={2} />
                <Line type="monotone" dataKey="instagram" stroke="#E4405F" strokeWidth={2} />
                <Line type="monotone" dataKey="linkedin" stroke="#0A66C2" strokeWidth={2} />
                <Line type="monotone" dataKey="twitter" stroke="#000000" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Platform Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Platform Distribution</CardTitle>
            <CardDescription>
              Engagement share by platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={engagementData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {engagementData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {engagementData.map((platform) => (
                <div key={platform.name} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: platform.color }}
                  />
                  <span className="text-sm">{platform.name}</span>
                  <span className="text-sm font-medium">{platform.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Performing Posts */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Posts</CardTitle>
            <CardDescription>
              Your best content this week
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {topPerformingPosts.map((post) => (
              <div key={post.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <Badge className={`${getPlatformColor(post.platform)} text-white text-xs`}>
                        {post.platform}
                      </Badge>
                      <Badge className={`${getPerformanceBadge(post.performance)} text-xs`}>
                        {post.performance}
                      </Badge>
                    </div>
                    <p className="text-sm font-medium line-clamp-2">
                      {post.topic}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="flex items-center justify-center space-x-1">
                      <Heart className="h-3 w-3 text-red-500" />
                      <span className="text-sm font-medium">{post.likes}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Likes</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center space-x-1">
                      <MessageCircle className="h-3 w-3 text-blue-500" />
                      <span className="text-sm font-medium">{post.comments}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Comments</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center space-x-1">
                      <Share className="h-3 w-3 text-green-500" />
                      <span className="text-sm font-medium">{post.shares}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Shares</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
=======
import { TrendingUp, TrendingDown, Users, Heart, MessageCircle, Share, Calendar, BarChart3 } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export function Analytics() {
  const [timeRange, setTimeRange] = useState('7d')
  const [analyticsData, setAnalyticsData] = useState(null)
  const [loading, setLoading] = useState(true)

  // Fetch analytics data from Supabase
  const fetchAnalyticsData = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('generated_content')
        .select('*')
        .eq('approval_status', 'approved')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching analytics:', error)
      } else {
        setAnalyticsData(data || [])
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAnalyticsData()
  }, [timeRange])

  // Show empty state when no data is available
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold younifaied-text-gradient mb-2">Analytics</h1>
          <p className="text-muted-foreground">Loading your content performance data...</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (!analyticsData || analyticsData.length === 0) {
    return (
      <div className="space-y-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold younifaied-text-gradient mb-2">Analytics</h1>
          <p className="text-muted-foreground">View performance metrics and insights for your content</p>
        </div>

        <Card className="text-center py-12">
          <CardContent>
            <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Analytics Data Yet</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Once you start creating and publishing content, you'll see performance metrics, engagement data, and insights here.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• Track engagement across all platforms</p>
              <p>• Monitor reach and impressions</p>
              <p>• Identify top-performing content</p>
              <p>• Get data-driven recommendations</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Calculate basic metrics from approved content
  const totalPosts = analyticsData.length
  const platformCounts = analyticsData.reduce((acc, post) => {
    acc[post.platform] = (acc[post.platform] || 0) + 1
    return acc
  }, {})

  return (
    <div className="space-y-6">
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold younifaied-text-gradient mb-2">Analytics</h1>
          <p className="text-muted-foreground">View performance metrics and insights for your content</p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Posts</p>
                <p className="text-2xl font-bold">{totalPosts}</p>
              </div>
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                <BarChart3 className="h-4 w-4 text-blue-600" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Content created and approved
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Platforms</p>
                <p className="text-2xl font-bold">{Object.keys(platformCounts).length}</p>
              </div>
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <Share className="h-4 w-4 text-green-600" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Active social platforms
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">This Week</p>
                <p className="text-2xl font-bold">
                  {analyticsData.filter(post => {
                    const postDate = new Date(post.created_at)
                    const weekAgo = new Date()
                    weekAgo.setDate(weekAgo.getDate() - 7)
                    return postDate >= weekAgo
                  }).length}
                </p>
              </div>
              <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                <Calendar className="h-4 w-4 text-purple-600" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Posts created this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Status</p>
                <p className="text-2xl font-bold text-green-600">Active</p>
              </div>
              <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-orange-600" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Content pipeline running
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Platform Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Platform Distribution</CardTitle>
          <CardDescription>Content created across different platforms</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(platformCounts).map(([platform, count]) => (
              <div key={platform} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${
                    platform === 'facebook' ? 'bg-blue-500' :
                    platform === 'instagram' ? 'bg-pink-500' :
                    platform === 'linkedin' ? 'bg-blue-600' :
                    'bg-black'
                  }`} />
                  <span className="capitalize font-medium">{platform}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">{count} posts</span>
                  <Badge variant="secondary">
                    {Math.round((count / totalPosts) * 100)}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Content */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Content</CardTitle>
          <CardDescription>Your latest approved posts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analyticsData.slice(0, 5).map((post) => (
              <div key={post.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <p className="font-medium truncate max-w-[300px]">{post.topic}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {post.platform}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {post.persona}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(post.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <Badge variant="secondary" className="text-green-600">
                  Approved
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle>Export Data</CardTitle>
          <CardDescription>Download your analytics data for further analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Button variant="outline" disabled>
              Export CSV
            </Button>
            <Button variant="outline" disabled>
              Export PDF Report
            </Button>
            <p className="text-sm text-muted-foreground self-center">
              Export features coming soon
            </p>
          </div>
        </CardContent>
      </Card>
>>>>>>> 289c02e702defbe198c2460edef27ea764f648ed
    </div>
  )
}

