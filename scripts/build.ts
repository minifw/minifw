import { rm } from "node:fs/promises";

await rm("dist", { recursive: true, force: true });

const result = await Bun.build({
  entrypoints: ["./src/index.ts"],
  outdir: "./dist",
  target: "bun",
  format: "esm",
  packages: "external",
  sourcemap: "linked",
});

if (!result.success) {
  throw new AggregateError(result.logs, "Package build failed");
}

await Bun.write(
  "./dist/LICENSE.md",
  Bun.file(new URL("../LICENSE.md", import.meta.url)),
);
