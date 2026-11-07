---
name: documentation
description:
  "Use when: writing or revising README files, guides, changelogs, comments,
  JSDoc, migration notes, Bun runtime requirements, compiler documentation, or
  other documentation for the next mini-fw version."
user-invocable: true
---

# Documentation voice

## Case

- Write documentation in lowercase wherever casing is not mandatory or needed
  for clarity. This includes headings, prose, list items, table labels, and
  callout text.
- Preserve required or meaningful casing exactly: code blocks, commands, file
  paths, package names, api names, programming-language syntax, brand names,
  proper nouns, and quoted user-facing text.
- Prefer lowercase for common technical acronyms in prose, including `html`,
  `css`, `htmx`, and `api`, unless their exact casing is required by a literal
  identifier or needed for clarity.
- Use sentence case only when it makes a name or distinction clearer. Do not
  capitalize text merely because it is a heading or a conventional label.
- Keep standard sentence case for ai-facing guidance and formal policy or legal
  documents, such as skill files, `AGENTS.md`, `SECURITY.md`, and `LICENSE.md`.
  Their conventional presentation takes priority over the lowercase brand voice.

## Voice

- Write with the relaxed, direct voice of a capable one-person side project.
- Keep explanations practical and conversational; prefer plain language over
  corporate or marketing phrasing.
- Prefer familiar shorthand for commonly abbreviated terms when it keeps the
  writing clear, such as `ts` instead of the full language name. Use it
  sparingly; do not make the prose cryptic or replace required identifier
  casing.
- Describe the framework's real capability with confidence. Do not make it sound
  smaller or less useful just because its documentation is casual.
- Use the repository's existing structure and terminology, and keep technical
  instructions specific enough to act on.
- Describe page, component, and `html` output as rendered when discussing
  request-time behavior. Use compiled or built accurately for compiler output
  and build steps; do not claim that mini-fw has no application build step.

## Project Direction

- Keep written guides in root `docs/`, separate from the four publishable
  packages in `lib/`: core, helpers, markdown, and server. Documentation is not
  an `@minifw/docs` package and has no independent build or release. The old
  `@minifw/tooling` package is removed; repository tools live at the root.
- Describe one pnpm monorepo with separately publishable packages, root shared
  configs, Bun runtime/builds/tests, Turbo tasks, and Changesets releases. Use
  current pnpm commands, not the retired tooling sync or prepare pipeline.
- Present these packages as the continuation and next version of mini-fw.
  Consult `../minifw` relative to the development workspace for legacy context,
  and document intentional migration differences without promising full parity.
- State Bun as the required server runtime, with `mini` using `Bun.serve`.
  Remove framework-agnostic or multi-runtime claims from documentation you
  touch.
- Distinguish compiler goals from implemented features. Explain actual template
  compilation and runtime boundaries without promising unreleased Bun AOT
  support or unmeasured cold-start and page-load improvements.
- Keep examples and explanations small enough to maintain by hand. Describe
  tested behavior, not speculative apis or generated implementation details.

## Naming

- Call the framework `mini-fw` when using its name, "mini framework" when using
  a descriptive phrase, and `@minifw` when referring to the package scope or
  organization.
- Do not call it `MiniFw`, `Mini Framework`, or `Mini`. `MiniFw` is legacy
  naming, while the other forms are ambiguous or do not match the brand.

## Review

1. Lowercase every non-literal piece of documentation that remains clear, except
   ai-facing guidance and formal policy or legal documents.
2. Verify that every literal identifier and code example retains its required
   casing.
3. Prefer lowercase common acronyms and familiar shorthand where they keep the
   writing clear and casual.
4. Distinguish rendering from compilation and build steps accurately; verify
   runtime, compiler, migration, and performance claims against current
   behavior.
5. Verify that framework references use `mini-fw`, "mini framework", or
   `@minifw` as appropriate, and do not use the disallowed variants.
6. Read the result aloud once: it should feel like a person explaining a
   powerful tool they maintain, not a product brochure.
