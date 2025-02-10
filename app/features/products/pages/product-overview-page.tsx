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
  );
}
