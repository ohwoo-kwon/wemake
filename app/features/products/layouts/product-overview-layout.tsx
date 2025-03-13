import { ChevronUp, StarIcon } from "lucide-react";
import { Link, NavLink, Outlet } from "react-router";
import { Button, buttonVariants } from "~/common/components/ui/button";
import type { Route } from "./+types/product-overview-layout";
import { cn } from "~/lib/utils";
import { getProductById } from "../queries";
import { makeSSRClient } from "~/supa-client";

export const meta: Route.MetaFunction = ({ data }) => [
  { title: `${data.product.name} Overview| wemake` },
  { name: "description", content: "View product details and information" },
];

export const loader = async ({
  params,
  request,
}: Route.LoaderArgs & { params: { productId: string } }) => {
  const { client } = makeSSRClient(request);
  const product = await getProductById(client, {
    productId: params.productId!,
  });
  return { product };
};

export default function ProductOverviewLayout({
  loaderData,
}: Route.ComponentProps) {
  return (
    <div className="space-y-10">
      <div className="flex justify-between">
        <div className="flex gap-10">
          <div className="size-40 rounded-xl shadow-xl bg-primary/50"></div>
          <div>
            <h1 className="text-3xl font-bold">{loaderData.product.name}</h1>
            <p className="text-xl font-light">{loaderData.product.tagline}</p>
            <div className="mt-5 flex items-center gap-2">
              <div className="flex text-yellow-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon
                    key={`Star-${i}`}
                    className="size-4"
                    fill={
                      i < Math.floor(loaderData.product.average_rating)
                        ? "currentColor"
                        : "none"
                    }
                  />
                ))}
              </div>
              <span className="text-muted-foreground">
                {loaderData.product.reviews} reviews
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-5">
          <Button
            variant="secondary"
            size="lg"
            className="text-lg h-14 px-10"
            asChild
          >
            <Link to={`/products/${loaderData.product.product_id}/visit`}>
              Visit Website
            </Link>
          </Button>
          <Button size="lg" className="text-lg h-14 px-10">
            <ChevronUp className="size-4" /> Upvote (
            {loaderData.product.upvotes})
          </Button>
        </div>
      </div>
      <div className="flex gap-2.5">
        <NavLink
          className={({ isActive }) =>
            cn([
              buttonVariants({ variant: "outline" }),
              isActive && "text-foreground bg-accent",
            ])
          }
          to={`/products/${loaderData.product.product_id}/overview`}
        >
          Overview
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            cn([
              buttonVariants({ variant: "outline" }),
              isActive && "text-foreground bg-accent",
            ])
          }
          to={`/products/${loaderData.product.product_id}/reviews`}
        >
          Reviews
        </NavLink>
      </div>
      <Outlet
        context={{
          product_id: loaderData.product.product_id,
          description: loaderData.product.description,
          how_it_works: loaderData.product.how_it_works,
          review_count: loaderData.product.reviews,
        }}
      />
    </div>
  );
}
