import { Button } from "~/common/components/ui/button";
import ReviewCard from "../components/review-card";
import { Dialog, DialogTrigger } from "~/common/components/ui/dialog";
import CreateReviewDialog from "../components/create-review-dialog";
import { useOutletContext } from "react-router";
import type { Route } from "./+types/product-reviews-page";
import { getReviews } from "../queries";
import { makeSSRClient } from "~/supa-client";

export const meta: Route.MetaFunction = () => [
  { title: "Product Reviews | wemake" },
  { name: "description", content: "Read and write prodcut reviews" },
];

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);
  const reviews = await getReviews(client, { productId: params.productId });
  return { reviews };
};

export default function ProductReviews({ loaderData }: Route.ComponentProps) {
  const { review_count } = useOutletContext<{ review_count: string }>();
  return (
    <Dialog>
      <div className="space-y-10 max-w-xl">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">{review_count} Reviews</h2>
          <DialogTrigger>
            <Button variant="secondary">Write a review</Button>
          </DialogTrigger>
        </div>
        <div className="space-y-20">
          {loaderData.reviews.map((review) => (
            <ReviewCard
              key={review.review_id}
              // @ts-ignore
              username={review.user.name}
              // @ts-ignore
              handle={review.user.username}
              // @ts-ignore
              avatarUrl={review.user.avatar}
              rating={review.rating}
              content={review.review}
              postedAt={review.created_at}
            />
          ))}
        </div>
      </div>
      <CreateReviewDialog />
    </Dialog>
  );
}
