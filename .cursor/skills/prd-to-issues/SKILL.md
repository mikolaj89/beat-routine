---
name: prd-to-issues
description: Convert a PRD into dependency-aware GitHub issues using thin vertical slices. Use when the user asks to break a PRD into implementation tickets or create issues from a PRD.
---

# PRD To Issues

Break a PRD into independently grabbable, end-to-end issues.

## Modes

Default to `quick` unless the user requests deeper iteration.

- `quick`: minimal clarifications, compact slice set, one review round.
- `full`: deeper dependency checks, up to two review rounds.

If unclear, ask: "Quick or full breakdown?"

## Defaults

- Prefer draft-first behavior: propose slices and issue drafts before creating anything.
- Create GitHub issues only after explicit user confirmation.
- Keep issue bodies concise and reference the PRD instead of repeating it.

## Process

1. **Locate parent PRD**
   - Ask for PRD issue number or URL.
   - Fetch PRD once if needed (`gh issue view <number> --comments`).
2. **Optional repo check**
   - If architecture is unclear, do a targeted codebase exploration.
3. **Draft vertical slices**
   - Each slice must be a thin, complete path across all relevant layers.
   - Prefer AFK slices over HITL where possible.
4. **Validate with user**
   - Present numbered slices with type, blockers, and user stories covered.
   - Ask for merge/split/dependency corrections.
5. **Converge**
   - `quick`: 1 review round max.
   - `full`: 2 review rounds max.
   - If unresolved after max rounds, summarize open decisions and propose defaults.
6. **Create issues (optional)**
   - Only after explicit approval.
   - Create in dependency order so blocker links use real issue numbers.

## Vertical Slice Rules

- A slice is demoable or verifiable on its own.
- Avoid horizontal slices (UI-only, API-only, DB-only) unless explicitly requested.
- Prefer many thin slices over few thick slices.
- Keep each slice scoped to one primary outcome.

## Slice Output Format

For each proposed slice, include:

1. **Title**: short, outcome-focused
2. **Type**: `AFK` or `HITL`
3. **Blocked by**: slice numbers or "None"
4. **User stories addressed**: PRD story numbers
5. **Why this slice**: one sentence

## GitHub Issue Template

```markdown
## Parent PRD

#<prd-issue-number>

## What to build

Concise end-to-end behavior for this slice. Reference relevant PRD sections instead of duplicating long text.

## Acceptance criteria

- [ ] Criterion 1
- [ ] Criterion 2

## Blocked by

- None - can start immediately
<!-- or -->
- Blocked by #<issue-number>

## User stories addressed

- User story <number>
```

## Token And Quality Guardrails

- Avoid re-printing the full PRD in chat.
- Keep slice list and issue drafts compact; expand only on request.
- Reuse prior context instead of re-fetching unchanged PRD content.
- Prefer clear decisions over exhaustive debate.

## Safety

- Do not close or modify the parent PRD issue.
- Do not create issues without explicit user confirmation.
