import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "~/common/components/ui/breadcrumb";
import type { Route } from "./+types/post-page";
import { Form, Link, useFetcher, useOutletContext } from "react-router";
import { Button } from "~/common/components/ui/button";
import { ChevronUpIcon, DotIcon } from "lucide-react";
import { Textarea } from "~/common/components/ui/textarea";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { Badge } from "~/common/components/ui/badge";
import Reply from "../components/reply";
import { getPostById, getReplies } from "../queries";
import { DateTime } from "luxon";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "~/features/users/queries";
import { z } from "zod";
import { createReply } from "../mutation";
import { useEffect, useRef } from "react";
import { cn } from "~/lib/utils";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Post | wemake" }];
};

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);
  const post = await getPostById(client, { postId: params.postId });
  const replies = await getReplies(client, { postId: params.postId });
  return { post, replies };
};

const formSchema = z.object({
  reply: z.string().min(1),
  topLevelId: z.coerce.number().optional(),
});

export const action = async ({ request, params }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const formData = await request.formData();
  const { success, error, data } = formSchema.safeParse(
    Object.fromEntries(formData)
  );
  if (!success) return { formErrors: error.flatten().fieldErrors };
  const { reply, topLevelId } = data;
  await createReply(client, {
    postId: params.postId,
    reply,
    userId,
    topLevelId,
  });
  return { ok: true };
};

export default function PostPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const fetcher = useFetcher();
  const { isLoggedIn, name, avatar } = useOutletContext<{
    isLoggedIn: boolean;
    name?: string;
    username?: string;
    avatar?: string;
  }>();
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (actionData?.ok) formRef.current?.reset();
  }, [actionData?.ok]);
  return (
    <div className="space-y-10">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={`/community`}>Community</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={`/community?topic=${loaderData.post.topic_slug}`}>
                {loaderData.post.topic_name}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={`/community/${loaderData.post.post_id}`}>
                {loaderData.post.title}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="grid grid-cols-6 gap-40 items-start">
        <div className="col-span-4 space-y-10">
          <div className="flex w-full items-start gap-10">
            <fetcher.Form
              method="post"
              action={`/community/${loaderData.post.post_id}/upvote`}
            >
              <Button
                variant="outline"
                className={cn(
                  "flex flex-col h-14",
                  loaderData.post.is_upvoted
                    ? "border-primary text-primary"
                    : ""
                )}
              >
                <ChevronUpIcon className="size-4 shrink-0" />
                <span>{loaderData.post.upvotes}</span>
              </Button>
            </fetcher.Form>
            <div className="space-y-20 w-full">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold">{loaderData.post.title}</h2>
                <div className="flex items-center text-sm text-muted-foreground">
                  <span>{loaderData.post.author_name}</span>
                  <DotIcon className="size-5" />
                  <span>
                    {DateTime.fromISO(loaderData.post.created_at).toRelative()}
                  </span>
                  <DotIcon className="size-5" />
                  <span>{loaderData.post.replies} replies</span>
                </div>
                <p className="text-muted-foreground lg:w-2/3">
                  {loaderData.post.content}
                </p>
              </div>
              {isLoggedIn ? (
                <Form
                  ref={formRef}
                  className="flex items-start gap-5 lg:w-2/3"
                  method="POST"
                >
                  <Avatar className="size-14">
                    <AvatarFallback>{name?.[0]}</AvatarFallback>
                    {loaderData.post.author_avatar ? (
                      <AvatarImage src={avatar} />
                    ) : null}
                  </Avatar>
                  <div className="flex flex-col gap-5 items-end w-full">
                    <Textarea
                      name="reply"
                      placeholder="Write a reply"
                      className="w-full resize-none"
                      rows={10}
                    />
                    <Button type="submit">Reply</Button>
                  </div>
                </Form>
              ) : null}
              <div className="space-y-2">
                <h4 className="font-semibold">
                  {loaderData.post.replies} Replies
                </h4>
                <div className="flex flex-col gap-5">
                  {loaderData.replies.map((reply) => (
                    <Reply
                      key={reply.post_reply_id}
                      //@ts-ignore
                      name={reply.user.name}
                      //@ts-ignore
                      username={reply.user.username}
                      //@ts-ignore
                      avatarUrl={reply.user!.avatar}
                      content={reply.reply}
                      timestamp={reply.created_at}
                      //@ts-ignore
                      replies={reply.post_replies}
                      topLevel
                      topLevelId={reply.post_reply_id}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <aside className="col-span-2 space-y-5 border rounded-lg shadow-sm p-5 ">
          <div className="flex gap-5">
            <Avatar className="size-14">
              <AvatarFallback>N</AvatarFallback>
              {loaderData.post.author_avatar ? (
                <AvatarImage src={loaderData.post.author_avatar} />
              ) : null}
            </Avatar>
            <div className="flex flex-col items-start">
              <h4 className="text-lg font-medium">
                {loaderData.post.author_name}
              </h4>
              <Badge variant="secondary" className="capitalize">
                {loaderData.post.author_role}
              </Badge>
            </div>
          </div>
          <div className="gap-2 text-sm flex flex-col">
            <span>
              🎂 Joined{" "}
              {DateTime.fromISO(loaderData.post.author_created_at).toRelative()}
            </span>
            <span>🚀 Launched {loaderData.post.products} products</span>
          </div>
          <Button variant="outline" className="w-full">
            Follow
          </Button>
        </aside>
      </div>
    </div>
  );
}
