#!/usr/bin/env node
/**
 * CSS Bundler - Resolves @import statements and concatenates CSS files
 * No external dependencies required
 */

import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join, resolve } from "path";

const SRC_DIR = resolve(import.meta.dirname, "../src");
const DIST_DIR = resolve(import.meta.dirname, "../dist/css");

/**
 * Recursively resolve and concatenate CSS imports
 */
function bundleCSS(entryPath, seen = new Set()) {
  const absolutePath = resolve(entryPath);

  if (seen.has(absolutePath)) {
    return ""; // Prevent circular imports
  }
  seen.add(absolutePath);

  const content = readFileSync(absolutePath, "utf-8");
  const dir = dirname(absolutePath);

  // Replace @import statements with file contents
  return content.replace(/@import\s+["']([^"']+)["'];?/g, (match, importPath) => {
    const resolvedPath = join(dir, importPath);
    return bundleCSS(resolvedPath, seen);
  });
}

// Ensure dist directory exists
mkdirSync(DIST_DIR, { recursive: true });

// Bundle styles
const stylesEntry = join(SRC_DIR, "styles/index.css");
const stylesBundle = bundleCSS(stylesEntry);
writeFileSync(join(DIST_DIR, "styles.css"), stylesBundle);
console.log("✓ Built dist/css/styles.css");

// Bundle tokens
const tokensEntry = join(SRC_DIR, "tokens/index.css");
const tokensBundle = bundleCSS(tokensEntry);
writeFileSync(join(DIST_DIR, "tokens.css"), tokensBundle);
console.log("✓ Built dist/css/tokens.css");
