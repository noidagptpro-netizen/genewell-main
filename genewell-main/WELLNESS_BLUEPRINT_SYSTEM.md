# Wellness Blueprint System - Complete Implementation Guide

## 🎯 Overview

The Wellness Blueprint System is a fully self-contained, personalized PDF generation engine that creates unique health transformation guides for each user based on their quiz responses, body metrics, health goals, and selected product tier.

**Key Achievement**: ✅ FIXED - All users now receive completely different PDFs with their personal data embedded.

---

## 📁 Architecture & File Structure

### Core Libraries (Server-side)

#### 1. **`server/lib/scientific-evidence.ts`** (783 lines)
- Curated scientific evidence library with real RCTs, meta-analyses, and PubMed references
- Evidence categories:
  - Sleep & circadian rhythm (with DOI/PMID citations)
  - Metabolism & nutrition
  - Exercise & fitness
  - Hormonal health (thyroid, cortisol, testosterone, estrogen, PCOS)
  - Supplements (Vitamin D, Omega-3, Probiotics, Magnesium)
  - DNA variants (FTO, MTHFR, ACTN3, CLOCK, APOE genes)
  - Stress management & immunity
  - Body composition

**Usage**: Referenced in PDFs to cite all recommendations with real scientific data.

#### 2. **`server/lib/personalization-engine.ts`** (636 lines)
- **Core Algorithm**: Analyzes quiz data and generates personalized health profiles
- **Key Functions**:
  - `analyzeQuizData()` - Main entry point, returns `PersonalizationData` object
  - `determineMetabolismType()` - Fast/Moderate/Slow based on 6 factors
  - `determineAyurvedicType()` - Vata/Pitta/Kapha classification
  - `estimateBMR()` - Basal metabolic rate using Mifflin-St Jeor equation
  - `calculateMacronutrients()` - Personalized protein/carbs/fats ratios
  - `getRecommendedBloodTests()` - Auto-suggested tests based on goals/conditions
  - `getSupplementStack()` - 7-item supplement recommendation

**Outputs**:
```typescript
UserProfile: {
  name, email, age, gender,
  bodyType, metabolismType, ayurvedicType,
  stressScore, sleepScore, activityScore, energyScore,
  estimatedBMR, estimatedTDEE,
  proteinGrams, carbsGrams, fatsGrams,
  medicalConditions[], digestiveIssues[], foodIntolerances[], skinConcerns[],
  recommendedTests[], supplementPriority[], exerciseIntensity, mealFrequency
}

Insights: {
  metabolicInsight,
  ayurvedicInsight,
  recommendedMealTimes[],
  calorieRange: { min, max },
  macroRatios: { protein, carbs, fats },
  supplementStack[],
  workoutStrategy,
  sleepStrategy,
  stressStrategy
}
```

#### 3. **`server/lib/pdf-generator.ts`** (725 lines)
- **Tier-Specific Templates**:
  - **Free**: 5 pages (cover, executive summary, sleep, stress, progress tracking)
  - **Essential**: 15 pages (+ metabolic profile, nutrition plan, fitness routine)
  - **Premium**: ~30 pages (+ metabolic optimization, 7-day meal plan, advanced supplements, citations)
  - **Coaching**: ~35+ pages (+ all premium features, lifestyle coaching, family nutrition, medical condition support)

- **Add-ons** (inject 3-5 additional pages):
  - DNA Analysis Integration (FTO, MTHFR, ACTN3, CLOCK variants)
  - Women's Hormonal Health (cycle-based nutrition, estrogen optimization)
  - Men's Fitness Optimization (testosterone protocols, muscle building)
  - Family Nutrition Plan (up to 4 family members)
  - Advanced Supplement Stack
  - Athletic Performance

- **Function**: `generatePersonalizedPDF()`
  - Accepts: `PersonalizationData` + `PDFGenerationOptions`
  - Returns: PDF buffer + filename
  - Every PDF includes:
    - User's name, age, gender, location
    - Quiz answers summary
    - Metabolic profile (BMR, TDEE, macros)
    - Ayurvedic type
    - Order ID & timestamp
    - Science-backed citations for every recommendation

#### 4. **`server/lib/storage.ts`** (427 lines)
- **In-Memory Database** with persistent temp file storage
- **Data Models**:
  - `StoredUser` - User profiles
  - `StoredQuizResponse` - Quiz submissions
  - `StoredOrder` - Purchase records
  - `StoredPDFRecord` - PDF metadata + file location

