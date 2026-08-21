import { PromptCanvasFields, PromptEvaluation, RubricDimensionScore } from '../types';

export function compileFullPrompt(fields: PromptCanvasFields): string {
  return `### SYSTEM & ROLE PROMPT
[OUTCOME]: ${fields.outcome}

[TARGET AUDIENCE]: ${fields.audience}

[CONTEXT & BACKGROUND]: ${fields.context}

[SOURCES & GROUNDING DIRECTIVE]:
${fields.sources}

[CONSTRAINTS & EXCLUSIONS]:
${fields.constraints}

[OUTPUT FORMAT & STRUCTURE]:
${fields.output}

[VERIFICATION PROTOCOL]:
${fields.verification}`;
}

export function evaluatePrompt(fields: PromptCanvasFields): PromptEvaluation {
  const outcomeScore = evaluateOutcome(fields.outcome);
  const audienceScore = evaluateAudience(fields.audience);
  const contextScore = evaluateContext(fields.context);
  const sourcesScore = evaluateSources(fields.sources);
  const constraintsScore = evaluateConstraints(fields.constraints);
  const outputScore = evaluateOutput(fields.output);
  const verificationScore = evaluateVerification(fields.verification);

  const totalScore = 
    outcomeScore.score +
    audienceScore.score +
    contextScore.score +
    sourcesScore.score +
    constraintsScore.score +
    outputScore.score +
    verificationScore.score;

  let tier: PromptEvaluation['tier'] = 'Fragile';
  let tierColor = 'text-orange-300 bg-zinc-900 border-orange-700/60';
  let summary = 'This prompt is prone to hallucination, generic phrasing, or missing constraints. Add clear source boundaries and verification instructions.';

  if (totalScore >= 19) {
    tier = 'Source-Ready';
    tierColor = 'text-white bg-orange-600 border-orange-500 font-bold';
    summary = 'Outstanding! This prompt enforces strict source grounding, detailed constraints, specific formatting, and explicit verification steps.';
  } else if (totalScore >= 15) {
    tier = 'Strong';
    tierColor = 'text-white bg-zinc-800 border-orange-500/80 font-bold';
    summary = 'Strong, professional prompt structure. Minor refinements in grounding boundaries or verification criteria will elevate it to publication-ready.';
  } else if (totalScore >= 9) {
    tier = 'Usable';
    tierColor = 'text-zinc-200 bg-zinc-800/80 border-zinc-700 font-semibold';
    summary = 'Functional prompt that will produce decent first drafts, but lacks strict factual boundaries or structured verification checks.';
  }

  return {
    totalScore,
    dimensions: {
      outcome: outcomeScore,
      audience: audienceScore,
      context: contextScore,
      sources: sourcesScore,
      constraints: constraintsScore,
      output: outputScore,
      verification: verificationScore,
    },
    tier,
    tierColor,
    summary,
  };
}

function evaluateOutcome(text: string): RubricDimensionScore {
  const clean = text.trim();
  if (!clean || clean.length < 10) {
    return {
      score: 0,
      feedback: 'Missing or overly brief outcome.',
      strengths: [],
      suggestions: ['Specify the exact deliverable (e.g. "Draft a 150-word holding statement" or "Generate 3 audience hypotheses").'],
    };
  }

  const hasActionVerb = /\b(draft|create|generate|write|synthesize|analyze|critique|outline|formulate|translate|structure)\b/i.test(clean);
  const isSpecific = clean.length >= 35 && hasActionVerb;

  if (isSpecific && /\b(for|decision|deliverable|purpose|goal|aim)\b/i.test(clean)) {
    return {
      score: 3,
      feedback: 'Precise deliverable and strategic purpose defined.',
      strengths: ['Clear action verb', 'Defines the exact deliverable and operational objective'],
      suggestions: [],
    };
  }

  if (hasActionVerb || clean.length >= 25) {
    return {
      score: 2,
      feedback: 'Clear task defined, but could specify the decision purpose more clearly.',
      strengths: ['Identifies core deliverable'],
      suggestions: ['State how this deliverable will be used or what decision it supports.'],
    };
  }

  return {
    score: 1,
    feedback: 'Vague task statement.',
    strengths: ['Provides a general topic'],
    suggestions: ['Use an active verb and declare the specific format/purpose.'],
  };
}

