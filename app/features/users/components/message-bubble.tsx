import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { cn } from "~/lib/utils";

interface MessageBubbleProps {
  avatarUrl: string;
  avatarFallback: string;
  content: string;
  isCurrentUser?: boolean;
}

export default function MessageBubble({
  avatarUrl,
  avatarFallback,
  content,
  isCurrentUser = false,
}: MessageBubbleProps) {
  return (
    <div
      className={cn(
        `flex items-end gap-4`,
        isCurrentUser ? "flex-row-reverse" : ""
      )}
    >
      <Avatar className="size-14">
        <AvatarImage src={avatarUrl} />
        <AvatarFallback>{avatarFallback}</AvatarFallback>
      </Avatar>
      <div
        className={cn(
          "rounded-md p-4 text-sm w-1/3",
          isCurrentUser
            ? "bg-primary/70 text-primary-foreground rounded-br-none"
            : "bg-accent rounded-bl-none"
        )}
      >
        <p>{content}</p>
      </div>
    </div>
  );
}
