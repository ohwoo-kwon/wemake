import { DotIcon, MessageCircleIcon } from "lucide-react";
import { DateTime } from "luxon";
import { useState } from "react";
import { Form, Link } from "react-router";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { Button } from "~/common/components/ui/button";
import { Textarea } from "~/common/components/ui/textarea";

interface ReplyProps {
  username: string;
  avatarUrl: string | null;
  content: string;
  timestamp: string;
  topLevel: boolean;
  replies?: {
    post_reply_id: number;
    reply: string;
    created_at: string;
    user: { name: string; avatar: string | null; username: string } | null;
  }[];
}

export default function Reply({
  username,
  avatarUrl,
  content,
  timestamp,
  topLevel,
  replies,
}: ReplyProps) {
  const [replying, setReplying] = useState(false);
  const toggleReplying = () => setReplying((prev) => !prev);
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex items-start gap-5 w-2/3">
        <Avatar className="size-14">
          <AvatarFallback>N</AvatarFallback>
          {avatarUrl ? <AvatarImage src={avatarUrl} /> : null}
        </Avatar>
        <div className="flex flex-col gap-4 items-start w-full">
          <div className="flex gap-2 items-center">
            <Link to="/users/@nico">
              <h4 className="font-medium">{username}</h4>
            </Link>
            <DotIcon className="size-5" />
            <span className="text-xs text-muted-foreground">
              {DateTime.fromISO(timestamp).toRelative()}
            </span>
          </div>
          <p className="text-muted-foreground"> {content} </p>
          <Button variant="ghost" className="self-end" onClick={toggleReplying}>
            <MessageCircleIcon className="size-4" />
            Reply
          </Button>
        </div>
      </div>
      <div className="pl-20 w-full">
        {replying && (
          <Form className="flex items-start gap-5 lg:w-2/3">
            <Avatar className="size-14">
              <AvatarFallback>N</AvatarFallback>
              <AvatarImage src="https://github.com/microsoft.png" />
            </Avatar>
            <div className="flex flex-col gap-5 items-end w-full">
              <Textarea
                placeholder="Write a reply"
                className="w-full resize-none"
                rows={10}
              />
              <Button type="submit">Reply</Button>
            </div>
          </Form>
        )}
        {topLevel && replies && (
          <div className="pl-20 w-full">
            {replies.map((reply) => (
              <Reply
                username={reply.user!.name}
                avatarUrl={reply.user!.avatar}
                content={reply.reply}
                timestamp={reply.created_at}
                topLevel={false}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
