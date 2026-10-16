// Central Service & Pricing Catalogue for ScholarBridge by Brandon
// All prices in USD. Affordable student peer mentorship model.

export const SERVICES = [
  {
    id: "discovery-consultation",
    name: "20-Minute Discovery Consultation",
    price: 5,
    category: "consultation",
    turnaround: "Scheduled live call (20 mins)",
    revisions: "1 live session",
    deliverable: "Live 1-on-1 discovery call + written follow-up roadmap",
    bestFor: "Students wanting an initial orientation on their opportunities and readiness.",
    inclusions: [
      "20-minute focused video or audio consultation",
      "Assessment of your current profile & target goals",
      "Immediate recommendation on suitable opportunities",
      "Written bullet-point action roadmap sent post-call"
    ],
    exclusions: ["In-depth document editing", "Full essay markup", "Visa legal advice"]
  },
  {
    id: "opportunity-eligibility-review",
    name: "Opportunity & Eligibility Review",
    price: 7,
    category: "strategy",
    turnaround: "48 – 72 hours",
    revisions: "1 round of clarification",
    deliverable: "Curated shortlist report (3–5 vetted opportunities) with eligibility notes",
    bestFor: "Applicants unsure which scholarships or international programmes fit their profile.",
    inclusions: [
      "Screening of candidate background against criteria",
      "Shortlist of 3–5 verified global scholarships or youth programmes",
      "Deadline tracking calendar and prerequisite checklist",
      "Strategic assessment of competitiveness"
    ],
    exclusions: ["Submitting applications on student's behalf", "Guarantee of selection"]
  },
  {
    id: "cv-review-feedback",
    name: "CV Review & Diagnostic Feedback",
    price: 10,
    category: "documents",
    turnaround: "48 hours",
    revisions: "1 round of feedback",
    deliverable: "Annotated CV with line-by-line comments & rubric diagnostic",
    bestFor: "Students who have a drafted CV and need honest, objective review.",
    inclusions: [
      "Comprehensive margin comments on formatting & tone",
      "Action-verb & impact-statement assessment",
      "Clarity, conciseness, and ATS-readability scan",
      "Prioritized improvement punch-list"
    ],
    exclusions: ["Rewriting the CV from scratch", "Designing custom graphic layouts"]
  },
  {
    id: "cv-restructuring-editing",
    name: "CV Restructuring & Strategic Editing",
    price: 15,
    category: "documents",
    turnaround: "72 hours",
    revisions: "2 rounds of revisions",
    deliverable: "Polished, publication-ready academic/scholarship CV (Word & PDF)",
    bestFor: "Applicants needing their activities converted into high-impact international framing.",
    inclusions: [
      "Complete structural re-organization and section reordering",
      "Line-by-line phrasing refinement using impact verbs and quantifiable metrics",
      "Clear international education standard alignment",
      "2 rounds of collaborative feedback"
    ],
    exclusions: ["Fabricating unverified activities or falsifying dates"]
  },
  {
    id: "extracurricular-review",
    name: "Extracurricular Activity Profile Review",
    price: 10,
    category: "documents",
    turnaround: "48 hours",
    revisions: "1 round of revisions",
    deliverable: "Optimized 5–10 activity descriptions tailored for scholarship portals",
    bestFor: "Students with many activities who don't know how to highlight their core impact.",
    inclusions: [
      "Curating top 5–10 activities that demonstrate leadership & community impact",
      "Condensing into portal character limits (e.g. 150 characters)",
      "Connecting activities directly to SDG goals and institutional values",
      "Strengthening role titles and contribution clarity"
    ],
    exclusions: ["Ghostwriting unperformed projects"]
  },
  {
    id: "academic-presentation-review",
    name: "Academic Achievement Presentation Review",
    price: 10,
    category: "documents",
    turnaround: "48 hours",
    revisions: "1 round of revisions",
    deliverable: "Academic honours portfolio guide with contextual explanations",
    bestFor: "Students presenting national/provincial awards to foreign admissions panels.",
    inclusions: [
      "Contextualizing domestic grades, GPA, and awards for international reviewers",
      "Framing competitive selectiveness (e.g., 'Provincial 2nd Prize out of 500 candidates')",
      "Organizing academic projects, research papers, and Olympiad recognitions",
      "Clarity recommendations for transcript addendums"
    ],
    exclusions: ["Official transcript translation or notarization"]
  },
  {
    id: "personal-statement-review",
    name: "Personal Statement Comprehensive Review",
    price: 15,
    category: "essays",
    turnaround: "72 hours",
    revisions: "2 rounds of written feedback",
    deliverable: "Detailed structural commentary + line-edited draft",
    bestFor: "Undergraduate applicants communicating their lived narrative authentically.",
    inclusions: [
      "Evaluation of narrative arc, emotional resonance, and hook",
      "Identification of cliches and generic statements",
      "Sentence-level flow, vocabulary precision, and transition editing",
      "Assessment of how well your values align with the opportunity"
    ],
    exclusions: ["Writing the essay on your behalf", "Grammar-only superficial proofreading"]
  },
  {
    id: "motivation-letter-review",
    name: "Motivation Letter Strategic Review",
    price: 12,
    category: "essays",
    turnaround: "48 hours",
    revisions: "1 round of comprehensive edits",
    deliverable: "Line-edited motivation letter aligning your goals with the programme",
    bestFor: "Short-term international programme and exchange applicants.",
    inclusions: [
      "Why this programme / Why you fit analysis",
      "Specific alignment with host institution objectives and SDG themes",
      "Clarity and brevity optimization (typically 500–800 words)",
      "Actionable closing paragraph enhancement"
    ],
    exclusions: ["Complete rewriting without student input"]
  },
  {
    id: "scholarship-essay-review",
    name: "Scholarship Prompt Essay Review",
    price: 15,
    category: "essays",
    turnaround: "72 hours",
    revisions: "2 rounds of edits",
    deliverable: "Targeted feedback on scholarship-specific prompts (KNB, MEXT, ASEAN, etc.)",
    bestFor: "Applicants answering prompts on community impact, leadership, or study plans.",
    inclusions: [
      "Deep analysis against official scholarship selection criteria",
      "Feasibility and intellectual maturity check on future study plans",
      "Evidence-based storytelling strengthening",
      "Line-level stylistic polishing"
    ],
    exclusions: ["Writing academic study proposals from zero"]
  },
  {
    id: "strategy-session",
    name: "Application Strategy Live Session",
    price: 15,
    category: "consultation",
    turnaround: "Scheduled live call (45 mins)",
    revisions: "1 live session + written plan",
    deliverable: "45-min Zoom/Google Meet session + written strategic master timeline",
    bestFor: "Applicants needing clarity on deadlines, story positioning, and next steps.",
    inclusions: [
      "45 minutes deep-dive into your application story",
      "Strategic positioning strategy to stand out among international cohorts",
      "Risk mitigation for weak spots in your profile",
      "Step-by-step master application calendar"
    ],
    exclusions: ["Full document reviews during the call"]
  },
  {
    id: "interview-prep-session",
    name: "Interview Preparation Strategy Session",
    price: 15,
    category: "interview",
    turnaround: "Scheduled live call (45 mins)",
    revisions: "1 live session",
    deliverable: "Curated question bank tailored to your programme + response frameworks",
    bestFor: "Applicants invited to interview who need clear messaging frameworks.",
    inclusions: [
      "Deconstruction of typical interview questions and institutional priorities",
      "Framework for structuring answers (STAR, impact stories, personal mission)",
      "Preparation for curveball and technical questions",
      "Body language, virtual setup, and cross-cultural communication etiquette"
    ],
    exclusions: ["Guaranteed interview questions"]
  },
  {
    id: "mock-interview-feedback",
    name: "Live Mock Interview with Diagnostic Rubric",
    price: 20,
    category: "interview",
    turnaround: "Scheduled live call (50 mins)",
    revisions: "1 simulation + oral & written rubric",
    deliverable: "30-min simulated interview + 20-min live feedback + 2-page rubric report",
    bestFor: "Shortlisted candidates preparing for high-stakes government or university interviews.",
    inclusions: [
      "Realistic interview simulation matching the tone of your committee",
      "Direct verbal debrief immediately following the simulation",
      "Detailed written rubric evaluating content, delivery, poise, and authenticity",
      "Key answer pivots and recorded suggestions for improvement"
    ],
    exclusions: ["Recording shared publicly"]
  },
  {
    id: "final-application-review",
    name: "Final Application Completeness & Polish Review",
    price: 20,
    category: "strategy",
    turnaround: "48 hours",
    revisions: "1 comprehensive audit",
    deliverable: "Complete submission readiness audit report across all application facets",
    bestFor: "Applicants ready to hit submit who need peace of mind and an eagle-eye check.",
    inclusions: [
      "Holistic consistency check across CV, essays, recommendations, and portal entries",
      "Formatting, margin, naming convention, and file size compliance check",
      "Risk identification for ambiguous phrases or conflicting dates",
      "Final submission go/no-go recommendation"
    ],
    exclusions: ["Last-minute complete essay rewrites"]
  },
  {
    id: "visa-document-checklist",
    name: "General Visa-Document Checklist Review",
    price: 10,
    category: "strategy",
    turnaround: "48 hours",
    revisions: "1 review",
    deliverable: "Document organization checklist & practical peer experience notes",
    bestFor: "Admitted students organizing their student visa application files.",
    inclusions: [
      "Peer review of document completeness against official embassy checklist",
      "Practical tips on appointment scheduling, financial documentation proofing",
      "Sharing lived experience navigating Indonesian & Southeast Asian student visas",
      "Pre-departure logistics overview"
    ],
    exclusions: ["Legal immigration representation", "Visa issuance guarantees", "Official embassy liaison"]
  }
];

