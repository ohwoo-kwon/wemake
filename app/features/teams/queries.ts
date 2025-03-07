import client from "~/supa-client";

export const getTeams = async ({ limit }: { limit: number }) => {
  const { error, data } = await client
    .from("teams")
    .select(
      `
        team_id,
        roles,
        product_description,
        team_leader: profiles!inner(username, avatar),
        created_at
      `
    )
    .limit(limit);
  if (error) {
    throw error;
  }
  return data;
};
