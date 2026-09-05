# MarCom GPT: AI Learning Lab

Practice clearer prompts, better verification, and more thoughtful AI use in marketing and communications.

MarCom GPT is an interactive learning environment for students and professionals. Guided stations combine a practical brief, a structured prompt workbench, short activities, illustrative outputs, and a quiz. Learners can track progress, collect badges, and revisit their work.

**[Open the learning lab](https://mralexgarrido.github.io/4360-marcomgpt/)** · [Instructor guide](TEACHING.md) · [Report an issue](https://github.com/mralexgarrido/4360-marcomgpt/issues)

## How a station works

1. Read the **brief** and consider the context and risks before composing a prompt.
2. Use the **prompt workbench** to define the outcome, audience, context, sources, constraints, output, and verification.
3. Work through the station's short activities, compare the illustrative outputs, and complete the quiz.
4. Review progress, revisit weak areas, and apply the prompt framework to a task of your own.

The interface includes student and professional starter modes, progress and readiness views, badges, accessibility settings, and an export/import interface. These are learning supports, not professional credentials or an independently validated readiness assessment.

### What the AI feedback means

The prompt workbench scores the draft with a **deterministic, local seven-part rubric** in `src/utils/promptScorer.ts`. This is feedback about prompt structure, not a live language model evaluating factual correctness. The example-output viewer presents instructional material; examples should not be mistaken for newly generated or verified research.

MarCom GPT is a teaching application, not an official OpenAI, Microsoft, or Google product. References to other tools support instruction and do not imply endorsement.

## Progress and privacy

The application saves learning state in the current browser. It is not a shared classroom gradebook or a cross-device account. Clearing site data, using a different browser profile, or restricting browser storage can affect saved progress.

Use fictional or non-sensitive material in prompts. Treat exported learning data as your own local file, and remove personal information before sharing a bug report. The app includes an export/import interface; check an exported file before relying on it as a backup of important work.

## Run locally

Install Node.js and npm compatible with the dependencies in the checked-in lockfile, then run:

```sh
git clone https://github.com/mralexgarrido/4360-marcomgpt.git
cd 4360-marcomgpt
npm ci
npm run dev
```

The development command uses port 3000. Open the address printed by Vite.

```sh
npm run lint
npm run build
npm run preview
```

Here, **`lint` runs TypeScript checking** (`tsc --noEmit`), not ESLint. The build creates `dist/` and copies `index.html` to `404.html`. That copy step uses a POSIX `cp` command; on Windows, run the existing build in a compatible shell such as Git Bash or WSL.

The repository contains npm and Bun lockfiles. The committed GitHub Pages workflow uses **npm**, so the instructions follow that workflow without removing the Bun lockfile. The manifest includes an AI SDK and other packages beyond the local teaching workflow; installing a dependency does not establish that an exercise sends a live model request. Do not place privileged API keys in browser code or public artifacts.

## Source map

| Path | Purpose |
| --- | --- |
| `src/App.tsx` | Station navigation, learner state, milestones, and progress dialogs |
| `src/components/` | Workbench, activities, quizzes, example viewer, and learner controls |
| `src/data/modules/` | Station content and instructional examples |
| `src/data/sourceLibrary.ts` | Sources presented in the learning interface |
| `src/utils/` | Storage and prompt-scoring helpers |
| `.github/workflows/deploy.yml` | Existing GitHub Pages build and deployment |

The application uses React, TypeScript, Vite, and Tailwind CSS. See [package.json](package.json) for scripts and dependencies, and [MAINTAINING.md](MAINTAINING.md) for deployment and validation details.

## Contributing and support

Useful contributions include clearer teaching examples, improved feedback, keyboard usability, and reproducible bug fixes. Open an [issue](https://github.com/mralexgarrido/4360-marcomgpt/issues) describing the learner problem, then keep the change focused on a separate branch. Include actual validation results and explicitly identify untested behavior.

Maintained by [Alex Garrido](https://github.com/mralexgarrido). Preserve existing source license notices, including Apache-2.0 notices where present, and third-party attribution. This documentation does not relicense code, instructional resources, trademarks, or external material.
