import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";
import type { Route } from "./+types/message-page";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { Form } from "react-router";
import { Textarea } from "~/common/components/ui/textarea";
import { Button } from "~/common/components/ui/button";
import { SendIcon } from "lucide-react";
import MessageBubble from "../components/message-bubble";

export const meta: Route.MetaFunction = () => [{ title: "Message | wemake" }];

export default function MessagePage() {
  return (
    <div className="h-full flex flex-col justify-between">
      <Card>
        <CardHeader className="flex flex-row gap-4">
          <Avatar className="size-14">
            <AvatarImage src="https://github.com/stevejobs.png" />
            <AvatarFallback>N</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-0">
            <CardTitle>Steve Jobs</CardTitle>
            <CardDescription>2 days ago</CardDescription>
          </div>
        </CardHeader>
      </Card>
      <div className="py-10 overflow-y-scroll flex flex-col justify-start h-full">
        {Array.from({ length: 20 }).map((_, index) => (
          <MessageBubble
            key={`message-bubble-${index}`}
            avatarUrl="https://github.com/stevejobs.png"
            avatarFallback="N"
            content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero fugiat deleniti suscipit excepturi in esse dolorum recusandae exercitationem iusto accusamus!"
            isCurrentUser={index % 2 !== 0}
          />
        ))}
      </div>
      <Card>
        <CardHeader>
          <Form className="relative flex justify-end items-center">
            <Textarea
              placeholder="Write a message"
              rows={4}
              className="resize-none"
            />
            <Button
              type="submit"
              size="icon"
              className="absolute bottom-2 right-2"
            >
              <SendIcon className="size-4" />
            </Button>
          </Form>
        </CardHeader>
      </Card>
    </div>
  );
}
