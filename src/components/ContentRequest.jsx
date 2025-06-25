import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

export default function ContentRequest() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: '',
    additionalContext: '',
    referenceUrl: '',
    targetPlatforms: [],
    audiencePersona: '',
    toneAdjustment: '',
    includeCta: false,
    customCta: '',
    mediaPreference: '',
    specificHashtags: '',
    avoidTopics: '',
    postingPriority: 'normal',
    targetPostingTime: '',
    enableAbTesting: false,
    abTestVariants: '2',
    abTestFocus: '',
    visualContentRequest: '',
    imageStylePreference: '',
    targetKeywords: '',
    workflowStatus: 'draft'
  });

  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePlatformChange = (platform) => {
    setFormData(prev => ({
      ...prev,
      targetPlatforms: prev.targetPlatforms.includes(platform)
        ? prev.targetPlatforms.filter(p => p !== platform)
        : [...prev.targetPlatforms, platform]
    }));
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setAvatar(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submissionData = {
        ...formData,
        targetPlatforms: formData.targetPlatforms.join(', '),
        workflowStatus: 'processing',
        processingStartedAt: new Date().toISOString(),
        createdAt: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('content_requests')
        .insert([submissionData]);

      if (error) throw error;

      setMessage('✅ Content request submitted successfully! Your content will be processed shortly.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        topic: '',
        additionalContext: '',
        referenceUrl: '',
        targetPlatforms: [],
        audiencePersona: '',
        toneAdjustment: '',
        includeCta: false,
        customCta: '',
        mediaPreference: '',
        specificHashtags: '',
        avoidTopics: '',
        postingPriority: 'normal',
        targetPostingTime: '',
        enableAbTesting: false,
        abTestVariants: '2',
        abTestFocus: '',
        visualContentRequest: '',
        imageStylePreference: '',
        targetKeywords: '',
        workflowStatus: 'draft'
      });

    } catch (error) {
      setMessage('❌ Error submitting request: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0" style={{ backgroundColor: '#063e4' }}>
        <div className="p-6">
          <div className="text-white text-xl font-bold mb-8">
            YouNifAiEd<br />
            <span className="text-sm font-normal">Dashboard</span>
          </div>

          {/* Avatar Upload Section */}
          <div className="mb-8">
            <div className="w-20 h-20 rounded-full bg-gray-300 mx-auto mb-4 overflow-hidden">
              {avatar ? (
                <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
            <label className="block">
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
              />
              <div className="bg-blue-600 text-white px-4 py-2 rounded text-sm cursor-pointer text-center hover:bg-blue-700">
                Upload Avatar
              </div>
            </label>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            <div className="bg-blue-600 text-white px-4 py-2 rounded">
              Request Content
            </div>
            <div className="text-gray-300 px-4 py-2 hover:text-white cursor-pointer">
              Content Library
            </div>
            <div className="text-gray-300 px-4 py-2 hover:text-white cursor-pointer">
              Analytics
            </div>
            <div className="text-gray-300 px-4 py-2 hover:text-white cursor-pointer">
              Workflows
            </div>
            <div className="text-gray-300 px-4 py-2 hover:text-white cursor-pointer">
              Settings
            </div>
          </nav>

          <div className="mt-8">
            <div className="text-gray-400 text-sm mb-2">ADMIN TOOLS</div>
            <div className="text-gray-300 px-4 py-2 hover:text-white cursor-pointer">
              User Management
            </div>
            <div className="text-gray-300 px-4 py-2 hover:text-white cursor-pointer">
              API Keys
            </div>
            <div className="text-gray-300 px-4 py-2 hover:text-white cursor-pointer">
              Database Admin
            </div>
            <div className="text-gray-300 px-4 py-2 hover:text-white cursor-pointer">
              System Logs
            </div>
          </div>
        </div>

        {/* Social Profile Logo at Bottom Left */}
        <div className="absolute bottom-4 left-4">
          <img 
            src="/upload/Social_ProfileLogo_v2_2025-4-15.png" 
            alt="YouNifAiEd AI Logo" 
            className="w-12 h-12"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="h-24 flex items-center justify-between px-8" style={{ backgroundColor: '#1d6379' }}>
          <div></div>
          <div className="flex items-center space-x-4">
            {/* Website Logo in Upper Right */}
            <img 
              src="/upload/website_yunifaied-logo-website-v2-2025-4-16.png" 
              alt="YouNifAiEd Logo" 
              className="h-16"
            />
            <div className="text-white">
              <div className="text-xl font-bold">Content Request</div>
              <div className="text-sm">Create engaging educational content</div>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="flex-1 p-8 bg-gray-50">
          {/* Green Header Section */}
          <div className="bg-gradient-to-r from-lime-400 to-teal-400 rounded-lg p-8 mb-8 text-white">
            <div className="flex items-center mb-4">
              <svg className="w-8 h-8 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <h1 className="text-3xl font-bold">Create Your Content Request</h1>
            </div>
            <p className="text-lg">
              Tell us what content you need and we'll create it with your chosen voice and style. Our AI will help you 
              engage your audience authentically while maintaining your unique educational perspective.
            </p>
          </div>

          {message && (
            <div className={`p-4 rounded-lg mb-6 ${message.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-6">
                <div className="w-4 h-4 bg-lime-400 rounded mr-3"></div>
                <svg className="w-5 h-5 text-teal-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                <h2 className="text-xl font-semibold">Basic Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <svg className="w-4 h-4 text-teal-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    Your Name*
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <svg className="w-4 h-4 text-teal-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    Email Address*
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Content Topic & Context */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-6">
                <div className="w-4 h-4 bg-lime-400 rounded mr-3"></div>
                <svg className="w-5 h-5 text-teal-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
                <h2 className="text-xl font-semibold">Content Topic & Context</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <svg className="w-4 h-4 text-lime-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    What topic would you like content about?*
                  </label>
                  <textarea
                    name="topic"
                    value={formData.topic}
                    onChange={handleInputChange}
                    placeholder="e.g., Using AI to catch student effort instead of just errors"
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Additional Context
                  </label>
                  <textarea
                    name="additionalContext"
                    value={formData.additionalContext}
                    onChange={handleInputChange}
                    placeholder="Any additional context, specific angles, or requirements..."
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Reference URL (Optional)
                  </label>
                  <input
                    type="url"
                    name="referenceUrl"
                    value={formData.referenceUrl}
                    onChange={handleInputChange}
                    placeholder="https://example.com/reference-article"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Voice & Tone */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-6">
                <div className="w-4 h-4 bg-lime-400 rounded mr-3"></div>
                <svg className="w-5 h-5 text-teal-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                </svg>
                <h2 className="text-xl font-semibold">Voice & Tone</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-3 block">
                    Choose Your Voice Persona*
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-start p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="radio"
                        name="audiencePersona"
                        value="expert_coach"
                        checked={formData.audiencePersona === 'expert_coach'}
                        onChange={handleInputChange}
                        className="mt-1 mr-3"
                      />
                      <div>
                        <div className="font-medium text-gray-900">Expert Coach</div>
                        <div className="text-sm text-gray-500">Calm, experienced guidance for professional development</div>
                      </div>
                    </label>
                    
                    <label className="flex items-start p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="radio"
                        name="audiencePersona"
                        value="relatable_mom"
                        checked={formData.audiencePersona === 'relatable_mom'}
                        onChange={handleInputChange}
                        className="mt-1 mr-3"
                      />
                      <div>
                        <div className="font-medium text-gray-900">The Relatable Mom</div>
                        <div className="text-sm text-gray-500">Warm, honest real-talk with humor and heart</div>
                      </div>
                    </label>
                    
                    <label className="flex items-start p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="radio"
                        name="audiencePersona"
                        value="challenger"
                        checked={formData.audiencePersona === 'challenger'}
                        onChange={handleInputChange}
                        className="mt-1 mr-3"
                      />
                      <div>
                        <div className="font-medium text-gray-900">The Challenger</div>
                        <div className="text-sm text-gray-500">Bold advocacy for educational change and equity</div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Target Platforms */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-6">
                <div className="w-4 h-4 bg-lime-400 rounded mr-3"></div>
                <svg className="w-5 h-5 text-teal-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm0 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z" clipRule="evenodd" />
                </svg>
                <h2 className="text-xl font-semibold">Target Platforms</h2>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {['LinkedIn', 'YouTube', 'Instagram', 'Facebook', 'Twitter', 'TikTok'].map((platform) => (
                  <label key={platform} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.targetPlatforms.includes(platform)}
                      onChange={() => handlePlatformChange(platform)}
                      className="mr-3"
                    />
                    <span className="text-sm font-medium">{platform}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-lime-400 to-teal-400 text-white px-8 py-3 rounded-lg font-semibold hover:from-lime-500 hover:to-teal-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Submitting...' : 'Submit Content Request'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
