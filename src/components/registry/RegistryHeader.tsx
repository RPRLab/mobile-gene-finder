import { useState } from "react";
import { Search, LayoutGrid, Table, ArrowUpDown, HelpCircle, X } from "lucide-react";
import { formatTimeSince } from "@/lib/scraped-data";
import { ThemeToggle } from "@/components/ThemeToggle";

interface RegistryHeaderProps {
  search: string;
  onSearchChange: (value: string) => void;
  viewMode: "grid" | "table";
  onViewModeChange: (mode: "grid" | "table") => void;
  sortBy: "name" | "updated";
  onSortChange: (sort: "name" | "updated") => void;
  totalTools: number;
  lastScraped: string | null;
}

const STATUS_LEGEND = [
  { label: "Maintained", desc: "Updated in 2024 or later", className: "bg-status-maintained" },
  { label: "Stale", desc: "Last updated 2022–2023", className: "bg-status-stale" },
  { label: "Deprecated", desc: "Last updated before 2022", className: "bg-status-deprecated" },
  { label: "Unavailable", desc: "No update date available", className: "bg-status-unavailable" },
];

export const RegistryHeader = ({
  search,
  onSearchChange,
  viewMode,
  onViewModeChange,
  sortBy,
  onSortChange,
  totalTools,
  lastScraped,
}: RegistryHeaderProps) => {
  const [showLegend, setShowLegend] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border">
      {/* Scrape progress bar */}
      <div className="h-0.5 bg-primary/20">
        <div className="h-full w-1/3 bg-primary scrape-pulse rounded-r" />
      </div>

      <div className="px-6 py-4 flex items-center gap-6">
        {/* Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <h1 className="text-lg font-semibold tracking-tight text-foreground">
            awesome<span className="text-primary">MGEs</span>
          </h1>
          <span className="text-xs font-mono text-muted-foreground tabular-nums">
            {totalTools}+ tools
          </span>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-xl relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search tools, methods, targets..."
            className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
          />
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onSortChange(sortBy === "updated" ? "name" : "updated")}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground bg-background border border-border rounded-lg transition-colors"
          >
            <ArrowUpDown className="h-3.5 w-3.5" />
            {sortBy === "updated" ? "Last Updated" : "Name"}
          </button>

          <div className="flex items-center bg-background border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => onViewModeChange("grid")}
              className={`p-2 transition-colors ${viewMode === "grid" ? "bg-accent text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => onViewModeChange("table")}
              className={`p-2 transition-colors ${viewMode === "table" ? "bg-accent text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              <Table className="h-4 w-4" />
            </button>
          </div>

          {/* Help button */}
          <div className="relative">
            <button
              onClick={() => setShowLegend((v) => !v)}
              className="p-2 text-muted-foreground hover:text-foreground bg-background border border-border rounded-lg transition-colors"
              aria-label="Status legend"
            >
              <HelpCircle className="h-4 w-4" />
            </button>

            {showLegend && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowLegend(false)} />
                <div className="absolute right-0 top-full mt-2 z-50 w-72 bg-card border border-border rounded-xl shadow-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-foreground">Status Legend</h3>
                    <button onClick={() => setShowLegend(false)} className="text-muted-foreground hover:text-foreground">
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <div className="space-y-2.5">
                    {STATUS_LEGEND.map((s) => (
                      <div key={s.label} className="flex items-start gap-2.5">
                        <span className={`mt-1 w-2 h-2 rounded-full shrink-0 ${s.className}`} />
                        <div>
                          <span className="text-xs font-medium text-foreground">{s.label}</span>
                          <p className="text-[11px] text-muted-foreground leading-snug">{s.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-3 pt-3 border-t border-border leading-relaxed">
                    Status is auto-determined from each tool's last commit or release date on GitHub/GitLab.
                  </p>
                </div>
              </>
            )}
          </div>

          <span className="text-xs font-mono text-muted-foreground ml-2">
            Last scrape: <span className="text-primary">{formatTimeSince(lastScraped)}</span>
          </span>
        </div>
      </div>
    </header>
  );
};
