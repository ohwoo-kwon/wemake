import { DateTime } from "luxon";
import type { Route } from "./+types/daily-leaderboard-page";
import { data, isRouteErrorResponse, Link } from "react-router";
import { z } from "zod";
import Hero from "~/common/components/hero";
import ProductCard from "../components/product-card";
import { Button } from "~/common/components/ui/button";
import ProductPagination from "~/common/components/product-pagination";
import { getProductByDateRange, getProductPagesByDateRange } from "../queries";
import { makeSSRClient } from "~/supa-client";

const paramsSchema = z.object({
  year: z.coerce.number(),
  month: z.coerce.number(),
  day: z.coerce.number(),
});

export const meta: Route.MetaFunction = ({ params }) => {
  const year = Number(params.year);
  const month = Number(params.month);
  const day = Number(params.day);
  const date = DateTime.fromObject({ year, month, day })
    .setZone("Asia/Seoul")
    .setLocale("ko");

  return [
    {
      title: `The best products of ${date.toLocaleString(
        DateTime.DATE_MED
      )} | wemake`,
    },
  ];
};

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);
  const { success, data: parsedData } = paramsSchema.safeParse(params);

  // params 유효성 검사
  if (!success) {
    throw data(
      { error_code: "invalid_params", message: "Invalid params" },
      { status: 400 }
    );
  }
  const { year, month, day } = parsedData;
  const date = DateTime.fromObject({ year, month, day });
  // 날짜 유효성 검사
  if (!date.isValid) {
    throw data(
      { error_code: "invalid_date", message: "Invalid date" },
      { status: 400 }
    );
  }
  const today = DateTime.now().startOf("day");
  // 미래 날짜인지 검사
  if (date > today) {
    throw data(
      { error_code: "future_date", message: "Future date" },
      { status: 400 }
    );
  }

  const url = new URL(request.url);

  const products = await getProductByDateRange(client, {
    startDate: date.startOf("day"),
    endDate: date.endOf("day"),
    page: Number(url.searchParams.get("page")) || 1,
  });

  const totalPages = await getProductPagesByDateRange(client, {
    startDate: date.startOf("day"),
    endDate: date.endOf("day"),
  });
  return { products, totalPages, ...parsedData };
};

export default function DailyLeaderboard({ loaderData }: Route.ComponentProps) {
  const urlDate = DateTime.fromObject({
    year: loaderData.year,
    month: loaderData.month,
    day: loaderData.day,
  });
  const previousDay = urlDate.minus({ days: 1 });
  const nextDay = urlDate.plus({ days: 1 });
  const isToday = urlDate.equals(DateTime.now().startOf("day"));

  return (
    <div className="space-y-10">
      <Hero
        title={`The best of ${urlDate.toLocaleString(DateTime.DATE_MED)}`}
      />
      <div className="flex items-center justify-center gap-2">
        <Button variant="secondary" asChild>
          <Link
            to={`/products/leaderboards/daily/${previousDay.year}/${previousDay.month}/${previousDay.day}`}
          >
            &larr; {previousDay.toLocaleString(DateTime.DATE_SHORT)}
          </Link>
        </Button>
        <Button variant="secondary" asChild>
          <Link
            to={`/products/leaderboards/daily/${nextDay.year}/${nextDay.month}/${nextDay.day}`}
            className={isToday ? "pointer-events-none opacity-50" : ""}
            onClick={(event) => {
              if (isToday) event.preventDefault();
            }}
          >
            {nextDay.toLocaleString(DateTime.DATE_SHORT)} &rarr;
          </Link>
        </Button>
      </div>
      <div className="space-y-5 w-full max-w-screen-md mx-auto">
        {loaderData.products.map((product) => (
          <ProductCard
            key={product.product_id}
            id={product.product_id.toString()}
            name={product.name}
            description={product.tagline}
            reviewsCount={product.reviews}
            viewsCount={product.views}
            votesCount={product.upvotes}
          />
        ))}
        <ProductPagination totalPages={loaderData.totalPages} />
      </div>
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        {error.data.message} / {error.data.error_code}
      </div>
    );
  }
  if (error instanceof Error) {
    return <div>{error.message}</div>;
  }
  return <div>Unknown Error</div>;
}
