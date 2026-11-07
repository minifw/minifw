import { rm } from "node:fs/promises";

await Promise.all(
  ["dist", "coverage", ".turbo"].map((directory) =>
    rm(directory, { recursive: true, force: true }),
  ),
);
