import { DateTime } from "luxon";
import type { Route } from "./+types/yearly-leaderboard-page";
import { data, isRouteErrorResponse, Link } from "react-router";
import { z } from "zod";
import Hero from "~/common/components/hero";
import ProductCard from "../components/product-card";
import { Button } from "~/common/components/ui/button";
import ProductPagination from "~/common/components/product-pagination";

const paramsSchema = z.object({
  year: z.coerce.number(),
});

export const loader = ({ params }: Route.LoaderArgs) => {
  const { success, data: parsedData } = paramsSchema.safeParse(params);

  // params 유효성 검사
  if (!success) {
    throw data(
      { error_code: "invalid_params", message: "Invalid params" },
      { status: 400 }
    );
  }
  const { year } = parsedData;
  const date = DateTime.fromObject({ year });
  // 날짜 유효성 검사
  if (!date.isValid) {
    throw data(
      { error_code: "invalid_date", message: "Invalid date" },
      { status: 400 }
    );
  }
  const today = DateTime.now().startOf("year");
  // 미래 날짜인지 검사
  if (date > today) {
    throw data(
      { error_code: "future_date", message: "Future date" },
      { status: 400 }
    );
  }
  return { ...parsedData };
};

export default function YearlyLeaderboard({
  loaderData,
}: Route.ComponentProps) {
  const urlDate = DateTime.fromObject({
    year: loaderData.year,
  });
  const previousYear = urlDate.minus({ years: 1 });
  const nextYear = urlDate.plus({ years: 1 });
  const isToday = urlDate.equals(DateTime.now().startOf("year"));

  return (
    <div className="space-y-10">
      <Hero
        title={`The best of year ${urlDate.toLocaleString({
          year: "numeric",
        })}`}
      />
      <div className="flex items-center justify-center gap-2">
        <Button variant="secondary" asChild>
          <Link to={`/products/leaderboards/yearly/${previousYear.year}`}>
            &larr; {previousYear.toLocaleString({ year: "numeric" })}
          </Link>
        </Button>
        <Button variant="secondary" asChild>
          <Link
            to={`/products/leaderboards/yearly/${nextYear.year}`}
            className={isToday ? "pointer-events-none opacity-50" : ""}
            onClick={(event) => {
              if (isToday) event.preventDefault();
            }}
          >
            {nextYear.toLocaleString({ year: "numeric" })} &rarr;
          </Link>
        </Button>
      </div>
      <div className="space-y-5 w-full max-w-screen-md mx-auto">
        {Array.from({ length: 4 }).map((_, idx) => (
          <ProductCard
            key={`productId-${idx}`}
            id={`productId-${idx}`}
            name="Product Name"
            description="Product Description"
            commentsCount={12}
            viewsCount={41}
            votesCount={120}
          />
        ))}
        <ProductPagination totalPages={10} />
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
