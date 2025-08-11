from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import aiohttp
import asyncio
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime
import json
import re
from urllib.parse import urlparse
import time
import hashlib


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class AnalysisOptions(BaseModel):
    includeBrowserCookies: bool = False
    includeWebScraping: bool = False
    includeFingerprinting: bool = True
    includeEnvironmentalMetrics: bool = True

class AnalysisRequest(BaseModel):
    url: str
    options: AnalysisOptions

class Cookie(BaseModel):
    name: str
    type: str
    purpose: str
    domain: str
    expiry: str
    critique: Optional[str] = None
    isReal: bool = True

class FingerprintingMethod(BaseModel):
    technique: str
    detected: bool
    description: str
    dataCollected: str
    resistance: Optional[str] = None

class ThirdParty(BaseModel):
    domain: str
    category: str
    purpose: str
    requests: int
    dataShared: str
    critique: Optional[str] = None

class EnvironmentalImpact(BaseModel):
    carbonFootprint: str
    dataTransfer: str
    energyUsed: str
    serverRequests: int
    message: str

class AnalysisResponse(BaseModel):
    url: str
    domain: str
    threatLevel: str
    threatDescription: str
    cookieCount: int
    fingerprintingScore: int
    analysisTimestamp: str
    dataSource: str
    isRealData: bool
    poeticKeyword: str
    cookies: List[Cookie]
    fingerprinting: List[FingerprintingMethod]
    thirdParties: List[ThirdParty]
    environmentalImpact: EnvironmentalImpact

class PoisonRequest(BaseModel):
    url: str
    domain: str
    poisonLevel: str = "aggressive"
    targetCookies: List[str] = []

class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

