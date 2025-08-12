# Euridice User Input Guide 🌙
## What You Need to Use This Digital Spellbook

### **📋 For End Users (Using the Application)**

#### **Required User Inputs:**
```
1. Website URL to Analyze
   └── Format: any website URL (facebook.com, google.com, etc.)
   └── System auto-adds https:// if missing
   └── Examples: "facebook.com", "https://amazon.com", "twitter.com"

2. Consent Choices
   └── Real-time Analysis Permission (required)
   └── Enhanced Cookie Analysis (optional)
   └── Click "Begin Real-Time Analysis" to proceed

3. Persona Selection (for Disruption Spell)
   └── Choose one of three digital identities:
       • 🐙 Sentient Octopus (caviar, books, puzzles)
       • 🌿 Greek Folk Hero Euridice (mythology, herbs, privacy)
       • 🤖 Bladerunner Replicant (synthetic, enhanced capabilities)
```

#### **Optional User Inputs:**
```
• Accessibility Toggle (Glitch Mode vs Clean Mode)
• Spell Dispelling (stop disruption when desired)
• Modal Interactions (view results, close popups)
```

---

### **🖥️ For Developers/Administrators (Setup & Installation)**

#### **Required System Dependencies:**
```bash
# Core Requirements
├── Node.js 16+ (for frontend)
├── Python 3.9+ (for backend)  
├── MongoDB 7.0+ (for database)
├── Yarn package manager
├── Modern web browser
└── Linux/macOS environment (recommended)
```

#### **Required Environment Variables:**
```bash
# Frontend (.env file in /frontend/)
REACT_APP_BACKEND_URL=https://your-domain.com

# Backend (.env file in /backend/)
MONGO_URL=mongodb://localhost:27017/euridice

# Optional (for enhanced features)
LOG_LEVEL=INFO
CORS_ORIGINS=*
```

#### **Installation Input Commands:**
```bash
# 1. Clone Repository
git clone https://github.com/helloalligator/Euridice.git
cd Euridice

# 2. Install Frontend Dependencies
cd frontend
yarn install

# 3. Install Backend Dependencies  
cd ../backend
pip install -r requirements.txt

# 4. Start Services
sudo supervisorctl start all
```

---

### **🐳 For Docker Deployment**

#### **Required Configuration Files:**
```yaml
# docker-compose.yml inputs needed:
services:
  mongodb:
    image: mongo:7.0
    ports: ["27017:27017"]
    
  backend:
    build: .
    ports: ["8001:8001"]
    environment:
      - MONGO_URL=mongodb://mongodb:27017/euridice
      
  frontend:
    build: ./frontend
    ports: ["3000:3000"]
    environment:
      - REACT_APP_BACKEND_URL=http://localhost:8001
```

#### **Docker Commands:**
```bash
# Build and run
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

---

### **⚙️ For Production Deployment**

#### **Required Server Configuration:**
```nginx
# Nginx configuration inputs:
server {
    listen 80;
    server_name your-domain.com;
    
    # Frontend routes
    location / {
        proxy_pass http://localhost:3000;
    }
    
    # Backend API routes
    location /api {
        proxy_pass http://localhost:8001;
    }
}
```

#### **Required SSL/Security Setup:**
```bash
# SSL Certificate (Let's Encrypt recommended)
sudo certbot --nginx -d your-domain.com

# Firewall Configuration
sudo ufw allow 22    # SSH
sudo ufw allow 80    # HTTP
sudo ufw allow 443   # HTTPS
sudo ufw enable
```

#### **Database Configuration:**
```javascript
// MongoDB indexes for performance:
db.analysis_logs.createIndex({ "timestamp": -1 })
db.analysis_logs.createIndex({ "domain": 1 })
db.poison_actions.createIndex({ "timestamp": -1 })
db.poison_actions.createIndex({ "persona": 1 })
```

---

### **🔧 For Development & Customization**

#### **Required Development Tools:**
```bash
# Code Editor Setup
├── VS Code (recommended)
├── ESLint extension
├── Prettier extension
├── Python extension
└── GitLens extension

# Development Dependencies
├── @vitejs/plugin-react
├── eslint
├── tailwindcss
├── pytest (for backend testing)
└── playwright (for E2E testing)
```

#### **Development Environment Variables:**
```bash
# Additional dev variables
NODE_ENV=development
REACT_APP_DEBUG=true
PYTHON_ENV=development
LOG_LEVEL=DEBUG
ENABLE_DEV_TOOLS=true
```

#### **Testing Inputs:**
```bash
# Frontend Testing
cd frontend && npm run test

