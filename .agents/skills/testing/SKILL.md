---
name: testing
description:
  "Use when: stubbing or implementing primitives against user-authored tests,
  reviewing test gaps, or explicitly writing, updating, or debugging Bun tests,
  compiler tests, integration suites, end-to-end tests, or fixtures."
user-invocable: true
---

# Testing

## User-Owned Contract

- The default workflow is user-written tests for each function, followed by a
  request to stub or fill in functionality. Read those tests before editing and
  treat their observable expectations as the implementation contract.
- Do not generate tests, rewrite assertions, weaken coverage, or update
  snapshots to make an implementation pass unless explicitly asked. Report
  ambiguities, missing cases, or conflicts with the intended design for the user
  to resolve.
- If tests are absent, ask for them or for explicit permission to write them.
  When only a stub is requested, preserve signatures and make unfinished
  behavior explicit; do not fill in speculative functionality.
- Use the legacy `../minifw` checkout relative to the development workspace for
  behavioral context. Its tests are references, not an automatic contract for
  the next version; call out intentional differences.

## Test Layout

- Follow the package's established test layout, file suffixes, and test runner.
- Tests run in Bun. Pnpm invokes package scripts and Turbo orchestrates them; do
  not install a separate runner or multi-runtime test matrix.
- Name unit and integration tests `*.spec.ts`; name end-to-end tests
  `*.e2e.spec.ts`.
- Keep unit tests near the behavior they cover when that matches the local
  convention; use fixtures for integration scenarios that require real files.

## What to Test

- Test observable output and public contracts, not internal implementation
  details.
- For recreated primitives, review happy paths, boundary inputs, escaping,
  failures, and async behavior where relevant. Suggest missing cases rather than
  adding them without the user's request.
- For compiler changes, review template diagnostics, emitted output, dynamic
  request data, escaping, and compile/render integration. Compare compiled and
  runtime behavior where equivalence is part of the contract.
- Exercise server integration through `mini` and `Bun.serve`, with deterministic
  startup and teardown. Do not add a multi-runtime or framework-adapter matrix.
- Validate performance claims separately with representative page-load and
  cold-start measurements. Avoid brittle timing thresholds in correctness tests;
  verify Bun AOT capabilities before adding AOT-specific coverage.
- Exercise relevant integration and runtime boundaries when changing public
  APIs, I/O, client behavior, caching, or error handling.
- Prefer fixtures and end-to-end coverage when a string-only unit test cannot
  establish real packaging, import, or browser behavior.
- Use the package's established artifact and screenshot conventions for browser
  or UI test suites.

## Procedure

1. Read the user-authored tests for the requested function. Add or change tests
   only when explicitly asked; otherwise report contract gaps.
2. Run `pnpm --filter @minifw/<package> test:unit <test-path>` or `test:e2e` for
   a focused suite; do not invoke `bun test` directly. Use root
   `pnpm test:unit --filter=@minifw/<package>` or `pnpm test:e2e` for Turbo's
   dependency-aware runs. Establish the initial result before implementation and
   rerun the focused suite after the first change. Build workspace dependencies
   before direct filtered tests if they import compiled package entry points.
3. Implement the smallest readable change that satisfies the contract. When
   authoring tests by request, assert observable behavior rather than incidental
   implementation details.
4. Finish with `pnpm lint:fix` and the relevant type, unit, and end-to-end
   checks. Use `pnpm test:all` for all packages when shared behavior changes.
   Scaffold scripts allow no tests; a successful empty run does not establish
   coverage.
