// Workflow Router for Content Management System
// Routes content requests to appropriate workflows based on content type and platforms

class WorkflowRouter {
  constructor() {
    // Platform-specific content type mappings
    this.platformContentTypes = {
      instagram: {
        supported: ['social_post', 'story', 'reel', 'carousel'],
        formats: {
          social_post: { aspectRatio: 'square', maxLength: 2200 },
          story: { aspectRatio: 'portrait', maxLength: 500, duration: 24 },
          reel: { aspectRatio: 'portrait', maxLength: 500, videoLength: 90 },
          carousel: { aspectRatio: 'square', maxSlides: 10, maxLength: 2200 }
        }
      },
      facebook: {
        supported: ['social_post', 'story', 'reel', 'carousel', 'page_post', 'group_post'],
        formats: {
          social_post: { aspectRatio: 'landscape', maxLength: 63206 },
          page_post: { aspectRatio: 'landscape', maxLength: 63206 },
          group_post: { aspectRatio: 'landscape', maxLength: 63206 },
          story: { aspectRatio: 'portrait', maxLength: 500, duration: 24 },
          reel: { aspectRatio: 'portrait', maxLength: 500, videoLength: 90 },
          carousel: { aspectRatio: 'landscape', maxSlides: 10, maxLength: 63206 }
        }
      },
      twitter: {
        supported: ['social_post', 'thread'],
        formats: {
          social_post: { aspectRatio: 'landscape', maxLength: 280 },
          thread: { aspectRatio: 'landscape', maxLength: 280, maxTweets: 25 }
        }
      },
      linkedin: {
        supported: ['social_post', 'article', 'carousel'],
        formats: {
          social_post: { aspectRatio: 'landscape', maxLength: 3000 },
          article: { aspectRatio: 'landscape', maxLength: 125000 },
          carousel: { aspectRatio: 'landscape', maxSlides: 20, maxLength: 3000 }
        }
      },
      youtube: {
        supported: ['short_video'],
        formats: {
          short_video: { aspectRatio: 'portrait', maxLength: 100, videoLength: 60 }
        }
      },
      tiktok: {
        supported: ['short_video'],
        formats: {
          short_video: { aspectRatio: 'portrait', maxLength: 150, videoLength: 600 }
        }
      },
      pinterest: {
        supported: ['pin', 'idea_pin'],
        formats: {
          pin: { aspectRatio: 'portrait', maxLength: 500 },
          idea_pin: { aspectRatio: 'portrait', maxLength: 500, maxSlides: 20 }
        }
      }
    };

    // Workflow mapping based on content type and complexity
    this.workflowMappings = {
      social_post: {
        single_platform: 'simple_social_workflow',
        multi_platform: 'multi_platform_social_workflow',
        with_video: 'social_video_workflow'
      },
      video_script: {
        youtube_shorts: 'youtube_shorts_workflow',
        tiktok: 'tiktok_video_workflow',
        instagram_reel: 'instagram_reel_workflow',
        multi_platform: 'multi_platform_video_workflow'
      },
      blog_post: {
        single_platform: 'blog_content_workflow',
        with_social_promotion: 'blog_with_social_workflow'
      },
      email_campaign: {
        newsletter: 'email_newsletter_workflow',
        promotional: 'email_promotional_workflow'
      },
      infographic: {
        single_platform: 'infographic_workflow',
        multi_platform: 'multi_platform_infographic_workflow'
      }
    };
  }

  // Main routing function
  routeContentRequest(requestData) {
    const {
      content_type,
      platforms,
      business_objective,
      priority,
      user_content,
      ab_testing,
      advanced_options
    } = requestData;

    // Determine workflow complexity
    const workflowType = this.determineWorkflowType(content_type, platforms, user_content);
    
    // Get specific workflow ID
    const workflowId = this.getWorkflowId(content_type, workflowType);
    
    // Generate platform-specific requirements
    const platformRequirements = this.generatePlatformRequirements(platforms, content_type);
    
    // Create workflow payload
    const workflowPayload = this.createWorkflowPayload(
      requestData,
      workflowId,
      platformRequirements
    );

    return {
      workflowId,
      workflowType,
      platformRequirements,
      payload: workflowPayload,
      estimatedTime: this.estimateCompletionTime(workflowType, platforms.length),
      blotato: {
        requiresVideoGeneration: this.requiresVideoGeneration(content_type, platforms),
        requiresImageGeneration: this.requiresImageGeneration(content_type, platforms, user_content),
        targetPlatforms: this.mapToBlotato Platforms(platforms)
      }
    };
  }

  // Determine workflow complexity based on request
  determineWorkflowType(contentType, platforms, userContent) {
    if (platforms.length === 1) {
      return 'single_platform';
    }
    
    if (platforms.length > 3) {
      return 'multi_platform';
    }
    
    if (this.hasVideoContent(contentType, userContent)) {
      return 'with_video';
    }
    
    if (contentType === 'blog_post' && platforms.some(p => ['instagram', 'facebook', 'twitter'].includes(p))) {
      return 'with_social_promotion';
    }
    
    return 'multi_platform';
  }

  // Get specific workflow ID
  getWorkflowId(contentType, workflowType) {
    const mapping = this.workflowMappings[contentType];
    if (!mapping) {
      throw new Error(`Unsupported content type: ${contentType}`);
    }
    
    return mapping[workflowType] || mapping.single_platform || 'default_workflow';
  }

  // Generate platform-specific content requirements
  generatePlatformRequirements(platforms, contentType) {
    return platforms.map(platform => {
      const platformConfig = this.platformContentTypes[platform];
      if (!platformConfig) {
        throw new Error(`Unsupported platform: ${platform}`);
      }

      // Determine best content format for this platform
      const contentFormat = this.getBestContentFormat(platform, contentType);
      const formatConfig = platformConfig.formats[contentFormat];

      return {
        platform,
        contentFormat,
        requirements: {
          ...formatConfig,
          optimizations: this.getPlatformOptimizations(platform, contentType)
        }
      };
    });
  }

