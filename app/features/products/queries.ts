import type { DateTime } from "luxon";
import client from "~/supa-client";

export const getProductByDateRange = async ({
  startDate,
  endDate,
  limit,
}: {
  startDate: DateTime;
  endDate: DateTime;
  limit: number;
}) => {
  const { data, error } = await client
    .from("products")
    .select(
      `
        product_id,
        name,
        description,
        upvotes:stats->>upvotes,
        views:stats->>views,
        reviews:stats->>reviews
      `
    )
    .gte("created_at", startDate.toISO())
    .lte("created_at", endDate.toISO())
    .limit(limit)
    .order("stats->>upvotes", { ascending: false });
  if (error) throw Error(error.message);
  return data;
};
