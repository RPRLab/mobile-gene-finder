import { Terminal, FileText, ExternalLink } from "lucide-react";
import type { MGETool } from "@/data/tools";
import { CATEGORY_COLORS } from "@/data/tools";
import { StatusBadge } from "./StatusBadge";

interface ToolCardProps {
  tool: MGETool;
}

export const ToolCard = ({ tool }: ToolCardProps) => {
  const categoryColor = CATEGORY_COLORS[tool.category];

  return (
    <div className="group bg-card rounded-xl p-5 transition-all duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:bg-accent" style={{ boxShadow: "var(--card-shadow)" }}>
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-foreground truncate">{tool.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span
              className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium uppercase tracking-wide"
              style={{ backgroundColor: categoryColor + "22", color: categoryColor }}
            >
              {tool.category}
            </span>
          </div>
        </div>
        <StatusBadge status={tool.status} />
      </div>

      {/* Method */}
      <p className="text-xs text-muted-foreground leading-relaxed text-balance mb-3 line-clamp-2">
        {tool.method}
      </p>

      {/* Meta */}
      <div className="flex items-center gap-3 text-[11px] text-muted-foreground font-mono tabular-nums">
        <span className="flex items-center gap-1">
          <Terminal className="h-3 w-3" />
          {tool.target}
        </span>
        <span>·</span>
        <span>{tool.lastUpdated !== "None" ? tool.lastUpdated : "N/A"}</span>
      </div>

      {/* Notes */}
      {tool.notes && (
        <p className="text-[11px] text-muted-foreground mt-2 line-clamp-1 italic">
          {tool.notes}
        </p>
      )}

      {/* Links */}
      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
        {tool.codeUrl && (
          <a
            href={tool.codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] font-medium text-primary hover:text-primary/80 transition-colors"
          >
            <Terminal className="h-3 w-3" />
            Code
            <ExternalLink className="h-2.5 w-2.5" />
          </a>
        )}
        {tool.citationUrl && (
          <a
            href={tool.citationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <FileText className="h-3 w-3" />
            Paper
            <ExternalLink className="h-2.5 w-2.5" />
          </a>
        )}
        <span className="ml-auto text-[10px] text-muted-foreground font-mono">
          {tool.availability.split(" / ")[0]}
        </span>
      </div>
    </div>
  );
};
