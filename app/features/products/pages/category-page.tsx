import Hero from "~/common/components/hero";
import type { Route } from "./+types/category-page";
import ProductCard from "../components/product-card";
import ProductPagination from "~/common/components/product-pagination";
import {
  getCategory,
  getCategoryPages,
  getProductsByCategory,
} from "../queries";
import { z } from "zod";
import { makeSSRClient } from "~/supa-client";

export const meta: Route.MetaFunction = ({ data }) => {
  return [
    { title: `${data.category.name} | wemake` },
    { name: "description", content: data.category.description },
  ];
};

const paramsSchema = z.object({
  categoryId: z.coerce.number(),
});

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);
  const { data, success } = paramsSchema.safeParse(params);
  const url = new URL(request.url);
  const page = Number(Object.fromEntries(url.searchParams).page || 1);
  if (!success) {
    throw new Response("Invalid category", { status: 400 });
  }
  const category = await getCategory(client, { categoryId: data.categoryId });
  const pages = await getCategoryPages(client, { categoryId: data.categoryId });
  const products = await getProductsByCategory(client, {
    categoryId: data.categoryId,
    page,
  });
  return { category, pages, products };
};

export default function Category({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-10">
      <Hero
        title={loaderData.category.name}
        subtitle={loaderData.category.description}
      />
      <div className="space-y-5 w-full max-w-screen-md mx-auto">
        {loaderData.products.map((product) => (
          <ProductCard
            key={product.product_id}
            id={product.product_id}
            name={product.name}
            description={product.tagline}
            reviewsCount={product.reviews}
            viewsCount={product.views}
            votesCount={product.upvotes}
          />
        ))}
        <ProductPagination totalPages={loaderData.pages} />
      </div>
    </div>
  );
}
