import { X, Filter } from "lucide-react";
import type { MGECategory, ToolStatus } from "@/data/tools";
import { CATEGORY_COLORS } from "@/data/tools";

export interface Filters {
  targets: string[];
  statuses: ToolStatus[];
  languages: string[];
  availability: string[];
}

export const EMPTY_FILTERS: Filters = {
  targets: [],
  statuses: [],
  languages: [],
  availability: [],
};

const STATUS_OPTIONS: { value: ToolStatus; label: string; color: string }[] = [
  { value: "maintained", label: "Maintained", color: "bg-status-maintained" },
  { value: "stale", label: "Stale", color: "bg-status-stale" },
  { value: "deprecated", label: "Deprecated", color: "bg-status-deprecated" },
  { value: "unavailable", label: "Unavailable", color: "bg-status-unavailable" },
];

function toggleItem<T>(arr: T[], item: T): T[] {
  return arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item];
}

const hasAnyFilter = (f: Filters, cats: MGECategory[]) =>
  f.targets.length > 0 || f.statuses.length > 0 || f.languages.length > 0 || f.availability.length > 0 || cats.length > 0;

interface CategorySidebarProps {
  categories: MGECategory[];
  selectedCategories: MGECategory[];
  onToggleCategory: (cat: MGECategory) => void;
  counts: Record<string, number>;
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  availableTargets: string[];
  availableLanguages: string[];
  availableAvailability: string[];
  onClearAll: () => void;
}

const FilterChip = ({
  label,
  active,
  onClick,
  dot,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  dot?: string;
}) => (
  <button
    onClick={onClick}
    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium transition-colors border ${
      active
        ? "bg-primary/15 text-primary border-primary/30"
        : "bg-background text-muted-foreground border-border hover:border-primary/30 hover:text-foreground"
    }`}
  >
    {dot && <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />}
    {label}
    {active && <X className="h-2.5 w-2.5" />}
  </button>
);

export const CategorySidebar = ({
  categories,
  selectedCategories,
  onToggleCategory,
  counts,
  filters,
  onFiltersChange,
  availableTargets,
  availableLanguages,
  availableAvailability,
  onClearAll,
}: CategorySidebarProps) => {
  return (
    <aside className="w-64 shrink-0 border-r border-border bg-sidebar hidden lg:block sticky top-[73px] h-[calc(100vh-73px)] overflow-y-auto">
      <div className="p-4 space-y-5">
        {/* Clear all */}
        {hasAnyFilter(filters, selectedCategories) && (
          <button
            onClick={onClearAll}
            className="flex items-center gap-1.5 text-[11px] text-destructive hover:text-destructive/80 font-medium"
          >
            <X className="h-3 w-3" />
            Clear all filters
          </button>
        )}

        {/* Categories */}
        <div>
          <h2 className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
            <Filter className="h-3 w-3 text-primary" />
            MGE Categories
          </h2>
          <div className="space-y-0.5">
            {categories.map((cat) => {
              const isActive = selectedCategories.includes(cat);
              const color = CATEGORY_COLORS[cat];
              return (
                <button
                  key={cat}
                  onClick={() => onToggleCategory(cat)}
                  className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all active:scale-[0.98] ${
                    isActive
                      ? "bg-sidebar-accent text-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-foreground"
                  }`}
                >
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: color, opacity: isActive ? 1 : 0.5 }}
                  />
                  <span className="truncate flex-1 text-left">{cat}</span>
                  <span className="tabular-nums text-muted-foreground font-mono text-[10px]">
                    {counts[cat] || 0}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Status */}
        <div>
          <h2 className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
            Status
          </h2>
          <div className="flex flex-wrap gap-1">
            {STATUS_OPTIONS.map((s) => (
              <FilterChip
                key={s.value}
                label={s.label}
                dot={s.color}
                active={filters.statuses.includes(s.value)}
                onClick={() =>
                  onFiltersChange({ ...filters, statuses: toggleItem(filters.statuses, s.value) })
                }
              />
            ))}
          </div>
        </div>

        {/* Target */}
        <div>
          <h2 className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
            Target
          </h2>
          <div className="flex flex-wrap gap-1">
            {availableTargets.map((t) => (
              <FilterChip
                key={t}
                label={t}
                active={filters.targets.includes(t)}
                onClick={() =>
                  onFiltersChange({ ...filters, targets: toggleItem(filters.targets, t) })
                }
              />
            ))}
          </div>
        </div>

        {/* Language */}
        {availableLanguages.length > 0 && (
          <div>
            <h2 className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Language
            </h2>
            <div className="flex flex-wrap gap-1">
              {availableLanguages.map((l) => (
                <FilterChip
                  key={l}
                  label={l}
                  active={filters.languages.includes(l)}
                  onClick={() =>
                    onFiltersChange({ ...filters, languages: toggleItem(filters.languages, l) })
                  }
                />
              ))}
            </div>
          </div>
        )}

        {/* Availability */}
        <div>
          <h2 className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
            Availability
          </h2>
          <div className="flex flex-wrap gap-1">
            {availableAvailability.map((a) => (
              <FilterChip
                key={a}
                label={a}
                active={filters.availability.includes(a)}
                onClick={() =>
                  onFiltersChange({ ...filters, availability: toggleItem(filters.availability, a) })
                }
              />
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};
