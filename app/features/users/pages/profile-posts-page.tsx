import PostCard from "~/features/community/components/post-card";
import type { Route } from "./+types/profile-posts-page";

export const meta: Route.MetaFunction = () => [
  { title: "ProfilePosts | wemake" },
];

export default function ProfilePostsPage() {
  return (
    <div className="flex flex-col gap-5">
      {Array.from({ length: 5 }).map((_, idx) => (
        <PostCard
          key={`postId-${idx}`}
          id={`postId-${idx}`}
          title="What is the best productivity tool?"
          author="Nico"
          authorAvatarUrl="https://github.com/apple.png"
          category="Productivity"
          postedAt="12 hours ago"
          expanded
        />
      ))}
    </div>
  );
}
