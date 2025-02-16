import { redirect } from "react-router";
import type { Route } from "./+types/my-profile-page";

export const loader = ({}: Route.LoaderArgs) => {
  return redirect(`/users/lammong`);
};
