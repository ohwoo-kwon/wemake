import type { Route } from "./+types/community-page";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Community | wemake" }];
};

export default function CommunityPage() {
  return <div></div>;
}
