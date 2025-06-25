import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { createContentRequest } from '../lib/supabase';

export function ContentRequest() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    // Core fields matching original Typeform
    email: '',
    name: '',
    topic: '',
    additional_context: '',
    audience_persona_name: '',
    tone_adjustment: 'Use persona default',
    
    // Platform and content fields
    content_type: '',
    platforms: [],
    content_description: '',
    reference_url: '',
    target_platforms: [],
    
    // CTA and engagement
    include_cta: true,
    custom_cta: '',
    
    // Media and visual
    media_preference: 'upload my media',
    uploaded_media: [],
    visual_content_request: 'image_only',
    image_style_preference: 'educational',
    
    // Advanced options
    specific_hashtags: '',
    avoid_topics: '',
    posting_priority: 'normal',
    target_posting_time: 'afternoon',
    
    // A/B Testing
    enable_ab_testing: false,
    ab_test_variants: '2 variants (A/B)',
    ab_test_focus: 'hooks (opening lines)',
    
    // Keywords and SEO
    target_keywords: '',
    primary_keywords: '',
    secondary_keywords: '',
    long_tail_keywords: '',
    
    // Workflow
    workflow_status: 'draft',
    request_status: 'Draft',
    content_control: 'Generate Content for Me',
    
    // Brand and persona
    brand_profile: 1,
    brand_name: 'YouNifAiEd',
    brand_profile_name: 'YouNifAiEd',
    
    // Performance and analytics
    expected_performance_category: 'moderate_engagement',
    learning_priority: 'medium'
  });

  const [submissionStatus, setSubmissionStatus] = useState({
    loading: false,
    error: null,
    success: false,
  });

  const [uploadedFiles, setUploadedFiles] = useState([]);

  // YouNifAiEd audience personas from original Typeform
  const audiencePersonas = [
    {
      id: 'expert_coach',
      name: 'Expert Coach',
      description: 'Calm, experienced guidance for professional development'
    },
    {
      id: 'relatable_mom', 
      name: 'The Relatable Mom',
      description: 'Warm, honest real-talk with humor and heart'
    },
    {
      id: 'challenger',
      name: 'The Challenger', 
      description: 'Bold advocacy for educational change and equity'
    }
  ];

  useEffect(() => {
    if (user && user.email) {
      setFormData(prev => ({ 
        ...prev, 
        email: user.email,
        audience_persona_name: audiencePersonas[0].name 
      }));
    }
  }, [user]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (submissionStatus.error || submissionStatus.success) {
      setSubmissionStatus({ loading: false, error: null, success: false });
    }
  };

  const handlePlatformChange = (platform) => {
    setFormData(prev => {
      const newPlatforms = prev.platforms.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform];
      return { ...prev, platforms: newPlatforms, target_platforms: newPlatforms };
    });
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.map(file => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      type: file.type,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null
    }));
    setUploadedFiles(prev => [...prev, ...newFiles]);
    setFormData(prev => ({
      ...prev,
      uploaded_media: [...prev.uploaded_media, ...newFiles]
    }));
  };

  const removeFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
    setFormData(prev => ({
      ...prev,
      uploaded_media: prev.uploaded_media.filter(f => f.id !== fileId)
    }));
  };

  const resetForm = () => {
    setFormData({
      email: user?.email || '',
      name: '',
      topic: '',
      additional_context: '',
      audience_persona_name: audiencePersonas[0].name,
      tone_adjustment: 'Use persona default',
      content_type: '',
      platforms: [],
      content_description: '',
      reference_url: '',
      target_platforms: [],
      include_cta: true,
      custom_cta: '',
      media_preference: 'upload my media',
      uploaded_media: [],
      visual_content_request: 'image_only',
      image_style_preference: 'educational',
      specific_hashtags: '',
      avoid_topics: '',
      posting_priority: 'normal',
      target_posting_time: 'afternoon',
      enable_ab_testing: false,
      ab_test_variants: '2 variants (A/B)',
      ab_test_focus: 'hooks (opening lines)',
      target_keywords: '',
      primary_keywords: '',
      secondary_keywords: '',
      long_tail_keywords: '',
      workflow_status: 'draft',
      request_status: 'Draft',
      content_control: 'Generate Content for Me',
      brand_profile: 1,
      brand_name: 'YouNifAiEd',
      brand_profile_name: 'YouNifAiEd',
      expected_performance_category: 'moderate_engagement',
      learning_priority: 'medium'
    });
    setUploadedFiles([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit: Starting submission process...");
    setSubmissionStatus({ loading: true, error: null, success: false });

    try {
      if (!user) {
        throw new Error("User is not authenticated. Please log in.");
      }
      
      if (!formData.topic || !formData.audience_persona_name) {
        throw new Error("Topic and Audience Persona are required.");
      }

      const requestData = {
        ...formData,
        user_id: user.id,
        user_email: user.email,
        status: 'pending',
        created_date: new Date().toISOString(),
        workflow_status: 'processing'
      };

      console.log("handleSubmit: Data being sent to Supabase:", requestData);

      const result = await createContentRequest(requestData);

      console.log("handleSubmit: Response from Supabase:", result);

      if (result.error) {
        throw new Error(result.error.message || 'An unknown error occurred during content request creation.');
      }

      if (!result.success) {
        throw new Error('The submission was not successful for an unknown reason.');
      }

      setSubmissionStatus({ loading: false, error: null, success: true });
      console.log("handleSubmit: Submission successful!");
      
      setTimeout(() => {
        resetForm();
        setSubmissionStatus({ loading: false, error: null, success: false });
      }, 3000);

    } catch (error) {
      console.error("handleSubmit: An error occurred:", error);
      setSubmissionStatus({ loading: false, error: error.message, success: false });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* YouNifAiEd Header with Website Logo */}
      <div className="bg-white shadow-lg border-b-4 border-gradient-to-r from-lime-400 to-teal-500">
        <div className="container mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            {/* Website Logo */}
            <div className="flex items-center space-x-6">
              <div className="relative">
                {/* YouNifAiEd Infinity Logo */}
                <div className="flex items-center space-x-4">
                  <div className="relative w-20 h-12">
                    {/* Infinity Symbol */}
                    <svg viewBox="0 0 200 120" className="w-full h-full">
                      {/* Left circle (hand side) */}
                      <ellipse cx="50" cy="60" rx="45" ry="35" fill="none" stroke="#4ECDC4" strokeWidth="8" opacity="0.3"/>
                      <ellipse cx="50" cy="60" rx="35" ry="25" fill="#E8F8F5" opacity="0.5"/>
                      
                      {/* Right circle (AI side) */}
                      <ellipse cx="150" cy="60" rx="45" ry="35" fill="none" stroke="#A4D65E" strokeWidth="8" opacity="0.3"/>
                      <ellipse cx="150" cy="60" rx="35" ry="25" fill="#F0F8E8" opacity="0.5"/>
                      
                      {/* Connecting infinity curve */}
                      <path d="M 20 60 Q 100 20 180 60 Q 100 100 20 60" fill="none" stroke="url(#gradient)" strokeWidth="6"/>
                      
                      {/* Hand icon */}
                      <g transform="translate(35, 45)">
                        <path d="M15 5c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2s-2-.9-2-2V7c0-1.1.9-2 2-2m9 7V10c0-1.1-.9-2-2-2s-2 .9-2 2v2c0 1.1.9 2 2 2s2-.9 2-2M6 12V10c0-1.1-.9-2-2-2s-2 .9-2 2v2c0 1.1.9 2 2 2s2-.9 2-2m9 3c-3.3 0-6 2.7-6 6v2c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-2c0-3.3-2.7-6-6-6z" fill="#4ECDC4"/>
                      </g>
                      
                      {/* Circuit pattern */}
                      <g transform="translate(135, 45)">
                        <circle cx="5" cy="5" r="2" fill="#A4D65E"/>
                        <circle cx="15" cy="5" r="2" fill="#A4D65E"/>
                        <circle cx="25" cy="5" r="2" fill="#A4D65E"/>
                        <line x1="7" y1="5" x2="13" y2="5" stroke="#A4D65E" strokeWidth="2"/>
                        <line x1="17" y1="5" x2="23" y2="5" stroke="#A4D65E" strokeWidth="2"/>
                        <line x1="15" y1="7" x2="15" y2="13" stroke="#A4D65E" strokeWidth="2"/>
                        <circle cx="15" cy="15" r="2" fill="#A4D65E"/>
                        <line x1="15" y1="17" x2="15" y2="23" stroke="#A4D65E" strokeWidth="2"/>
                        <circle cx="15" cy="25" r="2" fill="#A4D65E"/>
                      </g>
                      
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#4ECDC4"/>
                          <stop offset="50%" stopColor="#7ED321"/>
                          <stop offset="100%" stopColor="#A4D65E"/>
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  
                  <div>
                    <h1 className="text-3xl font-bold leading-tight">
                      <span className="text-lime-500">You</span>
                      <span className="text-teal-500">Nif</span>
                      <span className="text-lime-400 font-outline-2 font-bold">AI</span>
                      <span className="text-teal-700">Ed</span>
                    </h1>
                    <p className="text-teal-600 font-medium text-sm">Where Teachers and AI Are Unified for Authentic Growth</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <h2 className="text-2xl font-bold text-gray-800">Content Request</h2>
              <p className="text-sm text-gray-600">Create engaging educational content</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - No Sidebar */}
      <div className="container mx-auto px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
            {/* Form Header */}
            <div className="bg-gradient-to-r from-lime-400 via-teal-400 to-teal-600 px-10 py-10">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center">
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h2 className="text-4xl font-bold text-white">Create Your Content Request</h2>
              </div>
              <p className="text-white text-opacity-95 text-xl leading-relaxed max-w-4xl">
                Tell us what content you need and we'll create it with your chosen voice and style. 
                Our AI will help you engage your audience authentically while maintaining your unique educational perspective.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-10 space-y-12">
              {/* Section 1: Basic Information */}
              <div className="space-y-8">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-10 h-2 bg-gradient-to-r from-lime-400 to-teal-400 rounded-full"></div>
                  <svg className="w-6 h-6 text-lime-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                  </svg>
                  <h3 className="text-2xl font-bold text-gray-900">Basic Information</h3>
                  <div className="flex-1 h-px bg-gray-200"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="flex items-center space-x-2 text-sm font-bold text-gray-700 mb-4">
                      <svg className="w-5 h-5 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                      </svg>
                      <span>Your Name*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full p-5 border-2 border-gray-200 rounded-2xl focus:ring-3 focus:ring-lime-400 focus:border-lime-400 transition-all duration-300 text-gray-900 placeholder-gray-500 text-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="flex items-center space-x-2 text-sm font-bold text-gray-700 mb-4">
                      <svg className="w-5 h-5 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                      </svg>
                      <span>Email Address*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="your.email@example.com"
                      className="w-full p-5 border-2 border-gray-200 rounded-2xl focus:ring-3 focus:ring-lime-400 focus:border-lime-400 transition-all duration-300 text-gray-900 placeholder-gray-500 text-lg"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Content Topic & Context */}
              <div className="space-y-8">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-10 h-2 bg-gradient-to-r from-teal-400 to-lime-400 rounded-full"></div>
                  <svg className="w-6 h-6 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                  </svg>
                  <h3 className="text-2xl font-bold text-gray-900">Content Topic & Context</h3>
                  <div className="flex-1 h-px bg-gray-200"></div>
                </div>
                
                <div>
                  <label className="flex items-center space-x-2 text-sm font-bold text-gray-700 mb-4">
                    <svg className="w-5 h-5 text-lime-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                    </svg>
                    <span>What topic would you like content about?*</span>
                  </label>
                  <textarea
                    value={formData.topic}
                    onChange={(e) => handleInputChange('topic', e.target.value)}
                    placeholder="e.g., Using AI to catch student effort instead of just errors"
                    className="w-full p-5 border-2 border-gray-200 rounded-2xl focus:ring-3 focus:ring-lime-400 focus:border-lime-400 transition-all duration-300 h-32 text-gray-900 placeholder-gray-500 text-lg resize-none"
                    required
                  ></textarea>
                </div>

                <div>
                  <label className="flex items-center space-x-2 text-sm font-bold text-gray-700 mb-4">
                    <svg className="w-5 h-5 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd"/>
                    </svg>
                    <span>Any additional context or specific angle?</span>
                  </label>
                  <textarea
                    value={formData.additional_context}
                    onChange={(e) => handleInputChange('additional_context', e.target.value)}
                    placeholder="Share any specific details, personal experiences, or angles you want included. Focus on how this helps teachers see quiet students who are actually making progress."
                    className="w-full p-5 border-2 border-gray-200 rounded-2xl focus:ring-3 focus:ring-lime-400 focus:border-lime-400 transition-all duration-300 h-40 text-gray-900 placeholder-gray-500 text-lg resize-none"
                  ></textarea>
                  <p className="text-sm text-gray-500 mt-3 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                    </svg>
                    Share any specific details, personal experiences, or angles you want included.
                  </p>
                </div>

                <div>
                  <label className="flex items-center space-x-2 text-sm font-bold text-gray-700 mb-4">
                    <svg className="w-5 h-5 text-lime-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd"/>
                    </svg>
                    <span>Reference URL (Optional)</span>
                  </label>
                  <input
                    type="url"
                    value={formData.reference_url}
                    onChange={(e) => handleInputChange('reference_url', e.target.value)}
                    placeholder="https://example.com/inspiration-content"
                    className="w-full p-5 border-2 border-gray-200 rounded-2xl focus:ring-3 focus:ring-lime-400 focus:border-lime-400 transition-all duration-300 text-gray-900 placeholder-gray-500 text-lg"
                  />
                  <p className="text-sm text-gray-500 mt-3 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd"/>
                    </svg>
                    Link to content that inspired this request or that you want to reference.
                  </p>
                </div>
              </div>

              {/* Section 3: Voice & Tone */}
              <div className="space-y-8">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-10 h-2 bg-gradient-to-r from-lime-400 to-teal-400 rounded-full"></div>
                  <svg className="w-6 h-6 text-lime-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd"/>
                  </svg>
                  <h3 className="text-2xl font-bold text-gray-900">Voice & Tone</h3>
                  <div className="flex-1 h-px bg-gray-200"></div>
                </div>
                
                <div>
                  <label className="flex items-center space-x-2 text-sm font-bold text-gray-700 mb-6">
                    <svg className="w-5 h-5 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                    </svg>
                    <span>Which voice resonates most with your audience?*</span>
                  </label>
                  <div className="space-y-5">
                    {audiencePersonas.map(persona => (
                      <label key={persona.id} className="flex items-start space-x-5 p-6 border-2 border-gray-200 rounded-2xl hover:border-lime-300 hover:bg-lime-50 cursor-pointer transition-all duration-300 group">
                        <input
                          type="radio"
                          name="audience_persona"
                          value={persona.name}
                          checked={formData.audience_persona_name === persona.name}
                          onChange={(e) => handleInputChange('audience_persona_name', e.target.value)}
                          className="mt-2 h-6 w-6 text-lime-500 border-gray-300 focus:ring-lime-400"
                        />
                        <div className="flex-1">
                          <div className="font-bold text-gray-900 text-xl group-hover:text-lime-700 transition-colors">{persona.name}</div>
                          <div className="text-gray-600 mt-2 leading-relaxed text-lg">{persona.description}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="flex items-center space-x-2 text-sm font-bold text-gray-700 mb-4">
                    <svg className="w-5 h-5 text-lime-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
                    </svg>
                    <span>Any tone adjustments?</span>
                  </label>
                  <select
                    value={formData.tone_adjustment}
                    onChange={(e) => handleInputChange('tone_adjustment', e.target.value)}
                    className="w-full p-5 border-2 border-gray-200 rounded-2xl focus:ring-3 focus:ring-lime-400 focus:border-lime-400 transition-all duration-300 text-gray-900 bg-white text-lg"
                  >
                    <option value="Use persona default">Use persona default</option>
                    <option value="More professional">More professional</option>
                    <option value="More casual">More casual</option>
                    <option value="More humorous">More humorous</option>
                    <option value="More serious">More serious</option>
                    <option value="More inspiring">More inspiring</option>
                  </select>
                </div>
              </div>

              {/* Section 4: Platforms & Distribution */}
              <div className="space-y-8">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-10 h-2 bg-gradient-to-r from-teal-400 to-lime-400 rounded-full"></div>
                  <svg className="w-6 h-6 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"/>
                  </svg>
                  <h3 className="text-2xl font-bold text-gray-900">Platforms & Distribution</h3>
                  <div className="flex-1 h-px bg-gray-200"></div>
                </div>
                
                <div>
                  <label className="flex items-center space-x-2 text-sm font-bold text-gray-700 mb-6">
                    <svg className="w-5 h-5 text-lime-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"/>
                    </svg>
                    <span>Target Platforms*</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                    {['LinkedIn', 'YouTube', 'Instagram', 'Facebook', 'Twitter', 'TikTok'].map(platform => (
                      <label key={platform} className="flex items-center space-x-4 p-5 border-2 border-gray-200 rounded-2xl hover:border-teal-300 hover:bg-teal-50 cursor-pointer transition-all duration-300 group">
                        <input
                          type="checkbox"
                          checked={formData.platforms.includes(platform)}
                          onChange={() => handlePlatformChange(platform)}
                          className="h-6 w-6 text-teal-500 border-gray-300 rounded focus:ring-teal-400"
                        />
                        <span className="font-bold text-gray-700 group-hover:text-teal-700 transition-colors text-lg">{platform}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="flex items-center space-x-2 text-sm font-bold text-gray-700 mb-4">
                      <svg className="w-5 h-5 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                      </svg>
                      <span>Posting Priority</span>
                    </label>
                    <select
                      value={formData.posting_priority}
                      onChange={(e) => handleInputChange('posting_priority', e.target.value)}
                      className="w-full p-5 border-2 border-gray-200 rounded-2xl focus:ring-3 focus:ring-lime-400 focus:border-lime-400 transition-all duration-300 text-gray-900 bg-white text-lg"
                    >
                      <option value="low">Low Priority</option>
                      <option value="normal">Normal Priority</option>
                      <option value="high">High Priority</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                  <div>
                    <label className="flex items-center space-x-2 text-sm font-bold text-gray-700 mb-4">
                      <svg className="w-5 h-5 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                      </svg>
                      <span>Preferred Posting Time</span>
                    </label>
                    <select
                      value={formData.target_posting_time}
                      onChange={(e) => handleInputChange('target_posting_time', e.target.value)}
                      className="w-full p-5 border-2 border-gray-200 rounded-2xl focus:ring-3 focus:ring-lime-400 focus:border-lime-400 transition-all duration-300 text-gray-900 bg-white text-lg"
                    >
                      <option value="morning">Morning (6-11 AM)</option>
                      <option value="afternoon">Afternoon (12-5 PM)</option>
                      <option value="evening">Evening (6-9 PM)</option>
                      <option value="optimal">AI-optimized timing</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 5: Call to Action */}
              <div className="space-y-8">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-10 h-2 bg-gradient-to-r from-lime-400 to-teal-400 rounded-full"></div>
                  <svg className="w-6 h-6 text-lime-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"/>
                  </svg>
                  <h3 className="text-2xl font-bold text-gray-900">Call to Action</h3>
                  <div className="flex-1 h-px bg-gray-200"></div>
                </div>
                
                <div className="flex items-center space-x-4 mb-6 p-6 bg-lime-50 rounded-2xl border-2 border-lime-200">
                  <input
                    type="checkbox"
                    checked={formData.include_cta}
                    onChange={(e) => handleInputChange('include_cta', e.target.checked)}
                    className="h-6 w-6 text-lime-500 border-gray-300 rounded focus:ring-lime-400"
                  />
                  <label className="font-bold text-gray-700 text-lg">Include Call to Action</label>
                </div>

                {formData.include_cta && (
                  <div>
                    <label className="flex items-center space-x-2 text-sm font-bold text-gray-700 mb-4">
                      <svg className="w-5 h-5 text-lime-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd"/>
                      </svg>
                      <span>Custom CTA (Optional - AI will optimize if left blank)</span>
                    </label>
                    <input
                      type="text"
                      value={formData.custom_cta}
                      onChange={(e) => handleInputChange('custom_cta', e.target.value)}
                      placeholder="e.g., Download my free AI prompt templates, Join 500+ teachers using this, Get the parent guide"
                      className="w-full p-5 border-2 border-gray-200 rounded-2xl focus:ring-3 focus:ring-lime-400 focus:border-lime-400 transition-all duration-300 text-gray-900 placeholder-gray-500 text-lg"
                    />
                  </div>
                )}
              </div>

              {/* Section 6: Media & Visual Content */}
              <div className="space-y-8">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-10 h-2 bg-gradient-to-r from-teal-400 to-lime-400 rounded-full"></div>
                  <svg className="w-6 h-6 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"/>
                  </svg>
                  <h3 className="text-2xl font-bold text-gray-900">Media & Visual Content</h3>
                  <div className="flex-1 h-px bg-gray-200"></div>
                </div>
                
                <div>
                  <label className="flex items-center space-x-2 text-sm font-bold text-gray-700 mb-4">
                    <svg className="w-5 h-5 text-lime-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"/>
                    </svg>
                    <span>Upload Images/Videos</span>
                  </label>
                  <div className="border-3 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-teal-400 transition-colors bg-gray-50 hover:bg-teal-50">
                    <input
                      type="file"
                      multiple
                      accept="image/*,video/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <div className="w-16 h-16 mx-auto mb-6 text-teal-400">
                        <svg fill="currentColor" viewBox="0 0 20 20" className="w-full h-full">
                          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <p className="text-gray-700 font-bold text-xl">Click to upload images or videos</p>
                      <p className="text-sm text-gray-500 mt-2">Upload reference images, videos, or assets for your content</p>
                    </label>
                  </div>
                </div>
                
                {uploadedFiles.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {uploadedFiles.map(file => (
                      <div key={file.id} className="relative border-2 border-gray-200 rounded-2xl p-4 bg-white shadow-lg">
                        {file.preview ? (
                          <img src={file.preview} alt={file.name} className="w-full h-28 object-cover rounded-xl" />
                        ) : (
                          <div className="w-full h-28 bg-gray-100 rounded-xl flex items-center justify-center">
                            <span className="text-sm text-gray-500 font-bold">{file.type}</span>
                          </div>
                        )}
                        <p className="text-sm mt-3 truncate font-bold text-gray-700">{file.name}</p>
                        <button
                          type="button"
                          onClick={() => removeFile(file.id)}
                          className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg hover:bg-red-600 transition-colors shadow-xl"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="flex items-center space-x-2 text-sm font-bold text-gray-700 mb-4">
                      <svg className="w-5 h-5 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"/>
                      </svg>
                      <span>Visual Content Request</span>
                    </label>
                    <select
                      value={formData.visual_content_request}
                      onChange={(e) => handleInputChange('visual_content_request', e.target.value)}
                      className="w-full p-5 border-2 border-gray-200 rounded-2xl focus:ring-3 focus:ring-lime-400 focus:border-lime-400 transition-all duration-300 text-gray-900 bg-white text-lg"
                    >
                      <option value="image_only">Image Only</option>
                      <option value="video_only">Video Only</option>
                      <option value="image_and_video">Image and Video</option>
                      <option value="no_visual">No Visual Content</option>
                    </select>
                  </div>
                  <div>
                    <label className="flex items-center space-x-2 text-sm font-bold text-gray-700 mb-4">
                      <svg className="w-5 h-5 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd"/>
                      </svg>
                      <span>Image Style Preference</span>
                    </label>
                    <select
                      value={formData.image_style_preference}
                      onChange={(e) => handleInputChange('image_style_preference', e.target.value)}
                      className="w-full p-5 border-2 border-gray-200 rounded-2xl focus:ring-3 focus:ring-lime-400 focus:border-lime-400 transition-all duration-300 text-gray-900 bg-white text-lg"
                    >
                      <option value="educational">Educational</option>
                      <option value="professional">Professional</option>
                      <option value="casual">Casual</option>
                      <option value="inspiring">Inspiring</option>
                      <option value="modern">Modern</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 7: Advanced Options */}
              <div className="space-y-8">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-10 h-2 bg-gradient-to-r from-lime-400 to-teal-400 rounded-full"></div>
                  <svg className="w-6 h-6 text-lime-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
                  </svg>
                  <h3 className="text-2xl font-bold text-gray-900">Advanced Options</h3>
                  <div className="flex-1 h-px bg-gray-200"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="flex items-center space-x-2 text-sm font-bold text-gray-700 mb-4">
                      <svg className="w-5 h-5 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M9.243 3.03a1 1 0 01.727 1.213L9.53 6h2.94l.56-2.243a1 1 0 111.94.486L14.53 6H17a1 1 0 110 2h-2.97l-1 4H15a1 1 0 110 2h-2.47l-.56 2.242a1 1 0 11-1.94-.485L10.47 14H7.53l-.56 2.242a1 1 0 11-1.94-.485L5.47 14H3a1 1 0 110-2h2.97l1-4H5a1 1 0 110-2h2.47l.56-2.243a1 1 0 011.213-.727zM9.03 8l-1 4h2.94l1-4H9.03z" clipRule="evenodd"/>
                      </svg>
                      <span>Specific Hashtags</span>
                    </label>
                    <input
                      type="text"
                      value={formData.specific_hashtags}
                      onChange={(e) => handleInputChange('specific_hashtags', e.target.value)}
                      placeholder="e.g., #LetsGoBig #EdTech #TeacherLife"
                      className="w-full p-5 border-2 border-gray-200 rounded-2xl focus:ring-3 focus:ring-lime-400 focus:border-lime-400 transition-all duration-300 text-gray-900 placeholder-gray-500 text-lg"
                    />
                  </div>
                  <div>
                    <label className="flex items-center space-x-2 text-sm font-bold text-gray-700 mb-4">
                      <svg className="w-5 h-5 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/>
                      </svg>
                      <span>Target Keywords</span>
                    </label>
                    <input
                      type="text"
                      value={formData.target_keywords}
                      onChange={(e) => handleInputChange('target_keywords', e.target.value)}
                      placeholder="e.g., AI in education, student engagement"
                      className="w-full p-5 border-2 border-gray-200 rounded-2xl focus:ring-3 focus:ring-lime-400 focus:border-lime-400 transition-all duration-300 text-gray-900 placeholder-gray-500 text-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center space-x-2 text-sm font-bold text-gray-700 mb-4">
                    <svg className="w-5 h-5 text-lime-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd"/>
                    </svg>
                    <span>Topics to Avoid</span>
                  </label>
                  <textarea
                    value={formData.avoid_topics}
                    onChange={(e) => handleInputChange('avoid_topics', e.target.value)}
                    placeholder="e.g., Avoid district policy debates, don't criticize colleagues, skip unverified AI claims"
                    className="w-full p-5 border-2 border-gray-200 rounded-2xl focus:ring-3 focus:ring-lime-400 focus:border-lime-400 transition-all duration-300 h-28 text-gray-900 placeholder-gray-500 text-lg resize-none"
                  ></textarea>
                </div>
              </div>

              {/* Section 8: A/B Testing */}
              <div className="space-y-8">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-10 h-2 bg-gradient-to-r from-teal-400 to-lime-400 rounded-full"></div>
                  <svg className="w-6 h-6 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a1 1 0 102 0V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm2.5 5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h3a1 1 0 110 2h-3a1 1 0 01-1-1z" clipRule="evenodd"/>
                  </svg>
                  <h3 className="text-2xl font-bold text-gray-900">A/B Testing</h3>
                  <div className="flex-1 h-px bg-gray-200"></div>
                </div>
                
                <div className="flex items-center space-x-4 mb-6 p-6 bg-teal-50 rounded-2xl border-2 border-teal-200">
                  <input
                    type="checkbox"
                    checked={formData.enable_ab_testing}
                    onChange={(e) => handleInputChange('enable_ab_testing', e.target.checked)}
                    className="h-6 w-6 text-teal-500 border-gray-300 rounded focus:ring-teal-400"
                  />
                  <label className="font-bold text-gray-700 text-lg">Enable A/B Testing</label>
                </div>

                {formData.enable_ab_testing && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="flex items-center space-x-2 text-sm font-bold text-gray-700 mb-4">
                        <svg className="w-5 h-5 text-lime-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                          <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a1 1 0 102 0V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm2.5 5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9z" clipRule="evenodd"/>
                        </svg>
                        <span>Number of Variants</span>
                      </label>
                      <select
                        value={formData.ab_test_variants}
                        onChange={(e) => handleInputChange('ab_test_variants', e.target.value)}
                        className="w-full p-5 border-2 border-gray-200 rounded-2xl focus:ring-3 focus:ring-lime-400 focus:border-lime-400 transition-all duration-300 text-gray-900 bg-white text-lg"
                      >
                        <option value="2 variants (A/B)">2 variants (A/B)</option>
                        <option value="3 variants (A/B/C)">3 variants (A/B/C)</option>
                        <option value="4 variants (A/B/C/D)">4 variants (A/B/C/D)</option>
                      </select>
                    </div>
                    <div>
                      <label className="flex items-center space-x-2 text-sm font-bold text-gray-700 mb-4">
                        <svg className="w-5 h-5 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                        </svg>
                        <span>A/B Test Focus</span>
                      </label>
                      <select
                        value={formData.ab_test_focus}
                        onChange={(e) => handleInputChange('ab_test_focus', e.target.value)}
                        className="w-full p-5 border-2 border-gray-200 rounded-2xl focus:ring-3 focus:ring-lime-400 focus:border-lime-400 transition-all duration-300 text-gray-900 bg-white text-lg"
                      >
                        <option value="hooks (opening lines)">Hooks (opening lines)</option>
                        <option value="headlines">Headlines</option>
                        <option value="call-to-action">Call-to-Action</option>
                        <option value="hashtags">Hashtags</option>
                        <option value="emojis">Emojis</option>
                        <option value="image style">Image Style</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-10 border-t-2 border-gray-100">
                <div className="flex items-center justify-end space-x-8">
                  <button
                    type="submit"
                    disabled={submissionStatus.loading}
                    className="px-12 py-5 bg-gradient-to-r from-lime-400 via-teal-400 to-teal-600 text-white font-bold text-xl rounded-2xl hover:from-lime-500 hover:via-teal-500 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2"
                  >
                    {submissionStatus.loading && (
                      <svg className="animate-spin -ml-1 mr-4 h-7 w-7 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    )}
                    {submissionStatus.loading ? 'Creating Content Request...' : 'Submit Content Request'}
                  </button>
                </div>
              </div>
            </form>

            {/* Status Messages */}
            {submissionStatus.success && (
              <div className="mx-10 mb-10 p-8 bg-gradient-to-r from-lime-50 to-teal-50 text-teal-800 border-2 border-lime-200 rounded-2xl">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-lime-400 rounded-full flex items-center justify-center mr-6">
                    <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-2xl">Success!</p>
                    <p className="text-lg">Your content request has been submitted and is being processed. We'll create engaging content that resonates with your audience!</p>
                  </div>
                </div>
              </div>
            )}
            {submissionStatus.error && (
              <div className="mx-10 mb-10 p-8 bg-red-50 text-red-800 border-2 border-red-200 rounded-2xl">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-red-400 rounded-full flex items-center justify-center mr-6">
                    <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-2xl">Error</p>
                    <p className="text-lg">{submissionStatus.error}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Left AI Logo */}
      <div className="fixed bottom-8 left-8 z-50">
        <div className="w-16 h-16 bg-gradient-to-br from-lime-400 to-teal-500 rounded-2xl shadow-2xl flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
          <svg viewBox="0 0 100 100" className="w-10 h-10">
            {/* AI Diamond Shape */}
            <path d="M50 10 L80 30 L80 70 L50 90 L20 70 L20 30 Z" fill="#FFFFFF" opacity="0.9"/>
            {/* AI Text */}
            <text x="50" y="60" textAnchor="middle" fill="#4ECDC4" fontSize="24" fontWeight="bold">AI</text>
            {/* Circuit lines */}
            <line x1="30" y1="40" x2="70" y2="40" stroke="#A4D65E" strokeWidth="2"/>
            <line x1="30" y1="60" x2="70" y2="60" stroke="#A4D65E" strokeWidth="2"/>
            <circle cx="25" cy="40" r="2" fill="#A4D65E"/>
            <circle cx="75" cy="40" r="2" fill="#A4D65E"/>
            <circle cx="25" cy="60" r="2" fill="#A4D65E"/>
            <circle cx="75" cy="60" r="2" fill="#A4D65E"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

