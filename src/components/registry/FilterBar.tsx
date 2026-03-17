import { X } from "lucide-react";
import type { ToolStatus } from "@/data/tools";

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

interface FilterBarProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
  availableTargets: string[];
  availableLanguages: string[];
  availableAvailability: string[];
}

const STATUS_OPTIONS: { value: ToolStatus; label: string }[] = [
  { value: "maintained", label: "Maintained" },
  { value: "stale", label: "Stale" },
  { value: "deprecated", label: "Deprecated" },
  { value: "unavailable", label: "Unavailable" },
];

const FilterChip = ({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors border ${
      active
        ? "bg-primary/15 text-primary border-primary/30"
        : "bg-background text-muted-foreground border-border hover:border-primary/30 hover:text-foreground"
    }`}
  >
    {label}
    {active && <X className="h-3 w-3" />}
  </button>
);

function toggleItem<T>(arr: T[], item: T): T[] {
  return arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item];
}

const hasAnyFilter = (f: Filters) =>
  f.targets.length > 0 || f.statuses.length > 0 || f.languages.length > 0 || f.availability.length > 0;

export const FilterBar = ({
  filters,
  onChange,
  availableTargets,
  availableLanguages,
  availableAvailability,
}: FilterBarProps) => {
  return (
    <div className="border-b border-border bg-card/50 px-6 py-3">
      <div className="flex items-start gap-6 overflow-x-auto">
        {/* Target */}
        <div className="shrink-0">
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold block mb-1.5">
            Target
          </span>
          <div className="flex flex-wrap gap-1">
            {availableTargets.map((t) => (
              <FilterChip
                key={t}
                label={t}
                active={filters.targets.includes(t)}
                onClick={() => onChange({ ...filters, targets: toggleItem(filters.targets, t) })}
              />
            ))}
          </div>
        </div>

        {/* Status */}
        <div className="shrink-0">
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold block mb-1.5">
            Status
          </span>
          <div className="flex flex-wrap gap-1">
            {STATUS_OPTIONS.map((s) => (
              <FilterChip
                key={s.value}
                label={s.label}
                active={filters.statuses.includes(s.value)}
                onClick={() => onChange({ ...filters, statuses: toggleItem(filters.statuses, s.value) })}
              />
            ))}
          </div>
        </div>

        {/* Language */}
        {availableLanguages.length > 0 && (
          <div className="shrink-0">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold block mb-1.5">
              Language
            </span>
            <div className="flex flex-wrap gap-1">
              {availableLanguages.map((l) => (
                <FilterChip
                  key={l}
                  label={l}
                  active={filters.languages.includes(l)}
                  onClick={() => onChange({ ...filters, languages: toggleItem(filters.languages, l) })}
                />
              ))}
            </div>
          </div>
        )}

        {/* Availability */}
        <div className="shrink-0">
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold block mb-1.5">
            Availability
          </span>
          <div className="flex flex-wrap gap-1">
            {availableAvailability.map((a) => (
              <FilterChip
                key={a}
                label={a}
                active={filters.availability.includes(a)}
                onClick={() => onChange({ ...filters, availability: toggleItem(filters.availability, a) })}
              />
            ))}
          </div>
        </div>

        {/* Clear all */}
        {hasAnyFilter(filters) && (
          <button
            onClick={() => onChange(EMPTY_FILTERS)}
            className="shrink-0 self-end mb-0.5 text-[11px] text-destructive hover:text-destructive/80 font-medium"
          >
            Clear all
          </button>
        )}
      </div>
    </div>
  );
};
