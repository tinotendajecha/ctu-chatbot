"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { DashboardStats } from "../../lib/types";
import Card from "../ui/Card";

export default function TopicsBarChart({ data }: { data: DashboardStats["mostAskedTopics"] }) {
  return (
    <Card>
      <h3 className="mb-4 font-heading text-base font-bold text-text">Most-asked topics</h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 10 }}>
            <CartesianGrid stroke="var(--color-border)" horizontal={false} />
            <XAxis type="number" stroke="var(--color-text-muted)" fontSize={12} tickLine={false} />
            <YAxis
              type="category"
              dataKey="topic"
              stroke="var(--color-text-muted)"
              fontSize={12}
              tickLine={false}
              width={100}
            />
            <Tooltip
              contentStyle={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: 8,
              }}
            />
            <Bar dataKey="count" fill="var(--color-secondary)" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
