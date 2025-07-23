import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Auth } from './components/Auth';
import ContentRequest from './components/ContentRequest';
import './index.css'; // main stylesheet

// The inner dashboard/content switcher
const AppContent = () => {
  const { user, loading } = useAuth();
  const [activeSection, setActiveSection] = useState('request-content');

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-xl font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Auth />;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6 flex flex-col">
        <div className="text-2xl font-bold mb-8">YouNifAiEd Dashboard</div>
        <nav className="flex-grow">
          <ul>
            {[
              { key: 'request-content', label: 'Request Content' },
              { key: 'content-library', label: 'Content Library' },
              { key: 'analytics', label: 'Analytics' },
              { key: 'workflows', label: 'Workflows' },
              { key: 'settings', label: 'Settings' },
            ].map(({ key, label }) => (
              <li key={key} className="mb-4">
                <button
                  onClick={() => setActiveSection(key)}
                  className={`w-full text-left py-2 px-4 rounded-md ${
                    activeSection === key ? 'bg-blue-600' : 'hover:bg-gray-700'
                  }`}
                >
                  {label}
                </button>
              </li>
            ))}

            {/* Admin Tools */}
            <li className="mt-8">
              <div className="text-sm font-semibold text-gray-400 uppercase mb-2">
                Admin Tools
              </div>
              {[
                { key: 'user-management', label: 'User Management' },
                { key: 'api-keys', label: 'API Keys' },
                { key: 'database-admin', label: 'Database Admin' },
                { key: 'system-logs', label: 'System Logs' },
              ].map(({ key, label }) => (
                <li key={key} className="mb-2">
                  <button
                    onClick={() => setActiveSection(key)}
                    className={`w-full text-left py-2 px-4 rounded-md ${
                      activeSection === key ? 'bg-blue-600' : 'hover:bg-gray-700'
                    }`}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </li>
          </ul>
        </nav>

        {/* Footer */}
        <div className="mt-auto pt-4 border-t border-gray-700">
          <div className="text-sm text-gray-400 mb-2">Logged in as:</div>
          <div className="font-semibold">{user.email}</div>
          <div className="text-xs text-gray-500 mb-4">Admin User</div>
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
          <h2 className="text-2xl font-bold text-gray-800">
            Content Library (Coming Soon!)
          </h2>
        )}
        {activeSection === 'analytics' && (
          <h2 className="text-2xl font-bold text-gray-800">
            Analytics (Coming Soon!)
          </h2>
        )}
        {activeSection === 'workflows' && (
          <h2 className="text-2xl font-bold text-gray-800">
            Workflows (Coming Soon!)
          </h2>
        )}
        {activeSection === 'settings' && (
          <h2 className="text-2xl font-bold text-gray-800">
            Settings (Coming Soon!)
          </h2>
        )}
        {activeSection === 'user-management' && (
          <h2 className="text-2xl font-bold text-gray-800">
            User Management (Coming Soon!)
          </h2>
        )}
        {activeSection === 'api-keys' && (
          <h2 className="text-2xl font-bold text-gray-800">
            API Keys (Coming Soon!)
          </h2>
        )}
        {activeSection === 'database-admin' && (
          <h2 className="text-2xl font-bold text-gray-800">
            Database Admin (Coming Soon!)
          </h2>
        )}
        {activeSection === 'system-logs' && (
          <h2 className="text-2xl font-bold text-gray-800">
            System Logs (Coming Soon!)
          </h2>
        )}
      </main>
    </div>
  );
};

// Root App component wrapped with AuthProvider
const App = () => (
  <AuthProvider>
    <AppContent />
  </AuthProvider>
);

export default App;
