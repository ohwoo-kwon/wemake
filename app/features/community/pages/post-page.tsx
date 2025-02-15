import type { Route } from "./+types/post-page";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Post | wemake" }];
};

export default function PostPage() {
  return <div></div>;
}
