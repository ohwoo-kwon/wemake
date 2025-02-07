import { Link } from "react-router";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { Badge } from "~/common/components/ui/badge";
import { Button } from "~/common/components/ui/button";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";

interface TeamCardProps {
  id: string;
  leaderUserName: string;
  leaderAvatarUrl: string;
  positions: string[];
  projectDescription: string;
}

export default function TeamCard({
  id,
  leaderUserName,
  leaderAvatarUrl,
  positions,
  projectDescription,
}: TeamCardProps) {
  return (
    <Link to={`/teams/${id}`}>
      <Card className="bg-transparent transition-colors hover:bg-card/50">
        <CardHeader className="flex flex-row items-center">
          <CardTitle className="text-base leading-loose">
            <Badge
              variant="secondary"
              className="inline-flex shadow-sm items-center text-base"
            >
              <span>@{leaderUserName}</span>
              <Avatar className="size-5">
                <AvatarImage src={leaderAvatarUrl} />
                <AvatarFallback>N</AvatarFallback>
              </Avatar>
            </Badge>
            <span>is looking for </span>
            {positions.map((position, index) => (
              <Badge key={index} className="text-base">
                {position}
              </Badge>
            ))}
            <span> to build</span>
            <span>{projectDescription}</span>
          </CardTitle>
        </CardHeader>
        <CardFooter className="justify-end">
          <Button variant="link">Join teams &rarr;</Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
