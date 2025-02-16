import { Form } from "react-router";
import type { Route } from "./+types/settings-page";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { useState, type ChangeEvent } from "react";
import { Label } from "~/common/components/ui/label";
import { Input } from "~/common/components/ui/input";
import { Button } from "~/common/components/ui/button";

export const meta: Route.MetaFunction = () => [{ title: "Settings | wemake" }];

export default function SettingsPage() {
  const [avatar, setAvatar] = useState<string>("");
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
          <h2 className="text-2xl font-semibold">Edit profile</h2>
          <Form className="flex flex-col gap-5 w-1/2">
            <InputPair
              label="Name"
              description="Your public name"
              placeholder="Lammong"
              id="name"
              name="name"
              required
            />
            <SelectPair
              label="Role"
              description="What role do you do identify the most with"
              name="role"
              placeholder="Select a role"
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
              required
              textArea
            />
            <InputPair
              label="Bio"
              description="Your public bio."
              placeholder="Be the most worthy family in the world."
              id="bio"
              name="bio"
              required
              textArea
            />
            <Button className="w-full">Update profile</Button>
          </Form>
        </div>
        <aside className="col-span-2 p-5 rounded-lg border shadow-sm">
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
              name="icon"
            />
            <div className="flex flex-col text-xs text-muted-foreground">
              <span>Recommended size: 128x128px</span>
              <span>Allowed formats: PNT, JPEG</span>
              <span>Max file size: 1MB</span>
            </div>
            <Button className="w-full">Update avatar</Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
