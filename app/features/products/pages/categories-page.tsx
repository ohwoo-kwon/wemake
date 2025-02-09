import Hero from "~/common/components/hero";
import type { Route } from "./+types/categories-page";
import CategoryCard from "../components/category-card";

export const meta = () => {
  return [
    {
      title: "Categories | wemake",
    },
    { name: "description", content: "Browse products by category" },
  ];
};

export default function Categories() {
  return (
    <div className="space-y-10">
      <Hero
        title="Categories"
        subtitle="Search for products by title or description"
      />
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-10">
        {Array.from({ length: 10 }).map((_, index) => (
          <CategoryCard
            key={`categoryId-${index}`}
            id={`categoryId-${index}`}
            name={`Category Name ${index}`}
            description="Category Description"
          />
        ))}
      </div>
    </div>
  );
}
