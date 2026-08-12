import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import { getDashboardStats } from "../lib/admin/mock-stats";
import StatCard from "../components/admin/StatCard";
import ActiveUsersChart from "../components/admin/ActiveUsersChart";
import RolesDonutChart from "../components/admin/RolesDonutChart";
import TopicsBarChart from "../components/admin/TopicsBarChart";

export default function AdminDashboardPage() {
  const stats = getDashboardStats();

  return (
    <div className="mx-auto max-w-6xl p-4 md:p-6">
      <h1 className="mb-6 font-heading text-2xl font-bold text-text">Dashboard</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total conversations"
          value={stats.totalConversations}
          icon={<ChatBubbleOutlineIcon fontSize="small" />}
        />
        <StatCard
          label="Total users"
          value={stats.totalUsers}
          icon={<GroupOutlinedIcon fontSize="small" />}
        />
        <StatCard
          label="Documents indexed"
          value={stats.documentsIndexed}
          icon={<DescriptionOutlinedIcon fontSize="small" />}
        />
        <StatCard
          label="Avg. response time"
          value={`${stats.avgResponseTimeSec}s`}
          icon={<TimerOutlinedIcon fontSize="small" />}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ActiveUsersChart data={stats.activeUsersOverTime} />
        <RolesDonutChart data={stats.usersByRole} />
        <div className="lg:col-span-2">
          <TopicsBarChart data={stats.mostAskedTopics} />
        </div>
      </div>
    </div>
  );
}
