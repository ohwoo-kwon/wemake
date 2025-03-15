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
import {
  Form,
  useOutletContext,
  type ShouldRevalidateFunctionArgs,
} from "react-router";
import { Textarea } from "~/common/components/ui/textarea";
import { Button } from "~/common/components/ui/button";
import { SendIcon } from "lucide-react";
import MessageBubble from "../components/message-bubble";
import { browserClient, makeSSRClient } from "~/supa-client";
import {
  getLoggedInUserId,
  getMessagesByMessageRoomId,
  getRoomsParticipant,
  sendMessageToRoom,
} from "../queries";
import { useEffect, useRef, useState } from "react";

export const meta: Route.MetaFunction = () => [{ title: "Message | wemake" }];

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const messages = await getMessagesByMessageRoomId(client, {
    messageRoomId: params.messageRoomId,
    userId,
  });
  const participant = await getRoomsParticipant(client, {
    messageRoomId: params.messageRoomId,
    userId,
  });
  return {
    messages,
    participant,
  };
};

export const action = async ({ request, params }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const formData = await request.formData();
  const message = formData.get("message");
  await sendMessageToRoom(client, {
    messageRoomId: params.messageRoomId,
    message: message as string,
    userId,
  });
  return {
    ok: true,
  };
};

export default function MessagePage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const [messages, setMessages] = useState(loaderData.messages);
  const { userId, avatar } = useOutletContext<{
    userId: string;
    avatar: string;
  }>();
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (actionData?.ok) {
      formRef.current?.reset();
    }
  }, [actionData]);
  useEffect(() => {
    const changes = browserClient
      .channel(
        // @ts-ignore
        `room:${userId}-${loaderData.participant?.profile?.profile_id}`
      )
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new]);
        }
      )
      .subscribe();
    return () => {
      changes.unsubscribe();
    };
  }, []);
  return (
    <div className="h-full flex flex-col justify-between">
      <Card>
        <CardHeader className="flex flex-row gap-4">
          <Avatar className="size-14">
            {/* @ts-ignore */}
            <AvatarImage src={loaderData.participant?.profile?.avatar ?? ""} />
            <AvatarFallback>
              {/* @ts-ignore */}
              {loaderData.participant?.profile?.name.charAt(0) ?? ""}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-0">
            <CardTitle>
              {/* @ts-ignore */}
              {loaderData.participant?.profile?.name ?? ""}
            </CardTitle>
            <CardDescription>2 days ago</CardDescription>
          </div>
        </CardHeader>
      </Card>
      <div className="py-10 overflow-y-scroll space-y-4 flex flex-col justify-start h-full">
        {messages.map((message) => (
          <MessageBubble
            key={message.message_id}
            avatarUrl={
              message.sender_id === userId
                ? avatar
                : // @ts-ignore
                  loaderData.participant.profile.avatar
            }
            avatarFallback="N"
            content={message.content}
            isCurrentUser={message.sender_id === userId}
          />
        ))}
      </div>
      <Card>
        <CardHeader>
          <Form
            ref={formRef}
            className="relative flex justify-end items-center"
            method="POST"
          >
            <Textarea
              placeholder="Write a message"
              rows={4}
              name="message"
              required
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

export const shouldRevalidate = ({}: ShouldRevalidateFunctionArgs) => {
  return false;
};
