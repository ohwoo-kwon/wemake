import type { DateTime } from "luxon";
import client from "~/supa-client";
import { PAGE_SIZE } from "./constants";

const productListSelect = `
product_id,
name,
description,
upvotes:stats->>upvotes,
views:stats->>views,
reviews:stats->>reviews
`;

export const getProductByDateRange = async ({
  startDate,
  endDate,
  page = 1,
}: {
  startDate: DateTime;
  endDate: DateTime;
  page?: number;
}) => {
  const { data, error } = await client
    .from("products")
    .select(productListSelect)
    .gte("created_at", startDate.toISO())
    .lte("created_at", endDate.toISO())
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1)
    .order("stats->>upvotes", { ascending: false });
  if (error) throw Error(error.message);
  return data;
};

export const getProductPagesByDateRange = async ({
  startDate,
  endDate,
}: {
  startDate: DateTime;
  endDate: DateTime;
}) => {
  const { count, error } = await client
    .from("products")
    .select("product_id", { count: "exact", head: true })
    .gte("created_at", startDate.toISO())
    .lte("created_at", endDate.toISO());
  if (error) throw Error(error.message);
  if (!count) return 1;
  return Math.ceil(count / PAGE_SIZE);
};

export const getCategories = async () => {
  const { error, data } = await client
    .from("categories")
    .select("category_id, name, description");
  if (error) throw error;
  return data;
};

export const getCategory = async (categoryId: number) => {
  const { error, data } = await client
    .from("categories")
    .select("category_id, name, description")
    .eq("category_id", categoryId)
    .single();
  if (error) throw error;
  return data;
};

export const getProductsByCategory = async ({
  categoryId,
  page = 1,
}: {
  categoryId: number;
  page?: number;
}) => {
  const { data, error } = await client
    .from("products")
    .select(productListSelect)
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1)
    .eq("category_id", categoryId)
    .order("stats->>upvotes", { ascending: false });
  if (error) throw Error(error.message);
  return data;
};

export const getCategoryPages = async (categoryId: number) => {
  const { count, error } = await client
    .from("products")
    .select("product_id", { count: "exact", head: true })
    .eq("category_id", categoryId);
  if (error) throw error;
  if (!count) return 1;
  return Math.ceil(count / PAGE_SIZE);
};
