import type { Route } from "./+types/dashboard-ideas-page";

export const meta: Route.MetaFunction = () => [
  { title: "DashboardIdeas | wemake" },
];

export default function DashboardIdeasPage() {
  return <h1>DashboardIdeas</h1>;
}
