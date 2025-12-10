// Plan ID Mapping (from specification)
export const PLAN_IDS = {
  FREE: "free_blueprint",
  ESSENTIAL: "essential_blueprint",
  PREMIUM: "premium_blueprint",
  COACHING: "coaching_blueprint",
} as const;

export const ADDON_IDS = {
  DNA: "addon_dna",
  SUPPLEMENT: "addon_supplement",
  ATHLETE: "addon_athlete",
  FAMILY: "addon_family",
  WOMEN_HORMONE: "addon_women_hormone",
  MEN_FITNESS: "addon_men_fitness",
} as const;

export interface Product {
  id: string;
  planId?: string;
  name: string;
  description: string;
  details: string[];
  price: number;
  color: string;
  icon: string;
  link: string;
  pageCount: number; // NEW: Approximate page count for PDF
  pdfContent?: string;
}

export interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: string;
  features: string[];
  pageCountAddition: number; // NEW: Additional pages this add-on adds to PDF
}

export interface PlanConfiguration {
  planId: string;
  selectedAddOns: string[];
  totalPrice: number;
  userName?: string;
  userEmail?: string;
}

// FREE BLUEPRINT - Basic wellness foundation
export const FREE_BLUEPRINT: Product = {
  id: "free-blueprint",
  planId: PLAN_IDS.FREE,
  name: "Free Blueprint",
  description: "Sleep & circadian rhythm assessment. Stress and energy evaluation. 5 daily habit recommendations. Hydration & movement guidelines. 90-day quick-start checklist. Approx. 6-page PDF, personalized for your profile.",
  details: [
    "Sleep & circadian rhythm assessment",
    "Stress and energy evaluation",
    "5 daily habit recommendations",
    "Hydration & movement guidelines",
    "90-day quick-start checklist",
  ],
  price: 0,
  color: "gray",
  icon: "gift",
  link: "/view-sample-report",
  pageCount: 6,
  pdfContent: `# YOUR WELLNESS BLUEPRINT – FREE EDITION
Personalized for {{userName}}
Generated: {{generatedDate}}

## COVER PAGE

Your Wellness Blueprint – Free Edition
Personalized for {{userName}}
Plan Tier: Free Blueprint
Date of Generation: {{generatedDate}}

---

## PAGE 2: EXECUTIVE SUMMARY

### Your Wellness Profile at a Glance

**Key Numbers:**
- Age: {{age}} years
- Activity Level: {{activityLevel}}
- Current Sleep: {{sleepHours}} hours/night
- Stress Level: {{stressLevel}}/5
- Primary Goal: {{weightGoal}}

**Top 5 Actions This Week:**
1. Set one consistent wake time (including weekends)
2. Get 20–30 minutes of morning sunlight within 1 hour of waking
3. Identify your natural 10–12 hour eating window and stay consistent
4. Do 20 minutes of movement (walk, yoga, strength) in morning or midday, 3x this week
5. Stop screens 1 hour before your target bedtime

**Simple Wellness Scores:**
- Sleep Consistency: [Visual bar chart: 1-5 scale]
- Energy Stability: [Visual bar chart: 1-5 scale]
- Stress Resilience: [Visual bar chart: 1-5 scale]
- Activity Consistency: [Visual bar chart: 1-5 scale]

---

## PAGE 3: LIFESTYLE AND METABOLIC OVERVIEW

### Your Metabolic Baseline

Your body burns a baseline amount of energy at complete rest, called Basal Metabolic Rate (BMR). Research shows it depends on age, sex, height, weight, and activity.

**Estimated Basal Metabolic Rate (BMR):** {{estimatedBMR}} calories/day
This is what you burn if you were completely at rest.

**Total Daily Energy Expenditure (TDEE):** {{estimatedTDEE}} calories/day
This is what you burn given your current {{activityLevel}} activity level.

**What This Means:**
- If you eat {{estimatedTDEE}} calories daily, your weight stays stable
- If you eat 300–500 calories less, you lose ~0.5 lb per week (fat loss research: Helms et al., 2014)
- If you eat 300–500 calories more, you gain ~0.5 lb per week (muscle gain requires surplus: Schoenfeld et al., 2016)

### Your Sleep Profile

Sleep is the foundation. Research from sleep neurobiology shows that **consistency matters more than duration** (Walker, 2017). Sleeping 6 hours at the same time every night harms you less than sleeping 8 hours at irregular times.

**Your Current Pattern:**
- Natural wake time: {{wakeUpTime}}
- Current sleep hours: {{sleepHours}}
- Energy dip times: {{tiredTime}}
- Sleep quality: {{sleepQuality}}/5

**Key Finding:** Your circadian rhythm is set by when you wake, not when you sleep. Fixing wake time first produces the fastest sleep improvements.

### Your Movement & Stress

**Activity Level:** {{activityLevel}}
- This affects your calorie needs and recovery capacity
- Research shows 20–30 minutes of any moderate movement (walk, yoga, strength) reduces cortisol and anxiety comparable to medication (Schuch et al., 2016)

**Stress Level:** {{stressLevel}}/5
- Chronic stress elevation suppresses immunity and disrupts sleep architecture (Slavich & Irwin, 2014)
- Stress is normal; the question is how quickly you recover

---

## PAGE 4: SLEEP & STRESS OPTIMIZATION (BASIC)

### Sleep Protocol

**Week 1: Lock In Wake Time**
1. Choose your target wake time (e.g., 6:30 AM)
2. Set an alarm. Wake at this time every day—including weekends—for 30 days
3. Sleep duration will adjust. Don't force it.

**Evidence:** Consistent wake time re-synchronizes your circadian clock faster than any other single intervention (Chang et al., 2015).

### Get Morning Light (30 Minutes, No Glasses)

Light hitting your eyes 30 minutes after waking sets your circadian clock forward, making evening sleep come earlier.

**Action:**
- Step outside for 20–30 minutes within 1 hour of waking
- No sunglasses. Real sunlight works. On cloudy days, stay longer
- This is free, evidence-backed, and works (Chang et al., 2015, PNAS)

### Meal Timing Windows (Eating Inside 10–12 Hours)

Eating across a compressed window (e.g., 8am–6pm) aligns your circadian system. Eating 16+ hours per day disrupts insulin sensitivity and sleep quality.

**Action:**
- Identify when you naturally first feel hungry: That's breakfast time
- Count back 10–12 hours: That's your eating window close time
- Eat within this window consistently

Example: If breakfast is 7 AM, eating stops by 5–7 PM.

### Hydration Basics

Chronic mild dehydration impairs cognition and mood (Popkin et al., 2010).

**Simple Protocol:**
- Upon waking: 500ml water
- With each meal: 250ml water
- Between meals: Drink if thirsty
- 3 hours before sleep: Reduce intake (minimize nighttime urination)

That's it. No "gallon per day" rule—context matters (climate, activity, diet).

### Stress Assessment & Tools

**Your Stress Score:** {{stressLevel}}/5

If you score 3 or higher, use these three evidence-backed tools:

**Tool 1: Box Breathing (5 minutes)**
- Inhale 4 counts, hold 4, exhale 4, hold 4
- Do 5 rounds when stress spikes
- Activates parasympathetic nervous system in minutes (Laborde et al., 2016)

**Tool 2: Movement as Stress Relief (20–30 minutes)**
- Any moderate activity (walk, yoga, strength) reduces cortisol comparable to anti-anxiety medication
- Walking counts. Intensity doesn't matter for stress relief
- Do 3x per week minimum

**Tool 3: Sleep Debt Compounds Stress**
- One night of poor sleep increases amygdala (fear center) reactivity by 60% (Walker, 2017)
- Fix sleep first. Stress tools work better when rested

---

## PAGE 5: YOUR 30-DAY START

### Week 1: Sleep Foundation
- Set one wake time. Commit to it every day.
- Get 20–30 minutes morning light within 1 hour of waking
- Start a simple sleep log (bedtime, wake time, quality 1–10)

### Week 2: Add Meal Consistency
- Define your 10–12 hour eating window
- Eat breakfast within 2 hours of waking
- Drink 500ml water on waking

### Week 3: Add Movement
- 20-minute walk or light workout, morning or midday, 3x this week
- Journal energy levels before and after each session
- Notice: How do you feel the rest of the day?

### Week 4: Assess & Reset
- How's your energy? Sleep quality improved?
- Which changes stuck? Which didn't?
- What's working? Keep it. What's hard? Adjust.

---

## PAGE 6: SCIENCE-BACKED TESTS RECOMMENDED FOR YOU

### Why Test?
Blood work shows what's actually happening inside, beyond what you feel. Baseline testing tells you what to improve; retesting at 90 days shows what's working.

### Recommended Panel (Order through any lab; discuss with your doctor)

**Basic Metabolic Panel (CMP)**
- Cost: ₹500–800
- Checks: Glucose, kidney function, liver function, electrolytes
- Why: Shows how your body tolerates food and handles stress
- Baseline + 90 days

**Lipid Panel**
- Cost: ₹400–600
- Checks: Total cholesterol, LDL, HDL, triglycerides
- Why: Baseline cardiovascular health
- Baseline + 90 days

**Fasting Glucose**
- Cost: ₹200–400
- Checks: Blood sugar control
- Why: Early sign of metabolic issues or excellent metabolic health
- Baseline + 90 days

**Thyroid Function (TSH, Free T4)**
- Cost: ₹600–900
- Checks: Thyroid activity (governs metabolism, energy, mood)
- Why: Hidden thyroid issues affect energy, weight, mood
- Baseline only

**Vitamin D (25-hydroxyvitamin D)**
- Cost: ₹400–700
- Checks: Your vitamin D level
- Why: Linked to immunity, mood, bone health, and metabolic rate
- Baseline + 90 days (especially if you live indoors or in a low-sunlight area)

---

## References & Evidence

Chang, A. M., et al. (2015). Evening Use of Light-Emitting eReaders Negatively Affects Sleep, Circadian Timing, and Next-Morning Alertness. PNAS, 112(4), 1232–1237.

Helms, E. R., et al. (2014). Evidence-Based Recommendations for Natural Bodybuilding Contest Preparation. Journal of Sports Medicine & Physical Fitness, 54(2), 171–186.

Laborde, S., et al. (2016). The Capacity to Regulate Emotions is Associated with Prolonged Survival in Aging. Journal of Aging Research, 2016, 9816148.

Popkin, B. M., et al. (2010). Water, Hydration, and Health. Nutrition Reviews, 68(8), 439–458.

Schoch, F. B., et al. (2016). Exercise as a Treatment for Depression: A Meta-Analysis. Journal of Psychiatric Research, 77, 42–51.

Schoenfeld, B. J., et al. (2016). Dose-Response Relationships Between Exercise Volume and Muscle Hypertrophy. Sports Medicine, 46(11), 1689–1697.

Slavich, G. M., & Irwin, M. R. (2014). From Stress to Inflammation and Major Depressive Disorder. Psychological Bulletin, 140(3), 774–815.

Walker, M. (2017). Why We Sleep. Scribner.

---

## Next Step

This Free Blueprint gives you the foundation. Ready to go deeper?

**Essential Blueprint (₹599)** adds personalized meal timing, movement plans, and sleep optimization specific to your schedule.

**Premium Blueprint (₹1,499)** adds calorie/macro optimization, a 5-day training program, supplement strategy, and blood work interpretation.

**Complete Coaching (₹9,999)** adds a real coach: weekly check-ins, form review, and personalized adjustments.

Choose what fits your goals and budget. All start with your quiz data—no repetition.
`,
};

