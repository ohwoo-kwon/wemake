import Hero from "~/common/components/hero";
import type { Route } from "./+types/submit-page";
import { Form } from "react-router";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Submit Product | wemake" },
    { name: "description", content: "Submit your product" },
  ];
};

export default function Submit({ actionData }: Route.ComponentProps) {
  return (
    <div>
      <Hero
        title="Submit Your Product"
        subtitle="Share your product with the world"
      />
      <Form className="grid grid-cols-2 gap-10 max-w-screen-lg mx-auto">
        <div className="space-y-5">
          <InputPair
            label="Name"
            type="text"
            description="This is the name of your product"
            id="name"
            name="name"
            required
            placeholder="Name of your product"
          />
          <InputPair
            label="Tagline"
            type="text"
            description="(60 characters or less)"
            id="tagline"
            name="tagline"
            required
            placeholder="A concise description of your product"
          />
          <InputPair
            label="URL"
            type="url"
            description="The URL of your product"
            id="url"
            name="url"
            required
            placeholder="https://example.com"
          />
          <InputPair
            label="Description"
            description="The description of your product"
            id="description"
            name="description"
            required
            textArea
            placeholder="A detailed description of your product"
          />
          <SelectPair
            label="Category"
            description="The category of your product"
            name="category"
            required
            placeholder="Select a category"
            options={[
              { label: "AI", value: "ai" },
              { label: "Design", value: "design" },
              { label: "Marketing", value: "marketing" },
              { label: "Development", value: "development" },
            ]}
          />
        </div>
      </Form>
    </div>
  );
}
