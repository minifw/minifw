---
name: code-quality
description:
  "Use when: resolving or configuring ESLint, ts, Unicorn, JSDoc linting,
  Prettier, formatting warnings, code-quality scripts, or reviewing readability
  and maintainability of Bun primitives and compiler code."
user-invocable: true
---

# Code Quality

## Human-Editable Code

- Prefer direct control flow, descriptive names, small functions, and explicit
  types at public boundaries. Keep each primitive understandable and editable
  without relying on AI generation or regeneration.
- Avoid speculative abstractions, generic adapter layers, large generated
  scaffolds, and unrelated cleanup. Use Bun-native server apis rather than
  portability machinery; Bun-supported `node:` imports are not by themselves a
  commitment to Node runtime support.
- Keep compiler implementation source hand-maintainable and distinguish it from
  emitted artifacts. Fix the compiler source instead of hand-patching generated
  output, and keep diagnostics useful to a person editing templates.
- Preserve user-authored test contracts. Do not weaken tests or add lint/type
  suppressions to hide a behavioral defect; report genuine contract conflicts.
- Optimize only demonstrated bottlenecks, with measurements and readable code.
  Do not trade away correctness or maintainability for speculative AOT gains.

## Tooling Ownership

- Shared configs, dependencies, and skills live at the monorepo root. Edit them
  directly; do not reintroduce tooling sync or per-package copies. Package
  tsconfigs only extend the root and define their source scope.
- ESLint parses ts with `typescript-eslint` and reports Prettier differences as
  warnings.
- Prettier, including `prettier-plugin-jsdoc`, owns source and JSDoc formatting.
- The ts compiler owns unused-local and unused-parameter validation because it
  correctly understands this repository's type and documentation patterns.
- Unicorn protects general JavaScript quality; narrowly configure exceptions
  only for documented runtime compatibility constraints.

## Intentional Exceptions

- Required JSDoc is limited to exported declarations. Internal comments are
  optional and concise.
- The six public `src/index.ts` entrypoints may remain empty during scaffolding;
  Unicorn's empty-file rule remains enabled for all other files.

## Commands

Run these scripts with pnpm from the root; do not invoke underlying tools
directly. Pnpm manages dependencies, Turbo runs package tasks, and Bun runs
package builds and tests.

- `pnpm lint`: check root and package files with Prettier and ESLint.
- `pnpm lint:fix`: apply deterministic Prettier and ESLint fixes.
- `pnpm test:types`: type-check root scripts/configs and all packages.
- `pnpm test:unit`: run Bun `*.spec.ts` tests except `*.e2e.spec.ts` via Turbo.
- `pnpm test:e2e`: run Bun `*.e2e.spec.ts` suites via Turbo without caching.
- `pnpm test:all`: run every package test tier.
- `pnpm check`: lint, type-check, test, and build the entire workspace.
- Use `pnpm --filter @minifw/<package> <script>` for a focused package command,
  or append `--filter=@minifw/<package>` to a root Turbo script.

## Required Validation

- After the first source change, run the nearest focused check. Finish with
  `pnpm lint:fix` and the relevant test tiers; run `pnpm check` after shared
  configuration or task-graph changes.
- After a documentation-only change, run `pnpm lint:fix`.
- Apply deterministic formatter and lint fixes before reporting remaining
  findings.

## Procedure

1. Identify the exact rule and determine whether it catches a real bug, a
   runtime-compatibility conflict, or an intentional fixture behavior.
2. Prefer a compatible code fix when a rule catches a real bug.
3. If a rule conflicts with an intentional runtime dependency or test fixture,
   add the narrowest config override and document why.
4. Follow the required validation procedure above.
