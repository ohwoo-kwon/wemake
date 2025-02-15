import type { Route } from "./+types/team-page";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Team | wemake" }];
};

export default function TeamPage() {
  return <div></div>;
}
