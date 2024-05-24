import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { InviteModal } from "@/components/modals/invite-modal";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { currentProfile } from "@/lib/current-profile";

const InvitePage = async ({ params }: { params: { inviteId: string } }) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const server = await db.server.findUnique({
    where: {
      inviteCode: params.inviteId,
      members: {
        some: {
          profileId: {
            not: profile.id,
          },
        },
      },
    },
    include: {
      members: {
        include: {
          profile: true,
        },
      },
    },
  });

  const isMember = server?.members.find(
    (member) => member.profileId === profile.id
  );

  if (!!isMember) {
    return redirect(`/servers/${server?.id}`);
  }

  if (!server) {
    return (
      <div className="flex flex-col justify-center items-center w-full h-full">
        <div className="relative h-60 w-60 justify-center items-center">
          <Image fill alt="404" src="/404.png" />
        </div>
        <div className="text-4xl font-semibold text-center text-zinc-800 dark:text-zinc-200">
          Page Not Found
        </div>

        <Link
          className="bg-violet-500 mt-10 hover:bg-violet-500/80 text-white font-semibold text-2xl py-3 px-8 rounded-2xl flex justify-around items-center"
          href="/servers"
        >
          <ArrowLeft className="h-8 w-8 text-white" />
          Go Back
        </Link>
      </div>
    );
  }
  return (
    <div>
      <InviteModal server={server} />
    </div>
  );
};

export default InvitePage;
