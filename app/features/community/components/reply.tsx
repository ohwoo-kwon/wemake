import { DotIcon, MessageCircleIcon } from "lucide-react";
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
  avatarUrl: string;
  content: string;
  timestamp: string;
  topLevel: boolean;
}

export default function Reply({
  username,
  avatarUrl,
  content,
  timestamp,
  topLevel,
}: ReplyProps) {
  const [replying, setReplying] = useState(false);
  const toggleReplying = () => setReplying((prev) => !prev);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-start gap-5 w-2/3">
        <Avatar className="size-14">
          <AvatarFallback>N</AvatarFallback>
          <AvatarImage src={avatarUrl} />
        </Avatar>
        <div className="flex flex-col gap-4 items-start">
          <div className="flex gap-2 items-center">
            <Link to="/users/@nico">
              <h4 className="font-medium">{username}</h4>
            </Link>
            <DotIcon className="size-5" />
            <span className="text-xs text-muted-foreground">{timestamp}</span>
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
        {topLevel && (
          <Reply
            username="Microsoft"
            avatarUrl="https://github.com/microsoft.png"
            content="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est eveniet,
          quisquam officia cupiditate adipisci mollitia consequuntur iure
          dolorum, placeat ullam error, accusantium sed culpa ad animi? Aut
          iusto adipisci facere."
            timestamp="12 hours ago"
            topLevel={false}
          />
        )}
      </div>
    </div>
  );
}
