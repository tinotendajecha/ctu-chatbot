"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { DashboardStats } from "../../lib/types";
import Card from "../ui/Card";

export default function ActiveUsersChart({
  data,
}: {
  data: DashboardStats["activeUsersOverTime"];
}) {
  return (
    <Card>
      <h3 className="mb-4 font-heading text-base font-bold text-text">Active users over time</h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ left: -20 }}>
            <CartesianGrid stroke="var(--color-border)" vertical={false} />
            <XAxis dataKey="date" stroke="var(--color-text-muted)" fontSize={12} tickLine={false} />
            <YAxis stroke="var(--color-text-muted)" fontSize={12} tickLine={false} />
            <Tooltip
              contentStyle={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: 8,
              }}
            />
            <Area
              type="monotone"
              dataKey="users"
              stroke="var(--color-primary)"
              fill="var(--color-primary)"
              fillOpacity={0.15}
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
