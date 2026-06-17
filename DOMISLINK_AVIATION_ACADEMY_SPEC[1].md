# DomisLink Aviation Academy Platform Specification
**Version 1.0** | **Status: MVP Launch Ready**

---

## **PROJECT OVERVIEW**

**Name:** DomisLink Aviation Academy  
**Domain:** `aviation-academy.domislinker.com`  
**Platform:** React + Claude API + Paystack + Cloudflare Pages  
**Launch:** Week 1 (MVP) → NCAT Partnership talks Week 2  
**Philosophy:** DirectStack (zero-cost infrastructure, maximum efficiency)

---

## **DECISION MATRIX (10 Questions Locked)**

| # | Question | Decision | Status |
|---|----------|----------|--------|
| 1 | NCAT Fleet | Real aircraft (NCAT Zaria specs) | ✅ |
| 2 | AI Instructor | Male/Female selectable | ✅ |
| 3 | Videos | YouTube (promo) + Upload (premium) | ✅ |
| 4 | OCR Feedback | Student upload → AI remarks | ✅ |
| 5 | Certificates | QR + ICAO/NCAA refs + name/date/course | ✅ |
| 6 | Payments | Paystack only (Amex + intl) | ✅ |
| 7 | NCAT Track | Separate NCAT syllabus module | ✅ |
| 8 | Compliance | PDF download + Live dashboard | ✅ |
| 9 | Pricing | ₦65k–₦1.8M + Installment plans | ✅ |
| 10 | Languages | English, French, Hausa, Igbo, Italian, Japanese, Spanish, Portuguese, Arabic, German, Mandarin (11 total) | ✅ |

---

## **NCAT ZARIA FLEET DATABASE**

### Aircraft in Service (Real Specs)

**Single-Engine Training Aircraft:**
- **Tampico TB9** (Qty: 14)
  - Capacity: 4 seats
  - Engine: 160 HP Lycoming
  - Max Speed: 140 knots
  - Range: 600 nm
  - Training focus: Private Pilot, Instrument

- **Trinidad TB20** (Qty: 5)
  - Capacity: 4 seats
  - Engine: 200 HP Lycoming
  - Max Speed: 160 knots
  - Range: 700 nm
  - Training focus: Commercial, Multi-engine transition

**Twin-Engine Aircraft:**
- **Beech 58 Baron** (Qty: 3)
  - Capacity: 6 seats
  - Engines: 2x 260 HP Continental
  - Max Speed: 185 knots
  - Range: 1,000 nm
  - Training focus: Multi-engine, Commercial

**Rotorcraft:**
- **Bell 206 Helicopter** (Qty: 2)
  - Capacity: 5 seats
  - Engine: 1x 317 HP Allison
  - Max Speed: 115 knots
  - Training focus: Helicopter Pilot

**Advanced Aircraft:**
- **TBM 850 Turboprop** (Qty: 1)
  - Capacity: 6 seats
  - Engine: 850 HP Pratt & Whitney
  - Max Speed: 330 knots
  - Training focus: Advanced instrumentation, Jet transition

**Commercial:**
- **B737 Full Fuselage** (Qty: 1)
  - Training focus: Cabin crew, emergency procedures
- **B737 Flight Simulator** (Qty: 1)
  - Training focus: Type rating, advanced procedures

---

## **FEATURE SPECIFICATIONS**

### 1. AI INSTRUCTOR SYSTEM
- **Dual Gender Selection:** Male Captain (Captain Okonkwo) / Female Captain (Captain Amara)
- **Visual Representation:** SVG avatars in cockpit uniform with NCAT insignia
- **Voice Integration:** Claude API text responses (audio via browser TTS)
- **Personality:** Professional, encouraging, detail-focused aviation expert
- **Capabilities:**
  - Real-time flight scenario guidance
  - Emergency procedure coaching
  - Knowledge verification via questions
  - Assignment feedback processing

### 2. VIDEO SYSTEM
- **YouTube Embeds:** Free promotional content (marketing, safety, procedure overviews)
  - Auto-populated playlist from DomisLink Aviation Academy channel
  - Responsive iframe with captions
  - Monetization: DomisLink receives AdSense revenue
  
- **Premium Upload Player:** Full course materials
  - Direct file upload (MP4, WebM, HLS)
  - Playback controls (speed, quality, subtitles)
  - Requires course enrollment + payment
  - Progress tracking

### 3. OCR ASSIGNMENT FEEDBACK
- **Student Workflow:**
  1. Upload handwritten/printed assignment (PNG, JPG, PDF)
  2. Claude API processes image → extracts text
  3. AI instructor evaluates against rubric
  4. Detailed feedback provided (grades + remarks)
  5. Student can iterate and resubmit
  
- **Grading Rubric:** Accuracy, clarity, aviation knowledge, completeness
- **Feedback Format:** Structured remarks with specific improvement suggestions

### 4. QR-VERIFIED CERTIFICATES
- **Certificate Data:**
  - Student name, enrollment date, completion date
  - Course title + level (Private, Commercial, ATPL)
  - Unique certificate ID (UUID)
  - QR code linking to verification endpoint
  - ICAO certificate reference number (auto-generated)
  - NCAA registration number (if applicable)
  
- **Verification Flow:**
  1. Student/employer scans QR
  2. Resolves to `aviation-academy.domislinker.com/verify/{cert-id}`
  3. Live verification against blockchain-backed ledger
  4. Certificate authenticity confirmed + date/student data displayed

- **Generation:** HTML → Canvas → PNG download + PDF email

