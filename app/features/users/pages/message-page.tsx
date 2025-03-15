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
import { Form, useOutletContext } from "react-router";
import { Textarea } from "~/common/components/ui/textarea";
import { Button } from "~/common/components/ui/button";
import { SendIcon } from "lucide-react";
import MessageBubble from "../components/message-bubble";
import { makeSSRClient } from "~/supa-client";
import {
  getLoggedInUserId,
  getMessagesByMessageRoomId,
  getRoomsParticipant,
} from "../queries";

export const meta: Route.MetaFunction = () => [{ title: "Message | wemake" }];

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const messages = await getMessagesByMessageRoomId(client, {
    messageRoomId: params.messageRoomId,
    userId,
  });
  const participants = await getRoomsParticipant(client, {
    messageRoomId: params.messageRoomId,
    userId,
  });
  return {
    messages,
    participants,
  };
};

export default function MessagePage({ loaderData }: Route.ComponentProps) {
  const { userId } = useOutletContext<{ userId: string }>();
  return (
    <div className="h-full flex flex-col justify-between">
      <Card>
        <CardHeader className="flex flex-row gap-4">
          <Avatar className="size-14">
            {/* @ts-ignore */}
            <AvatarImage src={loaderData.participants?.profile?.avatar ?? ""} />
            <AvatarFallback>
              {/* @ts-ignore */}
              {loaderData.participants?.profile?.name.charAt(0) ?? ""}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-0">
            <CardTitle>
              {/* @ts-ignore */}
              {loaderData.participants?.profile?.name ?? ""}
            </CardTitle>
            <CardDescription>2 days ago</CardDescription>
          </div>
        </CardHeader>
      </Card>
      <div className="py-10 overflow-y-scroll space-y-4 flex flex-col justify-start h-full">
        {loaderData.messages.map((message) => (
          <MessageBubble
            key={message.message_id}
            avatarUrl={message.sender?.avatar ?? ""}
            avatarFallback={message.sender?.name.charAt(0) ?? ""}
            content={message.content}
            isCurrentUser={message.sender?.profile_id === userId}
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
