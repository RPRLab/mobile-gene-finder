import { Search, LayoutGrid, Table, ArrowUpDown } from "lucide-react";

interface RegistryHeaderProps {
  search: string;
  onSearchChange: (value: string) => void;
  viewMode: "grid" | "table";
  onViewModeChange: (mode: "grid" | "table") => void;
  sortBy: "name" | "updated";
  onSortChange: (sort: "name" | "updated") => void;
  totalTools: number;
}

export const RegistryHeader = ({
  search,
  onSearchChange,
  viewMode,
  onViewModeChange,
  sortBy,
  onSortChange,
  totalTools,
}: RegistryHeaderProps) => {
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
            Mobilome<span className="text-primary">.Index</span>
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

          <span className="text-xs font-mono text-muted-foreground ml-2">
            Last scrape: <span className="text-primary">14m ago</span>
          </span>
        </div>
      </div>
    </header>
  );
};
