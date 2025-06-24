import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Auth } from './components/Auth'; // Assuming Auth.jsx is in components
import { ContentRequest } from './components/ContentRequest'; // Your content request form
import './index.css'; // IMPORTANT: Ensure your main CSS file is imported here
import './index.css';
// Main App component that handles routing and layout
const AppContent = () => {
  const { user, loading } = useAuth();
  const [activeSection, setActiveSection] = useState('request-content'); // Default section

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-xl font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Auth />; // Show authentication component if not logged in
  }

  // If logged in, show the dashboard
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6 flex flex-col">
        <div className="text-2xl font-bold mb-8">YouNifAiEd Dashboard</div>
        <nav className="flex-grow">
          <ul>
            <li className="mb-4">
              <button
                onClick={() => setActiveSection('request-content')}
                className={`w-full text-left py-2 px-4 rounded-md ${
                  activeSection === 'request-content' ? 'bg-blue-600' : 'hover:bg-gray-700'
                }`}
              >
                Request Content
              </button>
            </li>
            <li className="mb-4">
              <button
                onClick={() => setActiveSection('content-library')}
                className={`w-full text-left py-2 px-4 rounded-md ${
                  activeSection === 'content-library' ? 'bg-blue-600' : 'hover:bg-gray-700'
                }`}
              >
                Content Library
              </button>
            </li>
            <li className="mb-4">
              <button
                onClick={() => setActiveSection('analytics')}
                className={`w-full text-left py-2 px-4 rounded-md ${
                  activeSection === 'analytics' ? 'bg-blue-600' : 'hover:bg-gray-700'
                }`}
              >
                Analytics
              </button>
            </li>
            <li className="mb-4">
              <button
                onClick={() => setActiveSection('workflows')}
                className={`w-full text-left py-2 px-4 rounded-md ${
                  activeSection === 'workflows' ? 'bg-blue-600' : 'hover:bg-gray-700'
                }`}
              >
                Workflows
              </button>
            </li>
            <li className="mb-4">
              <button
                onClick={() => setActiveSection('settings')}
                className={`w-full text-left py-2 px-4 rounded-md ${
                  activeSection === 'settings' ? 'bg-blue-600' : 'hover:bg-gray-700'
                }`}
              >
                Settings
              </button>
            </li>
            {/* Admin Tools Section */}
            <li className="mt-8">
              <div className="text-sm font-semibold text-gray-400 uppercase mb-2">Admin Tools</div>
              <ul>
                <li className="mb-2">
                  <button
                    onClick={() => setActiveSection('user-management')}
                    className={`w-full text-left py-2 px-4 rounded-md ${
                      activeSection === 'user-management' ? 'bg-blue-600' : 'hover:bg-gray-700'
                    }`}
                  >
                    User Management
                  </button>
                </li>
                <li className="mb-2">
                  <button
                    onClick={() => setActiveSection('api-keys')}
                    className={`w-full text-left py-2 px-4 rounded-md ${
                      activeSection === 'api-keys' ? 'bg-blue-600' : 'hover:bg-gray-700'
                    }`}
                  >
                    API Keys
                  </button>
                </li>
                <li className="mb-2">
                  <button
                    onClick={() => setActiveSection('database-admin')}
                    className={`w-full text-left py-2 px-4 rounded-md ${
                      activeSection === 'database-admin' ? 'bg-blue-600' : 'hover:bg-gray-700'
                    }`}
                  >
                    Database Admin
                  </button>
                </li>
                <li className="mb-2">
                  <button
                    onClick={() => setActiveSection('system-logs')}
                    className={`w-full text-left py-2 px-4 rounded-md ${
                      activeSection === 'system-logs' ? 'bg-blue-600' : 'hover:bg-gray-700'
                    }`}
                  >
                    System Logs
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
        <div className="mt-auto pt-4 border-t border-gray-700">
          <div className="text-sm text-gray-400 mb-2">Logged in as:</div>
          <div className="font-semibold">{user.email}</div>
          <div className="text-xs text-gray-500 mb-4">Admin User</div> {/* Admin badge */}
          <button
            onClick={useAuth().signOut}
            className="w-full text-left py-2 px-4 rounded-md bg-red-600 hover:bg-red-700"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-8">
        {activeSection === 'request-content' && <ContentRequest />}
        {activeSection === 'content-library' && (
          <h2 className="text-2xl font-bold text-gray-800">Content Library (Coming Soon!)</h2>
        )}
        {activeSection === 'analytics' && (
          <h2 className="text-2xl font-bold text-gray-800">Analytics (Coming Soon!)</h2>
        )}
        {activeSection === 'workflows' && (
          <h2 className="text-2xl font-bold text-gray-800">Workflows (Coming Soon!)</h2>
        )}
        {activeSection === 'settings' && (
          <h2 className="text-2xl font-bold text-gray-800">Settings (Coming Soon!)</h2>
        )}
        {activeSection === 'user-management' && (
          <h2 className="text-2xl font-bold text-gray-800">User Management (Coming Soon!)</h2>
        )}
        {activeSection === 'api-keys' && (
          <h2 className="text-2xl font-bold text-gray-800">API Keys (Coming Soon!)</h2>
        )}
        {activeSection === 'database-admin' && (
          <h2 className="text-2xl font-bold text-gray-800">Database Admin (Coming Soon!)</h2>
        )}
        {activeSection === 'system-logs' && (
          <h2 className="text-2xl font-bold text-gray-800">System Logs (Coming Soon!)</h2>
        )}
      </main>
    </div>
  );
};

// Root App component wrapped with AuthProvider
const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
