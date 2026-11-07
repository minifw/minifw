---
name: jsdoc
description:
  "Use when: adding or changing exported functions, classes, interfaces, types,
  overloads, examples, Bun primitives, compiler contracts, or api documentation
  based on user-authored tests."
user-invocable: true
---

# JSDoc

## Required Scope

JSDoc is required for exported functions and classes. Public interfaces and
types should also have concise descriptions when they define consumer-facing
concepts. Internal implementation details do not need exhaustive api
documentation.

## Style

- Use `{@link SymbolName}` to connect related public api concepts.
- Describe observable behavior, constraints, and return values.
- Use user-authored tests and current types as the contract. Consult the
  matching legacy primitive in `../minifw` relative to the development workspace
  for context, not as a reason to document unimplemented compatibility.
- Document Bun-specific requirements for server apis and use `mini` with
  `Bun.serve` in server examples; do not imply framework or runtime agnosticism.
- For compiler apis, distinguish compile-time inputs and diagnostics from
  runtime rendering and request data. Document escaping and async semantics
  where they affect the public contract.
- Keep prose concise and hand-maintainable. Do not document requested stubs as
  completed features or claim unreleased AOT support or unmeasured speedups.
- Include `@example` blocks for public factories with non-obvious usage.
- Use `@param` and `@returns` where they improve public api documentation;
  internal helpers can use brief orientation comments instead.
- Let `prettier-plugin-jsdoc` control JSDoc layout. Do not manually fight line
  wrapping or tag spacing.

## Procedure

1. Read the nearest public api's existing JSDoc and follow its vocabulary.
2. Document only the public contract, not obvious implementation mechanics.
3. Ensure documented option names match the actual types and overloads.
4. Run root `pnpm lint:fix` to apply ESLint and Prettier's deterministic
   formatting; do not invoke either underlying tool directly.
5. Comment-only changes need no test or packaging command. If the public
   contract or executable ts changes too, run the relevant package validation.