function evaluateAudience(text: string): RubricDimensionScore {
  const clean = text.trim();
  if (!clean || clean.length < 5) {
    return {
      score: 0,
      feedback: 'No audience specified.',
      strengths: [],
      suggestions: ['Specify who will read or act on this (e.g., prospective transfer students, press reporters, executive council).'],
    };
  }

  const hasTarget = /\b(student|alumni|faculty|staff|press|reporter|executive|community|donor|partner|parent|stakeholder|customer|user)\b/i.test(clean);
  const hasNeedOrMindset = /\b(need|seeking|mindset|hesitation|pain|concern|looking|interest|unfamiliar|skeptical|busy|level)\b/i.test(clean);

  if (hasTarget && hasNeedOrMindset && clean.length >= 30) {
    return {
      score: 3,
      feedback: 'Audience segment clearly identified with specific needs, mindset, and reading context.',
      strengths: ['Specific demographic/segment', 'Identifies their knowledge level and emotional/informational needs'],
      suggestions: [],
    };
  }

  if (hasTarget || clean.length >= 20) {
    return {
      score: 2,
      feedback: 'Target audience defined, but their specific intent or mindset could be fleshed out.',
      strengths: ['Identifies the target group'],
      suggestions: ['Add what this audience cares about most or what questions they are asking.'],
    };
  }

  return {
    score: 1,
    feedback: 'Generic audience description.',
    strengths: ['Mentions an audience broadly'],
    suggestions: ['Avoid "everyone" or "general public"; narrow down to the primary reader.'],
  };
}

function evaluateContext(text: string): RubricDimensionScore {
  const clean = text.trim();
  if (!clean || clean.length < 10) {
    return {
      score: 0,
      feedback: 'Missing background context.',
      strengths: [],
      suggestions: ['Provide 2-3 essential background facts about the situation, institution, or project stage.'],
    };
  }

  const hasFacts = clean.length >= 60;
  const hasDetails = /\b(because|situation|background|timeline|event|program|initiative|metric|current|problem|context)\b/i.test(clean);

  if (hasFacts && hasDetails && clean.length >= 100) {
    return {
      score: 3,
      feedback: 'Rich, decision-relevant background context provided.',
      strengths: ['Gives grounding facts', 'Establishes the scenario and background parameters'],
      suggestions: [],
    };
  }

  if (clean.length >= 40) {
    return {
      score: 2,
      feedback: 'Useful context provided.',
      strengths: ['Provides background situation'],
      suggestions: ['Include key dates, program names, or specific situation triggers to avoid generic prose.'],
    };
  }

  return {
    score: 1,
    feedback: 'Thin context; model may fill blanks with generic assumptions.',
    strengths: ['Mentions context briefly'],
    suggestions: ['Add specific details from the brief rather than summarizing loosely.'],
  };
}

function evaluateSources(text: string): RubricDimensionScore {
  const clean = text.trim();
  if (!clean || clean.length < 5) {
    return {
      score: 0,
      feedback: 'No source grounding provided. Model may hallucinate freely.',
      strengths: [],
      suggestions: ['Add explicit grounding: "Use ONLY the provided facts below. If information is missing, label as Unknown."'],
    };
  }

  const hasStrictBoundary = /\b(only|exclusively|strictly|grounded in|do not assume|do not invent|label as unknown|unsupported|source material|reference only)\b/i.test(clean);
  const hasNamedSource = /\b(document|facts|brief|table|notes|approved|release|catalog|transcript|url|dataset|report)\b/i.test(clean);

  if (hasStrictBoundary && hasNamedSource && clean.length >= 35) {
    return {
      score: 3,
      feedback: 'Exemplary source boundaries with explicit hallucination prevention directives.',
      strengths: ['Strict boundary phrases ("use only", "do not invent")', 'Explicit rule for handling unknowns'],
      suggestions: [],
    };
  }

  if (hasNamedSource || hasStrictBoundary) {
    return {
      score: 2,
      feedback: 'Sources mentioned, but could enforce stricter boundaries against guessing.',
      strengths: ['References source materials'],
      suggestions: ['Add: "If a detail is not in the source text, state that it is unconfirmed rather than estimating."'],
    };
  }

  return {
    score: 1,
    feedback: 'Implicit or weak source statement.',
    strengths: ['Mentions using information'],
    suggestions: ['Explicitly instruct the model which documents/facts it is permitted to draw from.'],
  };
}

function evaluateConstraints(text: string): RubricDimensionScore {
  const clean = text.trim();
  if (!clean || clean.length < 5) {
    return {
      score: 0,
      feedback: 'No constraints declared.',
      strengths: [],
      suggestions: ['Set limits: word count, tone (e.g. calm, authoritative), brand rules, and explicit exclusions.'],
    };
  }

  const hasLengthTone = /\b(words|characters|tone|style|voice|concise|formal|urgent|accessible|plain language)\b/i.test(clean);
  const hasNegativeExclusion = /\b(do not|avoid|never|exclude|without|no jargon|no hype|do not speculate)\b/i.test(clean);

  if (hasLengthTone && hasNegativeExclusion && clean.length >= 40) {
    return {
      score: 3,
      feedback: 'Comprehensive positive and negative constraints (length, tone, brand exclusions).',
      strengths: ['Specifies tone and length', 'Contains negative constraints ("Do not speculate/over-promise")'],
      suggestions: [],
    };
  }

  if (hasLengthTone || hasNegativeExclusion || clean.length >= 25) {
    return {
      score: 2,
      feedback: 'Helpful constraints provided.',
      strengths: ['Sets formatting or tone guidelines'],
      suggestions: ['Add negative constraints (things the model must actively avoid, e.g. speculative claims).'],
    };
  }

  return {
    score: 1,
    feedback: 'Minimal constraints; response may wander in length or tone.',
    strengths: ['Brief guideline present'],
    suggestions: ['Define exact word/character count caps and forbidden words.'],
  };
}

