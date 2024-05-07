import { Server } from "@prisma/client";
import ServerSideNavHeader from "./server-sidenav-header";
import currentProfile from "@/lib/current-profile";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

interface ServerSideNavProps {
  serverId: string;
}

const ServerSideNav = async ({ serverId }: ServerSideNavProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const server = await db.server.findUnique({
    where: {
      id: serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
    include: {
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });

  if (!server) {
    return redirect("/");
  }

  const role = server.members.find(
    (member) => member.profileId === profile.id
  )?.role;


  return (
    <div className="flex flex-col w-full h-full">
      <ServerSideNavHeader server={server} role={role} />
    </div>
  );
};

export default ServerSideNav;
