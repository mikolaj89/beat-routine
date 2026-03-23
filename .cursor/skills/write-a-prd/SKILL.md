---
name: write-a-prd
description: Create a practical PRD through focused user interview, codebase exploration, and module design. Use when the user asks to write a PRD, plan a feature, or create product requirements.
---

# Write A PRD

Create a PRD that is implementation-aware, scoped, and ready for execution.

## Modes

Default to `quick` unless the user asks for a deep process.

- `quick`: minimal interview, targeted codebase checks, concise PRD.
- `full`: branch-by-branch interview, broader repo validation, detailed PRD.

If unclear, ask: "Do you want quick or full PRD mode?"

## Workflow

1. **Collect problem context**
   - Ask for the problem, target users, desired outcomes, constraints, and non-goals.
2. **Explore codebase for evidence**
   - Validate assumptions against current architecture and existing patterns.
   - If uncertainty remains, ask focused follow-up questions.
3. **Resolve decisions**
   - Clarify major decisions and dependencies one-by-one.
   - Prefer one high-impact question per turn.
4. **Define module-level plan**
   - Identify modules to build/modify.
   - Prefer deep, stable module boundaries with testable interfaces.
5. **Align on testing approach**
   - Decide what behavior to test, where tests should live, and what prior art to follow.
6. **Draft PRD**
   - Use the template below.
7. **Choose output target**
   - Default: return PRD in chat markdown.
   - Create a GitHub issue only if the user explicitly asks.

## Guardrails

- Keep the process proportional to feature size.
- Do not force exhaustive branching for small or low-risk tasks.
- Avoid "extremely extensive" lists; be comprehensive within release scope.
- Prefer evidence-backed statements over assumptions.
- If interview depth starts to stall progress, summarize open questions and propose defaults.

## PRD Template

```markdown
## Problem Statement

The user-facing problem and why it matters now.

## Goals and Success Criteria

- Goal 1
- Goal 2
- Measurable success criteria

## Non-Goals

- Explicitly out-of-scope items

## Solution Overview

A user-centered description of the proposed solution.

## User Stories

Numbered stories scoped to the expected release boundary:

1. As a <actor>, I want <feature>, so that <benefit>.

## Implementation Decisions

- Key architecture and module decisions
- Interface or contract changes
- Data/schema/API decisions
- Important trade-offs and rationale

Do not include fragile file-level implementation details.

## Testing Decisions

- What behaviors must be tested
- Which modules/layers get tests
- Prior art and test style to follow
- Risks not fully covered by tests

## Rollout and Risk

- Release strategy (flags, staged rollout, migration if needed)
- Key risks and mitigations

## Open Questions

- Remaining decisions requiring input

## Further Notes

Any additional context, assumptions, or links.
```

## Output Quality Bar

Before finalizing, ensure:

- Problem and goals are specific, not generic.
- Scope is explicit (what ships now vs later).
- Decisions are traceable to constraints.
- Testing plan covers critical external behavior.
- Next implementation steps are clear.
