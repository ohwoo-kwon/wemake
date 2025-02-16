import type { Route } from "./+types/message-page";

export const meta: Route.MetaFunction = () => [{ title: "Message | wemake" }];

export default function MessagePage() {
  return <h1>Message</h1>;
}
