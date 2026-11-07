# @minifw Monorepo Guide

## Repository Model

This is one Git repository and pnpm workspace. The `lib/core`, `lib/docs`,
`lib/helpers`, `lib/markdown`, `lib/server`, and `lib/tooling` directories are
separate `@minifw/<package>` packages. They can be published and versioned
independently with Changesets. The root package is private.

- Use pnpm for dependencies and workspace management. Install once at the root;
  keep only `pnpm-lock.yaml`, not per-package Bun or npm lockfiles.
- Use `workspace:*` for internal dependencies and import package public exports,
  not sibling source files through relative paths.
- Use Bun for package runtime, builds, and tests. Node is only a tooling host
  for pnpm, Turbo, Changesets, ESLint, Prettier, and ts; it is not a server
  target.
- Use root scripts and Turbo to orchestrate package tasks. Scope work with
  `--filter=@minifw/<package>` or run
  `pnpm --filter @minifw/<package> <script>`.

## Project Direction

These packages continue the legacy mini-fw project and will ship as its next
version. Use `../minifw` relative to this monorepo root as the legacy reference.
Consult the relevant primitive and its tests for context; do not add a
dependency on that checkout or copy its architecture indiscriminately. If
unavailable, ask for the relevant source rather than inventing legacy behavior.

- Target Bun exclusively. The `mini` server function uses `Bun.serve`; do not
  add framework adapters or alternative server runtimes.
- Develop a compiler for templating features and reduced page-load and
  cold-start work. Treat upcoming Bun ahead-of-time (AOT) support as an
  opportunity to investigate, not an available capability or a measured speedup.
- Keep primitives robust, small, and human-editable. Prefer explicit code and
  narrow contracts over unnecessary abstraction or generated scaffolding.
- The user writes tests for each function, then requests stubs or
  implementation. Preserve those tests as the behavioral contract. Do not author
  or rewrite tests by default; report gaps and ask before extending or changing
  that contract.

## Shared Configuration

- Edit root `eslint.config.ts`, `prettier.config.ts`, `tsconfig.json`, and
  `.agents/skills/` directly. There is no tooling synchronization or copied
  package guidance. Package tsconfigs only extend the root and set their scope.
- Shared Bun build and cleanup scripts live in `scripts/`; `turbo.json` owns the
  task graph and cache outputs. Declare internal package dependencies in
  manifests so Turbo can order builds correctly.
- `lib/tooling` is an empty package reserved for future developer-facing tools,
  not the owner or distributor of repository configuration.
- Keep package-specific source, exports, and release metadata in each package.
  Builds emit `dist/`; package types point to shipped ts source. Do not expose
  tests or private source paths as public exports.

## Validation and Releases

- Run `pnpm lint:fix` for documentation changes. Run `pnpm check` for shared
  configuration changes and before release; use focused package scripts during
  implementation, followed by relevant root checks.
- The scaffold test commands allow no tests. That is a bootstrap convenience,
  not evidence of behavioral coverage. Do not generate primitive tests unless
  asked; the user will write them.
- Run `pnpm changeset` for releasable changes, `pnpm version:packages` to
  consume changesets and update versions/changelogs, and `pnpm release` only
  when asked to publish. Versions are independent, not automatically locked
  together.
- All packages start at `0.0.0` as unpublished scaffolds. Choose intended next
  release versions deliberately; do not publish empty scaffolds.

## Skills

| Skill                       | When to Use                                                                                | Path                                                                           |
| --------------------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| Architecture and public api | Changing package exports, module boundaries, compiler behavior, or workspace dependencies. | [.agents/skills/architecture/SKILL.md](.agents/skills/architecture/SKILL.md)   |
| JSDoc and public docs       | Adding or revising exported apis, types, examples, or api documentation.                   | [.agents/skills/jsdoc/SKILL.md](.agents/skills/jsdoc/SKILL.md)                 |
| Testing                     | Implementing user-authored tests or explicitly changing Bun tests and fixtures.            | [.agents/skills/testing/SKILL.md](.agents/skills/testing/SKILL.md)             |
| Linting and formatting      | Resolving quality findings or changing shared configuration.                               | [.agents/skills/code-quality/SKILL.md](.agents/skills/code-quality/SKILL.md)   |
| Packaging and release       | Changing Bun artifacts, metadata, Turbo tasks, or Changesets releases.                     | [.agents/skills/build-release/SKILL.md](.agents/skills/build-release/SKILL.md) |
| Documentation voice         | Writing READMEs, guides, changelogs, comments, or JSDoc.                                   | [.agents/skills/documentation/SKILL.md](.agents/skills/documentation/SKILL.md) |
