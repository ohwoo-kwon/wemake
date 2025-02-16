import type { Route } from "./+types/notifications-page";

export const meta: Route.MetaFunction = () => [
  { title: "Notifications | wemake" },
];

export default function NotificationsPage() {
  return <h1>Notifications</h1>;
}
