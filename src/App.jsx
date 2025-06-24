import { ContentRequest } from './components/ContentRequest'; // Your content request form

// This is a temporary App.jsx to bypass authentication and stop the loading spinner.
// It will directly render the ContentRequest form.
const App = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Main Content Area - Directly render ContentRequest */}
      <main className="flex-grow p-8">
        <ContentRequest />
      </main>
    </div>
  );
};

export default App;