export const PACKAGES = [
  {
    id: "quick-start",
    name: "Quick Start — Short-Term Programme",
    price: 15,
    tagline: "For youth summits, summer schools, and short-term international exchanges.",
    popular: false,
    bestFor: "Applicants applying to 1-to-2 week conferences, summer institutes, or regional forums.",
    inclusions: [
      "1 Targeted Opportunity & Eligibility Assessment",
      "1 CV or Activity-Profile Comprehensive Review",
      "1 Motivation Letter feedback round",
      "Concise 5-step preparation action plan"
    ],
    exclusions: ["Undergraduate full degree applications", "Live mock interviews"]
  },
  {
    id: "application-builder",
    name: "Application Builder",
    price: 29,
    tagline: "Turn your lived experiences into high-impact application documents.",
    popular: true,
    bestFor: "Students who have good experiences but struggle to communicate them on paper.",
    inclusions: [
      "Complete CV Restructuring and strategic line-by-line editing",
      "Extracurricular activity presentation optimization (up to 8 activities)",
      "1 Personal Statement OR Motivation Letter deep review (2 rounds)",
      "Structured written feedback document with clear next steps"
    ],
    exclusions: ["Live interview simulations", "Multiple essay reviews"]
  },
  {
    id: "interview-ready",
    name: "Interview Ready",
    price: 25,
    tagline: "Build genuine poise, structured answers, and storytelling confidence.",
    popular: false,
    bestFor: "Shortlisted candidates invited to online or panel interviews.",
    inclusions: [
      "1 Interview Strategy & Question-Bank Session (30 mins)",
      "1 Full Mock Interview Simulation (30 mins live)",
      "Line-by-line answer critique and delivery feedback",
      "Practical improvement checklist and mindset guide"
    ],
    exclusions: ["Written essay editing", "CV rewriting"]
  },
  {
    id: "scholarship-starter",
    name: "Scholarship Starter",
    price: 25,
    tagline: "The essential foundation for your undergraduate international scholarship journey.",
    popular: false,
    bestFor: "High schoolers and gap-year students embarking on international scholarship search.",
    inclusions: [
      "Initial 20-minute profile diagnostic consultation",
      "Opportunity research & verified eligibility shortlist",
      "Customized 6-month scholarship preparation timeline",
      "Initial CV & academic presentation diagnostic review"
    ],
    exclusions: ["Final application audits", "Live mock interviews"]
  },
  {
    id: "scholarship-application-plus",
    name: "Scholarship Application Plus",
    price: 49,
    tagline: "Deep, multi-document mentorship for competitive undergraduate scholarship applications.",
    popular: true,
    bestFor: "Applicants applying to competitive government or university undergraduate scholarships.",
    inclusions: [
      "Comprehensive profile and opportunity alignment assessment",
      "Full CV Restructuring and strategic impact editing",
      "1 Personal Statement deep review with 2 rounds of edits",
      "1 Specific Scholarship Prompt Essay review (2 rounds)",
      "1 Live 45-minute Application Strategy consultation",
      "Final application readiness action checklist"
    ],
    exclusions: ["Mock interview (available as add-on or in Complete package)"]
  },
  {
    id: "complete-application-mentorship",
    name: "Complete Application Mentorship",
    price: 69,
    tagline: "End-to-end guidance from opportunity discovery to the final interview stage.",
    popular: false,
    bestFor: "Students wanting dedicated, continuous peer mentorship across every milestone.",
    inclusions: [
      "Initial Profile Assessment & Strategy Call (45 mins)",
      "Curated Opportunity Research & Eligibility Review",
      "Full CV Restructuring & Extracurricular Profile Optimization",
      "Personal Statement / Motivation Letter review (2 complete rounds)",
      "1 Scholarship Prompt Essay review (2 complete rounds)",
      "1 Full Live Mock Interview Simulation with detailed diagnostic rubric",
      "Final Pre-Submission Application Completeness Audit",
      "Direct follow-up messaging support during active application window"
    ],
    exclusions: ["Guarantee of scholarship outcome", "Unlimited unbounded revisions"]
  }
];

export const BUNDLES = [
  {
    id: "bundle-cv-essay",
    name: "CV + Essay Polish Bundle",
    price: 22,
    originalPrice: 25,
    savings: 3,
    description: "Combine full CV restructuring with a deep personal statement or motivation letter review.",
    includes: ["CV Restructuring & Editing ($15 value)", "Motivation Letter Strategic Review ($12 value)"]
  },
  {
    id: "bundle-review-mock",
    name: "Final Review + Mock Interview Bundle",
    price: 35,
    originalPrice: 40,
    savings: 5,
    description: "The complete final-stage combination: eagle-eye application audit plus a live simulated interview.",
    includes: ["Final Application Review ($20 value)", "Live Mock Interview with Rubric ($20 value)"]
  },
  {
    id: "bundle-starter-interview",
    name: "Scholarship Starter + Interview Preparation",
    price: 35,
    originalPrice: 40,
    savings: 5,
    description: "Lay the groundwork early and master the spoken articulation of your story.",
    includes: ["Scholarship Starter Package ($25 value)", "Interview Prep Strategy Session ($15 value)"]
  }
];
