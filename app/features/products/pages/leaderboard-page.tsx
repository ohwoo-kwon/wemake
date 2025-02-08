import Hero from "~/common/components/hero";
import type { Route } from "./+types/leaderboard-page";
import ProductCard from "../components/product-card";
import { Button } from "~/common/components/ui/button";
import { Link } from "react-router";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Leaderboard | wemake" },
    { name: "description", content: "Top products leaderboard" },
  ];
};

export default function Leaderboard() {
  return (
    <div className="space-y-20">
      <Hero
        title="Leaderboards"
        subtitle="The most popular products on wemake"
      />
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <h2 className="text-3xl font-bold leading-tight tracking-tight">
            Daily Leaderboard
          </h2>
          <p className="text-xl font-light text-foreground">
            The most popular products on wemake by day.
          </p>
        </div>
        {Array.from({ length: 5 }).map((_, idx) => (
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
        <Button variant="link" asChild className="text-lg self-center">
          <Link to="/products/leaderboards/daily">
            Explore all products &rarr;
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <h2 className="text-3xl font-bold leading-tight tracking-tight">
            Weekly Leaderboard
          </h2>
          <p className="text-xl font-light text-foreground">
            The most popular products on wemake by week.
          </p>
        </div>
        {Array.from({ length: 5 }).map((_, idx) => (
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
        <Button variant="link" asChild className="text-lg self-center">
          <Link to="/products/leaderboards/weekly">
            Explore all products &rarr;
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <h2 className="text-3xl font-bold leading-tight tracking-tight">
            Monthly Leaderboard
          </h2>
          <p className="text-xl font-light text-foreground">
            The most popular products on wemake by month.
          </p>
        </div>
        {Array.from({ length: 5 }).map((_, idx) => (
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
        <Button variant="link" asChild className="text-lg self-center">
          <Link to="/products/leaderboards/monthly">
            Explore all products &rarr;
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <h2 className="text-3xl font-bold leading-tight tracking-tight">
            Yearly Leaderboard
          </h2>
          <p className="text-xl font-light text-foreground">
            The most popular products on wemake by year.
          </p>
        </div>
        {Array.from({ length: 5 }).map((_, idx) => (
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
        <Button variant="link" asChild className="text-lg self-center">
          <Link to="/products/leaderboards/yearly">
            Explore all products &rarr;
          </Link>
        </Button>
      </div>
    </div>
  );
}
