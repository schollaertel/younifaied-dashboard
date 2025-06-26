// Blotato API Integration for Content Management System
// Handles communication with Blotato API for content generation and posting

class BlotatoAPI {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseURL = 'https://api.blotato.com/v1';
    this.headers = {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    };
  }

  // Main function to process content request through Blotato
  async processContentRequest(workflowPayload) {
    try {
      const {
        content_type,
        platforms,
        content_description,
        business_objective,
        user_content,
        ab_testing,
        advanced_options,
        blotato_config
      } = workflowPayload;

      // Process each platform requirement
      const platformResults = [];
      
      for (const platformReq of platforms) {
        const result = await this.generatePlatformContent(
          platformReq,
          content_description,
          business_objective,
          user_content,
          blotato_config
        );
        platformResults.push(result);
      }

      // Generate A/B test variations if requested
      if (ab_testing?.enabled && ab_testing.variations > 1) {
        for (let i = 0; i < platformResults.length; i++) {
          const variations = await this.generateContentVariations(
            platformResults[i],
            ab_testing.variations - 1
          );
          platformResults[i].variations = variations;
        }
      }

      return {
        success: true,
        platformResults,
        summary: this.generateResultSummary(platformResults),
        metadata: {
          processedAt: new Date().toISOString(),
          totalPlatforms: platforms.length,
          totalVariations: this.countTotalVariations(platformResults)
        }
      };

    } catch (error) {
      console.error('Blotato API processing error:', error);
      return {
        success: false,
        error: error.message,
        platformResults: [],
        summary: {}
      };
    }
  }

  // Generate content for a specific platform
  async generatePlatformContent(platformReq, description, objective, userContent, config) {
    const { platform, contentFormat, requirements } = platformReq;

    try {
      // Prepare content generation request
      const contentRequest = {
        platform,
        content_type: contentFormat,
        description,
        business_objective: objective,
        requirements: {
          max_length: requirements.maxLength,
          aspect_ratio: requirements.aspectRatio,
          optimizations: requirements.optimizations
        },
        user_content: userContent || {},
        config: config || {}
      };

      // Call Blotato content generation API
      const response = await fetch(`${this.baseURL}/content/generate`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(contentRequest)
      });

      if (!response.ok) {
        throw new Error(`Blotato API error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();

      return {
        platform,
        contentFormat,
        success: true,
        content: result.content,
        metadata: result.metadata,
        generatedAt: new Date().toISOString()
      };

    } catch (error) {
      return {
        platform,
        contentFormat,
        success: false,
        error: error.message,
        generatedAt: new Date().toISOString()
      };
    }
  }

  // Generate content variations for A/B testing
  async generateContentVariations(originalContent, variationCount) {
    if (!originalContent.success) {
      return [];
    }

    const variations = [];

    try {
      for (let i = 0; i < variationCount; i++) {
        const variationRequest = {
          original_content: originalContent.content,
          platform: originalContent.platform,
          variation_type: this.getVariationType(i),
          maintain_core_message: true
        };

        const response = await fetch(`${this.baseURL}/content/variations`, {
          method: 'POST',
          headers: this.headers,
          body: JSON.stringify(variationRequest)
        });

        if (response.ok) {
          const variation = await response.json();
          variations.push({
            id: `variation_${i + 1}`,
            content: variation.content,
            type: variationRequest.variation_type,
            generatedAt: new Date().toISOString()
          });
        }
      }
    } catch (error) {
      console.error('Error generating variations:', error);
    }

    return variations;
  }

  // Get account IDs for posting
  async getBlotatoAccountIds() {
    try {
      const response = await fetch(`${this.baseURL}/accounts`, {
        method: 'GET',
        headers: this.headers
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch account IDs: ${response.status}`);
      }

      const accounts = await response.json();
      return {
        success: true,
        accounts: accounts.data || []
      };

    } catch (error) {
      return {
        success: false,
        error: error.message,
        accounts: []
      };
    }
  }

  // Post content to platforms
  async postContent(content, accountIds, schedulingOptions = {}) {
    const postResults = [];

    try {
      for (const platformContent of content.platformResults) {
        if (!platformContent.success) continue;

        const accountId = accountIds[platformContent.platform];
        if (!accountId) {
          postResults.push({
            platform: platformContent.platform,
            success: false,
            error: 'No account ID found for platform'
          });
          continue;
        }

        const postRequest = {
          account_id: accountId,
          content: platformContent.content,
          scheduling: schedulingOptions[platformContent.platform] || { post_immediately: true }
        };

        const response = await fetch(`${this.baseURL}/posts`, {
          method: 'POST',
          headers: this.headers,
          body: JSON.stringify(postRequest)
        });

        const result = await response.json();
        postResults.push({
          platform: platformContent.platform,
          success: response.ok,
          postId: result.post_id,
          scheduledFor: result.scheduled_for,
          error: response.ok ? null : result.error
        });
      }

      return {
        success: true,
        postResults,
        summary: this.generatePostSummary(postResults)
      };

    } catch (error) {
      return {
        success: false,
        error: error.message,
        postResults
      };
    }
  }

  // Helper functions
  getVariationType(index) {
    const types = ['tone_variation', 'hook_variation', 'cta_variation', 'format_variation'];
    return types[index % types.length];
  }

  generateResultSummary(platformResults) {
    const successful = platformResults.filter(r => r.success).length;
    const failed = platformResults.length - successful;

    return {
      total_platforms: platformResults.length,
      successful_generations: successful,
      failed_generations: failed,
      success_rate: platformResults.length > 0 ? (successful / platformResults.length) * 100 : 0,
      platforms_processed: platformResults.map(r => r.platform)
    };
  }

  generatePostSummary(postResults) {
    const successful = postResults.filter(r => r.success).length;
    const failed = postResults.length - successful;

    return {
      total_posts: postResults.length,
      successful_posts: successful,
      failed_posts: failed,
      success_rate: postResults.length > 0 ? (successful / postResults.length) * 100 : 0,
      platforms_posted: postResults.filter(r => r.success).map(r => r.platform)
    };
  }

  countTotalVariations(platformResults) {
    return platformResults.reduce((total, result) => {
      return total + (result.variations ? result.variations.length : 0) + 1; // +1 for original
    }, 0);
  }

  // Validate API key
  async validateApiKey() {
    try {
      const response = await fetch(`${this.baseURL}/auth/validate`, {
        method: 'GET',
        headers: this.headers
      });

      return {
        valid: response.ok,
        status: response.status
      };
    } catch (error) {
      return {
        valid: false,
        error: error.message
      };
    }
  }
}

export default BlotatoAPI;

