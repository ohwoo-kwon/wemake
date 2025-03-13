import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "~/common/components/ui/chart";
import type { Route } from "./+types/dashboard-page";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "../queries";

export const meta: Route.MetaFunction = () => [{ title: "Dashboard | wemake" }];

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const { data, error } = await client.rpc("get_dashboard_stats", {
    user_id: userId,
  });
  if (error) {
    throw error;
  }
  return { chardData: data };
};

const chartConfig = {
  views: {
    label: "👁‍🗨",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function DashboardPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <Card className="lg:w-1/2">
        <CardHeader>
          <CardTitle>Profile views</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={loaderData.chardData}
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
                padding={{ left: 15, right: 15 }}
                tickFormatter={(value) => `${value.slice(5)} 월`}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Line
                dataKey="views"
                type="natural"
                stroke="var(--color-views)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