### 5. NCAT TRACK MODULE
- **Separate Curriculum:** NCAT-approved syllabus (PPL, CPL, ATPL)
- **Content Structure:**
  - NCAT-mandated theory modules
  - Approved flight maneuvers
  - Compliance checklists
  - Assessment rubrics aligned with NCAA standards
  
- **Badge System:** NCAT certification badges upon completion
- **Syllabus Export:** Downloadable PDF for instructor review

### 6. PAYSTACK INTEGRATION
- **Payment Methods:**
  - Local: Bank transfer, Mobile Money (MTN, Airtel)
  - International: Visa, Mastercard, American Express
  - Crypto: (if Paystack partner enabled)
  
- **Pricing Tiers:**
  - **₦65,000** - PPL Self-Study (30 days)
  - **₦250,000** - PPL Full Course (6 months)
  - **₦500,000** - CPL Track (12 months)
  - **₦1,800,000** - ATPL Full Program (24 months)

- **Installment Plans:**
  - 3-month: ₦65k → ₦22k/mo (0% interest)
  - 6-month: ₦250k → ₦42k/mo
  - 12-month: ₦500k → ₦42k/mo
  - 24-month: ₦1.8M → ₦75k/mo

### 7. COMPLIANCE DASHBOARD
- **Live Public Dashboard:**
  - Student enrollment counts (by level)
  - Course completion rates
  - Certificate issuance summary
  - NCAT alignment metrics
  - Instructor qualifications/certifications
  - Safety incident log (if any)
  
- **Downloadable PDF Report:**
  - Annual compliance summary
  - Audit-ready documentation
  - ICAO Annex 1 alignment checklist
  - NCAA compliance certificate
  - Auto-generated timestamp + signature

- **View Access:**
  - Public: Read-only dashboard view
  - NCAT Inspectors: Full audit access (password-protected)
  - Admin: Edit permissions

### 8. MULTILINGUAL INTERFACE (11 Languages)
- **Core Languages:** English, French
- **Local:** Hausa, Igbo
- **International:** Italian, Japanese, Spanish, Portuguese (Brazil), Arabic, German, Mandarin

- **Implementation:** i18n JSON files + language selector (flag icons)
- **RTL Support:** Arabic interface right-to-left layout

---

## **PRICING & MONETIZATION**

### Revenue Streams
1. **Course Enrollment:** Paystack (70% after processor fee)
2. **YouTube AdSense:** DomisLink channel (100% of revenue)
3. **Certificate Verification:** Freemium (paid expedited verification optional)
4. **B2B Corporate Training:** Custom pricing

### Payment Processing
- **Gateway:** Paystack (PK Live Key stored in env)
- **Charge Conversion:** NGN → USD (Paystack auto-handles)
- **Payout Schedule:** Weekly to registered business account
- **Tax:** VAT calculated per Paystack rules

---

## **NCAT PARTNERSHIP ALIGNMENT**

### Compliance Checkpoints
- ✅ Real NCAT aircraft database (updated from official inventory)
- ✅ NCAT-approved curriculum track (separate module)
- ✅ NCAA certificate integration (reference numbers on certs)
- ✅ Live compliance dashboard (public audit trail)
- ✅ Instructor certification verification
- ✅ Student assessment alignment with NCAT standards

### Marketing Pitch
*"DomisLink Aviation Academy: Transforming pilot training through AI-powered instruction, real NCAT fleet data, and transparent compliance. A technology partner for NCAT Zaria's global reach."*

---

## **TECHNICAL ARCHITECTURE**

### Stack
- **Frontend:** React 18 + Tailwind CSS + i18n
- **AI Integration:** Claude API (claude-sonnet-4-20250514) for instructor + OCR
- **Payments:** Paystack API (wrapped in Node backend or client-side)
- **Database:** Supabase (PostgreSQL) for students, enrollments, certificates
- **Storage:** Cloudflare R2 (video files, assignment uploads)
- **Hosting:** Cloudflare Pages (frontend) + Cloudflare Workers (API routes)
- **Certificate Verification:** Blockchain-lite (signed JSON ledger on R2)

### Key Endpoints
```
POST /api/enrollments         → Create enrollment + Paystack session
POST /api/assignments/feedback → OCR + Claude API feedback
POST /api/certificates/generate → QR + ICAO certificate
GET  /api/certificates/verify  → Public certificate lookup
GET  /api/compliance/dashboard → Public compliance data
POST /api/installment/schedule → Payment plan creation
```

### Deployment
- **Repo:** GitHub (amaechiu-del/domislink-aviation-academy)
- **CI/CD:** GitHub Actions → Cloudflare Pages
- **Env Vars:** Paystack key, Claude API key, Supabase URL
- **Custom Domain:** Via Cloudflare DNS (CNAME to Pages)

---

## **LAUNCH TIMELINE**

| Week | Milestone |
|------|-----------|
| 1 | MVP build + Cloudflare Pages deployment |
| 2 | NCAT partnership pitch + curriculum finalization |
| 3 | Beta student enrollment (50 pilot students) |
| 4 | Compliance audit + first certificates issued |

---

## **SUCCESS METRICS**

- ✅ 50+ enrollments in month 1
- ✅ ₦2M+ revenue (MRR) by month 3
- ✅ NCAT partnership agreement signed
- ✅ 95%+ certificate verification success rate
- ✅ <100ms page load (Cloudflare Pages)
- ✅ 11-language interface live
- ✅ Zero payment processing errors

---

**Document Version:** 1.0  
**Last Updated:** 2026-03-20  
**Status:** ✅ LOCKED FOR BUILD
