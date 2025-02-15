import Hero from "~/common/components/hero";
import { Form } from "react-router";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { Button } from "~/common/components/ui/button";
import type { Route } from "./+types/submit-post-page";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Community | wemake" }];
};

export default function SubmitPostPage() {
  return (
    <div className="space-y-20">
      <Hero
        title="Create Discussion"
        subtitle="Ask questions, share ideas, and connect with other developers"
      />
      <Form className="flex flex-col gap-10 max-w-screen-md mx-auto">
        <InputPair
          label="Title"
          name="title"
          id="title"
          description="(40 characters or less)"
          required
          placeholder="i.e What is the best productivity tool?"
        />
        <SelectPair
          required
          name="category"
          label="Category"
          description="Select the category that best fits your discussion"
          placeholder="i.e Productivity"
          options={[
            { label: "Productivity", value: "productivity" },
            { label: "Programing", value: "programing" },
            { label: "Design", value: "design" },
          ]}
        />
        <InputPair
          label="Content"
          name="content"
          id="content"
          description="(1,000 characters or less)"
          required
          textArea
          placeholder="i.e I'm looking for a tool that can help me manage my time and tasks. What are the best tools out there?"
        />
        <Button className="mx-auto">Create Discussions</Button>
      </Form>
    </div>
  );
}
