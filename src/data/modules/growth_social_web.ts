import { StationModule } from '../../types';

export const stationsGroup2: StationModule[] = [
  {
    id: 'station-growth',
    order: 4,
    category: 'growth',
    title: 'Digital Growth Lab: Intent, Search & Funnels',
    subtitle: 'Search Intent Architecture, The SEO Museum & Funnel Diagnostics',
    umcRole: 'Digital Marketing & Analytics',
    estimatedMinutes: 30,
    xpReward: 200,
    badgeId: 'analytics-translator',
    overview: 'Learn modern search intent mapping, create high-converting landing page frameworks, and diagnose funnel drop-offs without falling into the "Causality Trap" or obsolete SEO folklore.',
    umcAlignment: 'Models UTRGV UMC Digital Marketing: paid digital advertising, search discoverability, landing page optimization, and campaign analytics.',
    learningObjectives: [
      'Map audience search intent (informational, navigational, commercial, transactional) rather than stuffing obsolete "LSI keywords"',
      'Draft conversion-focused landing page copy with clear value hierarchies',
      'Distinguish observed analytical metrics (correlation) from unverified causal assumptions'
    ],
    commonFailureModes: [
      'Believing outdated SEO myths (e.g. repeating keywords 5 times for algorithm ranking)',
      'Assuming that a drop in conversion rate was caused by one single factor without controlled testing',
      'Writing clickbait ad copy that does not match the destination page experience'
    ],
    brief: {
      client: 'Graduate College Admissions',
      situation: 'Paid search campaign for the Master of Science in Health Informatics generated 4,000 ad clicks but only 45 completed inquiries (1.1% conversion).',
      confirmedFacts: [
        'Ad headline: "Fast-Track Online MS in Health Informatics - Apply Today"',
        'Landing page: Sends users to the general College of Health Affairs faculty directory page',
        'Mobile traffic represents 74% of all ad clicks',
        'Average mobile page load time for the faculty directory is 5.8 seconds'
      ],
      unknownsOrRisks: [
        'User demographic breakdown of who clicked has not been segmented by healthcare experience',
        'Do not assume users "dislike the curriculum" without qualitative exit survey data'
      ],
      goal: 'Diagnose the funnel leakage using empirical observations, formulate 3 diagnostic hypotheses, and draft a dedicated high-converting mobile landing page outline.'
    },
    promptChallenge: {
      id: 'challenge-growth-1',
      title: 'The Funnel Detective & Intent Architect',
      instructions: 'Prompt the model to analyze the funnel drop-off, separate observed facts from hypotheses, and produce a dedicated landing page copy structure matching the search intent.',
      studentStarter: {
        outcome: 'Analyze funnel drop-off and draft a dedicated mobile-friendly landing page wireframe.',
        audience: 'Working healthcare professionals seeking career advancement via an online master\'s.',
        context: '4,000 clicks, 1.1% conversion. Ad promises "Online MS", landing page is slow general faculty directory.',
        sources: 'Use confirmed analytics facts (mobile %, load time, disconnect between ad and page).',
        constraints: 'Separate observed data from hypotheses. Do not make unsubstantiated claims about user psychology.',
        output: '1. Funnel Diagnostic (Observations vs Hypotheses), 2. Proposed Landing Page Structure (Hero, Value Pillars, Curriculum, Mobile Lead Form).',
        verification: 'Flag any causal claim that requires A/B test validation.'
      },
      proStarter: {
        outcome: 'Produce a comprehensive Funnel Audit, Search Intent Matrix, and High-Intent Landing Page Copy Plan.',
        audience: 'Healthcare practitioners evaluating flexible graduate credentials.',
        context: 'Severe message-match and mobile friction in paid search funnel. 4k clicks, 45 leads.',
        sources: 'Ad copy specs, Google Search Essentials principles, and mobile analytics telemetry.',
        constraints: 'Zero SEO folklore (no keyword stuffing). People-first, informative copy.',
        output: 'Audit findings, Intent mapping table, and modular landing page copy with form microcopy.',
        verification: 'Verify that technical speed and message-match recommendations are backed by the data.'
      },
      sampleHighScoringPrompt: {
        outcome: 'Conduct a digital marketing funnel autopsy and construct a dedicated search-intent landing page copy blueprint for an online MS in Health Informatics.',
        audience: 'Mid-career healthcare professionals (nurses, IT analysts, clinic managers) searching for flexible, accredited graduate programs.',
        context: 'Paid search campaign generated 4,000 clicks but only 1.1% conversion. The ad sent 74% mobile users to an un-optimized, 5.8s slow general faculty directory.',
        sources: 'Ground analysis strictly in Google Search Essentials and the supplied analytics data. Do not use outdated "LSI keyword density" concepts.',
        constraints: 'Maintain clear distinction between "Observed Metrics" and "Plausible Hypotheses". Tone: professional, empowering, academically rigorous.',
        output: 'Structured Markdown: 1. Funnel Leakage Matrix (Observation -> Root Cause Hypothesis -> Remediation), 2. Search Intent Map, 3. Mobile-First Landing Page Content Modules with clear CTAs.',
        verification: '1. List assumptions regarding user intent. 2. Verify all recommended KPIs are measurable via standard analytics. 3. Check for absence of causal overreach.'
      },
      copilotMappingExplanation: 'Goal: Funnel autopsy & landing page copy. Context: Healthcare professional recruitment, mobile ad traffic. Expectations: Diagnostic table + conversion wireframe. Source: Campaign analytics summary.'
    },
    illustrativeOutputs: [
      {
        id: 'out-growth-1',
        title: 'Funnel Diagnostic Comparison',
        scenarioInput: '4,000 ad clicks -> slow faculty page -> 1.1% conversion.',
        weakOutput: {
          text: 'The problem is that today\'s generation doesn\'t want to study health informatics anymore! To fix your SEO, you must insert the keyword "best health informatics degree online cheap" 18 times into the footer to manipulate the algorithm. Here is a landing page with lots of glitter emojis!',
          flaws: [
            'Falsely claimed broad societal disinterest without evidence (the Causality Trap)',
            'Recommended obsolete, penalty-inducing keyword stuffing ("insert 18 times")',
            'Completely ignored the obvious technical friction (5.8s mobile load time, wrong destination URL)'
          ],
          explanation: 'The weak output fell into classic SEO folklore and psychological speculation rather than diagnosing the actual digital friction.'
        },
        strongOutput: {
          text: '### Funnel Diagnostic & Remediation Plan\n\n**1. Observed Data vs. Diagnostic Hypotheses:**\n• **Observation A:** 74% of ad traffic is mobile, arriving at a page taking 5.8 seconds to load.\n  *Hypothesis:* Severe mobile bounce rate prior to content rendering.\n• **Observation B:** Ad promised "Fast-Track Online MS", but destination URL is the "Faculty Directory".\n  *Hypothesis:* Critical message mismatch—users expected program requirements and tuition, but found staff bios.\n\n**2. Proposed Landing Page Structure (Search-Intent Matched):**\n• **Hero:** "Advance Your Healthcare Career with an Online MS in Health Informatics" (Clear value prop)\n• **Key Facts Bar:** 100% Online | 18-24 Month Completion | GRE Waived for Healthcare Pros\n• **Curriculum Snapshot:** 3 core specialization tracks in Health Data Analytics\n• **Mobile-Optimized Form:** 3 fields only (Name, Email, Highest Degree) with instant brochure download\n\n**3. Search Intent Alignment:**\nTargets high-intent queries ("online health informatics masters accredited") by answering tuition, duration, and admissions criteria directly.',
          strengths: [
            'Rigorously separates empirical observations from hypotheses',
            'Solves the actual user pain points (message-match, mobile speed, clear CTA)',
            'Adheres to Google Search Essentials: people-first, useful, transparent'
          ],
          verificationChecklist: [
            'Page speed verified via Google PageSpeed Insights (target < 2.0s mobile)',
            'Form submission webhook integrated into CRM lead routing'
          ],
          explanation: 'The strong output diagnoses the root cause of conversion leakage and produces a search-intent aligned landing page.'
        }
      }
    ],
    microgames: [
      {
        id: 'game-growth-museum',
        type: 'card_sort',
        title: 'The SEO Museum vs Modern Search Practice',
        instruction: 'Sort these digital search tactics into Modern Best Practice (Google Search Essentials) or The SEO Museum (Outdated Folklore).',
        categories: ['Modern Best Practice (Search Essentials)', 'The SEO Museum (Outdated / Harmful)'],
        cards: [
          { id: 's1', text: 'Structure content to satisfy the specific search intent and questions of prospective students', category: 'Modern Best Practice (Search Essentials)', explanation: 'Modern search engines prioritize content that directly answers user queries with clarity and authority.' },
          { id: 's2', text: 'Artificially repeat "LSI keywords" at an exact 3.5% density throughout the body text', category: 'The SEO Museum (Outdated / Harmful)', explanation: 'Keyword density quotas and pseudo-scientific "LSI" tricks are outdated folklore that harm readability.' },
          { id: 's3', text: 'Ensure fast mobile page load times and accessible headings (H1, H2, descriptive alt text)', category: 'Modern Best Practice (Search Essentials)', explanation: 'Technical performance, mobile usability, and clean semantic structure are core ranking and user experience factors.' },
          { id: 's4', text: 'Generate 500 near-duplicate auto-spun blog posts to flood search rankings', category: 'The SEO Museum (Outdated / Harmful)', explanation: 'Violates search spam policies regarding scaled unoriginal content.' }
        ],
        feedbackIfCorrect: 'Spectacular sorting! You have banished obsolete SEO folklore to the museum and embraced user-first search intent.',
        xpReward: 90
      }
    ],
    quiz: [
      {
        id: 'q-growth-1',
        question: 'According to Google\'s official guidance on AI-generated content, what is Google\'s stance on using AI for marketing content?',
        options: [
          'All AI-generated content is automatically penalized and de-indexed',
          'Google rewards high-quality, people-first content regardless of whether it is produced by humans or AI, while penalizing content made purely to manipulate search rankings',
          'AI may only be used if every sentence contains an academic citation',
          'AI content is given preferential higher ranking over human writing'
        ],
        correctIndex: 1,
        explanation: 'Google\'s published policy explicitly focuses on the quality and usefulness of the content for human readers (E-E-A-T), not on the specific tools used to generate it.'
      }
    ]
  },
  {
    id: 'station-social',
    order: 5,
    category: 'social',
    title: 'Social Mission Control: Remix, Triage & Alt-Text',
    subtitle: 'Channel Adaptation, Community Escalation Matrix & Accessibility',
    umcRole: 'Social Media Strategy & Engagement',
    estimatedMinutes: 25,
    xpReward: 175,
    badgeId: 'channel-shapeshifter',
    overview: 'Learn how to adapt approved institutional announcements across LinkedIn, Instagram, and X without semantic drift, craft accessible image alt text, and triage social comments.',
    umcAlignment: 'Models UTRGV UMC Social Media: platform best practices, storytelling, brand standards, accessibility, and community engagement.',
    learningObjectives: [
      'Remix core messages for different social platforms while maintaining 100% factual fidelity',
      'Compose accurate, descriptive image alt text following WCAG 2.2 accessibility standards',
      'Classify community comments into: Routine Answer, Triage/Escalate, or No-Response Required'
    ],
    commonFailureModes: [
      'Using informal slang that erodes institutional credibility in sensitive topics',
      'Writing lazy alt text (e.g. "image of students") that fails screen-reader users',
      'Letting AI engage in heated political or controversial arguments in social replies'
    ],
    brief: {
      client: 'University Research & Social Media Lead',
      situation: 'University robotics team just won 1st place in the International Maritime Robotics Championship in San Diego.',
      confirmedFacts: [
        'Robotics team name: "Vaquero Autonomous Underwater Vehicle Team"',
        'Competition: RoboSub International, San Diego, CA',
        'Achievement: 1st Place overall against 42 global university teams',
        'Key innovation: Custom AI sonar navigation algorithm developed by undergraduate students'
      ],
      unknownsOrRisks: [
        'Cash prize amount was not officially disclosed in the press release',
        'Avoid making claims that "this proves we have the best engineering school in the entire world"'
      ],
      goal: 'Create an adapted multi-channel social campaign package (LinkedIn, Instagram, X) with WCAG alt-text and community response guidelines.'
    },
    promptChallenge: {
      id: 'challenge-social-1',
      title: 'The Multi-Channel Remix Prompt',
      instructions: 'Prompt the model to adapt the robotics victory across LinkedIn, Instagram, and X, including character counts, hashtag rules, and detailed descriptive alt text for the trophy photo.',
      studentStarter: {
        outcome: 'Adapt the robotics championship win into posts for LinkedIn, Instagram, and X with alt-text.',
        audience: 'LinkedIn: alumni and industry partners; Instagram: current and prospective students; X: tech media.',
        context: 'Robotics team won 1st place at RoboSub San Diego against 42 universities with an AI sonar algorithm.',
        sources: 'Use only confirmed facts. Do not invent cash prize figures.',
        constraints: 'LinkedIn: professional/analytical tone; Instagram: celebratory/visual; X: concise with #RoboSub. Alt text must be descriptive.',
        output: 'Three labeled social copy blocks with hashtags and an "Accessibility Alt-Text" field for each.',
        verification: 'Check that 1st place and 42 teams are accurately stated without hyperbole.'
      },
      proStarter: {
        outcome: 'Produce a Social Distribution Package with platform-specific storytelling and accessibility metadata.',
        audience: 'Cross-platform institutional stakeholders (prospective students, corporate donors, tech recruiters).',
        context: 'Vaquero Autonomous Underwater Vehicle Team won RoboSub international championship.',
        sources: 'Official team press release. Zero speculative claims regarding unreleased prize funds.',
        constraints: 'Respect platform constraints (character limits, hashtag density, visual hook hierarchy).',
        output: 'Distribution table with channel, hook, body, CTA, character count, and WCAG-compliant alt text.',
        verification: 'Ensure factual claims remain identical across all channel variations.'
      },
      sampleHighScoringPrompt: {
        outcome: 'Create an integrated social media launch kit (LinkedIn, Instagram, and X posts) with WCAG-compliant alt-text and a comment triage guide for an international robotics championship win.',
        audience: 'Segmented: 1. LinkedIn: Engineering industry recruiters & alumni, 2. Instagram: High-school & college students, 3. X: STEM journalists & tech community.',
        context: 'The Vaquero Autonomous Underwater Vehicle Team won 1st Place at the RoboSub International Championship in San Diego, beating 42 international university teams with a custom AI sonar navigation system.',
        sources: 'Use only the verified victory facts. Do not invent prize dollar amounts or make unsupported claims about international rankings.',
        constraints: 'Tailor voice to each platform: LinkedIn (innovation & workforce readiness), Instagram (student pride & behind-the-scenes), X (breaking news & tech specs). Include 2–3 relevant hashtags per post.',
        output: 'Markdown formatted sections for: 1. LinkedIn Post, 2. Instagram Caption, 3. X/Twitter Post, 4. Comprehensive Image Alt-Text description, 5. 3-tier Community Comment Response Matrix.',
        verification: '1. Verify character counts fit platform limits. 2. Ensure image alt text conveys who, what, where, and visual emotional context without keyword stuffing.'
      },
      copilotMappingExplanation: 'Goal: Social media adaptation kit. Context: International robotics championship victory. Expectations: Platform-tailored copy + WCAG alt text. Source: Official press release facts.'
    },
    illustrativeOutputs: [
      {
        id: 'out-social-1',
        title: 'Social Remix & Alt-Text Comparison',
        scenarioInput: 'Robotics team wins RoboSub championship in San Diego against 42 teams.',
        weakOutput: {
          text: 'POST: We won! Best engineering school on earth! We won $1,000,000 in cash! Check us out! #Winner #Money #Best #AI #Tech #Genius #Viral\nALT TEXT: Picture of students with a robot.',
          flaws: [
            'Fabricated a "$1,000,000 cash prize" out of thin air',
            'Unjustified superlative claim ("Best engineering school on earth")',
            'Hashtag spam that looks amateurish and harms accessibility',
            'Useless 6-word alt text that gives no meaningful description to blind or low-vision users'
          ],
          explanation: 'The weak prompt lacked channel differentiation, negative constraints, and accessibility requirements.'
        },
        strongOutput: {
          text: '### LinkedIn (Focus: Engineering Talent & Workforce Impact)\nWorld champions in maritime autonomous robotics. 🌊🤖\n\nCongratulations to the Vaquero Autonomous Underwater Vehicle Team for taking 1st Place overall at the 2026 RoboSub International Championship in San Diego, competing against 42 university teams from around the globe.\n\nThe team\'s breakthrough? A custom AI-driven sonar navigation algorithm engineered entirely by undergraduate researchers to autonomously map deep-water obstacles in real time.\n\nRead the full engineering spotlight: [Link]\n#STEM #Engineering #AutonomousRobotics #HigherEd #HigherEdInnovation\n\n---\n### Image Accessibility Alt-Text (WCAG 2.2 Standard):\n"Six smiling undergraduate engineering students—four men and two women wearing navy blue university robotics polo shirts—gather outdoors on a sunny day in San Diego holding the golden 1st Place RoboSub Championship trophy alongside their yellow autonomous submarine robot mounted on a display stand."',
          strengths: [
            'Sophisticated tone matched to LinkedIn professional audience',
            'Factual precision (names algorithm, gives accurate competitor count)',
            'Rich, descriptive, non-redundant WCAG-compliant alt text',
            'Strategic, curated hashtags'
          ],
          verificationChecklist: [
            'Team member names and pronouns checked with robotics faculty advisor',
            'Photo rights and student photo releases verified'
          ],
          explanation: 'The strong output elevates the university\'s reputation while setting a gold standard for accessibility and factual fidelity.'
        }
      }
    ],
    microgames: [
      {
        id: 'game-social-alttext',
        type: 'alt_text_clinic',
        title: 'Alt-Text Clinic: Choose the Accessible Description',
        instruction: 'Select the best alt text description for an Instagram photo of the university president shaking hands with the student government president during commencement.',
        cards: [
          { id: 'a1', text: 'Photo of people at graduation. #President #Graduation #Success', category: 'Weak', isCorrect: false, explanation: 'Never include hashtags or redundant phrases like "photo of" in alt text; it provides zero contextual detail.' },
          { id: 'a2', text: 'President Martinez, in black academic regalia with orange doctoral hood, warmly shakes hands with Student Government President Elena Torres on the outdoor commencement stage as Torres holds her diploma binder.', category: 'WCAG Gold Standard', isCorrect: true, explanation: 'Perfect! Identifies key subjects, attire, action, setting, and emotional context concisely.' },
          { id: 'a3', text: 'Best university president in Texas congratulating smartest student leader ever.', category: 'Weak', isCorrect: false, explanation: 'Subjective promotional opinion rather than an objective visual description.' }
        ],
        feedbackIfCorrect: 'Masterful accessibility! Great alt text describes the essential visual facts and setting without editorial fluff or hashtag clutter.',
        xpReward: 85
      }
    ],
    quiz: [
      {
        id: 'q-social-1',
        question: 'When adapting a single approved news story across LinkedIn and Instagram, what must remain identical across all versions?',
        options: [
          'The exact character count and hashtag list',
          'The core factual claims, data points, and confirmed quotes',
          'The visual layout and font size',
          'The emojis used in the opening sentence'
        ],
        correctIndex: 1,
        explanation: 'While tone, hook, and formatting are adapted for the platform audience, the underlying factual truth, statistics, and institutional quotes must never distort or drift.'
      }
    ]
  },
  {
    id: 'station-web',
    order: 6,
    category: 'web_ux',
    title: 'Web & UX Clinic: Hierarchy, IA & Accessibility',
    subtitle: 'Information Architecture, UX Heuristics vs Claims & Web Rewriting',
    umcRole: 'Web Strategy & Design',
    estimatedMinutes: 30,
    xpReward: 200,
    badgeId: 'accessibility-ally',
    overview: 'Learn how to use AI to audit page hierarchy, synthesize user task flows, rewrite dense academic text into scannable plain-language web copy, and conduct WCAG accessibility reviews.',
    umcAlignment: 'Models UTRGV UMC Web Strategy & Design: information architecture, content strategy, user experience, search optimization, and web accessibility standards.',
    learningObjectives: [
      'Deconstruct dense academic web pages into clear, task-oriented information architecture (IA)',
      'Rewrite jargon-heavy program descriptions into plain-language, scannable web modules',
      'Differentiate between UX heuristic hypotheses and validated empirical usability test results'
    ],
    commonFailureModes: [
      'Claiming that "users love this layout" without actual user testing data',
      'Generating giant walls of text that violate web scanning behaviors',
      'Skipping heading hierarchy (jumping from H1 directly to H3 or H4)'
    ],
    brief: {
      client: 'Financial Aid & Scholarships Office',
      situation: 'The "Emergency Student Grants" web page is a single 1,400-word paragraph of bureaucratic legal text with a 42% exit rate and hundreds of confused student phone calls.',
      confirmedFacts: [
        'Grant eligibility: Enrolled undergraduate and graduate students with unexpected financial hardship',
        'Maximum award: $1,500 per academic year',
        'Application processing time: 3-5 business days',
        'Required documentation: Proof of hardship (e.g. medical bill, car repair invoice, job loss notice)'
      ],
      unknownsOrRisks: [
        'Funds are limited on a first-come, first-served basis per semester',
        'Do not promise automatic approval for every applicant'
      ],
      goal: 'Restructure the emergency grant page into an accessible, scannable, mobile-optimized UX layout with FAQ accordion copy.'
    },
    promptChallenge: {
      id: 'challenge-web-1',
      title: 'The Web UX Content Architect',
      instructions: 'Prompt the model to restructure the 1,400-word legal text into a scannable, student-centered web page with clear task hierarchy, plain language, and WCAG accessibility considerations.',
      studentStarter: {
        outcome: 'Restructure the emergency grant web page into a scannable, student-friendly layout.',
        audience: 'Stressed university students facing unexpected financial emergencies.',
        context: 'Current page is 1,400 words of dense text; students call confused; grant provides up to $1,500.',
        sources: 'Use only confirmed facts: $1,500 max, 3-5 day turnaround, required proof of hardship.',
        constraints: 'Plain language (8th-grade reading level), clear H1/H2 headings, bulleted steps, no bureaucratic jargon.',
        output: '1. Page Wireframe Outline (Hero, 3 Step Process, Eligibility Checklist, FAQ), 2. Action CTA button copy.',
        verification: 'Verify that funds limitations and documentation requirements are transparently stated.'
      },
      proStarter: {
        outcome: 'Conduct UX Content Audit and deliver an accessible Information Architecture Blueprint.',
        audience: 'Diverse student body navigating acute financial stress.',
        context: 'High bounce rate and call center overload on legacy emergency grant web page.',
        sources: 'Financial aid policy guidelines. Follow Nielsen Norman Group web readability principles.',
        constraints: 'WCAG 2.2 AA compliant structure. Logical heading nesting (H1 -> H2 -> H3). Plain language.',
        output: 'Content model with microcopy, progressive disclosure accordions, and screen-reader guidance.',
        verification: 'Separate heuristic UX best practices from empirical usability testing claims.'
      },
      sampleHighScoringPrompt: {
        outcome: 'Redesign the Information Architecture and draft modular web copy for the Student Emergency Relief Grant web page to reduce cognitive load and simplify task completion.',
        audience: 'Enrolled students experiencing immediate financial distress who need fast, clear answers on eligibility, deadlines, and documentation.',
        context: 'Legacy page is a 1,400-word block of dense regulatory text causing high bounce rates and overwhelming the financial aid phone lines.',
        sources: 'Ground copy exclusively in approved financial aid facts: maximum $1,500/year, 3–5 day processing, required hardship proof, subject to funding availability.',
        constraints: 'Follow web readability best practices: 8th-grade reading level, chunked bullet lists, bolded action verbs, clear hierarchical headings (H1, H2, H3), and prominent primary CTA.',
        output: 'Markdown layout: 1. Page Title & Hero Hook, 2. "How It Works in 3 Steps", 3. Eligibility & Documentation Checklist, 4. 4-question FAQ Accordion, 5. Accessibility Implementation Notes.',
        verification: '1. Flag any assumption regarding student eligibility. 2. Verify all headings follow strict hierarchical order without skipping levels. 3. Confirm that no false guarantee of approval is implied.'
      },
      copilotMappingExplanation: 'Goal: Web page UX rewrite & IA blueprint. Context: Stressed students seeking emergency grants. Expectations: Scannable plain-language layout with accordions. Source: Financial aid policy brief.'
    },
    illustrativeOutputs: [
      {
        id: 'out-web-1',
        title: 'Web UX Rewrite Comparison',
        scenarioInput: '1,400 words of legal text for $1,500 emergency student grant.',
        weakOutput: {
          text: 'PURSUANT TO SECTION 402(A) OF THE INSTITUTIONAL CONTINGENCY CODE: Students requiring fiscal remediation must submit comprehensive documentation regarding unexpected pecuniary distress. Failure to provide complete sub-clauses will result in immediate voiding of petition. Everyone who applies will receive instant free cash with zero questions asked!',
          flaws: [
            'Intimidating bureaucratic jargon ("pecuniary distress", "fiscal remediation")',
            'Terrifying wall-of-text formatting with zero visual scanning cues',
            'Hallucinated contradiction: promises "instant free cash with zero questions asked"'
          ],
          explanation: 'The weak prompt failed to enforce plain-language readability, structural headings, or accuracy constraints.'
        },
        strongOutput: {
          text: '### Emergency Relief Grants for Students\n*Need unexpected financial help? The university provides one-time emergency grants of up to $1,500 to help you stay enrolled during life emergencies.*\n\n**[ Apply for Emergency Grant (Online Form) ]** *(Primary Button)*\n\n---\n\n### How It Works in 3 Steps\n1. **Check Eligibility:** Open to all currently enrolled undergraduate and graduate students experiencing sudden hardship.\n2. **Gather Documentation:** Have a digital copy of your expense ready (e.g., medical bill, auto repair invoice, or utility past-due notice).\n3. **Submit & Review:** Complete the 5-minute online form. Our financial aid team reviews applications within **3 to 5 business days**.\n\n---\n\n### Frequently Asked Questions\n**Q: Do I have to repay this grant?**\nA: No. Emergency relief grants are financial aid awards, not loans, and do not need to be repaid.\n\n**Q: Is funding guaranteed?**\nA: Grants are awarded on a rolling, first-come basis depending on available institutional emergency funds.',
          strengths: [
            'Empathetic, clear, and scannable (8th-grade reading level)',
            'Numbered step progression reduces student cognitive load',
            'Transparently answers top questions (repayment, turnaround time, funding limits)',
            'Actionable primary CTA placed above the fold'
          ],
          verificationChecklist: [
            'Check online application form link functionality',
            'Confirm current semester emergency fund balance with VP of Finance'
          ],
          explanation: 'The strong output converts an intimidating bureaucratic obstacle into an accessible, supportive student service page.'
        }
      }
    ],
    microgames: [
      {
        id: 'game-web-cardsort',
        type: 'card_sort',
        title: 'IA Card Sort: Organize the Student Portal',
        instruction: 'Categorize these 4 links under their proper parent navigation section on the university website.',
        categories: ['Admissions & Aid', 'Student Life & Wellness', 'Academics'],
        cards: [
          { id: 'w1', text: 'Undergraduate Degree Catalog & Course Descriptions', category: 'Academics', explanation: 'Course and degree plan catalogs belong in the Academics architecture.' },
          { id: 'w2', text: 'Emergency Student Relief Grant Application', category: 'Admissions & Aid', explanation: 'Financial assistance and grants sit under Admissions & Financial Aid.' },
          { id: 'w3', text: 'Campus Recreation & Intramural Sports Schedule', category: 'Student Life & Wellness', explanation: 'Recreation, student clubs, and counseling belong in Student Life.' },
          { id: 'w4', text: 'Tuition Cost Calculator & Estimator Tool', category: 'Admissions & Aid', explanation: 'Tuition estimation is a core consideration during admissions and aid planning.' }
        ],
        feedbackIfCorrect: 'Superb Information Architecture! Clear categorization ensures students find critical services in fewer than 3 clicks.',
        xpReward: 85
      }
    ],
    quiz: [
      {
        id: 'q-web-1',
        question: 'When writing web copy for public higher education websites, why is maintaining a proper heading hierarchy (H1 -> H2 -> H3) essential?',
        options: [
          'It is purely a decorative choice that makes the font colors change automatically',
          'Screen readers rely on heading levels to let blind and low-vision users navigate page landmarks, and search engines use it to understand page structure',
          'Web browsers will crash if an H2 appears without an H3',
          'It allows AI models to rewrite the website every midnight'
        ],
        correctIndex: 1,
        explanation: 'Semantic heading hierarchy is a cornerstone of WCAG 2.2 accessibility, enabling screen-reader users to jump efficiently to sections of interest.'
      }
    ]
  }
];
