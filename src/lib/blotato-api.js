// Blotato API Integration Module
// Handles all interactions with Blotato's API for content generation and publishing

class BlotAtoAPI {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseURL = 'https://backend.blotato.com/v2';
    this.headers = {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    };
  }

  // Main content generation and publishing workflow
  async processContentRequest(workflowPayload ) {
    try {
      console.log('🚀 Starting Blotato content generation workflow...');
      
      const results = [];
      
      // Process each platform requirement
      for (const platformReq of workflowPayload.platforms) {
        console.log(`📱 Processing ${platformReq.platform}...`);
        
        const platformResult = await this.processPlatformContent(
          workflowPayload,
          platformReq
        );
        
        results.push(platformResult);
      }
      
      return {
        success: true,
        results,
        summary: this.generateResultSummary(results)
      };
      
    } catch (error) {
      console.error('❌ Blotato workflow error:', error);
      return {
        success: false,
        error: error.message,
        results: []
      };
    }
  }

  // Process content for a specific platform
  async processPlatformContent(workflowPayload, platformReq) {
    const { platform, contentFormat, requirements } = platformReq;
    
    try {
      // Step 1: Generate content variations
      const contentVariations = await this.generateContentVariations(
        workflowPayload,
        platformReq
      );
      
      // Step 2: Generate or upload media if needed
      const mediaAssets = await this.handleMediaAssets(
        workflowPayload,
        platformReq
      );
      
      // Step 3: Create posts in Blotato (as drafts)
      const posts = await this.createDraftPosts(
        contentVariations,
        mediaAssets,
        platformReq,
        workflowPayload
      );
      
      return {
        platform,
        contentFormat,
        success: true,
        posts,
        mediaAssets,
        variations: contentVariations.length
      };
      
    } catch (error) {
      return {
        platform,
        contentFormat,
        success: false,
        error: error.message
      };
    }
  }

  // Generate content variations using AI
  async generateContentVariations(workflowPayload, platformReq) {
    const { platform, contentFormat, requirements } = platformReq;
    const { ai_instructions, blotato_config } = workflowPayload;
    
    const variations = [];
    const numVariations = blotato_config.generate_variations || 1;
    
    for (let i = 0; i < numVariations; i++) {
      const prompt = this.buildContentPrompt(workflowPayload, platformReq, i);
      
      // For now, we'll create structured content
      // In the future, this could call Blotato's content generation API
      const content = this.generateStructuredContent(prompt, requirements);
      
      variations.push({
        id: `${platform}_variation_${i + 1}`,
        content,
        platform,
        format: contentFormat,
        requirements
      });
    }
    
    return variations;
  }

  // Build AI prompt for content generation
  buildContentPrompt(workflowPayload, platformReq, variationIndex) {
    const { platform, contentFormat, requirements } = platformReq;
    const { ai_instructions, content_description, business_objective } = workflowPayload;
    
    const basePrompt = `
Create ${contentFormat} content for ${platform} with the following requirements:

CONTENT BRIEF: ${content_description}
BUSINESS OBJECTIVE: ${business_objective}
TONE: ${ai_instructions.tone}
TARGET AUDIENCE: ${ai_instructions.target_audience}

PLATFORM REQUIREMENTS:
- Max length: ${requirements.maxLength} characters
- Aspect ratio: ${requirements.aspectRatio}
- Optimizations: ${JSON.stringify(requirements.optimizations)}

${variationIndex > 0 ? `VARIATION ${variationIndex + 1}: Create a different approach/angle` : ''}

Generate engaging, platform-optimized content that drives ${business_objective}.
`;

    return basePrompt.trim();
  }

  // Generate structured content (placeholder for AI generation)
  generateStructuredContent(prompt, requirements) {
    // This is a placeholder - in production, this would call Blotato's AI API
    // For now, we'll create structured content based on requirements
    
    const content = {
      text: this.generateSampleText(requirements),
      hashtags: this.generateHashtags(requirements),
      callToAction: this.generateCTA(requirements)
    };
    
    return content;
  }

  // Handle media assets (upload user content or generate new)
  async handleMediaAssets(workflowPayload, platformReq) {
    const assets = [];
    
    try {
      // Upload user-provided media first
      if (workflowPayload.user_content?.images) {
        for (const image of workflowPayload.user_content.images) {
          const uploadedAsset = await this.uploadMedia(image);
          assets.push(uploadedAsset);
        }
      }
      
      if (workflowPayload.user_content?.videos) {
        for (const video of workflowPayload.user_content.videos) {
          const uploadedAsset = await this.uploadMedia(video);
          assets.push(uploadedAsset);
        }
      }
      
      // Generate additional media if needed
      if (this.needsGeneratedMedia(workflowPayload, platformReq, assets)) {
        const generatedAssets = await this.generateMedia(workflowPayload, platformReq);
        assets.push(...generatedAssets);
      }
      
      return assets;
      
    } catch (error) {
      console.error('Media handling error:', error);
      return [];
    }
  }

  // Upload media to Blotato
  async uploadMedia(mediaFile) {
    try {
      const formData = new FormData();
      formData.append('file', mediaFile);
      
      const response = await fetch(`${this.baseURL}/media`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: formData
      });
      
      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }
      
      const result = await response.json();
      return {
        id: result.id,
        url: result.url,
        type: result.type,
        source: 'user_upload'
      };
      
    } catch (error) {
      console.error('Media upload error:', error);
      throw error;
    }
  }

  // Generate media using Blotato's AI
  async generateMedia(workflowPayload, platformReq) {
    const { contentFormat, requirements } = platformReq;
    const assets = [];
    
    try {
      // Generate video for video content types
      if (this.isVideoContent(contentFormat)) {
        const video = await this.generateVideo(workflowPayload, platformReq);
        if (video) assets.push(video);
      }
      
      // Generate images for visual content types
      if (this.needsImages(contentFormat)) {
        const images = await this.generateImages(workflowPayload, platformReq);
        assets.push(...images);
      }
      
      return assets;
      
    } catch (error) {
      console.error('Media generation error:', error);
      return [];
    }
  }

  // Generate video using Blotato API
  async generateVideo(workflowPayload, platformReq) {
    try {
      const videoPrompt = this.buildVideoPrompt(workflowPayload, platformReq);
      
      const response = await fetch(`${this.baseURL}/videos/creations`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          prompt: videoPrompt,
          aspectRatio: platformReq.requirements.aspectRatio,
          duration: platformReq.requirements.videoLength || 30
        })
      });
      
      if (!response.ok) {
        throw new Error(`Video generation failed: ${response.statusText}`);
      }
      
      const result = await response.json();
      
      // Poll for completion
      const completedVideo = await this.pollVideoCompletion(result.id);
      
      return {
        id: completedVideo.id,
        url: completedVideo.url,
        type: 'video',
        source: 'ai_generated',
        aspectRatio: platformReq.requirements.aspectRatio
      };
      
    } catch (error) {
      console.error('Video generation error:', error);
      return null;
    }
  }

  // Poll for video completion
  async pollVideoCompletion(videoId, maxAttempts = 30) {
    for (let i = 0; i < maxAttempts; i++) {
      try {
        const response = await fetch(`${this.baseURL}/videos/creations/${videoId}`, {
          headers: this.headers
        });
        
        const video = await response.json();
        
        if (video.status === 'completed') {
          return video;
        }
        
        if (video.status === 'failed') {
          throw new Error('Video generation failed');
        }
        
        // Wait 10 seconds before next check
        await new Promise(resolve => setTimeout(resolve, 10000));
        
      } catch (error) {
        console.error(`Video polling attempt ${i + 1} failed:`, error);
      }
    }
    
    throw new Error('Video generation timeout');
  }

  // Create draft posts in Blotato
  async createDraftPosts(contentVariations, mediaAssets, platformReq, workflowPayload) {
    const posts = [];
    
    for (const variation of contentVariations) {
      try {
        const post = await this.createSinglePost(
          variation,
          mediaAssets,
          platformReq,
          workflowPayload,
          true // draft mode
        );
        
        posts.push(post);
        
      } catch (error) {
        console.error(`Failed to create post for ${variation.id}:`, error);
      }
    }
    
    return posts;
  }

  // Create a single post in Blotato
  async createSinglePost(variation, mediaAssets, platformReq, workflowPayload, isDraft = true) {
    const accountId = this.getAccountId(platformReq.platform, workflowPayload);
    
    const postData = {
      post: {
        accountId,
        content: this.formatContentForPlatform(variation.content, platformReq),
        target: {
          platform: platformReq.platform
        }
      }
    };
    
    // Add media if available
    if (mediaAssets.length > 0) {
      postData.post.content.mediaUrls = mediaAssets.map(asset => asset.url);
    }
    
    // Add scheduling if not draft
    if (!isDraft && workflowPayload.advanced_options?.scheduling) {
      postData.scheduledTime = this.calculateOptimalTime(
        platformReq.platform,
        workflowPayload.advanced_options.scheduling
      );
    }
    
    const response = await fetch(`${this.baseURL}/posts`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(postData)
    });
    
    if (!response.ok) {
      throw new Error(`Post creation failed: ${response.statusText}`);
    }
    
    const result = await response.json();
    
    return {
      id: result.id,
      platform: platformReq.platform,
      status: isDraft ? 'draft' : 'scheduled',
      content: variation.content,
      blotato Url: result.url,
      variation: variation.id
    };
  }

  // Helper functions
  getAccountId(platform, workflowPayload) {
    // This would come from your stored account IDs
    const accountIds = workflowPayload.account_ids || {};
    return accountIds[platform] || 'default';
  }

  formatContentForPlatform(content, platformReq) {
    const { platform, requirements } = platformReq;
    
    let text = content.text;
    
    // Add hashtags based on platform preferences
    if (content.hashtags && content.hashtags.length > 0) {
      const hashtagText = content.hashtags.join(' ');
      text += `\n\n${hashtagText}`;
    }
    
    // Add CTA if present
    if (content.callToAction) {
      text += `\n\n${content.callToAction}`;
    }
    
    // Truncate if needed
    if (text.length > requirements.maxLength) {
      text = text.substring(0, requirements.maxLength - 3) + '...';
    }
    
    return { text };
  }

  needsGeneratedMedia(workflowPayload, platformReq, existingAssets) {
    const hasUserMedia = existingAssets.length > 0;
    const isVisualPlatform = ['instagram', 'pinterest', 'tiktok', 'youtube'].includes(platformReq.platform);
    const isVideoContent = this.isVideoContent(platformReq.contentFormat);
    
    return !hasUserMedia && (isVisualPlatform || isVideoContent);
  }

  isVideoContent(contentFormat) {
    return ['reel', 'short_video', 'story'].includes(contentFormat);
  }

  needsImages(contentFormat) {
    return ['social_post', 'carousel', 'pin'].includes(contentFormat);
  }

  // Generate sample content (placeholder)
  generateSampleText(requirements) {
    return `Sample content optimized for ${requirements.aspectRatio} format with ${requirements.maxLength} character limit.`;
  }

  generateHashtags(requirements) {
    const opts = requirements.optimizations?.hashtags || {};
    const count = Math.min(opts.max || 5, opts.min || 1);
    
    return Array.from({ length: count }, (_, i) => `#hashtag${i + 1}`);
  }

  generateCTA(requirements) {
    return "Take action now!";
  }

  buildVideoPrompt(workflowPayload, platformReq) {
    return `Create a ${platformReq.requirements.aspectRatio} video for ${platformReq.platform} about: ${workflowPayload.content_description}`;
  }

  calculateOptimalTime(platform, scheduling) {
    // Placeholder for optimal time calculation
    const now = new Date();
    now.setHours(now.getHours() + 1); // Schedule 1 hour from now
    return now.toISOString();
  }

  generateResultSummary(results) {
    const successful = results.filter(r => r.success).length;
    const total = results.length;
    const totalPosts = results.reduce((sum, r) => sum + (r.posts?.length || 0), 0);
    
    return {
      platforms: total,
      successful,
      failed: total - successful,
      totalPosts,
      status: successful === total ? 'complete' : 'partial'
    };
  }

  async generateImages(workflowPayload, platformReq) {
    // Placeholder for image generation
    // In production, this would call Blotato's image generation API
    return [];
  }
}

module.exports = BlotAtoAPI;
