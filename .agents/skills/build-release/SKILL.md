---
name: build-release
description:
  "Use when: changing package output, ts declarations, package exports or
  metadata, compiler artifacts, Bun AOT experiments, package publishing, or
  preparing the next mini-fw release with pnpm, Turbo, and Changesets."
user-invocable: true
---

# Packaging and Release

## Distribution Contract

- Each package defines its own packaging and distribution contract in
  `package.json`: entry points, exports, files, types, and publish registry.
- Do not assume source is published directly or that package output uses a
  particular directory. Inspect package scripts and packaging metadata first.
- Keep unexported modules private unless a release intentionally expands the
  public api.
- The root package is private. Workspace packages are independently versioned
  with Changesets; internal dependencies use `workspace:*`, which pnpm rewrites
  to published version ranges when packing.
- The scaffold ships Bun-built ESM in `dist/` and ts source for types. Inspect
  `files` and `exports`; do not publish specs, fixtures, or generated caches.

## Runtime and Compiler Direction

- These packages continue the legacy mini-fw project as its next version, not an
  unrelated framework. Use `../minifw` relative to the development workspace to
  understand migration needs, while retaining independent package versions. Do
  not change versions or publish merely because implementation is underway.
- Target Bun exclusively; document the supported Bun version and keep the server
  path centered on `mini` and `Bun.serve`. Do not add compatibility packages,
  framework adapters, or alternate-runtime build matrices.
- Inspect each package's actual compiler pipeline before specifying artifacts.
  Distinguish template compilation, package distribution, and Bun executable
  compilation; do not assume every package emits templates or an executable.
- Explore upcoming Bun AOT support without making it a release prerequisite
  until available and verified. Record exact Bun versions, reproducible
  commands, and representative cold-start and page-load measurements for
  performance claims.
- Verify compiled artifacts preserve the user-authored behavioral contract,
  including dynamic rendering and diagnostics, and ship only intended outputs.
  Keep hand-maintained compiler source separate from generated artifacts.

## Commands

- Install dependencies once at the root with `pnpm install`. Use
  `pnpm install --frozen-lockfile` in CI; do not create per-package lockfiles.
- Run `pnpm build` for Turbo-orchestrated Bun builds and `pnpm check` before
  release. Shared scripts live at the root, not in a published tooling config.
- Run `pnpm changeset` to record affected packages and intentional version
  bumps.
- Run `pnpm version:packages` to generate versions and changelogs and update the
  lockfile. Never version or publish without a user request.
- Run `pnpm pack:check` to create reviewable tarballs in `.artifacts/` without
  publishing. Inspect package exports, type sources, and internal dependency
  ranges in the tarballs.
- Run `pnpm release` only when authorized. It validates/builds and then invokes
  Changesets publishing; do not reintroduce the legacy tooling prepare pipeline.

## Release Procedure

1. Review changesets and migration implications. The `0.0.0` scaffold versions
   are placeholders, not a decision about the next published release.
2. When asked to prepare a release, run `pnpm version:packages`; review
   generated package versions, changelogs, internal ranges, and lockfile
   changes.
3. Run `pnpm check` and `pnpm pack:check`; inspect tarball contents and verify
   public entry points and shipped ts types in a clean Bun consumer.
4. Commit and publish only when explicitly asked. Run `pnpm release` for npm
   publishing; configure any additional registry deliberately rather than
   carrying over the old generated jsr setup.

Changesets status requires an initial commit and a resolvable `main` base. Do
not create that commit automatically. CI fetches full history and uses
`origin/main`.
