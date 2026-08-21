import { StationModule } from '../../types';

export const stationsGroup4: StationModule[] = [
  {
    id: 'station-events',
    order: 10,
    category: 'events',
    title: 'Events & Partnerships Desk: Run-of-Show & Logistics',
    subtitle: 'Run-of-Show Architecture, Rain Contingencies & VIP Partner Briefs',
    umcRole: 'Strategic Events & Partnerships',
    estimatedMinutes: 25,
    xpReward: 200,
    badgeId: 'brand-guardian',
    overview: 'Master event operations and partner communications. Learn how to convert complex logistics into minute-by-minute Run-of-Show documents, formulate severe weather contingency plans, and write executive partner briefing notes.',
    umcAlignment: 'Models UTRGV UMC Strategic Events & Partnerships: coordinated institutional events, community partnerships, accessibility planning, and VIP executive briefings.',
    learningObjectives: [
      'Structure an event Run-of-Show (ROS) with timestamps, stage cues, AV dependencies, and designated owners',
      'Formulate multi-stage severe weather / technical contingency messaging',
      'Draft concise, high-impact executive briefing memos for visiting keynote speakers and community partners'
    ],
    commonFailureModes: [
      'Omitting AV technical soundcheck cues and buffer times between speakers',
      'Forgetting ADA accessibility requirements (wheelchair ramps, ASL interpreters, captioning)',
      'Failing to specify who has the ultimate authority to trigger an outdoor rain plan'
    ],
    brief: {
      client: 'Associate Vice President for University Advancement & Events',
      situation: 'Annual Presidential Gala & Alumni Awards dinner taking place on the University Plaza (outdoors). 450 registered guests, including state senators, major donors, and alumni honorees.',
      confirmedFacts: [
        'Event date: Saturday, Oct 24',
        'Outdoor reception: 6:00 PM; Dinner & Awards program: 7:00 PM - 8:45 PM',
        'Keynote speaker: Former NASA Astronaut and distinguished alumnus Dr. Marcus Vance',
        'Indoor backup venue: Student Union Ballroom (requires 3-hour setup lead time)'
      ],
      unknownsOrRisks: [
        'Weather forecast shows a 40% chance of evening thunderstorms',
        'Decision cutoff time to move indoors must occur by 2:00 PM on event day'
      ],
      goal: 'Produce a minute-by-minute Run-of-Show table, a Rain Contingency Protocol, and a 1-page VIP briefing memo for Dr. Vance.'
    },
    promptChallenge: {
      id: 'challenge-events-1',
      title: 'The Master Run-of-Show & Contingency Plan',
      instructions: 'Prompt the model to build a detailed event Run-of-Show from 5:30 PM to 9:00 PM with stage/AV cues, an explicit 2:00 PM rain decision protocol, and ASL/accessibility considerations.',
      studentStarter: {
        outcome: 'Create an event Run-of-Show, Rain Contingency Protocol, and VIP speaker brief.',
        audience: 'Events production crew, Stage Manager, AV technicians, and Keynote Speaker Dr. Vance.',
        context: 'Presidential Gala for 450 guests; outdoor plaza with indoor ballroom backup (3-hr lead time).',
        sources: 'Use confirmed timeline facts. 2:00 PM weather decision deadline. Dr. Vance NASA keynote.',
        constraints: 'Include AV audio checks, ASL interpreter placement, and explicit stage cues. Clear tabular format.',
        output: '1. Minute-by-minute Run-of-Show Table, 2. Rain Contingency Plan with decision trigger, 3. VIP Briefing Memo.',
        verification: 'Verify that 2:00 PM indoor move deadline is highlighted and AV soundcheck is scheduled before doors open.'
      },
      proStarter: {
        outcome: 'Produce Master Event Operations Dossier: Timed Run-of-Show, Weather Protocol, and Principal Briefing.',
        audience: 'Executive Leadership, Event Operations, Facilities, and VIP Dignitaries.',
        context: 'High-profile 450-person institutional gala with outdoor weather vulnerability.',
        sources: 'Standard institutional protocol for Tier-1 presidential events. ADA compliance mandates.',
        constraints: 'Precision timing, designated decision owners, clear contingency escalation path.',
        output: 'Operations Dossier with ROS matrix (Time, Stage Cue, Speaker, AV/Lighting, Owner) and Contingency Trees.',
        verification: 'Audit accessibility provisions (ASL, ADA ramp access, real-time captioning).'
      },
      sampleHighScoringPrompt: {
        outcome: 'Develop a Master Event Operations Run-of-Show, Weather Contingency Plan, and VIP Speaker Brief for the 2026 Presidential Gala & Alumni Awards.',
        audience: 'Event Production Team, Stage Manager, AV Engineers, Campus Police, and Executive Leadership.',
        context: 'Outdoor gala on University Plaza for 450 guests (6:00 PM reception, 7:00 PM dinner/program). Weather shows 40% chance of rain. Indoor backup is the Student Union Ballroom (requires 3-hour setup transition).',
        sources: 'Ground all timings strictly in the approved event schedule and facility lead times. Note Dr. Marcus Vance\'s keynote title and background.',
        constraints: 'Format ROS as a detailed operational table (Time | Action/Segment | Stage & AV Cues | Presenter/Owner | Notes). Must include pre-event AV tech check, ADA accessibility provisions (ASL interpreter lighting, stage ramp), and a definitive 2:00 PM Weather Decision Protocol.',
        output: 'Markdown document: 1. Master Run-of-Show Table (5:30 PM to 9:00 PM), 2. Severe Weather & Rain Contingency Matrix (Decision tree with 2:00 PM cutoff), 3. One-Page VIP Keynote Speaker Brief for Dr. Vance.',
        verification: '1. Verify AV soundcheck occurs before 6:00 PM guest arrival. 2. Confirm single authorized decision maker for weather call. 3. Audit ADA stage accessibility requirements.'
      },
      copilotMappingExplanation: 'Goal: Master event run-of-show & weather contingency. Context: Presidential Gala for 450 guests. Expectations: Minute-by-minute table + VIP memo. Source: Gala operational briefing document.'
    },
    illustrativeOutputs: [
      {
        id: 'out-events-1',
        title: 'Run-of-Show & Contingency Comparison',
        scenarioInput: 'Gala on Plaza, 450 guests, 6 PM reception, 7 PM dinner. 40% rain risk. 3-hr indoor ballroom setup.',
        weakOutput: {
          text: 'The gala starts at 6 PM. People will eat dinner and listen to speech. If it rains at 7:30 PM while Dr. Vance is talking, everyone should just grab their plates and run across campus to the ballroom.',
          flaws: [
            'Absurd and dangerous rain plan ("grab plates and run in the rain at 7:30 PM")',
            'Zero technical timing, AV cues, or soundcheck schedule',
            'No mention of ADA accessibility or stage management owners'
          ],
          explanation: 'The weak prompt lacked operational structure, lead time constraints, and risk management parameters.'
        },
        strongOutput: {
          text: '### Master Event Run-of-Show: Presidential Gala 2026\n\n| Time | Program Segment | Stage & AV / Lighting Cues | Presenter / Owner | Operational Notes |\n| :--- | :--- | :--- | :--- | :--- |\n| 5:00 PM | **Technical Check & Rehearsal** | House lights 100%. Mic check (Podium & Lapel). Video test. | AV Lead & Stage Mgr | ASL interpreter sightline & lighting check. |\n| 6:00 PM | **Outdoor Cocktail Reception** | Background acoustic jazz playlist at 60dB. Warm plaza uplighting. | Advancement Staff | Registration check-in desks open; ushers escort VIPs. |\n| 7:00 PM | **Welcome & Call to Seats** | Chime sound effect. Lights dim to 70%. Spotlight on Center Podium. | President Martinez | Stage ramp clear for accessibility. |\n| 7:45 PM | **Keynote Introduction** | Intro video roll (2 mins). Podium spotlight. | Alumni Board President | Dr. Vance escorted to stage wing. |\n| 7:50 PM | **Keynote: Dr. Marcus Vance** | Lapel mic active. Slide deck on dual plaza LED walls. | Dr. Marcus Vance | Water at podium; timer clock running. |\n| 8:45 PM | **Closing & Alma Mater** | Full stage wash; brass ensemble live audio. | President Martinez | Event concluded; transition to dessert. |\n\n---\n### Severe Weather & Rain Contingency Protocol\n• **Decision Cutoff Deadline:** **2:00 PM on Event Day** (Enforces mandatory 3-hour ballroom setup buffer).\n• **Decision Authority:** Associate VP for Advancement in consultation with Campus Safety Weather Officer.\n• **Trigger Condition:** Sustained >35% precipitation forecast or lightning advisory.\n• **Action if Triggered:** Send automated SMS/Email blast to all 450 attendees by 2:30 PM directing guests to the Student Union Ballroom. Facilities transfers floral arrangements and catering setup indoors.',
          strengths: [
            'Rigorous minute-by-minute operational clarity',
            'Definitive 2:00 PM weather cutoff avoids mid-event chaos',
            'Incorporates ADA accessibility, AV cues, and stage safety'
          ],
          verificationChecklist: [
            'Confirm Student Union Ballroom hold is active until 2:00 PM decision',
            'Campus text alert system pre-configured with weather redirection template'
          ],
          explanation: 'The strong output provides a bulletproof operational blueprint for executive event success.'
        }
      }
    ],
    microgames: [
      {
        id: 'game-events-puzzle',
        type: 'card_sort',
        title: 'Run-of-Show Puzzle: Order the Protocol',
        instruction: 'Categorize these operational tasks into Pre-Event Prep (Before 6 PM) vs Live Show Operations (After 6 PM).',
        categories: ['Pre-Event Prep (Before 6 PM)', 'Live Show Operations (After 6 PM)'],
        cards: [
          { id: 'e1', text: 'AV Soundcheck & ASL Interpreter sightline check at main podium', category: 'Pre-Event Prep (Before 6 PM)', explanation: 'Technical checks and accessibility verification must always conclude before guest arrival.' },
          { id: 'e2', text: '2:00 PM Rain Contingency Decision Cutoff with Weather Officer', category: 'Pre-Event Prep (Before 6 PM)', explanation: 'Weather calls must happen hours in advance to allow room setup transitions.' },
          { id: 'e3', text: 'Chime sound effect & President\'s Call to Seats for dinner', category: 'Live Show Operations (After 6 PM)', explanation: 'Program milestone during live gala dinner.' },
          { id: 'e4', text: 'Cue keynote intro video on dual LED projection screens', category: 'Live Show Operations (After 6 PM)', explanation: 'Live show AV cue during the speaking program.' }
        ],
        feedbackIfCorrect: 'Flawless event management! Rigorous pre-event preparation guarantees a seamless, stress-free live gala.',
        xpReward: 90
      }
    ],
    quiz: [
      {
        id: 'q-events-1',
        question: 'Why is establishing a strict decision cutoff time (e.g. 2:00 PM for a 6:00 PM event) essential for outdoor event weather contingency plans?',
        options: [
          'Because weather radar is completely inaccurate after 2:00 PM',
          'Catering, AV logistics, decor, and guest notification require multiple hours of physical setup transition lead time',
          'It is mandated by the municipal outdoor festival ordinance',
          'Event guests will refuse to attend if notified after lunch'
        ],
        correctIndex: 1,
        explanation: 'Transitioning a major event indoors requires substantial physical labor (moving tables, AV, lighting, catering). Cutoff deadlines prevent chaotic mid-event disruptions.'
      }
    ]
  },
  {
    id: 'station-capstone',
    order: 11,
    category: 'capstone',
    title: 'Integrated Capstone: The 360° MarCom Challenge',
    subtitle: 'Cross-Functional Strategy, Crisis Integration & Multi-Channel Defense',
    umcRole: 'Executive MarCom Leadership & Strategy',
    estimatedMinutes: 45,
    xpReward: 350,
    badgeId: 'integrated-strategist',
    overview: 'The ultimate synthesis! Apply cross-functional judgment across operations, strategy, digital, social, web, PR, and internal communications. Direct an integrated high-stakes institutional campaign with complete source fidelity and human accountability.',
    umcAlignment: 'Models total executive coordination across all divisions of University Marketing & Communications.',
    learningObjectives: [
      'Orchestrate a unified cross-functional campaign across 6 distinct communications channels simultaneously',
      'Synthesize multiple source documents without introducing factual discrepancies or semantic drift',
      'Defend AI-assisted decisions and articulate a rigorous human-in-the-loop verification plan'
    ],
    commonFailureModes: [
      'Allowing conflicting facts to appear across different communication channels',
      'Treating AI output as final copy without establishing a cross-departmental approval workflow',
      'Failing to adapt core messaging to distinct stakeholder audiences (students vs media vs leadership)'
    ],
    brief: {
      client: 'University President & Executive Cabinet',
      situation: 'Historic Announcement: The university has received a record-breaking $40 Million philanthropic gift from the Torres Family Foundation to construct the new Torres Institute for Health Equity & AI, providing 200 annual full-tuition scholarships for first-generation healthcare students.',
      confirmedFacts: [
        'Gift amount: $40,000,000 (Largest single gift in university history)',
        'Donor: Torres Family Foundation (Founders: Elena & Carlos Torres, Class of \'84)',
        'New Facility: "Torres Institute for Health Equity & AI" (Groundbreaking next Spring)',
        'Scholarships: 200 annual full-tuition scholarships for first-generation Texas medical/health students',
        'Official Press Conference: Tomorrow at 10:00 AM in the Campus Plaza'
      ],
      unknownsOrRisks: [
        'Architectural design blueprints are preliminary; building square footage is not yet finalized',
        'Scholarship application portal opens in November (do NOT claim applications are open today)'
      ],
      goal: 'Execute a full 360° Launch Package: Executive Memo, Press Release Lead, LinkedIn Announcement, Student Portal Banner Copy, and Risk Verification Matrix.'
    },
    promptChallenge: {
      id: 'challenge-capstone-1',
      title: 'The 360° Master Campaign Architecture',
      instructions: 'Construct an integrated master prompt that generates a complete multi-channel launch package across 4 distinct stakeholders (Media, Alumni, Students, Internal Faculty/Staff) with 100% factual synchronization and verification checkpoints.',
      studentStarter: {
        outcome: 'Produce a 360° announcement kit for the historic $40M Torres Family gift.',
        audience: 'Segmented: 1. Press Media, 2. Alumni/Donors on LinkedIn, 3. Current/Prospective Students, 4. Faculty/Staff.',
        context: 'Historic $40M gift to build Torres Institute for Health Equity & AI; 200 annual first-gen scholarships.',
        sources: 'Use ONLY confirmed facts. Donor: Torres Family. Spring groundbreaking. Scholarship portal opens Nov.',
        constraints: 'Ensure perfect factual consistency across all 4 channels. Tone must match each audience.',
        output: 'Structured Markdown: 1. Press Release Lead, 2. LinkedIn Post, 3. Student Web Banner, 4. Faculty Internal Memo, 5. Verification Matrix.',
        verification: '1. Check gift amount ($40M) and scholarship count (200). 2. Verify scholarship opening date (Nov).'
      },
      proStarter: {
        outcome: 'Orchestrate an Integrated Enterprise Communication Strategy & Multi-Channel Distribution Dossier.',
        audience: 'Comprehensive institutional ecosystem (Global News Desks, Philanthropic Community, Student Body, Academic Senate).',
        context: 'Record-setting $40M transformational gift for Health Equity & AI institute.',
        sources: 'Torres Foundation gift agreement terms and President\'s executive brief. Zero speculation on building specs.',
        constraints: 'Institutional voice, AP Style for PR, inspirational for students, high-prestige for alumni. Multi-channel synchronization.',
        output: 'Master Dossier with Channel-by-Channel deliverables, embargo protocol, and risk mitigation checkpoints.',
        verification: 'Audit cross-channel factual parity and confirm absence of unreleased architectural metrics.'
      },
      sampleHighScoringPrompt: {
        outcome: 'Orchestrate an integrated 360° Institutional Communications Launch Kit for a historic $40 Million philanthropic endowment.',
        audience: 'Four distinct audiences: 1. Regional & National News Media, 2. Professional Alumni & Philanthropic Donors on LinkedIn, 3. Prospective & Enrolled First-Generation Students on Web/Social, 4. University Faculty & Staff.',
        context: 'The university received a $40 Million gift from the Torres Family Foundation (Carlos & Elena Torres, \'84) to establish the Torres Institute for Health Equity & AI and fund 200 annual full-tuition health sciences scholarships. Press conference is tomorrow at 10:00 AM; scholarship applications open in November.',
        sources: 'Ground all assets exclusively in the confirmed gift agreement parameters. Do not estimate building square footage or claim scholarships open before November.',
        constraints: 'Maintain 100% factual synchronization across all channel assets while tailoring voice: Media (authoritative news lead), LinkedIn (economic & healthcare impact), Student Portal (inspiring, actionable), Internal Memo (gratitude and academic vision).',
        output: 'Markdown formatted sections: 1. Press Release Wire Lead & Quotes, 2. LinkedIn Post with Hashtags & Alt-Text, 3. Student Portal Hero Banner & Microcopy, 4. Internal Presidential Memo to Campus Workforce, 5. Cross-Channel QA & Verification Matrix.',
        verification: '1. Audit that $40M, 200 scholarships, and Torres Family Foundation names are identical across all channels. 2. Verify November scholarship timeline is explicit to prevent student support confusion.'
      },
      copilotMappingExplanation: 'Goal: 360° Integrated Campaign Kit. Context: $40M historic gift announcement. Expectations: 4 synchronized channel deliverables + QA matrix. Source: Approved Gift Agreement Brief.'
    },
    illustrativeOutputs: [
      {
        id: 'out-capstone-1',
        title: '360° Multi-Channel Synchronization Comparison',
        scenarioInput: '$40M gift, Torres Foundation, Institute for Health Equity & AI, 200 scholarships starting in Nov.',
        weakOutput: {
          text: 'NEWS: We got $50 Million dollars from some rich guy! All students can get free money today at the registrar!\nLINKEDIN: Check out our $100 Million dollar hospital! It will be 50 stories tall!\nSTUDENT PORTAL: You are all getting scholarships right now!',
          flaws: [
            'Severe factual contradictions between channels ($50M in PR vs $100M on LinkedIn vs $40M reality)',
            'Invented building specifications ("50 stories tall hospital")',
            'Disastrous student misinformation ("get free money today" when applications open in Nov)'
          ],
          explanation: 'The weak prompt lacked source synchronization, resulting in contradictory figures across channels that destroy institutional credibility.'
        },
        strongOutput: {
          text: '### 360° Integrated Launch Kit: The Torres Institute Announcement\n\n**1. Press Release Wire Lead (External Media):**\n"The University today announced a historic $40 Million gift from the Torres Family Foundation to establish the Torres Institute for Health Equity & AI. The transformative endowment—the largest in institutional history—will construct a state-of-the-art research facility and permanently fund 200 full-tuition annual scholarships for first-generation students in healthcare and medical technology."\n\n**2. LinkedIn Post (Alumni & Partners):**\n"A transformational moment for health equity in Texas. 🌟\n\nWe are deeply honored to announce a landmark $40 Million gift from alumni Elena and Carlos Torres (\'84) through the Torres Family Foundation to create the Torres Institute for Health Equity & AI. This visionary investment will fund 200 annual full-tuition scholarships for first-generation health sciences students and accelerate AI-driven healthcare research.\n\nJoin us live for tomorrow\'s 10:00 AM press conference: [Live Stream Link]\n#HigherEd #Philanthropy #HealthEquity #AIinHealthcare #AlumniImpact"\n\n**3. Student Portal Banner (Web / Current Students):**\n"**Historic $40M Gift Expands Healthcare Scholarships**\nThe new Torres Institute will provide 200 annual full-tuition scholarships for first-generation health sciences students. Applications open this November for Fall admittance. [Learn More & Join the Notification List →]"\n\n**4. Cross-Channel QA & Verification Checklist:**\n✓ $40M gift figure verified against legal donor agreement\n✓ 200 annual scholarship count aligned across all channels\n✓ Explicit note that scholarship applications open in November (prevents office rush)',
          strengths: [
            'Perfect factual synchronization across every audience touchpoint',
            'Tailored narrative angles matching stakeholder mindsets',
            'Protects operational sanity by clarifying the November application date',
            'Executive-level institutional prestige'
          ],
          verificationChecklist: [
            'Torres Family approves final quote before press wire release',
            'Donor relations team and campus switchboard briefed on call forwarding'
          ],
          explanation: 'The strong output demonstrates complete mastery of integrated communications, proving the power of grounded AI prompting.'
        }
      }
    ],
    microgames: [
      {
        id: 'game-capstone-sync',
        type: 'hallucination_hunt',
        title: 'Capstone Defense: Audit the Multi-Channel Draft',
        instruction: 'Find the 3 factual inconsistencies in this simulated cross-channel draft before executive sign-off.',
        snippetText: 'PRESS RELEASE: The university announced a $40 Million gift from the Torres Family Foundation. [CLAIM_1: LINKEDIN DRAFT: We are excited to announce a $65 Million donation from anonymous tech billionaires.] The gift will establish the Torres Institute for Health Equity & AI and fund 200 annual scholarships. [CLAIM_2: STUDENT EMAIL: Apply at the front desk right now today for your free $20,000 cash check.] Groundbreaking will occur in the Spring. [CLAIM_3: SOCIAL POST: The 80-story skyscraper hospital is already under construction today.]',
        unsupportedClaims: [
          'LINKEDIN DRAFT: We are excited to announce a $65 Million donation from anonymous tech billionaires.',
          'STUDENT EMAIL: Apply at the front desk right now today for your free $20,000 cash check.',
          'SOCIAL POST: The 80-story skyscraper hospital is already under construction today.'
        ],
        feedbackIfCorrect: 'Flawless quality assurance! You caught every cross-channel discrepancy and protected the university\'s reputation.',
        xpReward: 120
      }
    ],
    quiz: [
      {
        id: 'q-capstone-1',
        question: 'When coordinating an integrated 360° communications launch across press, social, web, and internal channels, what is the most critical human responsibility?',
        options: [
          'Letting the AI automatically post to all social channels without human review',
          'Enforcing strict factual synchronization across all channels so no contradictory figures, dates, or false promises are published',
          'Making sure all posts use the exact same sentence structure',
          'Deleting all negative comments automatically'
        ],
        correctIndex: 1,
        explanation: 'In integrated communications, different audiences receive tailored angles, but the underlying facts (money, dates, rules, criteria) must remain 100% synchronized and verified.'
      }
    ]
  }
];