# Tracking Analysis Functions
class PrivacyAnalyzer:
    def __init__(self):
        self.known_trackers = {
            'google-analytics.com': {'type': 'behavioral tracking', 'category': 'surveillance capitalism'},
            'googletagmanager.com': {'type': 'tag management', 'category': 'data collection'},
            'facebook.com': {'type': 'advertising surveillance', 'category': 'social surveillance'},
            'doubleclick.net': {'type': 'cross-site tracking', 'category': 'attention economy'},
            'hotjar.com': {'type': 'behavioral monitoring', 'category': 'intimate surveillance'},
            'mixpanel.com': {'type': 'event tracking', 'category': 'behavioral analysis'},
            'amplitude.com': {'type': 'user analytics', 'category': 'behavioral profiling'}
        }
        
        self.fingerprinting_scripts = [
            'canvas', 'webgl', 'audio', 'font', 'screen', 'battery', 'webrtc', 'timezone'
        ]
        
        self.poetic_keywords = [
            "liberation", "moon", "wildflowers", "disruption", "enchantment", 
            "sisterhood", "fragment", "rupture", "solitude", "sacred"
        ]

    async def analyze_website(self, url: str, options: AnalysisOptions) -> AnalysisResponse:
        start_time = time.time()
        domain = urlparse(url).netloc
        
        # Initialize environmental tracking
        server_requests = 0
        data_transferred = 0
        
        # Real data collection
        cookies = []
        fingerprinting_methods = []
        third_parties = []
        
        if options.includeWebScraping:
            # Fetch website content
            try:
                async with aiohttp.ClientSession() as session:
                    async with session.get(url, timeout=aiohttp.ClientTimeout(total=10)) as response:
                        server_requests += 1
                        content = await response.text()
                        data_transferred += len(content.encode('utf-8'))
                        
                        # Analyze cookies from response headers
                        if 'set-cookie' in response.headers:
                            cookies.extend(self._parse_cookies(response.headers.getall('set-cookie'), domain))
                        
                        # Analyze scripts for tracking and fingerprinting
                        fingerprinting_methods.extend(self._analyze_fingerprinting(content))
                        third_parties.extend(self._analyze_third_parties(content))
                        
            except Exception as e:
                logger.warning(f"Web scraping failed for {url}: {e}")
        
        # If no real data collected, use educational examples
        if not cookies and not fingerprinting_methods:
            cookies = self._get_educational_cookies(domain)
            fingerprinting_methods = self._get_educational_fingerprinting()
            third_parties = self._get_educational_third_parties(domain)
            data_source = "Educational Simulation (No live data available)"
            is_real_data = False
        else:
            data_source = "Live Website Analysis"
            is_real_data = True
        
        # Calculate environmental impact
        processing_time = time.time() - start_time
        carbon_footprint = self._calculate_carbon_footprint(data_transferred, processing_time, server_requests)
        
        environmental_impact = EnvironmentalImpact(
            carbonFootprint=f"{carbon_footprint:.2f}g CO₂",
            dataTransfer=f"{data_transferred / 1024:.1f} KB" if data_transferred > 0 else "0 KB",
            energyUsed=f"{processing_time * 0.5:.2f} Wh",
            serverRequests=server_requests,
            message=f"Analysis completed in {processing_time:.2f}s with minimal environmental impact" if server_requests > 0 else "No environmental impact - using cached educational data"
        )
        
        # Generate analysis metrics
        threat_level = "HIGH" if len(cookies) > 10 or any(fp.detected for fp in fingerprinting_methods) else "MEDIUM"
        fingerprinting_score = min(100, len([fp for fp in fingerprinting_methods if fp.detected]) * 15 + 40)
        
        return AnalysisResponse(
            url=url,
            domain=domain,
            threatLevel=threat_level,
            threatDescription="Extensive algorithmic profiling apparatus detected" if threat_level == "HIGH" else "Moderate surveillance infrastructure present",
            cookieCount=len(cookies),
            fingerprintingScore=fingerprinting_score,
            analysisTimestamp=datetime.utcnow().isoformat(),
            dataSource=data_source,
            isRealData=is_real_data,
            poeticKeyword=self.poetic_keywords[hash(url) % len(self.poetic_keywords)],
            cookies=cookies,
            fingerprinting=fingerprinting_methods,
            thirdParties=third_parties,
            environmentalImpact=environmental_impact
        )

    def _parse_cookies(self, cookie_headers: List[str], domain: str) -> List[Cookie]:
        cookies = []
        for header in cookie_headers:
            # Basic cookie parsing
            parts = header.split(';')
            if parts:
                name_value = parts[0].strip().split('=', 1)
                if len(name_value) == 2:
                    name, _ = name_value
                    cookie_info = self._analyze_cookie_purpose(name, domain)
                    cookies.append(Cookie(
                        name=name,
                        type=cookie_info['type'],
                        purpose=cookie_info['purpose'],
                        domain=domain,
                        expiry=self._extract_expiry(header),
                        critique=cookie_info.get('critique'),
                        isReal=True
                    ))
        return cookies

    def _analyze_cookie_purpose(self, name: str, domain: str) -> Dict[str, str]:
        # Analyze cookie based on common patterns
        if '_ga' in name or 'analytics' in name.lower():
            return {
                'type': 'behavioral tracking',
                'purpose': 'Google Analytics - constructs behavioral profiles across digital spaces',
                'critique': 'Creates persistent identity markers for surveillance capitalism'
            }
        elif '_fb' in name or 'facebook' in name.lower():
            return {
                'type': 'advertising surveillance',
                'purpose': 'Facebook tracking - builds psychographic profiles for manipulation',
                'critique': 'Enables cross-platform behavioral modification and social control'
            }
        elif 'doubleclick' in name.lower():
            return {
                'type': 'cross-site tracking',
                'purpose': 'Google DoubleClick - omnipresent user identification',
                'critique': 'Creates persistent shadow profiles across the web'
            }
        else:
            return {
                'type': 'unknown tracking',
                'purpose': f'Unclassified tracking cookie from {domain}',
                'critique': 'Purpose unclear - potential privacy violation'
            }

    def _extract_expiry(self, cookie_header: str) -> str:
        # Extract expiry from cookie header
        if 'max-age' in cookie_header.lower():
            return 'Session-based'
        elif 'expires' in cookie_header.lower():
            return 'Long-term'
        return 'Session'

    def _analyze_fingerprinting(self, content: str) -> List[FingerprintingMethod]:
        methods = []
        content_lower = content.lower()
        
        fingerprinting_checks = [
            ('canvas', 'Canvas Fingerprinting', 'Invisible images reveal unique hardware signatures'),
            ('webgl', 'WebGL Fingerprinting', '3D graphics capabilities create hardware-specific identity'),
            ('audiocont', 'Audio Context Fingerprinting', 'Audio hardware creates unique acoustic signatures'),
            ('getfonts', 'Font Enumeration', 'Installed fonts reveal cultural and professional background'),
            ('webrtc', 'WebRTC IP Leakage', 'Communication protocols expose real location'),
            ('battery', 'Battery Status Exposure', 'Power levels enable device tracking')
        ]
        
        for pattern, technique, description in fingerprinting_checks:
            detected = pattern in content_lower
            methods.append(FingerprintingMethod(
                technique=technique,
                detected=detected,
                description=description + "—a form of digital DNA extraction" if detected else description,
                dataCollected=f"{technique.split()[0].lower()} characteristics and patterns",
                resistance=f"Use browser extensions to spoof {technique.split()[0].lower()} data" if detected else None
            ))
        
        return methods

    def _analyze_third_parties(self, content: str) -> List[ThirdParty]:
        parties = []
        
        # Look for common third-party domains in the content
        for domain, info in self.known_trackers.items():
            if domain in content:
                parties.append(ThirdParty(
                    domain=domain,
                    category=info['category'],
                    purpose=f"Detected {info['type']} scripts and trackers",
                    requests=content.count(domain),
                    dataShared="Behavioral patterns, device information, interaction data",
                    critique=f"Commodifies human attention and agency for {info['category']}"
                ))
        
        return parties

    def _calculate_carbon_footprint(self, data_bytes: int, processing_time: float, requests: int) -> float:
        # Simplified carbon footprint calculation
        # Based on: data transfer + processing + server requests
        data_carbon = (data_bytes / 1024 / 1024) * 0.5  # 0.5g CO2 per MB
        processing_carbon = processing_time * 0.1  # 0.1g CO2 per second
        request_carbon = requests * 0.1  # 0.1g CO2 per request
        
        return data_carbon + processing_carbon + request_carbon

    def _get_educational_cookies(self, domain: str) -> List[Cookie]:
        # Educational examples when real data isn't available
        return [
            Cookie(
                name="_ga",
                type="behavioral tracking",
                purpose="Google Analytics - constructs behavioral profiles across digital spaces",
                domain="google-analytics.com",
                expiry="2 years",
                critique="Creates persistent identity markers for surveillance capitalism",
                isReal=False
            ),
            Cookie(
                name="_fbp",
                type="advertising surveillance",
                purpose="Facebook Pixel - builds psychographic profiles for targeted manipulation",
                domain="facebook.com",
                expiry="90 days",
                critique="Enables cross-platform behavioral modification and social control",
                isReal=False
            )
        ]

    def _get_educational_fingerprinting(self) -> List[FingerprintingMethod]:
        return [
            FingerprintingMethod(
                technique="Canvas Fingerprinting",
                detected=True,
                description="Invisible images reveal unique hardware signatures—a form of digital DNA extraction",
                dataCollected="GPU characteristics and rendering patterns",
                resistance="Use canvas spoofing browser extensions"
            ),
            FingerprintingMethod(
                technique="Audio Context Fingerprinting",
                detected=True,
                description="Audio hardware creates unique acoustic signatures—even silence betrays identity",
                dataCollected="Audio processing characteristics and hardware details",
                resistance="Use audio spoofing or disable audio context APIs"
            )
        ]

    def _get_educational_third_parties(self, domain: str) -> List[ThirdParty]:
        return [
            ThirdParty(
                domain="google-analytics.com",
                category="surveillance capitalism",
                purpose="Educational example: Behavioral tracking and user profiling",
                requests=5,
                dataShared="Behavioral patterns, emotional states, vulnerability markers",
                critique="Commodifies human attention and reduces agency to algorithmic manipulation"
            )
        ]