- **Key Functions**:
  - `createOrGetUser()` - Session user management
  - `storeQuizResponse()` - Persist quiz data
  - `createOrder()` - Create purchase orders
  - `storePDFFile()` - Save PDF to `/tmp/pdfs` with metadata
  - `getPDFBuffer()` - Retrieve PDF for download
  - `cleanupExpiredPDFs()` - Auto-cleanup after 30 days
  - `getUserDashboard()` - User's complete profile with all PDFs
  - `startCleanupJob()` - Hourly cleanup task

- **Storage Location**: `/tmp/pdfs` (auto-created, cleaned hourly)

---

### API Routes (`server/routes/wellness.ts`)

#### New Endpoints (Personalized System)

1. **POST `/api/wellness/quiz`** ← User submits quiz
   - Validates quiz data
   - Creates user if new
   - Stores quiz response
   - Generates personalization analysis
   - Returns: `analysisId` + basic blueprint

2. **POST `/api/wellness/purchase`** ← User selects plan tier
   - Input: `analysisId`, `planTier` (free/essential/premium/coaching), `addOns[]`
   - Generates full personalized PDF
   - Stores PDF to disk
   - Returns: `orderId`, `pdfRecordId`, `downloadUrl`

3. **GET `/api/wellness/download-pdf/:pdfRecordId`** ← Direct file download
   - Sends PDF as attachment
   - Triggers browser download

4. **GET `/api/wellness/download-pdf-base64/:pdfRecordId`** ← Inline view
   - Returns base64 data URL
   - Can be viewed in browser iframe

5. **GET `/api/wellness/pdfs?email=...`** ← List user's PDFs
   - Retrieves all PDFs generated for a user
   - Includes download URLs

6. **GET `/api/wellness/dashboard/:userId`** ← User dashboard
   - Complete user profile
   - All quiz responses
   - All orders
   - All PDFs with metadata

7. **GET `/api/wellness/stats`** ← System statistics
   - Total users, orders, PDFs
   - Storage breakdown by tier
   - Total disk usage

#### Legacy Endpoints (backward compatible)
- POST `/api/wellness/payment` - Old payment flow
- GET `/api/wellness/download/:analysisId` - Old download (finds first PDF)
- GET `/api/products/download/:productId` - Generic product templates

---

### Frontend Components

#### **`client/pages/Download.tsx`** (590 lines)
**New interactive download page with two phases:**

**Phase 1: Plan Selection**
- Shows 4 plan cards (Free, Essential, Premium, Coaching)
- Displays pages, features, price for each
- "Generate [Plan]" buttons trigger PDF generation
- Loading states and error handling

**Phase 2: PDF Download**
- Shows success message with user's name
- Preview cards showing what's inside
- Two download options:
  - 📥 Download PDF (direct file)
  - View Online (iframe viewer)
- Email delivery confirmation
- Order ID, timestamp, expiration date
- Social sharing buttons
- Support contact options

**Flow Integration**:
```
Quiz → (Complete) → Download?plan=<id> → Select Plan → PDF Generated → Download
                      ↓
                 (Auto-select from URL param)
```

---

## 🔄 Complete User Flow

### Step 1: Quiz Submission
```
User fills 28-question wellness quiz
  ↓
POST /api/wellness/quiz
  ├─ Create/get user
  ├─ Store quiz responses
  ├─ Run personalization engine
  └─ Return analysisId
```

### Step 2: Plan Selection
```
User navigates to /download
  ↓
Display 4 plan options
  ↓
User selects plan tier + optionally add-ons
```

### Step 3: PDF Generation
```
POST /api/wellness/purchase
  ├─ Validate analysisId + tier
  ├─ Retrieve personalization data from cache
  ├─ Call generatePersonalizedPDF()
  │   ├─ Create personalized template based on tier
  │   ├─ Inject user's name, metrics, scores
  │   ├─ Include tier-specific sections
  │   ├─ Add selected add-ons
  │   └─ Attach scientific citations
  ├─ Write PDF buffer to /tmp/pdfs/[timestamp]_[filename].pdf
  ├─ Store metadata in STORAGE.pdfRecords
  └─ Return downloadUrl
```

### Step 4: PDF Download
```
User clicks "Download PDF" on Download page
  ↓
GET /api/wellness/download-pdf/:pdfRecordId
  ├─ Fetch PDF from /tmp/pdfs/[filename]
  ├─ Set Content-Type: application/pdf
  └─ Stream to browser as attachment
```

