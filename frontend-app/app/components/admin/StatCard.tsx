import { ReactNode } from "react";
import Card from "../ui/Card";

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
}

export default function StatCard({ label, value, icon }: StatCardProps) {
  return (
    <Card className="flex items-center gap-4">
      {icon && (
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary-tint text-primary">
          {icon}
        </span>
      )}
      <div className="min-w-0">
        <p className="truncate text-sm text-text-muted">{label}</p>
        <p className="font-heading text-2xl font-bold text-text">{value}</p>
      </div>
    </Card>
  );
}
