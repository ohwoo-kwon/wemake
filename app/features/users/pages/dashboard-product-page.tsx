import type { Route } from "./+types/dashboard-product-page";

export const meta: Route.MetaFunction = () => [
  { title: "DashboardProduct | wemake" },
];

export default function DashboardProductPage() {
  return <h1>DashboardProduct</h1>;
}
