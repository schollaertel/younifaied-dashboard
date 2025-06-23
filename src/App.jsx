import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Sidebar } from '@/components/Sidebar'
import { ContentRequest } from '@/components/ContentRequest'
import { ContentReview } from '@/components/ContentReview'
import { Analytics } from '@/components/Analytics'
import { Suggestions } from '@/components/Suggestions'
import { QuickActions } from '@/components/QuickActions'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('quick-actions')

  return (
    <Router>
      <div className="flex h-screen bg-background">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            {activeTab === 'quick-actions' && <QuickActions />}
            {activeTab === 'request' && <ContentRequest />}
            {activeTab === 'review' && <ContentReview />}
            {activeTab === 'analytics' && <Analytics />}
            {activeTab === 'suggestions' && <Suggestions />}
          </div>
        </main>
      </div>
    </Router>
  )
}

export default App

