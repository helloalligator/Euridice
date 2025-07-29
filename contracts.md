# Privacy Analyzer Contracts

## API Contracts

### 1. URL Analysis Endpoint
**POST /api/analyze**
```json
{
  "url": "https://example.com",
  "options": {
    "includeCookies": true,
    "includeFingerprinting": true,
    "includeNetworkAnalysis": true
  }
}
```

**Response:**
```json
{
  "url": "https://example.com",
  "domain": "example.com", 
  "threatLevel": "HIGH",
  "threatDescription": "Extensive surveillance infrastructure detected",
  "cookieCount": 34,
  "fingerprintingScore": 78,
  "analysisTimestamp": "2025-01-27T...",
  "cookies": [...],
  "fingerprinting": [...], 
  "thirdParties": [...]
}
```

### 2. Cookie Poisoning Endpoint
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
  "message": "Digital fingerprint scrambled successfully",
  "timestamp": "2025-01-27T..."
}
```

## Mock Data Replacement Plan

### Frontend Mock Data (mockData.js)
Currently mocking:
- `getAnalysisData(url)` - Returns fake tracking analysis
- Cookie data with predefined tracking types
- Fingerprinting detection results
- Third-party connection data

### Backend Implementation Required

1. **Real URL Analysis:**
   - Web scraping to fetch actual website content
   - Cookie extraction and classification  
   - JavaScript analysis for fingerprinting scripts
   - Network request monitoring for third-party trackers

2. **Privacy Scoring Algorithm:**
   - Cookie risk assessment based on domains/purposes
   - Fingerprinting technique detection
   - Threat level calculation
   - Privacy violation categorization

3. **Cookie Poisoning Implementation:**
   - Generate realistic but false user data
   - Cookie value scrambling algorithms
   - Noise injection into tracking parameters
   - Session data corruption methods

## Frontend & Backend Integration

### Remove Mock Data:
1. Replace `mockData.getAnalysisData()` calls with actual API calls to `/api/analyze`
2. Replace poisoning simulation with real `/api/poison` endpoint calls
3. Add proper error handling for API failures
4. Implement loading states during real analysis

### API Integration Points:
- `analyzeUrl()` function → POST to `/api/analyze`
- `executePoison()` function → POST to `/api/poison`  
- Add authentication/rate limiting for production use
- Implement caching for repeated URL analysis

## Technical Implementation Notes

### Backend Requirements:
- Web scraping library (BeautifulSoup/Scrapy)
- Cookie parsing and analysis
- JavaScript AST parsing for fingerprinting detection
- Network request simulation and monitoring
- Privacy databases/blocklists for tracker identification

### Security Considerations:
- Input validation for URLs
- Rate limiting to prevent abuse
- Secure cookie manipulation 
- User consent for poisoning actions
- Data privacy compliance