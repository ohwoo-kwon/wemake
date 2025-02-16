import type { Route } from "./+types/messages-page";

export const meta: Route.MetaFunction = () => [{ title: "Messages | wemake" }];

export default function MessagesPage() {
  return <h1>Messages</h1>;
}
