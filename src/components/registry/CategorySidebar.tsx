import type { MGECategory } from "@/data/tools";
import { CATEGORY_COLORS } from "@/data/tools";

interface CategorySidebarProps {
  categories: MGECategory[];
  selectedCategories: MGECategory[];
  onToggleCategory: (cat: MGECategory) => void;
  counts: Record<string, number>;
}

export const CategorySidebar = ({
  categories,
  selectedCategories,
  onToggleCategory,
  counts,
}: CategorySidebarProps) => {
  return (
    <aside className="w-60 shrink-0 border-r border-border bg-sidebar p-4 hidden lg:block sticky top-[73px] h-[calc(100vh-73px)] overflow-y-auto">
      <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
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
    </aside>
  );
};