---

## 📊 How Personalization Works

### 1. **Metabolism Scoring** (Fast/Moderate/Slow)
```
Score = (age_factor) + (body_type) + (activity) + (energy) + (hunger)

Fast: Score ≥ 4
Moderate: -4 < Score < 4
Slow: Score ≤ -4

Impact: Meal frequency, calorie needs, supplement stack
```

### 2. **Ayurvedic Classification** (Vata/Pitta/Kapha)
```
Scores each dosha across:
- Body type
- Stress level
- Bloating patterns
- Food cravings
- Energy levels

Winner-take-all with tie-breaking → Mixed type
```

### 3. **Metabolic Calculations**
```
BMR (Mifflin-St Jeor):
= (10 × weight) + (6.25 × height) - (5 × age) + gender_factor

TDEE = BMR × activity_multiplier

Macros = TDEE distributed by goal:
- Weight loss: Higher protein (2.2g/kg), lower carbs
- Muscle gain: Balanced, higher total calories
- Maintenance: Standard ratios
```

### 4. **Blood Test Recommendations**
```
Auto-suggested based on:
- Weight goal (weight loss → CBC, HbA1c, Lipid Panel, TSH, Vitamin D)
- Medical conditions (PCOS → LH, FSH, Testosterone, Insulin)
- Gender (Female → Iron, Ferritin)
- Age (>40 → Extended panels)
```

### 5. **Supplement Stack** (Top 7)
```
Always include: Vitamin D3, Omega-3

Add based on:
- Stress (>70) → Magnesium + Ashwagandha
- Poor sleep (<60) → Magnesium Glycinate + L-Theanine
- Digestive issues → Probiotics
- Ayurvedic type → Dosha-balancing herbs
- Age & gender → Specific deficiency prevention
```

---

## 📄 PDF Content Differentiation

### **Free Plan PDF** (5 pages)
- Cover page with user data
- Executive summary (metabolic insight + ayurvedic type)
- Sleep optimization (hygiene checklist)
- Stress management (simple techniques)
- Progress tracking (weekly/monthly templates)

### **Essential Plan PDF** (15 pages)
- Everything in Free +
- Metabolic profile (BMR/TDEE/macros)
- Nutrition plan (meal timing + best/worst foods + hydration)
- Fitness routine (3x/week with home exercises)
- Supplement protocol
- Medical conditions section

### **Premium Plan PDF** (~30 pages)
- Everything in Essential +
- Advanced metabolic analysis
- 7-day meal plan with recipes
- 6x/week advanced fitness routine
- Mental health & cognitive optimization
- Hormone balance insights
- Advanced immunity protocols
- 30-day progress tracking
- Scientific evidence & citations (pages of RCTs)

### **Coaching Plan PDF** (~35+ pages)
- Everything in Premium +
- Lifestyle adjustment coaching
- Family nutrition planning
- Medical condition personalized protocols
- Quarterly assessment templates
- 1-on-1 consultation guides

### **Add-On Pages** (Each injects 3-5 pages)
- **DNA**: FTO/MTHFR/ACTN3 variant insights
- **Women's Hormonal**: Cycle-syncing nutrition + hormone support
- **Men's Fitness**: Testosterone optimization + muscle protocols
- **Family Plan**: Individual blueprints for up to 4 family members
- **Advanced Supplements**: Full stack protocol with contraindications
- **Athletic Performance**: Sport-specific training + fueling

---

## 🧪 Testing the System

### Test Flow:
```bash
1. Go to localhost:8080/quiz
2. Fill out 28 questions (varies by user)
3. Navigate to /download
4. Select a plan tier (e.g., Premium)
5. Wait for "Blueprint Ready" message
6. Download PDF
7. Open PDF - should show YOUR name, age, metrics, plan tier, personalized sections
```

### What Makes Each PDF Unique:
- ✅ User's name on cover page
- ✅ User's age, gender, body type
- ✅ Personalized metabolic rates (BMR/TDEE)
- ✅ Custom macronutrient targets
- ✅ Recommended blood tests based on goals/conditions
- ✅ Supplement stack tailored to user
- ✅ Meal timing based on wake time
- ✅ Stress/sleep strategy personalized to scores
- ✅ Ayurvedic constitution-specific recommendations
- ✅ Order ID & timestamp
- ✅ Plan tier affects page count and depth
- ✅ Add-ons add specific sections