  // Get best content format for platform/content type combination
  getBestContentFormat(platform, contentType) {
    const platformConfig = this.platformContentTypes[platform];
    
    // Direct mapping for specific content types
    const directMappings = {
      video_script: {
        youtube: 'short_video',
        tiktok: 'short_video',
        instagram: 'reel',
        facebook: 'reel'
      },
      infographic: {
        pinterest: 'pin',
        instagram: 'carousel',
        linkedin: 'carousel',
        facebook: 'carousel'
      }
    };

    if (directMappings[contentType] && directMappings[contentType][platform]) {
      return directMappings[contentType][platform];
    }

    // Default to social_post if supported, otherwise first supported format
    if (platformConfig.supported.includes('social_post')) {
      return 'social_post';
    }
    
    return platformConfig.supported[0];
  }

  // Get platform-specific optimizations
  getPlatformOptimizations(platform, contentType) {
    const optimizations = {
      instagram: {
        hashtags: { min: 5, max: 30, trending: true },
        timing: 'peak_engagement',
        visual: 'high_quality_images',
        captions: 'engaging_hooks'
      },
      facebook: {
        hashtags: { min: 1, max: 5, trending: false },
        timing: 'peak_engagement',
        visual: 'native_video_preferred',
        captions: 'longer_form_storytelling'
      },
      twitter: {
        hashtags: { min: 1, max: 3, trending: true },
        timing: 'real_time_engagement',
        visual: 'eye_catching_thumbnails',
        captions: 'concise_punchy'
      },
      linkedin: {
        hashtags: { min: 3, max: 10, professional: true },
        timing: 'business_hours',
        visual: 'professional_quality',
        captions: 'thought_leadership'
      },
      youtube: {
        hashtags: { min: 5, max: 15, searchable: true },
        timing: 'consistent_schedule',
        visual: 'thumbnail_optimization',
        captions: 'hook_first_15_seconds'
      },
      tiktok: {
        hashtags: { min: 3, max: 8, trending: true },
        timing: 'peak_youth_hours',
        visual: 'vertical_native',
        captions: 'trend_participation'
      }
    };

    return optimizations[platform] || {};
  }

  // Create complete workflow payload
  createWorkflowPayload(requestData, workflowId, platformRequirements) {
    return {
      // Original request data
      ...requestData,
      
      // Workflow metadata
      workflow: {
        id: workflowId,
        timestamp: new Date().toISOString(),
        version: '1.0'
      },
      
      // Platform-specific requirements
      platforms: platformRequirements,
      
      // AI generation instructions
      ai_instructions: {
        tone: requestData.advanced_options?.tone || 'professional',
        style: this.determineContentStyle(requestData),
        objectives: requestData.business_objective,
        target_audience: requestData.advanced_options?.audience_persona || 'general'
      },
      
      // Blotato-specific configuration
      blotato_config: {
        generate_variations: requestData.ab_testing?.variations || 1,
        success_metrics: requestData.ab_testing?.success_metrics || ['engagement_rate'],
        scheduling: requestData.advanced_options?.scheduling || 'optimal_time'
      }
    };
  }

  // Helper functions
  hasVideoContent(contentType, userContent) {
    return contentType === 'video_script' || 
           (userContent && userContent.videos && userContent.videos.length > 0);
  }

  requiresVideoGeneration(contentType, platforms) {
    return contentType === 'video_script' || 
           platforms.some(p => ['youtube', 'tiktok', 'instagram', 'facebook'].includes(p));
  }

  requiresImageGeneration(contentType, platforms, userContent) {
    const hasUserImages = userContent && userContent.images && userContent.images.length > 0;
    return !hasUserImages && (
      contentType === 'infographic' ||
      platforms.some(p => ['instagram', 'pinterest', 'facebook'].includes(p))
    );
  }

  mapToBlotato Platforms(platforms) {
    const blotato Mapping = {
      instagram: 'instagram',
      facebook: 'facebook',
      twitter: 'twitter',
      linkedin: 'linkedin',
      youtube: 'youtube',
      tiktok: 'tiktok',
      pinterest: 'pinterest'
    };
    
    return platforms.map(p => blotato Mapping[p]).filter(Boolean);
  }

  determineContentStyle(requestData) {
    const { content_type, business_objective, advanced_options } = requestData;
    
    if (advanced_options?.tone) {
      return advanced_options.tone;
    }
    
    // Auto-determine based on content type and objective
    const styleMap = {
      social_post: {
        engagement: 'conversational',
        reach: 'viral',
        conversions: 'persuasive',
        brand_awareness: 'brand_voice'
      },
      video_script: {
        engagement: 'entertaining',
        reach: 'hook_heavy',
        conversions: 'educational',
        brand_awareness: 'storytelling'
      },
      blog_post: {
        engagement: 'informative',
        reach: 'seo_optimized',
        conversions: 'solution_focused',
        brand_awareness: 'thought_leadership'
      }
    };
    
    return styleMap[content_type]?.[business_objective] || 'professional';
  }

  estimateCompletionTime(workflowType, platformCount) {
    const baseTime = {
      single_platform: 5,
      multi_platform: 8,
      with_video: 15,
      with_social_promotion: 12
    };
    
    const base = baseTime[workflowType] || 10;
    const platformMultiplier = Math.max(1, platformCount * 0.5);
    
    return Math.round(base * platformMultiplier);
  }
}

// Export for use in other modules
export default WorkflowRouter;
