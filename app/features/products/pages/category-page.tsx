import Hero from "~/common/components/hero";
import type { Route } from "./+types/category-page";
import ProductCard from "../components/product-card";
import ProductPagination from "~/common/components/product-pagination";

export const meta: Route.MetaFunction = ({ params }) => {
  return [
    { title: `Developer Tools | wemake` },
    { name: "description", content: `Browse Developer Tools products` },
  ];
};

export default function Category() {
  return (
    <div className="space-y-10">
      <Hero
        title={`Developer Tools`}
        subtitle={`Tools for developers to build products faster`}
      />
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
