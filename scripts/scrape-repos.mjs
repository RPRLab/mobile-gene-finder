#!/usr/bin/env node

/**
 * Scrapes GitHub/GitLab repos for each tool to get live metadata:
 * - Last commit date
 * - Stars
 * - Open issues
 * - Forks
 *
 * Uses GITHUB_TOKEN for authenticated requests (5000 req/hr).
 * Output: public/scraped-data.json
 */

import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const headers = {
  Accept: "application/vnd.github.v3+json",
  "User-Agent": "awesome-mges-scraper",
};
if (GITHUB_TOKEN) {
  headers.Authorization = `Bearer ${GITHUB_TOKEN}`;
}

/**
 * Extract owner/repo from a GitHub URL.
 * Returns null for non-GitHub URLs.
 */
function parseGitHubUrl(url) {
  if (!url) return null;
  const match = url.match(
    /github\.com\/([^/]+)\/([^/\s#?]+)/
  );
  if (!match) return null;
  return { owner: match[1], repo: match[2].replace(/\.git$/, "") };
}

/**
 * Fetch repo metadata from GitHub API.
 */
async function fetchRepoData(owner, repo) {
  const url = `https://api.github.com/repos/${owner}/${repo}`;
  try {
    const res = await fetch(url, { headers });
    if (!res.ok) {
      console.warn(`  ⚠ ${res.status} for ${owner}/${repo}`);
      return null;
    }
    const data = await res.json();
    return {
      stars: data.stargazers_count,
      forks: data.forks_count,
      openIssues: data.open_issues_count,
      lastPush: data.pushed_at,
      archived: data.archived,
      description: data.description,
      license: data.license?.spdx_id || null,
      language: data.language,
    };
  } catch (err) {
    console.warn(`  ✗ Error fetching ${owner}/${repo}:`, err.message);
    return null;
  }
}

/**
 * Parse Bitbucket URL and fetch basic metadata.
 */
function parseBitbucketUrl(url) {
  if (!url) return null;
  const match = url.match(/bitbucket\.org\/([^/]+)\/([^/\s#?]+)/);
  if (!match) return null;
  return { owner: match[1], repo: match[2] };
}

async function fetchBitbucketData(owner, repo) {
  const url = `https://api.bitbucket.org/2.0/repositories/${owner}/${repo}`;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    return {
      lastPush: data.updated_on,
      language: data.language,
      description: data.description,
    };
  } catch {
    return null;
  }
}

async function main() {
  // Read tools from the TypeScript source to extract codeUrls
  const toolsSrc = readFileSync(join(ROOT, "src/data/tools.ts"), "utf-8");

  // Extract tool entries using regex (name + codeUrl pairs)
  const toolEntries = [];
  const nameRegex = /name:\s*"([^"]+)"/g;
  const codeUrlRegex = /codeUrl:\s*"([^"]*)"/;
  // Split by tool object boundaries and extract name + codeUrl
  const lineRegex = /\{[^}]+\}/g;
  let objMatch;
  while ((objMatch = lineRegex.exec(toolsSrc)) !== null) {
    const block = objMatch[0];
    const nameMatch = block.match(/name:\s*"([^"]+)"/);
    if (!nameMatch) continue;
    const codeMatch = block.match(codeUrlRegex);
    toolEntries.push({ name: nameMatch[1], codeUrl: codeMatch ? codeMatch[1] : null });
  }
  console.log(`Found ${toolEntries.length} tools to scrape\n`);

  const results = {};
  let scraped = 0;
  let skipped = 0;

  for (const tool of toolEntries) {
    const gh = parseGitHubUrl(tool.codeUrl);
    if (gh) {
      console.log(`→ ${tool.name}: github.com/${gh.owner}/${gh.repo}`);
      const data = await fetchRepoData(gh.owner, gh.repo);
      if (data) {
        results[tool.name] = { source: "github", ...data };
        scraped++;
      } else {
        skipped++;
      }
      // Rate limiting: small delay between requests
      await new Promise((r) => setTimeout(r, 100));
      continue;
    }

    const bb = parseBitbucketUrl(tool.codeUrl);
    if (bb) {
      console.log(`→ ${tool.name}: bitbucket.org/${bb.owner}/${bb.repo}`);
      const data = await fetchBitbucketData(bb.owner, bb.repo);
      if (data) {
        results[tool.name] = { source: "bitbucket", ...data };
        scraped++;
      } else {
        skipped++;
      }
      await new Promise((r) => setTimeout(r, 100));
      continue;
    }

    // Non-GitHub/Bitbucket (web services, GitLab, etc.)
    skipped++;
  }

  // Add metadata
  const output = {
    lastScraped: new Date().toISOString(),
    toolCount: Object.keys(results).length,
    data: results,
  };

  const outPath = join(ROOT, "public/scraped-data.json");
  writeFileSync(outPath, JSON.stringify(output, null, 2));
  console.log(`\n✓ Scraped ${scraped} repos, skipped ${skipped}`);
  console.log(`  Written to ${outPath}`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
