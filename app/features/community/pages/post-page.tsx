import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "~/common/components/ui/breadcrumb";
import type { Route } from "./+types/post-page";
import { Form, Link } from "react-router";
import { Button } from "~/common/components/ui/button";
import { ChevronUpIcon, DotIcon, MessageCircleIcon } from "lucide-react";
import { Textarea } from "~/common/components/ui/textarea";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { Badge } from "~/common/components/ui/badge";
import Reply from "../components/reply";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Post | wemake" }];
};

export default function PostPage() {
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
              <Link to={`/community?topic=productivity`}>Productivity</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={`/community/postId`}>
                What is the best productivity tool?
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="grid grid-cols-6 gap-40 items-start">
        <div className="col-span-4 space-y-10">
          <div className="flex w-full items-start gap-10">
            <Button variant="outline" className="flex flex-col h-14">
              <ChevronUpIcon className="size-4 shrink-0" />
              <span>10</span>
            </Button>
            <div className="space-y-20">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold">
                  What is the best productivity tool?
                </h2>
                <div className="flex items-center text-sm text-muted-foreground">
                  <span>@nico</span>
                  <DotIcon className="size-5" />
                  <span>12 hours ago</span>
                  <DotIcon className="size-5" />
                  <span>10 replies</span>
                </div>
                <p className="text-muted-foreground lg:w-2/3">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
                  laborum omnis quas enim, numquam laudantium similique eveniet
                  ex aut consequatur voluptates perferendis consequuntur eaque,
                  facere labore repellat ipsam iste quae! Quibusdam odio eius
                  accusantium maxime atque est molestiae recusandae culpa beatae
                  libero pariatur obcaecati, repudiandae saepe iure voluptatum
                  laudantium minus consectetur veritatis nemo, et enim omnis
                  modi tempore sapiente? Eveniet, et! Inventore magni dolorum
                  quidem cumque ullam, laudantium in neque!
                </p>
              </div>
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
              <div className="space-y-2">
                <h4 className="font-semibold">10 Replies</h4>
                <div className="flex flex-col gap-5">
                  <Reply
                    username="Microsoft"
                    avatarUrl="https://github.com/microsoft.png"
                    content="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est eveniet,
          quisquam officia cupiditate adipisci mollitia consequuntur iure
          dolorum, placeat ullam error, accusantium sed culpa ad animi? Aut
          iusto adipisci facere."
                    timestamp="12 hours ago"
                    topLevel
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <aside className="col-span-2 space-y-5 border rounded-lg shadow-sm p-5 ">
          <div className="flex gap-5">
            <Avatar className="size-14">
              <AvatarFallback>N</AvatarFallback>
              <AvatarImage src="https://github.com/microsoft.png" />
            </Avatar>
            <div className="flex flex-col">
              <h4 className="text-lg font-medium">Microsoft</h4>
              <Badge variant="secondary">Entrepreneur</Badge>
            </div>
          </div>
          <div className="gap-2 text-sm flex flex-col">
            <span>🎂 Joined 3 months ago</span>
            <span>🚀 Launched 10 products</span>
          </div>
          <Button variant="outline" className="w-full">
            Follow
          </Button>
        </aside>
      </div>
    </div>
  );
}
