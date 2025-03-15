import { EyeIcon } from "lucide-react";
import type { MouseEvent } from "react";
import { Link, useFetcher } from "react-router";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { Button } from "~/common/components/ui/button";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";
import { cn } from "~/lib/utils";

interface NotificationCardProps {
  notificationId: string;
  avatarUrl: string;
  userName: string;
  type: "review" | "follow" | "reply";
  timestamp: string;
  productName?: string;
  postTitle?: string;
  payloadId?: number;
  seen: boolean;
}

export default function NotificationCard({
  notificationId,
  avatarUrl,
  userName,
  type,
  timestamp,
  productName,
  postTitle,
  payloadId,
  seen,
}: NotificationCardProps) {
  const fetcher = useFetcher();
  const getMessage = (type: "review" | "follow" | "reply") => {
    switch (type) {
      case "review":
        return "reviewd your product.";
      case "follow":
        return "followed you.";
      case "reply":
        return "replied to your post.";
    }
  };
  const onClickSeen = (e: MouseEvent<HTMLButtonElement>) => {
    fetcher.submit(null, {
      method: "POST",
      action: `/my/notifications/${notificationId}/see`,
    });
  };
  const optimisticSeen = fetcher.state === "idle" ? seen : true;
  return (
    <Card
      className={cn("min-w-[450px]", optimisticSeen ? "" : "bg-yellow-500/60")}
    >
      <CardHeader className="flex flex-row gap-5 items-start">
        <Avatar>
          <AvatarFallback>N</AvatarFallback>
          <AvatarImage src={avatarUrl} />
        </Avatar>
        <div>
          <CardTitle className="text-lg font-bold">
            <span>{userName}</span>
            <span> {getMessage(type)}</span>
            {productName && (
              <Button variant="ghost" className="text-lg" asChild>
                <Link to={`/products/${payloadId}`}>{productName}</Link>
              </Button>
            )}
            {postTitle && (
              <Button variant="ghost" className="text-lg" asChild>
                <Link to={`/community/${payloadId}`}>{postTitle}</Link>
              </Button>
            )}
          </CardTitle>
          <small className="text-muted-foreground text-sm">{timestamp}</small>
        </div>
      </CardHeader>
      <CardFooter className="flex justify-end">
        {!optimisticSeen && (
          <Button variant="outline" size="icon" onClick={onClickSeen}>
            <EyeIcon className="size-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
