import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Zap, PlusCircle, Eye, BarChart3, Lightbulb } from 'lucide-react'
import brandLogo from '@/assets/website_yunifaied-logo-website-v2-2025-4-16.png'

export function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    {
      id: 'quick-actions',
      label: 'Quick Actions',
      icon: Zap,
      description: 'Smart suggestions & autopilot'
    },
    {
      id: 'request',
      label: 'Request Content',
      icon: PlusCircle,
      description: 'Create new content requests'
    },
    {
      id: 'review',
      label: 'Review Content',
      icon: Eye,
      description: 'Approve or reject generated content'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart3,
      description: 'View performance data'
    },
    {
      id: 'suggestions',
      label: 'Smart Suggestions',
      icon: Lightbulb,
      description: 'AI-powered content recommendations'
    }
  ]

  return (
    <div className="w-64 bg-card border-r border-border p-4">
      {/* Logo */}
      <div className="mb-8 text-center">
        <img 
          src={brandLogo} 
          alt="YouNifAIed" 
          className="h-12 mx-auto mb-2"
        />
        <h1 className="text-lg font-semibold younifaied-text-gradient">
          Content Dashboard
        </h1>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "default" : "ghost"}
              className={`w-full justify-start h-auto p-3 ${
                activeTab === item.id 
                  ? 'younifaied-gradient text-white' 
                  : 'hover:bg-accent'
              }`}
              onClick={() => setActiveTab(item.id)}
            >
<<<<<<< HEAD
              <div className="flex items-start space-x-3">
                <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <div className="text-left">
                  <div className="font-medium">{item.label}</div>
                  <div className={`text-xs ${
=======
              <div className="flex items-start space-x-3 w-full min-w-0">
                <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <div className="text-left flex-1 min-w-0">
                  <div className="font-medium break-words leading-tight">{item.label}</div>
                  <div className={`text-xs break-words leading-tight ${
>>>>>>> 289c02e702defbe198c2460edef27ea764f648ed
                    activeTab === item.id 
                      ? 'text-white/80' 
                      : 'text-muted-foreground'
                  }`}>
                    {item.description}
                  </div>
                </div>
              </div>
            </Button>
          )
        })}
      </nav>

      {/* Status Card */}
      <Card className="mt-8 p-4">
        <div className="text-sm">
          <div className="font-medium mb-2">Quick Stats</div>
          <div className="space-y-1 text-muted-foreground">
            <div className="flex justify-between">
              <span>Pending Review:</span>
              <span className="font-medium">3</span>
            </div>
            <div className="flex justify-between">
              <span>Published Today:</span>
              <span className="font-medium">5</span>
            </div>
            <div className="flex justify-between">
              <span>This Week:</span>
              <span className="font-medium">24</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

<<<<<<< HEAD
=======

>>>>>>> 289c02e702defbe198c2460edef27ea764f648ed
