import IdeaCard from "~/features/ideas/components/idea-card";
import type { Route } from "./+types/dashboard-ideas-page";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "../queries";
import { getClaimedIdeas } from "~/features/ideas/queries";

export const meta: Route.MetaFunction = () => [
  { title: "Dashboard Ideas | wemake" },
];

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const ideas = await getClaimedIdeas(client, { userId });
  return { ideas };
};

export default function DashboardIdeasPage({
  loaderData,
}: Route.ComponentProps) {
  return (
    <div className="space-y-5 h-full">
      <h1 className="text-2xl font-semibold">Claimed Ideas</h1>
      <div className="grid lg:grid-cols-4 gap-6">
        {loaderData.ideas.map((idea) => (
          <IdeaCard
            key={idea.gpt_idea_id}
            id={idea.gpt_idea_id}
            title={idea.idea}
            owner={true}
          />
        ))}
      </div>
    </div>
  );
}
