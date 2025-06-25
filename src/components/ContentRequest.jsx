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
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
    
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

  const handleABTestingVariableChange = (variable) => {
    setFormData(prev => {
      const newVariables = prev.ab_testing.variables.includes(variable)
        ? prev.ab_testing.variables.filter(v => v !== variable)
        : [...prev.ab_testing.variables, variable];
      return {
        ...prev,
        ab_testing: { ...prev.ab_testing, variables: newVariables }
      };
    });
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const newFiles = files.map(file => ({
      id: Date.now() + Math.random(),
      file: file,
      name: file.name,
      size: file.size,
      type: file.type,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null
    }));
    
    setUploadedFiles(prev => [...prev, ...newFiles]);
    setFormData(prev => ({
      ...prev,
      user_content: {
        ...prev.user_content,
        files: [...prev.user_content.files, ...newFiles]
      }
    }));
  };

  const removeFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
    setFormData(prev => ({
      ...prev,
      user_content: {
        ...prev.user_content,
        files: prev.user_content.files.filter(f => f.id !== fileId)
      }
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
    <div className="container mx-auto p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Request Content Creation</h1>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1: Core Request */}
        <div className="p-6 border border-gray-200 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Core Request</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content Type*</label>
              <select
                value={formData.content_type}
                onChange={(e) => handleInputChange('content_type', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select a content type</option>
                <option value="social_media_post">Social Media Post</option>
                <option value="blog_article">Blog Article</option>
                <option value="video_script">Video Script</option>
                <option value="email_newsletter">Email Newsletter</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Target Platforms*</label>
              <div className="flex flex-wrap gap-4">
                {['Instagram', 'Facebook', 'Twitter', 'LinkedIn', 'TikTok', 'YouTube'].map(p => (
                  <label key={p} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.platforms.includes(p)}
                      onChange={() => handlePlatformChange(p)}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    <span>{p}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Content Details */}
        <div className="p-6 border border-gray-200 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Content Details</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Topic*</label>
              <input
                type="text"
                value={formData.topic}
                onChange={(e) => handleInputChange('topic', e.target.value)}
                placeholder="A short, focused topic (e.g., 'AI in Education')"
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content Description*</label>
              <textarea
                value={formData.content_description}
                onChange={(e) => handleInputChange('content_description', e.target.value)}
                placeholder="Describe the content in detail. What is the key message?"
                className="w-full p-3 border border-gray-300 rounded-md h-32"
                required
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Call to Action (CTA) (Optional - AI will optimize)</label>
              <input
                type="text"
                value={formData.cta}
                onChange={(e) => handleInputChange('cta', e.target.value)}
                placeholder="What action should readers take? (e.g., 'Sign up for our newsletter')"
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Audience Persona*</label>
              <select
                value={formData.audience_persona_name}
                onChange={(e) => handleInputChange('audience_persona_name', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select an audience</option>
                {audiencePersonas.map(persona => (
                  <option key={persona} value={persona}>{persona}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Section 3: Media & Files */}
        <div className="p-6 border border-gray-200 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Media & File Upload</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload Images/Videos</label>
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleFileUpload}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
              <p className="text-sm text-gray-500 mt-1">Upload reference images, videos, or assets for your content</p>
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
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Section 4: Personalization */}
        <div className="p-6 border border-gray-200 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Personalization & Context</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Additional Context</label>
              <textarea
                value={formData.user_content.additional_context}
                onChange={(e) => handleInputChange('user_content.additional_context', e.target.value)}
                placeholder="Any additional context, background information, or specific details..."
                className="w-full p-3 border border-gray-300 rounded-md h-24"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Custom Caption/Text</label>
              <textarea
                value={formData.user_content.custom_caption}
                onChange={(e) => handleInputChange('user_content.custom_caption', e.target.value)}
                placeholder="Any specific text, quotes, or captions you want included..."
                className="w-full p-3 border border-gray-300 rounded-md h-24"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Brand Voice Description</label>
              <textarea
                value={formData.user_content.brand_voice}
                onChange={(e) => handleInputChange('user_content.brand_voice', e.target.value)}
                placeholder="Describe your brand's voice and personality (e.g., 'Professional yet approachable, educational, inspiring')"
                className="w-full p-3 border border-gray-300 rounded-md h-24"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Brand Guidelines</label>
              <textarea
                value={formData.user_content.brand_guidelines}
                onChange={(e) => handleInputChange('user_content.brand_guidelines', e.target.value)}
                placeholder="Any specific brand guidelines, do's and don'ts, or style requirements..."
                className="w-full p-3 border border-gray-300 rounded-md h-24"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Section 5: A/B Testing */}
        <div className="p-6 border border-gray-200 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">A/B Testing</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.ab_testing.enabled}
                onChange={(e) => handleInputChange('ab_testing.enabled', e.target.checked)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label className="text-sm font-medium text-gray-700">Enable A/B Testing</label>
            </div>
            
            {formData.ab_testing.enabled && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Test Variables</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {['Headline', 'CTA', 'Opening Hook', 'Hashtags', 'Emojis', 'Image Style'].map(variable => (
                      <label key={variable} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={formData.ab_testing.variables.includes(variable)}
                          onChange={() => handleABTestingVariableChange(variable)}
                          className="h-4 w-4 text-blue-600 border-gray-300 rounded"
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
                    onChange={(e) => handleInputChange('ab_testing.variations', parseInt(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-md"
                  >
                    <option value={2}>2 Variations - A vs B test</option>
                    <option value={3}>3 Variations - A vs B vs C test</option>
                    <option value={4}>4 Variations - A vs B vs C vs D test</option>
                  </select>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Section 6: Advanced Options */}
        <div className="p-6 border border-gray-200 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Advanced Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Target Word Count</label>
              <input
                type="number"
                value={formData.advanced_options.target_word_count}
                onChange={(e) => handleInputChange('advanced_options.target_word_count', e.target.value)}
                placeholder="e.g., 150"
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Posting Schedule</label>
              <input
                type="text"
                value={formData.advanced_options.posting_schedule}
                onChange={(e) => handleInputChange('advanced_options.posting_schedule', e.target.value)}
                placeholder="e.g., 'Monday 9 AM EST'"
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div className="mt-4 space-y-4">
            <div className="flex items-center space-x-6">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.advanced_options.include_hashtags}
                  onChange={(e) => handleInputChange('advanced_options.include_hashtags', e.target.checked)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <span className="text-sm">Include Hashtags</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.advanced_options.include_emojis}
                  onChange={(e) => handleInputChange('advanced_options.include_emojis', e.target.checked)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <span className="text-sm">Include Emojis</span>
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Specific Instructions</label>
              <textarea
                value={formData.advanced_options.specific_instructions}
                onChange={(e) => handleInputChange('advanced_options.specific_instructions', e.target.value)}
                placeholder="Any specific instructions or requirements..."
                className="w-full p-3 border border-gray-300 rounded-md h-24"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Section 7: Automation */}
        <div className="p-6 border border-gray-200 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Total Automation</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.automation.enabled}
                onChange={(e) => handleInputChange('automation.enabled', e.target.checked)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label className="text-sm font-medium text-gray-700">Enable Total Automation</label>
            </div>
            
            {formData.automation.enabled && (
              <div className="ml-6 space-y-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.automation.auto_post}
                    onChange={(e) => handleInputChange('automation.auto_post', e.target.checked)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <span className="text-sm">Auto-post to platforms</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.automation.review_required}
                    onChange={(e) => handleInputChange('automation.review_required', e.target.checked)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <span className="text-sm">Require review before posting</span>
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Section 8: API Keys */}
        <div className="p-6 border border-gray-200 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">API Keys</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">OpenAI API Key</label>
              <input
                type="password"
                value={formData.api_keys.openai_key}
                onChange={(e) => handleInputChange('api_keys.openai_key', e.target.value)}
                placeholder="sk-..."
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Blotato API Key</label>
              <input
                type="password"
                value={formData.api_keys.blotato_key}
                onChange={(e) => handleInputChange('api_keys.blotato_key', e.target.value)}
                placeholder="Your Blotato API key"
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Custom API Key</label>
              <input
                type="password"
                value={formData.api_keys.custom_api_key}
                onChange={(e) => handleInputChange('api_keys.custom_api_key', e.target.value)}
                placeholder="Any other API key needed"
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>

        {/* Section 9: Keyword Focus */}
        <div className="p-6 border border-gray-200 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Keyword Focus (for SEO)</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <input
              type="text"
              value={formData.primary_keywords}
              onChange={(e) => handleInputChange('primary_keywords', e.target.value)}
              placeholder="Primary Keywords (e.g., AI tools)"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              value={formData.secondary_keywords}
              onChange={(e) => handleInputChange('secondary_keywords', e.target.value)}
              placeholder="Secondary Keywords (e.g., teacher resources)"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              value={formData.long_tail_keywords}
              onChange={(e) => handleInputChange('long_tail_keywords', e.target.value)}
              placeholder="Long-tail (e.g., best AI tools for lesson planning)"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        
        {/* Inspiration Link */}
        <div className="p-6 border border-gray-200 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Inspiration</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Inspiration Link</label>
            <input
              type="url"
              value={formData.inspiration_link}
              onChange={(e) => handleInputChange('inspiration_link', e.target.value)}
              placeholder="Link to content you want to rip off and make better"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-end space-x-4">
          <button
            type="submit"
            disabled={submissionStatus.loading}
            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
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

      {/* Status Messages */}
      {submissionStatus.success && (
        <div className="mt-4 p-4 bg-green-100 text-green-800 border border-green-300 rounded-md">
          Success! Your content request has been submitted.
        </div>
      )}
      {submissionStatus.error && (
        <div className="mt-4 p-4 bg-red-100 text-red-800 border border-red-300 rounded-md">
          <strong>Error:</strong> {submissionStatus.error}
        </div>
      )}
    </div>
  );
}

