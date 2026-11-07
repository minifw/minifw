---
name: architecture
description:
  "Use when: changing a package's public api, exports, module boundaries,
  architecture, primitives, compiler or templating behavior, or Bun runtime
  boundaries, pnpm workspace dependencies, or Turbo task boundaries; consult the
  legacy mini-fw reference and user-authored tests."
user-invocable: true
---

# Package Architecture

## Repository Boundaries

- Packages live in `lib/<package>` and share one Git repository, pnpm workspace,
  root configuration, and skill set. Packages retain independent public
  contracts and Changesets versions.
- Declare internal dependencies with `workspace:*` and consume package exports.
  Do not import sibling implementation files or introduce cycles. Turbo uses
  manifest dependencies to order package builds.
- Read `package.json`, the nearest source module, and its tests before changing
  a package boundary. These define the package's actual layout and validation
  commands.
- Treat paths explicitly exported from `package.json` as public api. Keep
  unexported modules implementation details unless the change deliberately
  expands the public contract.

## Next-Version Direction

- These packages continue mini-fw as its next version. Use `../minifw`, relative
  to the monorepo root, as the legacy reference. Read the matching primitive and
  tests to understand prior behavior; do not import that checkout or preserve
  obsolete architecture merely for parity.
- Bun is the sole server runtime. Serve through `mini` using `Bun.serve`; do not
  introduce framework adapters, runtime detection, or Node/Deno server support.
  Browser code remains browser code, not an alternative server target.
- Introduce compilation to support templating features and move eligible work
  out of request handling and startup. Keep compile-time inputs, emitted output,
  runtime work, and diagnostics explicit and independently testable.
- Preserve dynamic request data and escaping guarantees across compilation. Do
  not precompute request-dependent values or silently change rendering order.
- Investigate Bun AOT support only against the available Bun version and its
  documented capabilities. Do not require unreleased features or claim faster
  page loads or cold starts without representative measurements.
- Recreate one primitive at a time from user-authored tests. Keep the code
  small, direct, and easy to edit by hand; introduce abstractions only when they
  remove demonstrated complexity.

## Design Rules

- Keep stable public contracts narrow and document intentional changes to
  exports, types, runtime requirements, and compatibility.
- Preserve established error handling, data flow, and runtime behavior unless
  the task explicitly changes them.
- Keep server-only and browser-only code separate when a package has both
  environments. Avoid importing environment-specific apis across that boundary.
- Prefer the repository's existing module and test organization over creating a
  new convention.

## Procedure

1. Identify the affected public contract and the owning module.
2. Review current exports, user-authored tests, and the relevant legacy
   primitive. Distinguish required behavior from intentionally changed legacy
   behavior.
3. When asked, stub or implement only the requested function against those
   tests. Report missing or conflicting expectations; ask before writing or
   changing tests or expanding the contract.
4. Run `pnpm --filter @minifw/<package> test:unit` or `test:e2e`, scoped to the
   affected files. Root `pnpm test:unit --filter=@minifw/<package>` uses Turbo
   and builds workspace dependencies first. Use `pnpm build` when exports or
   build boundaries change; do not invoke underlying tools directly.
5. Follow the validation procedure in the code-quality skill.
