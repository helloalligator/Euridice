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
      toast({
        title: "Analysis Complete",
        description: "Privacy violations detected and catalogued",
        className: isAccessible ? "" : "glitch-text"
      });
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
            title: "🧙‍♀️ Poisoning Ritual Complete",
            description: "Your digital fingerprint has been scrambled. Trackers confused.",
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
              Target Website Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input
                placeholder="https://example.com - Enter the website you're browsing"
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
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4 mr-2" />
                    Expose Tracking
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
                      Fingerprinting
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className={`text-3xl font-bold ${isAccessible ? "text-cyan-600" : "text-cyan-400"}`}>
                      {analysisData.fingerprintingScore}%
                    </div>
                    <p className={`text-sm mt-2 ${isAccessible ? "text-gray-600" : "text-gray-400"}`}>
                      Identity exposure risk
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Privacy Violations Alert */}
              <Alert className={`mt-6 ${isAccessible ? "border-orange-200 bg-orange-50" : "border-yellow-500 bg-yellow-500/10 pixel-border"}`}>
                <AlertTriangle className={`h-4 w-4 ${isAccessible ? "text-orange-600" : "text-yellow-400"}`} />
                <AlertDescription className={isAccessible ? "text-orange-800" : "text-yellow-200"}>
                  <strong>Web 2.0 Surveillance Detected:</strong> This website is actively profiling your digital behavior. 
                  Your browsing experience is not neutral - you are the product being sold to advertisers.
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
                          <Badge variant={cookie.type === 'tracking' ? 'destructive' : 'secondary'}>
                            {cookie.type}
                          </Badge>
                        </div>
                        <p className={`text-sm ${isAccessible ? "text-gray-600" : "text-gray-400"}`}>
                          {cookie.purpose}
                        </p>
                        <p className={`text-xs mt-1 ${isAccessible ? "text-gray-500" : "text-gray-500"}`}>
                          Domain: {cookie.domain} • Expires: {cookie.expiry}
                        </p>
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
                        <p className={`text-sm ${isAccessible ? "text-gray-600" : "text-gray-400"}`}>
                          {method.description}
                        </p>
                        {method.detected && (
                          <p className={`text-xs mt-2 ${isAccessible ? "text-red-600" : "text-red-400"}`}>
                            ⚠️ Your {method.dataCollected} is being harvested
                          </p>
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
                Cookie Poisoning Ritual
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className={`${isAccessible ? "text-gray-600" : "text-purple-200"}`}>
                  Scramble your digital fingerprint and inject noise into tracking systems. 
                  This will confuse advertisers and make your data profile unreliable.
                </p>
                
                {isPoisoning && (
                  <div className="space-y-2">
                    <Progress 
                      value={poisonProgress} 
                      className={`h-3 ${isAccessible ? "" : "pixel-border"}`}
                    />
                    <p className={`text-sm ${isAccessible ? "text-gray-600" : "text-purple-300 glitch-text"}`}>
                      Injecting chaos into surveillance systems... {poisonProgress}%
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
                      Casting Digital Chaos...
                    </>
                  ) : (
                    <>
                      <Shield className="w-5 h-5 mr-2" />
                      Execute Poisoning Ritual
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
            The Web is Watching You
          </h3>
          <p className={`max-w-3xl mx-auto ${isAccessible ? "text-gray-600" : "text-cyan-200"}`}>
            Your digital experience is not neutral. Every click, scroll, and pause is catalogued by 
            the technocratic surveillance apparatus of Web 2.0. This tool exposes the invisible 
            mechanisms that track, profile, and commodify your online existence. Knowledge is resistance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyAnalyzer;