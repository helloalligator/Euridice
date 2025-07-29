const mockData = {
  getAnalysisData: (url) => {
    const domain = url.replace(/^https?:\/\//, '').split('/')[0];
    
    // Generate realistic but varied mock data based on the domain
    const baseData = {
      url,
      domain,
      threatLevel: "HIGH",
      threatDescription: "Extensive surveillance infrastructure detected",
      cookieCount: Math.floor(Math.random() * 50) + 20,
      fingerprintingScore: Math.floor(Math.random() * 40) + 60,
      analysisTimestamp: new Date().toISOString(),
    };

    // Mock cookies data
    const cookieTypes = [
      {
        name: "_ga",
        type: "tracking",
        purpose: "Google Analytics - tracks user behavior across sessions",
        domain: "google-analytics.com",
        expiry: "2 years"
      },
      {
        name: "_fbp",
        type: "advertising", 
        purpose: "Facebook Pixel - builds advertising profile for targeted ads",
        domain: "facebook.com",
        expiry: "90 days"
      },
      {
        name: "doubleclick_id",
        type: "tracking",
        purpose: "Google DoubleClick - cross-site user identification",
        domain: "doubleclick.net", 
        expiry: "1 year"
      },
      {
        name: "_hjid",
        type: "analytics",
        purpose: "Hotjar - records user sessions and heatmaps",
        domain: domain,
        expiry: "1 year"
      },
      {
        name: "optimizely_visitor",
        type: "testing",
        purpose: "A/B testing - user behavior experimentation",
        domain: domain,
        expiry: "10 years"
      },
      {
        name: "_pinterest_ct",
        type: "advertising",
        purpose: "Pinterest conversion tracking for ad campaigns",
        domain: "pinterest.com",
        expiry: "1 year"
      }
    ];

    // Mock fingerprinting techniques
    const fingerprintingMethods = [
      {
        technique: "Canvas Fingerprinting",
        detected: true,
        description: "Invisible images rendered to identify your graphics hardware",
        dataCollected: "GPU signature and rendering characteristics"
      },
      {
        technique: "WebRTC IP Leakage", 
        detected: Math.random() > 0.5,
        description: "Real-time communication protocols expose your real IP address",
        dataCollected: "local and public IP addresses"
      },
      {
        technique: "Audio Context Fingerprinting",
        detected: true,
        description: "Audio processing creates unique device signatures",
        dataCollected: "audio hardware and processing characteristics"
      },
      {
        technique: "Font Enumeration",
        detected: Math.random() > 0.3,
        description: "Installed fonts create a unique system fingerprint",
        dataCollected: "system fonts and configuration"
      },
      {
        technique: "WebGL Fingerprinting",
        detected: true,
        description: "3D graphics capabilities uniquely identify your hardware",
        dataCollected: "graphics driver and hardware details"
      },
      {
        technique: "Battery Status API",
        detected: Math.random() > 0.7,
        description: "Battery level and charging status used for tracking",
        dataCollected: "device power state and capacity"
      }
    ];

    // Mock third-party connections
    const thirdParties = [
      {
        domain: "google-analytics.com",
        category: "analytics",
        purpose: "User behavior tracking and website analytics",
        requests: Math.floor(Math.random() * 20) + 5,
        dataShared: "Page views, user interactions, demographics"
      },
      {
        domain: "facebook.com",
        category: "advertising", 
        purpose: "Social media tracking and advertising pixel",
        requests: Math.floor(Math.random() * 15) + 3,
        dataShared: "User identity, interests, social connections"
      },
      {
        domain: "doubleclick.net",
        category: "advertising",
        purpose: "Google's advertising network and user profiling",
        requests: Math.floor(Math.random() * 25) + 10,
        dataShared: "Browsing history, ad interactions, demographics"
      },
      {
        domain: "hotjar.com", 
        category: "analytics",
        purpose: "Session recording and user experience analysis",
        requests: Math.floor(Math.random() * 10) + 2,
        dataShared: "Mouse movements, clicks, form inputs, sessions"
      },
      {
        domain: "amazon-adsystem.com",
        category: "advertising",
        purpose: "Amazon advertising network and product recommendations",
        requests: Math.floor(Math.random() * 12) + 4,
        dataShared: "Shopping behavior, product interests, purchase history"
      }
    ];

    return {
      ...baseData,
      cookies: cookieTypes.slice(0, Math.floor(Math.random() * 4) + 3),
      fingerprinting: fingerprintingMethods.slice(0, Math.floor(Math.random() * 3) + 4),
      thirdParties: thirdParties.slice(0, Math.floor(Math.random() * 2) + 4)
    };
  }
};

export default mockData;