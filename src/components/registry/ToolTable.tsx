import { Terminal, FileText, ExternalLink } from "lucide-react";
import type { MGETool } from "@/data/tools";
import type { ScrapedData } from "@/lib/scraped-data";
import { StatusBadge } from "./StatusBadge";

interface ToolTableProps {
  tools: MGETool[];
  scrapedData?: ScrapedData | null;
}

export const ToolTable = ({ tools, scrapedData }: ToolTableProps) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-xs">
        <thead>
          <tr className="bg-muted/50 text-muted-foreground uppercase tracking-wider text-[10px]">
            <th className="text-left px-4 py-3 font-semibold">Tool</th>
            <th className="text-left px-4 py-3 font-semibold">Category</th>
            <th className="text-left px-4 py-3 font-semibold">Target</th>
            <th className="text-left px-4 py-3 font-semibold">Method</th>
            <th className="text-left px-4 py-3 font-semibold">Updated</th>
            <th className="text-left px-4 py-3 font-semibold">Status</th>
            <th className="text-left px-4 py-3 font-semibold">Links</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {tools.map((tool) => (
            <tr key={tool.name} className="hover:bg-accent/50 transition-colors">
              <td className="px-4 py-2.5 font-medium text-foreground whitespace-nowrap">{tool.name}</td>
              <td className="px-4 py-2.5 text-muted-foreground whitespace-nowrap">{tool.category}</td>
              <td className="px-4 py-2.5 text-muted-foreground font-mono whitespace-nowrap">{tool.target}</td>
              <td className="px-4 py-2.5 text-muted-foreground max-w-xs truncate">{tool.method}</td>
              <td className="px-4 py-2.5 text-muted-foreground font-mono tabular-nums whitespace-nowrap">
                {tool.lastUpdated !== "None" ? tool.lastUpdated : "N/A"}
              </td>
              <td className="px-4 py-2.5">
                <StatusBadge status={tool.status} />
              </td>
              <td className="px-4 py-2.5">
                <div className="flex items-center gap-2">
                  {tool.codeUrl && (
                    <a href={tool.codeUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80">
                      <Terminal className="h-3.5 w-3.5" />
                    </a>
                  )}
                  {tool.citationUrl && (
                    <a href={tool.citationUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                      <FileText className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
