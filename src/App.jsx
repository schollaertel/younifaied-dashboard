import { useState } from 'react'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { Auth } from './components/Auth'
import { ContentRequest } from './components/ContentRequest'
import './App.css'

// Admin Dashboard Component
function AdminDashboard() {
  const { user, profile, signOut } = useAuth()
  const [currentView, setCurrentView] = useState('content-request')

  const handleSignOut = async () => {
    await signOut()
  }

  const navigation = [
    { id: 'content-request', name: 'Request Content', icon: '📝' },
    { id: 'content-library', name: 'Content Library', icon: '📚' },
    { id: 'analytics', name: 'Analytics', icon: '📊' },
    { id: 'workflows', name: 'Workflows', icon: '⚙️' },
    { id: 'settings', name: 'Settings', icon: '🔧' },
    { id: 'users', name: 'User Management', icon: '👥' },
    { id: 'api-keys', name: 'API Keys', icon: '🔑' }
  ]

  const renderContent = () => {
    switch (currentView) {
      case 'content-request':
        return <ContentRequest />
      case 'content-library':
        return <ContentLibraryView />
      case 'analytics':
        return <AnalyticsView />
      case 'workflows':
        return <WorkflowsView />
      case 'settings':
        return <SettingsView />
      case 'users':
        return <UserManagementView />
      case 'api-keys':
        return <ApiKeysView />
      default:
        return <ContentRequest />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">YouNifAIed Dashboard</h1>
              <span className="ml-3 px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                ADMIN
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-700">
                Welcome, <span className="font-medium">{profile?.full_name || user?.email}</span>
              </div>
              <button
                onClick={handleSignOut}
                className="bg-gray-600 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-700"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-white shadow-sm min-h-screen">
          <div className="p-4">
            <div className="space-y-2">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`w-full flex items-center px-3 py-2 text-left rounded-md text-sm font-medium transition-colors ${
                    currentView === item.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* Admin Tools */}
          <div className="border-t border-gray-200 mt-6 pt-6 px-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Admin Tools
            </h3>
            <div className="space-y-2">
              <button className="w-full flex items-center px-3 py-2 text-left rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">
                <span className="mr-3">🗄️</span>
                Database Admin
              </button>
              <button className="w-full flex items-center px-3 py-2 text-left rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">
                <span className="mr-3">🔍</span>
                System Logs
              </button>
              <button className="w-full flex items-center px-3 py-2 text-left rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">
                <span className="mr-3">⚡</span>
                Performance
              </button>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}

// Placeholder components for other views
function ContentLibraryView() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4">Content Library</h2>
      <p className="text-gray-600">View and manage all generated content here.</p>
      <div className="mt-4 p-4 bg-blue-50 rounded-md">
        <p className="text-sm text-blue-800">🚧 Coming soon: Browse, edit, and republish your content</p>
      </div>
    </div>
  )
}

function AnalyticsView() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4">Analytics Dashboard</h2>
      <p className="text-gray-600">Track performance across all platforms.</p>
      <div className="mt-4 p-4 bg-green-50 rounded-md">
        <p className="text-sm text-green-800">📊 Coming soon: Engagement metrics, reach analytics, and ROI tracking</p>
      </div>
    </div>
  )
}

function WorkflowsView() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4">Workflow Management</h2>
      <p className="text-gray-600">Configure and monitor your content workflows.</p>
      <div className="mt-4 p-4 bg-purple-50 rounded-md">
        <p className="text-sm text-purple-800">⚙️ Coming soon: Custom workflow builder and automation rules</p>
      </div>
    </div>
  )
}

function SettingsView() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4">System Settings</h2>
      <p className="text-gray-600">Configure your dashboard preferences and integrations.</p>
      <div className="mt-4 p-4 bg-yellow-50 rounded-md">
        <p className="text-sm text-yellow-800">🔧 Coming soon: Brand settings, default preferences, and integration configs</p>
      </div>
    </div>
  )
}

function UserManagementView() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4">User Management</h2>
      <p className="text-gray-600">Manage team members and permissions.</p>
      <div className="mt-4 p-4 bg-red-50 rounded-md">
        <p className="text-sm text-red-800">👥 Coming soon: Add team members, set roles, and manage permissions</p>
      </div>
    </div>
  )
}

function ApiKeysView() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4">API Keys Management</h2>
      <p className="text-gray-600">Manage your API integrations and keys.</p>
      <div className="mt-4 space-y-4">
        <div className="p-4 bg-gray-50 rounded-md">
          <h3 className="font-medium text-gray-900">Blotato API</h3>
          <p className="text-sm text-gray-600">Status: {import.meta.env.VITE_BLOTATO_API_KEY ? '✅ Connected' : '❌ Not configured'}</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-md">
          <h3 className="font-medium text-gray-900">Supabase</h3>
          <p className="text-sm text-gray-600">Status: ✅ Connected</p>
        </div>
      </div>
    </div>
  )
}

// Main App Component with Authentication
function AppContent() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Auth />
  }

  return <AdminDashboard />
}

// Root App Component
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App

