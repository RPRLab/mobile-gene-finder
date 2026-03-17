import { Star, GitFork, AlertCircle, Clock, Database, Code } from "lucide-react";
import type { ScrapedData } from "@/lib/scraped-data";
import { formatTimeSince } from "@/lib/scraped-data";

interface LiveFeedProps {
  scrapedData: ScrapedData | null;
  totalTools: number;
}

export const LiveFeed = ({ scrapedData, totalTools }: LiveFeedProps) => {
  const data = scrapedData?.data ?? {};
  const entries = Object.entries(data);

  const totalStars = entries.reduce((sum, [, d]) => sum + (d.stars ?? 0), 0);
  const totalForks = entries.reduce((sum, [, d]) => sum + (d.forks ?? 0), 0);
  const totalIssues = entries.reduce((sum, [, d]) => sum + (d.openIssues ?? 0), 0);
  const scrapedCount = entries.length;

  const topByStars = [...entries]
    .filter(([, d]) => d.stars != null)
    .sort((a, b) => (b[1].stars ?? 0) - (a[1].stars ?? 0))
    .slice(0, 8);

  const languages = entries.reduce<Record<string, number>>((acc, [, d]) => {
    if (d.language) acc[d.language] = (acc[d.language] || 0) + 1;
    return acc;
  }, {});
  const topLangs = Object.entries(languages)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  const hasData = scrapedCount > 0;

  return (
    <aside className="w-72 shrink-0 border-l border-border bg-sidebar hidden xl:block sticky top-[73px] h-[calc(100vh-73px)] overflow-y-auto">
      <div className="p-3 border-b border-border">
        <h2 className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
          <Database className="h-3 w-3 text-primary" />
          Scrape Stats
        </h2>
      </div>

      {!hasData ? (
        <div className="p-4 text-xs text-muted-foreground text-center">
          <p className="mb-1">No scraped data yet.</p>
          <p className="text-[10px]">Run the GitHub Action to populate.</p>
        </div>
      ) : (
        <div className="p-3 space-y-4">
          {/* Summary stats */}
          <div className="grid grid-cols-2 gap-2">
            {[
              { icon: Database, label: "Scraped", value: `${scrapedCount}/${totalTools}` },
              { icon: Star, label: "Total Stars", value: totalStars.toLocaleString() },
              { icon: GitFork, label: "Total Forks", value: totalForks.toLocaleString() },
              { icon: AlertCircle, label: "Open Issues", value: totalIssues.toLocaleString() },
            ].map((s) => (
              <div key={s.label} className="bg-accent/50 rounded-lg p-2">
                <div className="flex items-center gap-1 mb-0.5">
                  <s.icon className="h-3 w-3 text-primary" />
                  <span className="text-[10px] text-muted-foreground">{s.label}</span>
                </div>
                <span className="text-sm font-semibold text-foreground font-mono">{s.value}</span>
              </div>
            ))}
          </div>

          {/* Last scrape */}
          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
            <Clock className="h-3 w-3" />
            Last scrape: <span className="text-primary font-mono">{formatTimeSince(scrapedData?.lastScraped ?? null)}</span>
          </div>

          {/* Top repos */}
          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
              <Star className="h-3 w-3 text-primary" />
              Top by Stars
            </h3>
            <div className="space-y-1">
              {topByStars.map(([name, d]) => (
                <div key={name} className="flex items-center justify-between text-[11px] py-1 px-2 rounded bg-accent/30 hover:bg-accent/50 transition-colors">
                  <span className="text-foreground truncate mr-2 font-mono">{name}</span>
                  <span className="text-primary font-mono shrink-0 flex items-center gap-0.5">
                    <Star className="h-2.5 w-2.5" />
                    {(d.stars ?? 0).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Languages */}
          {topLangs.length > 0 && (
            <div>
              <h3 className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                <Code className="h-3 w-3 text-primary" />
                Languages
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {topLangs.map(([lang, count]) => (
                  <span key={lang} className="text-[10px] px-2 py-0.5 rounded-full bg-accent text-accent-foreground font-mono">
                    {lang} <span className="text-muted-foreground">({count})</span>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </aside>
  );
};
