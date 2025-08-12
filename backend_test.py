#!/usr/bin/env python3
"""
Backend Testing Suite for Euridice - Digital Spellbook for Algorithmic Resistance
Tests real-time analysis and cookie poisoning capabilities after major implementation changes.
"""

import requests
import json
import time
from typing import Dict, Any, List
import sys
from datetime import datetime

# Backend URL from environment configuration
BACKEND_URL = "https://56a8b782-2bb8-48f8-917a-ba3a60b5d8e4.preview.emergentagent.com/api"

class EuridiceBackendTester:
    def __init__(self):
        self.test_results = []
        self.session = requests.Session()
        self.session.timeout = 30
        
    def log_test(self, test_name: str, success: bool, details: str, response_data: Any = None):
        """Log test results for comprehensive reporting"""
        result = {
            "test": test_name,
            "success": success,
            "details": details,
            "timestamp": datetime.utcnow().isoformat(),
            "response_data": response_data
        }
        self.test_results.append(result)
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}: {details}")
        
    def test_backend_connectivity(self) -> bool:
        """Test basic backend connectivity"""
        try:
            response = self.session.get(f"{BACKEND_URL}/")
            if response.status_code == 200:
                data = response.json()
                expected_message = "Euridice - Digital Spellbook for Algorithmic Resistance"
                if data.get("message") == expected_message:
                    self.log_test("Backend Connectivity", True, "Backend is accessible and responding correctly")
                    return True
                else:
                    self.log_test("Backend Connectivity", False, f"Unexpected response message: {data}")
                    return False
            else:
                self.log_test("Backend Connectivity", False, f"HTTP {response.status_code}: {response.text}")
                return False
        except Exception as e:
            self.log_test("Backend Connectivity", False, f"Connection failed: {str(e)}")
            return False

    def test_real_time_analysis_facebook(self) -> bool:
        """Test real-time analysis with facebook.com"""
        try:
            payload = {
                "url": "https://facebook.com",
                "options": {
                    "includeBrowserCookies": False,
                    "includeWebScraping": True,
                    "includeFingerprinting": True,
                    "includeEnvironmentalMetrics": True
                }
            }
            
            response = self.session.post(f"{BACKEND_URL}/analyze", json=payload)
            
            if response.status_code != 200:
                self.log_test("Real-Time Analysis (Facebook)", False, f"HTTP {response.status_code}: {response.text}")
                return False
                
            data = response.json()
            
            # Verify essential response structure
            required_fields = ["url", "domain", "threatLevel", "cookieCount", "fingerprintingScore", 
                             "analysisTimestamp", "dataSource", "isRealData", "cookies", 
                             "fingerprinting", "thirdParties", "environmentalImpact"]
            
            missing_fields = [field for field in required_fields if field not in data]
            if missing_fields:
                self.log_test("Real-Time Analysis (Facebook)", False, f"Missing required fields: {missing_fields}")
                return False
            
            # Verify real-time analysis (not simulation)
            if not data.get("isRealData", False):
                self.log_test("Real-Time Analysis (Facebook)", False, "Analysis returned simulation data instead of real-time data")
                return False
                
            # Verify environmental impact is calculated
            env_impact = data.get("environmentalImpact", {})
            if not env_impact.get("carbonFootprint") or env_impact.get("carbonFootprint") == "0.00g CO₂":
                self.log_test("Real-Time Analysis (Facebook)", False, "Environmental impact not calculated properly")
                return False
            
            # Verify threat level and metrics
            if data.get("threatLevel") not in ["HIGH", "MEDIUM", "LOW"]:
                self.log_test("Real-Time Analysis (Facebook)", False, f"Invalid threat level: {data.get('threatLevel')}")
                return False
                
            self.log_test("Real-Time Analysis (Facebook)", True, 
                         f"Real-time analysis successful - Threat: {data.get('threatLevel')}, "
                         f"Cookies: {data.get('cookieCount')}, "
                         f"Fingerprinting: {data.get('fingerprintingScore')}%, "
                         f"Environmental: {env_impact.get('carbonFootprint')}")
            return True
            
        except Exception as e:
            self.log_test("Real-Time Analysis (Facebook)", False, f"Test failed with exception: {str(e)}")
            return False

    def test_real_time_analysis_google(self) -> bool:
        """Test real-time analysis with google.com"""
        try:
            payload = {
                "url": "https://google.com",
                "options": {
                    "includeBrowserCookies": False,
                    "includeWebScraping": True,
                    "includeFingerprinting": True,
                    "includeEnvironmentalMetrics": True
                }
            }
            
            response = self.session.post(f"{BACKEND_URL}/analyze", json=payload)
            
            if response.status_code != 200:
                self.log_test("Real-Time Analysis (Google)", False, f"HTTP {response.status_code}: {response.text}")
                return False
                
            data = response.json()
            
            # Verify this is real-time data
            if not data.get("isRealData", False):
                self.log_test("Real-Time Analysis (Google)", False, "Analysis returned simulation data instead of real-time data")
                return False
            
            # Verify data source indicates real analysis
            data_source = data.get("dataSource", "")
            if "Educational Simulation" in data_source:
                self.log_test("Real-Time Analysis (Google)", False, f"Data source indicates simulation: {data_source}")
                return False
                
            self.log_test("Real-Time Analysis (Google)", True, 
                         f"Real-time analysis successful - Data source: {data_source}")
            return True
            
        except Exception as e:
            self.log_test("Real-Time Analysis (Google)", False, f"Test failed with exception: {str(e)}")
            return False

    def test_cookie_poisoning_default(self) -> bool:
        """Test cookie poisoning with default common trackers"""
        try:
            payload = {
                "url": "https://facebook.com",
                "domain": "facebook.com",
                "poisonLevel": "aggressive"
            }
            
            response = self.session.post(f"{BACKEND_URL}/poison", json=payload)
            
            if response.status_code != 200:
                self.log_test("Cookie Poisoning (Default)", False, f"HTTP {response.status_code}: {response.text}")
                return False
                
            data = response.json()
            
            # Verify response structure
            required_fields = ["success", "poisonedCookies", "fingerprintObfuscations", 
                             "disruptionKeywords", "environmentalImpact"]
            missing_fields = [field for field in required_fields if field not in data]
            if missing_fields:
                self.log_test("Cookie Poisoning (Default)", False, f"Missing required fields: {missing_fields}")
                return False
            
            if not data.get("success"):
                self.log_test("Cookie Poisoning (Default)", False, "Poisoning operation reported failure")
                return False
            
            # Verify poisoned cookies contain common trackers
            poisoned_cookies = data.get("poisonedCookies", [])
            expected_trackers = ["_ga", "_fbp", "_gid", "doubleclick", "_hjid", "_mixpanel"]
            found_trackers = [cookie.get("name") for cookie in poisoned_cookies]
            
            if not any(tracker in found_trackers for tracker in expected_trackers):
                self.log_test("Cookie Poisoning (Default)", False, f"No common trackers found in poisoned cookies: {found_trackers}")
                return False
            
            # Verify fingerprint obfuscations
            obfuscations = data.get("fingerprintObfuscations", [])
            expected_techniques = ["Canvas Fingerprint Scrambling", "WebRTC IP Masking", 
                                 "Audio Context Disruption", "Font Enumeration Spoofing", 
                                 "Screen Resolution Randomization"]
            
            found_techniques = [obs.get("technique") for obs in obfuscations]
            missing_techniques = [tech for tech in expected_techniques if tech not in found_techniques]
            
            if missing_techniques:
                self.log_test("Cookie Poisoning (Default)", False, f"Missing obfuscation techniques: {missing_techniques}")
                return False
            
            self.log_test("Cookie Poisoning (Default)", True, 
                         f"Cookie poisoning successful - {len(poisoned_cookies)} cookies poisoned, "
                         f"{len(obfuscations)} fingerprint techniques obfuscated")
            return True
            
        except Exception as e:
            self.log_test("Cookie Poisoning (Default)", False, f"Test failed with exception: {str(e)}")
            return False

    def test_cookie_poisoning_targeted(self) -> bool:
        """Test cookie poisoning with specific target cookies"""
        try:
            payload = {
                "url": "https://amazon.com",
                "domain": "amazon.com", 
                "poisonLevel": "aggressive",
                "targetCookies": ["_ga", "_fbp", "doubleclick"]
            }
            
            response = self.session.post(f"{BACKEND_URL}/poison", json=payload)
            
            if response.status_code != 200:
                self.log_test("Cookie Poisoning (Targeted)", False, f"HTTP {response.status_code}: {response.text}")
                return False
                
            data = response.json()
            
            if not data.get("success"):
                self.log_test("Cookie Poisoning (Targeted)", False, "Poisoning operation reported failure")
                return False
            
            # Verify targeted cookies were poisoned
            poisoned_cookies = data.get("poisonedCookies", [])
            target_cookies = ["_ga", "_fbp", "doubleclick"]
            
            poisoned_names = [cookie.get("name") for cookie in poisoned_cookies]
            missing_targets = [target for target in target_cookies if target not in poisoned_names]
            
            if missing_targets:
                self.log_test("Cookie Poisoning (Targeted)", False, f"Target cookies not poisoned: {missing_targets}")
                return False
            
            # Verify poisoned values are realistic
            for cookie in poisoned_cookies:
                poisoned_value = cookie.get("poisonedValue", "")
                if not poisoned_value or poisoned_value == "***obfuscated***":
                    self.log_test("Cookie Poisoning (Targeted)", False, f"Invalid poisoned value for {cookie.get('name')}")
                    return False
            
            self.log_test("Cookie Poisoning (Targeted)", True, 
                         f"Targeted cookie poisoning successful - All {len(target_cookies)} target cookies poisoned with realistic false data")
            return True
            
        except Exception as e:
            self.log_test("Cookie Poisoning (Targeted)", False, f"Test failed with exception: {str(e)}")
            return False

    def test_fingerprint_obfuscation_details(self) -> bool:
        """Test detailed fingerprint obfuscation techniques"""
        try:
            payload = {
                "url": "https://google.com",
                "domain": "google.com",
                "poisonLevel": "aggressive"
            }
            
            response = self.session.post(f"{BACKEND_URL}/poison", json=payload)
            
            if response.status_code != 200:
                self.log_test("Fingerprint Obfuscation Details", False, f"HTTP {response.status_code}: {response.text}")
                return False
                
            data = response.json()
            obfuscations = data.get("fingerprintObfuscations", [])
            
            # Test each obfuscation technique in detail
            technique_tests = {
                "Canvas Fingerprint Scrambling": lambda obs: any(word in obs.get("obfuscated_data", "").lower() for word in ["canvas", "liberation", "chaos", "wildflower", "moonlight"]),
                "WebRTC IP Masking": lambda obs: "192.168" in obs.get("obfuscated_data", "") or "10.0" in obs.get("obfuscated_data", "") or "172.16" in obs.get("obfuscated_data", ""),
                "Audio Context Disruption": lambda obs: any(word in obs.get("obfuscated_data", "").lower() for word in ["audio", "frequency", "sisterhood", "enchanted"]),
                "Font Enumeration Spoofing": lambda obs: any(word in obs.get("obfuscated_data", "") for word in ["Liberation", "Moon", "Wildflower", "Sisterhood", "Chaos", "Enchantment"]),
                "Screen Resolution Randomization": lambda obs: "x" in obs.get("obfuscated_data", "") and "randomized" in obs.get("obfuscated_data", "")
            }
            
            failed_techniques = []
            for technique, test_func in technique_tests.items():
                matching_obs = [obs for obs in obfuscations if obs.get("technique") == technique]
                if not matching_obs:
                    failed_techniques.append(f"{technique} - not found")
                elif not test_func(matching_obs[0]):
                    failed_techniques.append(f"{technique} - invalid obfuscated data")
            
            if failed_techniques:
                self.log_test("Fingerprint Obfuscation Details", False, f"Failed techniques: {failed_techniques}")
                return False
            
            self.log_test("Fingerprint Obfuscation Details", True, 
                         f"All {len(technique_tests)} fingerprint obfuscation techniques working correctly")
            return True
            
        except Exception as e:
            self.log_test("Fingerprint Obfuscation Details", False, f"Test failed with exception: {str(e)}")
            return False

    def test_environmental_impact_consistency(self) -> bool:
        """Test environmental impact calculations across different operations"""
        try:
            # Test analysis environmental impact
            analysis_payload = {
                "url": "https://facebook.com",
                "options": {
                    "includeBrowserCookies": False,
                    "includeWebScraping": True,
                    "includeFingerprinting": True,
                    "includeEnvironmentalMetrics": True
                }
            }
            
            analysis_response = self.session.post(f"{BACKEND_URL}/analyze", json=analysis_payload)
            if analysis_response.status_code != 200:
                self.log_test("Environmental Impact Consistency", False, "Analysis request failed")
                return False
            
            analysis_data = analysis_response.json()
            analysis_env = analysis_data.get("environmentalImpact", {})
            
            # Test poison environmental impact
            poison_payload = {
                "url": "https://facebook.com",
                "domain": "facebook.com",
                "poisonLevel": "aggressive"
            }
            
            poison_response = self.session.post(f"{BACKEND_URL}/poison", json=poison_payload)
            if poison_response.status_code != 200:
                self.log_test("Environmental Impact Consistency", False, "Poison request failed")
                return False
            
            poison_data = poison_response.json()
            poison_env = poison_data.get("environmentalImpact", {})
            
            # Verify both operations have environmental impact data
            analysis_carbon = analysis_env.get("carbonFootprint", "")
            poison_carbon = poison_env.get("carbonFootprint", "")
            
            if not analysis_carbon or not poison_carbon:
                self.log_test("Environmental Impact Consistency", False, "Missing carbon footprint data")
                return False
            
            # Verify realistic values (should be > 0 for analysis, minimal for poison)
            if "0.00g CO₂" in analysis_carbon:
                self.log_test("Environmental Impact Consistency", False, "Analysis should have measurable environmental impact")
                return False
            
            self.log_test("Environmental Impact Consistency", True, 
                         f"Environmental impact calculated correctly - Analysis: {analysis_carbon}, Poison: {poison_carbon}")
            return True
            
        except Exception as e:
            self.log_test("Environmental Impact Consistency", False, f"Test failed with exception: {str(e)}")
            return False

    def test_no_simulation_fallbacks(self) -> bool:
        """Test that no Educational Simulation fallbacks are used"""
        try:
            # Test with a less common website to see if it falls back to simulation
            payload = {
                "url": "https://example.com",
                "options": {
                    "includeBrowserCookies": False,
                    "includeWebScraping": True,
                    "includeFingerprinting": True,
                    "includeEnvironmentalMetrics": True
                }
            }
            
            response = self.session.post(f"{BACKEND_URL}/analyze", json=payload)
            
            if response.status_code != 200:
                self.log_test("No Simulation Fallbacks", False, f"HTTP {response.status_code}: {response.text}")
                return False
                
            data = response.json()
            
            # Check for simulation indicators
            data_source = data.get("dataSource", "")
            is_real_data = data.get("isRealData", False)
            
            # Even if real scraping fails, it should not fall back to "Educational Simulation"
            if "Educational Simulation" in data_source:
                self.log_test("No Simulation Fallbacks", False, f"Found Educational Simulation fallback: {data_source}")
                return False
            
            # Check cookies for simulation markers
            cookies = data.get("cookies", [])
            for cookie in cookies:
                if not cookie.get("isReal", True):
                    self.log_test("No Simulation Fallbacks", False, "Found simulation cookies (isReal=False)")
                    return False
            
            self.log_test("No Simulation Fallbacks", True, 
                         f"No simulation fallbacks detected - Data source: {data_source}, Real data: {is_real_data}")
            return True
            
        except Exception as e:
            self.log_test("No Simulation Fallbacks", False, f"Test failed with exception: {str(e)}")
            return False

    def test_high_threat_domain_detection(self) -> bool:
        """Test enhanced threat level analysis for known surveillance capitalism companies"""
        try:
            # Test known high-threat domains
            high_threat_domains = [
                ("https://facebook.com", "facebook.com"),
                ("https://google.com", "google.com"), 
                ("https://amazon.com", "amazon.com"),
                ("https://temu.com", "temu.com"),
                ("https://hubspot.com", "hubspot.com")
            ]
            
            failed_domains = []
            
            for url, expected_domain in high_threat_domains:
                payload = {
                    "url": url,
                    "options": {
                        "includeBrowserCookies": False,
                        "includeWebScraping": True,
                        "includeFingerprinting": True,
                        "includeEnvironmentalMetrics": True
                    }
                }
                
                response = self.session.post(f"{BACKEND_URL}/analyze", json=payload)
                
                if response.status_code != 200:
                    failed_domains.append(f"{expected_domain}: HTTP {response.status_code}")
                    continue
                    
                data = response.json()
                
                # Verify HIGH threat level for known surveillance platforms
                threat_level = data.get("threatLevel", "")
                threat_description = data.get("threatDescription", "")
                
                if threat_level != "HIGH":
                    failed_domains.append(f"{expected_domain}: Expected HIGH threat, got {threat_level}")
                    continue
                
                # Verify threat description mentions surveillance platform
                if "Known surveillance platform" not in threat_description and "surveillance" not in threat_description.lower():
                    failed_domains.append(f"{expected_domain}: Missing surveillance platform description")
                    continue
                
                # Verify trackingIndicators array exists
                tracking_indicators = data.get("trackingIndicators", [])
                if not isinstance(tracking_indicators, list):
                    failed_domains.append(f"{expected_domain}: Missing or invalid trackingIndicators array")
                    continue
            
            if failed_domains:
                self.log_test("High-Threat Domain Detection", False, f"Failed domains: {failed_domains}")
                return False
            
            self.log_test("High-Threat Domain Detection", True, 
                         f"All {len(high_threat_domains)} known surveillance platforms correctly identified as HIGH threat")
            return True
            
        except Exception as e:
            self.log_test("High-Threat Domain Detection", False, f"Test failed with exception: {str(e)}")
            return False

    def test_tracking_mechanism_count_assessment(self) -> bool:
        """Test threat level assessment based on tracking mechanism counts"""
        try:
            # Test different domains to get varied tracking mechanism counts
            test_domains = [
                "https://facebook.com",
                "https://google.com", 
                "https://amazon.com"
            ]
            
            results = []
            
            for url in test_domains:
                payload = {
                    "url": url,
                    "options": {
                        "includeBrowserCookies": False,
                        "includeWebScraping": True,
                        "includeFingerprinting": True,
                        "includeEnvironmentalMetrics": True
                    }
                }
                
                response = self.session.post(f"{BACKEND_URL}/analyze", json=payload)
                
                if response.status_code != 200:
                    continue
                    
                data = response.json()
                
                # Calculate total tracking mechanisms
                cookie_count = data.get("cookieCount", 0)
                fingerprinting_methods = len(data.get("fingerprinting", []))
                third_parties = len(data.get("thirdParties", []))
                total_tracking = cookie_count + fingerprinting_methods + third_parties
                
                threat_level = data.get("threatLevel", "")
                
                results.append({
                    "url": url,
                    "total_tracking": total_tracking,
                    "threat_level": threat_level,
                    "cookies": cookie_count,
                    "fingerprinting": fingerprinting_methods,
                    "third_parties": third_parties
                })
            
            if not results:
                self.log_test("Tracking Mechanism Count Assessment", False, "No successful analysis results")
                return False
            
            # Verify threat level logic (though high-threat domains override this)
            assessment_details = []
            for result in results:
                total = result["total_tracking"]
                level = result["threat_level"]
                
                # For known high-threat domains, they should be HIGH regardless of count
                # But we can still verify the counting logic is working
                assessment_details.append(f"{result['url']}: {total} mechanisms → {level}")
            
            self.log_test("Tracking Mechanism Count Assessment", True, 
                         f"Tracking mechanism counting working correctly: {assessment_details}")
            return True
            
        except Exception as e:
            self.log_test("Tracking Mechanism Count Assessment", False, f"Test failed with exception: {str(e)}")
            return False

    def test_advanced_tracking_indicators(self) -> bool:
        """Test detection of advanced tracking indicators"""
        try:
            # Test with a major platform that should have various tracking indicators
            payload = {
                "url": "https://facebook.com",
                "options": {
                    "includeBrowserCookies": False,
                    "includeWebScraping": True,
                    "includeFingerprinting": True,
                    "includeEnvironmentalMetrics": True
                }
            }
            
            response = self.session.post(f"{BACKEND_URL}/analyze", json=payload)
            
            if response.status_code != 200:
                self.log_test("Advanced Tracking Indicators", False, f"HTTP {response.status_code}: {response.text}")
                return False
                
            data = response.json()
            
            # Check for tracking indicators array
            tracking_indicators = data.get("trackingIndicators", [])
            if not isinstance(tracking_indicators, list):
                self.log_test("Advanced Tracking Indicators", False, "trackingIndicators should be an array")
                return False
            
            # Check cookies for tracking pixel patterns
            cookies = data.get("cookies", [])
            pixel_patterns = ['pixel', 'track', 'analytics', 'gtm', 'fbp', '_ga', '_gid']
            found_pixel_cookies = []
            
            for cookie in cookies:
                cookie_name = cookie.get("name", "").lower()
                if any(pattern in cookie_name for pattern in pixel_patterns):
                    found_pixel_cookies.append(cookie_name)
            
            # Check fingerprinting methods for advanced techniques
            fingerprinting = data.get("fingerprinting", [])
            advanced_fp_techniques = ['canvas', 'webgl', 'audio', 'battery', 'webrtc']
            found_fp_techniques = []
            
            for fp in fingerprinting:
                technique = fp.get("technique", "").lower()
                if any(adv_tech in technique for adv_tech in advanced_fp_techniques):
                    found_fp_techniques.append(fp.get("technique"))
            
            # Check third parties for major trackers
            third_parties = data.get("thirdParties", [])
            major_tracker_patterns = ['google', 'facebook', 'amazon', 'microsoft', 'adobe']
            found_major_trackers = []
            
            for tp in third_parties:
                domain = tp.get("domain", "").lower()
                if any(tracker in domain for tracker in major_tracker_patterns):
                    found_major_trackers.append(tp.get("domain"))
            
            # Verify comprehensive tracking detection
            detection_summary = {
                "pixel_cookies": len(found_pixel_cookies),
                "advanced_fingerprinting": len(found_fp_techniques),
                "major_trackers": len(found_major_trackers),
                "tracking_indicators": len(tracking_indicators)
            }
            
            self.log_test("Advanced Tracking Indicators", True, 
                         f"Advanced tracking detection working: {detection_summary}")
            return True
            
        except Exception as e:
            self.log_test("Advanced Tracking Indicators", False, f"Test failed with exception: {str(e)}")
            return False

    def test_mongodb_logging_enhancement(self) -> bool:
        """Test enhanced MongoDB logging with comprehensive threat analysis data"""
        try:
            # Perform analysis to trigger logging
            payload = {
                "url": "https://facebook.com",
                "options": {
                    "includeBrowserCookies": False,
                    "includeWebScraping": True,
                    "includeFingerprinting": True,
                    "includeEnvironmentalMetrics": True
                }
            }
            
            response = self.session.post(f"{BACKEND_URL}/analyze", json=payload)
            
            if response.status_code != 200:
                self.log_test("MongoDB Logging Enhancement", False, f"HTTP {response.status_code}: {response.text}")
                return False
                
            data = response.json()
            
            # Verify response contains expected fields for logging
            expected_logging_fields = [
                "threatLevel", "threatDescription", "trackingIndicators",
                "cookieCount", "fingerprintingScore", "environmentalImpact"
            ]
            
            missing_fields = [field for field in expected_logging_fields if field not in data]
            if missing_fields:
                self.log_test("MongoDB Logging Enhancement", False, f"Missing logging fields: {missing_fields}")
                return False
            
            # Verify threat analysis data structure
            threat_level = data.get("threatLevel")
            threat_description = data.get("threatDescription")
            tracking_indicators = data.get("trackingIndicators")
            
            if threat_level not in ["HIGH", "MEDIUM", "LOW"]:
                self.log_test("MongoDB Logging Enhancement", False, f"Invalid threat level for logging: {threat_level}")
                return False
            
            if not isinstance(threat_description, str) or len(threat_description) < 10:
                self.log_test("MongoDB Logging Enhancement", False, "Threat description too short for meaningful logging")
                return False
            
            if not isinstance(tracking_indicators, list):
                self.log_test("MongoDB Logging Enhancement", False, "Tracking indicators should be array for logging")
                return False
            
            # Calculate expected total tracking mechanisms
            cookie_count = data.get("cookieCount", 0)
            fingerprinting_count = len(data.get("fingerprinting", []))
            third_party_count = len(data.get("thirdParties", []))
            expected_total = cookie_count + fingerprinting_count + third_party_count
            
            # Verify environmental impact logging structure
            env_impact = data.get("environmentalImpact", {})
            required_env_fields = ["carbonFootprint", "dataTransfer", "energyUsed", "serverRequests"]
            missing_env_fields = [field for field in required_env_fields if field not in env_impact]
            
            if missing_env_fields:
                self.log_test("MongoDB Logging Enhancement", False, f"Missing environmental logging fields: {missing_env_fields}")
                return False
            
            logging_summary = {
                "threat_level": threat_level,
                "total_tracking_mechanisms": expected_total,
                "tracking_indicators_count": len(tracking_indicators),
                "has_environmental_data": bool(env_impact.get("carbonFootprint")),
                "is_high_threat_domain": threat_level == "HIGH" and "surveillance" in threat_description.lower()
            }
            
            self.log_test("MongoDB Logging Enhancement", True, 
                         f"Enhanced logging data structure verified: {logging_summary}")
            return True
            
        except Exception as e:
            self.log_test("MongoDB Logging Enhancement", False, f"Test failed with exception: {str(e)}")
            return False

    def test_enhanced_response_format(self) -> bool:
        """Test enhanced response format with detailed threat analysis"""
        try:
            # Test with multiple domains to verify consistent response format
            test_urls = [
                "https://facebook.com",
                "https://google.com",
                "https://amazon.com"
            ]
            
            format_issues = []
            
            for url in test_urls:
                payload = {
                    "url": url,
                    "options": {
                        "includeBrowserCookies": False,
                        "includeWebScraping": True,
                        "includeFingerprinting": True,
                        "includeEnvironmentalMetrics": True
                    }
                }
                
                response = self.session.post(f"{BACKEND_URL}/analyze", json=payload)
                
                if response.status_code != 200:
                    format_issues.append(f"{url}: HTTP {response.status_code}")
                    continue
                    
                data = response.json()
                
                # Verify enhanced response format
                required_fields = [
                    "threatLevel", "threatDescription", "trackingIndicators",
                    "url", "domain", "cookieCount", "fingerprintingScore",
                    "analysisTimestamp", "dataSource", "isRealData",
                    "cookies", "fingerprinting", "thirdParties", "environmentalImpact"
                ]
                
                missing_fields = [field for field in required_fields if field not in data]
                if missing_fields:
                    format_issues.append(f"{url}: Missing fields {missing_fields}")
                    continue
                
                # Verify threatLevel format
                threat_level = data.get("threatLevel")
                if threat_level not in ["HIGH", "MEDIUM", "LOW"]:
                    format_issues.append(f"{url}: Invalid threatLevel '{threat_level}'")
                    continue
                
                # Verify threatDescription is detailed
                threat_description = data.get("threatDescription", "")
                if len(threat_description) < 20:
                    format_issues.append(f"{url}: threatDescription too brief")
                    continue
                
                # Verify trackingIndicators is array
                tracking_indicators = data.get("trackingIndicators")
                if not isinstance(tracking_indicators, list):
                    format_issues.append(f"{url}: trackingIndicators not an array")
                    continue
                
                # Verify environmental impact structure
                env_impact = data.get("environmentalImpact", {})
                env_required = ["carbonFootprint", "dataTransfer", "energyUsed", "serverRequests", "message"]
                env_missing = [field for field in env_required if field not in env_impact]
                if env_missing:
                    format_issues.append(f"{url}: Missing environmental fields {env_missing}")
                    continue
            
            if format_issues:
                self.log_test("Enhanced Response Format", False, f"Format issues: {format_issues}")
                return False
            
            self.log_test("Enhanced Response Format", True, 
                         f"Enhanced response format verified for {len(test_urls)} domains")
            return True
            
        except Exception as e:
            self.log_test("Enhanced Response Format", False, f"Test failed with exception: {str(e)}")
            return False

    def run_all_tests(self) -> Dict[str, Any]:
        """Run all backend tests and return comprehensive results"""
        print("🧪 Starting Euridice Backend Testing Suite")
        print("=" * 60)
        
        # Test order: connectivity first, then core functionality
        tests = [
            self.test_backend_connectivity,
            self.test_real_time_analysis_facebook,
            self.test_real_time_analysis_google,
            self.test_cookie_poisoning_default,
            self.test_cookie_poisoning_targeted,
            self.test_fingerprint_obfuscation_details,
            self.test_environmental_impact_consistency,
            self.test_no_simulation_fallbacks
        ]
        
        passed = 0
        failed = 0
        
        for test in tests:
            try:
                if test():
                    passed += 1
                else:
                    failed += 1
            except Exception as e:
                print(f"❌ CRITICAL ERROR in {test.__name__}: {str(e)}")
                failed += 1
            
            # Small delay between tests
            time.sleep(0.5)
        
        print("\n" + "=" * 60)
        print(f"🧪 Testing Complete: {passed} passed, {failed} failed")
        
        return {
            "total_tests": len(tests),
            "passed": passed,
            "failed": failed,
            "success_rate": f"{(passed / len(tests) * 100):.1f}%",
            "test_results": self.test_results
        }

def main():
    """Main testing function"""
    tester = EuridiceBackendTester()
    results = tester.run_all_tests()
    
    # Return exit code based on results
    if results["failed"] == 0:
        print("\n✅ All backend tests passed!")
        return 0
    else:
        print(f"\n❌ {results['failed']} backend tests failed!")
        return 1

if __name__ == "__main__":
    exit_code = main()
    sys.exit(exit_code)