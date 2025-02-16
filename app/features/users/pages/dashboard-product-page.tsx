import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import type { Route } from "./+types/dashboard-product-page";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "~/common/components/ui/chart";

export const meta: Route.MetaFunction = () => [
  { title: "Dashboard Product | wemake" },
];

const chartData = [
  { month: "January", views: 186, visitors: 100 },
  { month: "February", views: 305, visitors: 34 },
  { month: "March", views: 237, visitors: 150 },
  { month: "April", views: 73, visitors: 190 },
  { month: "May", views: 209, visitors: 270 },
  { month: "June", views: 214, visitors: 999 },
];
const chartConfig = {
  views: {
    label: "Page Views",
    color: "hsl(var(--chart-1))",
  },
  visitors: {
    label: "Visitors",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function DashboardProductPage() {
  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-semibold">Analytics</h1>
      <Card className="lg:w-1/2">
        <CardHeader>
          <CardTitle>Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                wrapperStyle={{ width: "120px" }}
                content={<ChartTooltipContent />}
              />
              <Area
                dataKey="views"
                type="natural"
                stroke="var(--color-views)"
                fill="var(--color-views)"
                strokeWidth={2}
                dot={false}
              />
              <Area
                dataKey="visitors"
                type="natural"
                stroke="var(--color-visitors)"
                fill="var(--color-visitors)"
                strokeWidth={2}
                dot={false}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
