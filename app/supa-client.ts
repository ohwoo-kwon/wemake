import { createClient } from "@supabase/supabase-js";
import type { MergeDeep, SetNonNullable, SetFieldType } from "type-fest";
import type { Database as SupabaseDatabase } from "database.types";

type Database = {
  public: {
    Views: {
      community_post_list_view: {
        Row: SetFieldType<
          SetNonNullable<
            SupabaseDatabase["public"]["Views"]["community_post_list_view"]["Row"]
          >,
          "author_avatar",
          string | null
        >;
      };
      gpt_ideas_view: {
        Row: SetNonNullable<
          SupabaseDatabase["public"]["Views"]["gpt_ideas_view"]["Row"]
        >;
      };
      community_post_detail: {
        Row: SetNonNullable<
          SupabaseDatabase["public"]["Views"]["community_post_detail"]["Row"]
        >;
      };
      product_overview_view: {
        Row: SetNonNullable<
          SupabaseDatabase["public"]["Views"]["product_overview_view"]["Row"]
        >;
      };
    };
  };
};

const client = createClient<MergeDeep<SupabaseDatabase, Database>>(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export default client;
