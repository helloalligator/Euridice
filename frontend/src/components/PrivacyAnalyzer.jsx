import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Alert, AlertDescription } from "./ui/alert";
import { useToast } from "../hooks/use-toast";
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
  Target
} from "lucide-react";
import mockData from "../utils/mockData";

const PrivacyAnalyzer = () => {
  const [url, setUrl] = useState("");
  const [isAccessible, setIsAccessible] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [poisonProgress, setPoisonProgress] = useState(0);
  const [isPoisoning, setIsPoisoning] = useState(false);
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

    setIsAnalyzing(true);
    // Simulate analysis with mock data
    setTimeout(() => {
      setAnalysisData(mockData.getAnalysisData(url));
      setIsAnalyzing(false);
    }, 2000);
  };

  const executePoison = async () => {
    setIsPoisoning(true);
    setPoisonProgress(0);
    
    const interval = setInterval(() => {
      setPoisonProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsPoisoning(false);
          toast({
            title: "🌙 Digital Chaos Spell Complete",
            description: "Your algorithmic shadow has been scrambled. The surveillance spirits are confused.",
            className: isAccessible ? "" : "glitch-text sparkle"
          });
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

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
          <Tabs defaultValue="overview" className="mb-8">
            <TabsList className={`grid w-full grid-cols-4 ${isAccessible ? "bg-gray-100" : "bg-gray-800 pixel-border"}`}>
              <TabsTrigger value="overview" className={isAccessible ? "" : "text-cyan-400"}>
                Overview
              </TabsTrigger>
              <TabsTrigger value="cookies" className={isAccessible ? "" : "text-pink-400"}>
                Cookies
              </TabsTrigger>
              <TabsTrigger value="fingerprinting" className={isAccessible ? "" : "text-yellow-400"}>
                Fingerprinting
              </TabsTrigger>
              <TabsTrigger value="network" className={isAccessible ? "" : "text-green-400"}>
                Network
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
                    <div className={`text-3xl font-bold ${isAccessible ? "text-red-600" : "text-red-400 glitch-text"}`}>
                      {analysisData.threatLevel}
                    </div>
                    <p className={`text-sm mt-2 ${isAccessible ? "text-gray-600" : "text-gray-400"}`}>
                      {analysisData.threatDescription}
                    </p>
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
                      {analysisData.fingerprintingScore}%
                    </div>
                    <p className={`text-sm mt-2 ${isAccessible ? "text-gray-600" : "text-gray-400"}`}>
                      Identity extraction vulnerability
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
                    Cookie Analysis
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
                    Digital Fingerprinting Detection
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
                    Third-Party Connections
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
                          <Badge variant={party.category === 'advertising' ? 'destructive' : 'secondary'}>
                            {party.category}
                          </Badge>
                        </div>
                        <p className={`text-sm ${isAccessible ? "text-gray-600" : "text-gray-400"}`}>
                          {party.purpose}
                        </p>
                        <p className={`text-xs mt-1 ${isAccessible ? "text-gray-500" : "text-gray-500"}`}>
                          Requests: {party.requests} • Data shared: {party.dataShared}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}

        {/* Cookie Poisoning Section */}
        {analysisData && (
          <Card className={`mb-8 ${isAccessible ? "bg-white border-gray-200" : "bg-gray-900 border-purple-500 pixel-border sparkle"}`}>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${isAccessible ? "text-gray-900" : "text-purple-400 glitch-text"}`}>
                <Zap className="w-6 h-6" />
                Poetic Disruption Spell
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className={`${isAccessible ? "text-gray-600" : "text-purple-200"}`}>
                  Inject poetic keywords and noise into algorithmic profiling systems. 
                  This hybrid analog-digital intervention confuses surveillance apparatuses and defamiliarizes your web experience through playful resistance.
                </p>
                
                {isPoisoning && (
                  <div className="space-y-2">
                    <Progress 
                      value={poisonProgress} 
                      className={`h-3 ${isAccessible ? "" : "pixel-border"}`}
                    />
                    <p className={`text-sm ${isAccessible ? "text-gray-600" : "text-purple-300 glitch-text"}`}>
                      Weaving digital chaos into surveillance networks... {poisonProgress}%
                    </p>
                  </div>
                )}

                <Button 
                  onClick={executePoison}
                  disabled={isPoisoning}
                  className={`w-full ${isAccessible ? "bg-purple-600 hover:bg-purple-700" : "bg-purple-600 hover:bg-purple-700 sparkle glitch-text"}`}
                  size="lg"
                >
                  {isPoisoning ? (
                    <>
                      <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                      Casting Poetic Disruption...
                    </>
                  ) : (
                    <>
                      <Shield className="w-5 h-5 mr-2" />
                      Execute Disruption Spell
                    </>
                  )}
                </Button>
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