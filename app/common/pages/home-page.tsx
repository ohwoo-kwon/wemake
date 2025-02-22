import { Link, type MetaFunction } from "react-router";
import ProductCard from "~/features/products/components/product-card";
import { Button } from "../components/ui/button";
import PostCard from "~/features/community/components/post-card";
import IdeaCard from "~/features/ideas/components/idea-card";
import JobCard from "~/features/jobs/components/job-card";
import TeamCard from "~/features/teams/components/team-card";

export const meta: MetaFunction = () => {
  return [
    { title: "Home | wemake" },
    { name: "description", content: "Welcome to wemake" },
  ];
};

export default function HomePage() {
  return (
    <div className="px-20 space-y-40">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">
            Today's Products
          </h2>
          <p className="text-xl font-light text-foreground">
            The best products made by our community today.
          </p>
          <Button variant="link" asChild className="text-lg p-0">
            <Link to="/products/leaderboards">Explore all products &rarr;</Link>
          </Button>
        </div>
        {Array.from({ length: 10 }).map((_, idx) => (
          <ProductCard
            key={`productId-${idx}`}
            id={`productId-${idx}`}
            name="Product Name"
            description="Product Description"
            commentsCount={12}
            viewsCount={41}
            votesCount={120}
          />
        ))}
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">
            Latest Discussions
          </h2>
          <p className="text-xl font-light text-foreground">
            The latest discussions from our community.
          </p>
          <Button variant="link" asChild className="text-lg p-0">
            <Link to="/community">Explore all discussions &rarr;</Link>
          </Button>
        </div>
        {Array.from({ length: 11 }).map((_, idx) => (
          <PostCard
            key={`postId-${idx}`}
            id={idx}
            title="What is the best productivity tool?"
            author="Nico"
            authorAvatarUrl="https://github.com/apple.png"
            category="Productivity"
            postedAt="12 hours ago"
          />
        ))}
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">
            IdeasGPT
          </h2>
          <p className="text-xl font-light text-foreground">
            Find ideas for your next project.
          </p>
          <Button variant="link" asChild className="text-lg p-0">
            <Link to="/ideas">Explore all ideas &rarr;</Link>
          </Button>
        </div>
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
            claimed={idx % 2 === 0}
          />
        ))}
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">
            Latest Jobs
          </h2>
          <p className="text-xl font-light text-foreground">
            Find your dream job.
          </p>
          <Button variant="link" asChild className="text-lg p-0">
            <Link to="/jobs">Explore all jobs &rarr;</Link>
          </Button>
        </div>
        {Array.from({ length: 11 }).map((_, idx) => (
          <JobCard
            key={`jobId-${idx}`}
            id={`jobId-${idx}`}
            company="Facebook"
            companyLogoUrl="https://github.com/facebook.png"
            companyHq="San Francisco, CA"
            title="Software Engineer"
            postedAt="12 hours ago"
            type="Full-time"
            positionLocation="Remote"
            salary="$100,000 - $120,000"
          />
        ))}
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">
            Find a team mate.
          </h2>
          <p className="text-xl font-light text-foreground">
            Join a team looking for a new member.
          </p>
          <Button variant="link" asChild className="text-lg p-0">
            <Link to="/teams">Explore all teams &rarr;</Link>
          </Button>
        </div>
        {Array.from({ length: 11 }).map((_, idx) => (
          <TeamCard
            key={`teamId-${idx}`}
            id={`teamId-${idx}`}
            leaderUserName="lynn"
            leaderAvatarUrl="https://github.com/inthetiger.png"
            positions={[
              "React Developer",
              "Backend Developer",
              "Project Manager",
            ]}
            projectDescription="a new social media platform"
          />
        ))}
      </div>
    </div>
  );
}
