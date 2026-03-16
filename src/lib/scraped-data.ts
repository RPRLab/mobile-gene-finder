import type { MGETool } from "@/data/tools";

export interface ScrapedToolData {
  source: string;
  stars?: number;
  forks?: number;
  openIssues?: number;
  lastPush?: string;
  archived?: boolean;
  description?: string;
  license?: string | null;
  language?: string | null;
}

export interface ScrapedData {
  lastScraped: string | null;
  toolCount: number;
  data: Record<string, ScrapedToolData>;
}

let cachedData: ScrapedData | null = null;

export async function loadScrapedData(): Promise<ScrapedData> {
  if (cachedData) return cachedData;
  try {
    const res = await fetch(`${import.meta.env.BASE_URL}scraped-data.json`);
    cachedData = await res.json();
    return cachedData!;
  } catch {
    return { lastScraped: null, toolCount: 0, data: {} };
  }
}

export function mergeScrapedData(
  tools: MGETool[],
  scraped: ScrapedData
): (MGETool & { scraped?: ScrapedToolData })[] {
  return tools.map((tool) => ({
    ...tool,
    scraped: scraped.data[tool.name] || undefined,
  }));
}

export function formatTimeSince(isoDate: string | null): string {
  if (!isoDate) return "never";
  const diff = Date.now() - new Date(isoDate).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