// ESSENTIAL BLUEPRINT - Structured beginner plan
export const ESSENTIAL_BLUEPRINT: Product = {
  id: "essential-blueprint",
  planId: PLAN_IDS.ESSENTIAL,
  name: "Essential Blueprint",
  description: "Personalized meal timing and macro framework. Daily movement and beginner training plan. 7-day meal structure with Indian examples. Basic supplement guidance. Weekly accountability checklist. Approx. 10-page PDF, personalized for {{userName}}.",
  price: 599,
  color: "blue",
  icon: "star",
  link: "/buy-essential",
  pageCount: 10,
  details: [
    "Personalized meal timing and macro framework",
    "Daily movement and beginner training plan",
    "7-day meal structure with Indian examples",
    "Basic supplement guidance",
    "Weekly accountability checklist",
  ],
};

// PREMIUM BLUEPRINT - Advanced, detailed, high-value
export const PREMIUM_BLUEPRINT: Product = {
  id: "premium-blueprint",
  planId: PLAN_IDS.PREMIUM,
  name: "Premium Blueprint",
  description: "Calories & macro optimization for your goal. Customized 7-day meal plan with recipes and Indian grocery list. Goal-aligned training and recovery program (5+ days/week). Full supplement strategy with timing. Mental and cognitive performance section. Approx. 12-page PDF, personalized for {{userName}}.",
  price: 1499,
  color: "green",
  icon: "zap",
  link: "/buy-premium",
  pageCount: 12,
  details: [
    "Calories & macro optimization for your goal",
    "Customized 7-day meal plan with recipes",
    "Indian grocery list by category",
    "5-day training program with progression",
    "Full supplement strategy with timing",
    "Mental performance and hormone section",
    "Priority email support",
  ],
};

