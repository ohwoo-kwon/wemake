import type { Route } from "./+types/dashboard-page";

export const meta: Route.MetaFunction = () => [{ title: "Dashboard | wemake" }];

export default function DashboardPage() {
  return <h1>Dashboard</h1>;
}
