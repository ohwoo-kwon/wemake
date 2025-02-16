import ProductCard from "~/features/products/components/product-card";
import type { Route } from "./+types/profile-products-page";

export const meta: Route.MetaFunction = () => [
  { title: "ProfileProducts | wemake" },
];

export default function ProfileProductsPage() {
  return (
    <div className="flex flex-col gap-5">
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
    </div>
  );
}
