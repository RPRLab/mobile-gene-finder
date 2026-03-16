import type { ToolStatus } from "@/data/tools";

interface StatusBadgeProps {
  status: ToolStatus;
}

const config: Record<ToolStatus, { label: string; className: string }> = {
  maintained: { label: "Maintained", className: "bg-status-maintained/15 text-status-maintained" },
  stale: { label: "Stale", className: "bg-status-stale/15 text-status-stale" },
  deprecated: { label: "Deprecated", className: "bg-status-deprecated/15 text-status-deprecated" },
  unavailable: { label: "Unavailable", className: "bg-status-unavailable/15 text-status-unavailable" },
};

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const { label, className } = config[status];
  return (
    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
};
