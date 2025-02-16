import IdeaCard from "~/features/ideas/components/idea-card";
import type { Route } from "./+types/dashboard-ideas-page";

export const meta: Route.MetaFunction = () => [
  { title: "Dashboard Ideas | wemake" },
];

export default function DashboardIdeasPage() {
  return (
    <div className="space-y-5 h-full">
      <h1 className="text-2xl font-semibold">Claimed Ideas</h1>
      <div className="grid lg:grid-cols-4 gap-6">
        {Array.from({ length: 5 }).map((_, idx) => (
          <IdeaCard
            key={`ideaId-${idx}`}
            id={`ideaId-${idx}`}
            title="A startup that creates an AI-powered generated personal trainer,
                  delivering customized fitness recommendations and tracking of
                  progress using an a mobile app to track workouts and progress as
                  well as a website to manage the business."
            viewsCount={17}
            postedAt="12 hours ago"
            likesCount={123}
            claimed={false}
          />
        ))}
      </div>
    </div>
  );
}