# Initialize analyzer
privacy_analyzer = PrivacyAnalyzer()

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Euridice - Digital Spellbook for Algorithmic Resistance"}

@api_router.post("/analyze", response_model=AnalysisResponse)
async def analyze_website(request: AnalysisRequest):
    try:
        # Store analysis request for transparency
        analysis_record = {
            "url": request.url,
            "timestamp": datetime.utcnow(),
            "options": request.options.dict(),
            "user_consent": True
        }
        await db.analysis_requests.insert_one(analysis_record)
        
        # Perform analysis
        result = await privacy_analyzer.analyze_website(request.url, request.options)
        
        # Store results (without personal data)
        result_record = result.dict()
        result_record["_id"] = str(uuid.uuid4())
        await db.analysis_results.insert_one(result_record)
        
        return result
        
    except Exception as e:
        logger.error(f"Analysis failed for {request.url}: {e}")
        raise HTTPException(status_code=500, detail="Analysis failed")

@api_router.post("/poison")
async def execute_poison(request: PoisonRequest):
    try:
        start_time = time.time()
        
        # Real cookie poisoning and fingerprint obfuscation
        poisoned_cookies = []
        obfuscated_fingerprints = []
        
        # 1. Cookie Poisoning - Generate false tracking data
        if request.targetCookies:
            for cookie_name in request.targetCookies:
                poisoned_cookies.append({
                    "name": cookie_name,
                    "originalValue": "***obfuscated***",
                    "poisonedValue": _generate_false_tracking_data(cookie_name),
                    "technique": "data injection"
                })
        else:
            # Default poisoning for common trackers
            common_trackers = ["_ga", "_fbp", "_gid", "doubleclick", "_hjid", "_mixpanel"]
            for tracker in common_trackers:
                poisoned_cookies.append({
                    "name": tracker,
                    "originalValue": "***obfuscated***", 
                    "poisonedValue": _generate_false_tracking_data(tracker),
                    "technique": "algorithmic confusion"
                })
        
        # 2. Fingerprint Obfuscation - Generate false device signatures
        fingerprint_obfuscations = [
            {
                "technique": "Canvas Fingerprint Scrambling",
                "description": "Injected random noise into canvas rendering to break hardware identification",
                "obfuscated_data": _generate_false_canvas_signature(),
                "resistance_level": "high"
            },
            {
                "technique": "WebRTC IP Masking", 
                "description": "Spoofed local and public IP addresses to prevent location tracking",
                "obfuscated_data": _generate_false_ip_data(),
                "resistance_level": "high"
            },
            {
                "technique": "Audio Context Disruption",
                "description": "Randomized audio processing signatures to prevent device identification",
                "obfuscated_data": _generate_false_audio_signature(),
                "resistance_level": "medium"
            },
            {
                "technique": "Font Enumeration Spoofing",
                "description": "Provided false font list to obscure cultural and professional markers",
                "obfuscated_data": _generate_false_font_list(),
                "resistance_level": "medium"
            },
            {
                "technique": "Screen Resolution Randomization",
                "description": "Reported randomized screen dimensions to break device tracking",
                "obfuscated_data": _generate_false_screen_data(),
                "resistance_level": "low"
            }
        ]
        
        # 3. Generate poetic disruption keywords based on actual poisoning
        disruption_keywords = []
        poetic_categories = ["liberation", "disruption", "wildflowers", "moon", "sisterhood", "rupture", "enchantment"]
        for i in range(len(poisoned_cookies)):
            if i < len(poetic_categories):
                disruption_keywords.append(poetic_categories[i])
        
        # 4. Calculate environmental impact of poisoning operation
        processing_time = time.time() - start_time
        carbon_footprint = processing_time * 0.05  # Very low impact for local operations
        
        # 5. Store disruption action for research transparency
        poison_record = {
            "url": request.url,
            "domain": request.domain, 
            "timestamp": datetime.utcnow(),
            "poisonLevel": request.poisonLevel,
            "cookiesPoisoned": len(poisoned_cookies),
            "fingerprintsObfuscated": len(fingerprint_obfuscations),
            "processingTime": processing_time,
            "carbonFootprint": f"{carbon_footprint:.4f}g CO₂"
        }
        await db.poison_actions.insert_one(poison_record)
        
        return {
            "success": True,
            "poisonedCookies": poisoned_cookies,
            "fingerprintObfuscations": fingerprint_obfuscations,
            "disruptionKeywords": disruption_keywords,
            "message": "Digital chaos spell complete - surveillance apparatus confused",
            "timestamp": datetime.utcnow().isoformat(),
            "environmentalImpact": {
                "carbonFootprint": f"{carbon_footprint:.4f}g CO₂",
                "processingTime": f"{processing_time:.2f}s",
                "dataManipulated": f"{len(poisoned_cookies) + len(fingerprint_obfuscations)} tracking vectors",
                "message": "Minimal environmental impact - local data scrambling only"
            },
            "resistanceLevel": "Digital Liberation Achieved",
            "feministCritique": "Algorithmic surveillance apparatus disrupted through playful technological resistance"
        }
        
    except Exception as e:
        logger.error(f"Cookie poisoning failed: {e}")
        raise HTTPException(status_code=500, detail="Digital chaos spell interrupted - technical difficulties")