// COMPLETE COACHING - Elite, personalized, high-touch
export const COMPLETE_COACHING: Product = {
  id: "complete-coaching",
  planId: PLAN_IDS.COACHING,
  name: "Complete Coaching",
  description: "Everything in Premium plus: Strategy session and form review. Weekly accountability + form checks (first 8–12 weeks). WhatsApp messaging support. Habit and behavior change coaching. Periodic reassessment and re-programming. Approx. 14–16-page PDF, personalized for {{userName}}.",
  price: 9999,
  color: "orange",
  icon: "heart",
  link: "/buy-coaching",
  pageCount: 15,
  details: [
    "Two 1-on-1 strategy sessions (60 min each)",
    "Weekly accountability & form checks",
    "Personalized nutrition & training adjustments",
    "Direct messaging support (24–48 hr response)",
    "Video form review for your lifts",
    "Behavior-change coaching & habit building",
    "Monthly progress assessments",
    "Habit systems and implementation planning",
  ],
};

// PRODUCTS ARRAY FOR BACKWARDS COMPATIBILITY
export const products: Product[] = [
  FREE_BLUEPRINT,
  ESSENTIAL_BLUEPRINT,
  PREMIUM_BLUEPRINT,
  COMPLETE_COACHING,
];

export const getProductById = (id: string): Product | undefined => {
  return products.find((p) => p.id === id);
};

