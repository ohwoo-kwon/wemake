import { ChevronUp, StarIcon } from "lucide-react";
import type { Route } from "./+types/product-overview-page";
import { Button } from "~/common/components/ui/button";
import { Link } from "react-router";

export const meta: Route.MetaFunction = () => {
  return [
    { title: `Product Overview | wemake` },
    { name: "description", content: "View product details and information" },
  ];
};

export default function ProductOverview({ params }: Route.ComponentProps) {
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
        <Button variant="outline" asChild>
          <Link to={`/products/${params.productId}/overview`}>Overview</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to={`/products/${params.productId}/reviews`}>Reviews</Link>
        </Button>
      </div>
      <div className="space-y-10">
        <div className="space-y-1">
          <h3 className="text-lg font-bold">What is this product?</h3>
          <p className="text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
            ipsum nemo eius et iste facere nesciunt ut fugit quaerat optio
            repudiandae dolores, quibusdam ratione! Non soluta saepe animi
            similique dolorum?
          </p>
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-bold">How does it work?</h3>
          <p className="text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
            ipsum nemo eius et iste facere nesciunt ut fugit quaerat optio
            repudiandae dolores, quibusdam ratione! Non soluta saepe animi
            similique dolorum?
          </p>
        </div>
      </div>
    </div>
  );
}
