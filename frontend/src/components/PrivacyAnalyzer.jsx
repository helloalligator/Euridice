import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Alert, AlertDescription } from "./ui/alert";
import { Checkbox } from "./ui/checkbox";
import { useToast } from "../hooks/use-toast";
import realTimeScrambler from "../utils/realTimeScrambler";
import { 
  Eye, 
  Shield, 
  Zap, 
  Cookie, 
  Fingerprint, 
  Network, 
  AlertTriangle,
  Sparkles,
  Brain,
  Target,
  Leaf,
  Database,
  Globe,
  Lock,
  Info
} from "lucide-react";

const PrivacyAnalyzer = () => {
  const [url, setUrl] = useState("");
  const [isAccessible, setIsAccessible] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [poisonProgress, setPoisonProgress] = useState(0);
  const [isPoisoning, setIsPoisoning] = useState(false);
  const [showConsent, setShowConsent] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);
  const [useRealData, setUseRealData] = useState(true); // Always use real data now
  const [browserCookiesConsent, setBrowserCookiesConsent] = useState(false);
  const [environmentalImpact, setEnvironmentalImpact] = useState(null);
  const [isSpellActive, setIsSpellActive] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState(null);
  const [spellResults, setSpellResults] = useState(null);
  const [showSpellResults, setShowSpellResults] = useState(false);
  const { toast } = useToast();

  const containerClass = isAccessible ? "accessibility-mode" : "";

  const analyzeUrl = async () => {
    if (!url) {
      toast({
        title: "URL Required",
        description: "Please enter a website URL to analyze",
        variant: "destructive"
      });
      return;
    }

    // Show consent modal for real data collection
    if (!consentGiven) {
      setShowConsent(true);
      return;
    }

    // Perform real-time analysis only
    await performRealTimeAnalysis();
  };

  const performRealTimeAnalysis = async () => {
    setIsAnalyzing(true);
    setEnvironmentalImpact(null);

    try {
      // Ensure URL has proper protocol
      let formattedUrl = url;
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        formattedUrl = `https://${url}`;
      }
      
      // Always perform real-time analysis - no simulation mode
      const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${BACKEND_URL}/api/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: formattedUrl,
          options: {
            includeBrowserCookies: browserCookiesConsent,
            includeWebScraping: true, // Always true for real-time analysis
            includeFingerprinting: true,
            includeEnvironmentalMetrics: true
          }
        })
      });

      if (!response.ok) {
        if (response.status === 422) {
          // Handle no live data available error
          const errorData = await response.json();
          toast({
            title: "No Live Data Available",
            description: errorData.detail.message,
            variant: "destructive"
          });
          return;
        }
        throw new Error('Analysis failed');
      }

      const data = await response.json();
      setAnalysisData(data);
      setEnvironmentalImpact(data.environmentalImpact);
      
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Real-time analysis could not be completed. Please check your connection and try again.",
        variant: "destructive"
      });
      
      console.error('Real-time analysis error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const executeAnalysisWithConsent = async () => {
    setConsentGiven(true);
    setShowConsent(false);
    
    // Perform real-time analysis immediately
    await performRealTimeAnalysis();
  };

  const executePoison = async (persona = 'octopus') => {
    if (!analysisData) {
      toast({
        title: "Analysis Required",
        description: "Please analyze a website first before executing the disruption spell.",
        variant: "destructive"
      });
      return;
    }

    setIsPoisoning(true);
    setPoisonProgress(0);
    setSelectedPersona(persona);
    
    try {
      // Show progress animation
      const progressInterval = setInterval(() => {
        setPoisonProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90; // Stop at 90% until operations complete
          }
          return prev + 15;
        });
      }, 300);

      // Start real-time browser-side scrambling with persona
      const scramblerResult = realTimeScrambler.castSpell(persona);
      setIsSpellActive(true);

      // Also call backend poison API for server-side tracking
      const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${BACKEND_URL}/api/poison`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: analysisData.url,
          domain: analysisData.domain,
          poisonLevel: "aggressive",
          targetCookies: analysisData.cookies.map(c => c.name),
          persona: persona
        })
      });

      if (!response.ok) {
        throw new Error('Backend disruption spell failed');
      }

      const poisonResult = await response.json();
      
      // Complete progress
      clearInterval(progressInterval);
      setPoisonProgress(100);
      
      // Show detailed results
      toast({
        title: `🌙 ${scramblerResult.persona} Disruption Spell Active`,
        description: `Browser-side scrambling: ${scramblerResult.techniques.length} techniques active as ${scramblerResult.persona}. Server-side: Scrambled ${poisonResult.poisonedCookies.length} cookies and ${poisonResult.fingerprintObfuscations.length} fingerprints.`,
        className: isAccessible ? "" : "glitch-text sparkle"
      });

      // Log detailed results
      console.log('🔮 Real-Time Disruption Spell Results:', {
        browserSide: scramblerResult,
        serverSide: poisonResult
      });
      
    } catch (error) {
      toast({
        title: "Spell Interrupted",
        description: "The digital chaos spell encountered technical difficulties. Some disruption techniques may still be active.",
        variant: "destructive"
      });
      console.error('Poison execution error:', error);
    } finally {
      setIsPoisoning(false);
      // Reset progress after a delay
      setTimeout(() => setPoisonProgress(0), 2000);
    }
  };

  const stopDisruptionSpell = () => {
    if (isSpellActive) {
      const result = realTimeScrambler.dispelSpell();
      setIsSpellActive(false);
      
      toast({
        title: "🌙 Disruption Spell Dispelled",
        description: "Real-time scrambling has been stopped. Your digital fingerprint is returning to normal.",
        className: isAccessible ? "" : "glitch-text"
      });
      
      console.log('🔮 Disruption spell dispelled:', result);
    }
  };

  // Clean up spell on component unmount
  React.useEffect(() => {
    return () => {
      if (isSpellActive) {
        realTimeScrambler.dispelSpell();
      }
    };
  }, [isSpellActive]);

  return (
    <div className={`min-h-screen bg-black text-white p-4 ${containerClass}`}>
      <div className={`max-w-6xl mx-auto ${isAccessible ? "" : "retro-scan"}`}>
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className={`text-4xl md:text-6xl font-bold mb-4 ${isAccessible ? "" : "glitch-text"} text-pink-500`}>
            Euridice
          </h1>
          <p className={`text-xl mb-6 ${isAccessible ? "text-gray-600" : "text-cyan-400"}`}>
            A Metadata Beholder • Digital Spellbook for Algorithmic Resistance
          </p>
          <p className={`text-sm mb-8 ${isAccessible ? "text-gray-500" : "text-purple-300"} max-w-2xl mx-auto italic`}>
            "Your computer isn't neutral—systems track everything you do. This playful browser tool protects your privacy by scrambling the data websites collect about you."
          </p>
          
          {/* Accessibility Toggle */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className={isAccessible ? "text-gray-600" : "text-pink-400"}>
              Glitch Mode
            </span>
            <Switch 
              checked={isAccessible} 
              onCheckedChange={setIsAccessible}
              className="data-[state=checked]:bg-green-500"
            />
            <span className={isAccessible ? "text-gray-600" : "text-green-400"}>
              Accessible Mode
            </span>
          </div>
        </div>

        {/* Data Collection Consent Modal */}
        {showConsent && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <Card className={`w-full max-w-2xl ${isAccessible ? "bg-white border-gray-200" : "bg-gray-900 border-purple-500 pixel-border"}`}>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${isAccessible ? "text-gray-900" : "text-purple-400 glitch-text"}`}>
                  <Lock className="w-6 h-6" />
                  Informed Consent for Data Collection
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className={`${isAccessible ? "text-gray-700" : "text-gray-200"}`}>
                  <strong>Euridice</strong> performs real-time analysis to reveal surveillance infrastructure. 
                  This requires web scraping and content analysis to expose hidden tracking mechanisms.
                </p>

                <div className={`p-4 rounded-lg ${isAccessible ? "bg-gray-50 border border-gray-200" : "bg-black/30 border border-cyan-500/30"}`}>
                  <h4 className={`text-sm font-medium mb-3 ${isAccessible ? "text-gray-900" : "text-cyan-400"}`}>
                    Real-Time Analysis (Always Enabled)
                  </h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className={`w-4 h-4 rounded border ${isAccessible ? "bg-purple-600 border-purple-600" : "bg-purple-500 border-purple-500"} flex items-center justify-center`}>
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <label className={`text-sm ${isAccessible ? "text-gray-700" : "text-purple-300"}`}>
                        Fetch and analyze website content (required for real-time analysis)
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="browser-cookies" 
                        checked={browserCookiesConsent}
                        onCheckedChange={setBrowserCookiesConsent}
                      />
                      <label htmlFor="browser-cookies" className={`text-sm ${isAccessible ? "text-gray-700" : "text-yellow-300"}`}>
                        Enhanced cookie analysis (optional - uses browser cookie data)
                      </label>
                    </div>
                  </div>
                  
                  <p className={`text-xs mt-3 ${isAccessible ? "text-gray-600" : "text-gray-400"}`}>
                    ⚠️ Real-time analysis has environmental impact through data transfer and processing.
                  </p>
                </div>

                <Alert className={`${isAccessible ? "border-purple-200 bg-purple-50" : "border-purple-500 bg-purple-500/10 pixel-border"}`}>
                  <Info className={`h-4 w-4 ${isAccessible ? "text-purple-600" : "text-purple-400"}`} />
                  <AlertDescription className={isAccessible ? "text-purple-800" : "text-purple-200"}>
                    <strong>Feminist Technoscience Approach:</strong> This tool reveals hidden surveillance to enable agency. 
                    All analysis is transparent with environmental impact tracked. No personal data is stored permanently.
                  </AlertDescription>
                </Alert>

                <div className="flex gap-3">
                  <Button 
                    onClick={executeAnalysisWithConsent}
                    className={`flex-1 ${isAccessible ? "bg-purple-600 hover:bg-purple-700" : "bg-purple-600 hover:bg-purple-700 sparkle"}`}
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Begin Real-Time Analysis
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setShowConsent(false)}
                    className={`${isAccessible ? "border-gray-300" : "border-gray-600"}`}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* URL Input */}
        <Card className={`mb-8 ${isAccessible ? "bg-white border-gray-200" : "bg-gray-900 border-pink-500 pixel-border sparkle"}`}>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${isAccessible ? "text-gray-900" : "text-cyan-400"}`}>
              <Target className="w-6 h-6" />
              Peer Into the Algorithmic Veil
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input
                placeholder="https://example.com - Cast your gaze upon the digital realm..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className={`flex-1 ${isAccessible ? "border-gray-300" : "bg-black border-cyan-500 text-cyan-400 pixel-border"}`}
              />
              <Button 
                onClick={analyzeUrl}
                disabled={isAnalyzing}
                className={`${isAccessible ? "bg-blue-600 hover:bg-blue-700" : "bg-pink-600 hover:bg-pink-700 sparkle"}`}
              >
                {isAnalyzing ? (
                  <>
                    <Brain className="w-4 h-4 mr-2 animate-spin" />
                    Divining...
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4 mr-2" />
                    Reveal the Unseen
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Analysis Results */}
        {analysisData && (
          <>
            {/* Data Source Transparency */}
            <Card className={`mb-4 ${isAccessible ? "bg-white border-gray-200" : "bg-gray-900 border-cyan-500 pixel-border"}`}>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Database className={`w-5 h-5 ${isAccessible ? "text-blue-600" : "text-cyan-400"}`} />
                    <span className={`text-sm font-medium ${isAccessible ? "text-gray-900" : "text-cyan-400"}`}>
                      Data Source: {analysisData.dataSource || "Educational Simulation"}
                    </span>
                    <Badge variant={analysisData.isRealData ? "destructive" : "secondary"}>
                      {analysisData.isRealData ? "LIVE DATA" : "SIMULATION"}
                    </Badge>
                  </div>
                  {environmentalImpact && (
                    <div className="flex items-center gap-2">
                      <Leaf className={`w-4 h-4 ${isAccessible ? "text-green-600" : "text-green-400"}`} />
                      <span className={`text-xs ${isAccessible ? "text-gray-600" : "text-gray-400"}`}>
                        {environmentalImpact.carbonFootprint}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Environmental Impact Metrics */}
            {environmentalImpact && (
              <Card className={`mb-6 ${isAccessible ? "bg-white border-gray-200" : "bg-gray-900 border-green-500 pixel-border"}`}>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-2 ${isAccessible ? "text-gray-900" : "text-green-400"}`}>
                    <Leaf className="w-6 h-6" />
                    Environmental Impact Assessment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className={`p-3 rounded-lg ${isAccessible ? "bg-gray-50" : "bg-black/30"}`}>
                      <p className={`text-xs ${isAccessible ? "text-gray-600" : "text-gray-400"}`}>Carbon Footprint</p>
                      <p className={`text-lg font-semibold ${isAccessible ? "text-gray-900" : "text-green-400"}`}>
                        {environmentalImpact.carbonFootprint}
                      </p>
                    </div>
                    <div className={`p-3 rounded-lg ${isAccessible ? "bg-gray-50" : "bg-black/30"}`}>
                      <p className={`text-xs ${isAccessible ? "text-gray-600" : "text-gray-400"}`}>Data Transfer</p>
                      <p className={`text-lg font-semibold ${isAccessible ? "text-gray-900" : "text-green-400"}`}>
                        {environmentalImpact.dataTransfer}
                      </p>
                    </div>
                    <div className={`p-3 rounded-lg ${isAccessible ? "bg-gray-50" : "bg-black/30"}`}>
                      <p className={`text-xs ${isAccessible ? "text-gray-600" : "text-gray-400"}`}>Energy Used</p>
                      <p className={`text-lg font-semibold ${isAccessible ? "text-gray-900" : "text-green-400"}`}>
                        {environmentalImpact.energyUsed}
                      </p>
                    </div>
                    <div className={`p-3 rounded-lg ${isAccessible ? "bg-gray-50" : "bg-black/30"}`}>
                      <p className={`text-xs ${isAccessible ? "text-gray-600" : "text-gray-400"}`}>Server Requests</p>
                      <p className={`text-lg font-semibold ${isAccessible ? "text-gray-900" : "text-green-400"}`}>
                        {environmentalImpact.serverRequests}
                      </p>
                    </div>
                  </div>
                  
                  {/* Detailed explanation of data sources and calculations */}
                  <div className={`mt-4 p-4 rounded-lg ${isAccessible ? "bg-blue-50 border border-blue-200" : "bg-cyan-500/10 border border-cyan-500/30"}`}>
                    <h4 className={`text-sm font-semibold mb-2 ${isAccessible ? "text-blue-900" : "text-cyan-400"}`}>
                      🌍 How We Calculate Environmental Impact
                    </h4>
                    <div className={`text-xs space-y-2 ${isAccessible ? "text-blue-800" : "text-cyan-200"}`}>
                      <p>
                        <strong>Carbon Footprint:</strong> Calculated from data transfer (~0.5g CO₂ per MB), 
                        server processing time (~0.1g CO₂ per second), and network requests (~0.1g CO₂ per request). 
                        Based on global internet carbon intensity averages.
                      </p>
                      <p>
                        <strong>Data Transfer:</strong> Measures actual bytes transferred during website fetching, 
                        HTML parsing, and cookie analysis. Includes HTTP headers, page content, and API responses.
                      </p>
                      <p>
                        <strong>Energy Used:</strong> Server processing energy for web scraping, content analysis, 
                        fingerprinting detection, and AI pattern recognition. Estimated at ~0.5 Wh per second of processing.
                      </p>
                      <p>
                        <strong>Digital Justice Principle:</strong> We track environmental impact to maintain transparency 
                        about the cost of resistance. Every act of surveillance detection requires computational resources—
                        awareness enables more mindful digital resistance practices.
                      </p>
                    </div>
                  </div>
                  
                  {environmentalImpact.message && (
                    <p className={`text-sm mt-3 italic ${isAccessible ? "text-gray-600" : "text-green-300"}`}>
                      {environmentalImpact.message}
                    </p>
                  )}
                </CardContent>
              </Card>
            )}

            <Tabs defaultValue="overview" className="mb-8">
            <TabsList className={`grid w-full grid-cols-4 ${isAccessible ? "bg-gray-100" : "bg-gray-800 pixel-border"}`}>
              <TabsTrigger value="overview" className={isAccessible ? "" : "text-cyan-400"}>
                Surveillance Map
              </TabsTrigger>
              <TabsTrigger value="cookies" className={isAccessible ? "" : "text-pink-400"}>
                Tracking Scripts
              </TabsTrigger>
              <TabsTrigger value="fingerprinting" className={isAccessible ? "" : "text-yellow-400"}>
                Identity Extraction
              </TabsTrigger>
              <TabsTrigger value="network" className={isAccessible ? "" : "text-green-400"}>
                Corporate Networks
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className={`${isAccessible ? "bg-white border-gray-200" : "bg-gray-900 border-red-500 pixel-border"}`}>
                  <CardHeader className="pb-2">
                    <CardTitle className={`text-lg flex items-center gap-2 ${isAccessible ? "text-gray-900" : "text-red-400"}`}>
                      <AlertTriangle className="w-5 h-5" />
                      Threat Level
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className={`text-3xl font-bold ${
                      analysisData.threatLevel === 'HIGH' ? 
                        (isAccessible ? "text-red-600" : "text-red-400 glitch-text") :
                      analysisData.threatLevel === 'MEDIUM' ?
                        (isAccessible ? "text-yellow-600" : "text-yellow-400") :
                        (isAccessible ? "text-green-600" : "text-green-400")
                    }`}>
                      {analysisData.threatLevel === 'HIGH' ? '🚨 HIGH RISK' : 
                       analysisData.threatLevel === 'MEDIUM' ? '⚠️ MEDIUM RISK' : 
                       '✅ LOW RISK'}
                    </div>
                    <p className={`text-sm mt-2 ${isAccessible ? "text-gray-600" : "text-gray-400"}`}>
                      {analysisData.threatDescription}
                    </p>
                    {analysisData.trackingIndicators && analysisData.trackingIndicators.length > 0 && (
                      <div className={`mt-3 p-2 rounded ${
                        analysisData.threatLevel === 'HIGH' ? 
                          (isAccessible ? "bg-red-50 border border-red-200" : "bg-red-500/10 border border-red-500/30") :
                        analysisData.threatLevel === 'MEDIUM' ?
                          (isAccessible ? "bg-yellow-50 border border-yellow-200" : "bg-yellow-500/10 border border-yellow-500/30") :
                          (isAccessible ? "bg-green-50 border border-green-200" : "bg-green-500/10 border border-green-500/30")
                      }`}>
                        <p className={`text-xs font-semibold mb-1 ${
                          analysisData.threatLevel === 'HIGH' ? 
                            (isAccessible ? "text-red-800" : "text-red-400") :
                          analysisData.threatLevel === 'MEDIUM' ?
                            (isAccessible ? "text-yellow-800" : "text-yellow-400") :
                            (isAccessible ? "text-green-800" : "text-green-400")
                        }`}>
                          🔍 Tracking Indicators Detected:
                        </p>
                        <ul className={`text-xs space-y-1 ${
                          analysisData.threatLevel === 'HIGH' ? 
                            (isAccessible ? "text-red-700" : "text-red-300") :
                          analysisData.threatLevel === 'MEDIUM' ?
                            (isAccessible ? "text-yellow-700" : "text-yellow-300") :
                            (isAccessible ? "text-green-700" : "text-green-300")
                        }`}>
                          {analysisData.trackingIndicators.map((indicator, index) => (
                            <li key={index}>• {indicator}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className={`${isAccessible ? "bg-white border-gray-200" : "bg-gray-900 border-pink-500 pixel-border sparkle"}`}>
                  <CardHeader className="pb-2">
                    <CardTitle className={`text-lg flex items-center gap-2 ${isAccessible ? "text-gray-900" : "text-pink-400"}`}>
                      <Cookie className="w-5 h-5" />
                      Tracking Cookies
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className={`text-3xl font-bold ${isAccessible ? "text-pink-600" : "text-pink-400"}`}>
                      {analysisData.cookieCount}
                    </div>
                    <p className={`text-sm mt-2 ${isAccessible ? "text-gray-600" : "text-gray-400"}`}>
                      Active surveillance cookies
                    </p>
                  </CardContent>
                </Card>

                <Card className={`${isAccessible ? "bg-white border-gray-200" : "bg-gray-900 border-cyan-500 pixel-border"}`}>
                  <CardHeader className="pb-2">
                    <CardTitle className={`text-lg flex items-center gap-2 ${isAccessible ? "text-gray-900" : "text-cyan-400"}`}>
                      <Fingerprint className="w-5 h-5" />
                      Algorithmic Shadow
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className={`text-3xl font-bold ${isAccessible ? "text-cyan-600" : "text-cyan-400"}`}>
                      {Math.min(100, Math.round(
                        ((analysisData.cookies?.length || 0) * 15) + 
                        ((analysisData.fingerprinting?.length || 0) * 20) + 
                        ((analysisData.thirdParties?.length || 0) * 10)
                      ))}%
                    </div>
                    <p className={`text-sm mt-2 ${isAccessible ? "text-gray-600" : "text-gray-400"}`}>
                      Your "Algorithmic Shadow" is the invisible digital profile built from your browsing data. 
                      Higher percentages indicate more comprehensive surveillance and behavioral prediction capability.
                    </p>
                    <p className={`text-xs mt-1 italic ${isAccessible ? "text-gray-500" : "text-purple-300"}`}>
                      Injected keyword: "{analysisData.poeticKeyword}"
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Privacy Violations Alert */}
              <Alert className={`mt-6 ${isAccessible ? "border-orange-200 bg-orange-50" : "border-yellow-500 bg-yellow-500/10 pixel-border"}`}>
                <AlertTriangle className={`h-4 w-4 ${isAccessible ? "text-orange-600" : "text-yellow-400"}`} />
                <AlertDescription className={isAccessible ? "text-orange-800" : "text-yellow-200"}>
                  <strong>Algorithmic Surveillance Detected:</strong> This website actively profiles your digital behavior through technocratic mechanisms. 
                  Your browsing experience is not neutral—become aware to enable agency amid technofascism.
                </AlertDescription>
              </Alert>
            </TabsContent>

            <TabsContent value="cookies">
              <Card className={`${isAccessible ? "bg-white border-gray-200" : "bg-gray-900 border-pink-500 pixel-border"}`}>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-2 ${isAccessible ? "text-gray-900" : "text-pink-400"}`}>
                    <Cookie className="w-6 h-6" />
                    Surveillance Scripts Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analysisData.cookies.map((cookie, index) => (
                      <div key={index} className={`p-4 rounded-lg ${isAccessible ? "bg-gray-50 border border-gray-200" : "bg-black/50 border border-pink-500/30"}`}>
                        <div className="flex justify-between items-start mb-2">
                          <h4 className={`font-semibold ${isAccessible ? "text-gray-900" : "text-pink-400"}`}>
                            {cookie.name}
                          </h4>
                          <Badge variant={cookie.type.includes('tracking') || cookie.type.includes('surveillance') ? 'destructive' : 'secondary'}>
                            {cookie.type}
                          </Badge>
                        </div>
                        <p className={`text-sm ${isAccessible ? "text-gray-600" : "text-gray-400"} mb-2`}>
                          {cookie.purpose}
                        </p>
                        <p className={`text-xs ${isAccessible ? "text-gray-500" : "text-gray-500"} mb-2`}>
                          Domain: {cookie.domain} • Expires: {cookie.expiry}
                        </p>
                        {cookie.critique && (
                          <p className={`text-xs italic ${isAccessible ? "text-red-600" : "text-red-400"} border-l-2 ${isAccessible ? "border-red-300" : "border-red-500"} pl-2`}>
                            <strong>Critical Analysis:</strong> {cookie.critique}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="fingerprinting">
              <Card className={`${isAccessible ? "bg-white border-gray-200" : "bg-gray-900 border-yellow-500 pixel-border"}`}>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-2 ${isAccessible ? "text-gray-900" : "text-yellow-400"}`}>
                    <Fingerprint className="w-6 h-6" />
                    Biometric Identity Harvesting
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analysisData.fingerprinting.map((method, index) => (
                      <div key={index} className={`p-4 rounded-lg ${isAccessible ? "bg-gray-50 border border-gray-200" : "bg-black/50 border border-yellow-500/30"}`}>
                        <div className="flex justify-between items-center mb-2">
                          <h4 className={`font-semibold ${isAccessible ? "text-gray-900" : "text-yellow-400"}`}>
                            {method.technique}
                          </h4>
                          <Badge variant={method.detected ? 'destructive' : 'outline'}>
                            {method.detected ? 'DETECTED' : 'CLEAN'}
                          </Badge>
                        </div>
                        <p className={`text-sm ${isAccessible ? "text-gray-600" : "text-gray-400"} mb-2`}>
                          {method.description}
                        </p>
                        {method.detected && (
                          <>
                            <p className={`text-xs mt-2 ${isAccessible ? "text-red-600" : "text-red-400"} mb-2`}>
                              ⚠️ Extracting: {method.dataCollected}
                            </p>
                            {method.resistance && (
                              <p className={`text-xs italic ${isAccessible ? "text-blue-600" : "text-cyan-400"} border-l-2 ${isAccessible ? "border-blue-300" : "border-cyan-500"} pl-2`}>
                                <strong>Resistance Strategy:</strong> {method.resistance}
                              </p>
                            )}
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="network">
              <Card className={`${isAccessible ? "bg-white border-gray-200" : "bg-gray-900 border-green-500 pixel-border"}`}>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-2 ${isAccessible ? "text-gray-900" : "text-green-400"}`}>
                    <Network className="w-6 h-6" />
                    Corporate Surveillance Networks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analysisData.thirdParties.map((party, index) => (
                      <div key={index} className={`p-4 rounded-lg ${isAccessible ? "bg-gray-50 border border-gray-200" : "bg-black/50 border border-green-500/30"}`}>
                        <div className="flex justify-between items-start mb-2">
                          <h4 className={`font-semibold ${isAccessible ? "text-gray-900" : "text-green-400"}`}>
                            {party.domain}
                          </h4>
                          <Badge variant={party.category.includes('surveillance') || party.category.includes('capitalism') ? 'destructive' : 'secondary'}>
                            {party.category}
                          </Badge>
                        </div>
                        <p className={`text-sm ${isAccessible ? "text-gray-600" : "text-gray-400"} mb-2`}>
                          {party.purpose}
                        </p>
                        <p className={`text-xs ${isAccessible ? "text-gray-500" : "text-gray-500"} mb-2`}>
                          Requests: {party.requests} • Data harvested: {party.dataShared}
                        </p>
                        {party.critique && (
                          <p className={`text-xs italic ${isAccessible ? "text-red-600" : "text-red-400"} border-l-2 ${isAccessible ? "border-red-300" : "border-red-500"} pl-2`}>
                            <strong>Feminist Critique:</strong> {party.critique}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          </>
        )}

        {/* Cookie Poisoning Section */}
        {analysisData && (
          <Card className={`mb-8 ${isAccessible ? "bg-white border-gray-200" : "bg-gray-900 border-purple-500 pixel-border sparkle"}`}>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${isAccessible ? "text-gray-900" : "text-purple-400 glitch-text"}`}>
                <Zap className="w-6 h-6" />
                Real-Time Digital Disruption Spell
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className={`${isAccessible ? "text-gray-600" : "text-purple-200"}`}>
                  Choose your digital persona to begin continuous surveillance disruption. Each identity uses specialized scrambling techniques to confuse algorithmic profiling.
                </p>
                
                {/* Persona Selection Game Interface */}
                {!isSpellActive && !isPoisoning && (
                  <div className="space-y-4">
                    <h4 className={`text-lg font-semibold ${isAccessible ? "text-gray-900" : "text-purple-300"}`}>
                      🎭 Choose Your Digital Resistance Identity:
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Octopus Persona */}
                      <div 
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          isAccessible 
                            ? "border-blue-200 hover:border-blue-400 bg-blue-50 hover:bg-blue-100" 
                            : "border-blue-500/30 hover:border-blue-400 bg-blue-500/10 hover:bg-blue-500/20"
                        }`}
                        onClick={() => executePoison('octopus')}
                      >
                        <div className="text-center">
                          <div className="text-4xl mb-2">🐙</div>
                          <h5 className={`font-semibold mb-2 ${isAccessible ? "text-blue-900" : "text-blue-400"}`}>
                            Sentient Octopus
                          </h5>
                          <p className={`text-xs ${isAccessible ? "text-blue-700" : "text-blue-300"}`}>
                            Living off the coast of British Columbia. Loves caviar, rare books, and puzzles. 
                            Multi-tentacled browsing patterns with deep-sea wisdom.
                          </p>
                          <div className={`mt-2 text-xs ${isAccessible ? "text-blue-600" : "text-blue-400"}`}>
                            <strong>Specializes in:</strong> Complex puzzle-solving patterns, underwater IP addresses, tentacle-based canvas signatures
                          </div>
                        </div>
                      </div>

                      {/* Euridice Persona */}
                      <div 
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          isAccessible 
                            ? "border-green-200 hover:border-green-400 bg-green-50 hover:bg-green-100" 
                            : "border-green-500/30 hover:border-green-400 bg-green-500/10 hover:bg-green-500/20"
                        }`}
                        onClick={() => executePoison('euridice')}
                      >
                        <div className="text-center">
                          <div className="text-4xl mb-2">🌿</div>
                          <h5 className={`font-semibold mb-2 ${isAccessible ? "text-green-900" : "text-green-400"}`}>
                            Greek Folk Hero Euridice
                          </h5>
                          <p className={`text-xs ${isAccessible ? "text-green-700" : "text-green-300"}`}>
                            Lives in a plant-filled apartment overlooking the Aegean Sea. 
                            Collects myths, rare books, and wild herbs. Thoughtful, elusive, intentional.
                          </p>
                          <div className={`mt-2 text-xs ${isAccessible ? "text-green-600" : "text-green-400"}`}>
                            <strong>Specializes in:</strong> Privacy-focused browsing, mythology research patterns, herbal wisdom signatures
                          </div>
                        </div>
                      </div>

                      {/* Replicant Persona */}
                      <div 
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          isAccessible 
                            ? "border-purple-200 hover:border-purple-400 bg-purple-50 hover:bg-purple-100" 
                            : "border-purple-500/30 hover:border-purple-400 bg-purple-500/10 hover:bg-purple-500/20"
                        }`}
                        onClick={() => executePoison('replicant')}
                      >
                        <div className="text-center">
                          <div className="text-4xl mb-2">🤖</div>
                          <h5 className={`font-semibold mb-2 ${isAccessible ? "text-purple-900" : "text-purple-400"}`}>
                            Bladerunner Replicant
                          </h5>
                          <p className={`text-xs ${isAccessible ? "text-purple-700" : "text-purple-300"}`}>
                            Advanced synthetic being with enhanced capabilities and complex memories. 
                            Precise, calculated, with ultra-high definition digital processing.
                          </p>
                          <div className={`mt-2 text-xs ${isAccessible ? "text-purple-600" : "text-purple-400"}`}>
                            <strong>Specializes in:</strong> Enhanced precision patterns, synthetic signatures, off-world data streams
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Detailed Transparency Section */}
                <div className={`p-4 rounded-lg ${isAccessible ? "bg-yellow-50 border border-yellow-200" : "bg-purple-500/10 border border-purple-500/30"}`}>
                  <h4 className={`text-sm font-semibold mb-3 ${isAccessible ? "text-yellow-900" : "text-purple-300"}`}>
                    🔮 Transparency: What This Spell Actually Does
                  </h4>
                  <div className={`text-xs space-y-2 ${isAccessible ? "text-yellow-800" : "text-purple-200"}`}>
                    <div>
                      <strong>🎨 Canvas Fingerprint Scrambling:</strong> Injects dynamic noise into your browser's canvas rendering every 2-5 seconds, making your graphics hardware signature constantly change. Tracking systems that rely on canvas fingerprinting will receive different data each time.
                    </div>
                    <div>
                      <strong>🌐 WebRTC IP Obfuscation:</strong> Continuously rotates fake local and public IP addresses in WebRTC connections, preventing location-based tracking. Your real IP remains protected while trackers receive false location data.
                    </div>
                    <div>
                      <strong>🔊 Audio Context Disruption:</strong> Adds random distortion to audio processing signatures every 3-8 seconds, scrambling the unique "acoustic fingerprint" of your device's audio hardware.
                    </div>
                    <div>
                      <strong>📝 Font Enumeration Spoofing:</strong> Dynamically reports fake font lists to prevent cultural/professional profiling. Rotates between different fake font collections to confuse behavioral analysis.
                    </div>
                    <div>
                      <strong>📱 Screen Resolution Chaos:</strong> Reports randomized screen dimensions and device pixel ratios, preventing device tracking through display characteristics.
                    </div>
                    <div>
                      <strong>🍪 Dynamic Cookie Poisoning:</strong> Continuously overwrites tracking cookies with false data every 10-30 seconds, injecting persona-specific interests and fake behavioral patterns into surveillance databases.
                    </div>
                    <div>
                      <strong>🖱️ Behavioral Pattern Disruption:</strong> Generates subtle fake mouse movements, scroll patterns, and timing signatures based on your chosen persona to confuse behavioral analysis algorithms.
                    </div>
                    <div>
                      <strong>🌊 Network Traffic Obfuscation:</strong> Creates background requests to benign endpoints with fake headers and persona-specific timing patterns, making your real browsing behavior harder to isolate.
                    </div>
                    <div>
                      <strong>🎭 Real-Time Identity Rotation:</strong> Continuously cycles through different combinations of user agent strings, language preferences, and timezone data specific to your chosen persona to prevent persistent identity formation.
                    </div>
                  </div>
                  <div className={`mt-3 p-2 rounded ${isAccessible ? "bg-yellow-100" : "bg-purple-600/20"}`}>
                    <p className={`text-xs font-semibold ${isAccessible ? "text-yellow-900" : "text-purple-300"}`}>
                      ⚡ <strong>Active Resistance:</strong> Unlike privacy tools that simply block tracking, this spell actively feeds false information to surveillance systems, creating "glitches" in their data collection that align with glitch feminist principles of technological disruption.
                    </p>
                  </div>
                  <div className={`mt-2 p-2 rounded ${isAccessible ? "bg-red-50 border border-red-200" : "bg-red-500/10 border border-red-500/30"}`}>
                    <p className={`text-xs ${isAccessible ? "text-red-800" : "text-red-300"}`}>
                      ⚠️ <strong>Environmental Impact:</strong> This spell runs continuously in your browser, consuming ~0.02-0.05g CO₂ per hour through processing power. The cost of resistance is made visible to enable conscious choice.
                    </p>
                  </div>
                </div>
                
                {/* Real-time spell status */}
                {isSpellActive && (
                  <div className={`p-3 rounded-lg ${isAccessible ? "bg-green-50 border border-green-200" : "bg-green-500/10 border border-green-500/30"}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`text-sm font-semibold ${isAccessible ? "text-green-900" : "text-green-400"}`}>
                          ⚡ Real-Time Disruption Active
                        </p>
                        <p className={`text-xs ${isAccessible ? "text-green-700" : "text-green-300"}`}>
                          {selectedPersona && `Active as ${selectedPersona === 'octopus' ? '🐙 Sentient Octopus' : 
                            selectedPersona === 'euridice' ? '🌿 Greek Folk Hero Euridice' : 
                            '🤖 Bladerunner Replicant'} - 9 scrambling techniques running continuously`}
                        </p>
                      </div>
                      <Button
                        onClick={stopDisruptionSpell}
                        variant="outline"
                        size="sm"
                        className={`${isAccessible ? "border-green-300 text-green-700 hover:bg-green-100" : "border-green-500 text-green-400 hover:bg-green-500/20"}`}
                      >
                        Dispel Spell
                      </Button>
                    </div>
                  </div>
                )}

                {/* Spell activation controls */}
                {!isSpellActive && isPoisoning && (
                  <div className="space-y-2">
                    <Progress 
                      value={poisonProgress} 
                      className={`h-3 ${isAccessible ? "" : "pixel-border"}`}
                    />
                    <p className={`text-sm ${isAccessible ? "text-gray-600" : "text-purple-300 glitch-text"}`}>
                      Casting {selectedPersona === 'octopus' ? '🐙 Octopus' : 
                        selectedPersona === 'euridice' ? '🌿 Euridice' : 
                        '🤖 Replicant'} disruption spell... {poisonProgress}%
                    </p>
                  </div>
                )}

                {/* Alternative spell dispel button */}
                {isSpellActive && (
                  <div className="text-center">
                    <Button
                      onClick={stopDisruptionSpell}
                      variant="outline"
                      size="lg"
                      className={`${isAccessible ? "border-red-300 text-red-700 hover:bg-red-100" : "border-red-500 text-red-400 hover:bg-red-500/20"}`}
                    >
                      🌙 Dispel {selectedPersona === 'octopus' ? 'Octopus' : 
                        selectedPersona === 'euridice' ? 'Euridice' : 
                        'Replicant'} Spell
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Educational Footer */}
        <div className={`text-center mt-12 p-6 rounded-lg ${isAccessible ? "bg-gray-100 text-gray-800" : "bg-gray-900/50 text-cyan-300 glitch-bg"}`}>
          <h3 className={`text-2xl font-bold mb-4 ${isAccessible ? "" : "glitch-text"}`}>
            Defamiliarizing the Digital
          </h3>
          <p className={`max-w-3xl mx-auto ${isAccessible ? "text-gray-600" : "text-cyan-200"} mb-4`}>
            <em>Euridice</em> is a research-creation project grounded in feminist technoscience and design justice principles. 
            This digital spellbook reveals the hidden mechanisms that track, profile, and commodify your online existence—making 
            resistance more joyful and strange.
          </p>
          <p className={`max-w-2xl mx-auto text-sm ${isAccessible ? "text-gray-500" : "text-purple-300"} italic`}>
            "Flow cannot be understood without interruption, nor function without glitching. This is why glitch studies is necessary." 
            — Rosa Menkman, Glitch Studies Manifesto
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyAnalyzer;