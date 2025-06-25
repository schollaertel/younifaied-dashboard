import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { createContentRequest } from '../lib/supabase';

export function ContentRequest() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    content_type: '',
    platforms: [],
    topic: '',
    content_description: '',
    cta: '',
    primary_keywords: '',
    secondary_keywords: '',
    long_tail_keywords: '',
    business_objective: '',
    priority: 'normal',
    inspiration_link: '',
    audience_persona_name: '',
    brand_profile_name: 'YouNifAiEd',
    user_content: {
      files: [],
      text: '',
      additional_context: '',
      custom_caption: '',
      brand_voice: '',
      brand_guidelines: '',
    },
    ab_testing: {
      enabled: false,
      variables: [],
      variations: 2,
    },
    advanced_options: {
      tone_of_voice: '',
      style_guide: '',
      specific_instructions: '',
      target_word_count: '',
      include_hashtags: true,
      include_emojis: false,
      posting_schedule: '',
    },
    automation: {
      enabled: false,
      auto_post: false,
      review_required: true,
    },
    api_keys: {
      openai_key: '',
      blotato_key: '',
      custom_api_key: '',
    },
  });

  const [submissionStatus, setSubmissionStatus] = useState({
    loading: false,
    error: null,
    success: false,
  });

  const [audiencePersonas, setAudiencePersonas] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // A/B Testing variable options
  const abTestVariables = [
    'Headline',
    'Call to Action',
    'Opening Hook',
    'Tone of Voice',
    'Content Length',
    'Visual Style',
    'Posting Time',
    'Hashtags'
  ];

  // Variation options with descriptions
  const variationOptions = [
    { value: 2, label: '2 Variations', description: 'A vs B test' },
    { value: 3, label: '3 Variations', description: 'A vs B vs C test' },
    { value: 4, label: '4 Variations', description: 'Multi-variant test' },
    { value: 5, label: '5 Variations', description: 'Advanced multi-variant test' }
  ];

  useEffect(() => {
    const personas = [
      "Tech Innovator",
      "Expert Coach",
      "The Relatable Mom",
      "Community Builder",
      "The Challenger"
    ];
    setAudiencePersonas(personas);
    if (personas.length > 0) {
      setFormData(prev => ({ ...prev, audience_persona_name: personas[0] }));
    }
  }, []);

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
      return { ...prev, platforms: newPlatforms };
    });
  };

  const handleUserContentChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      user_content: {
        ...prev.user_content,
        [field]: value,
      },
    }));
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const fileData = files.map(file => ({
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
    }));
    
    setUploadedFiles(files);
    handleUserContentChange('files', fileData);
  };

  const removeFile = (index) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    const newFileData = formData.user_content.files.filter((_, i) => i !== index);
    setUploadedFiles(newFiles);
    handleUserContentChange('files', newFileData);
  };

  const handleABTestingChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      ab_testing: {
        ...prev.ab_testing,
        [field]: value,
      },
    }));
  };

  const handleABVariableChange = (variable) => {
    setFormData(prev => {
      const currentVariables = prev.ab_testing.variables || [];
      const newVariables = currentVariables.includes(variable)
        ? currentVariables.filter(v => v !== variable)
        : [...currentVariables, variable];
      
      return {
        ...prev,
        ab_testing: {
          ...prev.ab_testing,
          variables: newVariables,
        },
      };
    });
  };

  const handleAdvancedOptionsChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      advanced_options: {
        ...prev.advanced_options,
        [field]: value,
      },
    }));
  };

  const handleAutomationChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      automation: {
        ...prev.automation,
        [field]: value,
      },
    }));
  };

  const handleApiKeyChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      api_keys: {
        ...prev.api_keys,
        [field]: value,
      },
    }));
  };

  const resetForm = () => {
    setFormData({
      content_type: '',
      platforms: [],
      topic: '',
      content_description: '',
      cta: '',
      primary_keywords: '',
      secondary_keywords: '',
      long_tail_keywords: '',
      business_objective: '',
      priority: 'normal',
      inspiration_link: '',
      audience_persona_name: audiencePersonas.length > 0 ? audiencePersonas[0] : '',
      brand_profile_name: 'YouNifAiEd',
      user_content: { files: [], text: '', additional_context: '', custom_caption: '', brand_voice: '', brand_guidelines: '' },
      ab_testing: { enabled: false, variables: [], variations: 2 },
      advanced_options: { tone_of_voice: '', style_guide: '', specific_instructions: '', target_word_count: '', include_hashtags: true, include_emojis: false, posting_schedule: '' },
      automation: { enabled: false, auto_post: false, review_required: true },
      api_keys: { openai_key: '', blotato_key: '', custom_api_key: '' },
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
      
      if (!formData.audience_persona_name || !formData.brand_profile_name) {
          throw new Error("Audience Persona and Brand Profile are required.");
      }

      const requestData = {
        ...formData,
        user_id: user.id,
        user_email: user.email,
        status: 'pending',
      };

      console.log("handleSubmit: Data being sent to Supabase:", requestData);

      const result = await createContentRequest(requestData);

      console.log("handleSubmit: Response from Supabase:", result);

      if (result.error) {
        console.error("handleSubmit: Supabase error details:", result.error);
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
      }, 2000);

    } catch (error) {
      console.error("handleSubmit: An error occurred:", error);
      setSubmissionStatus({ loading: false, error: error.message, success: false });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Request Content Creation</h2>
      
      {/* Success Message */}
      {submissionStatus.success && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">Content Request Submitted Successfully!</h3>
              <div className="mt-2 text-sm text-green-700">
                <p>Your content request has been saved and will be processed shortly. The form will reset automatically.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {submissionStatus.error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error Submitting Request</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{submissionStatus.error}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Content Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content Type *
          </label>
          <select
            value={formData.content_type}
            onChange={(e) => handleInputChange('content_type', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            disabled={submissionStatus.loading}
          >
            <option value="">Select content type</option>
            <option value="social_media_post">Social Media Post</option>
            <option value="blog_article">Blog Article</option>
            <option value="video_script">Video Script</option>
            <option value="email_newsletter">Email Newsletter</option>
          </select>
        </div>

        {/* Platforms */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target Platforms *
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {['Instagram', 'Facebook', 'LinkedIn', 'Twitter', 'YouTube', 'TikTok'].map(platform => (
              <label key={platform} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.platforms.includes(platform)}
                  onChange={() => handlePlatformChange(platform)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  disabled={submissionStatus.loading}
                />
                <span className="text-sm text-gray-700">{platform}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Topic */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Topic *
          </label>
          <input
            type="text"
            value={formData.topic}
            onChange={(e) => handleInputChange('topic', e.target.value)}
            placeholder="Main topic/theme (e.g., 'AI in Education', 'Productivity Tips')"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            disabled={submissionStatus.loading}
          />
          <p className="text-xs text-gray-500 mt-1">Short, focused topic for image mapping and content categorization</p>
        </div>

        {/* Content Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content Description *
          </label>
          <textarea
            value={formData.content_description}
            onChange={(e) => handleInputChange('content_description', e.target.value)}
            placeholder="Detailed description of what you want to create..."
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            disabled={submissionStatus.loading}
          />
        </div>

        {/* CTA - Optional */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Call to Action (CTA) <span className="text-sm text-gray-500">(Optional - AI will optimize)</span>
          </label>
          <input
            type="text"
            value={formData.cta}
            onChange={(e) => handleInputChange('cta', e.target.value)}
            placeholder="What action should readers take? (e.g., 'Sign up for our newsletter')"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={submissionStatus.loading}
          />
        </div>

        {/* Audience Persona */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Audience Persona *
          </label>
          <select
            value={formData.audience_persona_name}
            onChange={(e) => handleInputChange('audience_persona_name', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            disabled={submissionStatus.loading}
          >
            <option value="">Select audience persona</option>
            {audiencePersonas.map(persona => (
              <option key={persona} value={persona}>{persona}</option>
            ))}
          </select>
        </div>

        {/* Automation Settings */}
        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="text-lg font-medium text-gray-900 mb-4">🤖 Automation Settings</h3>
          <div className="space-y-4">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={formData.automation.enabled}
                onChange={(e) => handleAutomationChange('enabled', e.target.checked)}
                className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                disabled={submissionStatus.loading}
              />
              <span className="text-lg font-medium">Enable Total Automation</span>
            </label>
            {formData.automation.enabled && (
              <div className="ml-8 space-y-4">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={formData.automation.auto_post}
                    onChange={(e) => handleAutomationChange('auto_post', e.target.checked)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    disabled={submissionStatus.loading}
                  />
                  <span>Auto-post when content is ready</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={formData.automation.review_required}
                    onChange={(e) => handleAutomationChange('review_required', e.target.checked)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    disabled={submissionStatus.loading}
                  />
                  <span>Require review before posting</span>
                </label>
              </div>
            )}
          </div>
        </div>

        {/* API Keys */}
        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="text-lg font-medium text-gray-900 mb-4">🔑 API Keys & Integration</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">OpenAI API Key</label>
              <input
                type="password"
                value={formData.api_keys.openai_key}
                onChange={(e) => handleApiKeyChange('openai_key', e.target.value)}
                placeholder="sk-..."
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={submissionStatus.loading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Blotato API Key</label>
              <input
                type="password"
                value={formData.api_keys.blotato_key}
                onChange={(e) => handleApiKeyChange('blotato_key', e.target.value)}
                placeholder="Your Blotato API key"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={submissionStatus.loading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Custom API Key</label>
              <input
                type="password"
                value={formData.api_keys.custom_api_key}
                onChange={(e) => handleApiKeyChange('custom_api_key', e.target.value)}
                placeholder="Any additional API key"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={submissionStatus.loading}
              />
            </div>
          </div>
        </div>

        {/* File Upload & Additional Context */}
        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="text-lg font-medium text-gray-900 mb-4">📁 Media & Additional Context</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload Images/Videos</label>
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleFileUpload}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={submissionStatus.loading}
              />
              {uploadedFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm font-medium text-gray-700">Uploaded Files:</p>
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
                      <span className="text-sm">{file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-red-600 hover:text-red-800 text-sm"
                        disabled={submissionStatus.loading}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Additional Context</label>
              <textarea
                value={formData.user_content.additional_context}
                onChange={(e) => handleUserContentChange('additional_context', e.target.value)}
                placeholder="Any additional context, background information, or specific details about your brand/business"
                className="w-full p-3 border border-gray-300 rounded-md h-24 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={submissionStatus.loading}
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Custom Caption/Text</label>
              <textarea
                value={formData.user_content.custom_caption}
                onChange={(e) => handleUserContentChange('custom_caption', e.target.value)}
                placeholder="Any specific text, captions, or copy you want included"
                className="w-full p-3 border border-gray-300 rounded-md h-24 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={submissionStatus.loading}
              ></textarea>
            </div>
          </div>
        </div>

        {/* Brand Voice & Guidelines */}
        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="text-lg font-medium text-gray-900 mb-4">🎨 Brand Voice & Guidelines</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Brand Voice Description</label>
              <textarea
                value={formData.user_content.brand_voice}
                onChange={(e) => handleUserContentChange('brand_voice', e.target.value)}
                placeholder="Describe your brand's voice and personality (e.g., 'Professional but approachable, educational, inspiring')"
                className="w-full p-3 border border-gray-300 rounded-md h-24 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={submissionStatus.loading}
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Brand Guidelines</label>
              <textarea
                value={formData.user_content.brand_guidelines}
                onChange={(e) => handleUserContentChange('brand_guidelines', e.target.value)}
                placeholder="Any specific brand guidelines, do's and don'ts, or style requirements"
                className="w-full p-3 border border-gray-300 rounded-md h-24 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={submissionStatus.loading}
              ></textarea>
            </div>
          </div>
        </div>

        {/* Keywords Section */}
        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="text-lg font-medium text-gray-900 mb-4">🔍 Keyword Focus (for SEO)</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Primary Keywords
              </label>
              <input
                type="text"
                value={formData.primary_keywords}
                onChange={(e) => handleInputChange('primary_keywords', e.target.value)}
                placeholder="main keyword, key phrase"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={submissionStatus.loading}
              />
              <p className="text-xs text-gray-500 mt-1">1-3 main keywords (comma separated)</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Secondary Keywords
              </label>
              <input
                type="text"
                value={formData.secondary_keywords}
                onChange={(e) => handleInputChange('secondary_keywords', e.target.value)}
                placeholder="related terms, synonyms"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={submissionStatus.loading}
              />
              <p className="text-xs text-gray-500 mt-1">Supporting keywords</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Long-tail Keywords
              </label>
              <input
                type="text"
                value={formData.long_tail_keywords}
                onChange={(e) => handleInputChange('long_tail_keywords', e.target.value)}
                placeholder="specific phrases"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={submissionStatus.loading}
              />
              <p className="text-xs text-gray-500 mt-1">Longer, specific phrases</p>
            </div>
          </div>
        </div>
        
        {/* Inspiration Link */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Inspiration Link
          </label>
          <input
            type="url"
            value={formData.inspiration_link}
            onChange={(e) => handleInputChange('inspiration_link', e.target.value)}
            placeholder="Link to content you want to rip off and make better"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={submissionStatus.loading}
          />
        </div>

        {/* A/B Testing */}
        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="text-lg font-medium text-gray-900 mb-4">🧪 A/B Testing Options</h3>
          <div className="space-y-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.ab_testing.enabled}
                onChange={(e) => handleABTestingChange('enabled', e.target.checked)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                disabled={submissionStatus.loading}
              />
              <span>Enable A/B Testing</span>
            </label>
            {formData.ab_testing.enabled && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Test Variables (select all that apply)</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {abTestVariables.map(variable => (
                      <label key={variable} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={formData.ab_testing.variables?.includes(variable) || false}
                          onChange={() => handleABVariableChange(variable)}
                          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          disabled={submissionStatus.loading}
                        />
                        <span className="text-sm">{variable}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Number of Variations</label>
                  <select
                    value={formData.ab_testing.variations}
                    onChange={(e) => handleABTestingChange('variations', parseInt(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={submissionStatus.loading}
                  >
                    {variationOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label} - {option.description}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Advanced Options */}
        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="text-lg font-medium text-gray-900 mb-4">⚙️ Advanced Options</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tone of Voice</label>
                <input
                  type="text"
                  value={formData.advanced_options.tone_of_voice}
                  onChange={(e) => handleAdvancedOptionsChange('tone_of_voice', e.target.value)}
                  placeholder="e.g., Professional, Humorous, Empathetic"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={submissionStatus.loading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Target Word Count</label>
                <input
                  type="text"
                  value={formData.advanced_options.target_word_count}
                  onChange={(e) => handleAdvancedOptionsChange('target_word_count', e.target.value)}
                  placeholder="e.g., 150-200 words, 500 words"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={submissionStatus.loading}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Style Guide / Brand Guidelines</label>
              <textarea
                value={formData.advanced_options.style_guide}
                onChange={(e) => handleAdvancedOptionsChange('style_guide', e.target.value)}
                placeholder="Link to your style guide or specific brand rules"
                className="w-full p-3 border border-gray-300 rounded-md h-24 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={submissionStatus.loading}
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Specific Instructions</label>
              <textarea
                value={formData.advanced_options.specific_instructions}
                onChange={(e) => handleAdvancedOptionsChange('specific_instructions', e.target.value)}
                placeholder="Any other specific requirements or details for the AI"
                className="w-full p-3 border border-gray-300 rounded-md h-24 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={submissionStatus.loading}
              ></textarea>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.advanced_options.include_hashtags}
                  onChange={(e) => handleAdvancedOptionsChange('include_hashtags', e.target.checked)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  disabled={submissionStatus.loading}
                />
                <span>Include Hashtags</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.advanced_options.include_emojis}
                  onChange={(e) => handleAdvancedOptionsChange('include_emojis', e.target.checked)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  disabled={submissionStatus.loading}
                />
                <span>Include Emojis</span>
              </label>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Posting Schedule</label>
                <input
                  type="text"
                  value={formData.advanced_options.posting_schedule}
                  onChange={(e) => handleAdvancedOptionsChange('posting_schedule', e.target.value)}
                  placeholder="e.g., Daily at 9 AM"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={submissionStatus.loading}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-end space-x-4">
          <button
            type="submit"
            disabled={submissionStatus.loading}
            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center transition-colors"
          >
            {submissionStatus.loading && (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            {submissionStatus.loading ? 'Creating Content...' : 'Create Content Request'}
          </button>
        </div>
      </form>
    </div>
  );
}

