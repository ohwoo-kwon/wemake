import type { Route } from "./+types/profile-page";

export const meta: Route.MetaFunction = () => [{ title: "Profile | wemake" }];

export default function ProfilePage() {
  return (
    <div className="max-w-screen-md flex flex-col space-y-10">
      <div className="space-y-2">
        <h4 className="text-lg font-bold">Headline</h4>
        <p className="text-muted-foreground">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi amet
          laborum ad, quasi sapiente in, aliquid praesentium quisquam reiciendis
          temporibus aut eius sint pariatur debitis, itaque beatae sed earum
          ipsam.
        </p>
      </div>
      <div className="space-y-2">
        <h4 className="text-lg font-bold">About</h4>
        <p className="text-muted-foreground">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi amet
          laborum ad, quasi sapiente in, aliquid praesentium quisquam reiciendis
          temporibus aut eius sint pariatur debitis, itaque beatae sed earum
          ipsam.
        </p>
      </div>
    </div>
  );
}
