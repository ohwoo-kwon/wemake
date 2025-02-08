import { data, redirect } from "react-router";
import type { Route } from "./+types/leaderboards-redirection-page";
import { DateTime } from "luxon";

const BASE_URL = "/products/leaderboards";

export function loader({ params }: Route.LoaderArgs) {
  const { period } = params;
  let url: string;
  const today = DateTime.now().setZone("Asia/Seoul");
  if (period === "daily") {
    url = `${BASE_URL}/daily/${today.year}/${today.month}/${today.day}`;
  } else if (period === "weekly") {
    url = `${BASE_URL}/weekly/${today.year}/${today.weekNumber}`;
  } else if (period === "monthly") {
    url = `${BASE_URL}/monthly/${today.year}/${today.month}`;
  } else if (period === "yearly") {
    url = `${BASE_URL}/yearly/${today.year}`;
  } else {
    return data(null, { status: 400 });
  }
  return redirect(url);
}
