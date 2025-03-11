import { DotIcon, MessageCircleIcon } from "lucide-react";
import { DateTime } from "luxon";
import { useEffect, useRef, useState } from "react";
import { Form, Link, useActionData, useOutletContext } from "react-router";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { Button } from "~/common/components/ui/button";
import { Textarea } from "~/common/components/ui/textarea";
import type { action } from "../pages/post-page";

interface ReplyProps {
  name: string;
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
  topLevelId: number;
}

export default function Reply({
  name,
  username,
  avatarUrl,
  content,
  timestamp,
  topLevel,
  replies,
  topLevelId,
}: ReplyProps) {
  const actionData = useActionData<typeof action>();
  const [replying, setReplying] = useState(false);
  const toggleReplying = () => setReplying((prev) => !prev);
  const {
    isLoggedIn,
    name: loggedInName,
    avatar,
  } = useOutletContext<{
    isLoggedIn: boolean;
    name: string;
    avatar: string;
  }>();
  useEffect(() => {
    if (actionData?.ok) {
      setReplying(false);
    }
  }, [actionData]);
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex items-start gap-5 w-2/3">
        <Avatar className="size-14">
          <AvatarFallback>{name[0]}</AvatarFallback>
          {avatarUrl ? <AvatarImage src={avatarUrl} /> : null}
        </Avatar>
        <div className="flex flex-col gap-4 items-start w-full">
          <div className="flex gap-2 items-center">
            <Link to="/users/@nico">
              <h4 className="font-medium">{name}</h4>
            </Link>
            <DotIcon className="size-5" />
            <span className="text-xs text-muted-foreground">
              {DateTime.fromISO(timestamp).toRelative()}
            </span>
          </div>
          <p className="text-muted-foreground"> {content} </p>
          {isLoggedIn ? (
            <Button
              variant="ghost"
              className="self-end"
              onClick={toggleReplying}
            >
              <MessageCircleIcon className="size-4" />
              Reply
            </Button>
          ) : null}
        </div>
      </div>
      <div className="pl-20 w-full">
        {replying && (
          <Form className="flex items-start gap-5 lg:w-2/3" method="POST">
            <input type="hidden" name="topLevelId" value={topLevelId} />
            <Avatar className="size-14">
              <AvatarFallback>{loggedInName[0]}</AvatarFallback>
              <AvatarImage src={avatar} />
            </Avatar>
            <div className="flex flex-col gap-5 items-end w-full">
              <Textarea
                autoFocus
                name="reply"
                placeholder="Write a reply"
                className="w-full resize-none"
                defaultValue={`@${username}`}
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
                name={reply.user!.name}
                username={reply.user!.username}
                avatarUrl={reply.user!.avatar}
                content={reply.reply}
                timestamp={reply.created_at}
                topLevel={false}
                topLevelId={topLevelId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