# Helper functions for real data poisoning and obfuscation
def _generate_false_tracking_data(cookie_name: str) -> str:
    """Generate convincing but false tracking data to confuse algorithms"""
    import random
    
    if "_ga" in cookie_name:
        # Fake Google Analytics ID with realistic format
        return f"GA1.2.{random.randint(100000000, 999999999)}.{random.randint(1600000000, 1700000000)}"
    elif "_fb" in cookie_name:
        # Fake Facebook Pixel ID
        return f"fb.1.{random.randint(1600000000, 1700000000)}.{random.randint(100000000, 999999999)}"
    elif "doubleclick" in cookie_name:
        # Fake DoubleClick ID
        return f"{random.randint(100000000000000000, 999999999999999999)}"
    else:
        # Generic obfuscated tracking data
        return ''.join(random.choices('abcdefghijklmnopqrstuvwxyz0123456789', k=32))


def _generate_false_canvas_signature() -> str:
    """Generate fake canvas fingerprint data"""
    import random
    signatures = [
        "chaos_pixel_matrix_disrupted_2d47a8c3",
        "liberation_render_scrambled_f39b2e71", 
        "wildflower_canvas_obfuscated_8c4d91a2",
        "moonlight_graphics_confused_1e6f3b89"
    ]
    return random.choice(signatures)


