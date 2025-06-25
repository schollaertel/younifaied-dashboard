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
    <div className="min-h-screen bg-gray-50">
      {/* YouNifAiEd Header */}
      <div className="bg-white border-b border-gray-200 mb-8">
        <div className="container mx-auto px-8 py-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">Y</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">YouNifAiEd</h1>
              <p className="text-sm text-gray-600">Content Request</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-8 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Form Header */}
            <div className="bg-gradient-to-r from-teal-500 to-teal-600 px-8 py-6">
              <h2 className="text-2xl font-bold text-white">Create Your Content Request</h2>
              <p className="text-teal-100 mt-2">Tell us what content you need and we'll create it with your chosen voice and style.</p>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-8">
              {/* Section 1: Basic Information */}
              <div className="space-y-6">
                <div className="border-l-4 border-teal-500 pl-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Name*</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address*</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="your.email@example.com"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Content Topic & Context */}
              <div className="space-y-6">
                <div className="border-l-4 border-teal-500 pl-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Topic & Context</h3>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">What topic would you like content about?*</label>
                  <textarea
                    value={formData.topic}
                    onChange={(e) => handleInputChange('topic', e.target.value)}
                    placeholder="e.g., Using AI to catch student effort instead of just errors"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 h-24"
                    required
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Any additional context or specific angle?</label>
                  <textarea
                    value={formData.additional_context}
                    onChange={(e) => handleInputChange('additional_context', e.target.value)}
                    placeholder="Share any specific details, personal experiences, or angles you want included. Focus on how this helps teachers see quiet students who are actually making progress."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 h-32"
                  ></textarea>
                  <p className="text-xs text-gray-500 mt-1">Share any specific details, personal experiences, or angles you want included.</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Reference URL (Optional)</label>
                  <input
                    type="url"
                    value={formData.reference_url}
                    onChange={(e) => handleInputChange('reference_url', e.target.value)}
                    placeholder="https://example.com/inspiration-content"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Link to content that inspired this request or that you want to reference.</p>
                </div>
              </div>

              {/* Section 3: Voice & Tone */}
              <div className="space-y-6">
                <div className="border-l-4 border-teal-500 pl-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Voice & Tone</h3>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Which voice resonates most with your audience?*</label>
                  <div className="space-y-3">
                    {audiencePersonas.map(persona => (
                      <label key={persona.id} className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:border-teal-300 cursor-pointer transition-colors">
                        <input
                          type="radio"
                          name="audience_persona"
                          value={persona.name}
                          checked={formData.audience_persona_name === persona.name}
                          onChange={(e) => handleInputChange('audience_persona_name', e.target.value)}
                          className="mt-1 h-4 w-4 text-teal-600 border-gray-300 focus:ring-teal-500"
                        />
                        <div>
                          <div className="font-medium text-gray-900">{persona.name}</div>
                          <div className="text-sm text-gray-600">{persona.description}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Any tone adjustments?</label>
                  <select
                    value={formData.tone_adjustment}
                    onChange={(e) => handleInputChange('tone_adjustment', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
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
              <div className="space-y-6">
                <div className="border-l-4 border-teal-500 pl-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Platforms & Distribution</h3>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Target Platforms*</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {['LinkedIn', 'YouTube', 'Instagram', 'Facebook', 'Twitter', 'TikTok'].map(platform => (
                      <label key={platform} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:border-teal-300 cursor-pointer transition-colors">
                        <input
                          type="checkbox"
                          checked={formData.platforms.includes(platform)}
                          onChange={() => handlePlatformChange(platform)}
                          className="h-4 w-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                        />
                        <span className="text-sm font-medium text-gray-700">{platform}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Posting Priority</label>
                    <select
                      value={formData.posting_priority}
                      onChange={(e) => handleInputChange('posting_priority', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    >
                      <option value="low">Low Priority</option>
                      <option value="normal">Normal Priority</option>
                      <option value="high">High Priority</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Posting Time</label>
                    <select
                      value={formData.target_posting_time}
                      onChange={(e) => handleInputChange('target_posting_time', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
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
              <div className="space-y-6">
                <div className="border-l-4 border-teal-500 pl-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Call to Action</h3>
                </div>
                
                <div className="flex items-center space-x-3 mb-4">
                  <input
                    type="checkbox"
                    checked={formData.include_cta}
                    onChange={(e) => handleInputChange('include_cta', e.target.checked)}
                    className="h-4 w-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                  />
                  <label className="text-sm font-medium text-gray-700">Include Call to Action</label>
                </div>

                {formData.include_cta && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Custom CTA (Optional - AI will optimize if left blank)</label>
                    <input
                      type="text"
                      value={formData.custom_cta}
                      onChange={(e) => handleInputChange('custom_cta', e.target.value)}
                      placeholder="e.g., Download my free AI prompt templates, Join 500+ teachers using this, Get the parent guide"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>
                )}
              </div>

              {/* Section 6: Media & Visual Content */}
              <div className="space-y-6">
                <div className="border-l-4 border-teal-500 pl-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Media & Visual Content</h3>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload Images/Videos</label>
                  <input
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    onChange={handleFileUpload}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Upload reference images, videos, or assets for your content</p>
                </div>
                
                {uploadedFiles.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {uploadedFiles.map(file => (
                      <div key={file.id} className="relative border rounded-lg p-2">
                        {file.preview ? (
                          <img src={file.preview} alt={file.name} className="w-full h-20 object-cover rounded" />
                        ) : (
                          <div className="w-full h-20 bg-gray-100 rounded flex items-center justify-center">
                            <span className="text-xs text-gray-500">{file.type}</span>
                          </div>
                        )}
                        <p className="text-xs mt-1 truncate">{file.name}</p>
                        <button
                          type="button"
                          onClick={() => removeFile(file.id)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Visual Content Request</label>
                    <select
                      value={formData.visual_content_request}
                      onChange={(e) => handleInputChange('visual_content_request', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    >
                      <option value="image_only">Image Only</option>
                      <option value="video_only">Video Only</option>
                      <option value="image_and_video">Image and Video</option>
                      <option value="no_visual">No Visual Content</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Image Style Preference</label>
                    <select
                      value={formData.image_style_preference}
                      onChange={(e) => handleInputChange('image_style_preference', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
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
              <div className="space-y-6">
                <div className="border-l-4 border-teal-500 pl-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Advanced Options</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Specific Hashtags</label>
                    <input
                      type="text"
                      value={formData.specific_hashtags}
                      onChange={(e) => handleInputChange('specific_hashtags', e.target.value)}
                      placeholder="e.g., #LetsGoBig #EdTech #TeacherLife"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Target Keywords</label>
                    <input
                      type="text"
                      value={formData.target_keywords}
                      onChange={(e) => handleInputChange('target_keywords', e.target.value)}
                      placeholder="e.g., AI in education, student engagement"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Topics to Avoid</label>
                  <textarea
                    value={formData.avoid_topics}
                    onChange={(e) => handleInputChange('avoid_topics', e.target.value)}
                    placeholder="e.g., Avoid district policy debates, don't criticize colleagues, skip unverified AI claims"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 h-20"
                  ></textarea>
                </div>
              </div>

              {/* Section 8: A/B Testing */}
              <div className="space-y-6">
                <div className="border-l-4 border-teal-500 pl-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">A/B Testing</h3>
                </div>
                
                <div className="flex items-center space-x-3 mb-4">
                  <input
                    type="checkbox"
                    checked={formData.enable_ab_testing}
                    onChange={(e) => handleInputChange('enable_ab_testing', e.target.checked)}
                    className="h-4 w-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                  />
                  <label className="text-sm font-medium text-gray-700">Enable A/B Testing</label>
                </div>

                {formData.enable_ab_testing && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Number of Variants</label>
                      <select
                        value={formData.ab_test_variants}
                        onChange={(e) => handleInputChange('ab_test_variants', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      >
                        <option value="2 variants (A/B)">2 variants (A/B)</option>
                        <option value="3 variants (A/B/C)">3 variants (A/B/C)</option>
                        <option value="4 variants (A/B/C/D)">4 variants (A/B/C/D)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">A/B Test Focus</label>
                      <select
                        value={formData.ab_test_focus}
                        onChange={(e) => handleInputChange('ab_test_focus', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
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
              <div className="pt-6 border-t border-gray-200">
                <div className="flex items-center justify-end space-x-4">
                  <button
                    type="submit"
                    disabled={submissionStatus.loading}
                    className="px-8 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-lg hover:from-teal-600 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    {submissionStatus.loading && (
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
              <div className="mx-8 mb-8 p-4 bg-green-50 text-green-800 border border-green-200 rounded-lg">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <strong>Success!</strong> Your content request has been submitted and is being processed.
                </div>
              </div>
            )}
            {submissionStatus.error && (
              <div className="mx-8 mb-8 p-4 bg-red-50 text-red-800 border border-red-200 rounded-lg">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <strong>Error:</strong> {submissionStatus.error}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
