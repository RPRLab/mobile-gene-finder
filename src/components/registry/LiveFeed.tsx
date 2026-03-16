import { useState, useEffect } from "react";

const FAKE_ACTIONS = [
  "SCRAPING github.com/apcamargo/genomad... FOUND.",
  "VALIDATING citation via CrossRef... DONE.",
  "SCRAPING github.com/gbouras13/pharokka... FOUND.",
  "CHECKING github.com/AnantharamanLab/VIBRANT stars... 482.",
  "SCRAPING github.com/jiarong/VirSorter2... FOUND.",
  "INDEXING new tool: DeepMobilome... ADDED.",
  "VALIDATING citation via PubMed... DONE.",
  "SCRAPING github.com/KennthShang/PhaBox... FOUND.",
  "CHECKING github.com/cbg-ethz/V-pipe releases... v3.0.2.",
  "SCRAPING github.com/mdmparis/defense-finder... FOUND.",
  "INDEXING new tool: Cenote-Taker 3... ADDED.",
  "CHECKING bioconda recipe: pharokka... UP TO DATE.",
  "SCRAPING github.com/padlocbio/padloc... FOUND.",
  "VALIDATING citation via Semantic Scholar... DONE.",
  "SCRAPING github.com/WrightonLabCSU/DRAM... FOUND.",
  "CHECKING pip package: phold... v1.1.0.",
  "SCRAPING github.com/phac-nml/mob-suite... FOUND.",
  "INDEXING new tool: vConTACT3... ADDED.",
];

function getTimestamp() {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;
}

export const LiveFeed = () => {
  const [lines, setLines] = useState<{ time: string; text: string }[]>([]);

  useEffect(() => {
    // Initial seed
    const initial = FAKE_ACTIONS.slice(0, 5).map((text) => ({
      time: getTimestamp(),
      text,
    }));
    setLines(initial);

    const interval = setInterval(() => {
      const randomAction = FAKE_ACTIONS[Math.floor(Math.random() * FAKE_ACTIONS.length)];
      setLines((prev) => [...prev.slice(-14), { time: getTimestamp(), text: randomAction }]);
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <aside className="w-72 shrink-0 border-l border-border bg-sidebar hidden xl:block sticky top-[73px] h-[calc(100vh-73px)] overflow-hidden">
      <div className="p-3 border-b border-border">
        <h2 className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          Live Scraper Feed
        </h2>
      </div>
      <div className="p-3 space-y-1 overflow-y-auto h-[calc(100%-40px)]">
        {lines.map((line, i) => (
          <div
            key={i}
            className="font-mono text-[10px] leading-relaxed text-muted-foreground"
            style={{ opacity: 0.4 + (i / lines.length) * 0.6 }}
          >
            <span className="text-primary/70">[{line.time}]</span>{" "}
            {line.text}
          </div>
        ))}
      </div>
    </aside>
  );
};
