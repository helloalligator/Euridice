const mockData = {
  // Poetic keyword banks for injection
  poeticKeywords: {
    resistance: ["liberation", "autonomy", "agency", "defiance", "disruption", "emancipation"],
    nature: ["moon", "wildflowers", "ocean", "forest", "starlight", "meadow", "rivers"],
    emotion: ["longing", "joy", "melancholy", "wonder", "serenity", "passion", "solitude"],
    mystical: ["spell", "enchantment", "oracle", "divination", "ritual", "magic", "sacred"],
    feminist: ["sisterhood", "empowerment", "embodiment", "intersectionality", "solidarity", "voice"],
    glitch: ["rupture", "fragment", "noise", "break", "bend", "chaos", "artifact", "transgression"]
  },

  // Generate random poetic keyword injection
  generateKeywordInjection: () => {
    const categories = Object.keys(mockData.poeticKeywords);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const keywords = mockData.poeticKeywords[randomCategory];
    return keywords[Math.floor(Math.random() * keywords.length)];
  },

  getAnalysisData: (url) => {
    const domain = url.replace(/^https?:\/\//, '').split('/')[0];
    
    // Generate realistic but varied mock data based on the domain
    const baseData = {
      url,
      domain,
      threatLevel: "HIGH",
      threatDescription: "Extensive algorithmic profiling apparatus detected",
      cookieCount: Math.floor(Math.random() * 50) + 20,
      fingerprintingScore: Math.floor(Math.random() * 40) + 60,
      analysisTimestamp: new Date().toISOString(),
      poeticKeyword: mockData.generateKeywordInjection(),
    };

    // Mock cookies data with more critical descriptions
    const cookieTypes = [
      {
        name: "_ga",
        type: "behavioral tracking",
        purpose: "Google Analytics - constructs behavioral profiles across digital spaces",
        domain: "google-analytics.com",
        expiry: "2 years",
        critique: "Creates persistent identity markers for surveillance capitalism"
      },
      {
        name: "_fbp",
        type: "advertising surveillance", 
        purpose: "Facebook Pixel - builds psychographic profiles for targeted manipulation",
        domain: "facebook.com",
        expiry: "90 days",
        critique: "Enables cross-platform behavioral modification and social control"
      },
      {
        name: "doubleclick_id",
        type: "cross-site tracking",
        purpose: "Google DoubleClick - enables omnipresent user identification across the web",
        domain: "doubleclick.net", 
        expiry: "1 year",
        critique: "Creates persistent shadow profiles that follow users everywhere"
      },
      {
        name: "_hjid",
        type: "behavioral monitoring",
        purpose: "Hotjar - records intimate user interactions and emotional responses",
        domain: domain,
        expiry: "1 year",
        critique: "Captures micro-gestures and hesitations for psychological profiling"
      },
      {
        name: "optimizely_visitor",
        type: "experimentation",
        purpose: "A/B testing - treats users as experimental subjects without consent",
        domain: domain,
        expiry: "10 years",
        critique: "Reduces human agency to variables in corporate optimization algorithms"
      },
      {
        name: "_pinterest_ct",
        type: "consumption tracking",
        purpose: "Pinterest conversion tracking - monitors desire and aspiration patterns",
        domain: "pinterest.com",
        expiry: "1 year",
        critique: "Commodifies human creativity and aesthetic preferences"
      }
    ];

    // Mock fingerprinting techniques with critical analysis
    const fingerprintingMethods = [
      {
        technique: "Canvas Fingerprinting",
        detected: true,
        description: "Invisible images reveal unique hardware signatures—a form of digital DNA extraction",
        dataCollected: "GPU characteristics and rendering patterns",
        resistance: "Resist by randomizing canvas output through browser extensions"
      },
      {
        technique: "WebRTC IP Leakage", 
        detected: Math.random() > 0.5,
        description: "Communication protocols expose real location despite privacy tools—breaking anonymity",
        dataCollected: "Local and public IP addresses, network topology",
        resistance: "Disable WebRTC in browser settings or use specialized tools"
      },
      {
        technique: "Audio Context Fingerprinting",
        detected: true,
        description: "Audio hardware creates unique acoustic signatures—even silence betrays identity",
        dataCollected: "Audio processing characteristics and hardware details",
        resistance: "Use audio spoofing or disable audio context APIs"
      },
      {
        technique: "Font Enumeration",
        detected: Math.random() > 0.3,
        description: "Installed fonts reveal cultural background, profession, and personal preferences",
        dataCollected: "System fonts, language settings, and cultural markers",
        resistance: "Standardize fonts or use font masking extensions"
      },
      {
        technique: "WebGL Fingerprinting",
        detected: true,
        description: "3D graphics capabilities create hardware-specific identity markers",
        dataCollected: "Graphics drivers, hardware specifications, and rendering patterns",
        resistance: "Disable WebGL or use spoofing extensions"
      },
      {
        technique: "Battery Status Exposure",
        detected: Math.random() > 0.7,
        description: "Power levels enable device tracking—your battery becomes a surveillance tool",
        dataCollected: "Battery capacity, charging status, and device usage patterns",
        resistance: "Use browser extensions that fake battery information"
      }
    ];

    // Mock third-party connections with feminist critique
    const thirdParties = [
      {
        domain: "google-analytics.com",
        category: "surveillance capitalism",
        purpose: "Transforms human behavior into predictive data for profit extraction",
        requests: Math.floor(Math.random() * 20) + 5,
        dataShared: "Intimate behavioral patterns, emotional states, vulnerability markers",
        critique: "Commodifies human attention and reduces agency to algorithmic manipulation"
      },
      {
        domain: "facebook.com",
        category: "social surveillance", 
        purpose: "Maps social relationships and emotional connections for behavioral modification",
        requests: Math.floor(Math.random() * 15) + 3,
        dataShared: "Social networks, political beliefs, relationship status, emotional triggers",
        critique: "Exploits human need for connection to enable mass manipulation"
      },
      {
        domain: "doubleclick.net",
        category: "attention economy",
        purpose: "Captures and monetizes human attention through psychological manipulation",
        requests: Math.floor(Math.random() * 25) + 10,
        dataShared: "Attention patterns, desire maps, consumption vulnerabilities",
        critique: "Treats consciousness as raw material for corporate profit extraction"
      },
      {
        domain: "hotjar.com", 
        category: "intimate surveillance",
        purpose: "Records micro-expressions and hesitations to understand emotional vulnerabilities",
        requests: Math.floor(Math.random() * 10) + 2,
        dataShared: "Mouse tremors, reading patterns, emotional responses, areas of confusion",
        critique: "Violates bodily autonomy by capturing involuntary gestures and affects"
      },
      {
        domain: "amazon-adsystem.com",
        category: "desire extraction",
        purpose: "Maps unconscious desires and financial vulnerabilities for exploitation",
        requests: Math.floor(Math.random() * 12) + 4,
        dataShared: "Economic status, purchasing compulsions, financial anxieties",
        critique: "Transforms economic inequality into targeted psychological pressure"
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