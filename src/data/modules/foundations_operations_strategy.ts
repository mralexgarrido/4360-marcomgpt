import { StationModule } from '../../types';

export const stationsGroup1: StationModule[] = [
  {
    id: 'station-foundations',
    order: 1,
    category: 'foundations',
    title: 'AI Foundations: Welcome to the MarCom AI Desk',
    subtitle: 'Core Prompting, Grounding Boundaries, Iteration & Privacy Safety',
    umcRole: 'MarCom AI Onboarding & Standards',
    estimatedMinutes: 25,
    xpReward: 150,
    badgeId: 'prompt-architect',
    overview: 'Learn how to treat generative AI as a thought partner rather than an oracle. Master the 7-Part MarCom Prompt Canvas and discover why source boundaries are more important than prompt cleverness.',
    umcAlignment: 'Establishes division-wide standards for responsible generative AI use across all communications.',
    learningObjectives: [
      'Deconstruct prompts into the 7-Part MarCom Canvas (Outcome, Audience, Context, Sources, Constraints, Output, Verification)',
      'Distinguish creative brainstorming from factual verification',
      'Recognize why model confidence does not equal factual accuracy',
      'Understand enterprise data privacy vs personal workspace data usage'
    ],
    commonFailureModes: [
      'Assuming the first AI response is final',
      'Pasting private, FERPA, or unreleased embargoed data into non-enterprise AI tools',
      'Accepting fabricated citations or statistics without primary source validation'
    ],
    brief: {
      client: 'University Marketing & Communications Leadership',
      situation: 'A new undergraduate certificate in Applied AI for Communications has just been approved by the academic senate.',
      confirmedFacts: [
        'Certificate name: "Applied AI for Communications"',
        'Open to all enrolled undergraduate majors starting Fall semester',
        'Consists of 4 courses (12 credit hours total)',
        'Info session scheduled for Tuesday, Oct 14 at 4:00 PM via Zoom'
      ],
      unknownsOrRisks: [
        'Tuition discounts or scholarships have NOT yet been established',
        'Prerequisite course waivers must be reviewed individually by academic advising'
      ],
      goal: 'Draft a 120-word campus announcement for current students without inventing financial guarantees or waiver promises.'
    },
    promptChallenge: {
      id: 'challenge-foundations-1',
      title: 'The Grounded Announcement Prompt',
      instructions: 'Use the 7-Part Canvas to construct a prompt that produces an accurate, student-focused announcement grounded strictly in confirmed facts.',
      studentStarter: {
        outcome: 'Draft a 120-word student announcement about the new Applied AI for Communications certificate.',
        audience: 'Current undergraduate students seeking career-ready digital skills.',
        context: 'Senate approved 4-course certificate starting Fall; Zoom info session Oct 14 at 4 PM.',
        sources: 'Use ONLY the confirmed facts provided in the brief. Do not invent tuition discounts or waiver rules.',
        constraints: 'Maximum 120 words. Energetic, accessible, academic tone. Avoid marketing hype like "guaranteed six-figure jobs".',
        output: 'Heading, 2 short paragraphs, bulleted info session details with Zoom RSVP note.',
        verification: '1. Flag any detail not in confirmed facts. 2. Verify info session date and time.'
      },
      proStarter: {
        outcome: 'Draft a 120-word announcement and communication QA checklist.',
        audience: 'Current undergraduate students across diverse degree programs.',
        context: 'University senate approved 12-credit Applied AI certificate for Fall launch. Oct 14 info session.',
        sources: 'Strictly bounded to provided senate approval bulletin. Mark unverified details as TBD.',
        constraints: 'Length: 100-120 words. AP Style. No speculative promises regarding tuition or job placement.',
        output: 'Structured release format with lead, core facts, call-to-action, and verification footer.',
        verification: 'List all operational assumptions and identify required advising sign-offs.'
      },
      sampleHighScoringPrompt: {
        outcome: 'Draft a concise, 110-word student announcement and an advising Q&A snippet for the campus portal.',
        audience: 'Undergraduate students exploring modern digital communication credentials.',
        context: 'Academic senate officially approved the new 4-course Applied AI for Communications certificate launching Fall semester.',
        sources: 'Use exclusively the confirmed briefing facts. If questions arise regarding tuition aid or course waivers, instruct students to contact Academic Advising.',
        constraints: 'Max 120 words. Direct, encouraging tone. No speculative claims or unconfirmed financial aid promises.',
        output: 'Markdown formatted with: 1. Headline, 2. Summary body, 3. Event details bullets, 4. Advisor contact link.',
        verification: '1. List all assumptions made. 2. Check that no unapproved scholarship claims were inserted. 3. Confirm date/time format matches university style.'
      },
      copilotMappingExplanation: 'In Microsoft Copilot: Goal = Outcome; Context = Audience + Context; Expectations = Constraints + Output; Source = Approved Sources + Verification instructions.'
    },
    illustrativeOutputs: [
      {
        id: 'out-foundations-1',
        title: 'New Certificate Announcement Comparison',
        scenarioInput: 'Approved facts: 4 courses, 12 credits, Fall launch, Oct 14 info session. Unknown: Scholarships.',
        weakOutput: {
          text: 'Supercharge your career with our brand-new Applied AI for Communications certificate! Guaranteed to land you high-paying jobs in tech. All enrolled students receive a 50% tuition scholarship and all prerequisites are waived. Join our Zoom webinar Oct 14 at 4 PM!',
          flaws: [
            'Invented "guaranteed high-paying jobs" (unsupported hype)',
            'Hallucinated a "50% tuition scholarship" (untrue and dangerous)',
            'Falsely claimed "all prerequisites are waived" without advising approval',
            'Used generic banned buzzwords ("Supercharge your career")'
          ],
          explanation: 'The weak prompt lacked negative constraints and strict source boundaries, causing the model to fabricate financial promises and career guarantees.'
        },
        strongOutput: {
          text: 'Expand your digital storytelling toolkit with the new undergraduate certificate in Applied AI for Communications, officially launching this Fall.\n\nApproved by the Academic Senate, this 12-credit program (4 courses) equips students across all majors with hands-on experience in ethical, strategic AI tools for media, public relations, and marketing.\n\nWant to learn how the certificate fits your degree plan?\n• Virtual Info Session: Tuesday, Oct. 14 at 4:00 PM via Zoom\n• RSVP & Advising Details: [Portal Link]\n\n(Note: Specific course prerequisites and degree integration should be confirmed with your academic advisor.)',
          strengths: [
            '100% grounded in confirmed facts',
            'Zero hallucinated scholarships or salary guarantees',
            'Explicitly guides students to academic advising for prerequisites',
            'Professional, accessible, institutional tone'
          ],
          verificationChecklist: [
            'Confirmed Senate approval date verified against academic records',
            'Zoom link and room capacity checked prior to publishing',
            'Advising team notified before announcement distribution'
          ],
          explanation: 'The strong prompt used explicit source boundaries ("Use ONLY confirmed facts") and negative constraints, resulting in a trustworthy draft.'
        }
      }
    ],
    microgames: [
      {
        id: 'game-foundations-hallucination',
        type: 'hallucination_hunt',
        title: 'Hallucination Hunt: Detect the Fabrications',
        instruction: 'Review this AI-generated draft. Click on the 3 statements that are UNSUPPORTED by the approved brief.',
        snippetText: 'The university is proud to announce the Applied AI for Communications certificate launching this Fall. [CLAIM_1: All students receive a full state technology stipend of $500.] The 12-credit program comprises four courses. [CLAIM_2: The program guarantees immediate employment at top global ad agencies.] Join our virtual info session on Tuesday, Oct 14 at 4:00 PM. [CLAIM_3: No coursework is required for graduation.]',
        unsupportedClaims: [
          'All students receive a full state technology stipend of $500.',
          'The program guarantees immediate employment at top global ad agencies.',
          'No coursework is required for graduation.'
        ],
        feedbackIfCorrect: 'Brilliant detection! Unbounded generative models easily invent financial aid, guaranteed employment, and rule exemptions if not strictly constrained.',
        xpReward: 75
      }
    ],
    quiz: [
      {
        id: 'q-found-1',
        question: 'Why is setting "Source Boundaries" (e.g. "Use only the facts in this text") crucial when prompting for institutional communications?',
        options: [
          'It makes the model respond faster by reducing processing size',
          'It prevents the model from drawing on random or fabricated web data to fill informational gaps',
          'It is required by the ChatGPT terms of service for all educational users',
          'It automatically copyrights the output under university policy'
        ],
        correctIndex: 1,
        explanation: 'Without explicit source boundaries, generative models will fill gaps with plausible-sounding hallucinations, inventing dates, policies, or financial figures.'
      },
      {
        id: 'q-found-2',
        question: 'Under official OpenAI and Microsoft enterprise documentation, how does data handling in Enterprise/Edu accounts differ from standard personal accounts?',
        options: [
          'Enterprise/Edu data is never encrypted, whereas personal data is always encrypted',
          'Enterprise/Edu account prompts and outputs are not used to train foundation models by default',
          'Personal accounts have unlimited context length while Edu accounts do not',
          'There is no privacy difference between account tiers'
        ],
        correctIndex: 1,
        explanation: 'Both OpenAI and Microsoft state that enterprise/education tenant data is protected and not used to train underlying models by default, whereas personal free/plus tiers may use chat data unless explicitly opted out in settings.'
      }
    ]
  },
  {
    id: 'station-operations',
    order: 2,
    category: 'operations',
    title: 'Operations Control Room: Intake, Briefs & RACI',
    subtitle: 'Structuring Messy Requests, Workflow Governance & Accountability',
    umcRole: 'Marketing Operations & Client Services',
    estimatedMinutes: 25,
    xpReward: 175,
    badgeId: 'source-skeptic',
    overview: 'Learn how Marketing Operations transforms ambiguous, last-minute stakeholder emails into rigorous project briefs, RACI matrices, and scope boundaries using AI.',
    umcAlignment: 'Models UTRGV UMC Marketing Operations & Client Services: intake workflows, timelines, brand governance, and resource allocation.',
    learningObjectives: [
      'Use AI to extract deliverables, deadlines, and missing requirements from disorganized stakeholder emails',
      'Generate balanced RACI (Responsible, Accountable, Consulted, Informed) governance charts',
      'Craft polite, professional scope-clarification emails without accepting impossible deadlines'
    ],
    commonFailureModes: [
      'Letting AI guess missing project deadlines or budgets',
      'Failing to establish who has final approval authority before drafting',
      'Over-committing team resources based on vague stakeholder wishlists'
    ],
    brief: {
      client: 'Dr. Sarah Jenkins, Dean of Science',
      situation: 'Sent a frantic 3-sentence email asking for "a full campaign, video, brochures, billboards, and social ads" for next week\'s biology research symposium.',
      confirmedFacts: [
        'Event date: Next Friday (8 days away)',
        'Symposium theme: "Undergraduate Coastal Ecology Research"',
        'Venue: Science Building Atrium, 10:00 AM - 3:00 PM',
        'Budget: $0 additional advertising budget'
      ],
      unknownsOrRisks: [
        'No guest speaker list provided',
        'No registration link exists yet',
        'Turnaround time (8 days) is insufficient for printed billboards and video production'
      ],
      goal: 'Synthesize the request into an Operations Intake Brief and draft a diplomatic response setting realistic digital deliverables.'
    },
    promptChallenge: {
      id: 'challenge-ops-1',
      title: 'The Messy Intake Synthesizer',
      instructions: 'Create a prompt that turns the Dean\'s email into a structured intake brief, flags unfeasible items (billboards/video in 8 days with $0 budget), and generates 5 essential clarifying questions.',
      studentStarter: {
        outcome: 'Convert the stakeholder email into an Operations Intake Brief and list clarifying questions.',
        audience: 'UMC Project Manager and the Dean of Science.',
        context: 'Dean requested billboards, video, and brochures in 8 days with $0 ad budget for Biology Symposium.',
        sources: 'Use only the Dean\'s email details and standard UMC 2-week production lead time guidelines.',
        constraints: 'Polite, solution-oriented tone. Clearly mark billboards/print as out-of-scope for an 8-day turnaround.',
        output: '1. Project Summary, 2. Feasible Deliverables Table (Digital only), 3. Out-of-Scope Rationale, 4. Clarifying Questions list.',
        verification: 'Verify that zero budget is noted and no print guarantees are made.'
      },
      proStarter: {
        outcome: 'Generate project triage brief, feasibility assessment, and stakeholder response memo.',
        audience: 'College Leadership and Marketing Operations team.',
        context: 'High-urgency, zero-budget request received 8 business days prior to symposium.',
        sources: 'Standard operating procedure for tier-3 academic events. Restrict recommendations to digital channels.',
        constraints: 'Professional, assertive client management. Highlight resource constraints without being dismissive.',
        output: 'Executive triage memo with RACI chart and priority digital scope.',
        verification: 'Identify single point of approval and required registration asset dependencies.'
      },
      sampleHighScoringPrompt: {
        outcome: 'Produce an Operations Intake Brief, RACI Matrix, and a diplomatic stakeholder clarification email for a rushed event request.',
        audience: 'Marketing Operations Project Management and College Dean.',
        context: 'Request received 8 days before Biology Research Symposium with $0 budget requesting billboards, video, brochures, and digital ads.',
        sources: 'Rely strictly on provided timeline and standard university turnaround schedules (minimum 4 weeks for video/billboards).',
        constraints: 'Constructive and empathetic tone. Emphasize high-impact rapid digital tactics (portal news, digital signage, calendar event). Never commit to unfeasible physical print.',
        output: 'Markdown sections: 1. Scope Evaluation Table, 2. RACI Matrix, 3. Six Specific Missing Requirement Questions, 4. Ready-to-send Dean Email Draft.',
        verification: '1. Check that $0 budget constraint is respected. 2. Verify RACI designates one Accountable owner. 3. Ensure no unachievable promises.'
      },
      copilotMappingExplanation: 'Goal: Intake triage. Context: 8-day turnaround, academic symposium. Expectations: Digital-first feasible scope + RACI. Source: Stakeholder email text.'
    },
    illustrativeOutputs: [
      {
        id: 'out-ops-1',
        title: 'Intake Triage Comparison',
        scenarioInput: 'Dean requests billboards, 3-minute video, and social ads in 8 days with $0 budget.',
        weakOutput: {
          text: 'Dear Dean Jenkins, We will get right to work on your billboards, video shoot, and brochures! Our crew will film on Monday and install billboards by Thursday. Please send over your budget code.',
          flaws: [
            'Agreed to impossible 8-day billboard design and print lead times',
            'Committed video production team without checking availability',
            'Ignored the fact that there is $0 budget'
          ],
          explanation: 'Without operational constraints and knowledge of lead times, the model acted as a naive "yes-man".'
        },
        strongOutput: {
          text: 'Dear Dean Jenkins,\n\nThank you for reaching out regarding the Undergraduate Coastal Ecology Research Symposium. We are excited to help celebrate your students\' research.\n\nGiven the 8-day timeline and zero advertising budget, high-impact digital tactics will give you the fastest student turnout:\n• Recommended Scope (Delivered by Wednesday): Campus calendar feature, university homepage spotlight blurb, and digital signage across science building screens.\n• Out of Scope for this timeline: Printed billboards and full video production (which require 4–6 weeks).\n\nTo launch these digital assets, please confirm:\n1. Where is the student RSVP link hosted?\n2. Who is your designated student contact for event inquiries?\n3. Do you have 1–2 high-res photos from previous field research?',
          strengths: [
            'Diplomatic and solution-focused',
            'Protects team bandwidth and sets clear boundaries',
            'Provides immediate actionable digital alternatives',
            'Asks precise operational questions'
          ],
          verificationChecklist: [
            'Confirm digital signage slide dimensions (1920x1080)',
            'Check student portal publishing cutoff deadlines'
          ],
          explanation: 'Grounded in operational realities, this output turns a chaotic request into a controlled, successful mini-campaign.'
        }
      }
    ],
    microgames: [
      {
        id: 'game-ops-cardsort',
        type: 'card_sort',
        title: 'Brief Detective: Feasible vs Impossible Scope',
        instruction: 'Categorize these requested deliverables for an event 8 days away with $0 ad budget.',
        categories: ['Feasible Digital Scope (8 Days)', 'Requires 4+ Weeks Lead Time / Paid Budget'],
        cards: [
          { id: 'c1', text: 'Campus Digital Signage Screen Graphic', category: 'Feasible Digital Scope (8 Days)', explanation: 'Digital assets can be designed and deployed within 48-72 hours.' },
          { id: 'c2', text: 'Printed Highway Billboard Vinyl & Installation', category: 'Requires 4+ Weeks Lead Time / Paid Budget', explanation: 'Outdoor vinyl printing, permitting, and board leasing require weeks and substantial media budget.' },
          { id: 'c3', text: 'University Calendar & Daily Student Email Inclusion', category: 'Feasible Digital Scope (8 Days)', explanation: 'Internal digital channels have short editorial lead times.' },
          { id: 'c4', text: 'Full 3-Minute Cinematic Documentary Video with Voiceover', category: 'Requires 4+ Weeks Lead Time / Paid Budget', explanation: 'Video shooting, editing, color grading, sound mixing, and approvals take weeks.' }
        ],
        feedbackIfCorrect: 'Outstanding triage! Marketing Operations protects quality by directing urgency into fast digital channels.',
        xpReward: 80
      }
    ],
    quiz: [
      {
        id: 'q-ops-1',
        question: 'In a RACI project governance matrix for a university marketing campaign, what does the "A" (Accountable) represent?',
        options: [
          'Anyone who assists with writing copy',
          'The single individual with final decision authority and veto power over the deliverable',
          'The external advertising agency partner',
          'The audience member reading the brochure'
        ],
        correctIndex: 1,
        explanation: 'Accountable (A) is the sole individual who owns the final decision and outcome. Having multiple Accountable owners causes gridlock.'
      }
    ]
  },
  {
    id: 'station-strategy',
    order: 3,
    category: 'strategy',
    title: 'Strategy Lab: Objectives, Audiences & Hypotheses',
    subtitle: 'Campaign Architecture, Audience Personas vs Evidence & Experimentation',
    umcRole: 'Marketing Strategy & Innovation',
    estimatedMinutes: 30,
    xpReward: 200,
    badgeId: 'analytics-translator',
    overview: 'Master the art of translating institutional goals into testable audience hypotheses, strategic messaging pillars, and empirical marketing experiments.',
    umcAlignment: 'Models UTRGV UMC Marketing Strategy & Innovation: brand strategy, competitive positioning, data-driven campaigns, and marketing ROI.',
    learningObjectives: [
      'Formulate audience hypotheses while distinguishing assumptions from validated research',
      'Map SMART marketing objectives to measurable channel KPIs',
      'Design A/B message testing frameworks with clear learning goals'
    ],
    commonFailureModes: [
      'Treating AI-generated buyer personas as factual empirical research',
      'Confusing vanity metrics (impressions) with conversion objectives (enrolled applications)',
      'Designing campaigns without a control group or testable hypothesis'
    ],
    brief: {
      client: 'Vice President of Enrollment Management',
      situation: 'Transfer student applications from regional community colleges have plateaued over the past 2 years.',
      confirmedFacts: [
        'Target: Regional 2-year community college students with 30+ completed credits',
        'Top concern from historical focus groups: "Will my credits transfer smoothly?"',
        'Key institutional asset: New Online Credit Transfer Estimator Tool',
        'Campaign Timeline: 6-week spring recruitment push'
      ],
      unknownsOrRisks: [
        'Exact credit loss rates have not been published by degree program',
        'Do not claim that "100% of all credits are guaranteed to transfer" as some specialized credits may not'
      ],
      goal: 'Develop a strategic campaign brief with 3 distinct message hypotheses and an A/B experimentation plan.'
    },
    promptChallenge: {
      id: 'challenge-strat-1',
      title: 'The Evidence-Grounded Strategy Brief',
      instructions: 'Prompt the model to produce 3 audience message territories, distinguishing what is grounded in data versus what is a strategic hypothesis.',
      studentStarter: {
        outcome: 'Create 3 strategic messaging territories and an A/B test plan for transfer recruitment.',
        audience: 'Community college transfer candidates seeking degree completion with minimum credit loss.',
        context: 'Transfer applications plateaued; primary fear is credit transferability; we have a new Credit Estimator Tool.',
        sources: 'Ground strictly in focus group data (credit anxiety). Do NOT claim 100% transfer guarantees.',
        constraints: 'Focus on empowerment, transparency, and momentum. Include measurable conversion KPIs.',
        output: 'Table comparing: Strategy Territory, Core Hook, Supporting Evidence, Hypothesis to Validate, and Primary KPI.',
        verification: 'List which statements represent assumptions requiring survey validation.'
      },
      proStarter: {
        outcome: 'Develop comprehensive Campaign Strategy Canvas and Message Experimentation Matrix.',
        audience: 'Transfer student segment (working adults, first-generation, career changers).',
        context: 'Regional 2-year college transfer plateau. Campaign goal: increase completed transfer applications by 12%.',
        sources: 'Historical focus group findings and degree audit tool documentation.',
        constraints: 'Zero false guarantees. Emphasize seamless trajectory and self-service credit transparency.',
        output: 'Strategy Canvas (Objectives, Audience Segments, Value Props, Testing Roadmap).',
        verification: 'Separate verified institutional data from strategic hypotheses.'
      },
      sampleHighScoringPrompt: {
        outcome: 'Develop a 6-week Campaign Strategy Brief and Message Testing Matrix for undergraduate transfer recruitment.',
        audience: 'Regional community college students with 30–60 credits who value credit efficiency and transparent degree pathways.',
        context: 'Transfer inquiries are steady but application conversion has stalled. Focus group findings show credit loss anxiety is the #1 friction point.',
        sources: 'Use only confirmed facts: availability of the Online Credit Transfer Estimator and verified focus group insights. Never state all credits transfer unconditionally.',
        constraints: 'Tone: encouraging, pragmatic, and clear. Avoid vague slogans ("Reach your potential"). Focus on time-to-degree and cost savings.',
        output: 'Markdown table: 1. Message Angle (Credit Clarity vs Career Speed vs Community Belonging), 2. Target Persona Hypothesis, 3. Sample Headline, 4. Validation Metric (Estimator tool uses vs Started Apps).',
        verification: '1. Explicitly label each audience insight as "Hypothesis needing validation" vs "Empirically confirmed". 2. Check for absence of false credit transfer guarantees.'
      },
      copilotMappingExplanation: 'Goal: Strategy brief & testing matrix. Context: Transfer student application plateau. Expectations: Structured comparison table with hypotheses labeled. Source: Provided focus group summary.'
    },
    illustrativeOutputs: [
      {
        id: 'out-strat-1',
        title: 'Strategy Hypotheses Comparison',
        scenarioInput: 'Transfer student credit fear. Goal: 3 message territories with testing plan.',
        weakOutput: {
          text: 'Our research proves that transfer students love our university because we transfer 100% of every single credit without exception! Strategy 1: "We are the best!" Strategy 2: "Transfer now!" Strategy 3: "College is fun!" We will run Instagram ads and measure success by total likes.',
          flaws: [
            'Falsely claimed "research proves" and fabricated a 100% credit guarantee',
            'Generic, unhelpful strategy slogans ("We are the best")',
            'Relied on vanity metrics (Instagram likes) rather than enrollment conversion'
          ],
          explanation: 'The weak prompt failed to ask the model to separate hypotheses from facts or specify conversion metrics.'
        },
        strongOutput: {
          text: '### Campaign Strategy Canvas: "Keep Your Momentum"\n\n**Strategic Objective:** Increase completed transfer applications by 12% by removing credit-transfer friction.\n\n**Messaging Territories (To Be Tested):**\n1. **"Credit Transparency" (Confidence Angle)**\n   • Hook: "See how your credits count in 60 seconds."\n   • Call to Action: Try the Online Credit Transfer Estimator.\n   • Primary KPI: Estimator completions & inquiry form submissions.\n\n2. **"Time & Cost Efficiency" (Pragmatic Angle)**\n   • Hook: "Don\'t repeat classes you\'ve already passed. Finish your bachelor\'s faster."\n   • Call to Action: Upload unofficial transcript for credit evaluation.\n   • Primary KPI: Transcript upload rate.\n\n3. **"Pathway Support" (Guidance Angle)**\n   • Hook: "A dedicated transfer advisor before you even apply."\n   • Call to Action: Book a 15-minute transfer advising chat.\n   • Primary KPI: Advising appointment bookings.\n\n*(Note: All three value propositions will be A/B tested across digital display and search to validate which angle drives highest qualified application completion.)*',
          strengths: [
            'Clear testable hypotheses mapped to real business conversion actions',
            'No fabricated guarantees; respects academic policy nuances',
            'Replaces vanity metrics with meaningful funnel actions (estimator uses, appointments)'
          ],
          verificationChecklist: [
            'Admissions credit evaluation team confirms capacity to handle transcript volume',
            'Estimator tool URL and mobile responsiveness tested before campaign launch'
          ],
          explanation: 'The strong output provides genuine strategic structure, treating marketing as a scientific discipline of hypothesis testing.'
        }
      }
    ],
    microgames: [
      {
        id: 'game-strat-causality',
        type: 'causality_trap',
        title: 'The Persona Myth Detector',
        instruction: 'Evaluate these 4 statements. Separate the empirically supported facts from unvalidated AI assumptions.',
        categories: ['Verified Fact (Grounding)', 'Unvalidated Persona Assumption (Hypothesis)'],
        cards: [
          { id: 'p1', text: 'Focus groups showed prospective transfers worry most about losing credits.', category: 'Verified Fact (Grounding)', explanation: 'Explicitly documented in university focus group reports.' },
          { id: 'p2', text: 'All transfer students prefer video ads over email because they have 8-second attention spans.', category: 'Unvalidated Persona Assumption (Hypothesis)', explanation: 'A classic unvalidated pop-psychology stereotype generated by AI.' },
          { id: 'p3', text: 'The university launched a self-service Online Credit Estimator tool.', category: 'Verified Fact (Grounding)', explanation: 'Verified institutional technology asset.' },
          { id: 'p4', text: 'Transfer students never check campus physical bulletin boards.', category: 'Unvalidated Persona Assumption (Hypothesis)', explanation: 'An absolute claim unsupported by empirical campus movement data.' }
        ],
        feedbackIfCorrect: 'Excellent discernment! Never confuse plausible-sounding AI persona descriptions with real empirical audience research.',
        xpReward: 85
      }
    ],
    quiz: [
      {
        id: 'q-strat-1',
        question: 'When an AI assistant produces detailed user personas with names, daily routines, and favorite brands, how should a marketing strategist treat that information?',
        options: [
          'As validated primary research ready for immediate client presentation',
          'As synthetic brainstorming hypotheses that must be validated with real customer research data',
          'As legally binding consumer profiles under privacy law',
          'As a replacement for all future surveys and focus groups'
        ],
        correctIndex: 1,
        explanation: 'Generative AI creates synthetic archetypes based on training associations, not real-time customer data. They are creative hypotheses, not empirical research.'
      }
    ]
  }
];
