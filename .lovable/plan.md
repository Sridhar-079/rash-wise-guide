
# SkinGuard AI — Skin Health Scanner

## Overview
A clean, medical-themed web app that lets users scan skin spots/lesions using their camera or uploaded photos, get an AI-powered risk assessment with a simple risk score, and receive personalized guidance and skin health education.

---

## Pages & Features

### 1. Landing / Home Page
- Hero section with app tagline: "Your AI Skin Health Companion"
- Brief explanation of how it works (3-step flow: Capture → Analyze → Results)
- Prominent "Start Scan" call-to-action button
- Medical disclaimer banner (not a replacement for professional diagnosis)

### 2. Scan Page
- **Live camera capture** option using the device camera
- **Photo upload** option from device gallery
- Image preview before submitting for analysis
- Upload guidelines (good lighting, close-up, clear focus)

### 3. Results Page
- **Risk Score** displayed as a clear visual gauge (Low / Moderate / High)
- **Brief explanation** of what the AI detected (e.g., "This appears to be a benign skin lesion" or "This spot shows characteristics that warrant professional evaluation")
- **Next Steps** section with actionable recommendations:
  - Low risk → Self-monitoring tips, skin care advice
  - Moderate risk → Schedule a dermatologist visit, monitor for changes
  - High risk → Seek immediate medical consultation
- **Condition-specific tips** (if non-cancerous: eczema care, fungal infection prevention, etc.)

### 4. Education / Skin Health Hub
- **ABCDE Rule** explained with visuals
- **Sun protection** tips
- **Skin monitoring** guide
- **Common skin conditions** reference (eczema, psoriasis, acne, fungal infections, allergies) with precautionary advice
- **Healthy lifestyle** tips for skin health

### 5. Optional User Account
- Sign up / Sign in (email-based)
- **Scan History** — view past scans with dates, images, and risk scores
- Works fully without an account; account just adds history tracking

---

## Design Style
- **Clean & medical** aesthetic — white background, soft blue/teal accents
- Professional, trustworthy feel with clear typography
- Mobile-first responsive design
- Calming, accessible UI with clear visual hierarchy

---

## AI Integration
- Powered by **Lovable AI** (Gemini model) via an edge function
- Image is sent to the backend, AI analyzes and returns a risk assessment
- Results include: risk level, brief explanation, and tailored next steps

## Backend (Lovable Cloud)
- Edge function for AI skin analysis
- Database for storing user accounts and scan history (optional sign-up)
- Storage bucket for uploaded scan images
