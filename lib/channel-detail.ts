import { redirect } from "next/navigation";
import {currentProfile} from "./current-profile";
import { db } from "./db";

export async function fetchChannel(channelId: string) {
  const profile = await currentProfile();

  if (!channelId) {
    return redirect("/server");
  }

  if (!profile) {
    return redirect("/");
  }

  const channel = await db.channel.findUnique({
    where: {
      id: channelId,
      server: {
        members: {
          some: {
            profileId: profile.id,
          },
        },
      },
    },
  });

  return channel
}
