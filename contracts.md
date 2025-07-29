# Euridice Privacy Analyzer Contracts

## API Contracts

### 1. Real-Time Analysis Endpoint
**POST /api/analyze**
```json
{
  "url": "https://example.com",
  "options": {
    "includeBrowserCookies": false,
    "includeWebScraping": true,
    "includeFingerprinting": true,
    "includeEnvironmentalMetrics": true
  }
}
```

**Response:**
```json
{
  "url": "https://example.com",
  "domain": "example.com", 
  "threatLevel": "HIGH",
  "threatDescription": "Extensive algorithmic profiling apparatus detected",
  "cookieCount": 34,
  "fingerprintingScore": 78,
  "analysisTimestamp": "2025-01-27T...",
  "dataSource": "Live Website Analysis",
  "isRealData": true,
  "poeticKeyword": "liberation",
  "cookies": [...],
  "fingerprinting": [...], 
  "thirdParties": [...],
  "environmentalImpact": {
    "carbonFootprint": "2.34g CO₂",
    "dataTransfer": "1.2 MB",
    "energyUsed": "0.45 Wh",
    "serverRequests": 3,
    "message": "Analysis completed with minimal environmental impact"
  }
}
```

### 2. Poetic Disruption Endpoint
**POST /api/poison**
```json
{
  "url": "https://example.com",
  "domain": "example.com",
  "poisonLevel": "aggressive",
  "targetCookies": ["_ga", "_fbp", "doubleclick_id"]
}
```

**Response:**
```json
{
  "success": true,
  "poisonedCookies": 12,
  "disruptionKeywords": ["moon", "wildflowers", "disruption"],
  "message": "Digital fingerprint scrambled with poetic chaos",
  "timestamp": "2025-01-27T...",
  "environmentalImpact": "Minimal - local data manipulation only"
}
```

## Data Transparency & User Consent

### Frontend Consent Modal
- **Educational Simulation**: Zero environmental impact, curated examples
- **Real-Time Analysis**: Live data collection with environmental metrics
- **User Choices**: Browser cookie access vs web scraping consent
- **Clear Labeling**: All data sources transparently identified

### Environmental Impact Tracking
- **Carbon Footprint**: Calculated based on data transfer + processing + requests
- **Data Transfer**: Actual bytes transferred during analysis
- **Energy Usage**: Processing time converted to watt-hours
- **Server Requests**: Count of HTTP requests made

### Data Source Indicators
- **"Educational Simulation"**: Mock data for demonstration
- **"Live Website Analysis"**: Real-time scraping and analysis
- **"SIMULATION" vs "LIVE DATA"** badges for clear identification

## Real Implementation Features

### Actual Cookie Detection
1. **Web Scraping**: Uses aiohttp to fetch website content
2. **Cookie Parsing**: Extracts Set-Cookie headers from responses
3. **Purpose Analysis**: Categorizes cookies based on name patterns and domains
4. **Critical Analysis**: Provides feminist technoscience critique of each tracker

### Fingerprinting Detection
1. **Script Analysis**: Scans website content for fingerprinting JavaScript
2. **Pattern Recognition**: Detects canvas, WebGL, audio, font enumeration attempts
3. **Resistance Strategies**: Provides specific countermeasures for each technique
4. **Educational Context**: Explains the surveillance implications

### Third-Party Tracking
1. **Domain Detection**: Identifies known tracking domains in website content
2. **Request Counting**: Measures frequency of third-party connections
3. **Categorization**: Labels trackers by surveillance capitalism categories
4. **Feminist Critique**: Explains how each tracker exploits human vulnerabilities

## Environmental Responsibility

### Carbon Footprint Calculation
- **Data Transfer Impact**: 0.5g CO₂ per MB transferred
- **Processing Impact**: 0.1g CO₂ per second of analysis
- **Request Impact**: 0.1g CO₂ per HTTP request made

### User Education
- Clear environmental cost display for real-time analysis
- Encouragement to use educational mode when possible
- Transparency about resource consumption

## Academic Integrity & Transparency

### Data Storage
- Analysis requests logged with timestamps and consent status
- Results stored without personal identifiable information
- Poisoning actions recorded for research transparency

### Research Ethics
- No permanent data retention of personal information
- Clear consent process for all data collection
- Educational alternatives always available
- Environmental impact fully disclosed