import Hero from "~/common/components/hero";
import type { Route } from "./+types/submit-product-page";
import { Form, redirect } from "react-router";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { Input } from "~/common/components/ui/input";
import { Label } from "~/common/components/ui/label";
import { useState, type ChangeEvent } from "react";
import { Button } from "~/common/components/ui/button";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "~/features/users/queries";
import { z } from "zod";
import { getCategories } from "../queries";
import { createProduct } from "../mutations";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Submit Product | wemake" },
    { name: "description", content: "Submit your product" },
  ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const categories = await getCategories(client);
  return { categories };
};

const formSchema = z.object({
  name: z.string().min(1),
  tagline: z.string().min(1),
  url: z.string().min(1),
  description: z.string().min(1),
  howItWorks: z.string().min(1),
  category: z.coerce.number(),
  icon: z.instanceof(File).refine((file: File) => {
    return file.size <= 2097152 && file.type.startsWith("image/");
  }),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const formData = await request.formData();
  const { data, success, error } = formSchema.safeParse(
    Object.fromEntries(formData)
  );
  if (!success) return { formErrors: error.flatten().fieldErrors };
  const { icon, ...rest } = data;
  const { data: uploadData, error: uploadError } = await client.storage
    .from("icons")
    .upload(`${userId}/${Date.now()}`, icon, {
      contentType: icon.type,
      upsert: false,
    });
  if (uploadError) return { formErrors: { icon: ["Failed to upload icon"] } };
  const {
    data: { publicUrl },
  } = client.storage.from("icons").getPublicUrl(uploadData.path);
  const productId = await createProduct(client, {
    name: rest.name,
    tagline: rest.tagline,
    description: rest.description,
    howItWorks: rest.howItWorks,
    url: rest.url,
    iconUrl: publicUrl,
    categoryId: rest.category,
    userId,
  });
  return redirect(`/products/${productId}`);
};

export default function Submit({ loaderData }: Route.ComponentProps) {
  const [icon, setIcon] = useState<string>("");
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setIcon(URL.createObjectURL(file));
    }
  };

  return (
    <div>
      <Hero
        title="Submit Your Product"
        subtitle="Share your product with the world"
      />
      <Form
        className="grid grid-cols-2 gap-10 max-w-screen-lg mx-auto"
        method="POST"
        encType="multipart/form-data"
      >
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
          <InputPair
            textArea
            label="How it works"
            description="A detailed description of how your product howItWorks"
            id="howItWorks"
            name="howItWorks"
            required
            type="text"
            placeholder="A detailed description of how your product works"
          />
          <SelectPair
            label="Category"
            description="The category of your product"
            name="category"
            required
            placeholder="Select a category"
            options={loaderData.categories.map((category) => ({
              label: category.name,
              value: category.category_id.toString(),
            }))}
          />
          <Button type="submit" className="w-full" size="lg">
            Submit
          </Button>
        </div>
        <div className="flex flex-col space-y-2">
          <div className="size-40 rounded-xl shadow-xl overflow-hidden">
            {icon ? (
              <img src={icon} className="object-cover w-full h-full" />
            ) : null}
          </div>
          <Label className="flex flex-col  gap-1">
            Icon
            <small className="text-muted-foreground">
              This is the icon of your product
            </small>
          </Label>
          <Input
            type="file"
            className="w-1/2"
            onChange={onChange}
            required
            name="icon"
          />
          <div className="flex flex-col text-xs text-muted-foreground">
            <span>Recommended size: 128x128px</span>
            <span>Allowed formats: PNT, JPEG</span>
            <span>Max file size: 1MB</span>
          </div>
        </div>
      </Form>
    </div>
  );
}
