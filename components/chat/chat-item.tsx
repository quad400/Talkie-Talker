"use client";

import { useOtherProfile } from "@/hooks/use-other-profile";
import { currentProfile } from "@/lib/current-profile";
import { cn, formatTime } from "@/lib/utils";
import { auth, useAuth } from "@clerk/nextjs";
import { MemberRole, Profile } from "@prisma/client";
import UserAvatar from "../user-avatar";
import { ShieldHalf, ShieldQuestion } from "lucide-react";
import { Fragment } from "react";

interface ChatItemProps {
  profile: Profile;
  type: "channel" | "chat";
  text?: string;
  role?: MemberRole;
  imageUri?: string;
  messageId: string;
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ChatItem = ({
  createdAt,
  type,
  role,
  deleted,
  messageId,
  profile,
  updatedAt,
  imageUri,
  text,
}: ChatItemProps) => {
  const { userId } = useAuth();

  const otherProfile = profile.userId !== userId;

  return (
    <Fragment>
      {otherProfile ? (
      <div className="flex justify-start items-start space-x-1">
         <UserAvatar imageUrl={profile.imageUrl} />
        <div className="flex flex-col px-4 w-full mb-2 justify-start items-start">
          <div className="py-2 px-4 w-1/2 rounded-lg my-2 justify-center bg-zinc-800">
            <div className="flex justify-between items-start ">
              <div className="flex justify-start items-start space-x-2 truncate">
                <div className="text-zinc-300 font-medium text-base">
                  {profile.name}
                </div>
                {role === "ADMIN" ? (
                  <ShieldHalf className="h-4 w-4 text-rose-800" />
                ) : role === "MODERATOR" ? (
                  <ShieldQuestion className="h-4 w-4 text-emerald-800" />
                ) : (
                  ""
                )}
              </div>
              <div className="text-muted-foreground text-xs font-light">
                {formatTime(createdAt)}
              </div>
            </div>
            <div className="text-zinc-200 mt-3 text-sm font-normal">{text}</div>
          </div>
        </div>
        </div>
      ) : (
        <div className="flex justify-end items-start space-x-1">

        <div className="flex flex-col px-4 w-full mb-2 justify-end items-end ">
          <div className="py-2 px-4 w-1/2 rounded-lg my-2 justify-center bg-indigo-500">
            <div className="flex justify-between items-start ">
              <div className="flex justify-start items-start space-x-2 truncate">
                <div className="text-zinc-300 font-medium text-base">
                  {profile.name}
                </div>
                {role === "ADMIN" ? (
                  <ShieldHalf className="h-4 w-4 text-rose-800" />
                ) : role === "MODERATOR" ? (
                  <ShieldQuestion className="h-4 w-4 text-emerald-800" />
                ) : (
                  ""
                )}
              </div>
              <div
                className={cn(
                  "text-muted-foreground text-xs font-light text-white"
                )}
              >
                {formatTime(createdAt)}
              </div>
            </div>
            <div className="text-zinc-200 mt-3 text-sm font-normal">{text}</div>
          </div>
        </div>
          <UserAvatar imageUrl={profile.imageUrl} />
        </div>
      )}
    </Fragment>
  );
};

export default ChatItem;
