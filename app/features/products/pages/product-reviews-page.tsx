import { StarIcon } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { Button } from "~/common/components/ui/button";
import ReviewCard from "../components/review-card";

export default function ProductReviews() {
  return (
    <div className="space-y-10 max-w-xl">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">10 Reviews</h2>
        <Button variant="secondary">Write a review</Button>
      </div>
      <div className="space-y-20">
        {Array.from({ length: 10 }).map(() => (
          <ReviewCard
            username="Elon Musk"
            handle="@username"
            avatarUrl="https://github.com/facebook.png"
            rating={4}
            content="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores et dolorem excepturi veniam quam a quia, nemo cupiditate error accusamus possimus ducimus tempora aliquam! Eius aut nostrum minus a, veniam modi. Architecto vel asperiores sit dolorem non quia provident. Consequuntur pariatur ex commodi neque cupiditate dicta similique adipisci ipsum nihil enim eaque officiis nulla qui, animi in itaque iste inventore, dolorum, praesentium sapiente? Fuga consequuntur eaque, dolorem repellat necessitatibus magni quos iusto placeat laudantium? Voluptas, doloribus. Hic, earum! Deserunt corrupti hic ab. Laborum dolor pariatur dolorem necessitatibus eaque! Officia fuga quaerat eius quos illum harum voluptatem iure esse doloremque quasi?"
            postedAt="10 days ago"
          />
        ))}
      </div>
    </div>
  );
}
