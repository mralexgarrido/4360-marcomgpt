import { StationModule } from '../../types';

export const stationsGroup3: StationModule[] = [
  {
    id: 'station-pr',
    order: 7,
    category: 'pr',
    title: 'PR Situation Room: Crisis Triage & Media Q&A',
    subtitle: 'Confirmed Facts vs Unknowns, Holding Statements & Zero Speculation',
    umcRole: 'External Communications & Media Relations',
    estimatedMinutes: 35,
    xpReward: 250,
    badgeId: 'crisis-calm',
    overview: 'Step into the PR Situation Room during a breaking campus incident. Learn how to separate verified facts from chaotic rumors, craft source-bounded holding statements, and prepare spokesperson Q&A under media pressure.',
    umcAlignment: 'Models UTRGV UMC External Communications & Media Relations: media relations, crisis communications, institutional spokespersons, and reputation management.',
    learningObjectives: [
      'Isolate confirmed factual data points from unverified rumors during active breaking incidents',
      'Prompt AI models to generate strict, zero-speculation holding statements for news reporters',
      'Prepare difficult reporter Q&A prep sheets identifying "Bridge" messages and off-limit speculations'
    ],
    commonFailureModes: [
      'Letting AI guess the root cause or assign blame before official investigations conclude',
      'Using emotional or defensive language when responding to aggressive journalists',
      'Making absolute promises (e.g. "everyone is completely safe") before emergency teams verify'
    ],
    brief: {
      client: 'University Spokesperson & Chief Communications Officer',
      situation: 'At 2:15 PM, power abruptly failed across the Performing Arts Complex during a regional high-school band festival with 800 attendees. Campus safety evacuated the auditorium calmly. Local news reporters are calling asking if it was an explosion or electrical fire.',
      confirmedFacts: [
        'Power interruption occurred at 2:15 PM at the Performing Arts Complex',
        'Auditorium was safely evacuated as a precaution with zero reported injuries',
        'Facilities and Campus Emergency Management teams are on-site investigating the cause',
        'Next verified operational update will be released at 3:30 PM'
      ],
      unknownsOrRisks: [
        'Root cause is UNKNOWN (Do NOT speculate on fires, transformer explosions, or sabotage)',
        'Reschedule time for the band festival is UNCONFIRMED'
      ],
      goal: 'Draft an urgent 80-word official media holding statement and a 4-question Spokesperson Q&A sheet.'
    },
    promptChallenge: {
      id: 'challenge-pr-1',
      title: 'The Zero-Speculation Holding Statement',
      instructions: 'Construct a crisis prompt that drafts an 80-word media holding statement using strictly confirmed facts, acknowledges unknowns without guessing, and provides next update timing.',
      studentStarter: {
        outcome: 'Draft an 80-word media holding statement and spokesperson Q&A for the power outage.',
        audience: 'Local news reporters, concerned parents, and regional media outlets.',
        context: '2:15 PM power outage at Performing Arts Complex during band festival; safely evacuated, zero injuries.',
        sources: 'Use ONLY confirmed facts. Do not speculate on causes (no mention of explosions/fires).',
        constraints: 'Maximum 80 words for statement. Calm, authoritative, transparent tone. State next update at 3:30 PM.',
        output: '1. Official Holding Statement, 2. Three Spokesperson Q&As with bridging statements.',
        verification: '1. Flag any mention of unverified cause. 2. Verify zero injury claim is attributed to safety leads.'
      },
      proStarter: {
        outcome: 'Produce Crisis Holding Statement, Media Distribution Bulletin, and Spokesperson Bridging Matrix.',
        audience: 'Broadcast journalists, digital news desks, and campus community.',
        context: 'Breaking facility interruption at major public event. High social media speculation risk.',
        sources: 'Incident Command briefing log #1. Absolute prohibition on causality speculation.',
        constraints: 'AP Style, under 90 words, calm institutional authority, clear operational milestone.',
        output: 'Holding Statement, Incident Fact Sheet, and 4-part Reporter Q&A Matrix (Question -> Direct Answer -> Pivot/Bridge).',
        verification: 'Ensure all statements align 100% with Campus Emergency Management confirmation.'
      },
      sampleHighScoringPrompt: {
        outcome: 'Draft an official 80-word media holding statement and a Spokesperson Crisis Q&A Prep Sheet for an active campus facility outage.',
        audience: 'External news media reporters, broadcast journalists, and concerned families seeking verified information.',
        context: 'At 2:15 PM, power failed at the Performing Arts Complex during a regional high school band event. The building was safely evacuated as a precaution with zero reported injuries. Facilities and Safety crews are currently assessing the cause.',
        sources: 'Ground draft strictly in the 4 confirmed incident facts. If a question addresses the cause or event reschedule, explicitly state that it is currently under investigation.',
        constraints: 'Strictly under 85 words for the holding statement. Tone: calm, professional, transparent, and measured. Negative constraint: Absolute zero speculation regarding electrical fires, equipment explosions, or external blame.',
        output: 'Markdown: 1. Official Media Holding Statement, 2. Three Tough Reporter Questions paired with "Direct Answer" and "Approved Institutional Bridge", 3. Crisis Verification Checklist.',
        verification: '1. Audit text to confirm no unapproved cause theories were introduced. 2. Ensure next update time (3:30 PM) is prominent. 3. Verify zero injuries claim matches official safety log.'
      },
      copilotMappingExplanation: 'Goal: Crisis holding statement & Q&A. Context: Active power outage during high school festival. Expectations: Zero speculation, calm tone, 80 words. Source: Incident Command Briefing Log #1.'
    },
    illustrativeOutputs: [
      {
        id: 'out-pr-1',
        title: 'Crisis Holding Statement Comparison',
        scenarioInput: 'Power out at 2:15 PM, safely evacuated, 0 injuries, cause unknown, next update 3:30 PM.',
        weakOutput: {
          text: 'STATEMENT: A massive electrical fire and faulty transformer caused total chaos at the auditorium today, but luckily our brave security guards rescued everyone and nobody died! We promise the festival will restart tonight and the building is 100% safe from future explosions.',
          flaws: [
            'Fabricated a "massive electrical fire and faulty transformer" (wild, reckless speculation)',
            'Alarmist, unprofessional language ("total chaos", "nobody died")',
            'Promised the event will restart tonight without facilities authorization',
            'Made an impossible future safety guarantee ("100% safe from future explosions")'
          ],
          explanation: 'The weak prompt lacked negative constraints and source boundaries, creating a legal and reputational disaster.'
        },
        strongOutput: {
          text: '### Official Media Statement | 2:35 PM Update\n\n"At approximately 2:15 PM today, a power interruption occurred at the Performing Arts Complex during a regional band event. As a standard safety precaution, the building was calmly evacuated. Campus safety reports zero injuries.\n\nFacilities personnel and emergency management teams are currently on-site assessing the cause. We will provide our next operational update at 3:30 PM as additional verified information becomes available."\n\n---\n### Spokesperson Q&A Matrix\n**Reporter:** *"Was this caused by an explosion or faulty maintenance?"*\n**Direct Answer:** "The root cause has not yet been determined. Our facilities and safety teams are actively assessing the infrastructure right now."\n**Bridge Message:** "What we can confirm is that the evacuation was prompt, calm, and resulted in zero injuries. We are focused on safety and will share verified findings at 3:30 PM."'
          ,
          strengths: [
            '100% disciplined fidelity to confirmed facts',
            'Zero speculation regarding cause or blame',
            'Clear operational milestone (3:30 PM update promised)',
            'Equips spokesperson with pivot/bridge language'
          ],
          verificationChecklist: [
            'Approved by Chief Legal Counsel and Emergency Operations Center',
            'Distributed to official newsroom wire and social media holding channels'
          ],
          explanation: 'The strong output maintains institutional trust and safety without feeding sensationalist media speculation.'
        }
      }
    ],
    microgames: [
      {
        id: 'game-pr-triage',
        type: 'card_sort',
        title: 'Crisis Fact Triage: Confirmed vs Speculation',
        instruction: 'Sort these incoming statements during the power outage into Confirmed Fact (Safe to Release) or Unconfirmed Speculation (Do NOT Publish).',
        categories: ['Confirmed Fact (Safe to Release)', 'Unconfirmed Speculation (Hold / Do Not Publish)'],
        cards: [
          { id: 'f1', text: 'Auditorium evacuated calmly with zero reported injuries according to campus emergency leads.', category: 'Confirmed Fact (Safe to Release)', explanation: 'Officially verified by the on-site Incident Command team.' },
          { id: 'f2', text: 'Social media user tweets: "A transformer blew up because the university neglected electrical wiring!"', category: 'Unconfirmed Speculation (Hold / Do Not Publish)', explanation: 'Unsubstantiated bystander speculation on social media.' },
          { id: 'f3', text: 'Next verified operational update will be published at 3:30 PM.', category: 'Confirmed Fact (Safe to Release)', explanation: 'Official scheduled communication commitment.' },
          { id: 'f4', text: 'Anonymous staff member claims: "The air conditioning system melted down completely."', category: 'Unconfirmed Speculation (Hold / Do Not Publish)', explanation: 'Unverified rumor that has not been investigated by engineers.' }
        ],
        feedbackIfCorrect: 'Outstanding crisis discipline! By isolating confirmed facts, you protect institutional integrity and prevent public panic.',
        xpReward: 95
      }
    ],
    quiz: [
      {
        id: 'q-pr-1',
        question: 'When an AI tool drafts a crisis holding statement during an ongoing incident, what is the primary risk a communications officer must guard against?',
        options: [
          'The AI using too few adjectives',
          'The AI inventing or guessing the root cause or liability to make the story feel complete',
          'The AI taking longer than 10 seconds to generate',
          'The AI formatting the output in bullet points'
        ],
        correctIndex: 1,
        explanation: 'Generative models naturally seek narrative closure. In crisis situations with missing facts, unconstrained models will hallucinate causes (e.g. "gas leak", "faulty wiring") that can create legal liability.'
      }
    ]
  },
  {
    id: 'station-internal',
    order: 8,
    category: 'internal',
    title: 'Inside Voice: Internal Communications & Executive Memos',
    subtitle: 'Employee Announcements, Tone Calibration & Privacy-Conscious OOO',
    umcRole: 'Internal Communications & Executive Support',
    estimatedMinutes: 25,
    xpReward: 175,
    badgeId: 'brand-guardian',
    overview: 'Master the nuances of internal employee communications. Learn how to draft executive updates, calibrate organizational change messages, and build privacy-safe out-of-office (OOO) notes.',
    umcAlignment: 'Models UTRGV UMC Internal Communications: employee newsletters, presidential announcements, organizational change, and workplace culture.',
    learningObjectives: [
      'Translate complex organizational policy changes into transparent, respectful employee newsletters',
      'Calibrate leadership tone to balance empathy with strategic direction',
      'Generate privacy-conscious Out-of-Office (OOO) messages that protect personal information and security'
    ],
    commonFailureModes: [
      'Over-disclosing personal employee medical or travel details in OOO or internal updates',
      'Using cold corporate jargon during layoffs or difficult organizational transitions',
      'Forgetting to specify who provides backup coverage for urgent inquiries'
    ],
    brief: {
      client: 'Associate Vice President for Human Resources',
      situation: 'The university is transitioning its campus parking permit system to automated license plate recognition (LPR) starting next month. Physical plastic hangtags will be phased out.',
      confirmedFacts: [
        'System launches: 1st of next month',
        'How it works: Cameras read registered license plates at garage/lot entrances (no more hangtags)',
        'Action required: Employees must verify their vehicle license plate in the employee portal by the 25th',
        'Permit prices: Freeze at current rates with $0 price increase for the upcoming year'
      ],
      unknownsOrRisks: [
        'Visitor parking rates and daily pass details are handled under a separate contract'
      ],
      goal: 'Draft an engaging, reassuring 150-word employee newsletter announcement and an executive Q&A snippet.'
    },
    promptChallenge: {
      id: 'challenge-internal-1',
      title: 'The Employee Change Communicator',
      instructions: 'Prompt the model to draft an employee announcement explaining the new License Plate Recognition parking system, emphasizing convenience and $0 price hike, with clear step-by-step instructions.',
      studentStarter: {
        outcome: 'Draft a 150-word employee newsletter update about the new license plate parking system.',
        audience: 'University faculty and staff who currently use plastic parking hangtags.',
        context: 'Switching to digital license plate recognition next month; $0 price increase; verify plates by 25th.',
        sources: 'Use only confirmed HR facts. Highlight $0 permit price freeze and no more forgotten hangtags.',
        constraints: 'Warm, helpful, clear tone. Avoid bureaucratic jargon. Emphasize convenience.',
        output: 'Headline, 2 short paragraphs, 3 bullet action steps, and support email link.',
        verification: 'Check that the deadline (25th) and price freeze are accurately stated.'
      },
      proStarter: {
        outcome: 'Develop Internal Change Communication Memo and Faculty/Staff Portal Update.',
        audience: 'Campus workforce across multiple shifts, campuses, and technological comfort levels.',
        context: 'Phasing out physical permits in favor of License Plate Recognition (LPR).',
        sources: 'HR / Parking Services Master Plan. Frame around efficiency and price stability.',
        constraints: 'Direct, transparent, change-management oriented tone. Clear deadline emphasis.',
        output: 'Employee broadcast announcement with FAQ accordion and portal verification walkthrough.',
        verification: 'Verify that visitor parking policies are excluded as out-of-scope.'
      },
      sampleHighScoringPrompt: {
        outcome: 'Draft an internal campus-wide employee announcement and FAQ guide for the transition to License Plate Recognition (LPR) parking.',
        audience: 'All university faculty and staff members who commute to campus and hold active parking permits.',
        context: 'Starting the 1st of next month, physical hangtags are replaced with automated camera plate readers. Permit rates remain frozen ($0 increase). Employees must update vehicle records by the 25th.',
        sources: 'Ground exclusively in verified HR briefing notes. Do not speculate on future visitor rates.',
        constraints: 'Tone: warm, practical, appreciative, and clear. Length: 130–150 words for body. Highlight key benefit (never forgetting a hangtag at home).',
        output: 'Markdown formatted: 1. Catchy headline, 2. Core announcement body, 3. "What You Need to Do Before the 25th" (3 bullets), 4. 2-question Employee FAQ, 5. Support contact footnote.',
        verification: '1. Verify portal verification deadline date (25th). 2. Confirm zero rate increase statement is exact. 3. Check for absence of corporate buzzwords.'
      },
      copilotMappingExplanation: 'Goal: Employee change communication. Context: Parking hangtag to LPR transition. Expectations: Warm employee tone, step-by-step instructions. Source: HR parking policy memo.'
    },
    illustrativeOutputs: [
      {
        id: 'out-internal-1',
        title: 'Employee Communication Comparison',
        scenarioInput: 'Switching to license plate parking next month. Price frozen. Verify plates by 25th.',
        weakOutput: {
          text: 'ATTENTION ALL WORKERS: Effective immediately, your physical permits are illegal and void. Surveillance cameras will scan your vehicles and issue massive fines if you fail to update your data. Permit rates are skyrocketing next year. Update or suffer the consequences.',
          flaws: [
            'Hostile, threatening tone ("Attention all workers", "illegal and void", "surrender")',
            'Fabricated a "massive fines" threat not in the policy',
            'Directly contradicted facts by claiming "rates are skyrocketing" when rates are frozen ($0 increase)'
          ],
          explanation: 'The weak prompt lacked tone guidelines and source grounding, generating an adversarial email that would trigger staff outrage.'
        },
        strongOutput: {
          text: '### Say Goodbye to Plastic Hangtags: Campus Parking Goes Digital Next Month!\n\nNo more searching for your plastic permit or switching hangtags between cars. Starting the 1st of next month, campus parking is transitioning to automated **License Plate Recognition (LPR)**.\n\nOur lot cameras will automatically recognize your registered vehicle plate as you enter—making campus parking seamless and eco-friendly. Even better: **permit prices will remain frozen with a $0 rate increase for the coming academic year.**\n\n**What you need to do before the 25th:**\n1. Log in to the [Employee Services Portal]\n2. Click "Parking & Transit"\n3. Confirm or update your vehicle make, model, and license plate number\n\nHave questions? Contact Parking & Transportation Services at parking@university.edu.',
          strengths: [
            'Highlights genuine employee benefits (convenience, no forgotten permits, price freeze)',
            'Clear 3-step action path with explicit deadline',
            'Reassuring and professional institutional voice',
            'Zero hostile jargon'
          ],
          verificationChecklist: [
            'Portal direct link tested across desktop and mobile',
            'Campus parking help desk prepared for account lookup inquiries'
          ],
          explanation: 'The strong output communicates operational change with clarity, empathy, and positive stakeholder engagement.'
        }
      }
    ],
    microgames: [
      {
        id: 'game-internal-ooo',
        type: 'card_sort',
        title: 'Privacy Guard: OOO Message Review',
        instruction: 'Evaluate these out-of-office (OOO) email draft snippets. Classify them into Privacy-Safe & Professional vs Dangerous Over-Disclosure.',
        categories: ['Privacy-Safe & Professional', 'Dangerous Over-Disclosure (Security / Privacy Risk)'],
        cards: [
          { id: 'o1', text: '"I will be out of the office from Aug 12–16 with limited access to email. For urgent matters, please contact Jordan Lee at jlee@univ.edu."', category: 'Privacy-Safe & Professional', explanation: 'Gives clear dates, coverage contact, and zero personal disclosures.' },
          { id: 'o2', text: '"I am away having minor knee surgery at St. Jude Hospital Room 304 and my house is empty until next Tuesday."', category: 'Dangerous Over-Disclosure (Security / Privacy Risk)', explanation: 'Exposes sensitive medical data and announces an empty home to potential burglars.' },
          { id: 'o3', text: '"Thank you for your email. I am currently out of the office returning on Monday, Oct 5. I will respond upon my return."', category: 'Privacy-Safe & Professional', explanation: 'Standard, polite, and secure.' },
          { id: 'o4', text: '"Traveling to Cabo with my family on flight AA204; here is my personal cell phone number for anyone to text."', category: 'Dangerous Over-Disclosure (Security / Privacy Risk)', explanation: 'Exposes personal flight info and publicizes private phone numbers to spam harvesters.' }
        ],
        feedbackIfCorrect: 'Flawless privacy awareness! OOO messages should provide coverage details without exposing personal whereabouts or sensitive data.',
        xpReward: 85
      }
    ],
    quiz: [
      {
        id: 'q-internal-1',
        question: 'When using AI to draft an employee announcement regarding structural organizational changes, what must the communicator prioritize?',
        options: [
          'Maximizing complex corporate jargon to sound important',
          'Balancing empathetic, transparent language with clear actionable instructions and support channels',
          'Letting the AI invent speculative future layoffs',
          'Sending the draft without human review to save time'
        ],
        correctIndex: 1,
        explanation: 'Effective internal communications require high empathy, transparency, and actionable clarity to maintain workforce morale and trust.'
      }
    ]
  },
  {
    id: 'station-creative',
    order: 9,
    category: 'creative',
    title: 'Creative & Multimedia Studio: Briefs, Scripts & Art Direction',
    subtitle: 'Creative Concept Territories, Video Treatments & Visual Prompting',
    umcRole: 'Multimedia Design & Production',
    estimatedMinutes: 30,
    xpReward: 200,
    badgeId: 'brand-guardian',
    overview: 'Learn how creative directors use AI to explore visual concept territories, compose precise video production scripts with B-roll shot lists, and write descriptive art direction prompts.',
    umcAlignment: 'Models UTRGV UMC Multimedia Design & Multimedia Production: digital graphics, motion assets, promotional videos, storyboarding, and brand visual identity.',
    learningObjectives: [
      'Develop 3 distinct creative concept territories from a single marketing brief',
      'Draft a two-column 60-second video script (Audio / Visual B-roll cues)',
      'Formulate precise image-generation art direction prompts avoiding AI visual clichés'
    ],
    commonFailureModes: [
      'Relying on generic visual clichés (glowing holograms, floating lightbulbs, business people shaking hands in front of glass windows)',
      'Writing video scripts that exceed the time limit (a 60-second script is approximately 130–140 spoken words)',
      'Failing to specify visual diversity, accessibility, and brand color palettes'
    ],
    brief: {
      client: 'University Brand & Creative Director',
      situation: 'Production of a 60-second recruitment video spotlighting undergraduate research in biomedical science and hands-on lab experience.',
      confirmedFacts: [
        'Target video runtime: Exactly 60 seconds (130-140 words total voiceover)',
        'Key location: New Biomedical Research Center & Cell Culture Lab',
        'Student protagonist: Real undergraduate student researcher working on cancer immunology',
        'Brand aesthetic: High-contrast cinematic lighting, authentic lab gear, university colors (Navy Blue & Bright Orange accents)'
      ],
      unknownsOrRisks: [
        'No actors or models—must feature real students in authentic PPE (lab coats, safety goggles)',
        'Avoid science-fiction tropes (no glowing futuristic neon robots)'
      ],
      goal: 'Develop 2 creative visual territories, a 60-second two-column script, and an image art direction brief.'
    },
    promptChallenge: {
      id: 'challenge-creative-1',
      title: 'The 60-Second Video Script & Art Director Prompt',
      instructions: 'Prompt the model to produce a 60-second video script (two-column: Visual/B-Roll vs Voiceover Audio) capped at 135 words, with real student lab authenticity and zero sci-fi clichés.',
      studentStarter: {
        outcome: 'Draft a 60-second video script and 2 creative visual concept territories for biomedical recruitment.',
        audience: 'High school seniors and community college transfers passionate about healthcare and medical research.',
        context: 'Spotlighting undergraduate cancer research in the new Biomedical Research Center. 60-second runtime.',
        sources: 'Use confirmed facts. Authentic PPE gear, real lab setting. Brand colors: Navy Blue & Bright Orange.',
        constraints: 'Word count limit: 130-140 spoken words. Two-column format (Visual B-Roll / Spoken Audio). No cheesy sci-fi tropes.',
        output: '1. Two Concept Territories, 2. Two-Column 60s Script with timecodes, 3. Image Art Direction Prompt.',
        verification: 'Check total word count of voiceover to guarantee it fits within 60 seconds.'
      },
      proStarter: {
        outcome: 'Produce Multimedia Production Package: Concept Territories, 60s Treatment Script, and Shot List.',
        audience: 'Prospective STEM applicants evaluating tier-1 undergraduate research opportunities.',
        context: 'Undergraduate biomedical research campaign. Cinematic, authentic documentary style.',
        sources: 'Institutional brand guidelines and lab safety protocol standards.',
        constraints: 'Pacing: 130-140 WPM spoken pace. Realistic lab environments. High-contrast cinematic lighting.',
        output: 'Concept Pitch, Two-column Audio/Visual Script with 5 core scenes, and Camera Direction specs.',
        verification: 'Verify that PPE compliance (safety glasses, gloves) is specified in all visual cues.'
      },
      sampleHighScoringPrompt: {
        outcome: 'Develop a creative video production brief and a 60-second two-column recruitment video script spotlighting undergraduate biomedical research.',
        audience: 'Prospective undergraduate students seeking hands-on scientific research opportunities and pre-med pathways.',
        context: 'Campaign highlights real undergraduate cancer immunology researchers in the new Biomedical Center. Authentic lab environment with university brand accents.',
        sources: 'Ground visual cues strictly in real biomedical lab equipment (pipettes, microscopes, cell incubators) and brand palette (Navy & Orange).',
        constraints: 'Script voiceover MUST be strictly between 125 and 135 words (paced for natural 60-second delivery). Visual style: cinematic documentary realism. Forbidden: sci-fi tropes, floating neon graphics, or lab safety violations.',
        output: 'Markdown table format: 1. Two Distinct Creative Territories, 2. Two-Column Script (Timecode | Visual B-Roll Cue & Camera Angle | Spoken Audio Voiceover), 3. AI Image Art Direction Prompt specifying composition, lighting, and PPE compliance.',
        verification: '1. Count exact spoken words in voiceover column. 2. Verify all lab scenes specify required PPE (goggles, gloves, lab coats).'
      },
      copilotMappingExplanation: 'Goal: Video script & art direction brief. Context: Undergraduate biomedical recruitment. Expectations: Two-column 60s script with 130-word limit + shot list. Source: Brand creative guidelines.'
    },
    illustrativeOutputs: [
      {
        id: 'out-creative-1',
        title: 'Video Script & Treatment Comparison',
        scenarioInput: '60-second biomedical research video. Target: 130 words voiceover. Authentic lab.',
        weakOutput: {
          text: 'SCENE 1: A student with glowing blue eyes shoots laser beams into a microscope while futuristic neon holographic equations fly across the screen. [VOICEOVER: At our university, we have created the magical cure for every illness in the galaxy! You will become an immortal genius on your first day of class! Apply now!] (Total words: 450 words - 4 minutes long)',
          flaws: [
            'Ridiculous science-fiction tropes ("laser beams", "neon holographic equations")',
            'Absurd, deceptive claims ("magical cure for every illness in the galaxy")',
            'Massively exceeded time limit (450 words would take 3.5 minutes, ruining the 60s media buy)'
          ],
          explanation: 'The weak prompt had no pacing constraints, timecode structure, or realism boundaries.'
        },
        strongOutput: {
          text: '### 60-Second Video Script: "Real Research Starts Day One"\n*Total Voiceover Word Count: 128 words (Target: 60 Seconds)*\n\n| Time | Visual B-Roll / Camera Direction | Spoken Voiceover Audio |\n| :--- | :--- | :--- |\n| 0:00-0:10 | **Wide cinematic dolly shot:** Dawn sunlight fills the Biomedical Center. Undergraduate student Elena (wearing safety goggles & lab coat) adjusts a digital fluorescence microscope. | "You don\'t have to wait until graduate school to make a real discovery." |\n| 0:10-0:25 | **Macro tight shot:** Micropipette dispensing liquid into cell assay plate; shallow depth of field. Navy & orange lanyard visible. | "At the University, undergraduate researchers work alongside leading faculty in our new cancer immunology labs." |\n| 0:25-0:45 | **Medium tracking shot:** Elena discusses data graphs with faculty mentor at a lab monitor. Collaborative, focused energy. | "Formulating real hypotheses. Testing real therapies. Building the skills that open doors to medical school and global biotech careers." |\n| 0:45-1:00 | **Hero portrait to logo reveal:** Elena looks up from the lab bench, smiling with confidence. University logo resolves over navy background with web URL. | "Your future in medicine begins at the bench. Apply today at univ.edu/biomed." |',
          strengths: [
            'Exact pacing (128 words perfectly fits 60 seconds)',
            'Strict adherence to real lab safety and authentic equipment',
            'Two-column professional production layout with timecodes',
            'Compelling, grounded student value proposition'
          ],
          verificationChecklist: [
            'Lab safety manager reviews storyboard for PPE compliance',
            'Location permit secured for Biomedical Research Center filming date'
          ],
          explanation: 'The strong output gives the video production crew an immediately executable, professional script.'
        }
      }
    ],
    microgames: [
      {
        id: 'game-creative-promptrepair',
        type: 'prompt_repair',
        title: 'Art Direction Clinic: Banish the AI Slop',
        instruction: 'Identify which art direction prompt produces an authentic, publication-ready institutional photo rather than generic AI slop.',
        cards: [
          { id: 'ap1', text: '"A futuristic genius student standing in a cosmic cyberspace with purple and blue glowing gradients and neon holograms floating around their head."', category: 'AI Slop Cliché', isCorrect: false, explanation: 'Violates the anti-slop guidelines: purple-blue gradients, glowing drop-shadows, and nonsensical sci-fi holograms.' },
          { id: 'ap2', text: '"Authentic documentary editorial photograph of a Latina undergraduate biology student wearing white lab coat and safety goggles, carefully pipetting a solution in a modern university biomedical laboratory, warm natural daylight through large windows, cinematic 35mm photography, subtle navy blue accents, shallow depth of field, candid expression."', category: 'Professional Art Direction', isCorrect: true, explanation: 'Exemplary art direction: specifies authentic subject, PPE, real lighting, camera optics (35mm), realistic environment, and brand accents.' },
          { id: 'ap3', text: '"Best high quality 8k photorealistic college student image trending on artstation."', category: 'Outdated Keyword Slop', isCorrect: false, explanation: 'Useless buzzword stuffing ("8k", "photorealistic") that provides zero stylistic or brand direction.' }
        ],
        feedbackIfCorrect: 'Superb creative discernment! Clean art direction specifies optics, lighting, authenticity, and composition without relying on generic visual tropes.',
        xpReward: 90
      }
    ],
    quiz: [
      {
        id: 'q-creative-1',
        question: 'When writing a spoken voiceover script for a 60-second broadcast video, what is the standard spoken word count range to maintain natural pacing?',
        options: [
          '400 to 500 words',
          '125 to 140 words',
          '10 to 20 words',
          'Unlimited words if spoken quickly'
        ],
        correctIndex: 1,
        explanation: 'Natural professional voiceover cadence is approximately 130 to 140 words per minute. Exceeding 140 words forces frantic, unnatural speech that hurts audience comprehension.'
      }
    ]
  }
];
