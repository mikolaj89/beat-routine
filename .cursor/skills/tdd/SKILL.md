---
name: tdd
description: Apply test-driven development with a practical red-green-refactor loop. Use when the user wants test-first implementation, mentions TDD or red-green-refactor, or asks to build/fix behavior through tests.
---

# Test-Driven Development

Use a behavior-first, one-test-at-a-time loop.

## Defaults

- Default to a lightweight TDD flow for small changes.
- Use one failing test for one behavior, then implement minimal code to pass.
- Prefer tests through public interfaces.
- Refactor only after returning to green.

## When To Ask Before Coding

Ask for clarification only when one of these is unclear:
- expected behavior
- public interface changes
- test priority (what matters most)

For straightforward fixes with obvious expected behavior, proceed directly with TDD.

## Core Loop

1. **Pick one behavior**
   - Choose the smallest valuable behavior to verify next.
2. **RED**
   - Add one failing test for that behavior.
3. **GREEN**
   - Implement only enough code to pass the new test.
4. **REFACTOR**
   - Improve design/readability while all tests remain green.
5. Repeat for the next behavior.

## Quality Rules

- Test behavior, not implementation details.
- Avoid brittle checks on internal collaborators/private structure.
- Keep tests readable and outcome-focused.
- Do not write speculative code for future tests.
- Avoid horizontal slicing (all tests first, all code later).

## Practical Test Selection

Default preference:
1. Integration-style tests through stable public boundaries.
2. Unit-style tests when behavior is best expressed at a pure-function/module boundary.

Choose the smallest layer that still validates real behavior clearly.

## Cost And Speed Guardrails

- Keep each cycle small; do not batch many tests in one step.
- Limit planning overhead for trivial fixes.
- Reuse existing test patterns in the repo before inventing new harnesses.
- If a test setup is expensive, start with a narrower public boundary and expand only if needed.

## Per-Cycle Checklist

- [ ] Exactly one new behavior is under test
- [ ] Test fails before implementation (RED)
- [ ] Minimal code makes it pass (GREEN)
- [ ] Refactor happens only on green
- [ ] Tests assert observable behavior

## Done Criteria

- Requested behavior is covered by tests.
- All relevant tests pass.
- Any refactors preserve behavior and test clarity.
