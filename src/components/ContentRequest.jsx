import { useState, useEffect } from 'react';
// import { useAuth } from '../contexts/AuthContext'; // Temporarily removed
import { createContentRequest } from '../lib/supabase'; // Ensure this path is correct

export function ContentRequest() {
  // const { user } = useAuth(); // Temporarily removed
  const [formData, setFormData] = useState({
    content_type: '',
    platforms: [],
    topic: '',
    content_description: '',
    primary_keywords: '',
    secondary_keywords: '',
    long_tail_keywords: '',
    business_objective: '',
    priority: 'normal',
    inspiration_link: '',
    audience_persona_name: '',
    brand_profile_name: 'YouNifAiEd', // Default value
    user_content: {
      files: [],
      text: '',
    },
    ab_testing: {
      enabled: false,
      variable: '',
      variations: 2,
    },
    advanced_options: {
      tone_of_voice: '',
      style_guide: '',
      specific_instructions: '',
    },
  });

  const [submissionStatus, setSubmissionStatus] = useState({
    loading: false,
    error: null,
    success: false,
  });

  const [audiencePersonas, setAudiencePersonas] = useState([]);

  // In a real app, you'd fetch this from your database.
  // For now, we'll hardcode them based on your CSV.
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
      // Set a default value to avoid blank initial state
      setFormData(prev => ({ ...prev, audience_persona_name: personas[0] }));
    }
  }, []);


  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Reset status when user starts typing again
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

  const resetForm = () => {
    setFormData({
      content_type: '',
      platforms: [],
      topic: '',
      content_description: '',
      primary_keywords: '',
      secondary_keywords: '',
      long_tail_keywords: '',
      business_objective: '',
      priority: 'normal',
      inspiration_link: '',
      audience_persona_name: audiencePersonas.length > 0 ? audiencePersonas[0] : '',
      brand_profile_name: 'YouNifAiEd',
      user_content: { files: [], text: '' },
      ab_testing: { enabled: false, variable: '', variations: 2 },
      advanced_options: { tone_of_voice: '', style_guide: '', specific_instructions: '' },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit: Starting submission process...");
    setSubmissionStatus({ loading: true, error: null, success: false });

    try {
      // Temporarily use placeholder user data since useAuth is bypassed
      const tempUserId = 'temp-user-id-placeholder'; 
      const tempUserEmail = 'temp@example.com';

      if (!formData.audience_persona_name || !formData.brand_profile_name) {
          throw new Error("Audience Persona and Brand Profile are required.");
      }

      const requestData = {
        ...formData,
        user_id: tempUserId, // Use placeholder
        email: tempUserEmail, // Use placeholder
        status: 'pending',
      };

      console.log("handleSubmit: Data being sent to Supabase:", requestData);

      const result = await createContentRequest(requestData);

      console.log("handleSubmit: Response from Supabase:", result);

      if (result.error) {
        // Use the error message from Supabase
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
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Request New Content</h1>
      
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

        {/* Section 3: Keyword Focus */}
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