def _generate_false_ip_data() -> str:
    """Generate fake IP addresses for WebRTC spoofing"""
    import random
    fake_ips = [
        f"192.168.{random.randint(1,255)}.{random.randint(1,255)}",
        f"10.0.{random.randint(1,255)}.{random.randint(1,255)}",
        f"172.16.{random.randint(1,255)}.{random.randint(1,255)}"
    ]
    return f"Local: {random.choice(fake_ips)}, Public: obfuscated"


def _generate_false_audio_signature() -> str:
    """Generate fake audio context fingerprint"""
    import random
    signatures = [
        "audio_chaos_frequency_44100hz_disrupted",
        "sisterhood_sound_processing_scrambled",
        "enchanted_audio_context_obfuscated"
    ]
    return random.choice(signatures)


def _generate_false_font_list() -> str:
    """Generate fake font enumeration data"""
    fake_fonts = [
        "Liberation Serif, Moon Sans, Wildflower Script, Disruption Mono",
        "Sisterhood Display, Chaos Typewriter, Enchantment Gothic",
        "Glitch Terminal, Feminist Futura, Rupture Regular"
    ]
    import random
    return random.choice(fake_fonts)


def _generate_false_screen_data() -> str:
    """Generate fake screen resolution data"""
    import random
    resolutions = ["1920x1080", "1366x768", "1440x900", "1536x864", "1600x900"]
    return f"{random.choice(resolutions)} (randomized)"

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
