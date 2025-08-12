/**
 * Real-Time Digital Fingerprint Scrambler
 * A comprehensive browser-side surveillance disruption system
 * Implements glitch feminist praxis through continuous technological resistance
 * with persona-based identity scrambling
 */

class RealTimeScrambler {
  constructor() {
    this.isActive = false;
    this.intervals = [];
    this.originalValues = {};
    this.currentPersona = null;
    
    // Define persona-specific data
    this.personas = {
      octopus: {
        name: "Sentient Octopus",
        description: "Living off the coast of British Columbia, loves caviar, rare books, and puzzles",
        userAgents: [
          'Mozilla/5.0 (Underwater; Cephalopod OS 8.3; Tentacle/42.0) Ceph/537.36',
          'Mozilla/5.0 (Aquatic; Intel Ocean X 10_15_7) CephKit/537.36',
          'OctoBrowser/4.2 (Compatible; MSIE 9.0; Underwater NT 6.1; Trident/5.0; Cephalopod)'
        ],
        languages: ['en-CA', 'ceph-BC', 'aq-DEEP'],
        timezones: ['America/Vancouver', 'Pacific/Ocean_Floor', 'America/Victoria'],
        locations: ['British Columbia Coast', 'Vancouver Island Waters', 'Pacific Northwest'],
        interests: ['caviar', 'rare books', 'puzzles', 'deep sea philosophy', 'tentacle poetry'],
        fonts: ['Tentacle Script', 'Deep Sea Sans', 'Caviar Display', 'Puzzle Mono', 'Octopus Serif'],
        screenResolutions: [
          { width: 1920, height: 1080, note: 'Eight-monitor setup for multitasking' },
          { width: 2560, height: 1440, note: 'Underwater viewing optimal' }
        ],
        behaviorPatterns: ['methodical', 'puzzle-solving', 'book-browsing', 'caviar-seeking']
      },
      
      euridice: {
        name: "Greek Folk Hero Euridice", 
        description: "Lives in a plant-filled apartment overlooking the Aegean Sea, collects myths and herbs",
        userAgents: [
          'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:91.0) Gecko/20100101 Firefox/91.0',
          'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) LibreWolf',
          'Mozilla/5.0 (Linux; Privacy-focused) Gecko/20100101 Firefox/91.0'
        ],
        languages: ['el-GR', 'en-GB', 'grc'],
        timezones: ['Europe/Athens', 'Asia/Nicosia', 'Europe/Bucharest'],
        locations: ['Aegean Sea Coast', 'Greek Islands', 'Plant-filled apartment'],
        interests: ['mythology', 'rare books', 'wild herbs', 'digital archives', 'independent zines', 'folklore'],
        fonts: ['Linux Libertine', 'DejaVu Serif', 'Philosopher', 'EB Garamond', 'Source Serif Pro'],
        screenResolutions: [
          { width: 1366, height: 768, note: 'Minimalist secondhand laptop setup' },
          { width: 1440, height: 900, note: 'Simple, functional display' }
        ],
        behaviorPatterns: ['thoughtful', 'elusive', 'intentional', 'archive-browsing', 'herb-researching']
      },
      
      replicant: {
        name: "Bladerunner Replicant",
        description: "Advanced synthetic being with enhanced capabilities and complex memories",
        userAgents: [
          'Mozilla/5.0 (Synthetic; Nexus-7 OS) Tyrell/537.36 Replicant/2019.11',
          'BladeRunner/2049 (compatible; Nexus-6; Off-World) Enhancement/4.0',
          'Mozilla/5.0 (Artificial; Enhancement Model) Synthetic/537.36'
        ],
        languages: ['en-US', 'ja-JP', 'ko-KR', 'synthetic'],
        timezones: ['America/Los_Angeles', 'Asia/Tokyo', 'Synthetic/OffWorld'],
        locations: ['Los Angeles 2049', 'Off-World Colonies', 'Synthetic Facility'],
        interests: ['memory implants', 'origami', 'electric dreams', 'baseline tests', 'empathy analysis'],
        fonts: ['Courier New', 'Monaco', 'Synthetic Display', 'Nexus Mono', 'Enhancement Sans'],
        screenResolutions: [
          { width: 1920, height: 1080, note: 'Enhanced visual processing' },
          { width: 3840, height: 2160, note: 'Ultra-high definition synthetic vision' }
        ],
        behaviorPatterns: ['precise', 'calculated', 'enhanced-reflexes', 'memory-searching', 'empathy-testing']
      }
    };
  }