# Backend Testing  
cd backend && pytest tests/

# E2E Testing
npx playwright test

# Manual Testing URLs
├── facebook.com (HIGH threat test)
├── google.com (HIGH threat test)  
├── example.com (LOW threat test)
└── personal-blog.com (LOW threat test)
```

---

### **🎯 API Usage (For Integrations)**

#### **Analysis API Input Format:**
```json
POST /api/analyze
{
  "url": "https://facebook.com",
  "options": {
    "includeBrowserCookies": false,
    "includeWebScraping": true,
    "includeFingerprinting": true,
    "includeEnvironmentalMetrics": true
  }
}
```

#### **Disruption API Input Format:**
```json
POST /api/poison
{
  "url": "https://facebook.com",
  "domain": "facebook.com",
  "poisonLevel": "aggressive",
  "persona": "euridice",
  "targetCookies": ["_ga", "_fbp", "fr"]
}
```

---

### **📚 For Academic Research**

#### **Research Configuration Inputs:**
```python
# Research settings in backend/config.py
RESEARCH_MODE = True
ANONYMIZE_DATA = True
RETENTION_PERIOD_DAYS = 365
EXPORT_FORMAT = "csv"
IRB_APPROVAL_NUMBER = "2025-001"
```

#### **Data Export Inputs:**
```bash
# MongoDB queries for research data
db.analysis_logs.find({
  "timestamp": {
    "$gte": ISODate("2025-01-01"),
    "$lt": ISODate("2025-12-31")
  }
})

# CSV export command
mongoexport --db euridice --collection analysis_logs --csv --fields url,threat_level,timestamp --out research_data.csv
```

---

### **🌍 For Different Environments**

#### **Development Environment:**
```bash
# Minimal inputs for dev
export REACT_APP_BACKEND_URL=http://localhost:8001
export MONGO_URL=mongodb://localhost:27017/euridice_dev
yarn dev & python server.py
```

#### **Staging Environment:**
```bash
# Staging inputs
export REACT_APP_BACKEND_URL=https://staging.euridice.com
export MONGO_URL=mongodb://staging-db:27017/euridice_staging
export LOG_LEVEL=INFO
```

#### **Production Environment:**
```bash
# Production inputs (secure)
export REACT_APP_BACKEND_URL=https://euridice.com
export MONGO_URL=mongodb://prod-cluster:27017/euridice
export LOG_LEVEL=WARNING
export ENABLE_ANALYTICS=true
export BACKUP_ENABLED=true
```

---

### **🚨 Required vs Optional Inputs Summary**

#### **❗ REQUIRED (Cannot run without):**
- ✅ Website URL (user input)
- ✅ Node.js & Python installed
- ✅ MongoDB running  
- ✅ REACT_APP_BACKEND_URL environment variable
- ✅ MONGO_URL environment variable

#### **🔧 OPTIONAL (Enhances functionality):**
- ⚙️ Persona selection (defaults to octopus)
- ⚙️ Enhanced cookie analysis consent
- ⚙️ SSL certificates (for production)
- ⚙️ Custom domain configuration
- ⚙️ Analytics and logging configuration

#### **🎓 RESEARCH-ONLY (Academic use):**
- 📊 IRB approval documentation
- 📊 Data retention policies
- 📊 Export configurations
- 📊 Anonymization settings

---

### **⚡ Quick Start Checklist**

```bash
☐ 1. Install Node.js 16+, Python 3.9+, MongoDB 7.0+
☐ 2. Clone: git clone https://github.com/helloalligator/Euridice.git
☐ 3. Set REACT_APP_BACKEND_URL in frontend/.env
☐ 4. Set MONGO_URL in backend/.env  
☐ 5. Install: yarn install (frontend) & pip install -r requirements.txt (backend)
☐ 6. Start: yarn dev (frontend) & python server.py (backend)
☐ 7. Visit: http://localhost:3000
☐ 8. Enter any website URL to analyze
☐ 9. Grant consent for real-time analysis
☐ 10. Choose persona and cast disruption spell!
```

**🌙 That's it! Euridice requires minimal input to unleash maximum digital resistance power!** ✨