export const getProductByPlanId = (planId: string): Product | undefined => {
  return products.find((p) => p.planId === planId);
};

// PREMIUM ADD-ONS - Six distinct, evidence-based micro-products
export const addOns: AddOn[] = [
  {
    id: ADDON_IDS.DNA,
    name: "DNA Analysis Add-on",
    description: "Genetic insight into nutrient absorption, caffeine sensitivity, and exercise response",
    price: 1499,
    icon: "dna",
    pageCountAddition: 3,
    features: [
      "MTHFR methylation status (folate processing)",
      "CYP1A2 caffeine metabolism (fast vs. slow)",
      "ACTN3 muscle fiber type (power vs. endurance)",
      "What your genes can't predict (limitations explained)",
      "Practical modifications to training and nutrition",
      "Gene-specific test recommendations",
    ],
  },
  {
    id: ADDON_IDS.SUPPLEMENT,
    name: "Advanced Supplement Stack",
    description: "Lab-backed supplement protocol specific to your deficiencies and goals",
    price: 2999,
    icon: "pill",
    pageCountAddition: 3,
    features: [
      "Deficiency testing interpretation",
      "Periodized 12-week supplement protocol",
      "Sourcing guide (brands, vendors)",
      "Timing and stacking strategy",
      "Supplement phases (loading, maintenance, deload)",
      "Lab tests that determine necessity",
    ],
  },
  {
    id: ADDON_IDS.ATHLETE,
    name: "Athletic Performance Add-on",
    description: "Sport-specific training, energy systems, and fuel-timing strategy",
    price: 1999,
    icon: "target",
    pageCountAddition: 2,
    features: [
      "Sport-specific 12-week periodization",
      "Energy system training (aerobic, lactate, alactic)",
      "Fueling strategy for competition",
      "Recovery protocols post-competition",
      "Performance metrics to track (HRV, VO2max, time trials)",
      "Advanced lab testing for athletes",
    ],
  },
  {
    id: ADDON_IDS.FAMILY,
    name: "Family Nutrition Plan",
    description: "Extend your plan to up to 4 family members with customized blueprints",
    price: 3499,
    icon: "users",
    pageCountAddition: 4,
    features: [
      "Up to 4 family member assessments",
      "Individual meal timing frameworks",
      "Family-friendly recipes (accommodating all)",
      "Grocery list optimization for whole household",
      "Household-level meal structures",
      "Shared lab tests vs. individual assessments",
    ],
  },
  {
    id: ADDON_IDS.WOMEN_HORMONE,
    name: "Women's Hormonal Health Add-on",
    description: "Menstrual cycle nutrition, PCOS/thyroid support, and hormone-aware training",
    price: 1799,
    icon: "heart",
    pageCountAddition: 2,
    features: [
      "Menstrual cycle-synced nutrition (follicular/luteal)",
      "PCOS insulin-sensitivity strategies",
      "Thyroid-supporting protocols",
      "Training adjustments by cycle phase",
      "Conservative condition explanations",
      "Priority hormone-related lab tests (TSH, LH/FSH, prolactin)",
    ],
  },
  {
    id: ADDON_IDS.MEN_FITNESS,
    name: "Men's Fitness Optimization Add-on",
    description: "Muscle-building framework, testosterone-supporting habits, and strength progressions",
    price: 1799,
    icon: "zap",
    pageCountAddition: 2,
    features: [
      "Muscle-building nutrition (calorie surplus, protein timing)",
      "Testosterone-supporting sleep and strength training",
      "Progressive overload programming (12 weeks)",
      "Performance plateau-breaking strategies",
      "Recovery and strength progression strategies",
      "Relevant lab tests (lipid panel, fasting glucose, testosterone if age/symptoms justify)",
    ],
  },
];

export const getAddOnById = (id: string): AddOn | undefined => {
  return addOns.find((ao) => ao.id === id);
};
