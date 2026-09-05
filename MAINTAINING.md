# Maintainer guide

## Existing deployment path

`.github/workflows/deploy.yml` deploys to GitHub Pages on pushes to `main` or `master`, and by manual dispatch. It uses Node.js 20, npm, `npm ci`, and `npm run build`, then uploads `dist/`. The runtime version is recorded here as existing configuration, not a recommendation to avoid reviewing its support lifecycle.

The Vite base is relative (`./`). The build copies the application entry point to `dist/404.html`. Do not replace these settings or standardize lockfiles as a side effect of documentation work.

A documentation branch does not match the workflow's push branch filters. Merging into a configured deployment branch does, even when the only changes are Markdown. Confirm **Settings > Pages > Build and deployment** and review the Actions result before announcing a production update.

## Validation

Run `npm ci`, `npm run lint`, and `npm run build` using an environment compatible with the locked dependencies. `lint` is TypeScript checking; the build's `cp` step requires a compatible shell. No automated end-to-end test script is declared in the manifest.

Then check a station from brief through quiz; edit and score a prompt; switch learner modes; reload to check persistence; inspect export/import and reset; and review keyboard navigation, reduced-motion settings, mobile layout, and example/source links. State precisely which checks passed and which were not run.

Changing prompt scores or station completion rules requires special care: review existing saved progress and explain any effect on learners. Keep claims about scoring aligned with the deterministic rubric rather than describing it as a live AI evaluator.

## Updates and presentation

For a tested milestone, write user-facing release notes covering the learning improvement, fixes, limitations, and effects on saved work. Tie notes to a reviewed commit; do not fabricate version history or claim certification based on the app's badges.

Suggested About description: **Explore marketing and communications AI literacy through interactive learning stations, prompt exercises, and quizzes.** Suggested topics: `ai-literacy`, `marketing-education`, `prompt-engineering`, `react`, `typescript`.

Verify the hosted URL before setting the About website. Use a real screenshot without learner information for a repository social preview. These settings are not changed by this guide.

## Contribution and rollback

Use focused branches and describe the learner problem, files changed, and actual validation evidence. Preserve existing license notices, lockfiles, and workflow settings unless an approved task requires a change. Do not publish sensitive vulnerability details, keys, or student data in public issues.

Before merge, closing a documentation PR leaves the default branch unchanged. After an approved merge, revert the documentation commit through a new PR and retain the previous working Pages deployment as the rollback reference.
