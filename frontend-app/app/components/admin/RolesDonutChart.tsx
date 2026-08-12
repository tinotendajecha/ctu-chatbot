"use client";

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { DashboardStats, Role } from "../../lib/types";
import Card from "../ui/Card";

const ROLE_COLORS: Record<Role, string> = {
  student: "var(--color-primary)",
  prospective: "var(--color-secondary)",
  lecturer: "var(--color-accent)",
  admin: "var(--color-warning)",
};

const ROLE_LABELS: Record<Role, string> = {
  student: "Student",
  prospective: "Prospective",
  lecturer: "Lecturer",
  admin: "Admin",
};

export default function RolesDonutChart({ data }: { data: DashboardStats["usersByRole"] }) {
  const chartData = data.map((d) => ({ name: ROLE_LABELS[d.role], value: d.count, role: d.role }));

  return (
    <Card>
      <h3 className="mb-4 font-heading text-base font-bold text-text">Users by role</h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={2}>
              {chartData.map((entry) => (
                <Cell key={entry.role} fill={ROLE_COLORS[entry.role]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: 8,
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
