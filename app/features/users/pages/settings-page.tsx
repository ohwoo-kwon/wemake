import { Form } from "react-router";
import type { Route } from "./+types/settings-page";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { useState, type ChangeEvent } from "react";
import { Label } from "~/common/components/ui/label";
import { Input } from "~/common/components/ui/input";
import { Button } from "~/common/components/ui/button";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId, getUserById } from "../queries";
import { z } from "zod";
import { updateUser, updateUserAvatar } from "../mutations";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "~/common/components/ui/alert";

export const meta: Route.MetaFunction = () => [{ title: "Settings | wemake" }];

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const user = await getUserById(client, { id: userId });
  return { user };
};

const formSchema = z.object({
  name: z.string().min(3),
  role: z.string(),
  headline: z.string().optional().default(""),
  bio: z.string().optional().default(""),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const formData = await request.formData();
  const avatar = formData.get("avatar");
  if (avatar && avatar instanceof File) {
    if (avatar.size <= 2097152 && avatar.type.startsWith("image/")) {
      const { data, error } = await client.storage
        .from("avatars")
        .upload(`${userId}/${Date.now()}`, avatar, {
          contentType: avatar.type,
          upsert: false,
        });
      if (error) {
        return { formErrors: { avatar: ["failed to upload avatar"] } };
      }
      const {
        data: { publicUrl },
      } = client.storage.from("avatars").getPublicUrl(data.path);
      await updateUserAvatar(client, { id: userId, avatar: publicUrl });
    } else {
      return { formErrors: { avatar: ["size error"] } };
    }
  } else {
    const { data, success, error } = formSchema.safeParse(
      Object.fromEntries(formData)
    );
    if (!success) return { formErrors: error.flatten().fieldErrors };
    await updateUser(client, {
      id: userId,
      name: data.name,
      role: data.role as
        | "developer"
        | "designer"
        | "marketer"
        | "founder"
        | "product_manager",
      headline: data.headline,
      bio: data.bio,
    });
    return { ok: true };
  }
};

export default function SettingsPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const [avatar, setAvatar] = useState<string | null>(loaderData.user.avatar);
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setAvatar(URL.createObjectURL(file));
    }
  };

  return (
    <div className="space-y-20">
      <div className="grid grid-cols-6 gap-40">
        <div className="col-span-4 flex flex-col gap-10">
          {actionData?.ok ? (
            <Alert>
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>Your profile has been updated</AlertDescription>
            </Alert>
          ) : null}
          <h2 className="text-2xl font-semibold">Edit profile</h2>
          <Form className="flex flex-col gap-5 w-1/2" method="POST">
            <InputPair
              label="Name"
              description="Your public name"
              placeholder="Lammong"
              id="name"
              name="name"
              defaultValue={loaderData.user.name}
              required
            />
            <SelectPair
              label="Role"
              description="What role do you do identify the most with"
              name="role"
              placeholder="Select a role"
              defaultValue={loaderData.user.role}
              options={[
                { label: "Developer", value: "developer" },
                { label: "Designer", value: "designer" },
                { label: "Product Manager", value: "product-manager" },
                { label: "Founder", value: "founder" },
                { label: "Other", value: "other" },
              ]}
            />
            <InputPair
              label="Headline"
              description="An introduction to your profile."
              placeholder="We are the most worthy family in the world."
              id="headline"
              name="headline"
              defaultValue={loaderData.user.headline ?? ""}
              required
              textArea
            />
            <InputPair
              label="Bio"
              description="Your public bio."
              placeholder="Be the most worthy family in the world."
              id="bio"
              name="bio"
              defaultValue={loaderData.user.bio}
              required
              textArea
            />
            <Button className="w-full">Update profile</Button>
          </Form>
        </div>
        <Form
          className="col-span-2 p-5 rounded-lg border shadow-sm"
          method="POST"
          encType="multipart/form-data"
        >
          <Label className="flex flex-col gap-1">
            Avatar
            <small className="text-muted-foreground">
              This is your public avatar.
            </small>
          </Label>
          <div className="space-y-5">
            <div className="size-40 rounded-full shadow-xl overflow-hidden">
              {avatar ? (
                <img src={avatar} className="object-cover w-full h-full" />
              ) : null}
            </div>
            <Input
              type="file"
              className="w-1/2"
              onChange={onChange}
              required
              name="avatar"
            />
            <div className="flex flex-col text-xs text-muted-foreground">
              <span>Recommended size: 128x128px</span>
              <span>Allowed formats: PNT, JPEG</span>
              <span>Max file size: 1MB</span>
            </div>
            <Button className="w-full">Update avatar</Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