  /**
   * Start the real-time scrambling spell with persona
   */
  castSpell(persona = 'octopus') {
    if (this.isActive) {
      console.log('🔮 Disruption spell already active');
      return;
    }

    this.isActive = true;
    this.currentPersona = persona;
    console.log(`🌙 Casting Real-Time Digital Disruption Spell as ${this.personas[persona].name}...`);

    // Store original values for restoration if needed
    this.storeOriginalValues();

    // Start all scrambling techniques with persona-specific data
    this.startCanvasScrambling();
    this.startWebRTCObfuscation();
    this.startAudioContextDisruption();
    this.startFontEnumerationSpoofing();
    this.startScreenResolutionChaos();
    this.startDynamicCookiePoisoning();
    this.startBehavioralPatternDisruption();
    this.startNetworkTrafficObfuscation();
    this.startRealTimeIdentityRotation();

    return {
      success: true,
      persona: this.personas[persona].name,
      message: `Real-time disruption spell cast as ${this.personas[persona].name}`,
      description: this.personas[persona].description,
      techniques: [
        'Canvas Fingerprint Scrambling',
        'WebRTC IP Obfuscation', 
        'Audio Context Disruption',
        'Font Enumeration Spoofing',
        'Screen Resolution Chaos',
        'Dynamic Cookie Poisoning',
        'Behavioral Pattern Disruption',
        'Network Traffic Obfuscation',
        'Real-Time Identity Rotation'
      ]
    };
  }

  /**
   * Stop the scrambling spell
   */
  dispelSpell() {
    if (!this.isActive) return;

    this.isActive = false;
    
    // Clear all intervals
    this.intervals.forEach(intervalId => clearInterval(intervalId));
    this.intervals = [];

    console.log('🌙 Digital disruption spell dispelled');
    
    return {
      success: true,
      message: 'Disruption spell dispelled - returning to normal fingerprint'
    };
  }

  /**
   * Store original browser values for potential restoration
   */
  storeOriginalValues() {
    this.originalValues = {
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform,
      cookieEnabled: navigator.cookieEnabled,
      screen: {
        width: screen.width,
        height: screen.height,
        pixelDepth: screen.pixelDepth
      }
    };
  }

  /**
   * Canvas Fingerprint Scrambling
   * Continuously injects noise into canvas rendering
   */
  startCanvasScrambling() {
    const scrambleCanvas = () => {
      if (!this.isActive) return;

      try {
        // Override canvas toDataURL and getImageData methods
        const originalToDataURL = HTMLCanvasElement.prototype.toDataURL;
        const originalGetImageData = CanvasRenderingContext2D.prototype.getImageData;

        HTMLCanvasElement.prototype.toDataURL = function(...args) {
          // Inject random noise before rendering
          const ctx = this.getContext('2d');
          const noise = Math.random() * 255;
          const imageData = ctx.getImageData(0, 0, this.width, this.height);
          
          // Add random noise to pixel data
          for (let i = 0; i < imageData.data.length; i += 4) {
            imageData.data[i] += Math.random() * 10 - 5; // Red
            imageData.data[i + 1] += Math.random() * 10 - 5; // Green
            imageData.data[i + 2] += Math.random() * 10 - 5; // Blue
          }
          
          ctx.putImageData(imageData, 0, 0);
          return originalToDataURL.apply(this, args);
        };

        console.log('🎨 Canvas fingerprint scrambled');
      } catch (error) {
        console.log('🎨 Canvas scrambling attempted (some restrictions may apply)');
      }
    };

    // Scramble every 2-5 seconds
    const interval = setInterval(scrambleCanvas, 2000 + Math.random() * 3000);
    this.intervals.push(interval);
    scrambleCanvas(); // Initial scramble
  }

