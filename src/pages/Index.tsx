import { useState, useMemo, useEffect } from "react";
import { tools, categories, type MGECategory, getToolsWithScrapedStatus } from "@/data/tools";
import { RegistryHeader } from "@/components/registry/RegistryHeader";
import { CategorySidebar } from "@/components/registry/CategorySidebar";
import { ToolGrid } from "@/components/registry/ToolGrid";
import { ToolTable } from "@/components/registry/ToolTable";
import { LiveFeed } from "@/components/registry/LiveFeed";
import { FilterBar, EMPTY_FILTERS, type Filters } from "@/components/registry/FilterBar";
import { loadScrapedData, type ScrapedData } from "@/lib/scraped-data";

const Index = () => {
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<MGECategory[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [sortBy, setSortBy] = useState<"name" | "updated">("updated");
  const [scrapedData, setScrapedData] = useState<ScrapedData | null>(null);
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);

  useEffect(() => {
    loadScrapedData().then(setScrapedData);
  }, []);

  const enrichedTools = useMemo(() => {
    return scrapedData ? getToolsWithScrapedStatus(scrapedData.data) : tools;
  }, [scrapedData]);

  // Derive available filter values
  const availableTargets = useMemo(() => {
    const set = new Set(enrichedTools.map((t) => t.target));
    return [...set].sort();
  }, [enrichedTools]);

  const availableLanguages = useMemo(() => {
    if (!scrapedData) return [];
    const set = new Set<string>();
    Object.values(scrapedData.data).forEach((d) => {
      if (d.language) set.add(d.language);
    });
    return [...set].sort();
  }, [scrapedData]);

  const availableAvailability = useMemo(() => {
    const set = new Set<string>();
    enrichedTools.forEach((t) => {
      t.availability.split(" / ").forEach((a) => set.add(a.trim()));
    });
    return [...set].sort();
  }, [enrichedTools]);

  const filteredTools = useMemo(() => {
    let result = enrichedTools;

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.method.toLowerCase().includes(q) ||
          t.target.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q)
      );
    }

    if (selectedCategories.length > 0) {
      result = result.filter((t) => selectedCategories.includes(t.category));
    }

    // Advanced filters
    if (filters.targets.length > 0) {
      result = result.filter((t) => filters.targets.includes(t.target));
    }
    if (filters.statuses.length > 0) {
      result = result.filter((t) => filters.statuses.includes(t.status));
    }
    if (filters.languages.length > 0 && scrapedData) {
      result = result.filter((t) => {
        const lang = scrapedData.data[t.name]?.language;
        return lang && filters.languages.includes(lang);
      });
    }
    if (filters.availability.length > 0) {
      result = result.filter((t) => {
        const parts = t.availability.split(" / ").map((a) => a.trim());
        return parts.some((p) => filters.availability.includes(p));
      });
    }

    result = [...result].sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return b.lastUpdated.localeCompare(a.lastUpdated);
    });

    return result;
  }, [search, selectedCategories, sortBy, enrichedTools, filters, scrapedData]);

  const toggleCategory = (cat: MGECategory) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    enrichedTools.forEach((t) => {
      counts[t.category] = (counts[t.category] || 0) + 1;
    });
    return counts;
  }, [enrichedTools]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <RegistryHeader
        search={search}
        onSearchChange={setSearch}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        sortBy={sortBy}
        onSortChange={setSortBy}
        totalTools={enrichedTools.length}
        lastScraped={scrapedData?.lastScraped ?? null}
      />

      <FilterBar
        filters={filters}
        onChange={setFilters}
        availableTargets={availableTargets}
        availableLanguages={availableLanguages}
        availableAvailability={availableAvailability}
      />

      <div className="flex">
        <CategorySidebar
          categories={categories}
          selectedCategories={selectedCategories}
          onToggleCategory={toggleCategory}
          counts={categoryCounts}
        />

        <main className="flex-1 min-w-0 p-6">
          {filteredTools.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-muted-foreground">
              <p className="text-lg font-medium">No tools found</p>
              <p className="text-sm mt-1">Try adjusting your search or filters</p>
            </div>
          ) : viewMode === "grid" ? (
            <ToolGrid tools={filteredTools} scrapedData={scrapedData} />
          ) : (
            <ToolTable tools={filteredTools} scrapedData={scrapedData} />
          )}
        </main>

        <LiveFeed scrapedData={scrapedData} totalTools={tools.length} />
      </div>
    </div>
  );
};

export default Index;
