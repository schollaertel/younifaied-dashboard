import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
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
    </div>
  )
}