### Verification Checklist:
- [ ] Create 2 users with different quiz answers
- [ ] Both select "Premium" plan
- [ ] Download both PDFs
- [ ] Compare PDFs - should be COMPLETELY DIFFERENT:
  - Different names
  - Different metabolic profiles
  - Different supplement stacks
  - Different meal timing
  - Different workout recommendations
  - Different stress/sleep strategies

---

## 💾 Storage System

### In-Memory Maps (Lost on server restart):
```typescript
STORAGE.users: Map<userId, StoredUser>
STORAGE.quizResponses: Map<quizResponseId, StoredQuizResponse>
STORAGE.orders: Map<orderId, StoredOrder>
STORAGE.pdfRecords: Map<pdfRecordId, StoredPDFRecord>
STORAGE.analysisIdToUserId: Map<analysisId, userId>
STORAGE.personalizationDataCache: Map<analysisId, PersonalizationData>
```

### File Storage:
```
/tmp/pdfs/
├── 1700000001_john-doe_wellness-blueprint_order_123.pdf
├── 1700000002_jane-smith_wellness-blueprint_order_124.pdf
└── [expires after 30 days via hourly cleanup job]
```

### Cleanup Job:
- Runs hourly
- Deletes PDFs older than 30 days
- Also removes from STORAGE.pdfRecords
- Logs number cleaned

---

## 🔑 Key Features Implemented

✅ **Personalization Engine**
- Metabolic profiling (BMR, TDEE, macros)
- Body type classification (Ecto/Meso/Endo)
- Ayurvedic constitution (Vata/Pitta/Kapha)
- Health scoring (energy, sleep, stress, activity)
- Condition-aware recommendations

✅ **Scientific Evidence**
- 50+ real citations from PubMed, RCTs, meta-analyses
- DOI/PMID links for every recommendation
- Curated evidence library by category
- Citations embedded in PDFs

✅ **Tier-Specific Content**
- Free: 5 pages (basics)
- Essential: 15 pages (comprehensive)
- Premium: 30 pages (advanced + science)
- Coaching: 35+ pages (full support)

✅ **Add-Ons**
- DNA analysis (genetic variants)
- Women's hormonal health (cycle syncing)
- Men's fitness (testosterone optimization)
- Family nutrition (multi-user blueprints)
- Advanced supplements
- Athletic performance

✅ **User-Specific Data**
- Name, age, gender, location embedded
- Quiz answers summarized
- Metabolic metrics calculated
- Order ID and timestamp
- Plan tier and expiration

✅ **Unique PDFs per User**
- Different content for every user
- Different macros/metrics
- Different supplement stacks
- Different meal timing
- Different strategies

✅ **Temporary Storage**
- PDFs saved to /tmp/pdfs
- Metadata in STORAGE.pdfRecords
- Auto-cleanup after 30 days
- No database required

---

## 🚀 Next Steps for Enhancement

1. **Database Integration**: Replace in-memory STORAGE with Supabase
2. **Authentication**: Add Supabase Auth (email OTP)
3. **Payments**: Integrate Razorpay/Stripe
4. **Notifications**: Email delivery of PDFs
5. **User Accounts**: Login/dashboard/history
6. **Admin Panel**: View all orders, user stats
7. **A/B Testing**: Test different recommendation algorithms
8. **Analytics**: Track which recommendations are most used
9. **Feedback Loop**: Collect user results, adjust algorithms
10. **Multi-language**: Support Hindi, regional languages

---

## 📝 Summary

The Wellness Blueprint System is a **fully functional, self-contained personalization engine** that:

1. **Collects** comprehensive health data via 28-question quiz
2. **Analyzes** using advanced algorithms (Ayurveda, metabolism, health scoring)
3. **Generates** completely unique PDF for each user based on:
   - Personal metrics (age, gender, body type)
   - Health goals and conditions
   - Lifestyle factors (activity, sleep, stress)
   - Selected plan tier (5-35+ pages)
   - Optional add-ons (DNA, hormonal health, family plans)
4. **Delivers** with scientific evidence citations from real RCTs
5. **Stores** temporarily with 30-day auto-cleanup
6. **Enables** users to download their personalized blueprint

**The "all users get same PDF" issue is FIXED** - every PDF is unique to the individual user.

---

Created: 2024
System: Wellness Blueprint AI