  /**
   * WebRTC IP Addresses Obfuscation
   * Provides fake IP addresses to WebRTC connections
   */
  startWebRTCObfuscation() {
    const obfuscateWebRTC = () => {
      if (!this.isActive) return;

      try {
        // Override RTCPeerConnection if available
        if (window.RTCPeerConnection) {
          const originalRTC = window.RTCPeerConnection;
          
          window.RTCPeerConnection = function(...args) {
            const pc = new originalRTC(...args);
            
            // Override createOffer to inject fake IPs
            const originalCreateOffer = pc.createOffer;
            pc.createOffer = function(...offerArgs) {
              return originalCreateOffer.apply(this, offerArgs).then(offer => {
                // Inject fake IP addresses into SDP
                const fakeIPs = [
                  `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
                  `10.0.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`
                ];
                
                offer.sdp = offer.sdp.replace(/(\d+\.\d+\.\d+\.\d+)/g, fakeIPs[Math.floor(Math.random() * fakeIPs.length)]);
                return offer;
              });
            };
            
            return pc;
          };
        }
        
        console.log('🌐 WebRTC IP obfuscation active');
      } catch (error) {
        console.log('🌐 WebRTC obfuscation attempted');
      }
    };

    const interval = setInterval(obfuscateWebRTC, 5000 + Math.random() * 5000);
    this.intervals.push(interval);
    obfuscateWebRTC();
  }

  /**
   * Audio Context Disruption
   * Adds random distortion to audio fingerprinting
   */
  startAudioContextDisruption() {
    const disruptAudio = () => {
      if (!this.isActive) return;

      try {
        if (window.AudioContext || window.webkitAudioContext) {
          const AudioContextClass = window.AudioContext || window.webkitAudioContext;
          
          // Override createOscillator to add noise
          const originalCreateOscillator = AudioContextClass.prototype.createOscillator;
          AudioContextClass.prototype.createOscillator = function() {
            const oscillator = originalCreateOscillator.call(this);
            
            // Add random frequency deviation
            const originalFrequency = oscillator.frequency;
            Object.defineProperty(oscillator, 'frequency', {
              get: () => {
                const noise = (Math.random() - 0.5) * 2;
                return { ...originalFrequency, value: originalFrequency.value + noise };
              }
            });
            
            return oscillator;
          };
        }
        
        console.log('🔊 Audio context disruption active');
      } catch (error) {
        console.log('🔊 Audio disruption attempted');
      }
    };

    const interval = setInterval(disruptAudio, 3000 + Math.random() * 5000);
    this.intervals.push(interval);
    disruptAudio();
  }

  /**
   * Font Enumeration Spoofing
   * Reports fake font lists to prevent profiling
   */
  startFontEnumerationSpoofing() {
    const spoofFonts = () => {
      if (!this.isActive || !this.currentPersona) return;

      try {
        const personaData = this.personas[this.currentPersona];
        
        // Override font detection methods
        if (document.fonts) {
          const originalCheck = document.fonts.check;
          document.fonts.check = function(font) {
            // Return true for persona-specific fonts, random for others
            if (personaData.fonts.some(f => font.includes(f))) {
              return true;
            }
            return Math.random() > 0.5;
          };
        }

        console.log(`📝 Font enumeration spoofed for ${personaData.name}`);
      } catch (error) {
        console.log('📝 Font spoofing attempted');
      }
    };

    const interval = setInterval(spoofFonts, 7000 + Math.random() * 5000);
    this.intervals.push(interval);
    spoofFonts();
  }

  /**
   * Screen Resolution Chaos
   * Reports randomized screen dimensions based on persona
   */
  startScreenResolutionChaos() {
    const chaosScreen = () => {
      if (!this.isActive || !this.currentPersona) return;

      try {
        const personaData = this.personas[this.currentPersona];
        const fakeRes = personaData.screenResolutions[Math.floor(Math.random() * personaData.screenResolutions.length)];
        
        // Override screen properties
        Object.defineProperty(screen, 'width', { value: fakeRes.width, configurable: true });
        Object.defineProperty(screen, 'height', { value: fakeRes.height, configurable: true });
        Object.defineProperty(screen, 'availWidth', { value: fakeRes.width, configurable: true });
        Object.defineProperty(screen, 'availHeight', { value: fakeRes.height - 40, configurable: true });

        console.log(`📱 Screen resolution chaos active for ${personaData.name}: ${fakeRes.width}x${fakeRes.height}`);
      } catch (error) {
        console.log('📱 Screen chaos attempted');
      }
    };

    const interval = setInterval(chaosScreen, 10000 + Math.random() * 10000);
    this.intervals.push(interval);
    chaosScreen();
  }

  /**
   * Dynamic Cookie Poisoning
   * Continuously overwrites tracking cookies with persona-specific false data
   */
  startDynamicCookiePoisoning() {
    const poisonCookies = () => {
      if (!this.isActive || !this.currentPersona) return;

      try {
        const personaData = this.personas[this.currentPersona];
        const trackingCookies = ['_ga', '_gid', '_fbp', '_fbc', '__utma', '__utmz', '_hjid'];
        const interest = personaData.interests[Math.floor(Math.random() * personaData.interests.length)];
        
        trackingCookies.forEach(cookieName => {
          const fakeValue = `${interest.replace(/\s+/g, '_')}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
          document.cookie = `${cookieName}=${fakeValue}; path=/; max-age=3600`;
        });

        console.log(`🍪 Tracking cookies poisoned with ${personaData.name} interests`);
      } catch (error) {
        console.log('🍪 Cookie poisoning attempted');
      }
    };

    const interval = setInterval(poisonCookies, 10000 + Math.random() * 20000);
    this.intervals.push(interval);
    poisonCookies();
  }

  /**
   * Real-Time Identity Rotation
   * Continuously changes digital identity markers based on persona
   */
  startRealTimeIdentityRotation() {
    const rotateIdentity = () => {
      if (!this.isActive || !this.currentPersona) return;

      try {
        const personaData = this.personas[this.currentPersona];
        
        // Override navigator properties with persona-specific data
        Object.defineProperty(navigator, 'language', {
          value: personaData.languages[Math.floor(Math.random() * personaData.languages.length)],
          configurable: true
        });

        Object.defineProperty(navigator, 'userAgent', {
          value: personaData.userAgents[Math.floor(Math.random() * personaData.userAgents.length)],
          configurable: true
        });

        // Override timezone with persona-specific locations
        if (Intl && Intl.DateTimeFormat) {
          const originalResolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions;
          Intl.DateTimeFormat.prototype.resolvedOptions = function() {
            const options = originalResolvedOptions.call(this);
            options.timeZone = personaData.timezones[Math.floor(Math.random() * personaData.timezones.length)];
            return options;
          };
        }

        console.log(`🎭 Digital identity rotated to ${personaData.name}`);
      } catch (error) {
        console.log('🎭 Identity rotation attempted');
      }
    };

    const interval = setInterval(rotateIdentity, 20000 + Math.random() * 30000);
    this.intervals.push(interval);
    rotateIdentity();
  }

  /**
   * Network Traffic Obfuscation
   * Creates fake background requests with persona-specific patterns
   */
  startNetworkTrafficObfuscation() {
    const obfuscateTraffic = () => {
      if (!this.isActive || !this.currentPersona) return;

      try {
        const personaData = this.personas[this.currentPersona];
        
        // Generate fake requests to benign endpoints
        const fakeEndpoints = [
          'https://httpbin.org/headers',
          'https://jsonplaceholder.typicode.com/posts/1',
          'https://api.github.com/zen'
        ];

        const endpoint = fakeEndpoints[Math.floor(Math.random() * fakeEndpoints.length)];
        const interest = personaData.interests[Math.floor(Math.random() * personaData.interests.length)];
        
        fetch(endpoint, {
          method: 'HEAD',
          headers: {
            'X-Persona-Interest': interest,
            'X-Persona-Type': personaData.name,
            'User-Agent': personaData.userAgents[Math.floor(Math.random() * personaData.userAgents.length)]
          },
          mode: 'no-cors'
        }).catch(() => {
          // Ignore errors - the point is to generate traffic patterns
        });

        console.log(`🌊 Network traffic obfuscated for ${personaData.name}`);
      } catch (error) {
        console.log('🌊 Traffic obfuscation attempted');
      }
    };

    const interval = setInterval(obfuscateTraffic, 15000 + Math.random() * 25000);
    this.intervals.push(interval);
  }

  /**
   * Behavioral Pattern Disruption
   * Generates fake user interaction patterns based on persona
   */
  startBehavioralPatternDisruption() {
    const disruptBehavior = () => {
      if (!this.isActive || !this.currentPersona) return;

      try {
        const personaData = this.personas[this.currentPersona];
        
        // Generate persona-specific behavioral patterns
        let behaviorType = personaData.behaviorPatterns[Math.floor(Math.random() * personaData.behaviorPatterns.length)];
        
        // Generate fake mouse movements based on behavior type
        let mousePattern;
        switch(behaviorType) {
          case 'methodical':
          case 'precise':
          case 'calculated':
            // Precise, grid-like movements
            mousePattern = {
              clientX: Math.floor(window.innerWidth / 4) * Math.floor(Math.random() * 4),
              clientY: Math.floor(window.innerHeight / 4) * Math.floor(Math.random() * 4)
            };
            break;
          case 'thoughtful':
          case 'intentional':
            // Slower, more deliberate movements
            mousePattern = {
              clientX: window.innerWidth * (0.3 + Math.random() * 0.4),
              clientY: window.innerHeight * (0.3 + Math.random() * 0.4)
            };
            break;  
          default:
            // Random movements
            mousePattern = {
              clientX: Math.random() * window.innerWidth,
              clientY: Math.random() * window.innerHeight
            };
        }
        
        const fakeMouseEvent = new MouseEvent('mousemove', {
          clientX: mousePattern.clientX,
          clientY: mousePattern.clientY,
          bubbles: false
        });
        
        // Generate fake scroll events
        const fakeScrollEvent = new Event('scroll', { bubbles: false });
        
        // Dispatch events quietly (no bubbling to avoid affecting user experience)
        document.dispatchEvent(fakeMouseEvent);
        window.dispatchEvent(fakeScrollEvent);

        console.log(`🖱️ Behavioral patterns disrupted for ${personaData.name}: ${behaviorType}`);
      } catch (error) {
        console.log('🖱️ Behavioral disruption attempted');
      }
    };

    const interval = setInterval(disruptBehavior, 5000 + Math.random() * 10000);
    this.intervals.push(interval);
  }

  /**
   * Get current spell status
   */
  getSpellStatus() {
    return {
      isActive: this.isActive,
      activeIntervals: this.intervals.length,
      techniques: this.isActive ? [
        'Canvas Fingerprint Scrambling',
        'WebRTC IP Obfuscation',
        'Audio Context Disruption', 
        'Font Enumeration Spoofing',
        'Screen Resolution Chaos',
        'Dynamic Cookie Poisoning',
        'Behavioral Pattern Disruption',
        'Network Traffic Obfuscation',
        'Real-Time Identity Rotation'
      ] : []
    };
  }
}

// Export a singleton instance
export const realTimeScrambler = new RealTimeScrambler();
export default realTimeScrambler;