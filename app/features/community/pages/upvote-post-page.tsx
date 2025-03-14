import { makeSSRClient } from "~/supa-client";
import type { Route } from "./+types/upvote-post-page";
import { getLoggedInUserId } from "~/features/users/queries";
import { toggleUpvote } from "../mutation";

export const action = async ({ request, params }: Route.ActionArgs) => {
  if (request.method !== "POST") {
    throw new Response("Method no allowed", { status: 405 });
  }
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  await toggleUpvote(client, { postId: params.postId, userId });
  return {
    ok: true,
  };
};
