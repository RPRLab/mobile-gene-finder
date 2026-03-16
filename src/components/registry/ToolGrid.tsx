import type { MGETool } from "@/data/tools";
import type { ScrapedData } from "@/lib/scraped-data";
import { ToolCard } from "./ToolCard";

interface ToolGridProps {
  tools: MGETool[];
  scrapedData?: ScrapedData | null;
}

export const ToolGrid = ({ tools, scrapedData }: ToolGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {tools.map((tool) => (
        <ToolCard key={tool.name} tool={tool} scraped={scrapedData?.data[tool.name]} />
      ))}
    </div>
  );
};