function evaluateOutput(text: string): RubricDimensionScore {
  const clean = text.trim();
  if (!clean || clean.length < 5) {
    return {
      score: 0,
      feedback: 'No output format specified.',
      strengths: [],
      suggestions: ['Specify structure: e.g. "Return a 3-column table with [Column 1], [Column 2], [Column 3]" or structured markdown headings.'],
    };
  }

  const hasStructure = /\b(table|bullet|headings|json|columns|sections|template|numbered|options|matrix|schema)\b/i.test(clean);
  const isDetailed = clean.length >= 35;

  if (hasStructure && isDetailed) {
    return {
      score: 3,
      feedback: 'Clear, structured output template specified for immediate operational use.',
      strengths: ['Specifies exact layout/schema', 'Prevents unformatted walls of text'],
      suggestions: [],
    };
  }

  if (hasStructure || clean.length >= 20) {
    return {
      score: 2,
      feedback: 'Output format mentioned.',
      strengths: ['Requests a specific format'],
      suggestions: ['List the exact section headings or column headers you expect in the reply.'],
    };
  }

  return {
    score: 1,
    feedback: 'Generic format request.',
    strengths: ['Mentions an output type'],
    suggestions: ['Ask for bullet points, a comparison table, or labeled sections.'],
  };
}

function evaluateVerification(text: string): RubricDimensionScore {
  const clean = text.trim();
  if (!clean || clean.length < 5) {
    return {
      score: 0,
      feedback: 'Zero verification instructions. High risk of unverified AI claims.',
      strengths: [],
      suggestions: ['Instruct the model: "1. List any assumptions made. 2. Flag items needing human verification. 3. Distinguish facts from recommendations."'],
    };
  }

  const hasVerificationSteps = /\b(verify|assumptions|fact-check|flag|unknown|evidence|separate facts|human review|validate|source check)\b/i.test(clean);
  const hasMultipleChecks = (clean.match(/\b(assumption|flag|check|verify|separate|review|evidence)\b/gi) || []).length >= 2;

  if (hasVerificationSteps && hasMultipleChecks && clean.length >= 40) {
    return {
      score: 3,
      feedback: 'Robust human-in-the-loop verification protocol integrated directly into prompt.',
      strengths: ['Asks model to identify assumptions', 'Demands separation of facts from recommendations', 'Flags unverified data points'],
      suggestions: [],
    };
  }

  if (hasVerificationSteps || clean.length >= 20) {
    return {
      score: 2,
      feedback: 'Verification mentioned.',
      strengths: ['Includes a checking step'],
      suggestions: ['Ask the AI to explicitly list which claims require factual confirmation by a human communicator.'],
    };
  }

  return {
    score: 1,
    feedback: 'Vague check instruction (e.g. "make sure it\'s accurate").',
    strengths: ['Mentions accuracy'],
    suggestions: ['Do not just say "be accurate"—instruct the model to list all assumptions and unknowns.'],
  };
}

export function compilePromptToText(fields: PromptCanvasFields): string {
  return `### TASK / OUTCOME
${fields.outcome || '[No outcome specified]'}

### TARGET AUDIENCE
${fields.audience || '[No audience specified]'}

### CONTEXT & SITUATION
${fields.context || '[No context specified]'}

### APPROVED SOURCES & GROUNDING BOUNDARIES
${fields.sources || '[No sources specified]'}

### CONSTRAINTS & BRAND RULES
${fields.constraints || '[No constraints specified]'}

### OUTPUT FORMAT
${fields.output || '[No output format specified]'}

### HUMAN VERIFICATION INSTRUCTIONS
${fields.verification || '[No verification instructions specified]'}`;
}

export function compileToCopilotFormat(fields: PromptCanvasFields): string {
  return `[GOAL]
${fields.outcome || '[Task / Deliverable]'}

[CONTEXT]
Target Audience: ${fields.audience || 'General'}
Background: ${fields.context || 'None provided'}

[EXPECTATIONS]
Constraints: ${fields.constraints || 'Standard professional tone'}
Format: ${fields.output || 'Structured response'}

[SOURCE]
Grounding: ${fields.sources || 'Current authorized document'}

[VERIFICATION PROTOCOL]
${fields.verification || 'Flag any assumption or claim requiring human verification before publishing.'}`;
}
