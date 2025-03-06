import client from "~/supa-client";

export const getGptIdeas = async ({ limit }: { limit: number }) => {
  const { data, error } = await client
    .from("gpt_ideas_view")
    .select("*")
    .limit(limit);
  if (error) throw Error(error.message);
  return data;
};

export const getGptIdea = async (ideaId: string) => {
  const { data, error } = await client
    .from("gpt_ideas_view")
    .select("*")
    .eq("gpt_idea_id", ideaId)
    .single();
  if (error) throw Error(error.message);
  return data;
};
