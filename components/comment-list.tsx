import { getFormattedDateTime } from "@/lib/utils";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { Comment } from "./tweet";

interface CommentListProps {
  comments: Comment[];
}

export default function CommentList({ comments }: CommentListProps) {
  return (
    <div className="flex flex-col gap-5">
      {comments.map(({ id, comment, created_at, user: { username, email } }) => (
        <div key={id} className="flex gap-5 p-5 border">
          <UserCircleIcon className="size-14" />
          <div className="flex flex-col gap-2 flex-1">
            <div className="flex gap-2 items-center *:text-sm *:text-gray-500">
              <div className="!text-base !text-black font-semibold">{username}</div>
              <div>@{email.split("@")[0]}</div>
              <div>·</div>
              <div>{getFormattedDateTime(created_at)}</div>
            </div>
            <div>{comment}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
