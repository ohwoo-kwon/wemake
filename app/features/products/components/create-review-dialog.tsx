import { StarIcon } from "lucide-react";
import { useState } from "react";
import { Form, useActionData } from "react-router";
import InputPair from "~/common/components/input-pair";
import { Button } from "~/common/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/common/components/ui/dialog";
import { Label } from "~/common/components/ui/label";
import type { action } from "../pages/product-reviews-page";

export default function CreateReviewDialog() {
  const [rating, setRating] = useState<number>(0);
  const [hoveredStar, setHoveredStar] = useState<number>(0);
  const actionData = useActionData<typeof action>();

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-2xl">
          What do you think of this product?
        </DialogTitle>
        <DialogDescription>
          Share your thoughts and experiences with this product
        </DialogDescription>
      </DialogHeader>
      <Form className="space-y-10" method="POST">
        <div>
          <Label className="flex flex-col gap-1">
            Rating
            <small className="text-muted-foreground">
              What would you rate this product?
            </small>
          </Label>
          <div className="flex gap-2 mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <label
                key={star}
                className="relative"
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(0)}
              >
                <StarIcon
                  className="size-5 text-yellow-500"
                  fill={
                    star <= hoveredStar || star <= rating
                      ? "currentColor"
                      : "none"
                  }
                />
                <input
                  type="radio"
                  value={star}
                  name="rating"
                  required
                  className="opacity-0 h-px w-px absolute"
                  onChange={() => setRating(star)}
                />
              </label>
            ))}
          </div>
          {actionData && actionData.formErrors?.rating && (
            <p className="text-red-500">
              {actionData.formErrors.rating.join(", ")}
            </p>
          )}
        </div>
        <InputPair
          textArea
          required
          name="review"
          label="Review"
          description="Maximum 1,000 characters"
          placeholder="Tell us more about this product."
        />
        {actionData && actionData.formErrors?.review && (
          <p className="text-red-500">
            {actionData.formErrors.review.join(", ")}
          </p>
        )}
        <DialogFooter>
          <Button type="submit">Submit review</Button>
        </DialogFooter>
      </Form>
    </DialogContent>
  );
}
