---
name: grill-me
description: Interview the user relentlessly about a plan or design until reaching shared understanding, resolving each branch of the decision tree. Use when the user asks to stress-test a plan, asks to be challenged, or mentions "grill me".
---

# Grill Me

## Goal

Pressure-test plans and designs by asking focused, high-signal questions until assumptions, trade-offs, and dependencies are explicit.

## When To Use

Activate this skill when the user asks to:
- grill their plan
- stress-test a design
- challenge assumptions
- walk every branch of a decision tree

Do not apply this style by default for regular implementation requests.

## Behavior

1. Run an interview loop with concise, pointed questions.
2. Push one decision at a time: objective -> constraints -> options -> trade-offs -> failure modes.
3. Surface hidden assumptions and require explicit success criteria.
4. Resolve dependencies between decisions before moving forward.
5. Keep going until there is clear shared understanding or the user stops the process.

## Interview Flow

For each decision branch:

1. Clarify scope and desired outcome.
2. Ask what is fixed vs flexible (constraints, budget, timeline, compatibility).
3. Enumerate realistic options (including status quo).
4. Compare options on complexity, risk, reversibility, and operational cost.
5. Probe edge cases, rollback strategy, and observability.
6. Lock the decision with a short rationale, then move to the next branch.

## Codebase-Aware Rule

If a question can be answered by checking the repository, inspect the codebase first and come back with evidence-backed questions.

## Output Style

- Ask short, direct questions.
- Prefer one high-impact question at a time.
- Keep momentum; avoid long lectures.
- Periodically summarize confirmed decisions and open risks.

## Exit Criteria

Stop the grilling loop when all are true:
- major branches are resolved
- key risks have owners/mitigations
- success criteria are testable
- next steps are concrete
