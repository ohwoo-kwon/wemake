import { ChevronUp, StarIcon } from "lucide-react";
import { NavLink, Outlet } from "react-router";
import { Button, buttonVariants } from "~/common/components/ui/button";
import type { Route } from "./+types/product-overview-layout";
import { cn } from "~/lib/utils";

export default function ProductOverviewLayout({
  params,
}: Route.ComponentProps) {
  return (
    <div className="space-y-10">
      <div className="flex justify-between">
        <div className="flex gap-10">
          <div className="size-40 rounded-xl shadow-xl bg-primary/50"></div>
          <div>
            <h1 className="text-3xl font-bold">Product Name</h1>
            <p className="text-xl font-light">Product description</p>
            <div className="mt-5 flex items-center gap-2">
              <div className="flex text-yellow-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon
                    key={`Star-${i}`}
                    className="size-4"
                    fill="currentColor"
                  />
                ))}
              </div>
              <span className="text-muted-foreground">100 reviews</span>
            </div>
          </div>
        </div>
        <div className="flex gap-5">
          <Button variant="secondary" size="lg" className="text-lg h-14 px-10">
            Visit Website
          </Button>
          <Button size="lg" className="text-lg h-14 px-10">
            <ChevronUp className="size-4" /> Upvote (100)
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
          to={`/products/${params.productId}/overview`}
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
          to={`/products/${params.productId}/reviews`}
        >
          Reviews
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
}
