import { redirect, useParams } from "next/navigation";
import { redirectToSignIn } from "@clerk/nextjs";

import currentProfile from "@/lib/current-profile";
import { db } from "@/lib/db";

const ServerIdPage = async ({ params }: { params: { serverId: string } }) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  if (!params.serverId) {
    return null;
  }

  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
    include: {
      channels: {
        where: {
          name: "general",
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  if (!server) {
    return null;
  }

  const initialChannel = server.channels[0];


  if (initialChannel.name !== "general") {
    return null;
  }

  return redirect(`/servers/${server?.id}/channels/${initialChannel?.id}`);
};

export default ServerIdPage;
