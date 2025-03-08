import Hero from "~/common/components/hero";
import type { Route } from "./+types/categories-page";
import CategoryCard from "../components/category-card";
import { getCategories } from "../queries";

export const meta = () => {
  return [
    {
      title: "Categories | wemake",
    },
    { name: "description", content: "Browse products by category" },
  ];
};

export const loader = async () => {
  const categories = await getCategories();
  return { categories };
};

export default function Categories({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-10">
      <Hero
        title="Categories"
        subtitle="Search for products by title or description"
      />
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-10">
        {loaderData.categories.map((category) => (
          <CategoryCard
            key={category.category_id}
            id={category.category_id}
            name={category.name}
            description={category.description}
          />
        ))}
      </div>
    </div>
  );
}
