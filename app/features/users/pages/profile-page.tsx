import type { Route } from "./+types/profile-page";

export const meta: Route.MetaFunction = () => [{ title: "Profile | wemake" }];

export default function ProfilePage() {
  return <h1>Profile</h1>;
}
