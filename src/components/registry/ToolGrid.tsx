import type { MGETool } from "@/data/tools";
import { ToolCard } from "./ToolCard";

interface ToolGridProps {
  tools: MGETool[];
}

export const ToolGrid = ({ tools }: ToolGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {tools.map((tool) => (
        <ToolCard key={tool.name} tool={tool} />
      ))}
    </div>
  );
};
